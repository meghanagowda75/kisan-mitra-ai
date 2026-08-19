import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";


// ======================================================
// MCP SERVER
// ======================================================

const server = new Server(
  {
    name: "kisan-mitra-weather-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);


// ======================================================
// WEATHER CODES
// ======================================================

const WEATHER_CODES = {
  0: "Clear sky / साफ आसमान",
  1: "Mainly clear / मुख्य रूप से साफ",
  2: "Partly cloudy / आंशिक रूप से बादल",
  3: "Overcast / घने बादल",

  45: "Fog / कोहरा",
  48: "Depositing rime fog / धुंध और कोहरा",

  51: "Light drizzle / हल्की बूंदाबांदी",
  53: "Moderate drizzle / मध्यम बूंदाबांदी",
  55: "Dense drizzle / घनी बूंदाबांदी",

  61: "Slight rain / हल्की बारिश",
  63: "Moderate rain / मध्यम बारिश",
  65: "Heavy rain / भारी बारिश",

  71: "Slight snow / हल्की बर्फबारी",
  73: "Moderate snow / मध्यम बर्फबारी",
  75: "Heavy snow / भारी बर्फबारी",

  80: "Slight rain showers / हल्की बारिश की बौछार",
  81: "Moderate rain showers / मध्यम बारिश की बौछार",
  82: "Heavy rain showers / तेज बारिश की बौछार",

  95: "Thunderstorm / आंधी-तूफान",
  96: "Thunderstorm with slight hail / हल्की ओलावृष्टि के साथ आंधी",
  99: "Thunderstorm with heavy hail / भारी ओलावृष्टि के साथ आंधी",
};


// ======================================================
// WEATHER DESCRIPTION
// ======================================================

function getWeatherDescription(code) {
  const numericCode = Number(code);

  return (
    WEATHER_CODES[numericCode] ||
    "Unknown weather / अज्ञात मौसम"
  );
}


// ======================================================
// SAFE NUMBER
// ======================================================

function safeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}


// ======================================================
// LIST TOOLS
// ======================================================

server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: "get_weather_forecast",

          description:
            "Fetches actual weather forecast from Open-Meteo using latitude and longitude.",

          inputSchema: {
            type: "object",

            properties: {
              latitude: {
                type: "number",
                description: "Latitude",
              },

              longitude: {
                type: "number",
                description: "Longitude",
              },

              city: {
                type: "string",
                description: "Location name",
              },
            },

            required: [
              "latitude",
              "longitude",
            ],
          },
        },
      ],
    };
  }
);


// ======================================================
// TOOL EXECUTION
// ======================================================

server.setRequestHandler(
  CallToolRequestSchema,
  async (request) => {
    const {
      name,
      arguments: args = {},
    } = request.params;


    if (name !== "get_weather_forecast") {
      throw new Error(
        `Tool not found: ${name}`
      );
    }


    const latitude =
      safeNumber(args.latitude, NaN);

    const longitude =
      safeNumber(args.longitude, NaN);

    const city =
      String(
        args.city || "Unknown Location"
      ).trim();


    // ==================================================
    // VALIDATE COORDINATES
    // ==================================================

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return {
        content: [
          {
            type: "text",

            text: JSON.stringify(
              {
                error:
                  "Valid latitude and longitude are required.",

                location:
                  city,
              },
              null,
              2
            ),
          },
        ],

        isError: true,
      };
    }


    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return {
        content: [
          {
            type: "text",

            text: JSON.stringify(
              {
                error:
                  "Latitude or longitude is outside the valid geographic range.",

                location:
                  city,
              },
              null,
              2
            ),
          },
        ],

        isError: true,
      };
    }


    console.error(
      "\n[MCP] ======================================"
    );

    console.error(
      `[MCP] Location: ${city}`
    );

    console.error(
      `[MCP] Latitude: ${latitude}`
    );

    console.error(
      `[MCP] Longitude: ${longitude}`
    );

    console.error(
      "[MCP] Fetching actual Open-Meteo weather..."
    );


    try {

      // ==================================================
      // OPEN-METEO URL
      // ==================================================

      const url =
        "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${encodeURIComponent(latitude)}` +
        `&longitude=${encodeURIComponent(longitude)}` +
        "&current_weather=true" +
        "&daily=" +
        "temperature_2m_max," +
        "temperature_2m_min," +
        "precipitation_probability_max," +
        "rain_sum," +
        "showers_sum," +
        "weathercode" +
        "&timezone=auto";


      console.error(
        `[MCP] Request URL created for ${city}`
      );


      // ==================================================
      // API REQUEST
      // ==================================================

      const response =
        await fetch(url);


      if (!response.ok) {
        const errorText =
          await response.text();

        throw new Error(
          `Open-Meteo API returned status ${response.status}: ${errorText}`
        );
      }


      const data =
        await response.json();


      if (
        !data ||
        typeof data !== "object"
      ) {
        throw new Error(
          "Open-Meteo returned an invalid response."
        );
      }


      console.error(
        "[MCP] Open-Meteo response received"
      );


      // ==================================================
      // CURRENT WEATHER
      // ==================================================

      const current =
        data.current_weather || {};


      const currentTemperature =
        safeNumber(
          current.temperature,
          0
        );


      const currentWindSpeed =
        safeNumber(
          current.windspeed,
          0
        );


      const currentWeatherCode =
        current.weathercode;


      const currentCondition =
        getWeatherDescription(
          currentWeatherCode
        );


      console.error(
        `[MCP] Current temperature: ${currentTemperature}°C`
      );

      console.error(
        `[MCP] Current condition: ${currentCondition}`
      );


      // ==================================================
      // DAILY WEATHER
      // ==================================================

      const daily =
        data.daily || {};


      const forecast = [];


      const dates =
        Array.isArray(daily.time)
          ? daily.time
          : [];


      for (
        let i = 0;
        i < dates.length;
        i++
      ) {

        const maxTemp =
          safeNumber(
            daily.temperature_2m_max?.[i],
            0
          );


        const minTemp =
          safeNumber(
            daily.temperature_2m_min?.[i],
            0
          );


        const rainSum =
          safeNumber(
            daily.rain_sum?.[i],
            0
          );


        const showersSum =
          safeNumber(
            daily.showers_sum?.[i],
            0
          );


        /*
         * Open-Meteo provides rain and showers
         * separately.
         *
         * We expose their sum as total forecast
         * precipitation for that day.
         */

        const totalRain =
          rainSum + showersSum;


        /*
         * IMPORTANT:
         *
         * This is the actual Open-Meteo
         * precipitation probability.
         *
         * It must never be replaced with a
         * hardcoded value.
         */

        const rainProbability =
          safeNumber(
            daily.precipitation_probability_max?.[i],
            0
          );


        const weatherCode =
          daily.weathercode?.[i];


        const day = {

          date:
            dates[i],

          maxTemp,

          minTemp,

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
            weatherCode,
        };


        forecast.push(day);


        console.error(
          `[MCP] ${day.date} | ` +
          `Rain Probability: ${day.rainProbability}% | ` +
          `Rain: ${day.rainSum} mm | ` +
          `Max: ${day.maxTemp}°C | ` +
          `Min: ${day.minTemp}°C`
        );
      }


      // ==================================================
      // WEATHER STATISTICS
      // ==================================================

      const probabilities =
        forecast

          .map(
            day =>
              Number(
                day.rainProbability
              )
          )

          .filter(
            value =>
              Number.isFinite(value)
          );


      const maxRainProbability =
        probabilities.length > 0
          ? Math.max(
              ...probabilities
            )
          : 0;


      const averageRainProbability =
        probabilities.length > 0

          ? probabilities.reduce(
              (sum, value) =>
                sum + value,
              0
            ) / probabilities.length

          : 0;


      const totalForecastRain =
        forecast.reduce(
          (sum, day) =>
            sum +
            safeNumber(
              day.rainSum,
              0
            ),
          0
        );


      const rainyDays =
        forecast.filter(
          day =>
            safeNumber(
              day.rainSum,
              0
            ) >= 1 ||

            safeNumber(
              day.rainProbability,
              0
            ) >= 50
        ).length;


      // ==================================================
      // DEBUG
      // ==================================================

      console.error(
        "[MCP] --------------------------------------"
      );

      console.error(
        `[MCP] Maximum actual rain probability: ${maxRainProbability}%`
      );

      console.error(
        `[MCP] Average rain probability: ${averageRainProbability.toFixed(1)}%`
      );

      console.error(
        `[MCP] Total forecast rain: ${totalForecastRain.toFixed(1)} mm`
      );

      console.error(
        `[MCP] Rainy days: ${rainyDays}`
      );

      console.error(
        `[MCP] Forecast records: ${forecast.length}`
      );

      console.error(
        "[MCP] --------------------------------------"
      );


      // ==================================================
      // FINAL PAYLOAD
      // ==================================================

      const payload = {

        location:
          city,

        coordinates: {

          latitude,

          longitude,
        },


        current: {

          temp:
            currentTemperature,

          windSpeed:
            currentWindSpeed,

          condition:
            currentCondition,

          code:
            currentWeatherCode,

          time:
            current.time || null,
        },


        forecast,


        weatherStatistics: {

          maxRainProbability:
            Number(
              maxRainProbability
            ),

          averageRainProbability:
            Number(
              averageRainProbability.toFixed(1)
            ),

          totalForecastRain:
            Number(
              totalForecastRain.toFixed(1)
            ),

          rainyDays,
        },
      };


      console.error(
        `[MCP] FINAL MAX RAIN PROBABILITY: ${maxRainProbability}%`
      );

      console.error(
        `[MCP] FINAL FORECAST DAYS: ${forecast.length}`
      );

      console.error(
        "[MCP] ======================================\n"
      );


      // ==================================================
      // RETURN MCP DATA
      // ==================================================

      return {

        content: [

          {

            type: "text",

            text:
              JSON.stringify(
                payload,
                null,
                2
              ),
          },
        ],
      };

    }


    catch (error) {

      console.error(
        `[MCP] Weather API Error: ${error.message}`
      );


      return {

        content: [

          {

            type: "text",

            text:
              JSON.stringify(
                {

                  error:
                    `Failed to fetch weather: ${error.message}`,

                  location:
                    city,

                  coordinates: {

                    latitude,

                    longitude,
                  },

                },

                null,
                2
              ),
          },
        ],

        isError: true,
      };
    }
  }
);


// ======================================================
// START MCP SERVER
// ======================================================

const transport =
  new StdioServerTransport();


await server.connect(
  transport
);


console.error(
  "KisanMitra Weather MCP Server running on stdio transport"
);