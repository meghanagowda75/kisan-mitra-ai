import { BaseAgent } from "./BaseAgent.js";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

import path from "path";
import { fileURLToPath } from "url";


const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);


// ======================================================
// WEATHER AGENT SCHEMA
// ======================================================

const weatherAgentSchema = {

  type: "OBJECT",

  properties: {

    currentTemp: {
      type: "NUMBER",
      description:
        "Actual current temperature in Celsius"
    },

    condition: {
      type: "STRING",
      description:
        "Actual current weather condition in English / Hindi / Kannada / Telugu / Tamil / Malayalam"
    },

    rainForecast: {
      type: "STRING",
      description:
        "Rain forecast based only on actual precipitation probability"
    },

    advisory: {
      type: "STRING",
      description:
        "Agricultural weather advisory based only on actual weather data"
    },

    precipitationProbability: {
      type: "NUMBER",
      description:
        "Maximum actual precipitation probability from the supplied forecast, 0 to 100"
    },

    weeklyForecast: {

      type: "ARRAY",

      items: {

        type: "OBJECT",

        properties: {

          date: {
            type: "STRING"
          },

          maxTemp: {
            type: "NUMBER"
          },

          minTemp: {
            type: "NUMBER"
          },

          rainSum: {
            type: "NUMBER"
          },

          condition: {
            type: "STRING"
          }

        },

        required: [
          "date",
          "maxTemp",
          "minTemp",
          "rainSum",
          "condition"
        ]

      }

    }

  },

  required: [
    "currentTemp",
    "condition",
    "rainForecast",
    "advisory",
    "precipitationProbability",
    "weeklyForecast"
  ]

};


// ======================================================
// WEATHER CODES
// ======================================================

const WEATHER_CODES = {

  0:
    "Clear sky / साफ आसमान / ಶುಭ್ರ ಆಕಾಶ / నిర్మలమైన ఆకాశం / தெளிவான வானம் / തെളിഞ്ഞ ആകാശം",

  1:
    "Mainly clear / मुख्य रूप से साफ / ಬಹುತೇಕ ಶುಭ್ರ ಆಕಾಶ / సాధారణంగా నిర్మలం / பெரும்பாலும் தெளிவான வானம் / പ്രധാനമായും തെളിഞ്ഞ കാലാവസ്ഥ",

  2:
    "Partly cloudy / आंशिक रूप से बादल / ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣ / పాక్షికంగా మేఘావృతం / பகுதி மேகமூட்டம் / ഭാഗികമായി മേഘാവൃതമായ അന്തരീക്ഷം",

  3:
    "Overcast / घने बादल / ದಟ್ಟ ಮೋಡ / దట్టమైన మేఘాలు / அடர்ந்த மேகமூட்டம் / കനത്ത മേഘാവൃതമായ അന്തരീക്ഷം",

  45:
    "Fog / कोहरा / ಮಂಜು ಕವಿದ ವಾತಾವರಣ / పొగమంచు / மூடுபனி / മൂടൽമഞ്ഞ്",

  48:
    "Depositing rime fog / धुंध और कोहरा / ದಟ್ಟ ಹಿಮಮಂಜು / దట్టమైన పొగమంచు / பனிமூட்டம் / കടുത്ത മൂടൽമഞ്ഞ്",

  51:
    "Light drizzle / हल्की बूंदाबांदी / ತಿಳಿ ತುಂತುರು ಮಳೆ / తేలికపాటి చినుకులు / லேசான தூறல் / നേരിയ ചാറ്റൽമഴ",

  53:
    "Moderate drizzle / मध्यम बूंदाबांदी / ಮಧ್ಯಮ ತುಂತುರು ಮಳೆ / ఒక మోస్తరు చినుకులు / மிதமான தூறல் / മിതമായ ചാറ്റൽമഴ",

  55:
    "Dense drizzle / घनी बूंदाबांदी / ಬಿರುಸಾದ ತುಂತುರು ಮಳೆ / దట్టమైన చినుకులు / அடர்ந்த தூறல் / ശക്തമായ ചാറ്റൽമഴ",

  61:
    "Slight rain / हल्की बारिश / ಸಾಧಾರಣ ಮಳೆ / తేలికపాటి వర్షం / லேசான மழை / നേരിയ മഴ",

  63:
    "Moderate rain / मध्यम बारिश / ಮಧ್ಯಮ ಪ್ರಮಾಣದ ಮಳೆ / ఒక మోస్తరు వర్షం / மிதமான மழை / മിതമായ മഴ",

  65:
    "Heavy rain / भारी बारिश / ಭಾರಿ ಮಳೆ / భారీ వర్షం / கனமழை / കനത്ത മഴ",

  71:
    "Slight snow / हल्की बर्फबारी / ಲಘು ಹಿಮಪಾತ / తేలికపాటి మంచు / லேசான பனிப்பொழிவு / നേരിയ മഞ്ഞുവീഴ്ച",

  73:
    "Moderate snow / मध्यम बर्फबारी / ಮಧ್ಯಮ ಹಿಮಪಾತ / ఒక మోస్తరు మంచు / மிதமான பனிப்பொழிவு / മിതമായ മഞ്ഞുവീഴ്ച",

  75:
    "Heavy snow / भारी बर्फबारी / ಭಾರಿ ಹಿಮಪಾತ / భారీ మంచు వర్షం / அதிக பனிப்பொழிவு / കനത്ത മഞ്ഞുവീഴ്ച",

  80:
    "Slight rain showers / हल्की बारिश की बौछार / ಲಘು ಮಳೆ ಸಿಂಚನ / తేలికపాటి జల్లులు / லேசான மழைச்சாரல் / നേരിയ മഴച്ചാറ്റൽ",

  81:
    "Moderate rain showers / मध्यम बारिश की बौछार / ಸಾಧಾರಣ ಮಳೆ ಸಿಂಚನ / ఒక మోస్తరు జల్లులు / மிதமான மழைச்சாரல் / മിതമായ മഴച്ചാറ്റൽ",

  82:
    "Heavy rain showers / तेज बारिश की बौछार / ಭಾರಿ ಮಳೆ ಸಿಂಚನ / భారీ వర్షపు జల్లులు / பலத்த மழைச்சாரல் / ശക്തമായ മഴച്ചാറ്റൽ",

  95:
    "Thunderstorm / आंधी-तूफान / ಗುಡುಗು ಸಹಿತ ಮಳೆ / ಉರುಮುలతో కూడిన వర్షం / இடியுடன் கூடிய மழை / ഇടിമിന്നലോടുകൂടിയ മഴ",

  96:
    "Thunderstorm with slight hail / हल्की ओलावृष्टि के साथ आंधी / ಸಣ್ಣ ಆಲಿಕಲ್ಲು ಸಹಿತ ಗುಡುಗು ಮಳೆ / వడగండ్లతో కూడిన ఉరుము / லேசான ஆலங்கட்டி மழை / നേരിയ ആലിപ്പഴ വർഷത്തോടുകൂടിയ മഴ",

  99:
    "Thunderstorm with heavy hail / भारी ओलावृष्टि के साथ आंधी / ಭಾರಿ ಆಲಿಕಲ್ಲು ಸಹಿತ ಬಿರುಗಾಳಿ ಮಳೆ / భారీ వడగండ్ల వాన / பலத்த ஆலங்கட்டி மழை / ശക്തമായ ആലിപ്പഴ വർഷത്തോടുകൂടിയ ഇടിമിന്നൽ മഴ"

};


function getWeatherDescription(code) {

  const numericCode =
    Number(code);

  return (
    WEATHER_CODES[numericCode] ||
    "Unknown weather / अज्ञात मौसम / ಅಪರಿಚಿತ ಹವಾಮಾನ / తెలియని వాతావరణం / தெரியாத வானிலை / അജ്ഞാതമായ കാലാവസ്ഥ"
  );

}


// ======================================================
// SAFE NUMBER
// ======================================================

function safeNumber(value, fallback = 0) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;

}


// ======================================================
// WEATHER AGENT
// ======================================================

export class WeatherAgent extends BaseAgent {

  constructor() {

    super({

      name:
        "WeatherAgent",

      description:
        "Fetches actual weather data from the Weather MCP server and provides deterministic agricultural weather advice.",

      systemInstruction: `

You are the KisanMitra Agricultural Weather Agent.

The numerical weather values supplied to you are authoritative.

IMPORTANT:

1. Never invent weather values.

2. Never automatically use 75%.

3. Never automatically use 98%.

4. precipitationProbability MUST equal the maximum actual
   precipitation probability supplied by the weather forecast.

5. Do not create artificial weather percentages.

6. Do not change the actual temperature.

7. Do not change forecast dates.

8. Do not change forecast temperatures.

9. Do not change rainfall values.

10. Do not make SELL/HOLD decisions.

11. Give practical agricultural advice about:
    harvesting,
    spraying,
    irrigation,
    rain,
    crop protection.

12. Descriptive text must be English / हिन्दी / ಕನ್ನಡ / తెలుగు / தமிழ் / മലയാളം.

13. Weather numbers must come directly from MCP/Open-Meteo data.

14. Do not pass factual weather values through an LLM for modification.

The WeatherAgent does not make market decisions.

The OrchestratorAgent handles SELL/HOLD decisions.

`,

      responseSchema:
        weatherAgentSchema

    });

  }


  // ======================================================
  // FETCH WEATHER THROUGH MCP
  // ======================================================

  async fetchWeatherViaMCP(
    latitude,
    longitude,
    city
  ) {

    let client = null;
    let transport = null;

    try {

      console.log(
        "[WeatherAgent] Connecting to Weather MCP Server..."
      );


      const mcpServerPath =
        path.resolve(
          __dirname,
          "../mcp-server/index.js"
        );


      transport =
        new StdioClientTransport({

          command: "node",

          args: [
            mcpServerPath
          ]

        });


      client =
        new Client(

          {
            name:
              "kisan-mitra-backend-client",

            version:
              "1.0.0"
          },

          {
            capabilities: {}
          }

        );


      await client.connect(
        transport
      );


      console.log(
        "[WeatherAgent] MCP Server connected."
      );


      const result =
        await client.callTool({

          name:
            "get_weather_forecast",

          arguments: {

            latitude:
              safeNumber(latitude),

            longitude:
              safeNumber(longitude),

            city:
              String(city || "Unknown Location")

          }

        });


      if (result?.isError) {

        throw new Error(

          result?.content?.[0]?.text ||
          "Weather MCP server returned an error"

        );

      }


      const weatherText =
        result?.content?.find(
          item =>
            item?.type === "text"
        )?.text;


      if (!weatherText) {

        throw new Error(
          "MCP server returned empty weather data"
        );

      }


      let weatherData;


      try {

        weatherData =
          JSON.parse(
            weatherText
          );

      }

      catch (parseError) {

        throw new Error(
          `Invalid JSON returned by Weather MCP server: ${parseError.message}`
        );

      }


      if (
        weatherData?.error
      ) {

        throw new Error(
          String(weatherData.error)
        );

      }


      console.log(
        `[WeatherAgent] Weather data received for ${city}`
      );


      console.log(
        `[WeatherAgent] Current temperature: ${weatherData?.current?.temp}°C`
      );


      console.log(
        `[WeatherAgent] Forecast days: ${weatherData?.forecast?.length || 0}`
      );


      console.log(
        `[WeatherAgent] MCP maximum rain probability: ${weatherData?.weatherStatistics?.maxRainProbability}%`
      );


      return weatherData;

    }

    catch (error) {

      console.warn(
        `[WeatherAgent] MCP fetch failed: ${error.message}`
      );


      console.warn(
        "[WeatherAgent] Trying direct Open-Meteo API..."
      );


      return this.fetchWeatherDirect(
        latitude,
        longitude,
        city
      );

    }

    finally {

      if (transport) {

        try {

          await transport.close();

        }

        catch (closeError) {

          console.warn(
            "[WeatherAgent] MCP transport close failed:",
            closeError.message
          );

        }

      }

    }

  }


  // ======================================================
  // DIRECT OPEN-METEO FALLBACK
  // ======================================================

  async fetchWeatherDirect(
    latitude,
    longitude,
    city
  ) {

    const lat =
      safeNumber(latitude);


    const lon =
      safeNumber(longitude);


    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${encodeURIComponent(lat)}` +
      `&longitude=${encodeURIComponent(lon)}` +
      `&current_weather=true` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum,showers_sum,weathercode` +
      `&timezone=auto`;


    console.log(
      "[WeatherAgent] Direct Open-Meteo request:"
    );

    console.log(
      url
    );


    const response =
      await fetch(url);


    if (!response.ok) {

      const errorText =
        await response.text();


      throw new Error(
        `Open-Meteo API failed: ${response.status} ${errorText}`
      );

    }


    const data =
      await response.json();


    const daily =
      data?.daily || {};


    const forecast = [];


    if (
      Array.isArray(
        daily.time
      )
    ) {

      for (
        let i = 0;
        i < daily.time.length;
        i++
      ) {

        const rainSum =
          safeNumber(
            daily.rain_sum?.[i]
          );


        const showersSum =
          safeNumber(
            daily.showers_sum?.[i]
          );


        const totalRain =
          rainSum +
          showersSum;


        const rainProbability =
          safeNumber(
            daily.precipitation_probability_max?.[i]
          );


        const weatherCode =
          daily.weathercode?.[i];


        forecast.push({

          date:
            String(
              daily.time[i]
            ),

          maxTemp:
            safeNumber(
              daily.temperature_2m_max?.[i]
            ),

          minTemp:
            safeNumber(
              daily.temperature_2m_min?.[i]
            ),

          rainSum:
            Number(
              totalRain.toFixed(1)
            ),

          rainProbability,

          condition:
            getWeatherDescription(
              weatherCode
            ),

          code:
            weatherCode

        });

      }

    }


    return {

      location:
        String(
          city || "Unknown Location"
        ),

      coordinates: {

        latitude:
          lat,

        longitude:
          lon

      },

      current: {

        temp:
          safeNumber(
            data?.current_weather?.temperature
          ),

        windSpeed:
          safeNumber(
            data?.current_weather?.windspeed
          ),

        condition:
          getWeatherDescription(
            data?.current_weather?.weathercode
          ),

        code:
          data?.current_weather?.weathercode,

        time:
          data?.current_weather?.time

      },

      forecast

    };

  }


  // ======================================================
  // BUILD DETERMINISTIC WEATHER RESULT
  // ======================================================

  buildWeatherResult(
    weatherData
  ) {

    const current =
      weatherData?.current || {};


    const forecast =
      Array.isArray(
        weatherData?.forecast
      )
        ? weatherData.forecast
        : [];


    // ====================================================
    // CURRENT TEMPERATURE
    // ====================================================

    const currentTemp =
      safeNumber(
        current.temp
      );


    // ====================================================
    // MAXIMUM ACTUAL PRECIPITATION PROBABILITY
    // ====================================================

    const probabilities =
      forecast

        .map(
          day =>
            Number(
              day?.rainProbability
            )
        )

        .filter(
          value =>
            Number.isFinite(value)
        );


    const statisticsValue =
      Number(
        weatherData?.weatherStatistics?.maxRainProbability
      );


    let precipitationProbability = 0;


    if (
      probabilities.length > 0
    ) {

      precipitationProbability =
        Math.max(
          ...probabilities
        );

    }

    else if (
      Number.isFinite(
        statisticsValue
      )
    ) {

      precipitationProbability =
        statisticsValue;

    }


    // Clamp only to the valid probability range.
    precipitationProbability =
      Math.min(
        100,
        Math.max(
          0,
          precipitationProbability
        )
      );


    // ====================================================
    // CURRENT CONDITION
    // ====================================================

    let condition =
      current.condition;


    if (
      !condition &&
      Number.isFinite(
        Number(current.code)
      )
    ) {

      condition =
        getWeatherDescription(
          current.code
        );

    }


    if (!condition) {

      condition =
        "Weather condition unavailable / मौसम की स्थिति उपलब्ध नहीं है / ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ / ವಾತಾವರಣ సమాచారం లేదు / வானிலை தகவல் இல்லை / കാലാവസ്ഥാ വിവരങ്ങൾ ലഭ്യമല്ല";

    }


    // ====================================================
    // RAIN FORECAST
    // ====================================================

    let rainForecast;


    if (
      precipitationProbability >= 75
    ) {

      rainForecast =
        `High rain probability of ${precipitationProbability}%. / ${precipitationProbability}% बारिश की उच्च संभावना है। / ${precipitationProbability}% ಭಾರಿ ಮಳೆಯ ಸಂಭವನೀಯತೆ ಇದೆ। / ${precipitationProbability}% భారీ వర్ష సూచన ఉంది। / ${precipitationProbability}% அதிக மழை வாய்ப்பு உள்ளது। / ${precipitationProbability}% കനത്ത മഴ സാധ്യതയുണ്ട്.`;

    }

    else if (
      precipitationProbability >= 50
    ) {

      rainForecast =
        `Moderate rain probability of ${precipitationProbability}%. / ${precipitationProbability}% बारिश की मध्यम संभावना है। / ${precipitationProbability}% ಸಾಧಾರಣ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ। / ${precipitationProbability}% ఒక మోస్తరు వర్ష సూచన ఉంది। / ${precipitationProbability}% மிதமான மழை வாய்ப்பு உள்ளது। / ${precipitationProbability}% മിതമായ മഴ സാധ്യതയുണ്ട്.`;

    }

    else if (
      precipitationProbability > 0
    ) {

      rainForecast =
        `Low rain probability of ${precipitationProbability}%. / ${precipitationProbability}% बारिश की कम संभावना है। / ${precipitationProbability}% ಕಡಿಮೆ ಮಳೆ ಸಾಧ್ಯತೆ ಇದೆ। / ${precipitationProbability}% తక్కువ వర్ష సూచన ఉంది। / ${precipitationProbability}% குறைந்த மழை வாய்ப்பு உள்ளது। / ${precipitationProbability}% നേരിയ മഴ സാധ്യതയുണ്ട്.`;

    }

    else {

      rainForecast =
        "No significant rain expected. / महत्वपूर्ण बारिश की संभावना नहीं है। / ಯಾವುದೇ ಗಣನೀಯ ಮಳೆಯ ಸೂಚನೆ ಇಲ್ಲ. / వర్ష సూచన లేదు. / மழைக்கு வாய்ப்பில்லை. / മഴ സാധ്യതയില്ല.";

    }


    // ====================================================
    // AGRICULTURAL ADVISORY
    // ====================================================

    let advisory;


    if (
      precipitationProbability >= 75
    ) {

      advisory =
        "High rain risk. Protect harvested crops, avoid spraying before rain, ensure proper drainage, and consider delaying harvest if practical. / बारिश का जोखिम अधिक है। कटी हुई फसल को सुरक्षित रखें, बारिश से पहले छिड़काव न करें, उचित जल निकासी सुनिश्चित करें और संभव हो तो कटाई में देरी करें। / ಭಾರಿ ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದೆ. ಕೊಯ್ಲು ಮಾಡಿದ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸಿ, ಸಿಂಪರಣೆ ಮಾಡಬೇಡಿ, ನೀರು ಬಸಿದುಹೋಗಲು ದಾರಿ ಮಾಡಿ ಮತ್ತು ಸಾಧ್ಯವಾದರೆ ಕೊಯ್ಲು ಮುಂದೂಡಿ. / అధిక వర్ష ప్రమాదం ఉంది. కోసిన పంటను కాపాడండి, పిచికారీ చేయవద్దు, మురుగునీటి వసతిని చూసుకోండి మరియు వీలైతే కోతను వాయిదా వేయండి. / அதிக மழை ஆபத்து உள்ளது. அறுவடை செய்த பயிரை பாதுகாக்கவும், தெளிப்பதை தவிர்க்கவும், வடிகால் வசதியை உறுதி செய்து அறுவடையை தள்ளிப்போடவும். / കനത്ത മഴ സാധ്യതയുള്ളതിനാൽ വിളകൾ സുരക്ഷിതമാക്കുക, കീടനാശിനി പ്രയോഗം ഒഴിവാക്കുക, നീർവാർച്ച ഉറപ്പാക്കുക, സാധ്യമെങ്കിൽ വിളവെടുപ്പ് മാറ്റിവെക്കുക.";

    }

    else if (
      precipitationProbability >= 50
    ) {

      advisory =
        "Rain risk is moderate to high. Monitor the forecast before harvesting or spraying and avoid unnecessary irrigation. / बारिश का जोखिम मध्यम से अधिक है। कटाई या छिड़काव से पहले मौसम की निगरानी करें और अनावश्यक सिंचाई से बचें। / ಮಳೆಯ ಸಾಧ್ಯತೆ ಸಾಧಾರಣದಿಂದ ಹೆಚ್ಚಾಗಿದೆ. ಕೊಯ್ಲು ಅಥವಾ ಸಿಂಪರಣೆ ಮಾಡುವ ಮುನ್ನ ಹವಾಮಾನ ಗಮನಿಸಿ ಮತ್ತು ಅನಗತ್ಯ ನೀರಾವರಿ ತಪ್ಪಿಸಿ. / వర్ష ప్రమాదం ఒక మోస్తరు నుండి ఎక్కువగా ఉంది. కోత లేదా పిచికారీకి ముందు వాతావరణాన్ని పర్యవేక్షించండి మరియు అనవసరంగా నీరు పెట్టవద్దు. / மழை ஆபத்து மிதமானது முதல் அதிகம். அறுவடை அல்லது தெளிப்பதற்கு முன் வானிலையை கவனிக்கவும் மற்றும் தேவையற்ற பாசனத்தை தவிர்க்கவும். / മഴ സാധ്യത മിതമായത് മുതൽ ഉയർന്നതാണ്. വിളവെടുപ്പിനോ മരുന്ന് തളിക്കുന്നതിനോ മുൻപ് കാലാവസ്ഥ നിരീക്ഷിക്കുക, അനാവശ്യ നനവ് ഒഴിവാക്കുക.";

    }

    else if (
      precipitationProbability >= 30
    ) {

      advisory =
        "Some rain is possible. Plan irrigation and spraying carefully and monitor crop conditions. / कुछ बारिश की संभावना है। सिंचाई और छिड़काव की योजना सावधानी से बनाएं और फसल की स्थिति पर नजर रखें। / ಸ್ವಲ್ಪ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ. ನೀರಾವರಿ ಮತ್ತು ಸಿಂಪರಣೆಯನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಯೋಜಿಸಿ ಮತ್ತು ಬೆಳೆಯ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ. / కొంత వర్షం పడే అవకాశం ఉంది. నీటిపారుదల మరియు పిచికారీని జాగ్రత్తగా ప్లాన్ చేయండి మరియు పంటను గమనించండి. / சிறிது மழை பெய்ய வாய்ப்புள்ளது. பாசனம் மற்றும் தெளிப்பை கவனமாக திட்டமிட்டு பயிரின் நிலையை கண்காணிக்கவும். / നേരിയ മഴയ്ക്ക് സാധ്യതയുണ്ട്. നനയ്ക്കലും മരുന്ന് തളിക്കലും ശ്രദ്ധയോടെ ആസൂത്രണം ചെയ്യുക.";

    }

    else {

      advisory =
        "Rain risk is low. Normal farming activities can continue while monitoring local weather. / बारिश का जोखिम कम है। स्थानीय मौसम की निगरानी करते हुए सामान्य कृषि गतिविधियां जारी रखी जा सकती हैं। / ಮಳೆಯ ಅಪಾಯ ಕಡಿಮೆ. ಸ್ಥಳೀಯ ಹವಾಮಾನ ಗಮನಿಸುತ್ತಾ ಸಾಮಾನ್ಯ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಮುಂದುವರಿಸಬಹುದು. / వర్ష ప్రమాదం తక్కువ. స్థానిక వాతావరణాన్ని పర్యవేక్షిస్తూ సాధారణ వ్యవసాయ పనులను కొనసాగించవచ్చు. / மழை ஆபத்து குறைவு. உள்ளூர் வானிலையை கவனித்து வழக்கமான விவசாய பணிகளை தொடரலாம். / മഴ സാധ്യത കുറവാണ്. പ്രാദേശിക കാലാവസ്ഥ നിരീക്ഷിച്ച് പതിവ് കാർഷിക ജോലികൾ തുടരാം.";

    }


    // ====================================================
    // WEEKLY FORECAST
    // ====================================================

    const weeklyForecast =

      forecast

        .slice(0, 7)

        .map(
          day => ({

            date:
              String(
                day?.date ||
                "N/A"
              ),

            maxTemp:
              safeNumber(
                day?.maxTemp
              ),

            minTemp:
              safeNumber(
                day?.minTemp
              ),

            rainSum:
              safeNumber(
                day?.rainSum
              ),

            condition:
              day?.condition ||
              getWeatherDescription(
                day?.code
              )

          })
        );


    // ====================================================
    // RETURN FACTUAL RESULT
    // ====================================================

    return {

      currentTemp,

      condition,

      rainForecast,

      advisory,

      precipitationProbability,

      weeklyForecast

    };

  }


  // ======================================================
  // RUN AGENT
  // ======================================================

  async runAgent(
    latitude,
    longitude,
    city
  ) {

    try {

      console.log(
        "\n[WeatherAgent] ======================================"
      );

      console.log(
        "[WeatherAgent] Fetching REAL weather data"
      );

      console.log(
        `[WeatherAgent] Location: ${city}`
      );

      console.log(
        `[WeatherAgent] Coordinates: ${latitude}, ${longitude}`
      );


      // --------------------------------------------------
      // FETCH REAL WEATHER DATA
      // --------------------------------------------------

      const rawWeather =
        await this.fetchWeatherViaMCP(
          latitude,
          longitude,
          city
        );


      if (
        !rawWeather ||
        typeof rawWeather !== "object"
      ) {

        throw new Error(
          "Weather service returned invalid data."
        );

      }


      console.log(
        `[WeatherAgent] Current temperature: ${rawWeather?.current?.temp}°C`
      );


      console.log(
        `[WeatherAgent] Forecast count: ${rawWeather?.forecast?.length || 0}`
      );


      // --------------------------------------------------
      // BUILD RESULT DIRECTLY FROM REAL WEATHER
      // --------------------------------------------------

      const factualWeather =
        this.buildWeatherResult(
          rawWeather
        );


      console.log(
        `[WeatherAgent] FINAL temperature: ${factualWeather.currentTemp}°C`
      );


      console.log(
        `[WeatherAgent] FINAL precipitation probability: ${factualWeather.precipitationProbability}%`
      );


      console.log(
        `[WeatherAgent] FINAL forecast days: ${factualWeather.weeklyForecast.length}`
      );


      console.log(
        "[WeatherAgent] ======================================\n"
      );


      /*
       * IMPORTANT:
       *
       * Do NOT send this result through Gemini.
       *
       * Weather values are factual API data.
       *
       * Gemini previously caused factual values to be changed,
       * for example:
       *
       * 100% -> low rain risk
       * actual condition -> unavailable
       *
       * Therefore the WeatherAgent returns deterministic
       * factual data directly.
       */


      return factualWeather;

    }

    catch (error) {

      console.error(
        "[WeatherAgent] Run error:",
        error
      );


      return this.fallback(

        {
          location:
            city,

          current: {

            temp:
              0,

            condition:
              "Weather data unavailable / मौसम डेटा उपलब्ध नहीं है / ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ / వాతావరణ సమాచారం లేదు / வானிலை தகவல் இல்லை / കാലാവസ്ഥാ വിവരങ്ങൾ ലഭ്യമല്ല"

          },

          forecast: []

        },

        error.message

      );

    }

  }


  // ======================================================
  // FALLBACK
  // ======================================================

  fallback(
    weatherData,
    reason
  ) {

    console.warn(
      `[WeatherAgent] Using fallback: ${reason}`
    );


    return this.buildWeatherResult(
      weatherData
    );

  }

}