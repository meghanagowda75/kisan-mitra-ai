// ============================================================
// CROP + SOIL AGENT
// Deterministic local agricultural knowledge
// Gemini is NOT used for factual crop/soil values.
// ============================================================

import { BaseAgent } from "./BaseAgent.js";


// ============================================================
// SCHEMA
// ============================================================

const cropSoilAgentSchema = {

  type: "OBJECT",

  properties: {

    suitabilityScore: {
      type: "NUMBER",
      description: "Compatibility score from 0 to 100"
    },

    suitabilityDescription: {
      type: "STRING"
    },

    sowingPeriod: {
      type: "STRING"
    },

    wateringNeeds: {
      type: "STRING"
    },

    fertilizerAdvice: {
      type: "STRING"
    },

    commonPests: {
      type: "STRING"
    },

    soilFixes: {
      type: "STRING"
    }

  },

  required: [

    "suitabilityScore",
    "suitabilityDescription",
    "sowingPeriod",
    "wateringNeeds",
    "fertilizerAdvice",
    "commonPests",
    "soilFixes"

  ]

};


// ============================================================
// LOCAL CROP DATABASE (MULTILINGUAL)
// ============================================================

const CROP_DATABASE = {

  tomato: {

    name:
      "Tomato / टमाटर / ಟೊಮ್ಯಾಟೊ / టమోటా / தக்காளி / തക്കാളി",

    preferredSoils: [

      "red",
      "loamy",
      "alluvial",
      "sandy loam"

    ],

    season:
      "Kharif, Rabi and Summer / खरीफ, रबी और ग्रीष्म / ಖಾರಿಫ್, ರಬಿ ಮತ್ತು ಬೇಸಿಗೆ / ఖరీఫ్, రబీ మరియు వేసవి / காரிஃப், ரபி மற்றும் கோடை / ഖാരിഫ്, റബി, വേനൽക്കാലം",

    sowing:
      "June-July, September-October and January-February depending on region / क्षेत्र के अनुसार जून-जुलाई, सितंबर-अक्टूबर और जनवरी-फरवरी / ಪ್ರದೇಶಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಜೂನ್-ಜುಲೈ, ಸೆಪ್ಟೆಂಬರ್-ಅಕ್ಟೋಬರ್ ಮತ್ತು ಜನವರಿ-ಫೆಬ್ರವರಿ / ప్రాంతాన్ని బట్టి జూన్-జులై, సెప్టెంబర్-అక్టోబర్ మరియు జనవరి-ఫిబ్రవరి / பகுதிக்கு ஏற்ப ஜூன்-ஜூலை, செப்டம்பர்-அக்டோபர் மற்றும் ஜனவரி-பிப்ரவரி / പ്രദേശത്തിനനുസരിച്ച് ജൂൺ-ജൂലൈ, സെപ്റ്റംബർ-ഒക്ടോബർ, ജനുവരി-ഫെബ്രുവരി",

    water:
      "Moderate. Irrigate regularly and avoid waterlogging. Drip irrigation is preferred. / मध्यम। नियमित सिंचाई करें और जलभराव से बचें। ड्रिप सिंचाई बेहतर है। / ಮಧ್ಯಮ ನೀರಾವರಿ. ನಿಯಮಿತವಾಗಿ ನೀರುಣಿಸಿ ಮತ್ತು ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ. ಹನಿ ನೀರಾವರಿ ಉತ್ತಮ. / మధ్యస్థం. క్రమం తప్పకుండా నీరు పెట్టండి మరియు నీరు నిలవకుండా చూడండి. డ్రిప్ ఇరిగేషన్ అనుకూలం. / மிதமான நீர் தேவை. சீரான பாசனம் செய்யவும் மற்றும் தண்ணீர் தேங்குவதை தவிர்க்கவும். சொட்டு நீர் பாசனம் சிறந்தது. / മിതമായ നനവ്. കൃത്യമായി നനയ്ക്കുകയും വെള്ളക്കെട്ട് ഒഴിവാക്കുകയും ചെയ്യുക. തുള്ളിനനയാണ് അനുയോജ്യം.",

    nutrients:
      "Apply well-decomposed FYM and balanced NPK. Avoid excessive nitrogen. / अच्छी तरह सड़ी हुई गोबर की खाद और संतुलित एनपीके दें। अधिक नाइट्रोजन से बचें। / ಚೆನ್ನಾಗಿ ಕೊಳೆತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಸಮತೋಲಿತ NPK ಬಳಸಿ. ಅತಿಯಾದ ಸಾರಜನಕವನ್ನು ತಪ್ಪಿಸಿ. / బాగా కుళ్ళిన పశువుల ఎరువు మరియు సమతుల్య NPK వేయండి. అధిక నత్రజని వాడకండి. / நன்கு மக்கிய தொழுவுரம் மற்றும் சமச்சீர் NPK இடவும். அதிகப்படியான தழைச்சத்தை தவிர்க்கவும். / ഉണങ്ങിപ്പൊടിഞ്ഞ ചാണകപ്പൊടിയും സമീകൃത NPK യും ചേർക്കുക. അമിതമായ നൈട്രജൻ ഒഴിവാക്കുക.",

    pests:
      "Fruit borer, whitefly, aphids, leaf miner and early/late blight. / फल छेदक, सफेद मक्खी, एफिड्स, लीफ माइनर तथा अगेती/पछेती झुलसा रोग। / ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು, ಬಿಳಿ ನೊಣ, ಹೇನು, ಎಲೆ ಕೊರೆಯುವ ಹುಳು ಮತ್ತು ಅಂಗಮಾರಿ ರೋಗ. / కాయ తొలుచు పురుగు, తెల్లదోమ, పేనుబంక, ఆకు తొలుచు పురుగు మరియు తెగులు. / காய் துளைப்பான், வெள்ளை ஈ, அசுவினி, இலை சுரங்கப்புழு மற்றும் கருகல் நோய். / കായ്തുരപ്പൻ പുഴു, വെള്ളീച്ച, ഇലപ്പേൻ, ഇലതുരപ്പൻ പുഴു, കരിച്ചിൽ രോഗം."

  },


  wheat: {

    name:
      "Wheat / गेहूं / ಗೋಧಿ / గోధుమలు / கோதுமை / ഗോതമ്പ്",

    preferredSoils: [

      "alluvial",
      "clayey",
      "loamy"

    ],

    season:
      "Rabi (Winter) / रबी (सर्दी) / ರಬಿ (ಚಳಿಗಾಲ) / రబీ (శీతాకాలం) / ரபி (குளிர்காலம்) / റബി (ശീതകാലം)",

    sowing:
      "October-November / अक्टूबर-नवंबर / ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್ / అక్టోబర్-నవంబర్ / அக்டோபர்-நவம்பர் / ഒക്ടോബർ-നവംബർ",

    water:
      "Moderate. Usually requires 4 to 6 critical irrigations. / मध्यम। सामान्यतः 4 से 6 महत्वपूर्ण सिंचाइयों की आवश्यकता होती है। / ಮಧ್ಯಮ. ಸಾಮಾನ್ಯವಾಗಿ 4 ರಿಂದ 6 ಹಂತಗಳಲ್ಲಿ ನಿರ್ಣಾಯಕ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ. / మధ్యస్థం. సాధారణంగా 4 నుండి 6 కీలక నీటి తడులు అవసరం. / மிதமானது. பொதுவாக 4 முதல் 6 முக்கிய பாசனங்கள் தேவைப்படும். / മിതമായ നനവ്. സാധാരണയായി 4 മുതൽ 6 നിർണായക നനകൾ ആവശ്യമാണ്.",

    nutrients:
      "Balanced NPK according to soil testing. / मिट्टी परीक्षण के अनुसार संतुलित एनपीके दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಶಿಫಾರಸಿನಂತೆ ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರ ನೀಡಿ. / నేల పరీక్షల ఆధారంగా సమతుల్య NPK అందించండి. / மண் பரிசோதனை பரிந்துரைப்படி சமச்சீர் NPK உரமிடவும். / മണ്ണുപരിശോധന അടിസ്ഥാനമാക്കി സമീകൃത NPK വളങ്ങൾ ചേർക്കുക.",

    pests:
      "Yellow rust, aphids and termites. / पीला रतुआ, एफिड्स और दीमक। / ಹಳದಿ ತುಕ್ಕು ರೋಗ, ಹೇನು ಮತ್ತು ಗೆದ್ದಲು ಹುಳು. / పసుపు కుంకుమ తెగులు, పేనుబంక మరియు చెదపురుగులు. / மஞ்சள் துரு நோய், அசுவினி மற்றும் கரையான். / മഞ്ഞ തുരുമ്പ് രോഗം, ഇലപ്പേൻ, ചിതൽ."

  },


  rice: {

    name:
      "Rice/Paddy / धान / ಭತ್ತ / వరి / நெல் / നെല്ല്",

    preferredSoils: [

      "clayey",
      "alluvial",
      "loamy"

    ],

    season:
      "Kharif (Monsoon) / खरीफ (मानसून) / ಖಾರಿಫ್ (ಮುಂಗಾರು) / ఖరీఫ్ (వర్షాకాలం) / காரிஃப் (பருவமழை) / ഖാരിഫ് (മഴക്കാലം)",

    sowing:
      "June-July / जून-जुलाई / ಜೂನ್-ಜುಲೈ / ಜೂನ್-ಜುಲೈ / ஜூன்-ஜூலை / ജൂൺ-ജൂലൈ",

    water:
      "High. Maintain adequate moisture and avoid unnecessary prolonged standing water. / अधिक। पर्याप्त नमी बनाए रखें और अनावश्यक लंबे समय तक पानी जमा न रहने दें। / ಅಧಿಕ. ಸೂಕ್ತ ತೇವಾಂಶ ಕಾಪಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಅನಗತ್ಯವಾಗಿ ಹೆಚ್ಚು ಕಾಲ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ. / అధికం. తగినంత తేమను నిర్వహించండి మరియు అనవసరంగా ఎక్కువ కాలం నీరు నిల్వ ఉండకుండా చూడండి. / அதிகம். போதுமான ஈரப்பதத்தை பராமரிக்கவும் மற்றும் நீண்ட நேரம் தேவையற்ற நீர் தேங்குவதை தவிர்க்கவும். / ഉയർന്ന നനവ്. ആവശ്യത്തിന് ഈർപ്പം നിലനിർത്തുകയും അനാവശ്യമായി വെള്ളം കെട്ടിക്കിടക്കുന്നത് ഒഴിവാക്കുകയും ചെയ്യുക.",

    nutrients:
      "Balanced NPK with zinc where soil testing indicates deficiency. / मिट्टी परीक्षण के अनुसार संतुलित एनपीके तथा आवश्यकता होने पर जिंक दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಆಧಾರದ ಮೇಲೆ ಸಮತೋಲಿತ NPK ಮತ್ತು ಅಗತ್ಯವಿದ್ದಲ್ಲಿ ಸತು (Zinc) ನೀಡಿ. / నేల పరీక్షల్లో లోపం ఉన్నట్లయితే సమతుల్య NPK తో పాటు జింక్ అందించండి. / மண் பரிசோதனையில் குறைபாடு காணப்பட்டால் துத்தநாகத்துடன் கூடிய சமச்சீர் NPK இடவும். / മണ്ണുപരിശോധനയിൽ കുറവ് കാണുന്ന പക്ഷം സിങ്ക് അടങ്ങിയ സമീകൃത NPK നൽകുക.",

    pests:
      "Stem borer, brown plant hopper and blast disease. / तना छेदक, भूरा पौधा हॉपर और ब्लास्ट रोग। / ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು, ಕಂದು ಜಿಗಿಹುಳು ಮತ್ತು ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್). / కాండం తొలుచు పురుగు, సుడిదోమ మరియు అగ్గితెగులు. / தண்டு துளைப்பான், புகையான் மற்றும் குலை நோய். / തണ്ടുതുരപ്പൻ പുഴു, തവിട്ടുചാഴി, കുലവാട്ടം."

  },


  cotton: {

    name:
      "Cotton / कपास / ಹತ್ತಿ / ప్రత్తి / பருத்தி / പരുത്തി",

    preferredSoils: [

      "black",
      "alluvial",
      "loamy"

    ],

    season:
      "Kharif / खरीफ / ಖಾರಿಫ್ / ఖరీఫ్ / காரிஃப் / ഖാരിഫ്",

    sowing:
      "May-June / मई-जून / ಮೇ-ಜೂನ್ / మే-జూన్ / மே-ஜூன் / മെയ്-ജൂൺ",

    water:
      "Moderate. Avoid waterlogging and maintain good drainage. / मध्यम। जलभराव से बचें और अच्छी जल निकासी रखें। / ಮಧ್ಯಮ. ನೀರು ನಿಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಿ ಮತ್ತು ಉತ್ತಮ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಕಾಪಾಡಿ. / మధ్యస్థం. నీరు నిలవకుండా జాగ్రత్తపడండి మరియు మంచి డ్రైనేజీ ఉండాలి. / மிதமானது. நீர் தேங்குவதை தவிர்த்து நல்ல வடிகால் வசதியை பராமரிக்கவும். / മിതമായ നനവ്. വെള്ളക്കെട്ട് ഒഴിവാക്കുകയും നല്ല നീർവാർച്ച ഉറപ്പാക്കുകയും ചെയ്യുക.",

    nutrients:
      "Balanced NPK and adequate organic matter according to soil testing. / मिट्टी परीक्षण के अनुसार संतुलित एनपीके और पर्याप्त जैविक पदार्थ दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಪ್ರಕಾರ ಸಮತೋಲಿತ NPK ಮತ್ತು ಸಾಕಷ್ಟು ಸಾವಯವ ಗೊಬ್ಬರ ನೀಡಿ. / నేల పరీక్షల ప్రకారం సమతుల్య NPK మరియు తగినంత సేంద్రీయ ఎరువులు వేయండి. / மண் பரிசோதனைப்படி சமச்சீர் NPK மற்றும் போதுமான இயற்கை உரம் இடவும். / മണ്ണുപരിശോധന അടിസ്ഥാനമാക്കി സമീകൃത NPK യും ആവശ്യത്തിന് ജൈവവളവും ചേർക്കുക.",

    pests:
      "Bollworm, whitefly and aphids. / बॉलवर्म, सफेद मक्खी और एफिड्स। / ಕಾಯಿಕೊರಕ (ಬೋಲ್‌ವರ್ಮ್), ಬಿಳಿ ನೊಣ ಮತ್ತು ಹೇನು. / కాయ తొలుచు పురుగు, తెల్లదోమ మరియు పేనుబంక. / காய்ப்புழு, வெள்ளை ஈ மற்றும் அசுவினி. / കായ്തുരപ്പൻ, വെള്ളീച്ച, ഇലപ്പേൻ."

  },


  mustard: {

    name:
      "Mustard / सरसों / ಸಾಸಿವೆ / ఆవాలు / கடுகு / കടുക്",

    preferredSoils: [

      "alluvial",
      "sandy",
      "clayey",
      "loamy"

    ],

    season:
      "Rabi (Winter) / रबी (सर्दी) / ರಬಿ (ಚಳಿಗಾಲ) / రబీ (శీతాకాలం) / ரபி (குளிர்காலம்) / റബി (ശീതകാലം)",

    sowing:
      "October-November / अक्टूबर-नवंबर / ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್ / అక్టోబర్-నవಂಬర్ / அக்டோபர்-நவம்பர் / ഒക്ടോബർ-നവംബർ",

    water:
      "Low to moderate. Critical irrigation is useful during flowering and pod filling. / कम से मध्यम। फूल आने और फली भरने के समय महत्वपूर्ण सिंचाई उपयोगी है। / ಕಡಿಮೆ ಅಥವಾ ಮಧ್ಯಮ. ಹೂವಾಡುವ ಮತ್ತು ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಾವರಿ ಒದಗಿಸುವುದು ಉಪಯುಕ್ತ. / తక్కువ నుండి మధ్యస్థం. పూత మరియు కాయ దశలలో నీటి తడులు ఇవ్వడం చాలా ముఖ్యం. / குறைவானது முதல் மிதமானது. பூக்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் பாசனம் செய்வது நல்லது. / കുറഞ്ഞത് മുതൽ മിതമായ നനവ്. പൂവിടുന്ന സമയത്തും കായ്ക്കുന്ന സമയത്തും നനയ്ക്കുന്നത് ഗുണം ചെയ്യും.",

    nutrients:
      "Balanced NPK with sulfur according to soil testing. / मिट्टी परीक्षण के अनुसार सल्फर सहित संतुलित एनपीके दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಶಿಫಾರಸಿನಂತೆ ಗಂಧಕದೊಂದಿಗೆ (Sulfur) ಸಮತೋಲಿತ NPK ನೀಡಿ. / నేల పరీక్షల ప్రకారం సల్ఫర్‌తో కూడిన సమతుల్య NPK అందించండి. / மண் பரிசோதனைப்படி கந்தகத்துடன் கூடிய சமச்சீர் NPK உரமிடவும். / മണ്ണുപരിശോധന അനുസരിച്ച് സൾഫർ അടങ്ങിയ സമീകൃത NPK വളങ്ങൾ നൽകുക.",

    pests:
      "Mustard aphids and Alternaria blight. / सरसों के एफिड्स और अल्टरनेरिया ब्लाइट। / ಸಾಸಿವೆ ಹೇನು ಮತ್ತು ಆಲ್ಟರ್ನೇರಿಯಾ ಎಲೆ ಕರಕಲು ರೋಗ. / ఆవ పేనుబంక మరియు ఆల్టర్నేరియా తెగులు. / கடுகு அசுவினி மற்றும் ஆல்டர்நேரியா கருகல் நோய். / കടുക് ഇലപ്പേൻ, ആൾട്ടർനേരിയ ഇലക്കരിച്ചിൽ."

  },


  sugarcane: {

    name:
      "Sugarcane / गन्ना / ಕಬ್ಬು / చెరకు / கரும்பு / കരിമ്പ്",

    preferredSoils: [

      "alluvial",
      "black",
      "clayey",
      "loamy"

    ],

    season:
      "Perennial crop / बारहमासी फसल / ದೀರ್ಘಾವಧಿ ಬೆಳೆ / వార్షిక పంట / நீண்டகால பயிர் / വാർഷിക വിള",

    sowing:
      "January-March or October / जनवरी-मार्च या अक्टूबर / ಜನವರಿ-ಮಾರ್ಚ್ ಅಥವಾ ಅಕ್ಟೋಬರ್ / జనవరి-మార్చి లేదా అక్టోబర్ / ஜனவரி-மார்ச் அல்லது அக்டோபர் / ജനുവരി-മാർച്ച് അല്ലെങ്കിൽ ഒക്ടോബർ",

    water:
      "High. Requires regular irrigation and good drainage. / अधिक। नियमित सिंचाई और अच्छी जल निकासी आवश्यक है। / ಅಧಿಕ. ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಉತ್ತಮ ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಅಗತ್ಯ. / అధికం. క్రమమైన నీటి తడులు మరియు మంచి డ్రైనేజీ అవసరం. / அதிகம். சீரான பாசனம் மற்றும் நல்ல வடிகால் வசதி தேவை. / ഉയർന്ന നനവ്. കൃത്യമായ നനയും നല്ല നീർവാർച്ചാ സൗകര്യവും ആവശ്യമാണ്.",

    nutrients:
      "Balanced NPK with organic compost according to soil testing. / मिट्टी परीक्षण के अनुसार जैविक खाद सहित संतुलित एनपीके दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ಪ್ರಕಾರ ಸಮೃದ್ಧ ಸಾವಯವ ಗೊಬ್ಬರದೊಂದಿಗೆ ಸಮತೋಲಿತ NPK ನೀಡಿ. / నేల పరీక్షల ఆధారంగా సేంద్రీయ ఎరువులతో పాటు సమతుల్య NPK వాడండి. / மண் பரிசோதனைப்படி இயற்கை உரத்துடன் சமச்சீர் NPK இடவும். / മണ്ണുപരിശോധന പ്രകാരം കമ്പോസ്റ്റിനൊപ്പം സമീകൃത NPK നൽകുക.",

    pests:
      "Early shoot borer and red rot. / अगेती तना छेदक और लाल सड़न। / ಸುಳಿ ಕೊರೆಯುವ ಹುಳು ಮತ್ತು ಕೆಂಪು ಕೊಳೆ ರೋಗ. / మొవ్వు తొలుచు పురుగు మరియు ఎర్ర కుళ్ళు తెగులు. / குருத்து துளைப்பான் மற்றும் செவ்வழுகல் நோய். / കുരുത്തുതുരപ്പൻ പുഴു, ചുവപ്പഴുകൽ രോഗം."

  }

};


// ============================================================
// NORMALIZE SOIL
// ============================================================

function normalizeSoil(soilType) {

  if (!soilType) {

    return "";

  }


  const soil =
    String(soilType)
      .toLowerCase()
      .trim();


  const aliases = {

    redsoil:
      "red",

    "red soil":
      "red",

    blacksoil:
      "black",

    "black soil":
      "black",

    clay:
      "clayey",

    "clay soil":
      "clayey",

    clayeysoil:
      "clayey",

    sandysoil:
      "sandy",

    "sandy soil":
      "sandy",

    loamysoil:
      "loamy",

    "loam soil":
      "loamy",

    "sandy loam soil":
      "sandy loam"

  };


  return (
    aliases[soil] ||
    soil
  );

}


// ============================================================
// NORMALIZE CROP
// ============================================================

function normalizeCrop(cropType) {

  if (!cropType) {

    return "";

  }


  const crop =
    String(cropType)
      .toLowerCase()
      .trim();


  const aliases = {

    tomatoe:
      "tomato",

    tomatoes:
      "tomato",

    paddy:
      "rice",

    "rice crop":
      "rice",

    rice_common:
      "rice",

    rice_grade_a:
      "rice",

    wheat_crop:
      "wheat",

    "wheat crop":
      "wheat",

    sugar_cane:
      "sugarcane",

    "sugar cane":
      "sugarcane",

    mustard_crop:
      "mustard",

    "mustard crop":
      "mustard",

    cotton_crop:
      "cotton",

    "cotton crop":
      "cotton"

  };


  return (
    aliases[crop] ||
    crop
  );

}


// ============================================================
// CROP + SOIL AGENT
// ============================================================

export class CropSoilAgent extends BaseAgent {

  constructor() {

    super({

      name:
        "CropSoilAgent",

      description:
        "Analyzes crop and soil compatibility using a deterministic local agricultural database.",

      systemInstruction: `

You are the KisanMitra Crop and Soil Agent.

Crop and soil facts are determined by the local agricultural database.

Do not invent crop information.

Do not change the rule-based suitability score.

All descriptive text must use multi-language format:

English / हिन्दी / ಕನ್ನಡ / తెలుగు / தமிழ் / മലയാളം

Keep advice practical for Indian farmers.

Do not make SELL/HOLD decisions.

`,

      responseSchema:
        cropSoilAgentSchema

    });

  }


  // ==========================================================
  // CALCULATE SUITABILITY
  // ==========================================================

  calculateSuitability(
    crop,
    soil,
    cropRules
  ) {

    let suitabilityScore =
      50;


    let suitabilityDescription =
      "Moderately suitable soil / मध्यम रूप से उपयुक्त मिट्टी / ಸಾಧಾರಣ ಹೊಂದಾಣಿಕೆಯ ಮಣ್ಣು / మధ్యస్థ అనుకూలమైన నేల / மிதமான பொருத்தமுள்ள மண் / മിതമായ അനുയോജ്യതയുള്ള മണ്ണ്";


    let soilFixes =
      "Add organic matter and compost. / जैविक पदार्थ और खाद मिलाएं। / ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ಕಾಂಪೋಸ್ಟ್ ಸೇರಿಸಿ. / సేంద్రీయ పదార్థం మరియు కంపోస్ట్ జోడించండి. / இயற்கை உரம் மற்றும் மக்கிய உரம் சேர்க்கவும். / ജൈവവളവും കമ്പോസ്റ്റും ചേർക്കുക.";


    // --------------------------------------------------------
    // UNKNOWN CROP
    // --------------------------------------------------------

    if (!cropRules) {

      return {

        suitabilityScore,

        suitabilityDescription,

        soilFixes

      };

    }


    const preferred =
      Array.isArray(
        cropRules.preferredSoils
      ) &&
      cropRules.preferredSoils.includes(
        soil
      );


    // --------------------------------------------------------
    // HIGHLY SUITABLE
    // --------------------------------------------------------

    if (preferred) {

      suitabilityScore =
        90;


      suitabilityDescription =
        `${cropRules.name} is highly compatible with ${soil} soil. / ${cropRules.name} ${soil} मिट्टी के साथ अत्यधिक उपयुक्त है। / ಈ ಮಣ್ಣಿಗೆ ${cropRules.name} ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿದೆ. / ఈ నేలకు ${cropRules.name} అత్యంత అనుకూలమైనది. / இந்த மண்ணிற்கு ${cropRules.name} மிகவும் உகந்தது. / ഈ മണ്ണിൽ ${cropRules.name} കൃഷി വളരെ അനുയോജ്യമാണ്.`;


      soilFixes =
        "Maintain good organic matter and drainage. / अच्छी जैविक सामग्री और जल निकासी बनाए रखें। / ಉತ್ತಮ ಸಾವಯವ ಅಂಶ ಮತ್ತು ನೀರು ಬಸಿದುಹೋಗುವ ವ್ಯವಸ್ಥೆ ಕಾಪಾಡಿ. / సేంద్రీయ పదార్థాన్ని మరియు సరైన నీటి పారుదలని నిర్వహించండి. / நல்ல கரிம வளம் மற்றும் வடிகால் வசதியை பராமரிக்கவும். / നല്ല രീതിയിൽ ജൈവാംശവും നീർവാർച്ചയും നിലനിർത്തുക.";


      return {

        suitabilityScore,

        suitabilityDescription,

        soilFixes

      };

    }


    // --------------------------------------------------------
    // SANDY SOIL + RICE/SUGARCANE
    // --------------------------------------------------------

    if (

      soil === "sandy" &&

      (
        crop === "rice" ||
        crop === "sugarcane"
      )

    ) {

      suitabilityScore =
        30;


      suitabilityDescription =
        "Poor suitability because sandy soil drains water quickly. / कम अनुकूल क्योंकि रेतीली मिट्टी पानी को जल्दी निकाल देती है। / ಮರಳು ಮಣ್ಣಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲದಿರುವುದರಿಂದ ಈ ಬೆಳೆಗೆ ಸೂಕ್ತವಲ್ಲ. / ఇసుక నేల నీటిని నిలుపుకోలేదు కాబట్టి అనుకూలత తక్కువ. / மணல் மண் தண்ணீரை விரைவாக வெளியேற்றுவதால் பொருத்தம் குறைவு. / മണൽ മണ്ണ് ഈർപ്പം നിലനിർത്താത്തതിനാൽ അനുയോജ്യമല്ല.";


      soilFixes =
        "Add organic matter and improve water-holding capacity. / जैविक पदार्थ डालें और पानी रोकने की क्षमता बढ़ाएं। / ಹೆಚ್ಚಿನ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಹಾಕಿ ನೀರು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ ಹೆಚ್ಚಿಸಿ. / సేంద్రీయ ఎరువు వేసి నేల నీటి నిల్వ సామర్థ్యాన్ని పెంచండి. / கரிம உரங்களை இட்டு மண்ணின் ஈரப்பதம் தாங்கும் திறனை உயர்த்தவும். / ജൈവവളം ചേർത്ത് മണ്ണിലെ ഈർപ്പം നിലനിർത്താനുള്ള ശേഷി കൂട്ടുക.";


      return {

        suitabilityScore,

        suitabilityDescription,

        soilFixes

      };

    }


    // --------------------------------------------------------
    // CLAYEY SOIL + COTTON
    // --------------------------------------------------------

    if (

      soil === "clayey" &&
      crop === "cotton"

    ) {

      suitabilityScore =
        60;


      suitabilityDescription =
        "Moderately suitable. Heavy clay may cause waterlogging. / मध्यम रूप से उपयुक्त। भारी चिकनी मिट्टी जलभराव पैदा कर सकती है। / ಜೇಡಿ ಮಣ್ಣಿನಲ್ಲಿ ನೀರು ನಿಂತರೆ ಹತ್ತಿ ಬೆಳೆಗೆ ಹಾನಿಯಾಗಬಹುದು. / బంకమట్టి నేలలో నీరు నిలిచే ప్రమాదం ఉంది కాబట్టి జాగ్రత్త అవసరం. / களிமண்ணில் நீர் தேங்க வாய்ப்புள்ளதால் மிதமான பொருத்தம். / കളിമണ്ണിൽ വെള്ളക്കെട്ട് ഉണ്ടാകാൻ സാധ്യതയുള്ളതിനാൽ ശ്രദ്ധിക്കുക.";


      soilFixes =
        "Improve drainage. / जल निकासी सुधारें। / ನೀರು ಬಸಿದುಹೋಗಲು ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ. / సరైన మురుగునీటి పారుదల సౌకర్యం ఏర్పాటు చేయండి. / வடிகால் வசதியை மேம்படுத்தவும். / നീർവാർച്ചാ സൗകര്യം മെച്ചപ്പെടുത്തുക.";


      return {

        suitabilityScore,

        suitabilityDescription,

        soilFixes

      };

    }


    // --------------------------------------------------------
    // BLACK SOIL + MUSTARD
    // --------------------------------------------------------

    if (

      soil === "black" &&
      crop === "mustard"

    ) {

      suitabilityScore =
        70;


      suitabilityDescription =
        "Suitable with good drainage. / अच्छी जल निकासी के साथ उपयुक्त। / ಉತ್ತಮ ನೀರು ಹರಿಯುವಿಕೆ ಇದ್ದರೆ ಕಪ್ಪು ಮಣ್ಣು ಸೂಕ್ತ. / మంచి డ్రైనేజీ ఉంటే ఈ నేల అనుకూలమే. / நல்ல வடிகால் அமைப்பு இருந்தால் பயிரிடலாம். / നല്ല നീർവാർച്ച ഉറപ്പാക്കിയാൽ കൃഷി ചെയ്യാം.";


      soilFixes =
        "Avoid excessive moisture during sowing. / बुवाई के समय अत्यधिक नमी से बचें। / ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಅತಿಯಾದ ತೇವಾಂಶ ತಪ್ಪಿಸಿ. / విత్తే సమయంలో అధిక తేమ లేకుండా చూసుకోండి. / விதைக்கும் போது அதிகப்படியான ஈரப்பதத்தை தவிர்க்கவும். / വിത്ത് വിതയ്ക്കുമ്പോൾ അധിക ഈർപ്പം ഒഴിവാക്കുക.";


      return {

        suitabilityScore,

        suitabilityDescription,

        soilFixes

      };

    }


    // --------------------------------------------------------
    // OTHER KNOWN COMBINATIONS
    // --------------------------------------------------------

    suitabilityScore =
      65;


    suitabilityDescription =
      `${cropRules.name} can grow with suitable soil management. / ${cropRules.name} उचित मिट्टी प्रबंधन के साथ उगाई जा सकती है। / ಸೂಕ್ತ ಮಣ್ಣಿನ ನಿರ್ವಹಣೆಯೊಂದಿಗೆ ${cropRules.name} ಬೆಳೆಯಬಹುದು. / సరైన యాజమాన్య పద్ధతులతో ${cropRules.name} సాగు చేయవచ్చు. / தகுந்த பராமரிப்புடன் ${cropRules.name} பயிரிடலாம். / ശരിയായ പരിചരണത്തോടെ ${cropRules.name} കൃഷി ചെയ്യാവുന്നതാണ്.`;


    soilFixes =
      "Add organic matter and maintain good drainage. / जैविक पदार्थ डालें और अच्छी जल निकासी बनाए रखें। / ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಸಿ ಮತ್ತು ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ. / సేంద్రీయ పదార్థం వేసి మురుగునీటి వసతి కల్పించండి. / இயற்கை உரம் சேர்த்து வடிகால் வசதியை சீரமைக்கவும். / ജൈവവളം ചേർത്ത് നീർവാർച്ച ഉറപ്പാക്കുക.";


    return {

      suitabilityScore,

      suitabilityDescription,

      soilFixes

    };

  }


  // ==========================================================
  // BUILD RESULT
  // ==========================================================

  buildCropSoilResult(
    cropType,
    soilType
  ) {

    const crop =
      normalizeCrop(
        cropType
      );


    const soil =
      normalizeSoil(
        soilType
      );


    const cropRules =
      CROP_DATABASE[crop] || null;


    const suitability =
      this.calculateSuitability(

        crop,

        soil,

        cropRules

      );


    // --------------------------------------------------------
    // UNKNOWN CROP
    // --------------------------------------------------------

    if (!cropRules) {

      return {

        suitabilityScore:
          suitability.suitabilityScore,

        suitabilityDescription:
          suitability.suitabilityDescription,

        sowingPeriod:
          "Standard crop season / सामान्य फसल मौसम / ಸಾಮಾನ್ಯ ಕೃಷಿ ಹಂಗಾಮು / సాధారణ పంట కాలం / நிலையான பயிர் பருவம் / സാധാരണ വിളക്കാലം",

        wateringNeeds:
          "Irrigate according to crop needs. / फसल की आवश्यकता के अनुसार सिंचाई करें। / ಬೆಳೆಯ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ನೀರುಣಿಸಿ. / పంట అవసరాన్ని బట్టి నీటి తడులు ఇవ్వండి. / பயிரின் தேவைக்கேற்ப பாசனம் செய்யவும். / വിളയുടെ ആവശ്യമനുസരിച്ച് നനയ്ക്കുക.",

        fertilizerAdvice:
          "Use soil-test-based fertilizer. / मिट्टी परीक्षण के आधार पर उर्वरक दें। / ಮಣ್ಣು ಪರೀಕ್ಷೆ ಆಧಾರಿತ ಗೊಬ್ಬರ ಬಳಸಿ. / నేల పరీక్షల ఆధారంగా ఎరువులు వాడండి. / மண் பரிசோதனைப்படி உரமிடவும். / മണ്ണുപരിശോധന നടത്തി വളപ്രയോഗം നടത്തുക.",

        commonPests:
          "Monitor common pests and diseases. / सामान्य कीट और रोगों की निगरानी करें। / ಕೀಟ ಮತ್ತು ರೋಗಬಾಧೆಗಳ ಮೇಲೆ ನಿಗಾ ಇರಿಸಿ. / సాధారణ చీడపీడలను గమనిస్తూ ఉండండి. / பூச்சிகள் மற்றும் நோய்களை கண்காணிக்கவும். / കീടങ്ങളെയും രോഗങ്ങളെയും നിരീക്ഷിക്കുക.",

        soilFixes:
          suitability.soilFixes

      };

    }


    // --------------------------------------------------------
    // KNOWN CROP
    // --------------------------------------------------------

    return {

      suitabilityScore:
        suitability.suitabilityScore,

      suitabilityDescription:
        suitability.suitabilityDescription,

      sowingPeriod:
        `${cropRules.season}. Sowing: ${cropRules.sowing}`,

      wateringNeeds:
        cropRules.water,

      fertilizerAdvice:
        cropRules.nutrients,

      commonPests:
        cropRules.pests,

      soilFixes:
        suitability.soilFixes

    };

  }


  // ==========================================================
  // RUN AGENT
  // ==========================================================

  async runAgent(
    cropType,
    soilType,
    farmerQuestion = ""
  ) {

    console.log(
      "[CropSoilAgent] Running deterministic crop/soil analysis..."
    );


    console.log(
      "[CropSoilAgent] Crop:",
      cropType
    );


    console.log(
      "[CropSoilAgent] Soil:",
      soilType
    );


    if (farmerQuestion) {

      console.log(
        "[CropSoilAgent] Farmer question:",
        farmerQuestion
      );

    }


    const result =
      this.buildCropSoilResult(

        cropType,

        soilType

      );


    console.log(
      "[CropSoilAgent] Suitability score:",
      result.suitabilityScore
    );


    console.log(
      "[CropSoilAgent] Deterministic result generated successfully."
    );


    return result;

  }


  // ==========================================================
  // FALLBACK
  // ==========================================================

  fallback(
    context,
    reason
  ) {

    console.log(
      `[CropSoilAgent] Fallback: ${reason}`
    );


    const cropType =
      context?.cropType || "";


    const soilType =
      context?.soilType || "";


    return this.buildCropSoilResult(

      cropType,

      soilType

    );

  }

}