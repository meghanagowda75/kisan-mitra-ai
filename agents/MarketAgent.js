import { BaseAgent } from "./BaseAgent.js";

// ============================================================
// DATA.GOV.IN RESOURCE CONFIGURATION
// ============================================================

const DATA_GOV_RESOURCE_ID =
  "9ef84268-d588-465a-a308-a864a43d0070";

const DATA_GOV_API_URL =
  `https://api.data.gov.in/resource/${DATA_GOV_RESOURCE_ID}`;


// ============================================================
// SUPPORTED 200+ CROPS LIST
// ============================================================

export const SUPPORTED_CROPS = [
  // --- Cereals & Millets (16) ---
  "Wheat", "Paddy (Dhan)", "Rice", "Maize (Corn)", "Bajra (Pearl Millet)",
  "Jowar (Sorghum)", "Ragi (Finger Millet)", "Barley (Jau)", "Oats", "Kodo Millet",
  "Foxtail Millet (Kangni)", "Little Millet (Kutki)", "Barnyard Millet (Sanwa)",
  "Proso Millet (Chena)", "Buckwheat (Kuttu)", "Quinoa",

  // --- Pulses & Legumes (20) ---
  "Arhar / Tur (Red Gram)", "Bengal Gram (Chana / Chickpea)", "Green Gram (Moong)",
  "Black Gram (Urad)", "Masoor (Lentil)", "Moth Dal (Matki)", "Horse Gram (Kulthi)",
  "Cowpea (Lobia)", "Field Pea (Dry Matar)", "Green Peas (Wet Matar)", "Peas Cod",
  "Rajma (Kidney Beans)", "Soyabean", "Kabuli Chana", "Val (Field Beans)",
  "Chickpea Split (Chana Dal)", "Moong Dal", "Urad Dal", "Masoor Dal", "Tur Dal",

  // --- Oilseeds & Commercial Crops (20) ---
  "Groundnut (Peanut)", "Mustard (Sarson / Rai)", "Sunflower", "Sesamum (Til / Sesame)",
  "Safflower (Kardi)", "Castor Seed", "Linseed (Alsi / Flaxseed)", "Niger Seed (Ramtil)",
  "Cotton (Kapas)", "Sugarcane", "Jute", "Mesta", "Sunnhemp", "Tobacco",
  "Copra (Dry Coconut)", "Raw Coconut", "Arecanut (Supari / Betelnut)",
  "Guar Seed (Cluster Beans)", "Soya Bean Meal", "Palm Oil Fruit",

  // --- Vegetables (54) ---
  "Potato (Aloo)", "Onion (Pyaz)", "Green Onion (Spring Onion)", "Tomato",
  "Brinjal (Eggplant / Baingan)", "Cabbage (Patta Gobhi)", "Cauliflower (Phool Gobhi)",
  "Bhindi (Ladies Finger / Okra)", "Bottle Gourd (Lauki)", "Bitter Gourd (Karela)",
  "Ridge Gourd (Turai)", "Sponge Gourd (Gilki)", "Snake Gourd (Chichinda)",
  "Ash Gourd (Petha)", "Pumpkin (Kaddu)", "Cucumber (Kheera)", "Carrot (Gajar)",
  "Radish (Mooli / Raddish)", "Beetroot (Chukandar)", "Capsicum (Shimla Mirch)",
  "Green Chilli (Hari Mirch)", "Pointed Gourd (Parval)", "Little Gourd (Kundru / Tindora)",
  "Tinda (Round Gourd)", "Spinach (Palak)", "Methi (Fenugreek Leaves)",
  "Coriander Leaves (Hara Dhaniya)", "Curry Leaves (Kadi Patta)", "Mint (Pudina)",
  "Leafy Vegetables (Saag)", "Yam (Ratalu / Jimikand / Elephant Foot Yam)",
  "Colocasia (Arbi / Taro Root)", "Sweet Potato (Shakarkandi)", "Drumstick (Moringa)",
  "French Beans", "Cluster Beans (Gawar)", "Broad Beans (Bakla)", "Flat Beans (Sem)",
  "Yardlong Beans (Lobia Beans)", "Broccoli", "Zucchini", "Mushroom (Khumbi)",
  "Knol Khol (Kohlrabi)", "Turnip (Shalgam)", "Chow Chow (Chayote)",
  "Raw Banana (Kacha Kela)", "Raw Papaya (Kacha Papita)", "Tapioca (Cassava)",
  "Mustard Greens (Sarson Saag)", "Amaranthus (Chaulai)", "Agathi Leaves",
  "Lettuce", "Celery Leaves", "Ivy Gourd",

  // --- Fruits (48) ---
  "Mango (Raw / Ripe / Aam)", "Banana (Kela)", "Apple (Seb)", "Orange (Santra)",
  "Kinnow", "Mousambi (Sweet Lime)", "Lemon (Nimbu)", "Papaya (Papita)",
  "Guava (Amrood)", "Pomegranate (Anar)", "Chikoo (Sapota)", "Grapes (Angoor)",
  "Watermelon (Tarbooj)", "Muskmelon (Kharbooza)", "Pineapple (Ananas)",
  "Jackfruit (Kathal)", "Raw Jackfruit", "Custard Apple (Sitaphal)", "Fig (Anjeer)",
  "Strawberry", "Litchi (Lychee)", "Plum (Alubukhara)", "Peach (Aadu)",
  "Pear (Nashpati)", "Cherry", "Apricot (Khubani)", "Kiwi", "Dragon Fruit",
  "Avocado (Butter Fruit)", "Wood Apple (Bael / Bel)", "Amla (Indian Gooseberry)",
  "Ber (Indian Jujube)", "Jamun (Black Plum)", "Tamarind (Imli)", "Dates (Khajoor)",
  "Mulberry (Shahtoot)", "Passion Fruit", "Mangosteen", "Rambutan", "Guava Thai",
  "Persimmon", "Starfruit (Carambola)", "Sweet Orange", "Blueberry",
  "Blackberry", "Cranberry", "Raspberry", "Grapefruit",

  // --- Spices & Condiments (32) ---
  "Garlic (Lahsun)", "Ginger (Fresh / Adrak)", "Dry Ginger (Sonth)",
  "Turmeric (Raw / Haldi)", "Dry Turmeric", "Dry Red Chillies",
  "Coriander Seed (Dhaniya)", "Cummin Seed (Jeera)", "Fennel Seed (Saunf / Soanf)",
  "Ajwain (Carom Seed / Ajwan)", "Suva (Dill Seed)", "Fenugreek Seed (Methi Dana)",
  "Small Cardamom (Choti Elaichi)", "Large Cardamom (Badi Elaichi)",
  "Black Pepper (Kali Mirch)", "White Pepper", "Clove (Laung)", "Cinnamon (Dalchini)",
  "Nutmeg (Jaiphal)", "Mace (Javitri)", "Star Anise (Chakra Phool)",
  "Asafoetida (Hing)", "Bay Leaf (Tejpatta)", "Poppy Seed (Khaskhas)",
  "Kalonji (Nigella Seed)", "Mustard Seed (Rai Beej)", "Celery Seed",
  "Saffron (Kesar)", "Vanilla", "Mace Whole", "Dry Mango Powder (Amchur)",
  "Kokum",

  // --- Plantation, Forestry & Commercial (12) ---
  "Tea (Chai Patti)", "Coffee Arabica", "Coffee Robusta", "Natural Rubber",
  "Betel Leaves (Paan Ke Patte)", "Bamboo (Baans)", "Eucalyptus Wood",
  "Teak Wood (Sagwan)", "Sandalwood (Chandan)", "Cashew Nut (Raw)",
  "Cashew Kernel (Kaju)", "Cocoa Beans",

  // --- Nuts & Dry Fruits (10) ---
  "Almond (Badam)", "Walnut (Akhrot)", "Pistachio (Pista)", "Raisins (Kishmish)",
  "Fox Nut (Makhana)", "Pine Nut (Chilgoza)", "Dry Dates (Chhuhara)",
  "Hazelnut", "Macadamia Nut", "Peanuts Roasted",

  // --- Medicinal, Aromatic & Sweeteners (15) ---
  "Isabgol (Psyllium / Isabgul)", "Ashwagandha", "Tulsi (Holy Basil)",
  "Aloe Vera (Ghritkumari)", "Senna (Sonamukhi)", "Lemongrass", "Citronella",
  "Stevia (Meethi Patti)", "Safed Musli", "Shankhpushpi", "Brahmi", "Guggal",
  "Mentha (Mint Oil)", "Gur (Jaggery)", "Honey (Shahad)",

  // --- Flowers (15) ---
  "Rose (Gulab)", "Marigold (Genda)", "Jasmine (Mogra / Chameli)",
  "Chrysanthemum (Sevanti)", "Tuberose (Rajanigandha)", "Gladiolus",
  "Gerbera", "Carnation", "Orchid", "Lotus (Kamal)", "Lily",
  "Anthurium", "Gypsophila", "Aster", "Hibiscus (Gudhal)"
];


// ============================================================
// MARKET SCHEMA
// ============================================================

const marketAgentSchema = {
  type: "OBJECT",
  properties: {
    currentPrice: {
      type: "NUMBER"
    },
    projectedPrice7Days: {
      type: "NUMBER"
    },
    priceTrend: {
      type: "STRING"
    },
    recommendation: {
      type: "STRING"
    },
    recommendationText: {
      type: "STRING"
    },
    mspPrice: {
      type: "NUMBER"
    },
    historicalPrices: {
      type: "ARRAY",
      items: {
        type: "NUMBER"
      }
    },
    projectedPrices: {
      type: "ARRAY",
      items: {
        type: "NUMBER"
      }
    }
  },
  required: [
    "currentPrice",
    "projectedPrice7Days",
    "priceTrend",
    "recommendation",
    "recommendationText",
    "mspPrice",
    "historicalPrices",
    "projectedPrices"
  ]
};


// ============================================================
// MSP DATABASE (Key Statutory Mandi Commodities)
// ============================================================

const MSP_PRICES = {
  wheat: 2425,
  rice: 2369,
  paddy: 2369,
  cotton: 7710,
  mustard: 5950,
  sugarcane: 355,
  maize: 2400,
  soybean: 5328,
  groundnut: 7263,
  sunflower: 7721,
  gram: 5650,
  tur: 8000,
  moong: 8768,
  urad: 7400,
  barley: 1980,
  bajra: 2775,
  jowar: 3699,
  ragi: 4886,
  sesamum: 9846,
  safflower: 5940,
  masoor: 6780,
  lentil: 6780,
  copra: 11160,
  jute: 5335,
  nigerseed: 8717
};


// ============================================================
// STATE NORMALIZATION
// ============================================================

const STATE_ALIASES = {
  bengaluru: "Karnataka",
  bangalore: "Karnataka",
  "bengaluru urban": "Karnataka",
  "bengaluru rural": "Karnataka",
  karnataka: "Karnataka",
  "कर्नाटक": "Karnataka",
  "ಕರ್ನಾಟಕ": "Karnataka",
  "కర్ణాటక": "Karnataka",
  "கர்நாடகா": "Karnataka",
  "കർണാടക": "Karnataka",

  up: "Uttar Pradesh",
  "uttar pradesh": "Uttar Pradesh",
  "उत्तर प्रदेश": "Uttar Pradesh",
  "ಉತ್ತರ ಪ್ರದೇಶ": "Uttar Pradesh",
  "ఉత్తర ప్రదేశ్": "Uttar Pradesh",
  "உத்தரப் பிரதேசம்": "Uttar Pradesh",
  "ഉത്തർപ്രദേശ്": "Uttar Pradesh",
  gorakhpur: "Uttar Pradesh",
  "गोरखपुर": "Uttar Pradesh",
  lucknow: "Uttar Pradesh",
  "लखनऊ": "Uttar Pradesh",
  kanpur: "Uttar Pradesh",
  "कानपुर": "Uttar Pradesh",
  varanasi: "Uttar Pradesh",
  "वाराणसी": "Uttar Pradesh",
  agra: "Uttar Pradesh",
  "आगरा": "Uttar Pradesh",

  delhi: "Delhi",
  "new delhi": "Delhi",
  "दिल्ली": "Delhi",
  "नई दिल्ली": "Delhi",
  "ದೆಹಲಿ": "Delhi",
  "ఢిల్లీ": "Delhi",
  "டெல்லி": "Delhi",
  "ഡൽഹി": "Delhi",

  maharashtra: "Maharashtra",
  mumbai: "Maharashtra",
  pune: "Maharashtra",
  nagpur: "Maharashtra",
  "महाराष्ट्र": "Maharashtra",
  "मुंबई": "Maharashtra",
  "पुणे": "Maharashtra",
  "नागपुर": "Maharashtra",
  "ಮಹಾರಾಷ್ಟ್ರ": "Maharashtra",
  "మహారాష్ట్ర": "Maharashtra",
  "மகாராஷ்டிரா": "Maharashtra",
  "മഹാരാഷ്ട്ര": "Maharashtra",

  telangana: "Telangana",
  hyderabad: "Telangana",
  "तेलंगाना": "Telangana",
  "हैदराबाद": "Telangana",
  "ತೆಲಂಗಾಣ": "Telangana",
  "తెలంగాణ": "Telangana",
  "தெலுங்கானா": "Telangana",
  "തെലങ്കാന": "Telangana",

  "tamil nadu": "Tamil Nadu",
  chennai: "Tamil Nadu",
  "तमिलनाडु": "Tamil Nadu",
  "तमिल नाडु": "Tamil Nadu",
  "चेन्नई": "Tamil Nadu",
  "ತಮಿಳುನಾಡು": "Tamil Nadu",
  "తమిళనాడు": "Tamil Nadu",
  "தமிழ்நாடு": "Tamil Nadu",
  "തമിഴ്നാട്": "Tamil Nadu",

  kerala: "Kerala",
  kochi: "Kerala",
  "केरल": "Kerala",
  "कोच्चि": "Kerala",
  "ಕೇರಳ": "Kerala",
  "కేరళ": "Kerala",
  "கேரளா": "Kerala",
  "കേരളം": "Kerala",

  andhra: "Andhra Pradesh",
  "andhra pradesh": "Andhra Pradesh",
  vijayawada: "Andhra Pradesh",
  visakhapatnam: "Andhra Pradesh",
  "आंध्र प्रदेश": "Andhra Pradesh",
  "विजयवाड़ा": "Andhra Pradesh",
  "विशाखापट्टनम": "Andhra Pradesh",
  "ಆಂಧ್ರ ಪ್ರದೇಶ": "Andhra Pradesh",
  "ఆంధ్రప్రదేశ్": "Andhra Pradesh",
  "ஆந்திரப் பிரதேசம்": "Andhra Pradesh",
  "ആന്ധ്രാപ്രദേശ്": "Andhra Pradesh",

  punjab: "Punjab",
  "पंजाब": "Punjab",
  "ಪಂಜಾಬ್": "Punjab",
  "పంజాబ్": "Punjab",
  "பஞ்சாப்": "Punjab",
  "പഞ്ചാബ്": "Punjab",

  haryana: "Haryana",
  "हरियाणा": "Haryana",
  "ಹರಿಯಾಣ": "Haryana",
  "హర్యానా": "Haryana",
  "ஹரியானா": "Haryana",
  "ഹരിയാന": "Haryana",

  gujarat: "Gujarat",
  ahmedabad: "Gujarat",
  surat: "Gujarat",
  vadodara: "Gujarat",
  "गुजरात": "Gujarat",
  "अहमदाबाद": "Gujarat",
  "सूरत": "Gujarat",
  "वडोदरा": "Gujarat",
  "ಗುಜರಾತ್": "Gujarat",
  "గుజరాత్": "Gujarat",
  "குஜராத்": "Gujarat",
  "ഗുജറാത്ത്": "Gujarat",

  rajasthan: "Rajasthan",
  jaipur: "Rajasthan",
  "राजस्थान": "Rajasthan",
  "जयपुर": "Rajasthan",
  "ರಾಜಸ್ಥಾನ": "Rajasthan",
  "రాజస్థాన్": "Rajasthan",
  "ராஜஸ்தான்": "Rajasthan",
  "രാജസ്ഥാൻ": "Rajasthan",

  madhya: "Madhya Pradesh",
  "madhya pradesh": "Madhya Pradesh",
  bhopal: "Madhya Pradesh",
  indore: "Madhya Pradesh",
  "मध्य प्रदेश": "Madhya Pradesh",
  "भोपाल": "Madhya Pradesh",
  "इंदौर": "Madhya Pradesh",
  "ಮಧ್ಯಪ್ರದೇಶ": "Madhya Pradesh",
  "మధ్యప్రదేశ్": "Madhya Pradesh",
  "மத்தியப் பிரதேசம்": "Madhya Pradesh",
  "മധ്യപ്രദേശ്": "Madhya Pradesh",

  bihar: "Bihar",
  patna: "Bihar",
  "बिहार": "Bihar",
  "पटना": "Bihar",
  "ಬಿಹಾರ": "Bihar",
  "బీహార్": "Bihar",
  "பீகார்": "Bihar",
  "ബിഹാർ": "Bihar",

  odisha: "Odisha",
  orissa: "Odisha",
  bhubaneswar: "Odisha",
  "ओडिशा": "Odisha",
  "उड़ीसा": "Odisha",
  "भुवनेश्वर": "Odisha",
  "ಒಡಿಶಾ": "Odisha",
  "ఒడిశా": "Odisha",
  "ஒடிசா": "Odisha",
  "ഒഡീഷ": "Odisha",

  westbengal: "West Bengal",
  "west bengal": "West Bengal",
  kolkata: "West Bengal",
  "पश्चिम बंगाल": "West Bengal",
  "कोलकाता": "West Bengal",
  "ಪಶ್ಚಿಮ ಬಂಗಾಳ": "West Bengal",
  "పశ్చిమ బెంగాల్": "West Bengal",
  "மேற்கு வங்காளம்": "West Bengal",
  "പശ്ചിമ ബംഗാൾ": "West Bengal",

  jharkhand: "Jharkhand",
  ranchi: "Jharkhand",
  "झारखंड": "Jharkhand",
  "रांची": "Jharkhand",

  chhattisgarh: "Chhattisgarh",
  raipur: "Chhattisgarh",
  "छत्तीसगढ़": "Chhattisgarh",
  "रायपुर": "Chhattisgarh",

  assam: "Assam",
  guwahati: "Assam",
  "असम": "Assam",
  "गुवाहाटी": "Assam",

  uttarakhand: "Uttarakhand",
  dehradun: "Uttarakhand",
  "उत्तराखंड": "Uttarakhand",
  "देहरादून": "Uttarakhand",

  himachal: "Himachal Pradesh",
  "himachal pradesh": "Himachal Pradesh",
  shimla: "Himachal Pradesh",
  "हिमाचल प्रदेश": "Himachal Pradesh",
  "शिमला": "Himachal Pradesh",

  "jammu and kashmir": "Jammu and Kashmir",
  jammu: "Jammu and Kashmir",
  kashmir: "Jammu and Kashmir",
  "जम्मू और कश्मीर": "Jammu and Kashmir",
  "जम्मू": "Jammu and Kashmir",
  "कश्मीर": "Jammu and Kashmir"
};


// ============================================================
// MARKET AGENT
// ============================================================

export class MarketAgent extends BaseAgent {

  constructor() {
    super({
      name: "MarketAgent",
      description:
        "Fetches government mandi prices directly from Data.gov.in and performs deterministic market analysis.",
      systemInstruction: `
You are an Agricultural Economist and Mandi Analyst.
The application provides real government mandi data from Data.gov.in.

IMPORTANT RULES:
1. Government mandi data is authoritative.
2. Never invent mandi prices.
3. Never invent historical prices.
4. Never modify government numerical data.
5. Never convert unavailable government data into a real ₹0 market price.
6. SELL/HOLD must be determined by application code.
7. Do not invent future prices.
8. Seven-day prices are reference projections only.
9. If government data is unavailable, clearly state that it is unavailable.
10. Support multi-language output in format: English / हिन्दी / ಕನ್ನಡ / తెలుగు / தமிழ் / മലയാളം.
11. Commodity names must be matched against actual commodity names returned by Data.gov.in.
12. Do not restrict commodities to a hardcoded crop list.
13. The resource contains crops, vegetables, fruits, spices and other agricultural commodities.
14. Use modal_price whenever available.
`
    });
  }


  // ==========================================================
  // NORMALIZE TEXT
  // ==========================================================

  normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFKC")
      .replace(/[()[\]{}.,/\\_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  // ==========================================================
  // NORMALIZE CROP (200+ COMMODITIES & ALIASES)
  // ==========================================================

  normalizeCrop(crop) {
    const value = this.normalizeText(crop);

    const aliases = {
      // --- Cereals & Grains ---
      wheat: "wheat", gehu: "wheat", kanak: "wheat", "wheat attaa": "wheat", ಗೋಧಿ: "wheat", గోధుమలు: "wheat", கோதுமை: "wheat", ഗോതമ്പ്: "wheat",
      maize: "maize", makka: "maize", makki: "maize", corn: "maize", ಮೆಕ್ಕೆಜೋಳ: "maize", మొక్కజొన్న: "maize", மக்காச்சோளம்: "maize", ചോളം: "maize",
      paddy: "paddy", "paddy common": "paddy", "paddy dhan common": "paddy",
      "paddy basmati": "paddy", "paddy dhan basmati": "paddy", "paddy dhan": "paddy",
      dhan: "paddy", rice: "rice", chawal: "rice", basmati: "rice", ಭತ್ತ: "paddy", వరి: "paddy", நெல்: "paddy", നെല്ല്: "paddy",
      ಅಕ್ಕಿ: "rice", ಬಿయ్యం: "rice", அரிசி: "rice", അരി: "rice",
      barley: "barley", jau: "barley",
      "bajra pearl millet cumbu": "bajra", "bajra pearl millet": "bajra", bajra: "bajra", cumbu: "bajra", "pearl millet": "bajra", sajje: "bajra",
      "jowar sorghum": "jowar", jowar: "jowar", sorghum: "jowar", cholam: "jowar", jola: "jowar",
      ragi: "ragi", "finger millet": "ragi", mandua: "ragi", ರಾಗಿ: "ragi", రాగులు: "ragi", கேழ்வரகு: "ragi", റാഗി: "ragi",
      "foxtail millet": "foxtail millet", kangni: "foxtail millet", navane: "foxtail millet",
      "kodo millet": "kodo millet", kodra: "kodo millet", arka: "kodo millet",
      "little millet": "little millet", kutki: "little millet", same: "little millet",
      "barnyard millet": "barnyard millet", sanwa: "barnyard millet", oodalu: "barnyard millet",
      "proso millet": "proso millet", chena: "proso millet", baragu: "proso millet",
      oats: "oats", jai: "oats",
      quinoa: "quinoa",
      buckwheat: "buckwheat", kuttu: "buckwheat",
      rye: "rye",

      // --- Pulses & Legumes ---
      "arhar tur red gram whole": "tur", "arhar tur red gram": "tur", "arhar tur": "tur",
      arhar: "tur", tur: "tur", tuvar: "tur", "red gram": "tur", toor: "tur", togari: "tur", "pigeon pea": "tur",
      "bengal gram gram whole": "gram", "bengal gram gram": "gram", "bengal gram": "gram",
      chickpea: "gram", chana: "gram", "chana dal": "gram", gram: "gram", kadale: "gram", "kabuli chana": "gram",
      "green gram moong whole": "moong", "green gram moong": "moong", "green gram": "moong",
      moong: "moong", mung: "moong", "moong dal": "moong", hesaru: "moong",
      "black gram urd gram whole": "urad", "black gram urd gram": "urad", "black gram": "urad",
      "urd gram": "urad", urad: "urad", "urad dal": "urad", mash: "urad", uddu: "urad",
      lentil: "masoor", masoor: "masoor", "masur dal": "masoor", masur: "masoor", "masoor dal": "masoor",
      "horse gram": "horse gram", kulthi: "horse gram", huruli: "horse gram",
      "moth dal": "moth dal", "matki beans": "moth dal", moth: "moth dal", matki: "moth dal", "moth bean": "moth dal",
      "cowpea lobia": "cowpea", cowpea: "cowpea", lobia: "cowpea", alasande: "cowpea",
      "field pea": "field pea", "dry peas": "field pea", "white peas": "field pea", "dry matar": "field pea",
      rajma: "kidney beans", "kidney beans": "kidney beans",
      soya: "soybean", soyabean: "soybean", soybean: "soybean", "soya bean": "soybean",
      val: "field beans", "field beans": "field beans",

      // --- Oilseeds & Commercial Crops ---
      cotton: "cotton", kapas: "cotton", rui: "cotton", hatti: "cotton", ಹತ್ತಿ: "cotton", ప్రత్తి: "cotton", பருத்தி: "cotton", പരുത്തി: "cotton",
      sugarcane: "sugarcane", "sugar cane": "sugarcane", ganna: "sugarcane", kabbu: "sugarcane", ಕಬ್ಬು: "sugarcane", చెరకు: "sugarcane", கரும்பு: "sugarcane", കരിമ്പ്: "sugarcane",
      "groundnut split": "groundnut", "groundnut pods": "groundnut", groundnut: "groundnut",
      "ground nut": "groundnut", peanut: "groundnut", mungfali: "groundnut", shenga: "groundnut", ಕಡಲೆಕಾಯಿ: "groundnut", వేరుశనగ: "groundnut", நிலக்கடலை: "groundnut", നിലക്കടല: "groundnut",
      mustard: "mustard", sarson: "mustard", rai: "mustard", sasive: "mustard", "mustard oil": "mustard", ಸಾಸಿವೆ: "mustard", ఆవాలు: "mustard", கடுகு: "mustard", കടുക്: "mustard",
      sunflower: "sunflower", surajmukhi: "sunflower", suryakanthi: "sunflower",
      "sesamum sesame gingelly til": "sesamum", "sesamum sesame gingelly": "sesamum",
      "sesamum sesame": "sesamum", sesamum: "sesamum", sesame: "sesamum", til: "sesamum", gingelly: "sesamum", ellu: "sesamum",
      "castor seed": "castor seed", castor: "castor seed", arandi: "castor seed", haralu: "castor seed",
      "guar seed cluster beans": "guar seed", "guar seed": "guar seed", guar: "guar seed", gawar: "guar seed",
      safflower: "safflower", kardi: "safflower", kusube: "safflower",
      nigerseed: "nigerseed", niger: "nigerseed", ramtil: "nigerseed", huchchellu: "nigerseed",
      linseed: "linseed", flaxseed: "linseed", alsi: "linseed", agase: "linseed",
      jute: "jute", patsan: "jute", mesta: "mesta", sunnhemp: "sunnhemp",
      tobacco: "tobacco", tambaku: "tobacco",
      copra: "copra", coconut: "coconut", "dry coconut": "copra", nariyal: "coconut", thenginakai: "coconut",
      arecanut: "arecanut", supari: "arecanut", betelnut: "arecanut", adike: "arecanut",
      "palm oil fruit": "palm oil",

      // --- Vegetables ---
      potato: "potato", aloo: "potato", alu: "potato", batata: "potato", ಆಲೂಗಡ್ಡೆ: "potato", బంగాళాదుంప: "potato", உருளைக்கிழங்கு: "potato", ഉരുളക്കിഴങ്ങ്: "potato",
      onion: "onion", pyaz: "onion", kanda: "onion", eerulli: "onion", ಈರುಳ್ಳಿ: "onion", ఉల్లిపాయ: "onion", வெங்காயம்: "onion", ഉള്ളി: "onion",
      "onion green": "onion green", "spring onion": "onion green", "hara pyaz": "onion green",
      tomato: "tomato", tamatar: "tomato", tomatokai: "tomato", ಟೊಮ್ಯಾಟೊ: "tomato", టమోటా: "tomato", தக்காளி: "tomato", തക്കാളി: "tomato",
      brinjal: "brinjal", eggplant: "brinjal", baingan: "brinjal", vangi: "brinjal", badane: "brinjal",
      cabbage: "cabbage", patta_gobhi: "cabbage", "patta gobhi": "cabbage", bandhagobhi: "cabbage", kosa: "cabbage",
      cauliflower: "cauliflower", phool_gobhi: "cauliflower", "phool gobhi": "cauliflower", hookosu: "cauliflower",
      "bhindi ladies finger": "okra", bhindi: "okra", "ladies finger": "okra", "lady finger": "okra", okra: "okra", bhende: "okra", bendekai: "okra",
      "bottle gourd": "bottle gourd", lauki: "bottle gourd", ghiya: "bottle gourd", dudhi: "bottle gourd", sorekai: "bottle gourd",
      "bitter gourd": "bitter gourd", karela: "bitter gourd", haagalakai: "bitter gourd",
      "ridge gourd": "ridge gourd", tori: "ridge gourd", turai: "ridge gourd", heerakai: "ridge gourd",
      "sponge gourd": "sponge gourd", luffa: "sponge gourd", gilki: "sponge gourd",
      "snake gourd": "snake gourd", chichinda: "snake gourd", padavalakai: "snake gourd",
      "ash gourd": "ash gourd", petha: "ash gourd", budugumbala: "ash gourd", "white gourd": "ash gourd",
      pumpkin: "pumpkin", kaddu: "pumpkin", lal_bhopla: "pumpkin", kumbalakai: "pumpkin",
      "cucumbar cucumber": "cucumber", cucumbar: "cucumber", cucumber: "cucumber", kheera: "cucumber", kakdi: "cucumber", southekayi: "cucumber",
      carrot: "carrot", gajar: "carrot", gajjari: "carrot",
      raddish: "radish", radish: "radish", mooli: "radish", moolangi: "radish",
      beetroot: "beetroot", chukandar: "beetroot", beet: "beetroot",
      "peas wet": "peas", "peas cod": "peas", peas: "peas", pea: "peas", matar: "peas", batani: "peas", "green peas": "peas",
      beans: "beans", "french beans": "beans", french_beans: "beans", hurulikai: "beans",
      "cluster beans": "cluster beans", gavar: "cluster beans", gorikayi: "cluster beans", "broad beans": "broad beans", bakla: "broad beans", "flat beans": "flat beans", sem: "flat beans", "yardlong bean": "yardlong bean",
      capsicum: "capsicum", "shimla mirch": "capsicum", "bell pepper": "capsicum", donnemensinakayi: "capsicum",
      "green chilli": "green chilli", "green chili": "green chilli", "hari mirch": "green chilli", hasirumensinakayi: "green chilli",
      "pointed gourd parval": "pointed gourd", "pointed gourd": "pointed gourd", parval: "pointed gourd", parwal: "pointed gourd",
      "little gourd kundru": "little gourd", "little gourd": "little gourd", kundru: "little gourd", tindora: "little gourd", tondekai: "little gourd",
      tinda: "tinda", dhemase: "tinda",
      spinach: "spinach", palak: "spinach", palas: "spinach",
      "methi leaves": "methi", methi: "methi", fenugreek: "methi", "methi saag": "methi",
      "coriander leaves": "coriander leaves", "hara dhania": "coriander leaves", kothambari: "coriander leaves",
      "curry leaves": "curry leaves", kadi_patta: "curry leaves", karibevu: "curry leaves",
      "mint pudina": "mint", mint: "mint", pudina: "mint",
      "leafy vegetables": "leafy vegetables", saag: "leafy vegetables", soppu: "leafy vegetables",
      "yam ratalu": "yam", yam: "yam", ratalu: "yam", jimikand: "yam", elephant_yam: "yam", suvarnagadde: "yam",
      colocasia: "colocasia", arbi: "colocasia", arvi: "colocasia", kesuvina: "colocasia",
      "sweet potato": "sweet potato", shakarkandi: "sweet potato", genasu: "sweet potato",
      drumstick: "drumstick", sahjan: "drumstick", moringa: "drumstick", nuggekai: "drumstick",
      raw_banana: "raw banana", "raw banana": "raw banana", "green banana": "raw banana", kacha_kela: "raw banana", balekai: "raw banana",
      "raw papaya": "raw papaya", kacha_papita: "raw papaya",
      ivy_gourd: "little gourd",
      knol_khol: "kohlrabi", kohlrabi: "kohlrabi", gaanth_gobhi: "kohlrabi", navilukosu: "kohlrabi",
      turnip: "turnip", shalgam: "turnip",
      zucchini: "zucchini", broccoli: "broccoli",
      mushrooms: "mushroom", mushroom: "mushroom", khumbi: "mushroom", anabe: "mushroom",
      "chow chow": "chow chow", chayote: "chow chow", tapioca: "tapioca", cassava: "tapioca",
      "mustard greens": "mustard greens", amaranthus: "amaranthus", chaulai: "amaranthus",
      "agathi leaves": "agathi leaves", lettuce: "lettuce", "celery leaves": "celery leaves",

      // --- Fruits ---
      banana: "banana", kela: "banana", balehannu: "banana",
      apple: "apple", seb: "apple", sebu: "apple",
      orange: "orange", santra: "orange", kithale: "orange", "sweet orange": "orange",
      kinnow: "kinnow", mandarin: "kinnow",
      "mousambi sweet lime": "mousambi", mousambi: "mousambi", mosambi: "mousambi", "sweet lime": "mousambi",
      guava: "guava", amrood: "guava", peru: "guava", seebehanu: "guava", "guava thai": "guava",
      pomegranate: "pomegranate", anar: "pomegranate", dalimb: "pomegranate", dalimbe: "pomegranate",
      papaya: "papaya", papita: "papaya", parangi: "papaya",
      "chikoos sapota": "chikoo", chikoos: "chikoo", chikoo: "chikoo", sapota: "chikoo", chiku: "chikoo",
      grapes: "grapes", grape: "grapes", angoor: "grapes", drakshi: "grapes",
      watermelon: "watermelon", "water melon": "watermelon", tarbooj: "watermelon", kalingad: "watermelon", kallangadi: "watermelon",
      muskmelon: "muskmelon", "musk melon": "muskmelon", kharbooza: "muskmelon", chibuda: "muskmelon",
      lemon: "lemon", nimbu: "lemon", lime: "lemon", elumichai: "lemon", nimbe: "lemon",
      "mango raw ripe": "mango", "mango raw": "mango", "mango ripe": "mango", mango: "mango", aam: "mango", alphonso: "mango", kesar: "mango", mavina: "mango",
      pineapple: "pineapple", ananas: "pineapple", ananasa: "pineapple",
      jackfruit: "jackfruit", kathal: "jackfruit", phanas: "jackfruit", halasina: "jackfruit", "raw jackfruit": "jackfruit",
      custard_apple: "custard apple", "custard apple": "custard apple", sitaphal: "custard apple", seethaphala: "custard apple",
      fig: "fig", anjeer: "fig", anjura: "fig",
      strawberry: "strawberry", litchi: "litchi", lychee: "litchi",
      plum: "plum", alubukhara: "plum", peach: "peach", aadu: "peach", pear: "pear", nashpati: "pear",
      cherry: "cherry", apricot: "apricot", khubani: "apricot", kiwi: "kiwi",
      dragon_fruit: "dragon fruit", "dragon fruit": "dragon fruit", pitaya: "dragon fruit",
      avocado: "avocado", "butter fruit": "avocado",
      wood_apple: "wood apple", bel: "wood apple", bael: "wood apple", belada: "wood apple",
      amla: "amla", "indian gooseberry": "amla", nellikai: "amla",
      ber: "ber", jujube: "ber", bor: "ber", yalachi: "ber",
      jamun: "jamun", "black plum": "jamun", nerale: "jamun",
      tamarind: "tamarind", imli: "tamarind", hunase: "tamarind",
      dates: "dates", khajoor: "dates", mulberry: "mulberry", shahtoot: "mulberry",
      "passion fruit": "passion fruit", mangosteen: "mangosteen", rambutan: "rambutan",
      persimmon: "persimmon", starfruit: "starfruit", carambola: "starfruit",
      blueberry: "blueberry", blackberry: "blackberry", cranberry: "cranberry", raspberry: "raspberry", grapefruit: "grapefruit",

      // --- Spices & Condiments ---
      garlic: "garlic", lahsun: "garlic", lasun: "garlic", bellulli: "garlic",
      ginger: "ginger", adrak: "ginger", aale: "ginger", shunti: "ginger", "dry ginger": "ginger", sonth: "ginger",
      turmeric: "turmeric", haldi: "turmeric", pasupu: "turmeric", arisina: "turmeric", "dry turmeric": "turmeric",
      "dry chillies": "dry chillies", "dry chilli": "dry chillies", "red chilli": "dry chillies", "lal mirch": "dry chillies", byadgi: "dry chillies",
      "corriander seed": "coriander seed", "coriander seed": "coriander seed", coriander: "coriander", dhaniya: "coriander", kothambari_beeja: "coriander seed",
      "cummin seed jeera": "cumin seed", "cummin seed": "cumin seed", "cumin seed": "cumin seed", jeera: "cumin seed", cumin: "cumin seed", jeerige: "cumin seed",
      soanf: "fennel seed", saunf: "fennel seed", fennel: "fennel seed", "fennel seed": "fennel seed", sompu: "fennel seed",
      ajwan: "ajwain", ajwain: "ajwain", carom: "ajwain", "carom seed": "ajwain", oma: "ajwain",
      "suva dill seed": "dill seed", suva: "dill seed", "dill seed": "dill seed", sabsige: "dill seed",
      fenugreek_seed: "fenugreek seed", "methi seeds": "fenugreek seed", "fenugreek seed": "fenugreek seed", menthe: "fenugreek seed",
      cardamom: "cardamom", elaichi: "cardamom", elakki: "cardamom", "small cardamom": "cardamom", "green cardamom": "cardamom",
      "large cardamom": "large cardamom", "badi elaichi": "large cardamom",
      black_pepper: "black pepper", "black pepper": "black pepper", kali_mirch: "black pepper", menasu: "black pepper", pepper: "black pepper", "white pepper": "white pepper",
      clove: "clove", laung: "clove", lavanga: "clove",
      cinnamon: "cinnamon", dalchini: "cinnamon", chakke: "cinnamon",
      nutmeg: "nutmeg", jaiphal: "nutmeg", jayikai: "nutmeg",
      mace: "mace", javitri: "mace", "mace whole": "mace",
      asafoetida: "asafoetida", hing: "asafoetida", ingu: "asafoetida",
      bay_leaf: "bay leaf", "bay leaf": "bay leaf", tejpatta: "bay leaf",
      poppy_seeds: "poppy seed", "poppy seed": "poppy seed", khas_khas: "poppy seed", gasagase: "poppy seed",
      kalonji: "kalonji", "nigella seed": "kalonji",
      star_anise: "star anise", "star anise": "star anise", chakra_phool: "star anise",
      celery: "celery", "celery seed": "celery seed",
      saffron: "saffron", zafran: "saffron",
      vanilla: "vanilla", amchur: "amchur", "dry mango powder": "amchur", kokum: "kokum",

      // --- Plantation & Forestry ---
      tea: "tea", chai: "tea",
      coffee: "coffee", "coffee arabica": "coffee", "coffee robusta": "coffee",
      rubber: "rubber", "natural rubber": "rubber",
      betel_leaves: "betel leaves", "betel leaves": "betel leaves", paan: "betel leaves", ele: "betel leaves",
      bamboo: "bamboo", baans: "bamboo", bidiru: "bamboo",
      eucalyptus: "eucalyptus", nilgiri: "eucalyptus",
      teak: "teak", sagwan: "teak", thega: "teak",
      sandalwood: "sandalwood", chandan: "sandalwood", gandha: "sandalwood",
      cashewnuts: "cashew", cashew: "cashew", kaju: "cashew", gerubeeja: "cashew", "cashew kernel": "cashew",
      cocoa: "cocoa", "cocoa beans": "cocoa",

      // --- Nuts & Dry Fruits ---
      almond: "almond", badam: "almond",
      walnut: "walnut", akhrot: "walnut",
      pistachio: "pistachio", pista: "pistachio",
      raisins: "raisins", kishmish: "raisins", drakshi_ona: "raisins",
      "fox nut": "makhana", makhana: "makhana",
      "pine nut": "pine nut", chilgoza: "pine nut",
      "dry dates": "dry dates", chhuhara: "dry dates",
      hazelnut: "hazelnut", macadamia: "macadamia", "roasted peanuts": "roasted peanuts",

      // --- Medicinal, Aromatics & Sweeteners ---
      "isabgul psyllium": "isabgol", isabgul: "isabgol", isabgol: "isabgol", psyllium: "isabgol",
      ashwagandha: "ashwagandha", "indian ginseng": "ashwagandha",
      tulsi: "tulsi", "holy basil": "tulsi",
      aloe_vera: "aloe vera", "aloe vera": "aloe vera", ghritkumari: "aloe vera",
      senna: "senna", sonamukhi: "senna",
      lemongrass: "lemongrass", citronella: "citronella",
      stevia: "stevia", "meethi patti": "stevia",
      safed_musli: "safed musli", "safed musli": "safed musli",
      shankhpushpi: "shankhpushpi", brahmi: "brahmi", guggal: "guggal", mentha: "mentha",
      "gur jaggery": "jaggery", gur: "jaggery", jaggery: "jaggery", bella: "jaggery",
      honey: "honey", shahad: "honey", jenu: "honey",

      // --- Flowers ---
      rose: "rose", gulab: "rose", gulabi: "rose",
      marigold: "marigold", genda: "marigold", chenduhoo: "marigold",
      jasmine: "jasmine", mogra: "jasmine", chameli: "jasmine", mallige: "jasmine",
      chrysanthemum: "chrysanthemum", sevanti: "chrysanthemum", sevanthige: "chrysanthemum",
      tuberose: "tuberose", rajanigandha: "tuberose", sugandaraja: "tuberose",
      gladiolus: "gladiolus", gerbera: "gerbera", carnation: "carnation", orchid: "orchid",
      lotus: "lotus", kamal: "lotus", tavare: "lotus", lily: "lily",
      anthurium: "anthurium", gypsophila: "gypsophila", aster: "aster", hibiscus: "hibiscus", gudhal: "hibiscus"
    };

    return aliases[value] || value;
  }


  // ==========================================================
  // NORMALIZE COMMODITY FOR COMPARISON
  // ==========================================================

  normalizeCommodityForComparison(value) {
    return this.normalizeText(value)
      .replace(/\bcommon\b/g, "")
      .replace(/\bwhole\b/g, "")
      .replace(/\bfresh\b/g, "")
      .replace(/\bcrop\b/g, "")
      .replace(/\bseed\b/g, "")
      .replace(/\bseeds\b/g, "")
      .replace(/\bleaves\b/g, "")
      .replace(/\bwet\b/g, "")
      .replace(/\bcod\b/g, "")
      .replace(/\braw\b/g, "")
      .replace(/\bripe\b/g, "")
      .replace(/\bdry\b/g, "")
      .replace(/\bgreen\b/g, "")
      .replace(/\bred\b/g, "")
      .replace(/\bsplit\b/g, "")
      .replace(/\bpods\b/g, "")
      .replace(/\s+/g, "")
      .trim();
  }


  // ==========================================================
  // GET MSP
  // ==========================================================

  getMSPPrice(crop) {
    const normalized = this.normalizeCrop(crop);
    return MSP_PRICES[normalized] || 0;
  }


  // ==========================================================
  // NORMALIZE STATE
  // ==========================================================

  normalizeState(location) {
    const value = String(location || "").trim();

    if (!value) {
      return "";
    }

    const parts = value
      .split(",")
      .map(part => part.trim())
      .filter(Boolean);

    for (const part of [...parts].reverse()) {
      const normalized = this.normalizeText(part);
      if (STATE_ALIASES[normalized]) {
        return STATE_ALIASES[normalized];
      }
    }

    const normalized = this.normalizeText(value);

    if (
      normalized === "india" ||
      normalized === "all india" ||
      normalized === "all" ||
      normalized === "भारत" ||
      normalized === "ಭಾರತ" ||
      normalized === "భారతదేశం" ||
      normalized === "இந்தியா" ||
      normalized === "ഇന്ത്യ"
    ) {
      return "";
    }

    if (STATE_ALIASES[normalized]) {
      return STATE_ALIASES[normalized];
    }

    for (const key of Object.keys(STATE_ALIASES)) {
      if (normalized.includes(key)) {
        return STATE_ALIASES[key];
      }
    }

    return value;
  }


  // ==========================================================
  // REQUEST DATA.GOV.IN (REAL-TIME LIVE FETCH)
  // ==========================================================

  async requestGovernmentAPI({
    commodity = "",
    state = "",
    district = "",
    limit = 10000,
    offset = 0
  }) {
    const apiKey = process.env.DATA_GOV_API_KEY;

    if (!apiKey) {
      throw new Error(
        "DATA_GOV_API_KEY is missing from environment variables."
      );
    }

    const params = new URLSearchParams();
    params.set("api-key", apiKey);
    params.set("format", "json");
    params.set("limit", String(limit));
    params.set("offset", String(offset));

    if (commodity) {
      params.set("filters[commodity]", commodity);
    }

    if (state) {
      params.set("filters[state]", state);
    }

    if (district) {
      params.set("filters[district]", district);
    }

    const url = `${DATA_GOV_API_URL}?${params.toString()}`;

    console.log(
      "[MarketAgent Real-Time Fetch] Request:",
      url.replace(apiKey, "HIDDEN_KEY")
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache"
      }
    });
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `Data.gov.in API error ${response.status}: ${responseText}`
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error("Data.gov.in returned invalid JSON.");
    }

    if (!data || !Array.isArray(data.records)) {
      throw new Error(
        "Data.gov.in response does not contain records."
      );
    }

    return data.records;
  }


  // ==========================================================
  // FETCH ALL GOVERNMENT RECORDS
  // ==========================================================

  async fetchAllGovernmentRecords({
    state = "",
    district = ""
  }) {
    const allRecords = [];
    const pageSize = 10000;
    let offset = 0;
    const maximumPages = 20;

    for (let page = 0; page < maximumPages; page++) {
      const records = await this.requestGovernmentAPI({
        state,
        district,
        limit: pageSize,
        offset
      });

      console.log(
        `[MarketAgent] Page ${page + 1}: ${records.length} records`
      );

      if (records.length === 0) {
        break;
      }

      allRecords.push(...records);

      if (records.length < pageSize) {
        break;
      }

      offset += pageSize;
    }

    console.log(
      "[MarketAgent] Total records:",
      allRecords.length
    );

    return allRecords;
  }


  // ==========================================================
  // COMMODITY MATCH SCORE
  // ==========================================================

  scoreCommodityMatch(userCrop, governmentCommodity) {
    const user = this.normalizeCommodityForComparison(userCrop);
    const government = this.normalizeCommodityForComparison(governmentCommodity);

    if (!user || !government) {
      return 0;
    }

    if (user === government) {
      return 100;
    }

    const userNoSpace = user.replace(/\s+/g, "");
    const governmentNoSpace = government.replace(/\s+/g, "");

    if (userNoSpace === governmentNoSpace) {
      return 95;
    }

    if (governmentNoSpace.includes(userNoSpace)) {
      return 85;
    }

    if (userNoSpace.includes(governmentNoSpace)) {
      return 80;
    }

    const userTokens = this.normalizeText(userCrop)
      .split(" ")
      .filter(Boolean);

    const governmentTokens = this.normalizeText(governmentCommodity)
      .split(" ")
      .filter(Boolean);

    let matchingTokens = 0;
    for (const token of userTokens) {
      if (governmentTokens.includes(token)) {
        matchingTokens++;
      }
    }

    if (matchingTokens > 0) {
      return 50 + matchingTokens * 10;
    }

    return 0;
  }


  // ==========================================================
  // FIND ACTUAL GOVERNMENT COMMODITY
  // ==========================================================

  findMatchingGovernmentCommodity(records, cropType) {
    if (!Array.isArray(records) || records.length === 0) {
      return null;
    }

    const uniqueCommodities = [
      ...new Set(
        records
          .map(record => record.commodity)
          .filter(Boolean)
          .map(value => String(value).trim())
      )
    ];

    let bestMatch = null;
    let bestScore = 0;

    for (const commodity of uniqueCommodities) {
      const score = this.scoreCommodityMatch(cropType, commodity);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = commodity;
      }
    }

    console.log(
      "[MarketAgent] Commodity:",
      cropType,
      "=>",
      bestMatch,
      "score:",
      bestScore
    );

    if (bestScore >= 80) {
      return bestMatch;
    }

    return null;
  }


  // ==========================================================
  // FILTER COMMODITY RECORDS
  // ==========================================================

  filterCommodityRecords(records, governmentCommodity) {
    if (!governmentCommodity) {
      return [];
    }

    const target = this.normalizeCommodityForComparison(governmentCommodity);

    return records.filter(record => {
      const commodity = this.normalizeCommodityForComparison(record.commodity);
      return commodity === target;
    });
  }


  // ==========================================================
  // FETCH GOVERNMENT PRICES
  // ==========================================================

  async fetchGovernmentPrices(cropType, state = "", district = "") {
    const normalizedCrop = this.normalizeCrop(cropType);

    console.log("[MarketAgent] User crop:", cropType);
    console.log("[MarketAgent] Normalized crop:", normalizedCrop);
    console.log("[MarketAgent] State:", state || "ALL INDIA");

    // --------------------------------------------------------
    // FIRST: REQUEST STATE/DISTRICT DATA
    // --------------------------------------------------------
    let stateRecords = [];
    try {
      stateRecords = await this.fetchAllGovernmentRecords({
        state,
        district
      });
    } catch (error) {
      console.warn(
        "[MarketAgent] State request failed:",
        error.message
      );
    }

    // --------------------------------------------------------
    // FIND COMMODITY IN STATE
    // --------------------------------------------------------
    let matchedCommodity = this.findMatchingGovernmentCommodity(
      stateRecords,
      normalizedCrop
    );

    if (matchedCommodity) {
      const matchingRecords = this.filterCommodityRecords(
        stateRecords,
        matchedCommodity
      );

      if (matchingRecords.length > 0) {
        console.log(
          "[MarketAgent] STATE MATCH:",
          matchedCommodity
        );
        return matchingRecords;
      }
    }

    // --------------------------------------------------------
    // FALLBACK: ALL INDIA
    // --------------------------------------------------------
    if (state) {
      console.log("[MarketAgent] Crop not found in requested state. Searching all India.");

      let allIndiaRecords = [];
      try {
        allIndiaRecords = await this.fetchAllGovernmentRecords({
          state: "",
          district: ""
        });
      } catch (error) {
        console.warn(
          "[MarketAgent] All India request failed:",
          error.message
        );
      }

      matchedCommodity = this.findMatchingGovernmentCommodity(
        allIndiaRecords,
        normalizedCrop
      );

      if (matchedCommodity) {
        const matchingRecords = this.filterCommodityRecords(
          allIndiaRecords,
          matchedCommodity
        );

        if (matchingRecords.length > 0) {
          console.log(
            "[MarketAgent] ALL INDIA MATCH:",
            matchedCommodity
          );
          return matchingRecords;
        }
      }
    }

    return [];
  }


  // ==========================================================
  // EXTRACT PRICE
  // ==========================================================

  extractPrice(record) {
    if (!record) {
      return null;
    }

    const possiblePrices = [
      record.modal_price,
      record.modalprice,
      record["Modal Price"],
      record.modal,
      record.max_price,
      record.maxprice,
      record["Max Price"],
      record.min_price,
      record.minprice,
      record["Min Price"]
    ];

    for (const value of possiblePrices) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      const number = Number(
        String(value)
          .replace(/,/g, "")
          .replace(/₹/g, "")
          .trim()
      );

      if (Number.isFinite(number) && number > 0) {
        return number;
      }
    }

    return null;
  }


  // ==========================================================
  // EXTRACT DATE
  // ==========================================================

  extractDate(record) {
    if (!record) {
      return null;
    }

    const possibleDates = [
      record.arrival_date,
      record.arrivalDate,
      record["Arrival Date"],
      record.date,
      record.Date,
      record.report_date,
      record.reportDate,
      record["Report Date"]
    ];

    for (const value of possibleDates) {
      if (!value) {
        continue;
      }

      const text = String(value).trim();

      // DD/MM/YYYY
      let match = text.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
      if (match) {
        const day = Number(match[1]);
        const month = Number(match[2]) - 1;
        const year = Number(match[3]);
        const date = new Date(year, month, day);

        if (!Number.isNaN(date.getTime())) {
          return date;
        }
      }

      // YYYY-MM-DD
      match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);
        const date = new Date(year, month, day);

        if (!Number.isNaN(date.getTime())) {
          return date;
        }
      }

      // Fallback
      const parsed = new Date(text);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    return null;
  }


  // ==========================================================
  // PREPARE RECORDS
  // ==========================================================

  prepareRecords(records) {
    if (!Array.isArray(records)) {
      return [];
    }

    return records
      .map(record => ({
        record,
        price: this.extractPrice(record),
        date: this.extractDate(record)
      }))
      .filter(item => item.price !== null && item.price > 0);
  }


  // ==========================================================
  // SORT RECORDS
  // ==========================================================

  sortRecords(records) {
    return [...records].sort((a, b) => {
      if (a.date && b.date) {
        return a.date.getTime() - b.date.getTime();
      }
      if (a.date) {
        return 1;
      }
      if (b.date) {
        return -1;
      }
      return 0;
    });
  }


  // ==========================================================
  // BUILD MARKET RESULT
  // ==========================================================

  buildMarketResult(records, cropType) {
    const validRecords = this.prepareRecords(records);

    if (validRecords.length === 0) {
      throw new Error(
        "Government data contains no usable positive mandi prices."
      );
    }

    const sortedRecords = this.sortRecords(validRecords);

    // --------------------------------------------------------
    // CURRENT PRICE
    // --------------------------------------------------------
    let currentPrice;
    const datedRecords = sortedRecords.filter(
      item => item.date instanceof Date && !Number.isNaN(item.date.getTime())
    );

    if (datedRecords.length > 0) {
      const latestDate = datedRecords[datedRecords.length - 1].date;
      const latestDateKey = latestDate.toISOString().slice(0, 10);
      const latestDateRecords = datedRecords.filter(
        item => item.date.toISOString().slice(0, 10) === latestDateKey
      );

      const total = latestDateRecords.reduce(
        (sum, item) => sum + item.price,
        0
      );

      currentPrice = Math.round(total / latestDateRecords.length);
    } else {
      const total = sortedRecords.reduce(
        (sum, item) => sum + item.price,
        0
      );
      currentPrice = Math.round(total / sortedRecords.length);
    }

    // --------------------------------------------------------
    // HISTORICAL PRICES
    // --------------------------------------------------------
    const historicalRecords = sortedRecords.slice(-30);
    const historicalPrices = historicalRecords.map(item =>
      Math.round(item.price)
    );

    // --------------------------------------------------------
    // MSP
    // --------------------------------------------------------
    const mspPrice = this.getMSPPrice(cropType);

    // --------------------------------------------------------
    // PRICE TREND
    // --------------------------------------------------------
    let priceTrend = "Stable";

    if (historicalPrices.length >= 2) {
      const first = historicalPrices[0];
      const last = historicalPrices[historicalPrices.length - 1];

      if (first > 0) {
        const percentage = ((last - first) / first) * 100;
        if (percentage > 2) {
          priceTrend = "Rising";
        } else if (percentage < -2) {
          priceTrend = "Falling";
        } else {
          priceTrend = "Stable";
        }
      }
    }

    // --------------------------------------------------------
    // SELL / HOLD
    // --------------------------------------------------------
    let recommendation = "HOLD";

    if (mspPrice > 0) {
      if (currentPrice < mspPrice) {
        recommendation = "SELL";
      } else if (priceTrend === "Falling") {
        recommendation = "SELL";
      } else {
        recommendation = "HOLD";
      }
    } else {
      recommendation = "UNAVAILABLE";
    }

    // --------------------------------------------------------
    // 7-DAY REFERENCE
    // --------------------------------------------------------
    const projectedPrice7Days = currentPrice;
    const projectedPrices = Array(7).fill(currentPrice);

    // --------------------------------------------------------
    // RECOMMENDATION TEXT (MULTILINGUAL)
    // --------------------------------------------------------
    let recommendationText;

    if (mspPrice <= 0) {
      recommendationText = `The latest government mandi price for ${cropType} is ₹${currentPrice}. MSP information is unavailable for this commodity, so no MSP-based comparison is made. The seven-day value is only a reference based on the latest observed price. / ${cropType} की नवीनतम सरकारी मंडी कीमत ₹${currentPrice} है। इस वस्तु के लिए एमएसपी की जानकारी उपलब्ध नहीं है, इसलिए एमएसपी आधारित तुलना नहीं की गई है। सात दिनों की कीमत केवल नवीनतम कीमत पर आधारित संदर्भ है। / ${cropType} ಬೆಳೆಯ ಇತ್ತೀಚಿನ ಮಂಡಿ ದರ ₹${currentPrice}. ಈ ಬೆಳೆಗೆ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಲಭ್ಯವಿಲ್ಲದ್ದರಿಂದ MSP ಆಧಾರಿತ ಹೋಲಿಕೆ ಮಾಡಲಾಗಿಲ್ಲ. ಏಳು ದಿನಗಳ ದರವು ಕೇವಲ ಉಲ್ಲೇಖವಾಗಿದೆ. / ${cropType} తాజా మార్కెట్ ధర ₹${currentPrice}. ఈ పంటకు ప్రభుత్వం మద్దతు ధర నిర్ణయించలేదు, కాబట్టి MSP పోలిక లేదు. ఏడు రోజుల ధర కేవలం తాజా ధర ఆధారంగా సూచన మాత్రమే. / ${cropType} பயிரின் தற்போதைய சந்தை விலை ₹${currentPrice}. இதற்கு MSP நிர்ணயிக்கப்படாததால் ஒப்பீடு செய்யப்படவில்லை. 7 நாள் விலை தற்போதைய விலையின் அடிப்படையிலான குறிப்பு மட்டுமே. / ${cropType} വിളയുടെ ഏറ്റവും പുതിയ വിപണി വില ₹${currentPrice} ആണ്. ഈ വിളയ്ക്ക് താങ്ങുവില ലഭ്യമല്ലാത്തതിനാൽ താരതമ്യം സാധ്യമല്ല. ഏഴ് ദിവസത്തെ വില സമീപകാല നിരക്കിന്റെ സൂചന മാത്രമാണ്.`;
    } else if (recommendation === "HOLD") {
      recommendationText = `The latest government mandi price for ${cropType} is ₹${currentPrice}, compared with an MSP of ₹${mspPrice}. The observed price trend is ${priceTrend.toLowerCase()}. Holding may be considered while monitoring mandi prices. The seven-day value is only a reference and is not a guaranteed forecast. / ${cropType} की नवीनतम सरकारी मंडी कीमत ₹${currentPrice} है और एमएसपी ₹${mspPrice} है। कीमतों का रुझान ${priceTrend} है। मंडी कीमतों पर नजर रखते हुए फसल को रोककर रखना विचार किया जा सकता है। सात दिनों की कीमत केवल संदर्भ है और इसकी कोई गारंटी नहीं है। / ${cropType} ಬೆಳೆಯ ಮಂಡಿ ದರ ₹${currentPrice} ಹಾಗೂ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ₹${mspPrice}. ಬೆಲೆ ಪ್ರವೃತ್ತಿ ${priceTrend} ಆಗಿದೆ. ಮಂಡಿ ದರಗಳನ್ನು ಗಮನಿಸುತ್ತಾ ದಾಸ್ತಾನು ಇರಿಸಿಕೊಳ್ಳಲು ಪರಿಗಣಿಸಬಹುದು. 7 ದಿನಗಳ ಬೆಲೆ ಕೇವಲ ಉಲ್ಲೇಖ ಮಾತ್ರ. / ${cropType} మార్కెట్ ధర ₹${currentPrice}, మద్దతు ధర ₹${mspPrice}. ధర సరళి ${priceTrend} గా ఉంది. మార్కెట్ ధరలను గమనిస్తూ పంటను నిల్వ ఉంచడం మంచిది. 7 రోజుల ధర కేవలం ఒక అంచనా మాత్రమే. / ${cropType} சந்தை விலை ₹${currentPrice} மற்றும் MSP ₹${mspPrice}. விலை போக்கு ${priceTrend} ஆக உள்ளது. சந்தை விலையை கவனித்து இருப்பு வைக்கலாம். 7 நாள் விலை உத்தரவாதமான முன்கணிப்பு அல்ல. / ${cropType} വിപണി വില ₹${currentPrice} ഉം താങ്ങുവില ₹${mspPrice} ഉം ആണ്. വില പ്രവണത ${priceTrend} ആണ്. വിപണി വില നിരീക്ഷിച്ച് വിള സൂക്ഷിക്കുന്നത് പരിഗണിക്കാം. ഏഴ് ദിവസത്തെ വില ഉറപ്പുള്ള പ്രവചനമല്ല.`;
    } else {
      recommendationText = `The latest government mandi price for ${cropType} is ₹${currentPrice}, compared with an MSP of ₹${mspPrice}. The observed price trend is ${priceTrend.toLowerCase()}. Selling may reduce exposure to further price weakness. The seven-day value is only a reference and is not a guaranteed forecast. / ${cropType} की नवीनतम सरकारी मंडी कीमत ₹${currentPrice} है और एमएसपी ₹${mspPrice} है। कीमतों का रुझान ${priceTrend} है। कीमतों में और कमजोरी के जोखिम को कम करने के लिए बेचने पर विचार किया जा सकता है। सात दिनों की कीमत केवल संदर्भ है और इसकी कोई गारंटी नहीं है। / ${cropType} ಬೆಳೆಯ ಮಂಡಿ ದರ ₹${currentPrice} ಹಾಗೂ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ₹${mspPrice}. ಬೆಲೆ ಪ್ರವೃತ್ತಿ ${priceTrend} ಆಗಿದೆ. ಮುಂದಿನ ಬೆಲೆ ಕುಸಿತದಿಂದ ತಪ್ಪಿಸಲು ಮಾರಾಟ ಮಾಡಲು ಪರಿಗಣಿಸಬಹುದು. 7 ದಿನಗಳ ಬೆಲೆ ಕೇವಲ ಉಲ್ಲೇಖ ಮಾತ್ರ. / ${cropType} మార్కెట్ ధర ₹${currentPrice}, మద్దతు ధర ₹${mspPrice}. ధర సరళి ${priceTrend} గా ఉంది. మరింత నష్టాన్ని నివారించడానికి పంటను విక్రయించడం మంచిది. 7 రోజుల ధర కేవలం ఒక అంచనా మాత్రమే. / ${cropType} சந்தை விலை ₹${currentPrice} மற்றும் MSP ₹${mspPrice}. விலை போக்கு ${priceTrend} ஆக உள்ளது. கூடுதல் விலை சரிவைத் தவிர்க்க விற்க பரிசீலிக்கவும். 7 நாள் விலை உத்தரவாதமான முன்கணிப்பு அல்ல. / ${cropType} വിപണി വില ₹${currentPrice} ഉം താങ്ങുവില ₹${mspPrice} ഉം ആണ്. വില പ്രവണത ${priceTrend} ആണ്. കൂടുതൽ വിലയിടിവ് ഒഴിവാക്കാൻ വിൽക്കുന്നത് പരിഗണിക്കാം. ഏഴ് ദിവസത്തെ വില ഉറപ്പുള്ള പ്രവചനമല്ല.`;
    }

    return {
      currentPrice,
      projectedPrice7Days,
      priceTrend,
      recommendation,
      recommendationText,
      mspPrice,
      historicalPrices,
      projectedPrices
    };
  }


  // ==========================================================
  // RUN AGENT
  // ==========================================================

  async runAgent(cropType, location) {
    try {
      if (!cropType || !String(cropType).trim()) {
        throw new Error("Crop name is required.");
      }

      const state = this.normalizeState(location);

      console.log("==========================================");
      console.log("[MarketAgent] Crop:", cropType);
      console.log("[MarketAgent] Location:", location || "India");
      console.log("[MarketAgent] Normalized state:", state || "ALL INDIA");
      console.log("[MarketAgent] Resource ID:", DATA_GOV_RESOURCE_ID);
      console.log("==========================================");

      // Fetch Live Real-Time Data from Government API
      const records = await this.fetchGovernmentPrices(cropType, state, "");

      console.log("[MarketAgent] Final records:", records.length);

      if (records.length === 0) {
        throw new Error(
          `No government mandi records found for ${cropType}.`
        );
      }

      console.log(
        "[MarketAgent] Government commodities:",
        [...new Set(records.map(record => record.commodity).filter(Boolean))]
      );

      // Build Result
      const result = this.buildMarketResult(records, cropType);

      console.log("[MarketAgent] Current price:", result.currentPrice);
      console.log("[MarketAgent] Trend:", result.priceTrend);
      console.log("[MarketAgent] MSP:", result.mspPrice);
      console.log("[MarketAgent] Recommendation:", result.recommendation);

      return result;
    } catch (error) {
      console.error("[MarketAgent] ERROR:", error.message);
      return this.fallback(cropType, location, error.message);
    }
  }


  // ==========================================================
  // FALLBACK
  // ==========================================================

  fallback(cropType, location, reason) {
    console.log("[MarketAgent] FALLBACK:", reason);

    const mspPrice = this.getMSPPrice(cropType);

    return {
      currentPrice: 0,
      projectedPrice7Days: 0,
      priceTrend: "Unavailable",
      recommendation: "UNAVAILABLE",
      recommendationText: `Government mandi price data is unavailable for ${cropType}. ₹0 is NOT the market price. No SELL/HOLD market recommendation can be reliably determined from current government data. Reason: ${reason}. / ${cropType} के लिए सरकारी मंडी कीमत का डेटा उपलब्ध नहीं है। ₹0 वास्तविक बाजार कीमत नहीं है। वर्तमान सरकारी डेटा के आधार पर SELL/HOLD की विश्वसनीय बाजार सलाह निर्धारित नहीं की जा सकती है। कारण: ${reason}। / ${cropType} ಬೆಳೆಗಾಗಿ ಸರ್ಕಾರಿ ಮಂಡಿ ಬೆಲೆ ಲಭ್ಯವಿಲ್ಲ. ₹0 ನೈಜ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಯಲ್ಲ. ಲಭ್ಯವಿರುವ ಮಾಹಿತಿಯಿಂದ ಮಾರಾಟ/ಹಿಡುವಳಿ ಶಿಫಾರಸು ನೀಡಲಾಗುವುದಿಲ್ಲ. ಕಾರಣ: ${reason}. / ${cropType} పంటకు ప్రభుత్వ మార్కెట్ ధర అందుబాటులో లేదు. ₹0 మార్కెట్ ధర కాదు. ప్రస్తుత డేటా ఆధారంగా విక్రయ/నిల్వ సిఫార్సు చేయలేము. కారణం: ${reason}. / ${cropType} பயிருக்கு அரசு சந்தை விலை கிடைக்கவில்லை. ₹0 சந்தை விலை அல்ல. விற்பனை/இருப்பு பரிந்துரை செய்ய இயலவில்லை. காரணம்: ${reason}. / ${cropType} വിളയുടെ സർക്കാർ വിപണി വില ലഭ്യമല്ല. ₹0 യഥാർത്ഥ വിപണി വിലയല്ല. വിൽക്കൽ/സൂക്ഷിക്കൽ ശുപാർശ നൽകാൻ കഴിയില്ല. കാരണം: ${reason}.`,
      mspPrice,
      historicalPrices: [],
      projectedPrices: []
    };
  }

}