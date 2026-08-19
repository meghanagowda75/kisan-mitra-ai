import { BaseAgent } from "./BaseAgent.js";

import { WeatherAgent } from "./WeatherAgent.js";
import { CropSoilAgent } from "./CropSoilAgent.js";
import { MarketAgent } from "./MarketAgent.js";


// ============================================================
// ORCHESTRATOR SCHEMA (MULTILINGUAL)
// ============================================================

const orchestratorAgentSchema = {

  type: "OBJECT",

  properties: {

    finalDecision: {

      type: "OBJECT",

      properties: {

        en: { type: "STRING" },
        hi: { type: "STRING" },
        kn: { type: "STRING" },
        te: { type: "STRING" },
        ta: { type: "STRING" },
        ml: { type: "STRING" }

      },

      required: [
        "en",
        "hi",
        "kn",
        "te",
        "ta",
        "ml"
      ]

    },

    oneLineReason: {

      type: "OBJECT",

      properties: {

        en: { type: "STRING" },
        hi: { type: "STRING" },
        kn: { type: "STRING" },
        te: { type: "STRING" },
        ta: { type: "STRING" },
        ml: { type: "STRING" }

      },

      required: [
        "en",
        "hi",
        "kn",
        "te",
        "ta",
        "ml"
      ]

    },

    transparencyPanel: {

      type: "OBJECT",

      properties: {

        weatherSummary: {

          type: "OBJECT",

          properties: {

            en: { type: "STRING" },
            hi: { type: "STRING" },
            kn: { type: "STRING" },
            te: { type: "STRING" },
            ta: { type: "STRING" },
            ml: { type: "STRING" }

          },

          required: [
            "en",
            "hi",
            "kn",
            "te",
            "ta",
            "ml"
          ]

        },

        cropSoilSummary: {

          type: "OBJECT",

          properties: {

            en: { type: "STRING" },
            hi: { type: "STRING" },
            kn: { type: "STRING" },
            te: { type: "STRING" },
            ta: { type: "STRING" },
            ml: { type: "STRING" }

          },

          required: [
            "en",
            "hi",
            "kn",
            "te",
            "ta",
            "ml"
          ]

        },

        marketSummary: {

          type: "OBJECT",

          properties: {

            en: { type: "STRING" },
            hi: { type: "STRING" },
            kn: { type: "STRING" },
            te: { type: "STRING" },
            ta: { type: "STRING" },
            ml: { type: "STRING" }

          },

          required: [
            "en",
            "hi",
            "kn",
            "te",
            "ta",
            "ml"
          ]

        }

      },

      required: [
        "weatherSummary",
        "cropSoilSummary",
        "marketSummary"
      ]

    }

  },

  required: [
    "finalDecision",
    "oneLineReason",
    "transparencyPanel"
  ]

};


// ============================================================
// LOCATION MAP
// ============================================================

const GEOLOCATION_MAP = {

  bengaluru: {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru, Karnataka",
    state: "Karnataka"
  },

  bangalore: {
    lat: 12.9716,
    lon: 77.5946,
    name: "Bengaluru, Karnataka",
    state: "Karnataka"
  },

  mysuru: {
    lat: 12.2958,
    lon: 76.6394,
    name: "Mysuru, Karnataka",
    state: "Karnataka"
  },

  hubli: {
    lat: 15.3647,
    lon: 75.1240,
    name: "Hubballi, Karnataka",
    state: "Karnataka"
  },

  hubballi: {
    lat: 15.3647,
    lon: 75.1240,
    name: "Hubballi, Karnataka",
    state: "Karnataka"
  },

  mangaluru: {
    lat: 12.9141,
    lon: 74.8560,
    name: "Mangaluru, Karnataka",
    state: "Karnataka"
  },

  jaipur: {
    lat: 26.9124,
    lon: 75.7873,
    name: "Jaipur, Rajasthan",
    state: "Rajasthan"
  },

  jodhpur: {
    lat: 26.2389,
    lon: 73.0243,
    name: "Jodhpur, Rajasthan",
    state: "Rajasthan"
  },

  udaipur: {
    lat: 24.5854,
    lon: 73.7125,
    name: "Udaipur, Rajasthan",
    state: "Rajasthan"
  },

  kota: {
    lat: 25.2138,
    lon: 75.8648,
    name: "Kota, Rajasthan",
    state: "Rajasthan"
  },

  ajmer: {
    lat: 26.4499,
    lon: 74.6399,
    name: "Ajmer, Rajasthan",
    state: "Rajasthan"
  },

  ludhiana: {
    lat: 30.9010,
    lon: 75.8573,
    name: "Ludhiana, Punjab",
    state: "Punjab"
  },

  amritsar: {
    lat: 31.6340,
    lon: 74.8723,
    name: "Amritsar, Punjab",
    state: "Punjab"
  },

  patna: {
    lat: 25.5941,
    lon: 85.1376,
    name: "Patna, Bihar",
    state: "Bihar"
  },

  pune: {
    lat: 18.5204,
    lon: 73.8567,
    name: "Pune, Maharashtra",
    state: "Maharashtra"
  },

  nagpur: {
    lat: 21.1458,
    lon: 79.0882,
    name: "Nagpur, Maharashtra",
    state: "Maharashtra"
  },

  nashik: {
    lat: 19.9975,
    lon: 73.7898,
    name: "Nashik, Maharashtra",
    state: "Maharashtra"
  },

  lucknow: {
    lat: 26.8467,
    lon: 80.9462,
    name: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh"
  },

  kanpur: {
    lat: 26.4499,
    lon: 80.3319,
    name: "Kanpur, Uttar Pradesh",
    state: "Uttar Pradesh"
  },

  rohtak: {
    lat: 28.8955,
    lon: 76.6066,
    name: "Rohtak, Haryana",
    state: "Haryana"
  },

  gurgaon: {
    lat: 28.4595,
    lon: 77.0266,
    name: "Gurgaon, Haryana",
    state: "Haryana"
  },

  hyderabad: {
    lat: 17.3850,
    lon: 78.4867,
    name: "Hyderabad, Telangana",
    state: "Telangana"
  },

  bhopal: {
    lat: 23.2599,
    lon: 77.4126,
    name: "Bhopal, Madhya Pradesh",
    state: "Madhya Pradesh"
  },

  indore: {
    lat: 22.7196,
    lon: 75.8577,
    name: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh"
  }

};


// ============================================================
// STATE FALLBACK LOCATIONS
// ============================================================

const STATE_FALLBACK_MAP = {

  karnataka:
    GEOLOCATION_MAP.bengaluru,

  rajasthan:
    GEOLOCATION_MAP.jaipur,

  punjab:
    GEOLOCATION_MAP.ludhiana,

  maharashtra:
    GEOLOCATION_MAP.pune,

  telangana:
    GEOLOCATION_MAP.hyderabad,

  haryana:
    GEOLOCATION_MAP.rohtak,

  bihar:
    GEOLOCATION_MAP.patna,

  "uttar pradesh":
    GEOLOCATION_MAP.lucknow,

  "madhya pradesh":
    GEOLOCATION_MAP.bhopal

};


// ============================================================
// ORCHESTRATOR AGENT
// ============================================================

export class OrchestratorAgent extends BaseAgent {

  constructor() {

    super({

      name:
        "OrchestratorAgent",

      description:
        "Combines weather, crop-soil and market analysis to produce a deterministic SELL or HOLD farming decision.",

      systemInstruction: `

You are the KisanMitra Lead Orchestrator.

The Market Agent provides the primary SELL/HOLD recommendation.

IMPORTANT RULES:

1. Never invent market values.
2. Never change the Market Agent recommendation.
3. finalDecision MUST start with SELL or HOLD in respective languages.
4. finalDecision MUST contain the actual crop name.
5. Never output undefined.
6. Never output "SELL undefined" or "HOLD undefined".
7. Use actual Weather Agent values.
8. Use actual CropSoilAgent values.
9. Transparency must reflect supplied agent results.
10. Do not invent numerical values.
11. Keep the final decision short.
12. Weather advice belongs in the reason.
13. Return all 6 supported languages: English (en), Hindi (hi), Kannada (kn), Telugu (te), Tamil (ta), Malayalam (ml).
14. The application code determines the final SELL/HOLD value.
15. Do not override the deterministic decision calculated by the application.

The Market Agent recommendation is authoritative.

`,

      responseSchema:
        orchestratorAgentSchema

    });


    this.weatherAgent =
      new WeatherAgent();


    this.cropSoilAgent =
      new CropSoilAgent();


    this.marketAgent =
      new MarketAgent();

  }


  // ==========================================================
  // LOCATION RESOLUTION
  // ==========================================================

  resolveLocation(location) {

    const originalLocation =
      String(
        location || ""
      )
      .trim();


    // --------------------------------------------------------
    // No location supplied
    // --------------------------------------------------------

    if (!originalLocation) {

      return {

        ...GEOLOCATION_MAP.bengaluru,

        requestedLocation:
          "Bengaluru, Karnataka",

        exactMatch:
          false,

        fallback:
          true

      };

    }


    const clean =
      originalLocation
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");


    // --------------------------------------------------------
    // Exact / known city matching
    // --------------------------------------------------------

    for (
      const key of Object.keys(GEOLOCATION_MAP)
    ) {

      if (
        clean === key ||
        clean.startsWith(`${key},`) ||
        clean.startsWith(`${key} `)
      ) {

        const matched =
          GEOLOCATION_MAP[key];


        return {

          ...matched,

          requestedLocation:
            originalLocation,

          exactMatch:
            true,

          fallback:
            false

        };

      }

    }


    // --------------------------------------------------------
    // State-level fallback
    // --------------------------------------------------------

    const states =
      Object.keys(
        STATE_FALLBACK_MAP
      );


    for (
      const stateKey of states
    ) {

      if (
        clean.includes(stateKey)
      ) {

        const fallbackLocation =
          STATE_FALLBACK_MAP[stateKey];


        return {

          lat:
            fallbackLocation.lat,

          lon:
            fallbackLocation.lon,

          name:
            originalLocation,

          state:
            fallbackLocation.state,

          requestedLocation:
            originalLocation,

          exactMatch:
            false,

          fallback:
            true

        };

      }

    }


    // --------------------------------------------------------
    // Unknown location
    // --------------------------------------------------------

    return {

      ...GEOLOCATION_MAP.bengaluru,

      name:
        originalLocation,

      requestedLocation:
        originalLocation,

      state:
        "",

      exactMatch:
        false,

      fallback:
        true

    };

  }


  // ==========================================================
  // MAIN ORCHESTRATOR
  // ==========================================================

  async runOrchestrator({

    cropType,

    soilType,

    location,

    question

  }) {

    console.log(
      "\n========================================"
    );

    console.log(
      "[Orchestrator] Starting analysis"
    );

    console.log(
      `[Orchestrator] Crop: ${cropType}`
    );

    console.log(
      `[Orchestrator] Soil: ${soilType}`
    );

    console.log(
      `[Orchestrator] Location: ${location}`
    );

    console.log(
      "========================================"
    );


    // ========================================================
    // SAFE INPUTS
    // ========================================================

    const safeCrop =
      String(
        cropType || "crop"
      )
      .trim();


    const safeSoil =
      String(
        soilType || "unknown"
      )
      .trim();


    const safeQuestion =
      String(
        question || ""
      )
      .trim();


    const geo =
      this.resolveLocation(
        location
      );


    console.log(
      `[Orchestrator] Requested location: ${geo.requestedLocation || location}`
    );


    console.log(
      `[Orchestrator] Weather location: ${geo.name}`
    );


    console.log(
      `[Orchestrator] Coordinates: ${geo.lat}, ${geo.lon}`
    );


    console.log(
      `[Orchestrator] Location exact match: ${geo.exactMatch}`
    );


    console.log(
      `[Orchestrator] Location fallback: ${geo.fallback}`
    );


    console.log(
      `[Orchestrator] Market state: ${geo.state || "ALL INDIA"}`
    );


    // ========================================================
    // RUN ALL AGENTS
    // ========================================================

    const results =
      await Promise.allSettled([

        this.weatherAgent.runAgent(

          geo.lat,

          geo.lon,

          geo.name

        ),

        this.cropSoilAgent.runAgent(

          safeCrop,

          safeSoil,

          safeQuestion

        ),

        this.marketAgent.runAgent(

          safeCrop,

          geo.state || ""

        )

      ]);


    // ========================================================
    // WEATHER RESULT
    // ========================================================

    let weatherResult;


    if (
      results[0].status === "fulfilled"
    ) {

      weatherResult =
        results[0].value || {};

    }

    else {

      console.error(
        "[Orchestrator] Weather agent failed:",
        results[0].reason
      );


      weatherResult = {

        currentTemp:
          null,

        condition:
          "Weather data unavailable / मौसम डेटा उपलब्ध नहीं है / ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ / వాతావరణ సమాచారం లేదు / வானிலை தகவல் இல்லை / കാലാവസ്ഥാ വിവരങ്ങൾ ലഭ്യമല്ല",

        rainForecast:
          "Rain forecast unavailable. / बारिश का पूर्वानुमान उपलब्ध नहीं है। / ಮಳೆ ಮುನ್ಸೂಚನೆ ಲಭ್ಯವಿಲ್ಲ. / వర్ష సూచన అందుబాటులో లేదు. / மழை முன்கணிப்பு கிடைக்கவில்லை. / മഴ പ്രവചനം ലഭ്യമല്ല.",

        advisory:
          "Weather data unavailable. / मौसम डेटा उपलब्ध नहीं है। / ಹವಾಮಾನ ಸಲಹೆ ಲಭ್ಯವಿಲ್ಲ. / వాతావరణ సలహా అందుబాటులో లేదు. / வானிலை ஆலோசனை கிடைக்கவில்லை. / കാലാവസ്ഥാ നിർദ്ദേശം ലഭ്യമല്ല.",

        precipitationProbability:
          null,

        weeklyForecast:
          []

      };

    }


    // ========================================================
    // CROP SOIL RESULT
    // ========================================================

    const cropSoilResult =
      results[1].status === "fulfilled"

        ? (
            results[1].value || {}
          )

        : {};


    if (
      results[1].status === "rejected"
    ) {

      console.error(
        "[Orchestrator] CropSoil agent failed:",
        results[1].reason
      );

    }


    // ========================================================
    // MARKET RESULT
    // ========================================================

    const marketResult =
      results[2].status === "fulfilled"

        ? (
            results[2].value || {}
          )

        : this.marketFallback(

            safeCrop,

            results[2].reason?.message ||
            "Market agent error"

          );


    // ========================================================
    // DEBUG
    // ========================================================

    console.log(
      "\n========== WEATHER RESULT =========="
    );

    console.log(
      JSON.stringify(
        weatherResult,
        null,
        2
      )
    );


    console.log(
      "\n========== CROP SOIL RESULT =========="
    );

    console.log(
      JSON.stringify(
        cropSoilResult,
        null,
        2
      )
    );


    console.log(
      "\n========== MARKET RESULT =========="
    );

    console.log(
      JSON.stringify(
        marketResult,
        null,
        2
      )
    );


    // ========================================================
    // CONTEXT
    // ========================================================

    const context = {

      cropType:
        safeCrop,

      soilType:
        safeSoil,

      location:
        geo.name,

      requestedLocation:
        geo.requestedLocation ||
        String(location || geo.name),

      state:
        geo.state || "",

      coordinates: {

        latitude:
          geo.lat,

        longitude:
          geo.lon

      },

      question:
        safeQuestion,

      weatherResult:
        weatherResult || {},

      cropSoilResult:
        cropSoilResult || {},

      marketResult:
        marketResult || {}

    };


    // ========================================================
    // DETERMINISTIC DECISION
    // ========================================================

    const orchestratorResponse =
      this.buildDeterministicDecision(
        context
      );


    // ========================================================
    // FINAL RESPONSE
    // ========================================================

    return {

      success:
        true,

      cropType:
        context.cropType,

      soilType:
        context.soilType,

      location:
        context.location,

      requestedLocation:
        context.requestedLocation,

      state:
        context.state,

      coordinates:
        context.coordinates,

      orchestratorResponse,

      transparencyData: {

        weather:
          context.weatherResult,

        cropSoil:
          context.cropSoilResult,

        market:
          context.marketResult

      }

    };

  }


  // ==========================================================
  // DETERMINISTIC FINAL DECISION
  // ==========================================================

  buildDeterministicDecision(context) {

    // ========================================================
    // SAFE CROP NAME
    // ========================================================

    let cropName =
      String(
        context?.cropType || ""
      )
      .trim();


    if (
      !cropName ||
      cropName.toLowerCase() === "undefined" ||
      cropName.toLowerCase() === "null" ||
      cropName.toLowerCase() === "crop"
    ) {

      cropName =
        "crop";

    }


    // ========================================================
    // WEATHER
    // ========================================================

    const weather =
      context?.weatherResult || {};


    // ========================================================
    // MARKET
    // ========================================================

    const market =
      context?.marketResult || {};


    // ========================================================
    // MARKET RECOMMENDATION
    // ========================================================

    const rawRecommendation =
      String(
        market.recommendation || ""
      )
      .toUpperCase()
      .trim();


    const decision =
      rawRecommendation === "SELL"
        ? "SELL"
        : "HOLD";


    console.log(
      `[Orchestrator] Market recommendation: ${rawRecommendation || "MISSING"}`
    );

    console.log(
      `[Orchestrator] Final deterministic decision: ${decision}`
    );

    console.log(
      `[Orchestrator] Final crop name: ${cropName}`
    );


    // ========================================================
    // WEATHER PROBABILITY
    // ========================================================

    const probabilityRaw =
      Number(
        weather.precipitationProbability
      );


    const probability =
      Number.isFinite(
        probabilityRaw
      )
        ? probabilityRaw
        : null;


    const highRain =
      probability !== null &&
      probability >= 75;


    const moderateRain =
      probability !== null &&
      probability >= 50 &&
      probability < 75;


    // ========================================================
    // FINAL DECISION (6 LANGUAGES)
    // ========================================================

    const finalDecision = {

      en:
        decision === "SELL"
          ? `SELL ${cropName} NOW`
          : `HOLD ${cropName}`,

      hi:
        decision === "SELL"
          ? `अभी ${cropName} बेचें`
          : `${cropName} रोककर रखें`,

      kn:
        decision === "SELL"
          ? `ಈಗಲೇ ${cropName} ಮಾರಿ`
          : `${cropName} ದಾಸ್ತಾನು ಇರಿಸಿ`,

      te:
        decision === "SELL"
          ? `ఇప్పుడే ${cropName} అమ్మండి`
          : `${cropName} నిల్వ ఉంచండి`,

      ta:
        decision === "SELL"
          ? `இப்போதே ${cropName} விற்கவும்`
          : `${cropName} இருப்பு வைக்கவும்`,

      ml:
        decision === "SELL"
          ? `ഇപ്പോൾ ${cropName} വിൽക്കുക`
          : `${cropName} സൂക്ഷിക്കുക`

    };


    // ========================================================
    // MARKET REASON
    // ========================================================

    const marketReason =
      String(
        market.recommendationText || ""
      )
      .trim();


    // ========================================================
    // REASON (6 LANGUAGES)
    // ========================================================

    let reasonEn = "";
    let reasonHi = "";
    let reasonKn = "";
    let reasonTe = "";
    let reasonTa = "";
    let reasonMl = "";


    // ========================================================
    // SELL REASON
    // ========================================================

    if (
      decision === "SELL"
    ) {

      if (
        highRain
      ) {

        reasonEn =
          `Market conditions favor selling. Rain probability is ${probability}%, so sell if the crop is ready and protect harvested ${cropName} from rain.`;

        reasonHi =
          `बाजार की स्थिति बिक्री के पक्ष में है। बारिश की संभावना ${probability}% है, इसलिए फसल तैयार हो तो बेचें और कटी हुई ${cropName} को बारिश से बचाएं।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿ ಮಾರಾಟಕ್ಕೆ ಪೂರಕವಾಗಿದೆ. ಮಳೆಯ ಸಂಭವನೀಯತೆ ${probability}% ಇರುವುದರಿಂದ, ಬೆಳೆ ಸಿದ್ಧವಾಗಿದ್ದರೆ ಮಾರಿ ಮತ್ತು ಕೊಯ್ಲು ಮಾಡಿದ ${cropName} ಬೆಳೆಯನ್ನು ಮಳೆಯಿಂದ ರಕ್ಷಿಸಿ.`;

        reasonTe =
          `మార్కెట్ పరిస్థితులు అమ్మకానికి అనుకూలంగా ఉన్నాయి. వర్ష సూచన ${probability}% ఉంది, కాబట్టి పంట సిద్ధంగా ఉంటే విక్రయించండి మరియు కోసిన ${cropName} పంటను వర్షం నుండి రక్షించండి.`;

        reasonTa =
          `சந்தை நிலைமைகள் விற்பனைக்கு சாதகமாக உள்ளன. மழை வாய்ப்பு ${probability}%, எனவே பயிர் தயாராக இருந்தால் விற்று, அறுவடை செய்த ${cropName} பயிரை மழையிலிருந்து பாதுகாக்கவும்.`;

        reasonMl =
          `വിപണി സാഹചര്യങ്ങൾ വിൽക്കാൻ അനുകൂലമാണ്. മഴ സാധ്യത ${probability}% ഉള്ളതിനാൽ, വിളവെടുപ്പ് കഴിഞ്ഞ ${cropName} മഴയിൽ നിന്ന് സംരക്ഷിക്കുക.`;

      }

      else if (
        moderateRain
      ) {

        reasonEn =
          `Market conditions favor selling. Rain probability is ${probability}%, so plan harvesting carefully around the weather.`;

        reasonHi =
          `बाजार की स्थिति बिक्री के पक्ष में है। बारिश की संभावना ${probability}% है, इसलिए मौसम के अनुसार सावधानी से कटाई की योजना बनाएं।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಮಾರಾಟಕ್ಕೆ ಪೂರಕವಾಗಿದೆ. ಮಳೆಯ ಸಂಭವನೀಯತೆ ${probability}% ಇರುವುದರಿಂದ ಹವಾಮಾನ ಗಮನಿಸಿ ಜಾಗರೂಕತೆಯಿಂದ ಕೊಯ್ಲು ಮಾಡಿ.`;

        reasonTe =
          `మార్కెట్ పరిస్థితులు విక్రయానికి అనుకూలంగా ఉన్నాయి. వర్ష సూచన ${probability}% ఉన్నందున వాతావరణాన్ని బట్టి జాగ్రత్తగా కోత ప్రణాళిక వేయండి.`;

        reasonTa =
          `சந்தை நிலைமைகள் விற்பனைக்கு சாதகமாக உள்ளன. மழை வாய்ப்பு ${probability}%, எனவே வானிலைக்கு ஏற்ப அறுவடையை திட்டமிடுங்கள்.`;

        reasonMl =
          `വിപണി വിൽക്കാൻ അനുകൂലമാണ്. മഴ സാധ്യത ${probability}% ഉള്ളതിനാൽ കാലാവസ്ഥ ശ്രദ്ധിച്ച് വിളവെടുപ്പ് ആസൂത്രണം ചെയ്യുക.`;

      }

      else if (
        marketReason
      ) {

        reasonEn =
          splitLanguage(marketReason, "en") ||
          `Market conditions favor selling ${cropName}.`;

        reasonHi =
          splitLanguage(marketReason, "hi") ||
          `बाजार की स्थिति ${cropName} बेचने के पक्ष में है।`;

        reasonKn =
          splitLanguage(marketReason, "kn") ||
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿ ${cropName} ಮಾರಾಟ ಮಾಡಲು ಪೂರಕವಾಗಿದೆ.`;

        reasonTe =
          splitLanguage(marketReason, "te") ||
          `మార్కెట్ పరిస్థితులు ${cropName} విక్రయానికి అనుకూలంగా ఉన్నాయి.`;

        reasonTa =
          splitLanguage(marketReason, "ta") ||
          `சந்தை நிலைமைகள் ${cropName} விற்பனைக்கு சாதகமாக உள்ளன.`;

        reasonMl =
          splitLanguage(marketReason, "ml") ||
          `വിപണി സാഹചര്യങ്ങൾ ${cropName} വിൽക്കാൻ അനുകൂലമാണ്.`;

      }

      else {

        reasonEn =
          `Market conditions favor selling ${cropName}.`;

        reasonHi =
          `बाजार की स्थिति ${cropName} बेचने के पक्ष में है।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿ ${cropName} ಮಾರಾಟ ಮಾಡಲು ಪೂರಕವಾಗಿದೆ.`;

        reasonTe =
          `మార్కెట్ పరిస్థితులు ${cropName} విక్రయానికి అనుకూలంగా ఉన్నాయి.`;

        reasonTa =
          `சந்தை நிலைமைகள் ${cropName} விற்பனைக்கு சாதகமாக உள்ளன.`;

        reasonMl =
          `വിപണി സാഹചര്യങ്ങൾ ${cropName} വിൽക്കാൻ അനുകൂലമാണ്.`;

      }

    }


    // ========================================================
    // HOLD REASON
    // ========================================================

    else {

      if (
        highRain
      ) {

        reasonEn =
          `Market conditions suggest holding. Rain probability is ${probability}%, so monitor prices and protect harvested ${cropName} from rain.`;

        reasonHi =
          `बाजार की स्थिति फसल रोककर रखने का संकेत देती है। बारिश की संभावना ${probability}% है, इसलिए कीमत पर नजर रखें और कटी हुई ${cropName} को बारिश से बचाएं।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಯು ಬೆಳೆಯನ್ನು ದಾಸ್ತಾನು ಇರಿಸಲು ಸೂಚಿಸುತ್ತದೆ. ಮಳೆಯ ಸಂಭವನೀಯತೆ ${probability}% ಇರುವುದರಿಂದ ಬೆಲೆಗಳನ್ನು ಗಮನಿಸಿ ಮತ್ತು ${cropName} ಬೆಳೆಯನ್ನು ಮಳೆಯಿಂದ ರಕ್ಷಿಸಿ.`;

        reasonTe =
          `మార్కెట్ పరిస్థితులు పంటను నిల్వ ఉంచమని సూచిస్తున్నాయి. వర్ష సూచన ${probability}% ఉన్నందున ధరలను గమనిస్తూ ${cropName} పంటను వర్షం నుండి రక్షించండి.`;

        reasonTa =
          `சந்தை நிலைமைகள் இருப்பு வைக்க பரிந்துரைக்கின்றன. மழை வாய்ப்பு ${probability}%, எனவே விலையை கவனித்து அறுவடை செய்த ${cropName} பயிரை மழையிலிருந்து பாதுகாக்கவும்.`;

        reasonMl =
          `വിപണി സാഹചര്യങ്ങൾ വിള സൂക്ഷിക്കാൻ നിർദ്ദേശിക്കുന്നു. മഴ സാധ്യത ${probability}% ഉള്ളതിനാൽ വില നിരീക്ഷിക്കുകയും ${cropName} വിള സംരക്ഷിക്കുകയും ചെയ്യുക.`;

      }

      else if (
        moderateRain
      ) {

        reasonEn =
          `Market conditions suggest holding. Rain probability is ${probability}%, so monitor prices and weather before harvesting.`;

        reasonHi =
          `बाजार की स्थिति फसल रोककर रखने का संकेत देती है। बारिश की संभावना ${probability}% है, इसलिए कटाई से पहले कीमत और मौसम पर नजर रखें।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಯು ದಾಸ್ತಾನು ಇರಿಸಲು ಸೂಚಿಸುತ್ತದೆ. ಮಳೆ ಸಂಭವನೀಯತೆ ${probability}% ಇರುವುದರಿಂದ ಕೊಯ್ಲು ಮಾಡುವ ಮುನ್ನ ಬೆಲೆ ಮತ್ತು ಹವಾಮಾನ ಗಮನಿಸಿ.`;

        reasonTe =
          `మార్కెట్ నిల్వ ఉంచడానికి అనుకూలంగా ఉంది. వర్ష సూచన ${probability}% ఉన్నందున కోతకు ముందు ధరలు మరియు వాతావరణాన్ని పర్యవేక్షించండి.`;

        reasonTa =
          `சந்தை நிலைமைகள் இருப்பு வைக்க பரிந்துரைக்கின்றன. மழை வாய்ப்பு ${probability}%, எனவே அறுவடைக்கு முன் விலை மற்றும் வானிலையை கண்காணிக்கவும்.`;

        reasonMl =
          `വിപണി വിള സൂക്ഷിക്കാൻ നിർദ്ദേശിക്കുന്നു. മഴ സാധ്യത ${probability}% ഉള്ളതിനാൽ വിളവെടുപ്പിന് മുൻപ് വിലയും കാലാവസ്ഥയും നിരീക്ഷിക്കുക.`;

      }

      else if (
        marketReason
      ) {

        reasonEn =
          splitLanguage(marketReason, "en") ||
          `Market conditions suggest holding ${cropName} and monitoring prices.`;

        reasonHi =
          splitLanguage(marketReason, "hi") ||
          `बाजार की स्थिति ${cropName} रोककर रखने और कीमत पर नजर रखने का संकेत देती है।`;

        reasonKn =
          splitLanguage(marketReason, "kn") ||
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಯು ${cropName} ದಾಸ್ತಾನು ಇರಿಸಲು ಮತ್ತು ಬೆಲೆಗಳನ್ನು ಗಮನಿಸಲು ಸೂಚಿಸುತ್ತದೆ.`;

        reasonTe =
          splitLanguage(marketReason, "te") ||
          `మార్కెట్ పరిస్థితులు ${cropName} నిల్వ ఉంచి ధరలను గమనించాలని సూచిస్తున్నాయి.`;

        reasonTa =
          splitLanguage(marketReason, "ta") ||
          `சந்தை நிலைமைகள் ${cropName} இருப்பு வைத்து விலையை கண்காணிக்க பரிந்துரைக்கின்றன.`;

        reasonMl =
          `വിപണി സാഹചര്യങ്ങൾ ${cropName} സൂക്ഷിക്കാനും വില നിരീക്ഷിക്കാനും ശുപാർശ ചെയ്യുന്നു.`;

      }

      else {

        reasonEn =
          `Market conditions suggest holding ${cropName} and monitoring prices.`;

        reasonHi =
          `बाजार की स्थिति ${cropName} रोककर रखने और कीमत पर नजर रखने का संकेत देती है।`;

        reasonKn =
          `ಮಾರುಕಟ್ಟೆ ಪರಿಸ್ಥಿತಿಯು ${cropName} ದಾಸ್ತಾನು ಇರಿಸಲು ಮತ್ತು ಬೆಲೆಗಳನ್ನು ಗಮನಿಸಲು ಸೂಚಿಸುತ್ತದೆ.`;

        reasonTe =
          `మార్కెట్ పరిస్థితులు ${cropName} నిల్వ ఉంచి ధరలను గమనించాలని సూచిస్తున్నాయి.`;

        reasonTa =
          `சந்தை நிலைமைகள் ${cropName} இருப்பு வைத்து விலையை கண்காணிக்க பரிந்துரைக்கின்றன.`;

        reasonMl =
          `വിപണി സാഹചര്യങ്ങൾ ${cropName} സൂക്ഷിക്കാനും വില നിരീക്ഷിക്കാനും ശുപാർശ ചെയ്യുന്നു.`;

      }

    }


    // ========================================================
    // TRANSPARENCY
    // ========================================================

    return {

      finalDecision,

      oneLineReason: {

        en: cleanText(reasonEn),
        hi: cleanText(reasonHi),
        kn: cleanText(reasonKn),
        te: cleanText(reasonTe),
        ta: cleanText(reasonTa),
        ml: cleanText(reasonMl)

      },

      transparencyPanel:
        this.buildTransparencyPanel(
          context
        )

    };

  }


  // ==========================================================
  // MARKET FALLBACK
  // ==========================================================

  marketFallback(
    cropType,
    reason
  ) {

    const safeCrop =
      String(
        cropType || "crop"
      )
      .trim();


    console.error(
      `[Orchestrator] Market agent failed: ${reason}`
    );


    return {

      currentPrice:
        0,

      projectedPrice7Days:
        0,

      priceTrend:
        "Unavailable",

      recommendation:
        "HOLD",

      recommendationText:
        `Government mandi price data is temporarily unavailable for ${safeCrop}. / ${safeCrop} के लिए सरकारी मंडी कीमत का डेटा फिलहाल उपलब्ध नहीं है। / ${safeCrop} ಬೆಳೆಗಾಗಿ ಸರ್ಕಾರಿ ಮಂಡಿ ದರ ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. / ${safeCrop} కోసం మార్కెట్ ధర సమాచారం తాత్కాలికంగా అందుబాటులో లేదు. / ${safeCrop} பயிருக்கான அரசு சந்தை விலை விவரம் தற்போது கிடைக்கவில்லை. / ${safeCrop} വിളയ്ക്കുള്ള വിപണി വില നിലവിൽ ലഭ്യമല്ല.`,

      mspPrice:
        0,

      historicalPrices:
        [],

      projectedPrices:
        []

    };

  }


  // ==========================================================
  // TRANSPARENCY PANEL
  // ==========================================================

  buildTransparencyPanel(context) {

    const weather =
      context?.weatherResult || {};


    const crop =
      context?.cropSoilResult || {};


    const market =
      context?.marketResult || {};


    // ========================================================
    // WEATHER
    // ========================================================

    const probabilityRaw =
      Number(
        weather.precipitationProbability
      );


    const probability =
      Number.isFinite(
        probabilityRaw
      )
        ? probabilityRaw
        : null;


    const temperatureRaw =
      Number(
        weather.currentTemp
      );


    const temperature =
      Number.isFinite(
        temperatureRaw
      )
        ? temperatureRaw
        : null;


    // ========================================================
    // CROP SOIL
    // ========================================================

    const suitabilityRaw =
      Number(
        crop.suitabilityScore
      );


    const suitability =
      Number.isFinite(
        suitabilityRaw
      )
        ? suitabilityRaw
        : null;


    // ========================================================
    // MARKET
    // ========================================================

    const price =
      Number(
        market.currentPrice
      );


    const formattedPrice =
      Number.isFinite(price)

        ? formatPrice(price)

        : "N/A";


    const trend =
      String(
        market.priceTrend ||
        "Unavailable"
      )
      .trim();


    const recommendation =
      String(
        market.recommendation ||
        "HOLD"
      )
      .toUpperCase()
      .trim();


    const safeRecommendation =
      recommendation === "SELL"
        ? "SELL"
        : "HOLD";


    // ========================================================
    // WEATHER SUMMARY (6 LANGUAGES)
    // ========================================================

    const weatherProbEn = probability === null ? "Rain probability: unavailable." : `Rain probability: ${probability}%.`;
    const weatherProbHi = probability === null ? "बारिश की संभावना: उपलब्ध नहीं है।" : `बारिश की संभावना: ${probability}%।`;
    const weatherProbKn = probability === null ? "ಮಳೆ ಸಂಭವನೀಯತೆ: ಲಭ್ಯವಿಲ್ಲ." : `ಮಳೆ ಸಂಭವನೀಯತೆ: ${probability}%.`;
    const weatherProbTe = probability === null ? "వర్ష సూచన: అందుబాటులో లేదు." : `వర్ష సూచన: ${probability}%.`;
    const weatherProbTa = probability === null ? "மழை வாய்ப்பு: கிடைக்கவில்லை." : `மழை வாய்ப்பு: ${probability}%.`;
    const weatherProbMl = probability === null ? "മഴ സാധ്യത: ലഭ്യമല്ല." : `മഴ സാധ്യത: ${probability}%.`;

    const tempEn = temperature === null ? "Temperature: unavailable." : `Temperature: ${temperature}°C.`;
    const tempHi = temperature === null ? "तापमान: उपलब्ध नहीं है।" : `तापमान: ${temperature}°C।`;
    const tempKn = temperature === null ? "ತಾಪಮಾನ: ಲಭ್ಯವಿಲ್ಲ." : `ತಾಪಮಾನ: ${temperature}°C.`;
    const tempTe = temperature === null ? "ఉష్ణోగ్రత: అందుబాటులో లేదు." : `ఉష్ణోగ్రత: ${temperature}°C.`;
    const tempTa = temperature === null ? "வெப்பநிலை: கிடைக்கவில்லை." : `வெப்பநிலை: ${temperature}°C.`;
    const tempMl = temperature === null ? "താപനില: ലഭ്യമല്ല." : `താപനില: ${temperature}°C.`;

    const advEn = splitLanguage(weather.advisory, "en");
    const advHi = splitLanguage(weather.advisory, "hi");
    const advKn = splitLanguage(weather.advisory, "kn");
    const advTe = splitLanguage(weather.advisory, "te");
    const advTa = splitLanguage(weather.advisory, "ta");
    const advMl = splitLanguage(weather.advisory, "ml");


    // ========================================================
    // CROP SUMMARY (6 LANGUAGES)
    // ========================================================

    const suitEn = suitability === null ? "Soil suitability: unavailable." : `Soil suitability: ${suitability}%.`;
    const suitHi = suitability === null ? "मिट्टी की उपयुक्तता: उपलब्ध नहीं है।" : `मिट्टी की उपयुक्तता: ${suitability}%।`;
    const suitKn = suitability === null ? "ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ: ಲಭ್ಯವಿಲ್ಲ." : `ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ: ${suitability}%.`;
    const suitTe = suitability === null ? "నేల అనుకూలత: అందుబాటులో లేదు." : `నేల అనుకూలత: ${suitability}%.`;
    const suitTa = suitability === null ? "மண் பொருத்தம்: கிடைக்கவில்லை." : `மண் பொருத்தம்: ${suitability}%.`;
    const suitMl = suitability === null ? "മണ്ണ് അനുയോജ്യത: ലഭ്യമല്ല." : `മണ്ണ് അനുയോജ്യത: ${suitability}%.`;

    const waterEn = splitLanguage(crop.wateringNeeds, "en");
    const waterHi = splitLanguage(crop.wateringNeeds, "hi");
    const waterKn = splitLanguage(crop.wateringNeeds, "kn");
    const waterTe = splitLanguage(crop.wateringNeeds, "te");
    const waterTa = splitLanguage(crop.wateringNeeds, "ta");
    const waterMl = splitLanguage(crop.wateringNeeds, "ml");


    // ========================================================
    // FINAL TRANSPARENCY OBJECT
    // ========================================================

    return {

      weatherSummary: {

        en: cleanText(`${weatherProbEn} ${tempEn} ${advEn}`),
        hi: cleanText(`${weatherProbHi} ${tempHi} ${advHi}`),
        kn: cleanText(`${weatherProbKn} ${tempKn} ${advKn}`),
        te: cleanText(`${weatherProbTe} ${tempTe} ${advTe}`),
        ta: cleanText(`${weatherProbTa} ${tempTa} ${advTa}`),
        ml: cleanText(`${weatherProbMl} ${tempMl} ${advMl}`)

      },


      cropSoilSummary: {

        en: cleanText(`${suitEn} ${waterEn}`),
        hi: cleanText(`${suitHi} ${waterHi}`),
        kn: cleanText(`${suitKn} ${waterKn}`),
        te: cleanText(`${suitTe} ${waterTe}`),
        ta: cleanText(`${suitTa} ${waterTa}`),
        ml: cleanText(`${suitMl} ${waterMl}`)

      },


      marketSummary: {

        en: `Price: ₹${formattedPrice}. Trend: ${trend}. Recommendation: ${safeRecommendation}`,
        hi: `मूल्य: ₹${formattedPrice}। रुझान: ${trend}। सलाह: ${safeRecommendation}`,
        kn: `ಬೆಲೆ: ₹${formattedPrice}. ಪ್ರವೃತ್ತಿ: ${trend}. ಶಿಫಾರಸು: ${safeRecommendation}`,
        te: `ధర: ₹${formattedPrice}. సరళి: ${trend}. సిఫార్సు: ${safeRecommendation}`,
        ta: `விலை: ₹${formattedPrice}. போக்கு: ${trend}. பரிந்துரை: ${safeRecommendation}`,
        ml: `വില: ₹${formattedPrice}. പ്രവണത: ${trend}. ശുപാർശ: ${safeRecommendation}`

      }

    };

  }

}


// ============================================================
// MULTILINGUAL HELPERS
// ============================================================

function splitLanguage(text, targetLang) {

  if (
    text === null ||
    text === undefined
  ) {

    return "";

  }


  const value =
    String(text)
      .trim();


  if (
    !value
  ) {

    return "";

  }

  const parts = value.split("/");
  const langOrder = ["en", "hi", "kn", "te", "ta", "ml"];
  const targetIdx = langOrder.indexOf(targetLang);

  if (targetIdx !== -1 && parts.length > targetIdx) {
    return parts[targetIdx].trim();
  }

  return parts[0].trim();

}


// ============================================================
// TEXT CLEANER
// ============================================================

function cleanText(text) {

  if (
    text === null ||
    text === undefined
  ) {

    return "";

  }


  return String(text)
    .replace(/\bundefined\b/gi, "")
    .replace(/\bnull\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

}


// ============================================================
// PRICE FORMATTER
// ============================================================

function formatPrice(value) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return "0";

  }


  return number.toLocaleString(
    "en-IN"
  );

}