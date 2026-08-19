import { GoogleGenAI } from "@google/genai";

export class BaseAgent {

  constructor({
    name,
    description,
    systemInstruction,
    modelName = "gemini-3.6-flash",
    responseSchema = null,
  }) {

    this.name = name;
    this.description = description;
    this.systemInstruction = systemInstruction;
    this.modelName = modelName;
    this.responseSchema = responseSchema;

    const apiKey = process.env.GEMINI_API_KEY;

    // Debug: confirm whether the Gemini API key is available
    console.log(
      `[BaseAgent - ${name}] Gemini key loaded:`,
      !!apiKey
    );

    if (apiKey) {

      this.ai = new GoogleGenAI({
        apiKey
      });

      console.log(
        `[BaseAgent - ${name}] Gemini initialized successfully. Model: ${this.modelName}`
      );

    } else {

      console.warn(
        `[BaseAgent - ${name}] GEMINI_API_KEY is not set. Using fallback mode.`
      );

      this.ai = null;
    }
  }


  async run(input, schemaOverride = null) {

    const activeSchema =
      schemaOverride || this.responseSchema;

    const promptText =
      typeof input === "string"
        ? input
        : JSON.stringify(input);


    console.log(
      `[${this.name}] Running agent...`
    );


    // =====================================================
    // NO GEMINI API
    // =====================================================

    if (!this.ai) {

      console.warn(
        `[${this.name}] Gemini client is not available.`
      );

      return this.fallback(
        input,
        "GEMINI_API_KEY missing"
      );
    }


    try {

      const config = {

        systemInstruction:
          this.systemInstruction
      };


      // ===================================================
      // STRUCTURED JSON OUTPUT
      // ===================================================

      if (activeSchema) {

        config.responseMimeType =
          "application/json";

        config.responseSchema =
          activeSchema;
      }


      console.log(
        `[${this.name}] Sending request to Gemini...`
      );


      // ===================================================
      // GEMINI REQUEST
      // ===================================================

      const response =
        await this.ai.models.generateContent({

          model: this.modelName,

          contents: promptText,

          config
        });


      const responseText =
        response.text;


      console.log(
        `[${this.name}] Gemini response received.`
      );


      if (!responseText) {

        throw new Error(
          "Gemini returned an empty response."
        );
      }


      // ===================================================
      // JSON RESPONSE
      // ===================================================

      if (activeSchema) {

        try {

          return JSON.parse(
            responseText
          );

        } catch (parseError) {

          console.error(
            `[${this.name}] Invalid JSON returned by Gemini:`
          );

          console.error(
            responseText
          );

          throw parseError;
        }
      }


      return {
        text: responseText
      };


    } catch (error) {

      console.error(
        `[${this.name}] Gemini API Error:`,
        error.message
      );

      console.warn(
        `[${this.name}] Switching to fallback mode.`
      );


      return this.fallback(
        input,
        error.message
      );
    }
  }


  fallback(input, reason) {

    return {

      status: "fallback",

      reason,

      message:
        "Fallback response from BaseAgent."
    };
  }
}