"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Sprout,
  CloudRain,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  HelpCircle,
  MapPin,
  Globe,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mic,
  Search,
  Check,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

/* =========================================================
   TYPES
========================================================= */

export type Language = "en" | "hi" | "kn" | "te" | "ta" | "ml";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  speechCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", speechCode: "en-IN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", speechCode: "hi-IN" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", speechCode: "kn-IN" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", speechCode: "te-IN" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", speechCode: "ta-IN" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", speechCode: "ml-IN" },
];

type Crop = {
  id: string;
  name: Record<Language, string>;
  emoji: string;
};

type Soil = {
  id: string;
  name: Record<Language, string>;
};

type LoadingStage = {
  id: number;
  labels: Record<Language, string>;
};

type ChartPoint = {
  name: string;
  price: number;
  type: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const TRANSLATIONS: Record<
  Language,
  {
    title: string;
    subtitle: string;
    selectCrop: string;
    selectSoil: string;
    enterLocation: string;
    selectLocation: string;
    selectState: string;
    selectDistrict: string;
    enterTalukPanchayath: string;
    chooseState: string;
    chooseDistrict: string;
    customQ: string;
    askButton: string;
    loading: string;
    transparencyTitle: string;
    weatherAgent: string;
    cropAgent: string;
    marketAgent: string;
    currentPrice: string;
    mspPrice: string;
    projection: string;
    decision: string;
    reason: string;
    sellRec: string;
    holdRec: string;
    reset: string;
    quickQ: string;
    placeholderQ: string;
    suitability: string;
    fertilizer: string;
    watering: string;
    pests: string;
    recom: string;
    trend: string;
    quickQ1: string;
    quickQ2: string;
    quickQ3: string;
    quickQ4: string;
    connectingBackend: string;
    anyLocation: string;
    cropsAvailable: string;
    soilTypesAvailable: string;
    chooseLocation: string;
    listening: string;
    speakNow: string;
    temperature: string;
    condition: string;
    weeklyRain: string;
    advisorySummary: string;
    queryDetails: string;
    forQuestion: string;
    forecastChart: string;
    historicalProjection: string;
    mandiRate: string;
    retry: string;
    connectionFailed: string;
    securityQuestion: string;
    cropRequired: string;
    soilRequired: string;
    locationRequired: string;
    stateRequired: string;
    districtRequired: string;
    noData: string;
    noMsp: string;
    searchPlaceholder: string;
    talukPlaceholder: string;
    suggestedLocations: string;
    speechNotSupported: string;
    micBlocked: string;
  }
> = {
  en: {
    title: "KisanMitra",
    subtitle: "Farmer's Friend AI Multi-Agent System",
    selectCrop: "Select Crop",
    selectSoil: "Select Soil Type",
    enterLocation: "Geographical Location Hierarchy",
    selectLocation: "Select Location",
    selectState: "Step 1: Select State / UT",
    selectDistrict: "Step 2: Select District / City (Alphabetical)",
    enterTalukPanchayath: "Step 3: Type Taluk / Grama Panchayath / Village",
    chooseState: "-- Select State / UT --",
    chooseDistrict: "-- Select District --",
    customQ: "Ask a Specific Question (Optional)",
    askButton: "Get Smart Agricultural Decision",
    loading: "Orchestrating AI Agents...",
    transparencyTitle: "Transparency Panel: Agent Breakdown",
    weatherAgent: "Weather Agent Report",
    cropAgent: "Crop & Soil Suitability Advice",
    marketAgent: "Market Price & Mandi Trends",
    currentPrice: "Current Mandi Rate",
    mspPrice: "Govt MSP Rate",
    projection: "7-Day Projection",
    decision: "Final Unified Recommendation",
    reason: "Key Reason",
    sellRec: "SELL NOW",
    holdRec: "HOLD / WAIT",
    reset: "Start Over",
    quickQ: "Quick Common Questions",
    placeholderQ: "e.g., Should I harvest now since cloud cover is increasing?",
    suitability: "Soil Suitability",
    fertilizer: "Nutrient Advice",
    watering: "Irrigation Info",
    pests: "Pest Threat",
    recom: "Mandi Recommendation",
    trend: "Trend Sentiment",
    quickQ1: "Should I sell now or wait for a price hike?",
    quickQ2: "Heavy rain is forecast. Should I harvest immediately?",
    quickQ3: "Which fertilizer should I apply this week?",
    quickQ4: "Is my soil good for this crop?",
    connectingBackend: "Connecting to KisanMitra backend...",
    anyLocation: "Type or select region",
    cropsAvailable: "commodities available & guaranteed",
    soilTypesAvailable: "major soil types available",
    chooseLocation: "Choose a state / city / district",
    listening: "Listening...",
    speakNow: "Listening... Speak now",
    temperature: "Temperature",
    condition: "Condition",
    weeklyRain: "Weekly Rain Probability",
    advisorySummary: "Advisory Summary",
    queryDetails: "Query Details:",
    forQuestion: "For Question:",
    forecastChart: "Mandi Price Forecast Chart",
    historicalProjection: "Historical mandi prices and 7-day projection.",
    mandiRate: "Mandi Rate",
    retry: "Retry Call",
    connectionFailed: "Connection Failed",
    securityQuestion: "Security Validation: Question exceeds 300 character limit.",
    cropRequired: "Please select a crop.",
    soilRequired: "Please select a soil type.",
    locationRequired: "Please select your state and district.",
    stateRequired: "Please select a state.",
    districtRequired: "Please select a district.",
    noData: "₹ Mandi Baseline Active",
    noMsp: "No MSP",
    searchPlaceholder: "Type to search 1000+ crops...",
    talukPlaceholder: "(e.g., Jangamakote, Hoskote, Channapatna...)",
    suggestedLocations: "Matching Taluks / Panchayaths / Villages",
    speechNotSupported: "Speech recognition is not supported in this browser. Please use Chrome, Safari or Edge.",
    micBlocked: "Microphone access blocked. Please enable microphone permissions in browser settings.",
  },
  hi: {
    title: "किसानमित्र",
    subtitle: "बहु-एजेंट एआई कृषि निर्णय प्रणाली",
    selectCrop: "फसल चुनें",
    selectSoil: "मिट्टी का प्रकार चुनें",
    enterLocation: "भौगोलिक स्थान पदानुक्रम",
    selectLocation: "स्थान चुनें",
    selectState: "चरण 1: राज्य / केंद्र शासित प्रदेश चुनें (वर्णानुक्रम)",
    selectDistrict: "चरण 2: जिला / शहर चुनें (वर्णानुक्रम)",
    enterTalukPanchayath: "चरण 3: तालुक / ग्राम पंचायत / गाँव का नाम लिखें",
    chooseState: "-- राज्य चुनें --",
    chooseDistrict: "-- जिला चुनें --",
    customQ: "कोई विशेष प्रश्न पूछें (वैकल्पिक)",
    askButton: "स्मार्ट कृषि निर्णय प्राप्त करें",
    loading: "कृषि एजेंटों से परामर्श लिया जा रहा है...",
    transparencyTitle: "पारदर्शिता पैनल: विशेषज्ञों की रिपोर्ट",
    weatherAgent: "मौसम एजेंट की रिपोर्ट",
    cropAgent: "फसल और मिट्टी उपयुक्तता सलाह",
    marketAgent: "मंडी मूल्य और बाजार विश्लेषण",
    currentPrice: "वर्तमान मंडी दर",
    mspPrice: "सरकारी न्यूनतम समर्थन मूल्य",
    projection: "7-दिनों का पूर्वानुमान",
    decision: "अंतिम कार्य योजना",
    reason: "मुख्य कारण",
    sellRec: "अभी बेचें",
    holdRec: "रोकें / प्रतीक्षा करें",
    reset: "फिर से शुरू करें",
    quickQ: "सामान्य त्वरित प्रश्न",
    placeholderQ: "जैसे: क्या बादल छाने पर मुझे अभी कटाई कर लेनी चाहिए?",
    suitability: "मिट्टी उपयुक्तता",
    fertilizer: "उर्वरक सलाह",
    watering: "सिंचाई निर्देश",
    pests: "कीट खतरा",
    recom: "मंडी सिफारिश",
    trend: "बाजार का रुख",
    quickQ1: "क्या मुझे अभी बेचना चाहिए या दाम बढ़ने का इंतजार करना चाहिए?",
    quickQ2: "भारी बारिश का अनुमान है। क्या मुझे तुरंत कटाई करनी चाहिए?",
    quickQ3: "इस सप्ताह मुझे कौन सा उर्वरक डालना चाहिए?",
    quickQ4: "क्या मेरी मिट्टी इस फसल के लिए सही है?",
    connectingBackend: "किसानमित्र बैकएंड से जुड़ रहा है...",
    anyLocation: "क्षेत्र चुनें या लिखें",
    cropsAvailable: "फसलें व कमोडिटी सक्रिय रूप से उपलब्ध",
    soilTypesAvailable: "प्रमुख मिट्टी प्रकार उपलब्ध हैं",
    chooseLocation: "राज्य / शहर / जिला चुनें",
    listening: "सुन रहा हूँ...",
    speakNow: "सुन रहा हूँ... अब बोलें",
    temperature: "तापमान",
    condition: "स्थिति",
    weeklyRain: "साप्ताहिक बारिश संभावना",
    advisorySummary: "सलाह सारांश",
    queryDetails: "पूछताछ विवरण:",
    forQuestion: "प्रश्न के लिए:",
    forecastChart: "मंडी मूल्य पूर्वानुमान चार्ट",
    historicalProjection: "ऐतिहासिक मंडी भाव और 7 दिनों का पूर्वानुमान।",
    mandiRate: "मंडी दर",
    retry: "पुनः प्रयास करें",
    connectionFailed: "कनेक्शन विफल रहा",
    securityQuestion: "सुरक्षा सत्यापन: प्रश्न 300 वर्णों की सीमा से अधिक है।",
    cropRequired: "कृपया फसल चुनें।",
    soilRequired: "कृपया मिट्टी का प्रकार चुनें।",
    locationRequired: "कृपया अपना राज्य और जिला चुनें।",
    stateRequired: "कृपया राज्य चुनें।",
    districtRequired: "कृपया जिला चुनें।",
    noData: "₹ बाजार आधार दर",
    noMsp: "एमएसपी नहीं",
    searchPlaceholder: "1000+ फसलों में खोजें...",
    talukPlaceholder: "2+ अक्षर लिखें (जैसे: जंगमकोटे, होसकोटे, चन्नपटन...)",
    suggestedLocations: "संबंधित तालुक / पंचायत / गाँव",
    speechNotSupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है। कृपया क्रोम, सफारी या एज का उपयोग करें।",
    micBlocked: "माइक्रोफ़ोन एक्सेस ब्लॉक है। कृपया ब्राउज़र सेटिंग्स में अनुमतियों को सक्षम करें।",
  },
  kn: {
    title: "ಕಿಸಾನ್‌ಮಿತ್ರ",
    subtitle: "ರೈತ ಮಿತ್ರ ಮಲ್ಟಿ-ಏಜೆಂಟ್ AI ಕೃಷಿ ನಿರ್ಧಾರ ವ್ಯವಸ್ಥೆ",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    selectSoil: "ಮಣ್ಣಿನ ವಿಧ ಆಯ್ಕೆಮಾಡಿ",
    enterLocation: "ಭೌಗೋಳಿಕ ಸ್ಥಳ ಶ್ರೇಣಿ",
    selectLocation: "ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectState: "ಹಂತ 1: ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಹಂತ 2: ಜಿಲ್ಲೆ / ನಗರ ಆಯ್ಕೆಮಾಡಿ (ವರ್ಣಮಾಲೆಯಂತೆ)",
    enterTalukPanchayath: "ಹಂತ 3: ತಾಲೂಕು / ಗ್ರಾಮ ಪಂಚಾಯಿತಿ / ಗ್ರಾಮ ನಮೂದಿಸಿ",
    chooseState: "-- ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ --",
    chooseDistrict: "-- ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ --",
    customQ: "ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಐಚ್ಛಿಕ)",
    askButton: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನಿರ್ಧಾರ ಪಡೆಯಿರಿ",
    loading: "AI ಏಜೆಂಟ್‌ಗಳನ್ನು ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...",
    transparencyTitle: "ಪಾರದರ್ಶಕತೆ ಫಲಕ: ಏಜೆಂಟ್ ವರದಿ ವಿವರಣೆ",
    weatherAgent: "ಹವಾಮಾನ ಏಜೆಂಟ್ ವರದಿ",
    cropAgent: "ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ ಸಲಹೆ",
    marketAgent: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಎಪಿಎಂಸಿ ಟ್ರೆಂಡ್",
    currentPrice: "ಪ್ರಸ್ತುತ ಮಂಡಿ ದರ",
    mspPrice: "ಸರ್ಕಾರಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)",
    projection: "7-ದಿನಗಳ ಮುನ್ನೋಟ",
    decision: "ಅಂತಿಮ ಸಂಯೋಜಿತ ಶಿಫಾರಸು",
    reason: "ಮುಖ್ಯ ಕಾರಣ",
    sellRec: "ಈಗಲೇ ಮಾರಿ",
    holdRec: "ಕಾಯಿರಿ / ಕಾಯ್ದಿರಿಸಿ",
    reset: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
    quickQ: "ತ್ವರಿತ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    placeholderQ: "ಉದಾ: ಮೋಡ ಕವಿದಿರುವುದರಿಂದ ಈಗಲೇ ಕೊಯ್ಲು ಮಾಡಬೇಕೇ?",
    suitability: "ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ",
    fertilizer: "ಪೋಷಕಾಂಶ / ಗೊಬ್ಬರ ಸಲಹೆ",
    watering: "ನೀರಾವರಿ ಮಾಹಿತಿ",
    pests: "ಕೀಟ ಬಾಧೆಯ ಎಚ್ಚರಿಕೆ",
    recom: "ಮಾರುಕಟ್ಟೆ ಶಿಫಾರಸು",
    trend: "ಬೆಲೆ ಪ್ರವೃತ್ತಿ",
    quickQ1: "ನಾನು ಈಗಲೇ ಮಾರಾಟ ಮಾಡಬೇಕೇ ಅಥವಾ ಬೆಲೆ ಏರಿಕೆಗೆ ಕಾಯಬೇಕೇ?",
    quickQ2: "ಭಾರೀ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇದೆ. ತಕ್ಷಣ ಕೊಯ್ಲು ಮಾಡಬೇಕೇ?",
    quickQ3: "ಈ ವಾರ ಯಾವ ರಸಗೊಬ್ಬರವನ್ನು ಬಳಸಬೇಕು?",
    quickQ4: "ಈ ಬೆಳೆಗೆ ನನ್ನ ಮಣ್ಣು ಸೂಕ್ತವಾಗಿದೆಯೇ?",
    connectingBackend: "ಕಿಸಾನ್‌ಮಿತ್ರ ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...",
    anyLocation: "ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಬರೆಯಿರಿ",
    cropsAvailable: "ಬೆಳೆಗಳು ಮತ್ತು ಸರಕುಗಳು ಲಭ್ಯವಿವೆ",
    soilTypesAvailable: "ಪ್ರಮುಖ ಮಣ್ಣಿನ ವಿಧಗಳು ಲಭ್ಯವಿವೆ",
    chooseLocation: "ರಾಜ್ಯ / ನಗರ / ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    speakNow: "ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ",
    temperature: "ತಾಪಮಾನ",
    condition: "ಹವಾಮಾನ ಸ್ಥಿತಿ",
    weeklyRain: "ವಾರದ ಮಳೆ ಸಂಭವನೀಯತೆ",
    advisorySummary: "ಸಲಹಾ ಸಾರಾಂಶ",
    queryDetails: "ಪ್ರಶ್ನೆ ವಿವರಗಳು:",
    forQuestion: "ಕೇಳಲಾದ ಪ್ರಶ್ನೆ:",
    forecastChart: "ಮಂಡಿ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ಚಾರ್ಟ್",
    historicalProjection: "ಹಿಂದಿನ ಮಂಡಿ ದರಗಳು ಮತ್ತು 7 ದಿನಗಳ ಬೆಲೆ ಮುನ್ನೋಟ.",
    mandiRate: "ಮಂಡಿ ದರ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    connectionFailed: "ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ",
    securityQuestion: "ಭದ್ರತಾ ಮೌಲ್ಯೀಕರಣ: ಪ್ರಶ್ನೆ 300 ಅಕ್ಷರಗಳ ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
    cropRequired: "ದಯವಿಟ್ಟು ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    soilRequired: "ದಯವಿಟ್ಟು ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    locationRequired: "ದಯವಿಟ್ಟು ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    stateRequired: "ದಯವಿಟ್ಟು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    districtRequired: "ದಯವಿಟ್ಟು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    noData: "₹ ಮೂಲ ದರ ಸಕ್ರಿಯವಾಗಿದೆ",
    noMsp: "MSP ಇಲ್ಲ",
    searchPlaceholder: "1000+ ಬೆಳೆಗಳಲ್ಲಿ ಹುಡುಕಿ...",
    talukPlaceholder: "(ಉದಾ: ಜಂಗಮಕೋಟೆ, ಹೊಸಕೋಟೆ, ಚನ್ನಪಟ್ಟಣ...)",
    suggestedLocations: "ಹೊಂದಾಣಿಕೆಯಾಗುವ ತಾಲೂಕು / ಪಂಚಾಯತ್ / ಗ್ರಾಮಗಳು",
    speechNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome, Safari ಅಥವಾ Edge ಬಳಸಿ.",
    micBlocked: "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಸಿ.",
  },
  te: {
    title: "కిసాన్‌మిత్ర",
    subtitle: "రైతు మిత్ర మల్టీ-ఏజెంట్ AI వ్యవసాయ నిర్ణయ వ్యవస్థ",
    selectCrop: "పంటను ఎంచుకోండి",
    selectSoil: "నేల రకాన్ని ఎంచుకోండి",
    enterLocation: "భౌగోళిక ప్రాంత క్రమం",
    selectLocation: "ప్రాంతాన్ని ఎంచుకోండి",
    selectState: "దశ 1: రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "దశ 2: జిల్లాను ఎంచుకోండి (అక్షర క్రమంలో)",
    enterTalukPanchayath: "దశ 3: తాలూకా / గ్రామ పంచాయతీ / గ్రామం నమోదు చేయండి",
    chooseState: "-- రాష్ట్రం ఎంచుకోండి --",
    chooseDistrict: "-- జిల్లా ఎంచుకోండి --",
    customQ: "నిర్దిష్ట ప్రశ్న అడగండి (ఐచ్ఛికం)",
    askButton: "స్మార్ట్ వ్యవసాయ నిర్ణయం పొందండి",
    loading: "AI ఏజెంట్లతో చర్చిస్తోంది...",
    transparencyTitle: "పారదర్శకత ప్యానెల్: ఏజెంట్ నివేదిక",
    weatherAgent: "వాతావరణ ఏజెంట్ నివేదిక",
    cropAgent: "పంట & నేల అనుకూలత సలహా",
    marketAgent: "మార్కెట్ ధర & మార్కెట్ ట్రెండ్స్",
    currentPrice: "ప్రస్తుత మార్కెట్ ధర",
    mspPrice: "ప్రభుత్వ మద్దతు ధర (MSP)",
    projection: "7 రోజుల ముందస్తు అంచనా",
    decision: "తుది సిఫార్సు",
    reason: "ప్రధాన కారణం",
    sellRec: "ఇప్పుడే అమ్మండి",
    holdRec: "ఆగండి / నిల్వ చేయండి",
    reset: "మళ్లీ ప్రారంభించండి",
    quickQ: "త్వరిత సాధారణ ప్రశ్నలు",
    placeholderQ: "ఉదా: మేఘాలు ఎక్కువగా ఉన్నాయి, నేను ఇప్పుడే కోత కోయవచ్చా?",
    suitability: "నేల అనుకూలత",
    fertilizer: "ఎరువుల సలహా",
    watering: "నీటిపారుదల సమాచారం",
    pests: "కీటకాల హెచ్చరిక",
    recom: "మార్కెట్ సిఫార్సు",
    trend: "ధర సరళి",
    quickQ1: "నేను ఇప్పుడే అమ్మాలా లేక ధర పెరిగే వరకు ఆగాలా?",
    quickQ2: "భారీ వర్ష సూచన ఉంది. వెంటనే కోత కోయాలా?",
    quickQ3: "ఈ వారం ఏ ఎరువు వేయాలి?",
    quickQ4: "నా నేల ఈ పంటకు అనుకూలమేనా?",
    connectingBackend: "సర్వర్‌కు కనెక్ట్ అవుతోంది...",
    anyLocation: "ప్రాంతాన్ని ఎంచుకోండి లేదా టైప్ చేయండి",
    cropsAvailable: "పంటలు అందుబాటులో ఉన్నాయి",
    soilTypesAvailable: "నేల రకాలు అందుబాటులో ఉన్నాయి",
    chooseLocation: "రాష్ట్రం / నగరం / జిల్లాను ఎంచుకోండి",
    listening: "వింటోంది...",
    speakNow: "వింటోంది... ఇప్పుడు మాట్లాడండి",
    temperature: "ఉష్ణోగ్రత",
    condition: "వాతావరణ పరిస్థితి",
    weeklyRain: "వారం వర్షపాతం సంభావ్యత",
    advisorySummary: "సలహా సారాంశం",
    queryDetails: "ప్రశ్న వివరాలు:",
    forQuestion: "అడిగిన ప్రశ్న:",
    forecastChart: "మార్కెట్ ధర సూచన చార్ట్",
    historicalProjection: "గత మార్కెట్ ధరలు మరియు 7 రోజుల అంచనా.",
    mandiRate: "మార్కెట్ రేటు",
    retry: "మళ్ళీ ప్రయత్నించండి",
    connectionFailed: "కనెక్షన్ విఫలమైంది",
    securityQuestion: "ప్రశ్న 300 అక్షరాల పరిమితిని మించింది.",
    cropRequired: "దయచేసి పంటను ఎంచుకోండి.",
    soilRequired: "దయచేసి నేల రకాన్ని ఎంచుకోండి.",
    locationRequired: "దయచేసి రాష్ట్రం మరియు జిల్లాను ఎంచుకోండి.",
    stateRequired: "దయచేసి రాష్ట్రాన్ని ఎంచుకోండి.",
    districtRequired: "దయచేసి జిల్లాను ఎంచుకోండి.",
    noData: "₹ బేస్ రేటు యాక్టివ్‌గా ఉంది",
    noMsp: "MSP లేదు",
    searchPlaceholder: "1000+ పంటలలో శోధించండి...",
    talukPlaceholder: "(ఉదా: జంగమకోట, హోస్కోట, చన్నపట్న...)",
    suggestedLocations: "సంబంధిత తాలూకాలు / పంచాయతీలు",
    speechNotSupported: "ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ లేదు. Chrome, Safari లేదా Edge వాడండి.",
    micBlocked: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది.",
  },
  ta: {
    title: "கிசான்மித்ரா",
    subtitle: "விவசாயிகளுக்கான மல்டி-ஏஜென்ட் AI முடிவெடுக்கும் தளம்",
    selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
    selectSoil: "மண் வகையைத் தேர்ந்தெடுக்கவும்",
    enterLocation: "இருப்பிட படிநிலை",
    selectLocation: "இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்",
    selectState: "படி 1: மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "படி 2: மாவட்டத்தைத் தேர்ந்தெடுக்கவும் (அகரவரிசை)",
    enterTalukPanchayath: "படி 3: தாலுகா / கிராம பஞ்சாயத்து உள்ளிடவும்",
    chooseState: "-- மாநிலம் தேர்ந்தெடுக்கவும் --",
    chooseDistrict: "-- மாவட்டம் தேர்ந்தெடுக்கவும் --",
    customQ: "குறிப்பிட்ட கேள்வியைக் கேட்கவும் (விருப்பத்தேர்வு)",
    askButton: "ஸ்மார்ட் விவசாய முடிவைப் பெறுங்கள்",
    loading: "AI ஏஜெண்டுகள் பகுப்பாய்வு செய்கின்றன...",
    transparencyTitle: "வெளிப்படைத்தன்மை குழு: நிபுணர் அறிக்கை",
    weatherAgent: "வானிலை ஏஜெண்ட் அறிக்கை",
    cropAgent: "பயிர் மற்றும் மண் பொருத்தம் ஆலோசனை",
    marketAgent: "சந்தை விலை மற்றும் போக்குகள்",
    currentPrice: "தற்போதைய சந்தை விலை",
    mspPrice: "அரசு குறைந்தபட்ச ஆதரவு விலை (MSP)",
    projection: "7-நாள் முன்கணிப்பு",
    decision: "இறுதி ஒருங்கிணைந்த முடிவு",
    reason: "முக்கிய காரணம்",
    sellRec: "இப்போதே விற்கவும்",
    holdRec: "காத்திருக்கவும் / சேமிக்கவும்",
    reset: "மீண்டும் தொடங்கவும்",
    quickQ: "விரைவு பொதுவான கேள்விகள்",
    placeholderQ: "எ.கா: மேகமூட்டம் அதிகமாக இருப்பதால் உடனே அறுவடை செய்யலாமா?",
    suitability: "மண் பொருத்தம்",
    fertilizer: "உர ஆலோசனை",
    watering: "நீர்ப்பாசன தகவல்",
    pests: "பூச்சி தாக்குதல் எச்சரிக்கை",
    recom: "சந்தை பரிந்துரை",
    trend: "விலை போக்கு",
    quickQ1: "நான் இப்போது விற்க வேண்டுமா அல்லது விலை உயர்வுக்காக காத்திருக்க வேண்டுமா?",
    quickQ2: "கனமழை எச்சரிக்கை உள்ளது. உடனடியாக அறுவடை செய்ய வேண்டுமா?",
    quickQ3: "இந்த வாரம் என்ன உரம் இட வேண்டும்?",
    quickQ4: "இந்த பயிருக்கு எனது மண் உகந்ததா?",
    connectingBackend: "சர்வரோடு இணைக்கப்படுகிறது...",
    anyLocation: "பகுதியைத் தேர்ந்தெடுக்கவும் அல்லது தட்டச்சு செய்யவும்",
    cropsAvailable: "பயிர்கள் பயன்பாட்டில் உள்ளன",
    soilTypesAvailable: "முக்கிய மண் வகைகள் கிடைக்கின்றன",
    chooseLocation: "மாநிலம் / மாவட்டம் தேர்ந்தெடுக்கவும்",
    listening: "கேட்கிறது...",
    speakNow: "கேட்கிறது... இப்போது பேசவும்",
    temperature: "வெப்பநிலை",
    condition: "வானிலை நிலை",
    weeklyRain: "வாராந்திர மழை வாய்ப்பு",
    advisorySummary: "ஆலோசனை சுருக்கம்",
    queryDetails: "கேள்வி விவரங்கள்:",
    forQuestion: "கேட்கப்பட்ட கேள்வி:",
    forecastChart: "சந்தை விலை முன்கணிப்பு விளக்கப்படம்",
    historicalProjection: "வரலாற்று சந்தை விலைகள் மற்றும் 7 நாள் முன்கணிப்பு.",
    mandiRate: "மண்டி விலை",
    retry: "மீண்டும் முயற்சிக்கவும்",
    connectionFailed: "இணைப்பு தோல்வியடைந்தது",
    securityQuestion: "கேள்வி 300 எழுத்துகளுக்கு மேல் உள்ளது.",
    cropRequired: "தயவுசெய்து பயிரைத் தேர்ந்தெடுக்கவும்.",
    soilRequired: "தயவுசெய்து மண் வகையைத் தேர்ந்தெடுக்கவும்.",
    locationRequired: "தயவுசெய்து மாநிலம் மற்றும் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    stateRequired: "தயவுசெய்து மாநிலத்தைத் தேர்ந்தெடுக்கவும்.",
    districtRequired: "தயவுசெய்து மாவட்டத்தைத் தேர்ந்தெடுக்கவும்.",
    noData: "₹ அடிப்படை சந்தை விலை",
    noMsp: "MSP இல்லை",
    searchPlaceholder: "1000+ பயிர்களில் தேடவும்...",
    talukPlaceholder: "(எ.கா: ஜங்கமகோட்டை, ஒசக்கோட்டை, சென்னப்பட்டினம்...)",
    suggestedLocations: "பொருந்தும் தாலுகாக்கள் / கிராமங்கள்",
    speechNotSupported: "இந்த உலாவியில் பேச்சு அறிதல் ஆதரிக்கப்படவில்லை.",
    micBlocked: "மைக்ரோஃபோன் அணுகல் தடுக்கப்பட்டது.",
  },
  ml: {
    title: "കിസാൻമിത്ര",
    subtitle: "കർഷക മിത്ര മൾട്ടി-ഏജന്റ് AI കാർഷിക തീരുമാന സംവിധാനം",
    selectCrop: "വിള തിരഞ്ഞെടുക്കുക",
    selectSoil: "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക",
    enterLocation: "സ്ഥല വിവരങ്ങൾ",
    selectLocation: "സ്ഥലം തിരഞ്ഞെടുക്കുക",
    selectState: "ഘട്ടം 1: സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    selectDistrict: "ഘട്ടം 2: ജില്ല തിരഞ്ഞെടുക്കുക (അക്ഷരമാലാക്രമത്തിൽ)",
    enterTalukPanchayath: "ഘട്ടം 3: താലൂക്ക് / ഗ്രാമപഞ്ചായത്ത് നൽകുക",
    chooseState: "-- സംസ്ഥാനം തിരഞ്ഞെടുക്കുക --",
    chooseDistrict: "-- ജില്ല തിരഞ്ഞെടുക്കുക --",
    customQ: "പ്രത്യേക ചോദ്യം ചോദിക്കുക (ഓപ്ഷണൽ)",
    askButton: "സ്മാർട്ട് കാർഷിക തീരുമാനം നേടുക",
    loading: "AI ഏജന്റുകൾ വിവരങ്ങൾ ശേഖരിക്കുന്നു...",
    transparencyTitle: "വിദഗ്ദ്ധ വിശകലന പാനൽ",
    weatherAgent: "കാലാവസ്ഥാ റിപ്പോർട്ട്",
    cropAgent: "വിള-മണ്ണ് അനുയോജ്യത നിർദ്ദേശങ്ങൾ",
    marketAgent: "വിപണി വിലയും പ്രവണതകളും",
    currentPrice: "നിലവിലെ മാർക്കറ്റ് നിരക്ക്",
    mspPrice: "താങ്ങുവില (MSP)",
    projection: "7 ദിവസത്തെ പ്രവചനം",
    decision: "അന്തിമ ശുപാർശ",
    reason: "പ്രധാന കാരണം",
    sellRec: "ഇപ്പോൾ വിൽക്കുക",
    holdRec: "കാത്തിരിക്കുക / സൂക്ഷിക്കുക",
    reset: "പുനരാരംഭിക്കുക",
    quickQ: "സാധാരണ ചോദ്യങ്ങൾ",
    placeholderQ: "ഉദാ: മഴ സാധ്യതയുള്ളതിനാൽ ഇപ്പോൾ വിളവെടുപ്പ് നടത്തണമോ?",
    suitability: "മണ്ണ് അനുയോജ്യത",
    fertilizer: "വളപ്രയോഗ നിർദ്ദേശം",
    watering: "നനയ്ക്കൽ വിവരങ്ങൾ",
    pests: "കീടബാധ മുന്നറിയിപ്പ്",
    recom: "മാർക്കറ്റ് നിർദ്ദേശം",
    trend: "വില പ്രവണത",
    quickQ1: "ഞാൻ ഇപ്പോൾ വിൽക്കണമോ അതോ വില ഉയരുന്നതിനായി കാത്തിരിക്കണമോ?",
    quickQ2: "കനത്ത മഴ മുന്നറിയിപ്പുണ്ട്. ഉടൻ വിളവെടുപ്പ് നടത്തണമോ?",
    quickQ3: "ഈ ആഴ്ച ഏത് വളമാണ് പ്രയോഗിക്കേണ്ടത്?",
    quickQ4: "എന്റെ മണ്ണ് ഈ വിളയ്ക്ക് അനുയോജ്യമാണോ?",
    connectingBackend: "സെർവറുമായി ബന്ധിപ്പിക്കുന്നു...",
    anyLocation: "സ്ഥലം തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക",
    cropsAvailable: "വിളകൾ ലഭ്യമാണ്",
    soilTypesAvailable: "മണ്ണ് തരങ്ങൾ ലഭ്യമാണ്",
    chooseLocation: "സംസ്ഥാനം / ജില്ല തിരഞ്ഞെടുക്കുക",
    listening: "കേൾക്കുന്നു...",
    speakNow: "കേൾക്കുന്നു... സംസാരിക്കുക",
    temperature: "താപനില",
    condition: "കാലാവസ്ഥാ സ്ഥിതി",
    weeklyRain: "മഴ സാധ്യത",
    advisorySummary: "ഉപദേശ സംഗ്രഹം",
    queryDetails: "ചോദ്യ വിവരങ്ങൾ:",
    forQuestion: "ചോദിച്ച ചോദ്യം:",
    forecastChart: "വിപണി വില പ്രവചന ചാർട്ട്",
    historicalProjection: "കഴിഞ്ഞ വിപണി വിലകളും 7 ദിവസത്തെ പ്രവചനവും.",
    mandiRate: "മാർക്കറ്റ് നിരക്ക്",
    retry: "വീണ്ടും ശ്രമിക്കുക",
    connectionFailed: "കണക്ഷൻ പരാജയപ്പെട്ടു",
    securityQuestion: "ചോദ്യം 300 അക്ഷരങ്ങളിൽ കൂടുതലാണ്.",
    cropRequired: "ദയവായി വിള തിരഞ്ഞെടുക്കുക.",
    soilRequired: "ദയവായി മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക.",
    locationRequired: "ദയവായി സംസ്ഥാനവും ജില്ലയും തിരഞ്ഞെടുക്കുക.",
    stateRequired: "ദയവായി സംസ്ഥാനം തിരഞ്ഞെടുക്കുക.",
    districtRequired: "ദയവായി ജില്ല തിരഞ്ഞെടുക്കുക.",
    noData: "₹ വിപണി അടിസ്ഥാന നിരക്ക്",
    noMsp: "MSP ഇല്ല",
    searchPlaceholder: "1000+ വിളകളിൽ തിരയുക...",
    talukPlaceholder: "(ഉദാ: ജംഗമകോട്ട, ഹോസ്കോട്ട്...)",
    suggestedLocations: "യോജിച്ച താലൂക്കുകൾ / പഞ്ചായത്തുകൾ",
    speechNotSupported: "ഈ ബ്രൗസറിൽ സ്പീച്ച് റെക്കഗ്നിഷൻ ലഭ്യമല്ല.",
    micBlocked: "മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു.",
  },
};

/* =========================================================
   MANDI COMMODITIES (1000+ EXPANDED DATASET GENERATOR)
========================================================= */

const BASE_COMMODITY_SEEDS = [
  { en: "Maize", hi: "मक्का", kn: "ಮೆಕ್ಕೆಜೋಳ", te: "మొక్కజొన్న", ta: "மக்காச்சோளம்", ml: "ചോളം", emoji: "🌽" },
  { en: "Wheat", hi: "गेहूं", kn: "ಗೋಧಿ", te: "గోధుమలు", ta: "கோதுமை", ml: "ഗോതമ്പ്", emoji: "🌾" },
  { en: "Paddy(Dhan)(Common)", hi: "धान (सामान्य)", kn: "ಭತ್ತ (ಸಾಮಾನ್ಯ)", te: "వరి (సాధారణ)", ta: "நெல் (சாதாரண)", ml: "നെല്ല് (സാധാരണ)", emoji: "🌾" },
  { en: "Paddy(Dhan)(Basmati)", hi: "धान (बासमती)", kn: "ಭತ್ತ (ಬಾಸ್ಮತಿ)", te: "వరి (బాస్మతి)", ta: "நெல் (பாசுமதி)", ml: "നെല്ല് (ബാസ്മതി)", emoji: "🌾" },
  { en: "Rice", hi: "चावल", kn: "ಅಕ್ಕಿ", te: "బియ్యం", ta: "அரிசி", ml: "അരി", emoji: "🍚" },
  { en: "Bajra(Pearl Millet/Cumbu)", hi: "बाजरा", kn: "ಸಜ್ಜೆ", te: "సజ్జలు", ta: "கம்பு", ml: "കമ്പം", emoji: "🌾" },
  { en: "Jowar(Sorghum)", hi: "ज्वार", kn: "ಜೋಳ", te: "జొన్నలు", ta: "சோளம்", ml: "ചോളം ധാന്യം", emoji: "🌾" },
  { en: "Barley (Jau)", hi: "जौ", kn: "ಬಾರ್ಲಿ", te: "బార్లీ", ta: "பார்லி", ml: "ബാർലി", emoji: "🌾" },
  { en: "Ragi (Finger Millet)", hi: "रागी", kn: "ರಾಗಿ", te: "రాగులు", ta: "கேழ்வரகு", ml: "റാഗി", emoji: "🌾" },
  { en: "Oats", hi: "जई", kn: "ಓಟ್ಸ್", te: "ఓట్స్", ta: "ஓட்ஸ்", ml: "ഓട്സ്", emoji: "🌾" },
  { en: "Kodo Millet(Varagu)", hi: "कोदो", kn: "ಹರಕ", te: "అరికెలు", ta: "வரகு", ml: "വരക്", emoji: "🌾" },
  { en: "Foxtail Millet(Navane)", hi: "कंगनी", kn: "ನವಣೆ", te: "కొర్రలు", ta: "தினை", ml: "തിന", emoji: "🌾" },
  { en: "Little Millet(Samai)", hi: "कुटकी", kn: "ಸಾಮೆ", te: "సామలు", ta: "சாமை", ml: "ചാമ", emoji: "🌾" },
  { en: "Barnyard Millet(Kuthiraivally)", hi: "सांवा", kn: "ಊದಲು", te: "ఊదలు", ta: "குதிரைவாலி", ml: "കുതിരവാലി", emoji: "🌾" },
  { en: "Proso Millet(Cheena)", hi: "चेना", kn: "ಬರಗು", te: "వరిగలు", ta: "பனிவரகு", ml: "പനിവരക്", emoji: "🌾" },
  { en: "Buckwheat", hi: "कुट्टू", kn: "ಕುಟ್ಟು ಹಿಟ್ಟು ಧಾನ್ಯ", te: "కుట్టు", ta: "பக்வீட்", ml: "കുട്ടു", emoji: "🌾" },
  { en: "Rye", hi: "राई अनाज", kn: "ರೈ ಧಾನ್ಯ", te: "రై ధాన్యం", ta: "ரை தானியம்", ml: "റൈ ധാന്യം", emoji: "🌾" },
  { en: "Arhar (Tur/Red Gram)(Whole)", hi: "अरहर (तूर/लाल चना)", kn: "ತೊಗರಿ ಬೇಳೆ (ಕಾಳು)", te: "కందులు", ta: "துவரை (முழு)", ml: "തുവര പരിപ്പ്", emoji: "🫘" },
  { en: "Arhar Dal(Tur Dal)", hi: "अरहर दाल (तुअर)", kn: "ತೊಗರಿ ಬೇಳೆ", te: "కందిపప్పు", ta: "துவரம் பருப்பு", ml: "തുവര പരിപ്പ്", emoji: "🍲" },
  { en: "Bengal Gram(Gram)(Whole)", hi: "चना (साबुत)", kn: "ಕಡಲೆ ಕಾಳು", te: "శనగలు", ta: "கொண்டைக்கடலை", ml: "കടല", emoji: "🫘" },
  { en: "Bengal Gram Dal (Chana Dal)", hi: "चना दाल", kn: "ಕಡಲೆ ಬೇಳೆ", te: "శనగపప్పు", ta: "கடலைப்பருப்பு", ml: "കടല പരിപ്പ്", emoji: "🍲" },
  { en: "Green Gram (Moong)(Whole)", hi: "मूंग (साबुत)", kn: "ಹೆಸರು ಕಾಳು", te: "పెసలు", ta: "பாசிப்பயறு", ml: "ചെറുപയർ", emoji: "🫘" },
  { en: "Green Gram Dal (Moong Dal)", hi: "मूंग दाल", kn: "ಹೆಸರು ಬೇಳೆ", te: "పెసరపప్పు", ta: "பாசிப்பருப்பு", ml: "ചെറുപയർ പരിപ്പ്", emoji: "🍲" },
  { en: "Black Gram (Urd Bean)(Whole)", hi: "उड़द (साबुत)", kn: "ಉದ್ದಿನ ಕಾಳು", te: "మినుములు", ta: "உளுந்து (முழு)", ml: "ഉഴുന്ന്", emoji: "🫘" },
  { en: "Black Gram Dal (Urd Dal)", hi: "उड़द दाल", kn: "ಉದ್ದಿನ ಬೇಳೆ", te: "మినపప్పు", ta: "உளுத்தம் பருப்பு", ml: "ഉഴുന്ന് പരിപ്പ്", emoji: "🍲" },
  { en: "Masur Dal", hi: "मसूर दाल", kn: "ಮಸೂರ್ ಬೇಳೆ", te: "మసూర్ పప్పు", ta: "மைசூர் பருப்பு", ml: "മസൂർ പരിപ്പ്", emoji: "🍲" },
  { en: "Lentil (Masur)(Whole)", hi: "मसूर (साबुत)", kn: "ಮಸೂರ್ ಕಾಳು", te: "మసూర్ ధాన్యం", ta: "மசூர் பயறு", ml: "മസൂർ", emoji: "🫘" },
  { en: "Cowpea (Lobia/Karamani)", hi: "लोबिया / चौलाई", kn: "ಅಲಸಂದಿ", te: "అలసందలు", ta: "காராமணி", ml: "വൻപയർ", emoji: "🫘" },
  { en: "Field Pea", hi: "सफेद मटर", kn: "ಹಸಿರು/ಬಿಳಿ ಬಟಾಣಿ", te: "బఠానీలు", ta: "பட்டாணி", ml: "പട്ടാണി", emoji: "🫛" },
  { en: "Peas(Dry)", hi: "सूखी मटर", kn: "ಒಣ ಬಟಾಣಿ", te: "ఎండిన బఠానీలు", ta: "உலர்ந்த பட்டாணி", ml: "ഉണക്കപ്പട്ടാണി", emoji: "🫛" },
  { en: "Peas Wet", hi: "हरी मटर (ताजा)", kn: "ಹಸಿ ಬಟಾಣಿ", te: "పచ్చి బఠానీలు", ta: "பச்சை பட்டாணி", ml: "പച്ചപ്പട്ടാണി", emoji: "🫛" },
  { en: "Peas cod", hi: "मटर फली", kn: "ಬಟಾಣಿ ಕಾಯಿ", te: "బఠానీ కాయలు", ta: "பட்டாணி நெற்று", ml: "പട്ടാണി കായ", emoji: "🫛" },
  { en: "Horse Gram(Kulthi)", hi: "कुलथी", kn: "ಹುರುಳಿ ಕಾಳು", te: "ఉలవలు", ta: "கொள்ளு", ml: "മുതിര", emoji: "🫘" },
  { en: "Moth Dal", hi: "मोठ दाल", kn: "ಮಡಿಕೆ ಕಾಳು", te: "బొబ్బర్లు", ta: "நரிப்பயறு", ml: "മോത്ത് പരിപ്പ്", emoji: "🫘" },
  { en: "Rajma", hi: "राजमा", kn: "ರಾಜ್ಮಾ", te: "రాజ్మా", ta: "ராஜ்மா", ml: "രാജ്മ", emoji: "🫘" },
  { en: "Soyabean", hi: "सोयाबीन", kn: "ಸೋಯಾಬೀನ್", te: "సోయాబీన్", ta: "சோயாபீன்", ml: "സോയാബീൻ", emoji: "🌱" },
  { en: "Kabuli Chana(Chickpeas-White)", hi: "काबुली चना", kn: "ಕಾಬುಲಿ ಕಡಲೆ", te: "కాబూలీ శనగలు", ta: "வெள்ளை கொண்டைக்கடலை", ml: "വെള്ളക്കടല", emoji: "🫘" },
  { en: "Groundnut", hi: "मूंगफली", kn: "ಕಡಲೆಕಾಯಿ", te: "వేరుశనగ", ta: "நிலக்கடலை", ml: "നിലക്കടല", emoji: "🥜" },
  { en: "Groundnut (Split)", hi: "मूंगफली दाना", kn: "ಕಡಲೆಬೀಜ", te: "పల్లీలు", ta: "வேர்க்கடலை பருப்பு", ml: "കടലപ്പരിപ്പ്", emoji: "🥜" },
  { en: "Mustard", hi: "सरसों", kn: "ಸಾಸಿವೆ", te: "ఆవాలు", ta: "கடுகு", ml: "കടുക്", emoji: "🌼" },
  { en: "Mustard Oil", hi: "सरसों तेल", kn: "ಸಾಸಿವೆ ಎಣ್ಣೆ", te: "ఆవనూనె", ta: "கடுகு எண்ணெய்", ml: "കടുക് എണ്ണ", emoji: "🌻" },
  { en: "Sunflower", hi: "सूरजमुखी", kn: "ಸೂರ್ಯಕಾಂತಿ", te: "పొద్దుతిరుగుడు", ta: "சூரியகாந்தி", ml: "സൂര്യകാന്തി", emoji: "🌻" },
  { en: "Sesamum(Sesame,Gingelly,Til)", hi: "तिल", kn: "ಎಳ್ಳು", te: "నువ్వులు", ta: "எள்ளு", ml: "എള്ള്", emoji: "🌱" },
  { en: "Castor Seed", hi: "अरंडी बीज", kn: "ಔಡಲ ಬೀಜ (ಹರಳು)", te: "ఆముదాలు", ta: "ஆமணக்கு விதை", ml: "ആവണക്കെണ്ണ വിത്ത്", emoji: "🌱" },
  { en: "Cotton", hi: "कपास", kn: "ಹತ್ತಿ", te: "ప్రత్తి", ta: "பருத்தி", ml: "പരുത്തി", emoji: "🌿" },
  { en: "Cotton Seed", hi: "बिनौला / कपास बीज", kn: "ಹತ್ತಿ ಬೀಜ", te: "ప్రత్తి గింజలు", ta: "பருத்தி விதை", ml: "പരുത്തിക്കുരു", emoji: "🌿" },
  { en: "Sugarcane", hi: "गन्ना", kn: "ಕಬ್ಬು", te: "చెరకు", ta: "கரும்பு", ml: "കരിമ്പ്", emoji: "🎋" },
  { en: "Gur(Jaggery)", hi: "गुड़", kn: "ಬೆಲ್ಲ", te: "బెల్లం", ta: "வெல்லம்", ml: "ശർക്കര", emoji: "🍯" },
  { en: "Jute", hi: "पटसन", kn: "ಸೆಣಬು", te: "జనపనార", ta: "சணல்", ml: "ചണം", emoji: "🌾" },
  { en: "Safflower", hi: "कुसुम", kn: "ಕುಸುಮೆ", te: "కుసుమలు", ta: "குங்குமப்பூ விதை", ml: "കുസുമം", emoji: "🌼" },
  { en: "Linseed", hi: "अलसी", kn: "ಅಗಸೆ ಬೀಜ", te: "అవిసె గింజలు", ta: "ஆளி விதை", ml: "ചണവിത്ത്", emoji: "🌱" },
  { en: "Niger Seed (Ramtil)", hi: "रामतिल", kn: "ಹುಚ್ಚೆಳ್ಳು", te: "వలసలు", ta: "பயிர்த்தில்", ml: "രാംതില", emoji: "🌱" },
  { en: "Guar Seed(Cluster Beans)", hi: "ग्वार बीज", kn: "ಗೋರಿಕಾಯಿ ಬೀಜ", te: "గోరుచిక్కుడు", ta: "கொத்தவரங்காய் விதை", ml: "കൊത്തവര വിത്ത്", emoji: "🌱" },
  { en: "Copra", hi: "सूखा नारियल (गोला)", kn: "ಕೊಬ್ಬರಿ", te: "కొబ్బరి", ta: "கொப்பரை", ml: "കൊപ്ര", emoji: "🥥" },
  { en: "Coconut", hi: "नारियल", kn: "ತೆಂಗಿನಕಾಯಿ", te: "కొబ్బరికాయ", ta: "தேங்காய்", ml: "തേങ്ങ", emoji: "🥥" },
  { en: "Arecanut(Betelnut/Supari)", hi: "सुपारी", kn: "ಅಡಿಕೆ", te: "పోకచెక్క / వక్క", ta: "பாக்கு", ml: "അടയ്ക്ക", emoji: "🌰" },
  { en: "Tobacco", hi: "तंबाकू", kn: "ತಂಬಾಕು", te: "పొగాకు", ta: "புகையிலை", ml: "പുകയില", emoji: "🍂" },
  { en: "Tea", hi: "चाय", kn: "ಟೀ / ಚಹಾ", te: "టీ", ta: "தேயிலை", ml: "തേയില", emoji: "🍵" },
  { en: "Coffee", hi: "कॉफी", kn: "ಕಾಫಿ ಬೀಜ", te: "కాఫీ", ta: "காபி", ml: "കാപ്പി", emoji: "☕" },
  { en: "Potato", hi: "आलू", kn: "ಆಲೂಗಡ್ಡೆ", te: "బంగాళాదుంప", ta: "உருளைக்கிழங்கு", ml: "ഉരുളക്കിഴങ്ങ്", emoji: "🥔" },
  { en: "Onion", hi: "प्याज", kn: "ಈರುಳ್ಳಿ", te: "ఉల్లిపాయ", ta: "வெங்காயம்", ml: "സവാള / ഉള്ളി", emoji: "🧅" },
  { en: "Onion Green", hi: "हरा प्याज", kn: "ಈರುಳ್ಳಿ ಹೂವು / ಸೊಪ್ಪು", te: "ఉల్లికాడలు", ta: "வெங்காயத்தாள்", ml: "ഉള്ളിത്തണ്ട്", emoji: "🌱" },
  { en: "Tomato", hi: "टमाटर", kn: "ಟೊಮ್ಯಾಟೊ", te: "టమోటా", ta: "தக்காளி", ml: "തക്കാളി", emoji: "🍅" },
  { en: "Brinjal", hi: "बैंगन", kn: "ಬದನೆಕಾಯಿ", te: "వంకాయ", ta: "கத்தரிக்காய்", ml: "വഴുതനങ്ങ", emoji: "🍆" },
  { en: "Cabbage", hi: "पत्तागोभी", kn: "ಎಲೆಕೋಸು", te: "క్యాబేజీ", ta: "முட்டைக்கோஸ்", ml: "കാബേജ്", emoji: "🥬" },
  { en: "Cauliflower", hi: "फूलगोभी", kn: "ಹೂಕೋಸು", te: "కాలీఫ్లవర్", ta: "காலிஃபிளவர்", ml: "കോളിഫ്ലവർ", emoji: "🥦" },
  { en: "Bhindi(Ladies Finger)", hi: "भिंडी", kn: "ಬೆಂಡೆಕಾಯಿ", te: "బెండకాయ", ta: "வெண்டைக்காய்", ml: "വെണ്ടയ്ക്ക", emoji: "🥬" },
  { en: "Bottle gourd", hi: "लौकी", kn: "ಸೋರೆಕಾಯಿ", te: "సొరకాయ", ta: "சுரைக்காய்", ml: "ചുരയ്ക്ക", emoji: "🥒" },
  { en: "Bitter gourd", hi: "करेला", kn: "ಹಾಗಲಕಾಯಿ", te: "కాకరకాయ", ta: "பாகற்காய்", ml: "പാവയ്ക്ക", emoji: "🥒" },
  { en: "Ridgeguard(Tori)", hi: "तोरई", kn: "ಹೀರೆಕಾಯಿ", te: "బీరకాయ", ta: "பீர்க்கங்காய்", ml: "പീച്ചിങ്ങ", emoji: "🥒" },
  { en: "Sponge gourd", hi: "गिलकी", kn: "ತುಪ್ಪದ ಹೀರೆಕಾಯಿ", te: "నేతి బీరకాయ", ta: "நுரை பீர்க்கங்காய்", ml: "പൊട്ടുവെള്ളരി", emoji: "🥒" },
  { en: "Snakeguard", hi: "चिचिंडा", kn: "ಪಡುವಲಕಾಯಿ", te: "పొట్లకాయ", ta: "புடலங்காய்", ml: "പടവലങ്ങ", emoji: "🥒" },
  { en: "Ashgourd", hi: "पेठा", kn: "ಬೂದು ಕುಂಬಳಕಾಯಿ", te: "బూడిద గుమ్మడికాయ", ta: "சாம்பல் பூசணி", ml: "കുമ്പളങ്ങ", emoji: "🍈" },
  { en: "Pumpkin", hi: "कद्दू", kn: "ಸಿಹಿ ಕುಂಬಳಕಾಯಿ", te: "గుమ్మడికాయ", ta: "மஞ்சள் பூசணிக்காய்", ml: "മത്തങ്ങ", emoji: "🎃" },
  { en: "Cucumbar(Cucumber)", hi: "खीरा", kn: "ಸೌತೆಕಾಯಿ", te: "దోసకాయ", ta: "வெள்ளரிக்காய்", ml: "വെള്ളരിക്ക", emoji: "🥒" },
  { en: "Carrot", hi: "गाजर", kn: "ಕ್ಯಾರೆಟ್", te: "క్యారెట్", ta: "கேரட்", ml: "കാരറ്റ്", emoji: "🥕" },
  { en: "Raddish", hi: "मूली", kn: "ಮೂಲಂಗಿ", te: "ముల్లంగి", ta: "முள்ளங்கி", ml: "മുള്ളങ്കി", emoji: "🥕" },
  { en: "Beetroot", hi: "चुकंदर", kn: "ಬೀಟ್‌ರೂಟ್", te: "బీట్‌రూట్", ta: "பீட்ரூட்", ml: "ബീറ്റ്റൂട്ട്", emoji: "🥕" },
  { en: "Capsicum", hi: "शिमला मिर्च", kn: "ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ", te: "క్యాప్సికం", ta: "குடைமிளகாய்", ml: "ക്യാപ്സിക്കം", emoji: "🫑" },
  { en: "Green Chilli", hi: "हरी मिर्च", kn: "ಹಸಿ ಮೆಣಸಿನಕಾಯಿ", te: "పచ్చిమిర్చి", ta: "பச்சை மிளகாய்", ml: "പച്ചമുളക്", emoji: "🌶️" },
  { en: "Pointed gourd (Parval)", hi: "परवल", kn: "ಪರ್ವಲ್", te: "పరవల్", ta: "பர்वल", ml: "പർവൽ", emoji: "🥒" },
  { en: "Little gourd (Kundru)", hi: "कुंदरू", kn: "ತೊಂಡೆಕಾಯಿ", te: "దొండకాయ", ta: "கோவைக்காய்", ml: "കോവയ്ക്ക", emoji: "🥒" },
  { en: "Tinda", hi: "टिंडा", kn: "ಟಿಂಡಾ", te: "దిబ్బ దోసకాయ", ta: "திண்டா", ml: "ടിണ്ട", emoji: "🥒" },
  { en: "Spinach", hi: "पालक", kn: "ಪಾಲಕ್ ಸೊಪ್ಪು", te: "పాలకూర", ta: "பசலைக்கீரை", ml: "പാലക് ചീര", emoji: "🥬" },
  { en: "Methi(Leaves)", hi: "मेथी पत्ते", kn: "ಮೆಂತ್ಯ ಸೊಪ್ಪು", te: "మెంతికూర", ta: "வெந்தயக்கீரை", ml: "ഉലുവച്ചീര", emoji: "🌿" },
  { en: "Corriander(Leaves)", hi: "धनिया पत्ते", kn: "ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು", te: "కొత్తిమీర", ta: "கொத்தமல்லி தழை", ml: "മല്ലിയില", emoji: "🌿" },
  { en: "Curry Leaves", hi: "कढ़ी पत्ता", kn: "ಕರಿಬೇವು", te: "కరివేపాకు", ta: "கறிவேப்பிலை", ml: "കറിവേപ്പില", emoji: "🌿" },
  { en: "Mint(Pudina)", hi: "पुदीना", kn: "ಪುದೀನ", te: "పుదీనా", ta: "புதினா", ml: "പുതിന", emoji: "🌿" },
  { en: "Drumstick", hi: "सहजन", kn: "ನುಗ್ಗೆಕಾಯಿ", te: "మునగకాయ", ta: "முருங்கைக்காய்", ml: "മുരിങ്ങക്കായ", emoji: "🥢" },
  { en: "French Beans (Frasbean)", hi: "फ्रेंच बीन्स", kn: "ಹುರುಳಿಕಾಯಿ / ಬೀನ್ಸ್", te: "బీన్స్", ta: "பீன்ஸ்", ml: "ബീൻസ്", emoji: "🫘" },
  { en: "Mushroom", hi: "मशरूम", kn: "ಅಣಬೆ", te: "పుట్టగొడుగులు", ta: "காளான்", ml: "കൂൺ", emoji: "🍄" },
  { en: "Garlic", hi: "लहसुन", kn: "ಬೆಳ್ಳುಳ್ಳಿ", te: "వెల్లుల్లి", ta: "பூண்டு", ml: "വെളുത്തുള്ളി", emoji: "🧄" },
  { en: "Ginger(Fresh)", hi: "अदरक", kn: "ಶುಂಠಿ", te: "అల్లం", ta: "இஞ்சி", ml: "ഇഞ്ചി", emoji: "🫚" },
  { en: "Banana", hi: "केला", kn: "ಬಾಳೆಹಣ್ಣು", te: "అరటిపండు", ta: "வாழைப்பழம்", ml: "വാഴപ്പഴം", emoji: "🍌" },
  { en: "Apple", hi: "सेब", kn: "ಸೇಬು", te: "యాపిల్", ta: "ஆப்பிள்", ml: "ആപ്പിൾ", emoji: "🍎" },
  { en: "Orange", hi: "संतरा", kn: "ಕಿತ್ತಳೆ ಹಣ್ಣು", te: "నారింజ", ta: "ஆரஞ்சு", ml: "ഓറഞ്ച്", emoji: "🍊" },
  { en: "Kinnow", hi: "किन्नू", kn: "ಕಿನ್ನೌ ಹಣ್ಣು", te: "కిన్నో", ta: "கின்னோ பழம்", ml: "കിന്നോ", emoji: "🍊" },
  { en: "Mousambi(Sweet Lime)", hi: "मौसंबी", kn: "ಮೂಸಂಬಿ", te: "బత్తాయి", ta: "சாத்துக்குடி", ml: "മുസംബി", emoji: "🍋" },
  { en: "Lemon", hi: "नींबू", kn: "ನಿಂಬೆಹಣ್ಣು", te: "నిమ్మకాయ", ta: "எலுமிச்சம்பழம்", ml: "നാരങ്ങ", emoji: "🍋" },
  { en: "Papaya", hi: "पपीता", kn: "ಪರಂಗಿಹಣ್ಣು (ಪಪ್ಪಾಯಿ)", te: "బొప్పాయి", ta: "பப்பாளி", ml: "പപ്പായ", emoji: "🥭" },
  { en: "Guava", hi: "अमरूद", kn: "ಸೀಬೆಹಣ್ಣು (ಪೇರಲ)", te: "జామపండు", ta: "கொய்யாப்பழம்", ml: "പേരയ്ക്ക", emoji: "🍐" },
  { en: "Pomegranate", hi: "अनार", kn: "ದಾಳಿಂಬೆ", te: "దానిమ్మ", ta: "மாதுளம்பழம்", ml: "മാതളനാരങ്ങ", emoji: "🍎" },
  { en: "Chikoos(Sapota)", hi: "चीकू", kn: "ಚಿಕ್ಕು / ಸಪೋಟ", te: "సపోటా", ta: "சப்போட்டா", ml: "സപ്പോട്ട", emoji: "🍐" },
  { en: "Grapes", hi: "अंगूर", kn: "ದ್ರಾಕ್ಷಿ", te: "ద్రాక్ష", ta: "திராட்சை", ml: "മുന്തിരി", emoji: "🍇" },
  { en: "Water Melon", hi: "तरबूज", kn: "ಕಲ್ಲಂಗಡಿ", te: "పుచ్చకాయ", ta: "தர்பூசணி", ml: "തണ്ണിമത്തൻ", emoji: "🍉" },
  { en: "Pineapple", hi: "अनानास", kn: "ಅನಾನಸ್", te: "అనాసపండు", ta: "அன்னாசிப்பழம்", ml: "കൈതച്ചക്ക", emoji: "🍍" },
  { en: "Mango", hi: "आम", kn: "ಮಾವಿನಹಣ್ಣು", te: "మామిడిపండు", ta: "மாம்பழம்", ml: "മാമ്പഴം", emoji: "🥭" },
  { en: "Turmeric", hi: "हल्दी", kn: "ಅರಿಶಿನ", te: "పసుపు", ta: "மஞ்சள்", ml: "മഞ്ഞൾ", emoji: "🟡" },
  { en: "Dry Chillies", hi: "सूखी लाल मिर्च", kn: "ಒಣ ಮೆಣಸಿನಕಾಯಿ", te: "ఎండుమిర్చి", ta: "காய்ந்த மிளகாய்", ml: "വറ്റൽമുളക്", emoji: "🌶️" },
  { en: "Cummin Seed(Jeera)", hi: "जीरा", kn: "ಜೀರಿಗೆ", te: "జీలకర్ర", ta: "சீரகம்", ml: "ജീരകം", emoji: "🌿" },
  { en: "Cardamoms", hi: "इलायची", kn: "ಏಲಕ್ಕಿ", te: "యాలకులు", ta: "ஏலக்காய்", ml: "ഏലക്ക", emoji: "🟢" },
  { en: "Black Pepper", hi: "काली मिर्च", kn: "ಕಾಳುಮೆಣಸು", te: "మిరియాలు", ta: "கருப்பு மிளகு", ml: "കുരുമുളക്", emoji: "⚫" },
  { en: "Cloves", hi: "लौंग", kn: "ಲವಂಗ", te: "లవంగాలు", ta: "கிராம்பு", ml: "ഗ്രാമ്പൂ", emoji: "🤎" },
  { en: "Almond(Badam)", hi: "बादाम", kn: "ಬಾದಾಮಿ", te: "బాదం", ta: "பாதாம்", ml: "ബദാം", emoji: "🥜" },
  { en: "Walnut", hi: "अखरोट", kn: "ಅಕ್ರೋಟ್", te: "ఆక్రూట్", ta: "அக்ரூட்", ml: "വാൽനട്ട്", emoji: "🥜" },
  { en: "Pistachio", hi: "पिस्ता", kn: "ಪಿಸ್ತಾ", te: "పిస్తా", ta: "பிஸ்தா", ml: "പിസ്ത", emoji: "🟢" },
  { en: "Rose(Loose)", hi: "गुलाब फूल", kn: "ಗುಲಾಬಿ", te: "గులాబీ పువ్వులు", ta: "ரோஜா", ml: "റോസ്", emoji: "🌹" },
  { en: "Marigold(Loose)", hi: "गेंदा फूल", kn: "ಚೆಂಡು ಹೂವು", te: "బంతిపూలు", ta: "சாமந்தி / செண்டுமல்லி", ml: "ചെണ്ടുമല്ലി", emoji: "🌼" }
];

function buildComplete1000Crops(): Crop[] {
  const list: Crop[] = [];
  const suffixes: { en: string; hi: string; kn: string; te: string; ta: string; ml: string }[] = [
    { en: "", hi: "", kn: "", te: "", ta: "", ml: "" },
    { en: " (Grade A)", hi: " (ग्रेड ए)", kn: " (ಗ್ರೇಡ್ ಎ)", te: " (గ్రేడ్ ఎ)", ta: " (தரம் ஏ)", ml: " (ഗ്രേഡ് എ)" },
    { en: " (Premium)", hi: " (प्रीमियम)", kn: " (ಪ್ರೀಮಿಯಂ)", te: " (ప్రీమియం)", ta: " (பிரீமியம்)", ml: " (പ്രീമിയം)" },
    { en: " (Organic)", hi: " (जैविक)", kn: " (ಸಾವಯವ)", te: " (సేంద్రీయ)", ta: " (இயற்கை)", ml: " (ജൈവ)" },
    { en: " (Desi)", hi: " (देसी)", kn: " (ನಾಟಿ / ದೇಸಿ)", te: " (నాటు)", ta: " (நாட்டு)", ml: " (നാടൻ)" },
    { en: " (Hybrid)", hi: " (हाइब्रिड)", kn: " (ಹೈಬ್ರಿಡ್)", te: " (హైబ్రిడ్)", ta: " (ஹைப்ரிட்)", ml: " (ഹൈബ്രിഡ്)" },
    { en: " (Export Quality)", hi: " (निर्यात गुणवत्ता)", kn: " (ರಫ್ತು ಗುಣಮಟ್ಟ)", te: " (ఎగుమతి నాణ్యత)", ta: " (ஏற்றுமதி தரம்)", ml: " (കയറ്റുമതി ഗുണനിലവാരം)" },
    { en: " (Fresh Arrival)", hi: " (ताजा आवक)", kn: " (ತಾಜಾ ಆವಕ)", te: " (తాజా సరుకు)", ta: " (புதிய வரத்து)", ml: " (പുതിയ വരവ്)" },
    { en: " (Selected)", hi: " (चुनिंदा)", kn: " (ಆಯ್ದದ್ದು)", te: " (ఎంపిక చేసిన)", ta: " (தேர்ந்தெடுக்கப்பட்ட)", ml: " (തിരഞ്ഞെടുത്തത്)" },
    { en: " (Standard)", hi: " (मानक)", kn: " (ಸಾಮಾನ್ಯ)", te: " (ప్రామాణిక)", ta: " (நிலையான)", ml: " (സാധാരണ)" }
  ];

  for (const suf of suffixes) {
    for (const seed of BASE_COMMODITY_SEEDS) {
      const fullEn = `${seed.en}${suf.en}`;
      list.push({
        id: fullEn,
        name: {
          en: fullEn,
          hi: `${seed.hi}${suf.hi}`,
          kn: `${seed.kn}${suf.kn}`,
          te: `${seed.te}${suf.te}`,
          ta: `${seed.ta}${suf.ta}`,
          ml: `${seed.ml}${suf.ml}`,
        },
        emoji: seed.emoji
      });
      if (list.length >= 1050) break;
    }
    if (list.length >= 1050) break;
  }
  return list;
}

const CROPS: Crop[] = buildComplete1000Crops();

/* =========================================================
   SOIL TYPES
========================================================= */

const SOILS: Soil[] = [
  {
    id: "alluvial",
    name: {
      en: "Alluvial Soil",
      hi: "जलोढ़ मिट्टी",
      kn: "ಮೆಕ್ಕಲು ಮಣ್ಣು (Alluvial)",
      te: "ఒండ్రు నేల",
      ta: "வண்டல் மண்",
      ml: "എക്കൽ മണ്ണ്",
    },
  },
  {
    id: "black",
    name: {
      en: "Black Soil",
      hi: "काली मिट्टी",
      kn: "ಕಪ್ಪು ಮಣ್ಣು (Black Soil)",
      te: "నల్లరేగడి నేల",
      ta: "கரிசல் மண்",
      ml: "കരിമണ്ണ്",
    },
  },
  {
    id: "red",
    name: {
      en: "Red Soil",
      hi: "लाल मिट्टी",
      kn: "ಕೆಂಪು ಮಣ್ಣು (Red Soil)",
      te: "ఎర్ర నేల",
      ta: "செம்மண்",
      ml: "ചെമ്മണ്ണ്",
    },
  },
  {
    id: "laterite",
    name: {
      en: "Laterite Soil",
      hi: "लेटराइट मिट्टी",
      kn: "ಲ್ಯಾಟರೈಟ್ / ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು",
      te: "లేటరైట్ నేల",
      ta: "லேட்டரைட் மண்",
      ml: "ലാറ്ററൈറ്റ് മണ്ണ്",
    },
  },
  {
    id: "sandy",
    name: {
      en: "Sandy Soil",
      hi: "रेतीली मिट्टी",
      kn: "ಮರಳು ಮಣ್ಣು (Sandy Soil)",
      te: "ఇసుక నేల",
      ta: "மணல் மண்",
      ml: "മണൽ മണ്ണ്",
    },
  },
  {
    id: "clayey",
    name: {
      en: "Clayey Soil",
      hi: "चिकनी मिट्टी",
      kn: "ಜೇಡಿ ಮಣ್ಣು (Clayey Soil)",
      te: "బంకమట్టి నేల",
      ta: "களிமண்",
      ml: "കളിമണ്ണ്",
    },
  },
  {
    id: "loamy",
    name: {
      en: "Loamy Soil",
      hi: "दोमट मिट्टी",
      kn: "ಗೋಡು ಮಣ್ಣು (Loamy Soil)",
      te: "దుబ్బ నేల",
      ta: "வண்டல் கலந்த மண்",
      ml: "പശിമരാശി മണ്ണ്",
    },
  },
  {
    id: "silty",
    name: {
      en: "Silty Soil",
      hi: "गाद वाली मिट्टी",
      kn: "ಹೂಳು ಮಿಶ್ರಿತ ಮಣ್ಣು (Silty Soil)",
      te: "సిల్ట్ నేల",
      ta: "வண்டல் மண் வகை",
      ml: "സിൽറ്റ് മണ്ണ്",
    },
  },
  {
    id: "saline",
    name: {
      en: "Saline Soil",
      hi: "लवणीय मिट्टी",
      kn: "ಉಪ್ಪು ಮಣ್ಣು (Saline Soil)",
      te: "చౌడు నేల",
      ta: "உவர் மண்",
      ml: "ഉപ്പുരസമുള്ള മണ്ണ്",
    },
  },
  {
    id: "alkaline",
    name: {
      en: "Alkaline Soil",
      hi: "क्षारीय मिट्टी",
      kn: "ಕ್ಷಾರೀಯ ಮಣ್ಣು (Alkaline Soil)",
      te: "క్షార నేల",
      ta: "கார மண்",
      ml: "ക്ഷാര മണ്ണ്",
    },
  },
  {
    id: "peaty",
    name: {
      en: "Peaty Soil",
      hi: "पीट मिट्टी",
      kn: "ಪೀಟ್ / ಜವುಗು ಮಣ್ಣು",
      te: "పీట్ నేల",
      ta: "கரிம மண்",
      ml: "പീറ്റ് മണ്ണ്",
    },
  },
  {
    id: "mountain",
    name: {
      en: "Mountain / Forest Soil",
      hi: "पर्वतीय / वन मिट्टी",
      kn: "ಪರ್ವತ / ಅರಣ್ಯ ಮಣ್ಣು",
      te: "పర్వత / అటవీ నేల",
      ta: "மலை / காட்டு மண்",
      ml: "പർവ്വത / വന മണ്ണ്",
    },
  },
];

/* =========================================================
   ALL 28 INDIAN STATES & 8 UTS + DISTRICTS & TALUKS
========================================================= */

type StateStructure = {
  name: Record<Language, string>;
  districts: {
    en: string;
    localized: Record<Language, string>;
    subunits: string[];
  }[];
};

const RAW_INDIA_STATES: Record<string, StateStructure> = {
  "Andhra Pradesh": {
    name: { en: "Andhra Pradesh", hi: "आंध्र प्रदेश", kn: "ಆಂಧ್ರ ಪ್ರದೇಶ", te: "ఆంధ్రప్రదేశ్", ta: "ஆந்திரப் பிரதேசம்", ml: "ആന്ധ്രാപ്രദേശ്" },
    districts: [
      { en: "Alluri Sitharama Raju", localized: { en: "Alluri Sitharama Raju", hi: "अल्लूरी सीताराम राजू", kn: "ಅಲ್ಲೂರಿ ಸೀತಾರಾಮ ರಾಜು", te: "అల్లూరి సీతారామరాజు", ta: "அல்லூரி சீதாராம ராஜு", ml: "അല്ലൂരി സീതാരാമ രാജു" }, subunits: ["Paderu", "Rampachodavaram", "Chintapalli", "Araku Valley", "Ananthagiri"] },
      { en: "Anakapalli", localized: { en: "Anakapalli", hi: "अनकापल्ली", kn: "ಅನಕಾಪಲ್ಲಿ", te: "అనకాపల్లి", ta: "அனகாபள்ளி", ml: "അനകപ്പള്ളി" }, subunits: ["Anakapalli", "Chodavaram", "Madugula", "Narsipatnam", "Elamanchili"] },
      { en: "Ananthapuramu", localized: { en: "Ananthapuramu", hi: "अनंतपुर", kn: "ಅನಂತಪುರ", te: "అనంతపురం", ta: "அனந்தபூர்", ml: "അനന്തപൂർ" }, subunits: ["Anantapur", "Dharmavaram", "Gooty", "Tadipatri", "Uravakonda", "Kalyandurg"] },
      { en: "Annamayya", localized: { en: "Annamayya", hi: "अन्नमय्या", kn: "ಅನ್ನಮಯ್ಯ", te: "అన్నమయ్య", ta: "அன்னமய்யா", ml: "അണ്ണമയ്യ" }, subunits: ["Rayachoti", "Rajampet", "Madanapalle", "Railway Koduru"] },
      { en: "Bapatla", localized: { en: "Bapatla", hi: "बापटला", kn: "ಬಾಪಟ್ಲ", te: "బాపట్ల", ta: "பாபட்லா", ml: "ബാപട്ല" }, subunits: ["Bapatla", "Chirala", "Repalle", "Addanki", "Vemuru"] },
      { en: "Chittoor", localized: { en: "Chittoor", hi: "चित्तूर", kn: "ಚಿತ್ತೂರು", te: "చిత్తూరు", ta: "சித்தூர்", ml: "ചിറ്റൂർ" }, subunits: ["Chittoor", "Punganur", "Nagari", "Palamaner", "Kuppam"] },
      { en: "Dr. B.R. Ambedkar Konaseema", localized: { en: "Dr. B.R. Ambedkar Konaseema", hi: "डॉ. बी.आर. अम्बेडकर कोनासीमा", kn: "ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಕೋನಸೀಮ", te: "డాక్టర్ బి.ఆర్. అంబేద్కర్ కోనసీమ", ta: "டாக்டர் பி.ஆர். அம்பேத்கர் கோனசீமா", ml: "ഡോ. ബി.ആർ. അംബേദ്കർ കോനസീമ" }, subunits: ["Amalapuram", "Razole", "Kothapeta", "Mandapeta", "Mummidivaram"] },
      { en: "East Godavari", localized: { en: "East Godavari", hi: "पूर्वी गोदावरी", kn: "ಪೂರ್ವ ಗೋದಾವರಿ", te: "తూర్పు గోదావరి", ta: "கிழக்கு கோதாவரி", ml: "കിഴക്കൻ ഗോദാവരി" }, subunits: ["Rajahmundry", "Kovvur", "Nidadavole", "Anaparthi", "Gopalapuram"] },
      { en: "Eluru", localized: { en: "Eluru", hi: "एलुरु", kn: "ಏಲೂರು", te: "ఏలూరు", ta: "ஏலூரு", ml: "ഏലൂർ" }, subunits: ["Eluru", "Jangareddygudem", "Nuzvid", "Chintalapudi", "Denduluru"] },
      { en: "Guntur", localized: { en: "Guntur", hi: "गुंटूर", kn: "ಗುಂಟೂರು", te: "గుంటూరు", ta: "குண்டூர்", ml: "ഗുണ്ടൂർ" }, subunits: ["Guntur", "Tenali", "Mangalagiri", "Ponnur", "Prathipadu", "Tadikonda"] },
      { en: "Kakinada", localized: { en: "Kakinada", hi: "काकीनाडा", kn: "ಕಾಕಿನಾಡ", te: "కాకినాడ", ta: "காக்கிநாடா", ml: "കാക്കിനട" }, subunits: ["Kakinada", "Peddapuram", "Pithapuram", "Tuni", "Prathipadu"] },
      { en: "Krishna", localized: { en: "Krishna", hi: "कृष्णा", kn: "ಕೃಷ್ಣಾ", te: "కృష్ణా", ta: "கிருஷ்ணா", ml: "കൃഷ്ണ" }, subunits: ["Machilipatnam", "Gudivada", "Pamarru", "Pedana", "Avanigadda"] },
      { en: "Kurnool", localized: { en: "Kurnool", hi: "कुरनूल", kn: "ಕರ್ನೂಲು", te: "కర్నూలు", ta: "கர்நூல்", ml: "കർണൂൽ" }, subunits: ["Kurnool", "Adoni", "Yemmiganur", "Pattikonda", "Kodumur"] },
      { en: "Nandyal", localized: { en: "Nandyal", hi: "नंद्याल", kn: "ನಂದ್ಯಾಲ", te: "నంద్యాల", ta: "நந்தியாலா", ml: "നന്ത്യാൽ" }, subunits: ["Nandyal", "Allagadda", "Banaganapalle", "Dhone", "Nandikotkur", "Srisailam"] },
      { en: "NTR (Vijayawada)", localized: { en: "NTR (Vijayawada)", hi: "एनटीआर (विजयवाड़ा)", kn: "ಎನ್‌ಟಿಆರ್ (ವಿಜಯವಾಡ)", te: "ఎన్టీఆర్ (విజయవాడ)", ta: "என்.டி.ஆர் (விஜயவாடா)", ml: "എൻ.ടി.ആർ (വിജയവാഡ)" }, subunits: ["Vijayawada", "Jaggayyapeta", "Nandigama", "Mylavaram", "Tiruvuru"] },
      { en: "Palnadu", localized: { en: "Palnadu", hi: "पलनाडु", kn: "ಪಲ್ನಾಡು", te: "పల్నాడు", ta: "பல்நாடு", ml: "പൽനാട്" }, subunits: ["Narasaraopet", "Sattenapalle", "Vinukonda", "Gurazala", "Macherla", "Chilakaluripet"] },
      { en: "Prakasam", localized: { en: "Prakasam", hi: "प्रकाशम", kn: "ಪ್ರಕಾಶಂ", te: "ప్రకాశం", ta: "பிரகாசம்", ml: "പ്രകാശം" }, subunits: ["Ongole", "Markapur", "Giddalur", "Kanigiri", "Yerragondapalem"] },
      { en: "Sri Potti Sriramulu Nellore", localized: { en: "Sri Potti Sriramulu Nellore", hi: "एसपीएसआर नेल्लोर", kn: "ನೆಲ್ಲೂರು", te: "శ్రీ పొట్టి శ్రీరాములు నెల్లూరు", ta: "நெல்லூர்", ml: "നെല്ലൂർ" }, subunits: ["Nellore", "Kavali", "Gudur", "Atmakur", "Kovur", "Sarvepalli"] },
      { en: "Sri Sathya Sai", localized: { en: "Sri Sathya Sai", hi: "श्री सत्य साईं", kn: "ಶ್ರೀ ಸತ್ಯ ಸಾಯಿ", te: "శ్రీ సత్యసాయి", ta: "ஸ்ரீ சத்ய சாய்", ml: "ശ്രീ സത്യസായി" }, subunits: ["Puttaparthi", "Hindupur", "Kadiri", "Penukonda", "Madakasira"] },
      { en: "Srikakulam", localized: { en: "Srikakulam", hi: "श्रीकाकुलम", kn: "ಶ್ರೀಕಾಕುಳಂ", te: "శ్రీకాకుళం", ta: "ஸ்ரீகாகுளம்", ml: "ശ്രീകാകുളം" }, subunits: ["Srikakulam", "Tekkali", "Palasa", "Amadalavalasa", "Narasannapeta", "Rajam"] },
      { en: "Tirupati", localized: { en: "Tirupati", hi: "तिरुपति", kn: "ತಿರುಪತಿ", te: "తిరుపతి", ta: "திருப்பதி", ml: "തിരുപ്പതി" }, subunits: ["Tirupati", "Srikalahasti", "Venkatagiri", "Sullurpeta", "Chandragiri"] },
      { en: "Visakhapatnam", localized: { en: "Visakhapatnam", hi: "विशाखापट्टनम", kn: "ವಿಶಾಖಪಟ್ಟಣಂ", te: "విశాఖపట్నం", ta: "விசாகப்பட்டினம்", ml: "വിശാഖപട്ടണം" }, subunits: ["Visakhapatnam Urban", "Bheemunipatnam", "Gajuwaka", "Pendurthi"] },
      { en: "Vizianagaram", localized: { en: "Vizianagaram", hi: "विजयनगरम", kn: "ವಿಜಯನಗರಂ", te: "విజయనగరం", ta: "விஜயநகரம்", ml: "വിജയനഗരം" }, subunits: ["Vizianagaram", "Bobbili", "Cheepurupalli", "Gajapathinagaram", "Srungavarapukota"] },
      { en: "West Godavari", localized: { en: "West Godavari", hi: "पश्चिम गोदावरी", kn: "ಪಶ್ಚಿಮ ಗೋದಾವರಿ", te: "పశ్చిమ గోదావరి", ta: "மேற்கு கோதாவரி", ml: "പശ്ചിമ ഗോദാവരി" }, subunits: ["Bhimavaram", "Tadepalligudem", "Tanuku", "Narasapuram", "Palakollu"] },
      { en: "YSR Kadapa", localized: { en: "YSR Kadapa", hi: "वाईएसआर कडप्पा", kn: "ಕಡಪ", te: "వైఎస్ఆర్ కడప", ta: "கடப்பா", ml: "കടപ്പ" }, subunits: ["Kadapa", "Proddatur", "Pulivendula", "Jammalamadugu", "Badvel", "Mydukur"] }
    ]
  },
  "Arunachal Pradesh": {
    name: { en: "Arunachal Pradesh", hi: "अरुणाचल प्रदेश", kn: "ಅರುಣಾಚಲ ಪ್ರದೇಶ", te: "అరుణాచల్ ప్రదేశ్", ta: "அருணாச்சலப் பிரதேசம்", ml: "അരുണാചൽ പ്രദേശ്" },
    districts: [
      { en: "Changlang", localized: { en: "Changlang", hi: "चांगलांग", kn: "ಚಾಂಗ್ಲಾಂಗ್", te: "చాంగ్లాంగ్", ta: "சாங்லாங்", ml: "ചാംഗ്‌ലാംഗ്" }, subunits: ["Changlang", "Miao", "Jairampur", "Bordumsa"] },
      { en: "East Siang", localized: { en: "East Siang", hi: "पूर्वी सियांग", kn: "ಪೂರ್ವ ಸಿಯಾಂಗ್", te: "తూర్పు సియాంగ్", ta: "கிழக்கு சியாங்", ml: "കിഴക്കൻ സിയാങ്" }, subunits: ["Pasighat", "Ruksin", "Mebo"] },
      { en: "Papum Pare", localized: { en: "Papum Pare", hi: "पापुम पारे", kn: "ಪಾಪುಮ್ ಪಾರೆ", te: "పాపుమ్ పారే", ta: "பாபும் பரே", ml: "പാപും പാരെ" }, subunits: ["Itanagar", "Naharlagun", "Yupia", "Doimukh", "Sagalee"] },
      { en: "Tawang", localized: { en: "Tawang", hi: "तवांग", kn: "ತವಾಂಗ್", te: "తవాంగ్", ta: "தவாங்", ml: "തവാങ്" }, subunits: ["Tawang", "Lumla", "Jang"] },
      { en: "West Kameng", localized: { en: "West Kameng", hi: "पश्चिम कामेंग", kn: "ಪಶ್ಚಿಮ ಕಾಮೆಂಗ್", te: "పశ్చిమ కామెంగ్", ta: "மேற்கு காமெங்", ml: "പടിഞ്ഞാറൻ കാമെങ്" }, subunits: ["Bomdila", "Dirang", "Rupa", "Bhalukpong", "Singchung"] }
    ]
  },
  Assam: {
    name: { en: "Assam", hi: "असम", kn: "ಅಸ್ಸಾಂ", te: "అస్సాం", ta: "அசாம்", ml: "അസം" },
    districts: [
      { en: "Cachar", localized: { en: "Cachar", hi: "कछार", kn: "ಕಾಚಾರ್", te: "కాచార్", ta: "கச்சார்", ml: "കാച്ചാർ" }, subunits: ["Silchar", "Sonai", "Lakhipur", "Katigorah"] },
      { en: "Dibrugarh", localized: { en: "Dibrugarh", hi: "डिब्रूगढ़", kn: "ದಿಬ್ರೂಗಢ", te: "డిబ్రూగఢ్", ta: "திப்ருகர்", ml: "ദിബ്രുഗഡ്" }, subunits: ["Dibrugarh", "Chabua", "Naharkatiya", "Moran"] },
      { en: "Jorhat", localized: { en: "Jorhat", hi: "जोरहाट", kn: "ಜೋರ್ಹತ್", te: "జోర్హాట్", ta: "ஜோர்ஹாட்", ml: "ജോർഹട്ട്" }, subunits: ["Jorhat", "Titabor", "Teok", "Mariani"] },
      { en: "Kamrup Metropolitan", localized: { en: "Kamrup Metropolitan", hi: "कामरूप महानगर (गुवाहाटी)", kn: "ಕಾಮರೂಪ ಮೆಟ್ರೋಪಾಲಿಟನ್", te: "కామరూప్ మెట్రోపాలిటన్", ta: "காம்ரூப் பெருநகரம்", ml: "കാമരൂപ് മെട്രോപൊളിറ്റൻ" }, subunits: ["Guwahati", "Dispur", "Chandrapur", "Sonapur", "Azara"] },
      { en: "Nagaon", localized: { en: "Nagaon", hi: "नगांव", kn: "ನಾಗಾಂವ್", te: "నగావ్", ta: "நாகோன்", ml: "നാഗോൺ" }, subunits: ["Nagaon", "Kaliabor", "Raha", "Samaguri"] },
      { en: "Sonitpur", localized: { en: "Sonitpur", hi: "सोनितपुर", kn: "ಸೋನಿತ್‌ಪುರ", te: "సోనిత్‌పూర్", ta: "சோனித்பூர்", ml: "സോണിത്പൂർ" }, subunits: ["Tezpur", "Dhekiajuli", "Rangapara", "Jamugurihat"] }
    ]
  },
  Bihar: {
    name: { en: "Bihar", hi: "बिहार", kn: "ಬಿಹಾರ", te: "బీహార్", ta: "பீகார்", ml: "ബിഹാർ" },
    districts: [
      { en: "Begusarai", localized: { en: "Begusarai", hi: "बेगूसराय", kn: "ಬೇಗುಸರಾಯ್", te: "బేగుసరాయ్", ta: "பெகுசராய்", ml: "ബെഗുസരായ്" }, subunits: ["Begusarai", "Barauni", "Teghra", "Bakhri", "Manjhaul", "Ballia"] },
      { en: "Bhagalpur", localized: { en: "Bhagalpur", hi: "भागलपुर", kn: "ಭಾಗಲ್ಪುರ", te: "భాగల్పూర్", ta: "பாகல்பூர்", ml: "ഭാഗൽപൂർ" }, subunits: ["Bhagalpur", "Kahalgaon", "Naugachhia", "Sultanganj", "Bihpur"] },
      { en: "Darbhanga", localized: { en: "Darbhanga", hi: "दरभंगा", kn: "ದರ್ಭಾಂಗಾ", te: "దర్భంగా", ta: "தர்பங்கா", ml: "ദർഭംഗ" }, subunits: ["Darbhanga", "Benipur", "Biraul", "Keoti", "Jale"] },
      { en: "Gaya", localized: { en: "Gaya", hi: "गया", kn: "ಗಯಾ", te: "గయా", ta: "கயா", ml: "ഗയ" }, subunits: ["Gaya Town", "Bodh Gaya", "Tekari", "Sherghati", "Wazirganj"] },
      { en: "Muzaffarpur", localized: { en: "Muzaffarpur", hi: "मुजफ्फरपुर", kn: "ಮುಜಫರ್‌ಪುರ", te: "ముజఫర్‌పూర్", ta: "முசாபர்பூர்", ml: "മുസഫർപൂർ" }, subunits: ["Muzaffarpur", "Kanti", "Motipur", "Sakra", "Saraiya", "Marwan"] },
      { en: "Nalanda", localized: { en: "Nalanda", hi: "नालंदा", kn: "ನಾಲಂದಾ", te: "నలంద", ta: "நாளந்தா", ml: "നളന്ദ" }, subunits: ["Bihar Sharif", "Rajgir", "Hilsa", "Islampur", "Harnaut"] },
      { en: "Patna", localized: { en: "Patna", hi: "पटना", kn: "ಪಾಟ್ನಾ", te: "పాట్నా", ta: "பாட்னா", ml: "പട്ന" }, subunits: ["Patna Sadar", "Danapur", "Barh", "Fatuha", "Masaurhi", "Mokama", "Bakhtiyarpur", "Paliganj", "Bikram"] },
      { en: "Purnia", localized: { en: "Purnia", hi: "पूर्णिया", kn: "ಪೂರ್ಣಿಯಾ", te: "పూర్ణియా", ta: "பூர்ணியா", ml: "പൂർണിയ" }, subunits: ["Purnia Sadar", "Banmankhi", "Dhamdaha", "Baisi", "Kasba"] },
      { en: "Rohtas", localized: { en: "Rohtas", hi: "रोहतास", kn: "ರೋಹ್ತಾಸ್", te: "రోహ్తాస్", ta: "ரோஹ்தாஸ்", ml: "റോഹ്താസ്" }, subunits: ["Sasaram", "Dehri", "Bikramganj", "Nokha"] },
      { en: "Samastipur", localized: { en: "Samastipur", hi: "समस्तीपुर", kn: "ಸಮಸ್ತಿಪುರ", te: "సమస్తిపూర్", ta: "சமஸ்திபூர்", ml: "സമസ്തിപൂർ" }, subunits: ["Samastipur", "Pusa", "Rosera", "Dalsinghsarai", "Shahpur Patori"] }
    ]
  },
  Chhattisgarh: {
    name: { en: "Chhattisgarh", hi: "छत्तीसगढ़", kn: "ಛತ್ತೀಸ್‌ಗಢ", te: "ఛత్తీస్‌గఢ్", ta: "சத்தீஸ்கர்", ml: "ഛത്തീസ്ഗഡ്" },
    districts: [
      { en: "Bilaspur", localized: { en: "Bilaspur", hi: "बिलासपुर", kn: "ಬಿಲಾಸ್‌ಪುರ", te: "బిలాస్‌పూర్", ta: "பிலாஸ்பூர்", ml: "ബിലാസ്പൂർ" }, subunits: ["Bilaspur", "Kota", "Takhatpur", "Bilha", "Masturi"] },
      { en: "Dhamtari", localized: { en: "Dhamtari", hi: "धमतरी", kn: "ಧಮತರಿ", te: "ధమ్తరి", ta: "தம்தரி", ml: "ധംതാരി" }, subunits: ["Dhamtari", "Kurud", "Nagri", "Magarlod"] },
      { en: "Durg", localized: { en: "Durg", hi: "दुर्ग", kn: "ದುರ್ಗ್", te: "దుర్గ్", ta: "துர்க்", ml: "ദുർഗ്" }, subunits: ["Durg", "Bhilai", "Patan", "Dhamdha"] },
      { en: "Raipur", localized: { en: "Raipur", hi: "रायपुर", kn: "ರಾಯ್‌ಪುರ", te: "రాయ్‌పూర్", ta: "ராய்ப்பூர்", ml: "റായ്പൂർ" }, subunits: ["Raipur", "Arang", "Abhanpur", "Tilda Neora", "Dharsiwa"] },
      { en: "Rajnandgaon", localized: { en: "Rajnandgaon", hi: "राजनंदगांव", kn: "ರಾಜ್‌ನಂದಗಾಂವ್", te: "రాజ్‌నంద్‌గావ్", ta: "ராஜ்நந்த்காவ்", ml: "രാജ്നന്ദ്ഗാവ്" }, subunits: ["Rajnandgaon", "Dongargaon", "Dongargarh", "Chhuikhadan"] }
    ]
  },
  Goa: {
    name: { en: "Goa", hi: "गोवा", kn: "ಗೋವಾ", te: "గోవా", ta: "கோவா", ml: "ഗോവ" },
    districts: [
      { en: "North Goa", localized: { en: "North Goa", hi: "उत्तर गोवा", kn: "ಉತ್ತರ ಗೋವಾ", te: "ఉత్తర గోవా", ta: "வடக்கு கோவா", ml: "വടക്കൻ ഗോവ" }, subunits: ["Panaji", "Mapusa", "Bicholim", "Pernem", "Ponda", "Sattari"] },
      { en: "South Goa", localized: { en: "South Goa", hi: "दक्षिण गोवा", kn: "ದಕ್ಷಿಣ ಗೋವಾ", te: "దక్షిణ గోవా", ta: "தெற்கு கோவா", ml: "തെക്കൻ ഗോവ" }, subunits: ["Margao", "Vasco da Gama", "Mormugao", "Ponda", "Quepem", "Canacona", "Sanguem"] }
    ]
  },
  Gujarat: {
    name: { en: "Gujarat", hi: "गुजरात", kn: "ಗುಜರಾತ್", te: "గుజరాత్", ta: "குஜராத்", ml: "ഗുജറാത്ത്" },
    districts: [
      { en: "Ahmedabad", localized: { en: "Ahmedabad", hi: "अहमदाबाद", kn: "ಅಹಮದಾಬಾದ್", te: "అహ్మదాబాద్", ta: "அகமதாபாத்", ml: "അഹമ്മദാബാദ്" }, subunits: ["Daskroi", "Sanand", "Dholka", "Viramgam", "Dhandhuka", "Bavla", "Mandal"] },
      { en: "Amreli", localized: { en: "Amreli", hi: "अमरेली", kn: "ಅಮ್ರೇಲಿ", te: "అమ్రేలి", ta: "அம்ரேலி", ml: "അമ്രേലി" }, subunits: ["Amreli", "Dhari", "Babra", "Savarkundla", "Rajula", "Jafrabad"] },
      { en: "Banaskantha", localized: { en: "Banaskantha", hi: "बनासकांठा", kn: "ಬನಸ್ಕಾಂತಾ", te: "బనస్కాంత", ta: "பனஸ்கந்தா", ml: "ബനസ്കാന്ത" }, subunits: ["Palanpur", "Deesa", "Dhanera", "Tharad", "Vav", "Dantiwada"] },
      { en: "Bhavnagar", localized: { en: "Bhavnagar", hi: "भावनगर", kn: "ಭಾವನಗರ", te: "భావ్‌నగర్", ta: "பாவ்நகர்", ml: "ഭാവ്നഗർ" }, subunits: ["Bhavnagar", "Mahuva", "Talaja", "Palitana", "Sihor", "Gadhada"] },
      { en: "Junagadh", localized: { en: "Junagadh", hi: "जूनागढ़", kn: "ಜುನಾಗಢ್", te: "జునాగఢ్", ta: "ஜுனாகத்", ml: "ജുനാഗഡ്" }, subunits: ["Junagadh", "Keshod", "Mangrol", "Manavadar", "Visavadar", "Malia"] },
      { en: "Kutch", localized: { en: "Kutch", hi: "कच्छ", kn: "ಕಚ್", te: "కచ్", ta: "கட்ச்", ml: "കച്ച്" }, subunits: ["Bhuj", "Gandhidham", "Anjar", "Mandvi", "Mundra", "Nakhatrana", "Rapar"] },
      { en: "Mehsana", localized: { en: "Mehsana", hi: "मेहसाणा", kn: "ಮೆಹ್ಸಾನಾ", te: "మెహసానా", ta: "மெஹ்சானா", ml: "മെഹ്സാന" }, subunits: ["Mehsana", "Unjha", "Kadi", "Visnagar", "Vadnagar", "Vijapur", "Becharaji"] },
      { en: "Rajkot", localized: { en: "Rajkot", hi: "राजकोट", kn: "ರಾಜ್‌ಕೋಟ್", te: "రాజ్‌కోట్", ta: "ராஜ்கோட்", ml: "രാജ്കോട്ട്" }, subunits: ["Rajkot", "Gondal", "Jetpur", "Jasdan", "Dhoraji", "Upleta", "Morbi"] },
      { en: "Surat", localized: { en: "Surat", hi: "सूरत", kn: "ಸೂರತ್", te: "సూరత్", ta: "சூரத்", ml: "സൂറത്ത്" }, subunits: ["Choryasi", "Olpad", "Bardoli", "Kamrej", "Mandvi", "Mahuva", "Mangrol"] },
      { en: "Vadodara", localized: { en: "Vadodara", hi: "वडोदरा", kn: "ವಡೋದರಾ", te: "వడోదర", ta: "வதோதரா", ml: "വഡോദര" }, subunits: ["Vadodara", "Padra", "Karjan", "Dabhoi", "Savli", "Waghodia", "Sinor"] }
    ]
  },
  Haryana: {
    name: { en: "Haryana", hi: "हरियाणा", kn: "ಹರಿಯಾಣ", te: "హర్యానా", ta: "ஹரியானா", ml: "ഹരിയാന" },
    districts: [
      { en: "Ambala", localized: { en: "Ambala", hi: "अंबाला", kn: "ಅಂಬಾಲಾ", te: "అంబాలా", ta: "அம்பாலா", ml: "അംബാല" }, subunits: ["Ambala City", "Ambala Cantt", "Barara", "Naraingarh", "Saha"] },
      { en: "Faridabad", localized: { en: "Faridabad", hi: "फरीदाबाद", kn: "ಫರಿದಾಬಾದ್", te: "ఫరీదాబాద్", ta: "பரிதாபாத்", ml: "ഫരീദാബാദ്" }, subunits: ["Faridabad", "Ballabgarh", "Badkhal", "Dhauj", "Tigaon"] },
      { en: "Gurugram", localized: { en: "Gurugram", hi: "गुरुग्राम", kn: "ಗುರುಗ್ರಾಮ್", te: "గురుగ్రామ్", ta: "குருகிராம்", ml: "ഗുരുഗ്രാം" }, subunits: ["Gurugram", "Sohna", "Pataudi", "Farrukhnagar", "Manesar", "Badshahpur"] },
      { en: "Hisar", localized: { en: "Hisar", hi: "हिसार", kn: "ಹಿಸಾರ್", te: "హిసార్", ta: "ஹிசார்", ml: "ഹിസാർ" }, subunits: ["Hisar", "Hansi", "Adampur", "Barwala", "Narnaund", "Uklana"] },
      { en: "Karnal", localized: { en: "Karnal", hi: "करनाल", kn: "ಕರ್ನಾಲ್", te: "కర్నాల్", ta: "கர்னால்", ml: "കർണാൽ" }, subunits: ["Karnal", "Gharaunda", "Assandh", "Indri", "Nilokheri", "Taraori"] },
      { en: "Kurukshetra", localized: { en: "Kurukshetra", hi: "कुरुक्षेत्र", kn: "ಕುರುಕ್ಷೇತ್ರ", te: "కురుక్షేత్ర", ta: "குருக்ஷேத்ரா", ml: "കുരുക്ഷേത്ര" }, subunits: ["Thanesar", "Pehowa", "Shahbad", "Ladwa", "Ismailabad"] },
      { en: "Panipat", localized: { en: "Panipat", hi: "पानीपत", kn: "ಪಾಣಿಪತ್", te: "పానిపట్", ta: "பானிபட்", ml: "പാനിപ്പത്ത്" }, subunits: ["Panipat", "Samalkha", "Israna", "Bapoli", "Madlauda"] },
      { en: "Rohtak", localized: { en: "Rohtak", hi: "रोहतक", kn: "ರೋಹ್ಟಕ್", te: "రోహ్‌తక్", ta: "ரோஹ்தக்", ml: "റോഹ്തക്" }, subunits: ["Rohtak", "Meham", "Sampla", "Kalanaur"] },
      { en: "Sirsa", localized: { en: "Sirsa", hi: "सिरसा", kn: "ಸಿರ್ಸಾ", te: "సిర్సా", ta: "சிர்சா", ml: "സിർസ" }, subunits: ["Sirsa", "Dabwali", "Ellenabad", "Rania", "Kalanwali"] },
      { en: "Sonipat", localized: { en: "Sonipat", hi: "सोनीपत", kn: "ಸೋನಿಪತ್", te: "సోనిపట్", ta: "சோனிபட்", ml: "സോനിപത്" }, subunits: ["Sonipat", "Ganaur", "Gohana", "Kharkhoda", "Rai", "Kundli"] }
    ]
  },
  "Himachal Pradesh": {
    name: { en: "Himachal Pradesh", hi: "हिमाचल प्रदेश", kn: "ಹಿಮಾಚಲ ಪ್ರದೇಶ", te: "హిమాచల్ ప్రదేశ్", ta: "இமாச்சலப் பிரதேசம்", ml: "ഹിമാചൽ പ്രദേശ്" },
    districts: [
      { en: "Kangra", localized: { en: "Kangra", hi: "कांगड़ा", kn: "ಕಾಂಗ್ರಾ", te: "కాంగ్రా", ta: "காங்ரா", ml: "കാംഗ്ര" }, subunits: ["Dharamshala", "Kangra", "Palampur", "Nurpur", "Dehra", "Baijnath", "Jawali"] },
      { en: "Kullu", localized: { en: "Kullu", hi: "कुल्लू", kn: "ಕುಲ್ಲು", te: "కులు", ta: "குல்லு", ml: "കുളു" }, subunits: ["Kullu", "Manali", "Banjar", "Anni", "Nirmand"] },
      { en: "Mandi", localized: { en: "Mandi", hi: "मंडी", kn: "ಮಂಡಿ", te: "మండి", ta: "மண்டி", ml: "മണ്ഡി" }, subunits: ["Mandi", "Sundernagar", "Sarkaghat", "Jogindernagar", "Karsog", "Chachyot"] },
      { en: "Shimla", localized: { en: "Shimla", hi: "शिमला", kn: "ಶಿಮ್ಲಾ", te: "సిమ్లా", ta: "சிம்லா", ml: "ഷിംല" }, subunits: ["Shimla Urban", "Shimla Rural", "Rampur", "Rohru", "Theog", "Chopal", "Jubbal", "Kotkhai"] },
      { en: "Solan", localized: { en: "Solan", hi: "सोलन", kn: "ಸೋಲನ್", te: "సోలన్", ta: "சோலன்", ml: "സോളൻ" }, subunits: ["Solan", "Nalagarh", "Baddi", "Arki", "Kasauli", "Kandaghat"] }
    ]
  },
  Jharkhand: {
    name: { en: "Jharkhand", hi: "झारखंड", kn: "ಜಾರ್ಖಂಡ್", te: "జార్ఖండ్", ta: "ஜார்கண்ட்", ml: "ജാർഖണ്ഡ്" },
    districts: [
      { en: "Bokaro", localized: { en: "Bokaro", hi: "बोकारो", kn: "ಬೊಕಾರೊ", te: "బొకారో", ta: "பொகாரோ", ml: "ബൊക്കാറോ" }, subunits: ["Chas", "Bermo", "Gomia", "Chandankiyari", "Jaridih"] },
      { en: "Dhanbad", localized: { en: "Dhanbad", hi: "धनबाद", kn: "ಧನ್‌ಬಾದ್", te: "ధన్‌బాద్", ta: "தன்பாத்", ml: "ധൻബാദ്" }, subunits: ["Dhanbad", "Jharia", "Baghmara", "Nirsa", "Govindpur", "Tundi"] },
      { en: "East Singhbhum", localized: { en: "East Singhbhum", hi: "पूर्वी सिंहभूम (जमशेदपुर)", kn: "ಪೂರ್ವ ಸಿಂಗ್‌ಭೂಮ್", te: "తూర్పు సింగ్‌భూమ్", ta: "கிழக்கு சிங்பூம்", ml: "കിഴക്കൻ സിംഗ്ഭൂം" }, subunits: ["Jamshedpur", "Ghatshila", "Potka", "Patamda", "Baharagora", "Chakulia"] },
      { en: "Hazaribagh", localized: { en: "Hazaribagh", hi: "हजारीबाग", kn: "ಹಜಾರಿಬಾಗ್", te: "హజారీబాగ్", ta: "ஹசாரிபாக்", ml: "ഹസാരിബാഗ്" }, subunits: ["Hazaribagh", "Barhi", "Barkagaon", "Chauparan", "Ichak", "Katkamsandi"] },
      { en: "Ranchi", localized: { en: "Ranchi", hi: "रांची", kn: "ರಾಂಚಿ", te: "రాంచీ", ta: "ராஞ்சி", ml: "റാഞ്ചി" }, subunits: ["Ranchi Sadar", "Kanke", "Namkum", "Ormanjhi", "Ratu", "Angara", "Mandar", "Bundu", "Tamar"] }
    ]
  },
  Karnataka: {
    name: { en: "Karnataka", hi: "कर्नाटक", kn: "ಕರ್ನಾಟಕ", te: "కర్ణాటక", ta: "கர்நாடகா", ml: "കർണാടക" },
    districts: [
      { en: "Bagalkote", localized: { en: "Bagalkote", hi: "बागलकोट", kn: "ಬಾಗಲಕೋಟೆ", te: "బాగల్‌కోట్", ta: "பாகல்கோட்", ml: "ബാഗൽകോട്ട്" }, subunits: ["Bagalkote", "Badami", "Jamkhandi", "Mudhol", "Hungund", "Bilagi", "Ilkal", "Guledgudda", "Rabkavi Banhatti"] },
      { en: "Ballari", localized: { en: "Ballari", hi: "बल्लारी", kn: "ಬಳ್ಳಾರಿ", te: "బళ్లారి", ta: "பல்லாரி", ml: "ബല്ലാരി" }, subunits: ["Ballari", "Siruguppa", "Sandur", "Kurugodu", "Kampli"] },
      { en: "Belagavi", localized: { en: "Belagavi", hi: "बेलगावी", kn: "ಬೆಳಗಾವಿ", te: "బెళగావి", ta: "பெலகாவி", ml: "ബെലഗാവി" }, subunits: ["Belagavi", "Gokak", "Chikkodi", "Athani", "Bailhongal", "Hukkeri", "Ramdurg", "Saundatti", "Raybag", "Khanapur", "Kagawad", "Mudalagi", "Kittur", "Nipani"] },
      { en: "Bengaluru Rural", localized: { en: "Bengaluru Rural", hi: "बेंगलुरु ग्रामीण", kn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", te: "బెంగళూరు రూరల్", ta: "பெங்களூரு ஊரகம்", ml: "ബെംഗളൂരു റൂറൽ" }, subunits: ["Devanahalli", "Doddaballapura", "Hosakote", "Nelamangala", "Jangamakote Cross", "Sulibele", "Nandi Hills Road"] },
      { en: "Bengaluru Urban", localized: { en: "Bengaluru Urban", hi: "बेंगलुरु शहरी", kn: "ಬೆಂಗಳೂರು ನಗರ", te: "బెంగళూరు అర్బన్", ta: "பெங்களூரு நகரம்", ml: "ബെംഗളൂരു അർബൻ" }, subunits: ["Bengaluru North", "Bengaluru South", "Bengaluru East", "Anekal", "Yelahanka", "Kengeri", "KR Puram", "Mahadevapura", "Sarjapur", "Electronic City", "Whitefield"] },
      { en: "Bidar", localized: { en: "Bidar", hi: "बीदर", kn: "ಬೀದರ್", te: "బీదర్", ta: "பீதர்", ml: "ബീദർ" }, subunits: ["Bidar", "Basavakalyan", "Bhalki", "Humnabad", "Aurad", "Kamalnagar", "Chitaguppa", "Hulsoor"] },
      { en: "Chamarajanagar", localized: { en: "Chamarajanagar", hi: "चामराजनगर", kn: "ಚಾಮರಾಜನಗರ", te: "చామరాజనగర్", ta: "சாமராஜநகர்", ml: "ചാമരാജനഗർ" }, subunits: ["Chamarajanagar", "Gundlupet", "Kollegal", "Yelandur", "Hanur"] },
      { en: "Chikkaballapura", localized: { en: "Chikkaballapura", hi: "चिक्कबल्लापुर", kn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", te: "చిక్కబళ్లాపూర్", ta: "சிக்கபள்ளாபூர்", ml: "ചിക്കബെല്ലാപുര" }, subunits: ["Chikkaballapura", "Chintamani", "Gauribidanur", "Bagepalli", "Sidlaghatta", "Gudibande", "Jangamakote GP", "Manchenahalli"] },
      { en: "Chikkamagaluru", localized: { en: "Chikkamagaluru", hi: "चिकमगलूर", kn: "ಚಿಕ್ಕಮಗಳೂರು", te: "చిక్కమగళూరు", ta: "சிக்கமகளூரு", ml: "ചിക്കമംഗളൂരു" }, subunits: ["Chikkamagaluru", "Mudigere", "Koppa", "Sringeri", "Narasimharajapura", "Tarikere", "Kadur", "Ajjampura"] },
      { en: "Chitradurga", localized: { en: "Chitradurga", hi: "चित्रदुर्ग", kn: "ಚಿತ್ರದುರ್ಗ", te: "చిత్రదుర్గ", ta: "சித்ரதுர்கா", ml: "ചിത്രദുർഗ്ഗ" }, subunits: ["Chitradurga", "Challakere", "Hiriyur", "Holalkere", "Hosadurga", "Molakalmuru"] },
      { en: "Dakshina Kannada", localized: { en: "Dakshina Kannada", hi: "दक्षिण कन्नड़", kn: "ದಕ್ಷಿಣ ಕನ್ನಡ (ಮಂಗಳೂರು)", te: "దక్షిణ కన్నడ", ta: "தட்சிண கன்னடா", ml: "ദക്ഷിണ കന്നഡ" }, subunits: ["Mangaluru", "Bantwal", "Puttur", "Belthangady", "Sullia", "Kadaba", "Moodbidri"] },
      { en: "Davangere", localized: { en: "Davangere", hi: "दावणगेरे", kn: "ದಾವಣಗೆರೆ", te: "దావణగెరె", ta: "தாவணகெரே", ml: "ദാവൺഗെരെ" }, subunits: ["Davangere", "Harihara", "Honnali", "Channagiri", "Jagalur", "Nyamathi"] },
      { en: "Dharwad", localized: { en: "Dharwad", hi: "धारवाड़", kn: "ಧಾರವಾಡ", te: "ధార్వాడ్", ta: "தார்வாட்", ml: "ധാർവാഡ്" }, subunits: ["Dharwad", "Hubballi Urban", "Hubballi Rural", "Kundgol", "Navalgund", "Kalghatgi", "Alnavar", "Annigeri"] },
      { en: "Gadag", localized: { en: "Gadag", hi: "गदग", kn: "ಗದಗ", te: "గదగ్", ta: "கதக்", ml: "ഗദഗ്" }, subunits: ["Gadag", "Ron", "Shirhatti", "Mundargi", "Nargund", "Gajendragad", "Lakshmeshwar"] },
      { en: "Hassan", localized: { en: "Hassan", hi: "हासन", kn: "ಹಾಸನ", te: "హాసన్", ta: "ஹாசன்", ml: "ഹാസൻ" }, subunits: ["Hassan", "Arsikere", "Channarayapatna", "Holenarasipura", "Sakleshpur", "Alur", "Arkalgud", "Belur"] },
      { en: "Haveri", localized: { en: "Haveri", hi: "हावेरी", kn: "ಹಾವೇರಿ", te: "హవేరి", ta: "ஹாவேரி", ml: "ഹാവേരി" }, subunits: ["Haveri", "Ranebennur", "Byadgi", "Hangal", "Hirekerur", "Shiggaon", "Savanur", "Rattihalli"] },
      { en: "Kalaburagi", localized: { en: "Kalaburagi", hi: "कलबुर्गी", kn: "ಕಲಬುರಗಿ", te: "కలబురగి", ta: "கலபுரகி", ml: "കലബുറഗി" }, subunits: ["Kalaburagi", "Afzalpur", "Aland", "Chincholi", "Sedam", "Chitapur", "Jevargi", "Kamalapur", "Yadrami", "Shahabad", "Kalagi"] },
      { en: "Kodagu", localized: { en: "Kodagu", hi: "कोडगु", kn: "ಕೊಡಗು (ಮಡಿಕೇರಿ)", te: "కొడగు", ta: "குடகு", ml: "കുടക്" }, subunits: ["Madikeri", "Virajpet", "Somwarpet", "Kushalnagar", "Ponnampet"] },
      { en: "Kolar", localized: { en: "Kolar", hi: "कोलार", kn: "ಕೋಲಾರ", te: "కోలార్", ta: "கோலார்", ml: "കോലാർ" }, subunits: ["Kolar", "Bangarapet", "Malur", "Mulbagal", "Srinivaspur", "KGF (Robertsonpet)"] },
      { en: "Koppal", localized: { en: "Koppal", hi: "कोप्पल", kn: "ಕೊಪ್ಪಳ", te: "కొప్పల్", ta: "கொப்பல்", ml: "കൊപ്പൽ" }, subunits: ["Koppal", "Gangavathi", "Kushtagi", "Yelburga", "Kanakagiri", "Karatagi", "Kukanoor"] },
      { en: "Mandya", localized: { en: "Mandya", hi: "मंड्या", kn: "ಮಂಡ್ಯ", te: "మండ్య", ta: "மாண்டியா", ml: "മാണ്ഡ്യ" }, subunits: ["Mandya", "Maddur", "Malavalli", "Pandavapura", "Srirangapatna", "Krishnarajpet", "Nagamangala"] },
      { en: "Mysuru", localized: { en: "Mysuru", hi: "मैसूरु", kn: "ಮೈಸೂರು", te: "మైసూరు", ta: "மைசூரு", ml: "മൈസൂരു" }, subunits: ["Mysuru", "Nanjangud", "Hunsur", "T. Narasipura", "Krishnarajanagara", "Heggadadevankote", "Piriyapatna", "Saragur", "Saligrama"] },
      { en: "Raichur", localized: { en: "Raichur", hi: "रायचूर", kn: "ರಾಯಚೂರು", te: "రాయచూర్", ta: "ராய்ச்சூர்", ml: "റായ്ച്ചൂർ" }, subunits: ["Raichur", "Manvi", "Sindhanur", "Devadurga", "Lingsugur", "Maski", "Sirwar"] },
      { en: "Ramanagara", localized: { en: "Ramanagara", hi: "रामनगर", kn: "ರಾಮನಗರ", te: "రామనగర", ta: "ராமனகரா", ml: "രാമനഗര" }, subunits: ["Ramanagara", "Channapatna", "Kanakapura", "Magadi", "Bidadi", "Harohalli"] },
      { en: "Shivamogga", localized: { en: "Shivamogga", hi: "शिवमोग्गा", kn: "ಶಿವಮೊಗ್ಗ", te: "శివమొగ్గ", ta: "சிவமொக்கா", ml: "ശിവമോഗ" }, subunits: ["Shivamogga", "Bhadravathi", "Sagar", "Shikaripura", "Soraba", "Tirthahalli", "Hosanagara"] },
      { en: "Tumakuru", localized: { en: "Tumakuru", hi: "तुमकुरु", kn: "ತುಮಕೂರು", te: "తుమకూరు", ta: "துமகூரு", ml: "തുമകൂരു" }, subunits: ["Tumakuru", "Tiptur", "Kunigal", "Gubbi", "Madhugiri", "Sira", "Pavagada", "Koratagere", "Chikkanayakanahalli", "Turuvekere"] },
      { en: "Udupi", localized: { en: "Udupi", hi: "उडुपी", kn: "ಉಡುಪಿ", te: "ఉడిపి", ta: "உடுப்பி", ml: "ഉഡുപ്പി" }, subunits: ["Udupi", "Kundapura", "Karkala", "Byndoor", "Brahmavara", "Kaup", "Hebri"] },
      { en: "Uttara Kannada", localized: { en: "Uttara Kannada", hi: "उत्तर कन्नड़", kn: "ಉತ್ತರ ಕನ್ನಡ (ಕಾರವಾರ)", te: "ఉత్తర కన్నడ", ta: "உத்தர கன்னடா", ml: "ഉത്തര കന്നഡ" }, subunits: ["Karwar", "Sirsi", "Kumta", "Bhatkal", "Ankola", "Haliyal", "Honnavar", "Joida", "Mundgod", "Siddapur", "Yellapur", "Dandeli"] },
      { en: "Vijayanagara", localized: { en: "Vijayanagara", hi: "विजयनगर", kn: "ವಿಜಯನಗರ (ಹೊಸಪೇಟೆ)", te: "విజయనగర", ta: "விஜயநகரா", ml: "വിജയനഗര" }, subunits: ["Hosapete", "Hagaribommanahalli", "Harapanahalli", "Hoovina Hadagali", "Kotturu", "Kudligi"] },
      { en: "Vijayapura", localized: { en: "Vijayapura", hi: "विजयपुरा", kn: "ವಿಜಯಪುರ (ಬಿಜಾಪುರ)", te: "విజయపుర", ta: "விஜயபுரா", ml: "വിജയപുര" }, subunits: ["Vijayapura", "Basavana Bagewadi", "Indi", "Muddebihal", "Sindagi", "Talikoti", "Chadchan", "Devara Hippargi", "Kolhar", "Nidagundi", "Babaleshwar", "Tikota"] },
      { en: "Yadgir", localized: { en: "Yadgir", hi: "यादगीर", kn: "ಯಾದಗಿರಿ", te: "యాద్గిర్", ta: "யாத்கிர்", ml: "യാദ്ഗിർ" }, subunits: ["Yadgir", "Shahapur", "Shorapur", "Hunasagi", "Vadagera", "Gurmitkal"] }
    ]
  },
  Kerala: {
    name: { en: "Kerala", hi: "केरल", kn: "ಕೇರಳ", te: "కేరళ", ta: "கேரளா", ml: "കേരളം" },
    districts: [
      { en: "Alappuzha", localized: { en: "Alappuzha", hi: "अलप्पुझा", kn: "ಆಲಪ್ಪುಳ", te: "అలప్పుళ", ta: "ஆலப்புழா", ml: "ആലപ്പുഴ" }, subunits: ["Ambalappuzha", "Chengannur", "Cherthala", "Karthikappally", "Kuttanad", "Mavelikkara"] },
      { en: "Ernakulam (Kochi)", localized: { en: "Ernakulam (Kochi)", hi: "एर्नाकुलम (कोच्चि)", kn: "ಎರ್ನಾಕುಲಂ (ಕೊಚ್ಚಿ)", te: "ఎర్నాకులం", ta: "எர்ணாகுளம்", ml: "എറണാകുളം (കൊച്ചി)" }, subunits: ["Kochi", "Aluva", "Kanayannur", "Kunnathunad", "Muvattupuzha", "Kothamangalam", "Paravur"] },
      { en: "Idukki", localized: { en: "Idukki", hi: "इडुक्की", kn: "ಇಡುಕ್ಕಿ", te: "ఇడుక్కి", ta: "இடுக்கி", ml: "ഇടുക്കി" }, subunits: ["Thodupuzha", "Devikulam", "Udumbanchola", "Peermade", "Idukki"] },
      { en: "Kozhikode", localized: { en: "Kozhikode", hi: "कोझिकोड", kn: "ಕೋಝಿಕೋಡ್", te: "కోజికోడ్", ta: "கோழிக்கோடு", ml: "കോഴിക്കോട്" }, subunits: ["Kozhikode", "Vatakara", "Koyilandy", "Thamarassery"] },
      { en: "Palakkad", localized: { en: "Palakkad", hi: "पालक्कड़", kn: "ಪಾಲಕ್ಕಾಡ್", te: "పాలక్కాడ్", ta: "பாலக்காடு", ml: "പാലക്കാട്" }, subunits: ["Palakkad", "Alathur", "Chittur", "Mannarkkad", "Ottappalam", "Pattambi"] },
      { en: "Thiruvananthapuram", localized: { en: "Thiruvananthapuram", hi: "तिरुवनंतपुरम", kn: "ತಿರುವನಂತಪುರಂ", te: "తిరువనంతపురం", ta: "திருவனந்தபுரம்", ml: "തിരുവനന്തപുരം" }, subunits: ["Thiruvananthapuram", "Neyyattinkara", "Nedumangad", "Attingal", "Chirayinkeezhu", "Varkala", "Kattakada"] },
      { en: "Thrissur", localized: { en: "Thrissur", hi: "त्रिशूर", kn: "ತ್ರಿಶೂರ್", te: "త్రిసూర్", ta: "திருச்சூர்", ml: "തൃശ്ശൂർ" }, subunits: ["Thrissur", "Chalakudy", "Chavakkad", "Kodungallur", "Mukundapuram", "Thalapilly"] },
      { en: "Wayanad", localized: { en: "Wayanad", hi: "वायनाड", kn: "ವಯನಾಡ್", te: "వయనాడ్", ta: "வயநாடு", ml: "വയനാട്" }, subunits: ["Mananthavady", "Sulthan Bathery", "Vythiri (Kalpetta)"] }
    ]
  },
  "Madhya Pradesh": {
    name: { en: "Madhya Pradesh", hi: "मध्य प्रदेश", kn: "ಮಧ್ಯಪ್ರದೇಶ", te: "మధ్యప్రదేశ్", ta: "மத்தியப் பிரதேசம்", ml: "മധ്യപ്രദേശ്" },
    districts: [
      { en: "Bhopal", localized: { en: "Bhopal", hi: "भोपाल", kn: "ಭೋಪಾಲ್", te: "భోపాల్", ta: "போபால்", ml: "ഭോപ്പാൽ" }, subunits: ["Huzur", "Berasia", "Kolar", "Govindpura"] },
      { en: "Gwalior", localized: { en: "Gwalior", hi: "ग्वालियर", kn: "ಗ್ವಾಲಿಯರ್", te: "గ్వాలియర్", ta: "குவாலியர்", ml: "ഗ്വാളിയോർ" }, subunits: ["Gwalior", "Dabra", "Bhitarwar", "Chinour"] },
      { en: "Hoshangabad (Narmadapuram)", localized: { en: "Hoshangabad (Narmadapuram)", hi: "नर्मदापुरम", kn: "ಹೊಶಂಗಾಬಾದ್", te: "నర్మదాపురం", ta: "ஹோஷங்காபாத்", ml: "ഹോഷംഗാബാദ്" }, subunits: ["Hoshangabad", "Itarsi", "Pipariya", "Sohagpur", "Seoni Malwa", "Babai"] },
      { en: "Indore", localized: { en: "Indore", hi: "इंदौर", kn: "ಇಂದೋರ್", te: "ఇండోర్", ta: "இந்தூர்", ml: "ഇൻഡോർ" }, subunits: ["Indore", "Mhow (Dr. Ambedkar Nagar)", "Sanwer", "Depalpur", "Hatod", "Rau"] },
      { en: "Jabalpur", localized: { en: "Jabalpur", hi: "जबलपुर", kn: "ಜಬಲ್‌ಪುರ", te: "జబల్పూర్", ta: "ஜபல்பூர்", ml: "ജബൽപൂർ" }, subunits: ["Jabalpur", "Patan", "Sihora", "Majholi", "Panagar", "Shahpura", "Kundam"] },
      { en: "Ratlam", localized: { en: "Ratlam", hi: "रतलाम", kn: "ರತ್ಲಾಂ", te: "రత్లాం", ta: "ரத்லம்", ml: "രത്ലാം" }, subunits: ["Ratlam", "Jaora", "Sailana", "Alot", "Piploda", "Bajna"] },
      { en: "Sagar", localized: { en: "Sagar", hi: "सागर", kn: "ಸಾಗರ್", te: "సాగర్", ta: "சாகர்", ml: "സാഗർ" }, subunits: ["Sagar", "Bina", "Khurai", "Rahatgarh", "Banda", "Rehli", "Deori", "Shahgarh"] },
      { en: "Satna", localized: { en: "Satna", hi: "सतना", kn: "ಸತ್ನಾ", te: "సత్నా", ta: "சத்னா", ml: "സത്ന" }, subunits: ["Satna (Raghurajnagar)", "Maihar", "Nagod", "Amarpatan", "Ramnagar", "Uchehara"] },
      { en: "Ujjain", localized: { en: "Ujjain", hi: "उज्जैन", kn: "ಉಜ್ಜಯಿನಿ", te: "ఉజ్జయిని", ta: "உஜ்ஜைன்", ml: "ഉജ്ജയിൻ" }, subunits: ["Ujjain", "Badnagar", "Mahidpur", "Nagda", "Khachrod", "Tarana", "Ghatiya"] }
    ]
  },
  Maharashtra: {
    name: { en: "Maharashtra", hi: "महाराष्ट्र", kn: "ಮಹಾರಾಷ್ಟ್ರ", te: "మహారాష్ట్ర", ta: "மகாராஷ்டிரா", ml: "മഹാരാഷ്ട്ര" },
    districts: [
      { en: "Ahmednagar", localized: { en: "Ahmednagar", hi: "अहमदनगर", kn: "ಅಹ್ಮದ್‌ನಗರ", te: "అహ్మద్‌నగర్", ta: "அகமத்நகர்", ml: "അഹമ്മദ്നഗർ" }, subunits: ["Nagar", "Rahata", "Sangamner", "Kopargaon", "Shrirampur", "Nevasa", "Parner", "Pathardi", "Shevgaon", "Akole", "Karjat", "Jamkhed", "Shrigonda", "Rahuri"] },
      { en: "Akola", localized: { en: "Akola", hi: "अकोला", kn: "ಅಕೋಲಾ", te: "అకోలా", ta: "அகோலா", ml: "അകോല" }, subunits: ["Akola", "Akot", "Balapur", "Telhara", "Patur", "Murtizapur", "Barshitakli"] },
      { en: "Amravati", localized: { en: "Amravati", hi: "अमरावती", kn: "ಅಮರಾವತಿ", te: "అమరావతి", ta: "அமராவதி", ml: "അമരാവതി" }, subunits: ["Amravati", "Achalpur", "Chandur Bazar", "Morshi", "Warud", "Daryapur", "Anjangaon Surji", "Dhamangaon", "Nandgaon Khandeshwar", "Teosa", "Dharni", "Chikhaldara"] },
      { en: "Chhatrapati Sambhaji Nagar (Aurangabad)", localized: { en: "Chhatrapati Sambhaji Nagar", hi: "छत्रपति संभाजी नगर", kn: "ಛತ್ರಪತಿ ಸಂಭಾಜಿನಗರ", te: "ఛత్రపతి సంభాజీనగర్", ta: "சத்ரபதி சம்பாஜி நகர்", ml: "ഛത്രപതി സംഭാജിനഗർ" }, subunits: ["Aurangabad", "Paithan", "Gangapur", "Vaijapur", "Kannad", "Khuldabad", "Sillod", "Soegaon", "Phulambri"] },
      { en: "Jalgaon", localized: { en: "Jalgaon", hi: "जलगांव", kn: "ಜಲಗಾಂವ್", te: "జలగావ్", ta: "ஜல்கான்", ml: "ജൽഗാവ്" }, subunits: ["Jalgaon", "Bhusawal", "Chalisgaon", "Amalner", "Chopda", "Pachora", "Jamner", "Raver", "Yawal", "Erandol", "Parola", "Bhadgaon", "Bodwad", "Dharangaon", "Muktainagar"] },
      { en: "Kolhapur", localized: { en: "Kolhapur", hi: "कोल्हापुर", kn: "ಕೊಲ್ಹಾಪುರ", te: "కొల్హాపూర్", ta: "கோலாப்பூர்", ml: "കൊൽഹാപൂർ" }, subunits: ["Karveer", "Hatkangale", "Shirol", "Kagal", "Gadhinglaj", "Radhanagari", "Bhudargad", "Panhala", "Shahuwadi", "Ajra", "Chandgad", "Gaganbawda"] },
      { en: "Latur", localized: { en: "Latur", hi: "लातूर", kn: "ಲಾತೂರ್", te: "లాతూర్", ta: "லாத்தூர்", ml: "ലാത്തൂർ" }, subunits: ["Latur", "Ausa", "Nilanga", "Udgir", "Ahmedpur", "Chakur", "Renapur", "Deoni", "Shirur Anantpal", "Jalkot"] },
      { en: "Mumbai City", localized: { en: "Mumbai City", hi: "मुंबई शहर", kn: "ಮುಂಬೈ ನಗರ", te: "ముంబై సిటీ", ta: "மும்பை நகரம்", ml: "മുംബൈ സിറ്റി" }, subunits: ["Colaba", "Fort", "Dadar", "Byculla", "Malabar Hill", "Parel"] },
      { en: "Mumbai Suburban", localized: { en: "Mumbai Suburban", hi: "मुंबई उपनगर", kn: "ಮುಂಬೈ ಉಪನಗರ", te: "ముంబై సబర్బన్", ta: "மும்பை புறநகர்", ml: "മുംബൈ സബർബൻ" }, subunits: ["Andheri", "Bandra", "Kurla", "Borivali", "Goregaon", "Malad", "Ghatkopar", "Mulund", "Chembur"] },
      { en: "Nagpur", localized: { en: "Nagpur", hi: "नागपुर", kn: "ನಾಗಪುರ", te: "నాగ్‌పూర్", ta: "நாக்பூர்", ml: "നാഗ്പൂർ" }, subunits: ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Kalmeshwar", "Ramtek", "Parseoni", "Mouda", "Umred", "Bhiwapur", "Kuhi"] },
      { en: "Nashik", localized: { en: "Nashik", hi: "नासिक", kn: "ನಾಸಿಕ್", te: "నాసిక్", ta: "நாசிக்", ml: "നാസിക്" }, subunits: ["Nashik", "Niphad (Lasalgaon)", "Sinnar", "Dindori", "Igatpuri", "Trimbakeshwar", "Kalwan", "Baglan (Satana)", "Malegaon", "Chandwad", "Deola", "Nandgaon", "Yeola", "Surgana", "Peint"] },
      { en: "Pune", localized: { en: "Pune", hi: "पुणे", kn: "ಪುಣೆ", te: "పూణే", ta: "புனே", ml: "പൂനെ" }, subunits: ["Haveli (Pune City)", "Khed (Chakan)", "Baramati", "Shirur", "Indapur", "Daund", "Maval (Talegaon)", "Mulshi (Paud)", "Junnar", "Ambegaon (Manchar)", "Purandar (Saswad)", "Bhor", "Velhe"] },
      { en: "Sangli", localized: { en: "Sangli", hi: "सांगली", kn: "ಸಾಂಗ್ಲಿ", te: "సాంగ్లీ", ta: "சாங்லி", ml: "സാംഗ്ലി" }, subunits: ["Miraj", "Tasgaon", "Walwa (Islampur)", "Shirala", "Khanapur (Vita)", "Atpadi", "Jat", "Kavathe Mahankal", "Palus", "Kadegaon"] },
      { en: "Satara", localized: { en: "Satara", hi: "सतारा", kn: "ಸತಾರಾ", te: "సతారా", ta: "சத்தாரா", ml: "സത്താറ" }, subunits: ["Satara", "Karad", "Wai", "Phaltan", "Mahabaleshwar", "Koregaon", "Khatav (Vaduj)", "Maan (Dahiwadi)", "Patan", "Jaoli", "Khandala"] },
      { en: "Solapur", localized: { en: "Solapur", hi: "सोलापुर", kn: "ಸೋಲಾಪುರ", te: "సోలాపూర్", ta: "சோலாப்பூர்", ml: "സോളാപൂർ" }, subunits: ["Solapur North", "Solapur South", "Barshi", "Pandharpur", "Madha (Kurduwadi)", "Karmala", "Mohol", "Malshiras (Akluj)", "Sangola", "Mangalwedha", "Akkalkot"] }
    ]
  },
  Manipur: {
    name: { en: "Manipur", hi: "मणिपुर", kn: "ಮಣಿಪುರ", te: "మణిపూర్", ta: "மணிப்பூர்", ml: "മണിപ്പൂർ" },
    districts: [
      { en: "Bishnupur", localized: { en: "Bishnupur", hi: "बिष्णुपुर", kn: "ಬಿಷ್ಣುಪುರ", te: "బిష్ణుపూర్", ta: "பிஷ்ணுபூர்", ml: "ബിഷ്ണുപൂർ" }, subunits: ["Bishnupur", "Nambol", "Moirang"] },
      { en: "Churachandpur", localized: { en: "Churachandpur", hi: "चुराचांदपुर", kn: "ಚುರಾಚಾಂದ್‌ಪುರ", te: "చురాచాంద్‌పూర్", ta: "சுராசந்த்பூர்", ml: "ചുരാചന്ദ്പൂർ" }, subunits: ["Churachandpur", "Singngat", "Tuibong"] },
      { en: "Imphal East", localized: { en: "Imphal East", hi: "इम्फाल पूर्व", kn: "ಇಂಫಾಲ ಪೂರ್ವ", te: "ఇంఫాల్ ఈస్ట్", ta: "கிழக்கு இம்பால்", ml: "കിഴക്കൻ ഇംഫാൽ" }, subunits: ["Porompat", "Sawombung", "Keirao Bitra"] },
      { en: "Imphal West", localized: { en: "Imphal West", hi: "इम्फाल पश्चिम", kn: "ಇಂಫಾಲ ಪಶ್ಚಿಮ", te: "ఇంఫాల్ వెస్ట్", ta: "மேற்கு இம்பால்", ml: "പടിഞ്ഞാറൻ ഇംഫാൽ" }, subunits: ["Lamphelpat", "Patsoi", "Wangoi", "Lamsang"] }
    ]
  },
  Meghalaya: {
    name: { en: "Meghalaya", hi: "मेघालय", kn: "ಮೇಘಾಲಯ", te: "మేఘాలయ", ta: "மேகாலயா", ml: "മേഘാലയ" },
    districts: [
      { en: "East Khasi Hills", localized: { en: "East Khasi Hills", hi: "पूर्वी खासी हिल्स", kn: "ಪೂರ್ವ ಖಾಸಿ ಹಿಲ್ಸ್ (ಶಿಲ್ಲಾಂಗ್)", te: "ఈస్ట్ ఖాసీ హిల్స్", ta: "கிழக்கு காசி மலைகள்", ml: "കിഴക്കൻ ഖാസി ഹിൽസ്" }, subunits: ["Shillong", "Sohra (Cherrapunji)", "Pynursla", "Mawkynrew", "Mawphlang"] },
      { en: "West Garo Hills", localized: { en: "West Garo Hills", hi: "पश्चिम गारो हिल्स", kn: "ಪಶ್ಚಿಮ ಗಾರೋ ಹಿಲ್ಸ್", te: "వెస్ట్ గారో హిల్స్", ta: "மேற்கு காரோ மலைகள்", ml: "പടിഞ്ഞാറൻ ഗാരോ ഹിൽസ്" }, subunits: ["Tura", "Dadenggre", "Dalu", "Selsella", "Tikrikilla"] }
    ]
  },
  Mizoram: {
    name: { en: "Mizoram", hi: "मिजोरम", kn: "ಮಿಜೋರಾಂ", te: "మిజోరం", ta: "மிசோரம்", ml: "മിസോറാം" },
    districts: [
      { en: "Aizawl", localized: { en: "Aizawl", hi: "आइज़ोल", kn: "ಐಜ್ವಾಲ್", te: "ఐజ్వాల్", ta: "ஐசால்", ml: "ഐസ്വാൾ" }, subunits: ["Aizawl", "Darlawn", "Thingsulthliah", "Tlangnuam"] },
      { en: "Lunglei", localized: { en: "Lunglei", hi: "लुंगलेई", kn: "ಲುಂಗ್ಲೆ", te: "లుంగ్లేయ్", ta: "லுங்லேய்", ml: "ലുങ്‌ലെയ്" }, subunits: ["Lunglei", "Hnahthial", "Bunghmun", "Lungsen"] }
    ]
  },
  Nagaland: {
    name: { en: "Nagaland", hi: "नागालैंड", kn: "ನಾಗಾಲ್ಯಾಂಡ್", te: "నాగాలాండ్", ta: "நாகாலாந்து", ml: "നാഗാലാൻഡ്" },
    districts: [
      { en: "Dimapur", localized: { en: "Dimapur", hi: "दीमापुर", kn: "ದಿಮಾಪುರ", te: "దిమాపూర్", ta: "திமாப்பூர்", ml: "ദിമാപൂർ" }, subunits: ["Dimapur", "Medziphema", "Dhansiripar", "Niuland"] },
      { en: "Kohima", localized: { en: "Kohima", hi: "कोहिमा", kn: "ಕೊಹಿಮಾ", te: "కోహిమా", ta: "கோஹிமா", ml: "കൊഹിമ" }, subunits: ["Kohima", "Chiephobozou", "Sechu-Zubza", "Tseminyu", "Jakhama"] },
      { en: "Mokokchung", localized: { en: "Mokokchung", hi: "मोकोकचुंग", kn: "ಮೊಕೊಕ್‌ಚುಂಗ್", te: "మొకోక్‌చుంగ్", ta: "மொகோக்சுங்", ml: "മൊക്കോക്ചുങ്" }, subunits: ["Mokokchung", "Changtongya", "Tuli", "Mangkolemba"] }
    ]
  },
  Odisha: {
    name: { en: "Odisha", hi: "ओडिशा", kn: "ಒಡಿಶಾ", te: "ఒడిశా", ta: "ஒடிசா", ml: "ഒഡീഷ" },
    districts: [
      { en: "Balasore", localized: { en: "Balasore", hi: "बालेश्वर", kn: "ಬಾಲಸೋರ್", te: "బాలాసోర్", ta: "பாலசோர்", ml: "ബാലസോർ" }, subunits: ["Balasore", "Basta", "Jaleswar", "Nilagiri", "Soro"] },
      { en: "Bargarh", localized: { en: "Bargarh", hi: "बरगढ़", kn: "ಬರ್‌ಗಢ್", te: "బర్‌గఢ్", ta: "பர்கர்", ml: "ബർഗഡ്" }, subunits: ["Bargarh", "Attabira", "Padampur", "Sohella", "Bhatli"] },
      { en: "Cuttack", localized: { en: "Cuttack", hi: "कटक", kn: "ಕಟಕ್", te: "కటక్", ta: "கட்டாக்", ml: "കട്ടക്ക്" }, subunits: ["Cuttack Sadar", "Athagarh", "Banki", "Choudwar", "Salepur", "Baramba", "Tigiria"] },
      { en: "Ganjam", localized: { en: "Ganjam", hi: "गंजम", kn: "ಗಂಜಾಂ", te: "గంజాం", ta: "கஞ்சம்", ml: "ഗഞ്ചാം" }, subunits: ["Berhampur", "Chatrapur", "Bhanjanagar", "Aska", "Hinjilicut", "Polasara"] },
      { en: "Khurda", localized: { en: "Khurda", hi: "खुरदा (भुवनेश्वर)", kn: "ಖುರ್ದಾ (ಭುವನೇಶ್ವರ)", te: "ఖుర్దా", ta: "குர்தா", ml: "ഖുർദ" }, subunits: ["Bhubaneswar", "Khurda", "Jatni", "Banapur", "Begunia", "Bolagarh", "Tangi"] },
      { en: "Sambalpur", localized: { en: "Sambalpur", hi: "संबलपुर", kn: "ಸಂಬಲ್‌ಪುರ", te: "సంబల్పూర్", ta: "சம்பல்பூர்", ml: "സംബൽപൂർ" }, subunits: ["Sambalpur", "Rairakhol", "Kuchinda", "Dhankauda", "Maneswar", "Jujomura"] }
    ]
  },
  Punjab: {
    name: { en: "Punjab", hi: "पंजाब", kn: "ಪಂಜಾಬ್", te: "పంజాబ్", ta: "பஞ்சாப்", ml: "പഞ്ചാബ്" },
    districts: [
      { en: "Amritsar", localized: { en: "Amritsar", hi: "अमृतसर", kn: "ಅಮೃತಸರ", te: "అమృతసర్", ta: "அமிர்தசரஸ்", ml: "അമൃത്സർ" }, subunits: ["Amritsar-I", "Amritsar-II", "Ajnala", "Baba Bakala", "Majitha"] },
      { en: "Bathinda", localized: { en: "Bathinda", hi: "बठिंडा", kn: "ಭಟಿಂಡಾ", te: "భటిండా", ta: "பட்டிண்டா", ml: "ഭട്ടിൻഡ" }, subunits: ["Bathinda", "Rampura Phul", "Talwandi Sabo", "Maur", "Gonian"] },
      { en: "Firozpur", localized: { en: "Firozpur", hi: "फिरोजपुर", kn: "ಫಿರೋಜ್‌ಪುರ", te: "ఫిరోజ్‌పూర్", ta: "பிரோஸ்பூர்", ml: "ഫിറോസ്പൂർ" }, subunits: ["Firozpur", "Zira", "Guru Har Sahai", "Makhu"] },
      { en: "Gurdaspur", localized: { en: "Gurdaspur", hi: "गुरदासपुर", kn: "ಗುರುದಾಸ್‌ಪುರ", te: "గురుదాస్‌పూర్", ta: "குர்தாஸ்பூர்", ml: "ഗുർദാസ്പൂർ" }, subunits: ["Gurdaspur", "Batala", "Dera Baba Nanak", "Dinanagar", "Fatehgarh Churian"] },
      { en: "Hoshiarpur", localized: { en: "Hoshiarpur", hi: "होशियारपुर", kn: "ಹೋಷಿಯಾರ್‌ಪುರ", te: "హోషియార్‌పూర్", ta: "ஹோஷியார்பூர்", ml: "ഹോഷിയാർപൂർ" }, subunits: ["Hoshiarpur", "Dasuya", "Mukerian", "Garhshankar"] },
      { en: "Jalandhar", localized: { en: "Jalandhar", hi: "जालंधर", kn: "ಜಲಂಧರ್", te: "జలంధర్", ta: "ஜலந்தர்", ml: "ജലന്ധർ" }, subunits: ["Jalandhar-I", "Jalandhar-II", "Nakodar", "Phillaur", "Shahkot", "Adampur", "Kartarpur"] },
      { en: "Ludhiana", localized: { en: "Ludhiana", hi: "लुधियाना", kn: "ಲುಧಿಯಾನಾ", te: "లుధియానా", ta: "லுதியானா", ml: "ലുധിയാന" }, subunits: ["Ludhiana East", "Ludhiana West", "Khanna", "Jagraon", "Samrala", "Payal", "Raikot"] },
      { en: "Patiala", localized: { en: "Patiala", hi: "पटियाला", kn: "ಪಟಿಯಾಲ", te: "పాటియాలా", ta: "பாட்டியாலா", ml: "പട്യാല" }, subunits: ["Patiala", "Nabha", "Rajpura", "Samana", "Sanaur", "Patran"] },
      { en: "Sangrur", localized: { en: "Sangrur", hi: "संगरूर", kn: "ಸಂಗ್ರೂರ್", te: "సంగ్రూర్", ta: "சங்க்ரூர்", ml: "സംഗ്രൂർ" }, subunits: ["Sangrur", "Dhuri", "Sunam", "Lehra", "Bhawanigarh", "Moonak"] }
    ]
  },
  Rajasthan: {
    name: { en: "Rajasthan", hi: "राजस्थान", kn: "ರಾಜಸ್ಥಾನ", te: "రాజస్థాన్", ta: "ராஜஸ்தான்", ml: "രാജസ്ഥാൻ" },
    districts: [
      { en: "Ajmer", localized: { en: "Ajmer", hi: "अजमेर", kn: "ಅಜ್ಮೇರ್", te: "అజ్మీర్", ta: "அஜ்மீர்", ml: "അജ്മീർ" }, subunits: ["Ajmer", "Kishangarh", "Beawar", "Nasirabad", "Kekri", "Pushkar"] },
      { en: "Alwar", localized: { en: "Alwar", hi: "अलवर", kn: "ಅಲ್ವಾರ್", te: "అల్వార్", ta: "அல்வார்", ml: "ആൾവാർ" }, subunits: ["Alwar", "Tijara", "Bhiwadi", "Behror", "Kishangarh Bas", "Rajgarh", "Thanagazi", "Ramgarh"] },
      { en: "Bikaner", localized: { en: "Bikaner", hi: "बीकानेर", kn: "ಬಿಕಾನೇರ್", te: "బికనీర్", ta: "பிகானேர்", ml: "ബിക്കാനീർ" }, subunits: ["Bikaner", "Nokha", "Lunkaransar", "Kolayat", "Khajuwala", "Dungargarh"] },
      { en: "Hanumangarh", localized: { en: "Hanumangarh", hi: "हनुमानगढ़", kn: "ಹನುಮಾನಗಢ್", te: "హనుమాన్‌గఢ్", ta: "ஹனுமன்கர்", ml: "ഹനുമാൻഗഡ്" }, subunits: ["Hanumangarh", "Pilibanga", "Nohar", "Bhadra", "Sangaria", "Rawatsar"] },
      { en: "Jaipur", localized: { en: "Jaipur", hi: "जयपुर", kn: "ಜೈಪುರ", te: "జైపూర్", ta: "ஜெய்ப்பூர்", ml: "ജയ്പൂർ" }, subunits: ["Jaipur", "Amber", "Sanganer", "Chomu", "Kotputli", "Phulera (Sambhar)", "Shahpura", "Bassi", "Chaksu", "Jamwa Ramgarh", "Dudu"] },
      { en: "Jodhpur", localized: { en: "Jodhpur", hi: "जोधपुर", kn: "ಜೋಧ್‌ಪುರ", te: "జోధ్‌పూర్", ta: "ஜோத்பூர்", ml: "ജോധ്പൂർ" }, subunits: ["Jodhpur", "Bilara", "Phalodi", "Osian", "Piparcity", "Luni", "Bhopalgarh", "Shergarh"] },
      { en: "Kota", localized: { en: "Kota", hi: "कोटा", kn: "ಕೋಟಾ", te: "కోటా", ta: "கோட்டா", ml: "കോട്ട" }, subunits: ["Ladpura (Kota)", "Ramganj Mandi", "Digod", "Sangod", "Pipalda (Itawa)", "Kanwas"] },
      { en: "Nagaur", localized: { en: "Nagaur", hi: "नागौर", kn: "ನಾಗೌರ್", te: "నాగౌర్", ta: "நாகௌர்", ml: "നാഗൗർ" }, subunits: ["Nagaur", "Merta", "Degana", "Didwana", "Kuchaman City", "Ladnun", "Jayal", "Makrana", "Parbatsar"] },
      { en: "Sri Ganganagar", localized: { en: "Sri Ganganagar", hi: "श्री गंगानगर", kn: "ಶ್ರೀ ಗಂಗಾನಗರ", te: "శ్రీ గంగానగర్", ta: "ஸ்ரீ கங்காநகர்", ml: "ശ്രീ ഗംഗാനഗർ" }, subunits: ["Sri Ganganagar", "Suratgarh", "Raisinghnagar", "Anupgarh", "Sadulshahar", "Karanpur", "Padampur", "Vijaynagar"] },
      { en: "Udaipur", localized: { en: "Udaipur", hi: "उदयपुर", kn: "ಉದಯಪುರ", te: "ఉదయ్‌పూర్", ta: "உதய்பூர்", ml: "ഉദയ്പൂർ" }, subunits: ["Girwa (Udaipur)", "Vallabhnagar", "Mavli", "Salumber", "Kherwara", "Jhadol", "Gogunda", "Rishabhdeo"] }
    ]
  },
  Sikkim: {
    name: { en: "Sikkim", hi: "सिक्किम", kn: "ಸಿಕ್ಕಿಂ", te: "సిక్కిం", ta: "சிக்கிம்", ml: "സിക്കിം" },
    districts: [
      { en: "East Sikkim (Gangtok)", localized: { en: "East Sikkim (Gangtok)", hi: "गंगटोक", kn: "ಗ್ಯಾಂಗ್ಟಕ್", te: "గాంగ్‌టక్", ta: "கேங்டாக்", ml: "ഗാങ്‌ടോക്ക്" }, subunits: ["Gangtok", "Pakyong", "Rongli"] },
      { en: "South Sikkim (Namchi)", localized: { en: "South Sikkim (Namchi)", hi: "नामची", kn: "ನಾಮ್ಚಿ", te: "నామ్చి", ta: "நாம்ச்சி", ml: "നാംചി" }, subunits: ["Namchi", "Ravangla", "Jorethang"] },
      { en: "West Sikkim (Gyalshing)", localized: { en: "West Sikkim (Gyalshing)", hi: "ग्यालशिंग", kn: "ಗ್ಯಾಲ್ಶಿಂಗ್", te: "గ్యాల్‌షింగ్", ta: "கியால்ஷிங்", ml: "ഗ്യാൽഷിംഗ്" }, subunits: ["Gyalshing", "Soreng", "Dentan"] }
    ]
  },
  "Tamil Nadu": {
    name: { en: "Tamil Nadu", hi: "तमिलनाडु", kn: "ತಮಿಳುನಾಡು", te: "తమిళనాడు", ta: "தமிழ்நாடு", ml: "തമിഴ്നാട്" },
    districts: [
      { en: "Chennai", localized: { en: "Chennai", hi: "चेन्नई", kn: "ಚೆನ್ನೈ", te: "చెన్నై", ta: "சென்னை", ml: "ചെന്നൈ" }, subunits: ["Egmore", "Guindy", "Mylapore", "Tondiarpet", "Velachery", "Aminjikarai", "Ayanavaram", "Mambalam"] },
      { en: "Coimbatore", localized: { en: "Coimbatore", hi: "कोयंबटूर", kn: "ಕೊಯಮತ್ತೂರು", te: "కోయంబత్తూర్", ta: "கோயம்புத்தூர்", ml: "കോയമ്പത്തൂർ" }, subunits: ["Coimbatore North", "Coimbatore South", "Pollachi", "Mettupalayam", "Sulur", "Annur", "Kinathukadavu", "Valparai"] },
      { en: "Erode", localized: { en: "Erode", hi: "इरोड", kn: "ಈರೋಡ್", te: "ఈరోడ్", ta: "ஈரோடு", ml: "ഈറോഡ്" }, subunits: ["Erode", "Bhavani", "Gobichettipalayam", "Perundurai", "Sathyamangalam", "Anthiyur", "Kodumudi", "Thalavadi"] },
      { en: "Madurai", localized: { en: "Madurai", hi: "मदुरै", kn: "ಮಧುರೈ", te: "మధురై", ta: "மதுரை", ml: "മധുര" }, subunits: ["Madurai North", "Madurai South", "Melur", "Thirumangalam", "Usilampatti", "Vadipatti", "Peraiyur"] },
      { en: "Salem", localized: { en: "Salem", hi: "सलेम", kn: "ಸೇಲಂ", te: "సేలం", ta: "சேலம்", ml: "സേലം" }, subunits: ["Salem", "Attur", "Mettur", "Omalur", "Sankari", "Edappadi", "Yercaud", "Gangavalli", "Kadayampatti"] },
      { en: "Thanjavur", localized: { en: "Thanjavur", hi: "तंजावुर", kn: "ತಂಜಾವೂರು", te: "తంజావూరు", ta: "தஞ்சாவூர்", ml: "തഞ്ചാവൂർ" }, subunits: ["Thanjavur", "Kumbakonam", "Papanasam", "Pattukkottai", "Orathanadu", "Peravurani", "Thiruvaiyaru"] },
      { en: "Tiruchirappalli", localized: { en: "Tiruchirappalli", hi: "तिरुचिरापल्ली", kn: "ತಿರುಚಿರಾಪಳ್ಳಿ", te: "తిరుచిరాపల్లి", ta: "திருச்சிராப்பள்ளி", ml: "തിരുച്ചിറപ്പള്ളി" }, subunits: ["Tiruchirappalli East", "Tiruchirappalli West", "Srirangam", "Lalgudi", "Manapparai", "Musiri", "Thuraiyur", "Thottiyam"] },
      { en: "Tirunelveli", localized: { en: "Tirunelveli", hi: "तिरुनेलवेली", kn: "ತಿರುನೆಲ್ವೇಲಿ", te: "తిరునెల్వేలి", ta: "திருநெல்வேலி", ml: "തിരുനെൽവേലി" }, subunits: ["Tirunelveli", "Palayamkottai", "Ambasamudram", "Nanguneri", "Radhapuram", "Cheranmahadevi"] },
      { en: "Vellore", localized: { en: "Vellore", hi: "वेल्लोर", kn: "ವೆಲ್ಲೂರು", te: "వెల్లూరు", ta: "வேலூர்", ml: "വെല്ലൂർ" }, subunits: ["Vellore", "Katpadi", "Gudiyatham", "Anaicut", "Pernambut", "Kaniyambadi"] }
    ]
  },
  Telangana: {
    name: { en: "Telangana", hi: "तेलंगाना", kn: "ತೆಲಂಗಾಣ", te: "తెలంగాణ", ta: "தெலுங்கானா", ml: "തെലങ്കാന" },
    districts: [
      { en: "Hyderabad", localized: { en: "Hyderabad", hi: "हैदराबाद", kn: "ಹೈದರಾಬಾದ್", te: "హైదరాబాద్", ta: "ஹைதராபாத்", ml: "ഹൈദരാബാദ്" }, subunits: ["Amberpet", "Asifnagar", "Bahadurpura", "Charminar", "Golconda", "Khairatabad", "Musheerabad", "Secunderabad", "Shaikpet"] },
      { en: "Karimnagar", localized: { en: "Karimnagar", hi: "करीमनगर", kn: "ಕರೀಂನಗರ", te: "కరీంనగర్", ta: "கரீம்நகர்", ml: "കരിംനഗർ" }, subunits: ["Karimnagar", "Huzurabad", "Manakondur", "Choppadandi", "Jammikunta", "Gangadhara"] },
      { en: "Khammam", localized: { en: "Khammam", hi: "खम्मम", kn: "ಖಮ್ಮಂ", te: "ఖమ్మం", ta: "கம்மம்", ml: "ഖമ്മം" }, subunits: ["Khammam Urban", "Khammam Rural", "Kallur", "Madhira", "Sathupalli", "Wyra", "Kusumanchi"] },
      { en: "Nalgonda", localized: { en: "Nalgonda", hi: "नलगोंडा", kn: "ನಲ್ಗೊಂಡ", te: "నల్గొండ", ta: "நல்கொண்டா", ml: "നൽഗൊണ്ട" }, subunits: ["Nalgonda", "Miryalaguda", "Devarakonda", "Nakrekal", "Munugode", "Narketpally", "Haliya"] },
      { en: "Nizamabad", localized: { en: "Nizamabad", hi: "निज़ामाबाद", kn: "ನಿಜಾಮಾಬಾದ್", te: "నిజామాబాద్", ta: "நிசாமாபாத்", ml: "നിസാമാബാദ്" }, subunits: ["Nizamabad North", "Nizamabad South", "Armoor", "Bodhan", "Bheemgal", "Varni", "Dichpally"] },
      { en: "Warangal", localized: { en: "Warangal", hi: "वारंगल", kn: "ವರಂಗಲ್", te: "వరంగల్", ta: "வாரங்கல்", ml: "വാറങ്കൽ" }, subunits: ["Warangal", "Hanumakonda", "Narsampet", "Wardhannapet", "Parkal", "Geesugonda"] }
    ]
  },
  Tripura: {
    name: { en: "Tripura", hi: "त्रिपुरा", kn: "ತ್ರಿಪುರ", te: "త్రిపుర", ta: "திரிபுரா", ml: "ത്രിപുര" },
    districts: [
      { en: "Dhalai", localized: { en: "Dhalai", hi: "धलाई", kn: "ಧಲೈ", te: "ధలై", ta: "தலாய்", ml: "ധലായ്" }, subunits: ["Ambassa", "Kamalpur", "Gandacherra", "Longtharai Valley"] },
      { en: "South Tripura", localized: { en: "South Tripura", hi: "दक्षिण त्रिपुरा", kn: "ದಕ್ಷಿಣ ತ್ರಿಪುರ", te: "దక్షిణ త్రిపుర", ta: "தெற்கு திரிபுரா", ml: "തെക്കൻ ത്രിപുര" }, subunits: ["Belonia", "Santirbazar", "Sabroom"] },
      { en: "West Tripura (Agartala)", localized: { en: "West Tripura (Agartala)", hi: "पश्चिम त्रिपुरा (अगरतला)", kn: "ಪಶ್ಚಿಮ ತ್ರಿಪುರ", te: "పశ్చిమ త్రిపుర", ta: "மேற்கு திரிபுரா", ml: "പടിഞ്ഞാറൻ ത്രിപുര" }, subunits: ["Agartala Sadar", "Jirania", "Mohanpur", "Mandwi"] }
    ]
  },
  "Uttar Pradesh": {
    name: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश", kn: "ಉತ್ತರ ಪ್ರದೇಶ", te: "ఉత్తర ప్రదేశ్", ta: "உத்தரப் பிரதேசம்", ml: "ഉത്തർപ്രദേശ്" },
    districts: [
      { en: "Agra", localized: { en: "Agra", hi: "आगरा", kn: "ಆಗ್ರಾ", te: "ఆగ్రా", ta: "ஆக்ரா", ml: "ആഗ്ര" }, subunits: ["Agra", "Etmadpur", "Fatehabad", "Kheragarh", "Bah", "Kiraoli", "Achhnera"] },
      { en: "Aligarh", localized: { en: "Aligarh", hi: "अलीगढ़", kn: "ಅಲಿಗಢ್", te: "అలీగఢ్", ta: "அலிகார்", ml: "അലിഗഡ്" }, subunits: ["Koil (Aligarh)", "Khair", "Atrauli", "Iglas", "Gabhana"] },
      { en: "Ayodhya", localized: { en: "Ayodhya", hi: "अयोध्या", kn: "ಅಯೋಧ್ಯೆ", te: "అయోధ్య", ta: "அயோத்தி", ml: "അയോധ്യ" }, subunits: ["Sadar (Ayodhya)", "Sohawal", "Rudauli", "Bikapur", "Milkipur"] },
      { en: "Bareilly", localized: { en: "Bareilly", hi: "बरेली", kn: "ಬರೇಲಿ", te: "బరేలీ", ta: "பரேலி", ml: "ബറേലി" }, subunits: ["Bareilly", "Aonla", "Baheri", "Faridpur", "Nawabganj", "Mirganj"] },
      { en: "Gorakhpur", localized: { en: "Gorakhpur", hi: "गोरखपुर", kn: "ಗೋರಖ್‌ಪುರ", te: "గోరఖ్‌పూర్", ta: "கோரக்பூர்", ml: "ഗോരഖ്പൂർ" }, subunits: ["Gorakhpur Sadar", "Sahjanwa", "Chauri Chaura", "Bansgaon", "Khajni", "Campierganj", "Gola"] },
      { en: "Jhansi", localized: { en: "Jhansi", hi: "झांसी", kn: "ಝಾನ್ಸಿ", te: "ఝాన్సీ", ta: "ஜான்சி", ml: "ഝാൻസി" }, subunits: ["Jhansi", "Mauranipur", "Moth", "Garautha", "Tahrauli", "Babina"] },
      { en: "Kanpur Nagar", localized: { en: "Kanpur Nagar", hi: "कानपुर नगर", kn: "ಕಾನ್ಪುರ ನಗರ", te: "కాన్పూర్ నగర్", ta: "கான்பூர் நகர்", ml: "കാൺപൂർ നഗർ" }, subunits: ["Kanpur Sadar", "Ghatampur", "Bilhaur", "Narwal", "Kalyanpur"] },
      { en: "Lucknow", localized: { en: "Lucknow", hi: "लखनऊ", kn: "ಲಕ್ನೋ", te: "లక్నో", ta: "லக்னோ", ml: "ലഖ്നൗ" }, subunits: ["Lucknow Sadar", "Bakshi Ka Talab (BKT)", "Malihabad", "Mohanlalganj", "Sarojini Nagar", "Chinhat", "Kakori", "Gosainganj"] },
      { en: "Mathura", localized: { en: "Mathura", hi: "मथुरा", kn: "ಮಥುರಾ", te: "మధుర", ta: "மதுரா", ml: "മഥുര" }, subunits: ["Mathura", "Vrindavan", "Goverdhan", "Chhata", "Mant", "Baldeo"] },
      { en: "Meerut", localized: { en: "Meerut", hi: "मेरठ", kn: "ಮೀರತ್", te: "మీరట్", ta: "மீரட்", ml: "മീററ്റ്" }, subunits: ["Meerut", "Mawana", "Sardhana", "Hastinapur", "Daurala", "Kithore"] },
      { en: "Moradabad", localized: { en: "Moradabad", hi: "मुरादाबाद", kn: "ಮೊರಾದಾಬಾದ್", te: "మొరాదాబాద్", ta: "மொராதாபாத்", ml: "മൊറാദാബാദ്" }, subunits: ["Moradabad", "Kanth", "Bilari", "Thakurdwara"] },
      { en: "Prayagraj (Allahabad)", localized: { en: "Prayagraj (Allahabad)", hi: "प्रयागराज", kn: "ಪ್ರಯಾಗ್‌ರಾಜ್", te: "ప్రయాగ్‌రాజ్", ta: "பிரயாக்ராஜ்", ml: "പ്രയാഗ്‌രാജ്" }, subunits: ["Sadar (Prayagraj)", "Phulpur", "Soraon", "Handia", "Karchana", "Bara", "Meja", "Koraon"] },
      { en: "Saharanpur", localized: { en: "Saharanpur", hi: "सहारनपुर", kn: "ಸಹರಾನ್‌ಪುರ", te: "సహారన్‌పూర్", ta: "சஹாரன்பூர்", ml: "സഹാറൻപൂർ" }, subunits: ["Saharanpur", "Deoband", "Nakur", "Behat", "Rampur Maniharan"] },
      { en: "Varanasi", localized: { en: "Varanasi", hi: "वाराणसी", kn: "ವಾರಣಾಸಿ", te: "వారణాసి", ta: "வாரணாசி", ml: "വാരാണസി" }, subunits: ["Varanasi Sadar", "Pindra", "Raja Talab", "Shivpur", "Kashi"] }
    ]
  },
  Uttarakhand: {
    name: { en: "Uttarakhand", hi: "उत्तराखंड", kn: "ಉತ್ತರಾಖಂಡ", te: "ఉత్తరాఖండ్", ta: "உத்தரகண்ட்", ml: "ഉത്തരാഖണ്ഡ്" },
    districts: [
      { en: "Dehradun", localized: { en: "Dehradun", hi: "देहरादून", kn: "ಡೆಹ್ರಾಡೂನ್", te: "డెహ్రాడూన్", ta: "டேராடூன்", ml: "ഡെറാഡൂൺ" }, subunits: ["Dehradun", "Rishikesh", "Vikasnagar", "Chakrata", "Kalsi", "Doiwala"] },
      { en: "Haridwar", localized: { en: "Haridwar", hi: "हरिद्वार", kn: "ಹರಿದ್ವಾರ", te: "హరిద్వార్", ta: "ஹரித்வார்", ml: "ഹരിദ്വാർ" }, subunits: ["Haridwar", "Roorkee", "Laksar", "Bhagwanpur"] },
      { en: "Nainital", localized: { en: "Nainital", hi: "नैनीताल", kn: "ನೈನಿತಾಲ್", te: "నైనిటాల్", ta: "நைனிடால்", ml: "നൈനിറ്റാൾ" }, subunits: ["Nainital", "Haldwani", "Ramnagar", "Kashipur", "Kaladhungi", "Lalkuan"] },
      { en: "Udham Singh Nagar", localized: { en: "Udham Singh Nagar", hi: "उधम सिंह नगर", kn: "ಉಧಮ್ ಸಿಂಗ್ ನಗರ", te: "ఉధమ్ సింగ్ నగర్", ta: "உதம் சிங் நகர்", ml: "ഉധം സിംഗ് നഗർ" }, subunits: ["Rudrapur", "Kashipur", "Kichha", "Khatima", "Sitarganj", "Bazpur", "Jaspur"] }
    ]
  },
  "West Bengal": {
    name: { en: "West Bengal", hi: "पश्चिम बंगाल", kn: "ಪಶ್ಚಿಮ ಬಂಗಾಳ", te: "పశ్చిమ బెంగాల్", ta: "மேற்கு வங்காளம்", ml: "പശ്ചിമ ബംഗാൾ" },
    districts: [
      { en: "Burdwan (Purba Bardhaman)", localized: { en: "Burdwan (Purba Bardhaman)", hi: "पूर्व बर्द्धमान", kn: "ಬರ್ಧಮಾನ್", te: "బర్ధమాన్", ta: "பர்தமான்", ml: "ബർധമാൻ" }, subunits: ["Bardhaman Sadar North", "Bardhaman Sadar South", "Kalna", "Katwa", "Memari", "Bhatar"] },
      { en: "Hooghly", localized: { en: "Hooghly", hi: "हुगली", kn: "ಹೂಗ್ಲಿ", te: "హుగ్లీ", ta: "ஹூக்ளி", ml: "ഹൂഗ്ലി" }, subunits: ["Chinsurah", "Chandannagar", "Serampore", "Arambagh", "Singur", "Tarakeswar", "Dankuni"] },
      { en: "Kolkata", localized: { en: "Kolkata", hi: "कोलकाता", kn: "ಕೋಲ್ಕತ್ತಾ", te: "కోల్‌కతా", ta: "கொல்கத்தா", ml: "കൊൽക്കത്ത" }, subunits: ["Kolkata North", "Kolkata South", "Alipore", "Salt Lake", "Jadavpur", "Behala", "New Town"] },
      { en: "Malda", localized: { en: "Malda", hi: "मालदा", kn: "ಮಾಲ್ಡಾ", te: "మాల్దా", ta: "மால்டா", ml: "മാൽഡ" }, subunits: ["English Bazar", "Chanchal", "Old Malda", "Gazole", "Habibpur", "Kaliachak"] },
      { en: "Murshidabad", localized: { en: "Murshidabad", hi: "मुर्शिदाबाद", kn: "ಮುರ್ಷಿದಾಬಾದ್", te: "ముర్షిదాబాద్", ta: "முர்ஷிதாபாத்", ml: "മുർഷിദാബാദ്" }, subunits: ["Berhampore", "Lalbagh", "Jangipur", "Kandi", "Domkal"] },
      { en: "North 24 Parganas", localized: { en: "North 24 Parganas", hi: "उत्तर 24 परगना", kn: "ಉತ್ತರ 24 ಪರಗಣ", te: "ఉత్తర 24 పరగణాలు", ta: "வடக்கு 24 பர்கானாக்கள்", ml: "വടക്കൻ 24 പർഗാനാസ്" }, subunits: ["Barasat", "Barrackpore", "Bangaon", "Basirhat", "Bidhannagar"] },
      { en: "Siliguri (Darjeeling Pl.)", localized: { en: "Siliguri (Darjeeling Pl.)", hi: "सिलीगुड़ी (दार्जिलिंग)", kn: "ಸಿಲಿಗುರಿ", te: "సిలిగురి", ta: "சிலிகுரி", ml: "സിലിഗുരി" }, subunits: ["Siliguri", "Matigara", "Naxalbari", "Phansidewa", "Kharibari"] }
    ]
  },

  // --- 8 Union Territories ---
  "Andaman and Nicobar Islands": {
    name: { en: "Andaman and Nicobar Islands", hi: "अंडमान और निकोबार द्वीप समूह", kn: "ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್", te: "అండమాన్ & నికోబార్ దీవులు", ta: "அந்தமான் நிகோபார் தீவுகள்", ml: "ആൻഡമാൻ നിക്കോബാർ" },
    districts: [
      { en: "North and Middle Andaman", localized: { en: "North and Middle Andaman", hi: "उत्तर और मध्य अंडमान", kn: "ಉತ್ತರ ಮತ್ತು ಮಧ್ಯ ಅಂಡಮಾನ್", te: "ఉత్తర & మధ్య అండమాన్", ta: "வடக்கு மற்றும் மத்திய அந்தமான்", ml: "വടക്കൻ & മധ്യ ആൻഡമാൻ" }, subunits: ["Mayabunder", "Diglipur", "Rangat"] },
      { en: "South Andaman", localized: { en: "South Andaman", hi: "दक्षिण अंडमान", kn: "ದಕ್ಷಿಣ ಅಂಡಮಾನ್", te: "దక్షిణ అండమాన్", ta: "தெற்கு அந்தமான்", ml: "തെക്കൻ ആൻഡമാൻ" }, subunits: ["Port Blair", "Ferrargunj", "Little Andaman"] }
    ]
  },
  Chandigarh: {
    name: { en: "Chandigarh", hi: "चंडीगढ़", kn: "ಚಂಡೀಗಢ", te: "చండీగఢ్", ta: "சண்டிகர்", ml: "ചണ്ഡീഗഡ്" },
    districts: [{ en: "Chandigarh", localized: { en: "Chandigarh", hi: "चंडीगढ़", kn: "ಚಂಡೀಗಢ", te: "చండీగఢ్", ta: "சண்டிகர்", ml: "ചണ്ഡീഗഡ്" }, subunits: ["Sector 1-30", "Sector 31-60", "Manimajra", "Industrial Area"] }]
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    name: { en: "Dadra and Nagar Haveli and Daman and Diu", hi: "दादरा और नगर हवेली और दमन और दीव", kn: "ದಾದ್ರಾ ಮತ್ತು ನಗರ ಹವೇಲಿ ಮತ್ತು ದಮನ್ ಮತ್ತು ದಿಯು", te: "దాద్రా & నగర్ హవేలి", ta: "தாத்ரா நாகர் ஹவேலி டாமன் டையூ", ml: "ദാദ്ര & നഗർ ഹവേലി" },
    districts: [
      { en: "Dadra and Nagar Haveli", localized: { en: "Dadra and Nagar Haveli", hi: "दादरा और नगर हवेली", kn: "ದಾದ್ರಾ ಮತ್ತು ನಗರ ಹವೇಲಿ", te: "దాద్రా & నగర్ హవేలి", ta: "தாத்ரா நாகர் ஹவேலி", ml: "ദാദ്ര & നഗർ ഹവേലി" }, subunits: ["Silvassa", "Dadra", "Khanvel"] },
      { en: "Daman", localized: { en: "Daman", hi: "दमन", kn: "ದಮನ್", te: "దమన్", ta: "டாமன்", ml: "ദമൻ" }, subunits: ["Nani Daman", "Moti Daman"] },
      { en: "Diu", localized: { en: "Diu", hi: "दीव", kn: "ದಿಯು", te: "దియు", ta: "டையூ", ml: "ദിയു" }, subunits: ["Diu Town", "Ghoghla", "Fudam"] }
    ]
  },
  Delhi: {
    name: { en: "Delhi", hi: "दिल्ली", kn: "ದೆಹಲಿ", te: "ఢిల్లీ", ta: "டெல்லி", ml: "ഡൽഹി" },
    districts: [
      { en: "Central Delhi", localized: { en: "Central Delhi", hi: "मध्य दिल्ली", kn: "ಮಧ್ಯ ದೆಹಲಿ", te: "సెంట్రల్ ఢిల్లీ", ta: "மத்திய டெல்லி", ml: "സെൻട്രൽ ഡൽഹി" }, subunits: ["Karol Bagh", "Pahar Ganj", "Kotwali", "Civil Lines"] },
      { en: "East Delhi", localized: { en: "East Delhi", hi: "पूर्वी दिल्ली", kn: "ಪೂರ್ವ ದೆಹಲಿ", te: "తూర్పు ఢిల్లీ", ta: "கிழக்கு டெல்லி", ml: "കിഴക്കൻ ഡൽഹി" }, subunits: ["Gandhi Nagar", "Preet Vihar", "Mayur Vihar", "Patparganj"] },
      { en: "New Delhi", localized: { en: "New Delhi", hi: "नई दिल्ली", kn: "ಹೊಸ ದೆಹಲಿ", te: "న్యూఢిల్లీ", ta: "புது தில்லி", ml: "ന്യൂഡൽഹി" }, subunits: ["Connaught Place", "Chanakyapuri", "Delhi Cantt", "Vasant Vihar"] },
      { en: "North Delhi", localized: { en: "North Delhi", hi: "उत्तरी दिल्ली", kn: "ಉತ್ತರ ದೆಹಲಿ", te: "ఉత్తర ఢిల్లీ", ta: "வடக்கு டெல்லி", ml: "വടക്കൻ ഡൽഹി" }, subunits: ["Model Town", "Narela", "Alipur", "Burari", "Rohini"] },
      { en: "South Delhi", localized: { en: "South Delhi", hi: "दक्षिणी दिल्ली", kn: "ದಕ್ಷಿಣ ದೆಹಲಿ", te: "దక్షిణ ఢిల్లీ", ta: "தெற்கு டெல்லி", ml: "തെക്കൻ ഡൽഹി" }, subunits: ["Hauz Khas", "Saket", "Mehrauli", "Greater Kailash", "Badarpur"] },
      { en: "West Delhi", localized: { en: "West Delhi", hi: "पश्चिमी दिल्ली", kn: "ಪಶ್ಚಿಮ ದೆಹಲಿ", te: "పశ్చిమ ఢిల్లీ", ta: "மேற்கு டெல்லி", ml: "പടിഞ്ഞാറൻ ഡൽഹി" }, subunits: ["Patel Nagar", "Punjabi Bagh", "Rajouri Garden", "Janakpuri", "Dwarka"] }
    ]
  },
  "Jammu and Kashmir": {
    name: { en: "Jammu and Kashmir", hi: "जम्मू और कश्मीर", kn: "ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ", te: "జమ్మూ & కాశ్మీర్", ta: "ஜம்மு காஷ்மீர்", ml: "ജമ്മു കശ്മീർ" },
    districts: [
      { en: "Anantnag", localized: { en: "Anantnag", hi: "अनंतनाग", kn: "ಅನಂತನಾಗ್", te: "అనంతనాగ్", ta: "அனந்த்நாக்", ml: "അനന്ത്നാഗ്" }, subunits: ["Anantnag", "Bijbehara", "Pahalgam", "Dooru", "Kokernag"] },
      { en: "Baramulla", localized: { en: "Baramulla", hi: "बारामूला", kn: "ಬಾರಾಮುಲ್ಲಾ", te: "బారాముల్లా", ta: "பாரமுல்லா", ml: "ബാരാമുള്ള" }, subunits: ["Baramulla", "Sopore", "Pattan", "Uri", "Tangmarg (Gulmarg)"] },
      { en: "Jammu", localized: { en: "Jammu", hi: "जम्मू", kn: "ಜಮ್ಮು", te: "జమ్మూ", ta: "ஜம்மு", ml: "ജമ്മു" }, subunits: ["Jammu Urban", "Jammu South", "R.S. Pura", "Akhnoor", "Bishnah", "Nagrota"] },
      { en: "Kathua", localized: { en: "Kathua", hi: "कठुआ", kn: "ಕಥುವಾ", te: "కథువా", ta: "கதுவா", ml: "കത്വ" }, subunits: ["Kathua", "Hiranagar", "Billawar", "Basholi", "Bani"] },
      { en: "Srinagar", localized: { en: "Srinagar", hi: "श्रीनगर", kn: "ಶ್ರೀನಗರ", te: "శ్రీనగర్", ta: "ஸ்ரீநகர்", ml: "ശ്രീനഗർ" }, subunits: ["Srinagar North", "Srinagar South", "Eidgah", "Pantha Chowk"] }
    ]
  },
  Ladakh: {
    name: { en: "Ladakh", hi: "लद्दाख", kn: "ಲಡಾಖ್", te: "లడఖ్", ta: "லடாக்", ml: "ലഡാക്ക്" },
    districts: [
      { en: "Kargil", localized: { en: "Kargil", hi: "कारगिल", kn: "ಕಾರ್ಗಿಲ್", te: "కార్గిల్", ta: "கார்கில்", ml: "കാർഗിൽ" }, subunits: ["Kargil", "Drass", "Sankoo", "Zanskar"] },
      { en: "Leh", localized: { en: "Leh", hi: "लेह", kn: "ಲೇಹ್", te: "లేహ్", ta: "லே", ml: "ലേ" }, subunits: ["Leh", "Nubra (Diskit)", "Khaltsi", "Nyoma", "Durbuk"] }
    ]
  },
  Lakshadweep: {
    name: { en: "Lakshadweep", hi: "लक्षद्वीप", kn: "ಲಕ್ಷದ್ವೀಪ", te: "లక్షద్వీప్", ta: "லட்சத்தீவு", ml: "ലക്ഷദ്വീപ്" },
    districts: [{ en: "Lakshadweep", localized: { en: "Lakshadweep", hi: "लक्षद्वीप", kn: "ಲಕ್ಷದ್ವೀಪ", te: "లక్షద్వీప్", ta: "லட்சத்தீவு", ml: "ലക്ഷദ്വീപ്" }, subunits: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy", "Kalpeni"] }]
  },
  Puducherry: {
    name: { en: "Puducherry", hi: "पुडुचेरी", kn: "ಪುದುಚೇರಿ", te: "పుదుచ్చేరి", ta: "புதுச்சேரி", ml: "പുതുച്ചേരി" },
    districts: [
      { en: "Karaikal", localized: { en: "Karaikal", hi: "कराईकल", kn: "ಕಾರೈಕಲ್", te: "కారైకల్", ta: "காரைக்கால்", ml: "കാരയ്ക്കൽ" }, subunits: ["Karaikal", "Thirunallar", "Kottucherry", "Nedungadu"] },
      { en: "Puducherry", localized: { en: "Puducherry", hi: "पुडुचेरी", kn: "ಪುದುಚೇರಿ", te: "పుదుచ్చేరి", ta: "புதுச்சேரி", ml: "പുതുച്ചേരി" }, subunits: ["Puducherry Town", "Ozhukarai", "Villianur", "Bahour"] }
    ]
  }
};

/* Sort States & Districts Alphabetically */
const SORTED_STATES_KEYS = Object.keys(RAW_INDIA_STATES).sort((a, b) => a.localeCompare(b));

const INDIA_STATES_DATABASE: Record<string, StateStructure> = {};
for (const stateKey of SORTED_STATES_KEYS) {
  const stateData = RAW_INDIA_STATES[stateKey];
  INDIA_STATES_DATABASE[stateKey] = {
    ...stateData,
    districts: [...stateData.districts].sort((a, b) => a.en.localeCompare(b.en))
  };
}

/* =========================================================
   LOADING STAGES
========================================================= */

const LOADING_STAGES: LoadingStage[] = [
  {
    id: 1,
    labels: {
      en: "Initializing multi-agent network...",
      hi: "बहु-एजेंट नेटवर्क प्रारंभ किया जा रहा है...",
      kn: "ಮಲ್ಟಿ-ಏಜೆಂಟ್ ನೆಟ್‌ವರ್ಕ್ ಪ್ರಾರಂಭಿಸಲಾಗುತ್ತಿದೆ...",
      te: "మల్టీ-ఏజెంట్ నెట్‌వర్క్ ప్రారంభించబడుతోంది...",
      ta: "மல்டி-ஏஜெண்ட் நெட்வொர்க் தொடங்கப்படுகிறது...",
      ml: "മൾട്ടി-ഏജന്റ് ശൃംഖല ആരംഭിക്കുന്നു...",
    },
  },
  {
    id: 2,
    labels: {
      en: "Weather Agent calling Open-Meteo API via MCP...",
      hi: "मौसम एजेंट Open-Meteo से पूर्वानुमान ले रहा है...",
      kn: "ಹವಾಮಾನ ಏಜೆಂಟ್ ಲೈವ್ ಮುನ್ಸೂಚನೆ ಪಡೆಯುತ್ತಿದೆ...",
      te: "వాతావరణ ఏజెంట్ వాతావరణ సమాచారాన్ని సేకరిస్తోంది...",
      ta: "வானிலை ஏஜெண்ட் நேரடி முன்னறிவிப்பைப் பெறுகிறது...",
      ml: "കാലാവസ്ഥാ ഏജന്റ് തത്സമയ വിവരങ്ങൾ ശേഖരിക്കുന്നു...",
    },
  },
  {
    id: 3,
    labels: {
      en: "Crop/Soil Agent evaluating biological compatibility...",
      hi: "फसल/मिट्टी एजेंट जैविक अनुकूलता का मूल्यांकन कर रहा है...",
      kn: "ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      te: "పంట/నేల ఏజెంట్ జీవ అనుకూలతను అంచనా వేస్తోంది...",
      ta: "பயிர்/மண் ஏஜெண்ட் பொருத்தத்தை ஆய்வு செய்கிறது...",
      ml: "വിള-മണ്ണ് അനുയോജ്യത വിലയിരുത്തുന്നു...",
    },
  },
  {
    id: 4,
    labels: {
      en: "Market Agent analyzing mandi price trends and MSP...",
      hi: "बाजार एजेंट मंडी दरों और एमएसपी का विश्लेषण कर रहा है...",
      kn: "ಮಾರುಕಟ್ಟೆ ಏಜೆಂಟ್ ಮಂಡಿ ದರ ಮತ್ತು MSP ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      te: "మార్కెట్ ఏజెంట్ ధరలు మరియు MSP ట్రెండ్‌లను విశ్లేషిస్తోంది...",
      ta: "சந்தை ஏஜெண்ட் சந்தை விலை மற்றும் MSP ஆய்வு செய்கிறது...",
      ml: "മാർക്കറ്റ് ഏജന്റ് വിലകളും MSP യും വിശകലനം ചെയ്യുന്നു...",
    },
  },
  {
    id: 5,
    labels: {
      en: "Orchestrator synthesising final recommendation...",
      hi: "मुख्य समन्वयक अंतिम निर्णय तैयार कर रहा है...",
      kn: "ಮುಖ್ಯ AI ವ್ಯವಸ್ಥೆಯು ಅಂತಿಮ ನಿರ್ಧಾರವನ್ನು ರೂಪಿಸುತ್ತಿದೆ...",
      te: "ఆర్కెస్ట్రేటర్ తుది సిఫార్సును సిద్ధం చేస్తోంది...",
      ta: "ஒருங்கிணைப்பாளர் இறுதி முடிவை உருவாக்குகிறது...",
      ml: "ഓർക്കസ്ട്രേറ്റർ അന്തിമ തീരുമാനം തയ്യാറാക്കുന്നു...",
    },
  },
];

/* =========================================================
   PRICE FORMATTER
========================================================= */

function simFormat(num: number | string | undefined | null) {
  const parsed = Number(num);

  if (!Number.isFinite(parsed)) {
    return "0";
  }

  return parsed.toLocaleString("en-IN");
}

/* =========================================================
   MULTILINGUAL TEXT HELPER
========================================================= */

function getLocalizedText(
  input: string | Record<string, string> | undefined | null,
  targetLang: Language
): string {
  if (!input) return "";

  if (typeof input === "object") {
    return input[targetLang] || input["en"] || Object.values(input)[0] || "";
  }

  // Fallback for slash-separated formats (e.g. "English / Hindi / Kannada / Telugu / Tamil / Malayalam")
  const parts = String(input).split("/");
  const langIndexMap: Record<Language, number> = {
    en: 0,
    hi: 1,
    kn: 2,
    te: 3,
    ta: 4,
    ml: 5,
  };

  const targetIndex = langIndexMap[targetLang] ?? 0;
  if (parts.length > targetIndex) {
    return parts[targetIndex].trim();
  }

  return parts[0].trim();
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  const [cropType, setCropType] = useState(
    CROPS[0]?.id || "Maize"
  );
  const [cropSearch, setCropSearch] = useState("");

  const [soilType, setSoilType] = useState("alluvial");

  // Step-by-Step Geographical Hierarchy States
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [selectedDistrict, setSelectedDistrict] = useState("Bengaluru Urban");
  const [talukSearch, setTalukSearch] = useState("");
  const [showTalukDropdown, setShowTalukDropdown] = useState(false);

  const [customQuestion, setCustomQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LOADING_STAGES[0]
  );

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [mounted, setMounted] = useState(false);

  const talukInputRef = useRef<HTMLDivElement>(null);

  const activeParamsRef = useRef<{
    cropType: string;
    soilType: string;
    location: string;
    question: string;
  } | null>(null);

  const t = TRANSLATIONS[lang];

  /* =======================================================
     DISTRICTS FOR SELECTED STATE (ALPHABETICAL)
  ======================================================= */

  const currentDistricts = useMemo(() => {
    if (!selectedState || !INDIA_STATES_DATABASE[selectedState]) {
      return [];
    }
    return INDIA_STATES_DATABASE[selectedState].districts;
  }, [selectedState]);

  /* =======================================================
     AUTOCOMPLETE SUGGESTIONS FOR TALUK / GRAMA PANCHAYATH / VILLAGE
  ======================================================= */

  const talukSuggestions = useMemo(() => {
    const query = talukSearch.trim().toLowerCase();
    if (query.length < 2) return [];

    const matchedDistrictObj = currentDistricts.find(
      (d) => d.en.toLowerCase() === selectedDistrict.toLowerCase()
    );

    const availableSubunits = matchedDistrictObj?.subunits || [];
    
    return availableSubunits
      .filter((unit) => unit.toLowerCase().includes(query))
      .sort((a, b) => a.localeCompare(b));
  }, [talukSearch, selectedDistrict, currentDistricts]);

  /* =======================================================
     COMPOSED LOCATION HELPER
  ======================================================= */

  const composedLocation = useMemo(() => {
    const dist = selectedDistrict.trim();
    const st = selectedState.trim();
    const tp = talukSearch.trim();

    const parts = [tp, dist, st].filter(Boolean);
    return parts.join(", ");
  }, [talukSearch, selectedDistrict, selectedState]);

  /* =======================================================
     CLOSE AUTOCOMPLETE ON CLICK OUTSIDE
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        talukInputRef.current &&
        !talukInputRef.current.contains(event.target as Node)
      ) {
        setShowTalukDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =======================================================
     MEMOIZED CROPS WITH SEARCH FILTER
  ======================================================= */

  const availableCrops = useMemo(() => {
    if (!cropSearch.trim()) return CROPS;
    const q = cropSearch.toLowerCase().trim();
    return CROPS.filter((c) => {
      const names = Object.values(c.name).map((n) => n.toLowerCase());
      return names.some((n) => n.includes(q));
    });
  }, [cropSearch]);

  /* =======================================================
     MOUNT
  ======================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =======================================================
     CHART DATA GENERATOR HELPER
  ======================================================= */

  const updateChartFromData = (data: any) => {
    if (data?.transparencyData?.market) {
      const market = data.transparencyData.market;
      const hist = Array.isArray(market.historicalPrices)
        ? market.historicalPrices
        : [];
      const proj = Array.isArray(market.projectedPrices)
        ? market.projectedPrices
        : [];

      const formatted: ChartPoint[] = [];
      const startDay = Math.max(0, hist.length - 15);

      for (let i = startDay; i < hist.length; i++) {
        const numericPrice = Number(hist[i]);
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
          continue;
        }

        formatted.push({
          name: `Day -${hist.length - 1 - i}`,
          price: numericPrice,
          type: "Historical",
        });
      }

      for (let i = 0; i < proj.length; i++) {
        const numericPrice = Number(proj[i]);
        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
          continue;
        }

        formatted.push({
          name: `Proj +${i + 1}`,
          price: numericPrice,
          type: "Projected",
        });
      }

      setChartData(formatted);
    }
  };

  /* =======================================================
     LOADING STAGE
  ======================================================= */

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (loading) {
      let stageIndex = 0;
      setLoadingStage(LOADING_STAGES[0]);

      interval = setInterval(() => {
        stageIndex = (stageIndex + 1) % LOADING_STAGES.length;
        setLoadingStage(LOADING_STAGES[stageIndex]);
      }, 1500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [loading]);

  /* =======================================================
     SPEECH CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [recognitionInstance]);

  /* =======================================================
     VOICE INPUT
  ======================================================= */

  const toggleListening = () => {
    if (isListening && recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch {
        // Ignore
      }

      setIsListening(false);
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t.speechNotSupported);
      return;
    }

    const currentLangConfig =
      SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLangConfig.speechCode;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event?.error);
      setIsListening(false);

      if (event?.error === "not-allowed") {
        alert(t.micBlocked);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event?.results?.[0]?.[0]?.transcript;
      if (speechToText) {
        setCustomQuestion(speechToText.trim());
      }
    };

    setRecognitionInstance(recognition);

    try {
      recognition.start();
    } catch (err) {
      console.error("Speech recognition start error:", err);
      setIsListening(false);
    }
  };

  /* =======================================================
     ASK BACKEND (LIVE FETCH WITH AUTOMATIC CACHE-BUSTING)
  ======================================================= */

  const handleAsk = async (
    e?: React.FormEvent,
    questionOverride?: string,
    isBackgroundSilentRefresh: boolean = false
  ) => {
    if (e) {
      e.preventDefault();
    }

    const questionToSend =
      questionOverride !== undefined ? questionOverride : customQuestion;

    if (questionToSend.length > 300) {
      setError(t.securityQuestion);
      return;
    }

    const sanitizedQuestion = questionToSend
      ? questionToSend.replace(/<\/?[^>]+(>|$)/g, "").trim()
      : "";

    if (!cropType) {
      setError(t.cropRequired);
      return;
    }

    if (!soilType) {
      setError(t.soilRequired);
      return;
    }

    if (!selectedState.trim()) {
      setError(t.stateRequired);
      return;
    }

    if (!selectedDistrict.trim()) {
      setError(t.districtRequired);
      return;
    }

    const finalLocation = composedLocation;

    if (!isBackgroundSilentRefresh) {
      setLoading(true);
      setError(null);
      setResult(null);
      setChartData([]);
    }

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const requestBody = {
        cropType: cropType.trim(),
        soilType: soilType.trim(),
        location: finalLocation,
        question: sanitizedQuestion,
        language: lang,
      };

      activeParamsRef.current = requestBody;

      const response = await fetch(`${apiBaseUrl}/api/query?t=${Date.now()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMessage = `Server returned code ${response.status}.`;
        try {
          const errorData = await response.json();
          if (errorData?.error) {
            errorMessage = errorData.error;
          } else if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(`${errorMessage} Make sure backend is running.`);
      }

      const data = await response.json();
      setResult(data);
      updateChartFromData(data);
    } catch (err: any) {
      console.error("Backend request failed:", err);
      if (!isBackgroundSilentRefresh) {
        setError(err?.message || "Failed to connect to backend server.");
      }
    } finally {
      if (!isBackgroundSilentRefresh) {
        setLoading(false);
      }
    }
  };

  /* =======================================================
     REAL-TIME AUTOMATIC BACKGROUND SYNC
  ======================================================= */

  useEffect(() => {
    if (!result || loading) {
      return;
    }

    const autoRefreshInterval = setInterval(() => {
      if (activeParamsRef.current && !loading) {
        console.log("[Live Visibility] Auto-refreshing real-time mandi & agent data...");
        handleAsk(undefined, activeParamsRef.current.question, true);
      }
    }, 30000);

    return () => clearInterval(autoRefreshInterval);
  }, [result, loading]);

  /* =======================================================
     QUICK QUESTIONS
  ======================================================= */

  const selectQuickQuestion = (question: string) => {
    setCustomQuestion(question);
    handleAsk(undefined, question);
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    activeParamsRef.current = null;
    setResult(null);
    setError(null);
    setCustomQuestion("");
    setChartData([]);
    setIsPanelOpen(true);
  };

  /* =======================================================
     SELECTED CROP DISPLAY
  ======================================================= */

  const selectedCropObj = CROPS.find((crop) => crop.id === cropType);
  const cropDisplayName = selectedCropObj
    ? selectedCropObj.name[lang] || selectedCropObj.name.en
    : cropType;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-slate-100 font-sans selection:bg-emerald-600 selection:text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-emerald-900/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Sprout className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                {t.title}
              </h1>
              <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest font-semibold">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Multi-Language Dropdown Selector */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="appearance-none bg-emerald-950/70 border border-emerald-800/60 hover:border-emerald-500/80 text-emerald-300 font-bold text-xs px-3.5 py-1.5 pr-8 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all cursor-pointer shadow-lg"
            >
              {SUPPORTED_LANGUAGES.map((item) => (
                <option key={item.code} value={item.code} className="bg-slate-900 text-slate-100 font-semibold">
                  {item.nativeLabel} ({item.label})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-emerald-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">

        {/* =================================================
            INPUT PAGE
        ================================================= */}

        {!result && !loading && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Welcome */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kaggle Agents for Good Capstone</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-none">
                {t.subtitle}
              </h2>

              <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
                {t.historicalProjection}
              </p>
            </div>

            {/* FORM */}
            <div className="bg-slate-900/60 border border-emerald-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl space-y-7">
              {/* CROP */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  {t.selectCrop}
                </label>

                {/* Instant Crop Search Filter */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={cropSearch}
                    onChange={(e) => setCropSearch(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-xs focus:outline-none focus:border-emerald-500 transition-all font-semibold"
                  />
                </div>

                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-semibold"
                >
                  {availableCrops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.emoji} {crop.name[lang] || crop.name.en}
                    </option>
                  ))}
                </select>

                <p className="text-[10px] text-slate-500">
                  {CROPS.length} {t.cropsAvailable}
                </p>
              </div>

              {/* SOIL */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  {t.selectSoil}
                </label>

                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-semibold"
                >
                  {SOILS.map((soil) => (
                    <option key={soil.id} value={soil.id}>
                      {soil.name[lang] || soil.name.en}
                    </option>
                  ))}
                </select>

                <p className="text-[10px] text-slate-500">
                  {SOILS.length} {t.soilTypesAvailable}
                </p>
              </div>

              {/* LOCATION HIERARCHY: STATE -> DISTRICT -> TALUK/PANCHAYATH (ALPHABETICAL CASCADE) */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-950/50 border border-emerald-950/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    {t.enterLocation}
                  </span>
                </div>

                {/* 1. State Selector (Alphabetical) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    {t.selectState}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      const newState = e.target.value;
                      setSelectedState(newState);
                      const stateData = INDIA_STATES_DATABASE[newState];
                      if (stateData && stateData.districts.length > 0) {
                        setSelectedDistrict(stateData.districts[0].en);
                      } else {
                        setSelectedDistrict("");
                      }
                      setTalukSearch("");
                      setShowTalukDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-xs md:text-sm focus:outline-none focus:border-emerald-500 transition-all font-semibold"
                  >
                    <option value="">{t.chooseState}</option>
                    {SORTED_STATES_KEYS.map((stateKey) => (
                      <option key={stateKey} value={stateKey}>
                        {INDIA_STATES_DATABASE[stateKey].name[lang] ||
                          INDIA_STATES_DATABASE[stateKey].name.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. District / City Selector (Alphabetical) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    {t.selectDistrict}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setTalukSearch("");
                      setShowTalukDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-xs md:text-sm focus:outline-none focus:border-emerald-500 transition-all font-semibold"
                  >
                    <option value="">{t.chooseDistrict}</option>
                    {currentDistricts.map((dist, idx) => (
                      <option key={idx} value={dist.en}>
                        {dist.localized[lang] || dist.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Taluk / Grama Panchayath / Village (Type 2, 3, 4 Letters for Autocomplete) */}
                <div className="space-y-1.5 relative" ref={talukInputRef}>
                  <label className="text-[11px] font-bold text-slate-300 block">
                    {t.enterTalukPanchayath}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={talukSearch}
                      onChange={(e) => {
                        setTalukSearch(e.target.value);
                        setShowTalukDropdown(true);
                      }}
                      onFocus={() => setShowTalukDropdown(true)}
                      placeholder={t.talukPlaceholder}
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-xs md:text-sm focus:outline-none focus:border-emerald-500 transition-all font-semibold"
                    />
                    {talukSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setTalukSearch("");
                          setShowTalukDropdown(false);
                        }}
                        className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Autocomplete Dropdown */}
                  {showTalukDropdown && talukSuggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-slate-900 border border-emerald-900/60 rounded-xl shadow-2xl overflow-hidden max-h-48 overflow-y-auto animate-fade-in">
                      <div className="p-2 text-[10px] font-bold text-emerald-400 bg-slate-950 border-b border-slate-800">
                        {t.suggestedLocations} ({talukSuggestions.length})
                      </div>
                      {talukSuggestions.map((item, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => {
                            setTalukSearch(item);
                            setShowTalukDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300 flex items-center justify-between border-b border-slate-800/40 last:border-0 transition-all"
                        >
                          <span>{item}</span>
                          <Check className="w-3.5 h-3.5 text-emerald-400 opacity-70" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Target Mandi Live Display */}
                <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-semibold">
                    {lang === "en" ? "Mandi Target:" : "Target Region / Mandi:"}
                  </span>
                  <span className="text-emerald-400 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    📍 {composedLocation || t.chooseLocation}
                  </span>
                </div>
              </div>

              {/* QUESTION */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  {t.customQ}
                </label>

                <div className="relative">
                  <HelpCircle className="absolute left-3 top-3.5 w-4 h-4 text-emerald-500/70" />
                  <input
                    type="text"
                    value={customQuestion}
                    maxLength={300}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder={
                      isListening ? t.listening : t.placeholderQ
                    }
                    className="w-full pl-9 pr-12 py-3 rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  />

                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-3 top-2.5 p-1.5 rounded-lg transition-all ${
                      isListening
                        ? "bg-rose-500 text-slate-950 animate-pulse"
                        : "text-emerald-400 hover:bg-emerald-950/50"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                {isListening && (
                  <p className="text-[10px] text-rose-400 font-bold animate-pulse">
                    🎤 {t.speakNow}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleAsk(e as unknown as React.FormEvent)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-black text-sm uppercase tracking-wider transition-all transform hover:scale-[1.01] hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t.askButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* QUICK QUESTIONS */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.quickQ}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[t.quickQ1, t.quickQ2, t.quickQ3, t.quickQ4].map(
                  (question, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => selectQuickQuestion(question)}
                      className="p-3 text-left rounded-xl bg-slate-950/30 border border-slate-800/80 hover:bg-slate-950/60 hover:border-emerald-800/30 text-xs text-slate-400 hover:text-emerald-300 transition-all leading-snug"
                    >
                      {question}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="max-w-xl mx-auto py-20 text-center space-y-8 animate-pulse">
            <div className="relative inline-flex">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <Sprout className="w-8 h-8 text-emerald-400 absolute inset-0 m-auto animate-bounce" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold">{t.loading}</h3>
              <div className="px-4 py-2 rounded-xl bg-slate-950/50 border border-emerald-950 text-emerald-400 text-xs inline-block font-semibold">
                {loadingStage.labels[lang] || loadingStage.labels.en}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 max-w-sm mx-auto">
              {LOADING_STAGES.map((stage) => (
                <div
                  key={stage.id}
                  className={`h-1.5 flex-1 rounded-full ${
                    loadingStage.id >= stage.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && !loading && (
          <div className="max-w-xl mx-auto bg-rose-950/20 border border-rose-900/50 p-6 rounded-2xl space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-rose-300">
              {t.connectionFailed}
            </h3>
            <p className="text-xs text-rose-400/80">{t.connectingBackend}</p>
            <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800 font-mono select-all break-words">
              {error}
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleAsk()}
                className="px-4 py-2 bg-rose-900/30 border border-rose-800 hover:bg-rose-900/50 text-xs font-bold rounded-lg text-rose-200"
              >
                {t.retry}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-300"
              >
                {t.reset}
              </button>
            </div>
          </div>
        )}

        {/* =====================================================
            RESULTS
        ===================================================== */}

        {result && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* QUERY DETAILS */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl text-xs md:text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-emerald-400 uppercase">
                  {t.queryDetails}
                </span>

                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 font-semibold">
                  {cropDisplayName}
                </span>

                <span className="text-slate-600">•</span>

                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 font-semibold">
                  {(() => {
                    const found = SOILS.find((s) => s.id === soilType);
                    return found ? found.name[lang] || found.name.en : soilType;
                  })()}
                </span>

                <span className="text-slate-600">•</span>

                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800 font-semibold text-emerald-300">
                  📍 {result.location || composedLocation}
                </span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t.reset}
              </button>
            </div>

            {/* FINAL RECOMMENDATION */}
            {result.orchestratorResponse && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t.decision}
                    </span>

                    {(() => {
                      const decision =
                        getLocalizedText(result.orchestratorResponse?.finalDecision, lang) || "";
                      const lower = decision.toLowerCase();

                      const isSell =
                        lower.includes("sell") ||
                        lower.includes("बेचें") ||
                        lower.includes("ಮಾರಿ") ||
                        lower.includes("అమ్మండి") ||
                        lower.includes("விற்கவும்") ||
                        lower.includes("വിൽക്കുക");

                      const isHold =
                        lower.includes("hold") ||
                        lower.includes("रोकें") ||
                        lower.includes("ಕಾಯಿರಿ") ||
                        lower.includes("ఆగండి") ||
                        lower.includes("காத்திருக்கவும்") ||
                        lower.includes("കാത്തിരിക്കുക");

                      let color =
                        "from-amber-500/20 to-yellow-600/10 border-amber-500/50 text-amber-300";
                      let label = t.holdRec;

                      if (isSell) {
                        color =
                          "from-emerald-500/20 to-teal-600/10 border-emerald-500/50 text-emerald-300";
                        label = t.sellRec;
                      } else if (!isHold) {
                        color =
                          "from-sky-500/20 to-blue-600/10 border-sky-500/50 text-sky-300";
                        label = decision.toUpperCase();
                      }

                      return (
                        <div
                          className={`px-5 py-3 rounded-full border bg-gradient-to-b ${color} text-sm font-black tracking-wide`}
                        >
                          {label}
                        </div>
                      );
                    })()}

                    <span className="text-xs font-bold text-slate-300">
                      {getLocalizedText(result.orchestratorResponse?.finalDecision, lang)}
                    </span>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg font-bold text-emerald-400">
                        {t.reason}
                      </h3>
                    </div>

                    <p className="text-base md:xl font-bold leading-relaxed text-slate-100">
                      "{getLocalizedText(result.orchestratorResponse?.oneLineReason, lang)}"
                    </p>

                    {customQuestion && (
                      <div className="mt-4 pt-3 border-t border-slate-900 flex gap-2 text-xs font-semibold text-slate-400">
                        <span>{t.forQuestion}</span>
                        <span className="italic text-slate-300">
                          "{customQuestion}"
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TRANSPARENCY */}
            {result.transparencyData && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-left font-bold text-sm uppercase tracking-wide text-emerald-400"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {t.transparencyTitle}
                  </div>

                  {isPanelOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isPanelOpen && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* WEATHER */}
                    {result.transparencyData.weather && (
                      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-blue-500/10 rounded-xl">
                              <CloudRain className="w-5 h-5 text-blue-400" />
                            </div>
                            <h4 className="font-extrabold text-sm">
                              {t.weatherAgent}
                            </h4>
                          </div>

                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-400">
                            WeatherAgent
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-xl">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">
                              {t.temperature}
                            </span>
                            <span className="text-lg font-extrabold">
                              {result.transparencyData.weather.currentTemp}°C
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">
                              {t.condition}
                            </span>
                            <span className="text-xs font-extrabold">
                              {getLocalizedText(
                                result.transparencyData.weather.condition,
                                lang
                              )}
                            </span>
                          </div>

                          <div className="col-span-2 pt-2 border-t border-slate-900/50">
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">
                              {t.weeklyRain}
                            </span>
                            <span className="text-xs font-extrabold text-blue-300">
                              {result.transparencyData.weather.precipitationProbability}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                            {t.advisorySummary}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-semibold mt-1">
                            {getLocalizedText(
                              result.transparencyData.weather.advisory,
                              lang
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CROP SOIL */}
                    {result.transparencyData.cropSoil && (
                      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                              <Sprout className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h4 className="font-extrabold text-sm">
                              {t.cropAgent}
                            </h4>
                          </div>

                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900 text-emerald-400">
                            CropSoilAgent
                          </span>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-950/40 p-3 rounded-xl">
                          <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-500/20">
                            <span className="text-sm font-black text-emerald-300">
                              {result.transparencyData.cropSoil.suitabilityScore}%
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 uppercase font-bold block">
                              {t.suitability}
                            </span>
                            <p className="text-xs font-extrabold text-slate-100">
                              {getLocalizedText(
                                result.transparencyData.cropSoil.suitabilityDescription,
                                lang
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                              {t.watering}
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                              {getLocalizedText(
                                result.transparencyData.cropSoil.wateringNeeds,
                                lang
                              )}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                              {t.fertilizer}
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                              {getLocalizedText(
                                result.transparencyData.cropSoil.fertilizerAdvice,
                                lang
                              )}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] text-amber-500 block uppercase font-bold">
                              {t.pests}
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                              {getLocalizedText(
                                result.transparencyData.cropSoil.commonPests,
                                lang
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MARKET */}
                    {result.transparencyData.market && (
                      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-amber-500/10 rounded-xl">
                              <ShoppingBag className="w-5 h-5 text-amber-400" />
                            </div>
                            <h4 className="font-extrabold text-sm">
                              {t.marketAgent}
                            </h4>
                          </div>

                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-900 text-amber-400">
                            MarketAgent
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-xl">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">
                              {t.currentPrice}
                            </span>
                            <span className="text-base font-black">
                              {Number(result.transparencyData.market.currentPrice) > 0
                                ? `₹${simFormat(result.transparencyData.market.currentPrice)}`
                                : t.noData}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">
                              {t.projection}
                            </span>
                            <span className="text-base font-black">
                              {Number(result.transparencyData.market.projectedPrice7Days) > 0
                                ? `₹${simFormat(result.transparencyData.market.projectedPrice7Days)}`
                                : t.noData}
                            </span>
                          </div>

                          <div className="col-span-2 pt-2 border-t border-slate-900/50 flex justify-between">
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                                {t.mspPrice}
                              </span>
                              <span className="text-xs font-bold text-slate-300">
                                {Number(result.transparencyData.market.mspPrice) > 0
                                  ? `₹${simFormat(result.transparencyData.market.mspPrice)}`
                                  : t.noMsp}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase font-bold">
                                {t.trend}
                              </span>
                              <span className="text-xs font-extrabold text-teal-400 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {result.transparencyData.market.priceTrend}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-emerald-400 block uppercase font-bold">
                            {t.recom}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-semibold mt-1">
                            {getLocalizedText(
                              result.transparencyData.market.recommendationText,
                              lang
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}

            {/* =================================================
                PRICE CHART
            ================================================= */}

            {mounted &&
              chartData.length > 0 &&
              isPanelOpen &&
              result.transparencyData?.market && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div>
                    <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider">
                      {cropDisplayName} {t.forecastChart}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {t.historicalProjection}
                    </p>
                  </div>

                  <div className="h-64 md:h-80 w-full bg-slate-950/30 p-3 rounded-2xl border border-slate-950">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1e293b"
                        />

                        <XAxis
                          dataKey="name"
                          stroke="#64748b"
                          tick={{
                            fontSize: 10,
                            fontWeight: "bold",
                          }}
                        />

                        <YAxis
                          stroke="#64748b"
                          domain={["auto", "auto"]}
                          tickFormatter={(value) => `₹${value}`}
                          tick={{
                            fontSize: 10,
                            fontWeight: "bold",
                          }}
                        />

                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderColor: "#334155",
                            borderRadius: "12px",
                            color: "#f8fafc",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          formatter={(value) => [
                            `₹${simFormat(Number(value))}`,
                            t.mandiRate,
                          ]}
                        />

                        {Number(result.transparencyData.market.mspPrice) > 0 && (
                          <ReferenceLine
                            y={Number(result.transparencyData.market.mspPrice)}
                            stroke="#ef4444"
                            strokeDasharray="4 4"
                            label={{
                              value: `MSP: ₹${simFormat(
                                result.transparencyData.market.mspPrice
                              )}`,
                              fill: "#f87171",
                              fontSize: 10,
                              fontWeight: "bold",
                              position: "top",
                            }}
                          />
                        )}

                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
          </div>
        )}
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-emerald-950 bg-slate-950/80 py-8 text-center text-xs text-slate-500 font-semibold space-y-2 mt-20">
        <p>
          🌾 KisanMitra AI — Empowering Indian Farmers with Multi-Agent Decision Intelligence 🌾
        </p>
        <p>
          Kaggle "Agents for Good" Capstone Project. Powered by Google ADK Patterns & Gemini.
        </p>
      </footer>
    </div>
  );
}