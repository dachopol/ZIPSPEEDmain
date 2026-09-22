# Zipspeed Project Rules

## MASTER APP BUILD RULES
- No fake, random, demo, or hardcoded values may be presented as measured network facts.
- If a value cannot be measured, display `--`, unknown, unavailable, or an explicit error.
- Throughput must derive from actual transferred bytes and elapsed time after a successful HTTP response.
- Do not label HTTP probe failure as packet loss.
- Do not label client city/country metadata as server location.
- Ads, billing, subscription, outage, packet loss, server maps, or other capabilities must not be simulated as production features.
- Prototype behavior and production capability must stay clearly separated.

## ANTI-RANDOM BUILD
Every new feature needs:
1. requirement source;
2. acceptance criteria;
3. real data source or explicit assumption;
4. privacy/data-use impact;
5. test evidence before a production-ready claim.

## RESEARCH / THESIS INTEGRITY
- Never fabricate papers, DOI, participants, survey/interview results, IOC, reliability, statistics, or findings.
- Missing evidence remains Gap / Assumption / To verify.
- Thesis traceability must remain consistent: title → RQ → objectives → method → instrument → data → analysis → result → conclusion → app feature.
