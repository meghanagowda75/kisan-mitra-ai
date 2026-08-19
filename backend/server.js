import "dotenv/config";

import express from "express";
import cors from "cors";

import { OrchestratorAgent } from "../agents/OrchestratorAgent.js";


// ============================================================
// APP CONFIGURATION
// ============================================================

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors()
);

app.use(
  express.json()
);


// ============================================================
// ORCHESTRATOR
// ============================================================

const orchestrator =
  new OrchestratorAgent();


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/api/health",
  (req, res) => {

    res.json({

      status:
        "healthy",

      timestamp:
        new Date().toISOString(),

      geminiKeyDetected:
        Boolean(
          process.env.GEMINI_API_KEY
        ),

      dataGovKeyDetected:
        Boolean(
          process.env.DATA_GOV_API_KEY
        )

    });

  }
);


// ============================================================
// MAIN QUERY ENDPOINT
// ============================================================

app.post(
  "/api/query",
  async (req, res) => {

    const {
      cropType,
      soilType,
      location,
      question = ""
    } = req.body || {};


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (
      !String(cropType || "").trim() ||
      !String(soilType || "").trim() ||
      !String(location || "").trim()
    ) {

      return res.status(400).json({

        success:
          false,

        error:
          "Missing required inputs: 'cropType', 'soilType', and 'location' are mandatory."

      });

    }


    const cleanCropType =
      String(cropType).trim();

    const cleanSoilType =
      String(soilType).trim();

    const cleanLocation =
      String(location).trim();

    const cleanQuestion =
      String(question || "").trim();


    console.log(
      "\n========================================"
    );

    console.log(
      "[Backend] Incoming farming query"
    );

    console.log(
      `[Backend] Crop: ${cleanCropType}`
    );

    console.log(
      `[Backend] Soil: ${cleanSoilType}`
    );

    console.log(
      `[Backend] Location: ${cleanLocation}`
    );

    console.log(
      `[Backend] Question: ${cleanQuestion || "Should I sell now or hold?"}`
    );

    console.log(
      "========================================"
    );


    // --------------------------------------------------------
    // RUN MULTI-AGENT ORCHESTRATOR
    // --------------------------------------------------------

    try {

      const result =
        await orchestrator.runOrchestrator({

          cropType:
            cleanCropType,

          soilType:
            cleanSoilType,

          location:
            cleanLocation,

          question:
            cleanQuestion

        });


      // ------------------------------------------------------
      // RETURN SUCCESSFUL RESULT
      // ------------------------------------------------------

      return res.json(
        result
      );

    }

    catch (error) {

      console.error(
        "[Backend] Error processing query:",
        error
      );


      return res.status(500).json({

        success:
          false,

        error:
          "An internal server error occurred while orchestrating agents.",

        message:
          error?.message ||
          "Unknown server error."

      });

    }

  }
);


// ============================================================
// 404 HANDLER
// ============================================================

app.use(
  (req, res) => {

    res.status(404).json({

      success:
        false,

      error:
        "API route not found.",

      path:
        req.originalUrl

    });

  }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (error, req, res, next) => {

    console.error(
      "[Backend] Unhandled Express error:",
      error
    );


    if (res.headersSent) {

      return next(error);

    }


    return res.status(500).json({

      success:
        false,

      error:
        "An unexpected server error occurred.",

      message:
        error?.message ||
        "Unknown server error."

    });

  }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log(
      "=================================================="
    );

    console.log(
      `🌾 KisanMitra Backend running on port ${PORT} 🌾`
    );

    console.log(
      `API Endpoint: http://localhost:${PORT}/api/query`
    );

    console.log(
      `Health Check: http://localhost:${PORT}/api/health`
    );

    console.log(
      `Gemini API key: ${
        process.env.GEMINI_API_KEY
          ? "detected"
          : "MISSING"
      }`
    );

    console.log(
      `Data.gov.in API key: ${
        process.env.DATA_GOV_API_KEY
          ? "detected"
          : "MISSING"
      }`
    );

    console.log(
      "=================================================="
    );

  }
);