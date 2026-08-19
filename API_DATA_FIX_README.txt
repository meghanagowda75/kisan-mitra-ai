KISANMITRA API-DATA FIX

What changed:
1. frontend/app/page.tsx no longer uses the hardcoded commodity list as the input source.
   It calls GET /api/commodities and builds the crop dropdown from the actual data.gov.in
   commodity names.
2. backend/server.js exposes GET /api/commodities.
3. agents/MarketAgent.js uses DATA_GOV_RESOURCE_ID from backend/.env, with the current
   resource ID 35985678-0d79-46b4-9ed6-6f13308a1d24 as a fallback.
4. MarketAgent first requests the exact commodity selected from the API, instead of
   selecting a commodity from an arbitrary first page of records.
5. MarketAgent caches the API-derived market result for 10 minutes per crop/state,
   so closing and reopening the frontend while the backend is still running will
   return the same cached result instead of reselecting data.
6. Commodity names are cached for 30 minutes.
7. Existing UI/background/page design is preserved; only the commodity-loading logic
   and market-data selection were changed.

IMPORTANT:
- Keep your existing real API keys in backend/.env.
- Add:
    DATA_GOV_RESOURCE_ID=35985678-0d79-46b4-9ed6-6f13308a1d24
- The delivered project intentionally does NOT contain the real .env file.
- The government API is live data. If the backend is restarted after the 10-minute
  market cache expires, a newer government value can legitimately be returned.
