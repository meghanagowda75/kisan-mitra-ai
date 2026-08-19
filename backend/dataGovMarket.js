// backend/dataGovMarket.js

export class DataGovMarket {

  constructor() {

    this.apiKey =
      process.env.DATA_GOV_API_KEY;

    this.resourceId =
      process.env.DATA_GOV_RESOURCE_ID;

    this.baseUrl =
      "https://api.data.gov.in/resource";
  }


  // ==========================================================
  // CROP NORMALIZATION
  // ==========================================================

  normalizeCrop(crop) {

    const value =
      String(crop || "")
        .toLowerCase()
        .trim();


    const aliases = {

      tomato:
        "Tomato",

      tomatoes:
        "Tomato",

      tomatoe:
        "Tomato",

      wheat:
        "Wheat",

      wheat_crop:
        "Wheat",

      rice:
        "Rice",

      paddy:
        "Rice",

      cotton:
        "Cotton",

      cotton_crop:
        "Cotton",

      mustard:
        "Mustard",

      mustard_crop:
        "Mustard",

      sugarcane:
        "Sugarcane",

      sugar_cane:
        "Sugarcane"

    };


    return (
      aliases[value] ||
      crop
    );
  }


  // ==========================================================
  // GET MARKET DATA
  // ==========================================================

  async getMarketData(
    crop,
    state = "",
    district = ""
  ) {

    if (!this.apiKey) {

      throw new Error(
        "DATA_GOV_API_KEY is missing."
      );

    }


    if (!this.resourceId) {

      throw new Error(
        "DATA_GOV_RESOURCE_ID is missing."
      );

    }


    const commodity =
      this.normalizeCrop(crop);


    const params =
      new URLSearchParams({

        "api-key":
          this.apiKey,

        format:
          "json",

        limit:
          "100"

      });


    const url =
      `${this.baseUrl}/${this.resourceId}?${params}`;


    console.log(
      "[data.gov.in] Fetching market data..."
    );


    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        `data.gov.in API error: ${response.status}`
      );

    }


    const data =
      await response.json();


    const records =
      Array.isArray(data.records)
        ? data.records
        : [];


    const cropLower =
      String(commodity)
        .toLowerCase();


    const stateLower =
      String(state || "")
        .toLowerCase();


    const districtLower =
      String(district || "")
        .toLowerCase();


    const filtered =
      records.filter(
        record => {

          const recordCommodity =
            String(
              record.commodity ||
              record.Commodity ||
              record.COMMODITY ||
              ""
            )
            .toLowerCase();


          const recordState =
            String(
              record.state ||
              record.State ||
              record.STATE ||
              ""
            )
            .toLowerCase();


          const recordDistrict =
            String(
              record.district ||
              record.District ||
              record.DISTRICT ||
              ""
            )
            .toLowerCase();


          const cropMatch =
            !cropLower ||
            recordCommodity.includes(
              cropLower
            );


          const stateMatch =
            !stateLower ||
            recordState.includes(
              stateLower
            );


          const districtMatch =
            !districtLower ||
            recordDistrict.includes(
              districtLower
            );


          return (
            cropMatch &&
            stateMatch &&
            districtMatch
          );

        }
      );


    return {

      success: true,

      source:
        "data.gov.in",

      crop:
        commodity,

      state,

      district,

      records:
        filtered

    };

  }


  // ==========================================================
  // EXTRACT PRICE
  // ==========================================================

  extractPrice(record) {

    const possibleFields = [

      "modal_price",

      "Modal_Price",

      "modal price",

      "Modal Price",

      "modal",

      "Modal",

      "price",

      "Price"

    ];


    for (
      const field of possibleFields
    ) {

      if (
        record[field] !== undefined &&
        record[field] !== null
      ) {

        const value =
          Number(
            String(
              record[field]
            )
            .replace(
              /,/g,
              ""
            )
          );


        if (
          Number.isFinite(value)
        ) {

          return value;

        }

      }

    }


    return null;
  }


  // ==========================================================
  // FIND CURRENT PRICE
  // ==========================================================

  findCurrentPrice(records) {

    const prices =
      records
        .map(
          record =>
            this.extractPrice(
              record
            )
        )
        .filter(
          price =>
            Number.isFinite(price)
        );


    if (
      prices.length === 0
    ) {

      return null;

    }


    return Math.round(

      prices.reduce(
        (sum, price) =>
          sum + price,

        0
      )
      /
      prices.length

    );

  }

}