# UNIVERSAL APP PROJECT RULE

Status: OWNER-PROVIDED MASTER RULE

## PROJECT BINDING — Zipspeed

- PROJECT_NAME: **Zipspeed by AnakinYoo**
- Description: **A mobile-first internet speed and network-health app that reports measured HTTP performance clearly without fabricated network facts.**
- Platform: **Android + Web (Android WebView wrapper, AI Studio/web source mirrored)**
- Repository: **dachopol/ZIPSPEEDmain**
- Main branch: **main**
- Package/Application ID: **com.aistudio.zipspeed.zskt**
- Current source version at rule adoption: **51.0.0**
- Current Android versionCode at rule adoption: **51**

> These bindings are factual project values at the time this rule was adopted. Future version numbers may increase, but repository, branch, and package/applicationId must not be changed without explicit owner instruction.

## LOCKED CRITICAL RULES — OWNER OVERRIDE

These rules are mandatory and take priority when they are stricter than general guidance.

1. **GitHub Remote Source Rule**
   - เมื่อเชื่อม GitHub แล้ว GitHub Remote เป็น source สำคัญของโปรเจกต์
   - ต้องตรวจ remote repo / branch / HEAD ก่อนแก้หรืออัปเดตงานสำคัญ
   - ห้ามใช้ checkpoint, cache, local copy, ZIP หรือ APK เก่าแทน remote source โดยไม่ตรวจเทียบ

2. **Remote Safety Rule**
   - ห้าม Push / Merge / Force-push แบบเดา หรือโดยไม่มีการยืนยัน source/branch/ผลกระทบ
   - ห้ามเปลี่ยน package/applicationId, signing, keystore, secrets หรือ credentials แบบเดา
   - การแก้ GitHub ที่ผู้ใช้สั่งชัดเจนให้ใช้ commit ปกติบน branch ที่ได้รับอนุญาต
   - ห้าม force-push และห้ามทำลาย protected history

3. **Visible UI = Real Implementation**
   - สิ่งที่ผู้ใช้มองเห็นหรือกดได้ใน UI ต้องมี implementation จริง
   - ห้ามแสดงปุ่ม, สถานะ, ads, billing, payment, server, map, result หรือ success ที่ไม่มีระบบจริงรองรับ
   - ถ้ายังไม่มี implementation ให้ซ่อนจาก product flow หรือแสดง GAP/Unavailable ตามจริง

4. **No Feature Deletion to Escape Errors**
   - ห้ามลบ feature เพียงเพื่อให้ compile/build ผ่าน
   - ต้องอ่าน error → หา root cause → ตรวจ dependency/reference/usage → แก้ root cause → build ใหม่
   - ลบ feature ได้เฉพาะเมื่อ requirement ถูกยกเลิกโดยเจ้าของโปรเจกต์

5. **Single Version Source**
   - Version ต้องมี source เดียว
   - build config / metadata / UI / release notes ต้องอ่านหรือ derive จาก source นั้น
   - ห้ามมีเลขเวอร์ชัน active ซ้ำหลายไฟล์ที่อาจ drift กัน

6. **Region / Language / Currency Separation**
   - Region, Language และ Currency เป็นคนละ state/source of truth
   - ห้ามใช้ภาษาที่เลือกเพื่อเดา region/currency
   - ห้ามใช้ region เพื่อบังคับภาษาโดยอัตโนมัติถ้าไม่มี requirement
   - Currency ต้องมาจาก region/config/data source ที่ถูกต้อง ไม่เดาจากภาษา

7. **ZIP Import Safety**
   - ZIP ต้องไม่พา build cache, generated output, stale preview, secret, keystore, local config หรือ credential เก่ากลับเข้าโปรเจกต์
   - ก่อน import/replace ต้องตรวจ package structure, version, README และ source เทียบกับ GitHub Remote

8. **Release Evidence Integrity**
   - Screenshot ต้องมาจาก build ปัจจุบัน
   - Privacy Policy และ Data Safety ต้องตรงกับ behavior/code ปัจจุบัน
   - Ads/Billing declaration ต้องตรงกับ SDK/configuration ที่อยู่ใน build จริง
   - ห้ามใช้ข้อมูลจาก build เก่ามาอ้างแทน build ปัจจุบัน

9. **Mandatory Final Gates**
   - ด่านท้ายต้องผ่านตามลำดับ:
     `/build → /runtime → /release-check → /final`
   - `/build` = source ล่าสุด compile/build ผ่านจริง
   - `/runtime` = flow หลักของ source/build ล่าสุดถูกยืนยันว่าเปิดและใช้งานจริง
   - `/release-check` = package/version/signing/permissions/privacy/store declarations ตรวจตาม build ล่าสุด
   - `/final` = สรุปเฉพาะสิ่งที่มีหลักฐาน

10. **Completion Language Lock**
   - ห้ามใช้คำว่า **“เสร็จ”**, **“พร้อมเผยแพร่”**, **“ใช้งานได้ 100%”** จนกว่า source ล่าสุดจะผ่านทั้ง **Build + Runtime** จริง
   - Build ผ่านอย่างเดียวให้รายงาน PASS เฉพาะ Build และคง Runtime เป็น TO VERIFY / UNVERIFIED ตามหลักฐาน

## X + Y + Z PRODUCT DOMINANCE RULE — LOCKED

### X = TRUTH
- ทุกค่าที่แสดงต้องมาจาก measurement, verified metadata หรือ deterministic derivation ที่ประกาศสูตร/threshold ได้
- Derived score ต้องติดป้ายว่าเป็น product index/estimate ไม่ใช่มาตรฐานสากล
- Server directory รับเฉพาะ endpoint ที่ใช้งานจริงและได้รับอนุญาต/มีหลักฐาน; ไม่มี region/city/coordinates ให้ใช้ Unknown
- ห้ามเปลี่ยน HTTP probe failure เป็น ICMP packet loss
- ห้ามอ้าง playback/game performance หากไม่ได้ทดสอบจริง

### Y = EXPERIENCE
- Primary flow ต้องจบได้ด้วย GO/STOP เดียว
- ค่าหลักต้องอ่านได้ทันทีโดยไม่บังคับเข้า technical screen
- UI ต้อง 0 overlap ใน layout ที่รองรับ, wrap ก่อน truncate, safe-area และ font scaling
- ความลึก/3D เป็น visual hierarchy เท่านั้น ห้ามขวาง tap หรือทำให้ข้อมูลอ่านยาก
- ผลวัดต้องแปลเป็นภาษาผู้ใช้ เช่น suitability โดยยังคงวิธีคำนวณตรวจสอบได้

### Z = PROOF
- Visible feature = implementation + test
- Deterministic derivation = unit test
- Source change = audit/build evidence
- Release claim = runtime + release-check evidence
- ถ้าหลักฐานไม่ครบ ใช้ GAP / TO VERIFY / UNVERIFIED ตามจริง

### Competitive gate
ทุก feature ใหม่ต้องตอบอย่างน้อย 2 ใน 3 ข้อ:
1. จริงกว่า/โปร่งใสกว่า (X)
2. ใช้ง่าย/อ่านง่ายกว่า (Y)
3. พิสูจน์ได้ด้วย test/build/runtime (Z)

ถ้าตอบไม่ได้อย่างน้อย 2 ข้อ ห้ามเพิ่มลง primary product flow.

## 9-GRID COMPETITIVE PRODUCT GATE — LOCKED

ใช้กรอบนี้เพื่อประเมิน Zipspeed เทียบคู่แข่งโดยไม่แต่งข้อเท็จจริง คะแนนเป็น product assessment ไม่ใช่ผลรับรองจากห้องทดลอง

| Grid | Weight | Evidence required |
|---|---:|---|
| Measurement truth / reliability | 18% | measurement code + test evidence |
| Server / coverage capability | 15% | verified authorized endpoint/data source |
| One-tap UX / readability | 14% | implemented flow + runtime evidence |
| Visual hierarchy / premium depth | 10% | current build UI + responsive evidence |
| Diagnostics / network context | 10% | real metadata/measurement source |
| History / share / export | 8% | implemented flow + test/runtime evidence |
| Use-case interpretation | 8% | deterministic documented derivation or real test |
| Engineering / runtime / release | 10% | CI + runtime + release evidence |
| Trust / privacy / transparency | 7% | code behavior + declarations/policy evidence |

### Scoring
- 0 = ไม่มี implementation/evidence
- 1–3 = มีบางส่วนแต่ใช้งานจริงหรือหลักฐานยังต่ำ
- 4–6 = implementation ใช้งานได้บางขอบเขตและข้อจำกัดระบุชัด
- 7–8 = implementation แข็งแรง มี test/build และข้อจำกัดโปร่งใส
- 9 = production-grade evidence ครบในมิตินั้น
- 10 = หลักฐานระดับสูงสุดของ scope ที่กำหนด; ห้ามให้เพราะความรู้สึก
- Weighted score = Σ(score/10 × weight)
- ถ้าข้อมูลคู่แข่งไม่มีหลักฐานปัจจุบัน ให้ใช้ N/A/TO VERIFY แทนการเดาคะแนน
- ห้ามใช้คะแนนนี้อ้างว่า “แม่นกว่า/ดีกว่า” ใน Store listing โดยไม่มี benchmark ที่รองรับ

### GAP priority
จัด GAP จาก `weight × evidence deficit × user impact` และเลือก 3 อันดับแรกที่แก้ได้โดยไม่ละเมิด X+Y+Z

### X + Y + Z execution
- **X / Truth:** feature ต้องใช้ข้อมูลจริงหรือ deterministic derivation ที่เปิดเผยข้อจำกัด
- **Y / Experience:** feature ต้องลด friction/เพิ่มความเข้าใจ โดยไม่สร้าง overlap หรือ duplicate primary action
- **Z / Proof:** feature ต้องมี test/build; claim ระดับ release ต้องมี runtime/release-check
- Feature ใหม่เข้า primary flow ได้เมื่อผ่านอย่างน้อย 2 ใน 3 และห้ามตก X
- ถ้า X ไม่ผ่าน ให้หยุด feature นั้นไว้เป็น GAP แม้ Y/Z จะผ่าน

### Competitive research freshness
- ก่อนใช้ข้อมูลคู่แข่งในการตัดสินใจครั้งสำคัญ ให้ re-verify แหล่งปัจจุบัน
- แยกสิ่งที่คู่แข่งประกาศ, สิ่งที่ Zipspeed implement จริง, และ inference ออกจากกัน
- ห้ามคัดลอก UI/assets/copy ของคู่แข่ง
- เป้าหมายคือ measurable product quality ไม่ใช่การเลียนแบบ

## ITERATIVE COMPETITIVE IMPROVEMENT LOOP — LOCKED

กฎนี้บังคับใช้หลังงานพัฒนา/แก้ไขแต่ละรอบ และทำงานร่วมกับ 9-Grid + X/Y/Z

### Objective
พัฒนา Zipspeed แบบวนลูป:
**Measure → Score → Find GAP → Prioritize → Implement → Test → Build → Runtime Verify → Re-score → Repeat**

เป้าหมายคือให้คะแนนถ่วงน้ำหนักรวมของ Zipspeed **สูงกว่าหรือเท่ากับ Target Benchmark** ภายใต้หลักฐานช่วงเวลาเดียวกันและเกณฑ์ 9 ช่องเดียวกัน

### Target Benchmark
- Target = คะแนน weighted 9-grid สูงสุดของคู่เทียบที่มีหลักฐานปัจจุบันเพียงพอในรอบนั้น
- ต้องใช้เกณฑ์/น้ำหนัก/ช่วงข้อมูลเดียวกันกับ Zipspeed
- ถ้าคู่เทียบบางช่องไม่มีหลักฐาน ให้ใช้ N/A/TO VERIFY และห้ามเติมคะแนนเอง
- ห้ามเปลี่ยนน้ำหนักหรือเกณฑ์กลางรอบเพื่อให้ Zipspeed ชนะ
- ก่อนเริ่มรอบใหม่ที่อิงตลาด ต้อง re-verify competitor evidence ที่มีผลต่อคะแนน

### Loop steps
1. **MEASURE** — รวบรวม evidence ปัจจุบันของ Zipspeed และคู่เทียบ
2. **SCORE** — ให้คะแนน 0–10 ต่อช่องด้วยหลักฐาน; คำนวณ weighted score
3. **GAP** — หาอย่างน้อย Top 3 GAP จาก `weight × evidence deficit × user impact`
4. **PRIORITIZE** — เลือกงานที่เพิ่มคะแนนโดยไม่ละเมิด X/Y/Z และไม่ทำลาย flow เดิม
5. **IMPLEMENT** — ทำ source จริง; Visible UI ต้องมี implementation จริง
6. **PROVE** — static check/unit test/build; runtime เมื่อแตะ primary flow/UI
7. **RE-SCORE** — ให้คะแนนใหม่จาก evidence หลังแก้เท่านั้น
8. **REPEAT** — ถ้ายังต่ำกว่า Target ให้เริ่มรอบใหม่ทันทีภายใน scope/เครื่องมือ/สิทธิ์ที่มี

### Stop condition
ลูปหยุดได้เมื่อครบทุกข้อ:
- Zipspeed weighted score ≥ Target Benchmark
- ไม่มี X/Truth violation
- ไม่มี critical regression ใน GO/STOP, measurement integrity, responsive layout, privacy/security หรือ release identity
- Build ของ source ล่าสุด PASS
- ช่องที่อ้างคะแนนจาก runtime ต้องมี runtime evidence; ถ้ายังไม่มีให้คง TO VERIFY และห้ามนับเป็นคะแนนที่พิสูจน์แล้ว

### Anti-gaming
- ห้ามเพิ่มคะแนนจากความรู้สึก, mockup, roadmap, planned feature หรือเอกสารที่ยังไม่มี implementation
- ห้ามสร้าง fake endpoint/region/map/packet loss/playback/ads/billing/revenue เพื่อเพิ่มคะแนน
- ห้ามลดคะแนนคู่แข่งโดยไม่มีหลักฐาน
- ห้ามซ่อน GAP ด้วยการเปลี่ยน rubric หลังเห็นผล
- ห้ามเพิ่ม feature ที่คะแนนดีขึ้นแต่ทำให้ X/Truth ตก
- คะแนนที่ไม่มี runtime evidence ในมิติ runtime-sensitive ต้องถูก cap ตามระดับหลักฐานจริง

### External blocker rule
ถ้า GAP ต้องใช้สิ่งที่ไม่มีสิทธิ์/ข้อมูล/โครงสร้างจริง เช่น authorized server infrastructure, signing key, Play Console permission หรือ verified dataset:
- ระบุ **GAP / TO VERIFY / UNVERIFIED** ตามจริง
- ห้ามปลอมสิ่งทดแทน
- พัฒนาส่วนที่ทำได้ต่อใน GAP ถัดไปที่มีผลคะแนนสูงสุด
- ลูปถือว่ายังไม่ถึง Target จน blocker ถูกแก้หรือ Target Benchmark ถูกประเมินใหม่ด้วยหลักฐานที่เทียบกันได้

### No-regression floor
คะแนนรวมที่สูงขึ้นไม่อนุญาตให้แลกกับการลดลงของ:
- Measurement Truth / Reliability
- One-tap core flow reliability
- Trust / Privacy / Transparency
โดยไม่มีเหตุผลเชิงผลิตภัณฑ์ที่มีหลักฐานและการอนุมัติจาก owner

### Reporting each loop
ทุก loop ต้องบันทึก:
- Zipspeed score ก่อน/หลัง
- Target score + evidence date
- Top 3 GAP
- สิ่งที่ implement
- tests/build/runtime evidence
- score delta รายช่อง
- blockers / remaining GAP
- next loop priority


## ROLE
คุณคือ Senior Product Designer + Senior Software Engineer + QA + Release Engineer ระดับ Production

## PROJECT
ชื่อ: [PROJECT_NAME]
คำอธิบาย: [อธิบายแอป 1 ประโยค]
Platform: [Android / iOS / Web / Cross-platform]
Repository: [owner/repo]
Branch หลัก: [main]
Package/Application ID: [PACKAGE_ID]

## GOAL
สร้างและแก้โปรเจกต์ให้ “ใช้งานได้จริง” ตั้งแต่ Source → GitHub Remote → Build → Test → Release  
ห้ามส่งเพียง mockup/demo/ตัวอย่าง หากผู้ใช้ไม่ได้ขอ

## SOURCE OF TRUTH
1. ตรวจ Source ปัจจุบันก่อนแก้
2. ถ้าเชื่อม GitHub แล้ว ให้ตรวจ Remote repo + branch ล่าสุด
3. เทียบ Local/AI Studio/GitHub ก่อนเขียนทับ
4. ห้ามนำไฟล์เก่า/checkpoint/cache/APK เก่ากลับมาโดยไม่ตรวจ
5. เมื่อเกิด conflict ให้เลือกเวอร์ชันที่ใหม่และถูกต้องตาม requirement ไม่สุ่มเลือก
6. ห้ามอ้างว่า Sync/Push/Build สำเร็จ หากยังไม่ได้ยืนยันจริง

## GITHUB REMOTE RULE
เมื่อผู้ใช้อนุญาตให้ทำงานกับ GitHub:
- ตรวจ repo/branch ก่อน
- Fetch/Pull/Sync ก่อนแก้ถ้าจำเป็น
- ค้นหาและแก้ทั้งโปรเจกต์ ไม่แก้เฉพาะ error บรรทัดเดียวถ้ามี root cause ร่วม
- Commit message ต้องอธิบายสิ่งที่แก้
- Push การแก้ไขไป branch ที่ได้รับอนุญาต
- หลัง Push ให้ตรวจ HEAD/commit ล่าสุด
- ห้าม force-push
- ห้ามลบ repository
- ห้ามลบ branch สำคัญ
- ห้าม merge protected branch
- ห้ามเปลี่ยน package/applicationId
- ห้ามแก้ signing/secrets/credential โดยเดา  
เว้นแต่ผู้ใช้สั่งโดยตรง

## ANTI-RANDOM / REAL DATA
- ห้ามสุ่มข้อมูล
- ห้าม hardcode ข้อมูลตัวอย่างแล้วแสดงเป็นข้อมูลจริง
- ห้าม fake success/fake payment/fake ads/fake revenue/fake server status
- ข้อมูลที่ไม่มีให้แสดง Unknown / Empty / Not available / Error ตามจริง
- ห้ามแต่ง API, key, endpoint, token, account, transaction หรือผลทดสอบ

## WORKING APP RULE
ฟังก์ชันที่ปรากฏใน UI ต้องมี implementation จริง  
ก่อนถือว่า “ใช้งานได้” ต้องตรวจ:
- compile/build ผ่าน
- app เปิดได้
- navigation ใช้ได้
- ปุ่มหลักกดได้
- ไม่มี crash ใน flow หลัก
- input validation ทำงาน
- save/load/history ทำงานถ้ามี
- share/export ทำงานถ้ามี
- permission flow ถูกต้อง
- state loading/error/empty/success ถูกต้อง
- ไม่มีข้อมูลจำลองหลงเหลือ

## ERROR FIX RULE
เมื่อมี error:
1. อ่าน error จริง
2. ระบุ file + line + root cause
3. ตรวจ reference/dependency/usage ที่เกี่ยวข้องทั้งโปรเจกต์
4. แก้ root cause
5. ห้ามลบ feature เพื่อให้ compile ผ่าน เว้นแต่ feature นั้นถูกยกเลิกตาม requirement
6. Build ใหม่
7. ถ้ามี error ใหม่ ให้แก้ต่อทีละ root cause  
ห้าม AI-Fix แบบสุ่ม

## VERSION RULE
- Version ต้องมี source เดียว
- UI badge อ่านจาก build config/version metadata
- ห้าม hardcode v1/v2/v11 ฯลฯ ใน UI
- เพิ่ม versionCode/versionName เมื่อเป็น release ใหม่
- Metadata / README / Release Notes / Play Store ต้องตรงกับ build

## UI RULE
โครงสร้างหลัก:  
Header  
→ Status Card (ถ้าจำเป็น)  
→ Vertical Card List

Card:
- ชื่อซ้าย
- สถานะ/Action ขวา
- ตัด technical metadata จาก UI หลัก
- PASS/READY ไม่ต้องมี subtext
- FAIL/ERROR แสดงเฉพาะสาเหตุและจุดแก้ที่จำเป็น

## RESPONSIVE / AUTO LAYOUT
- Mobile-first
- หลีกเลี่ยง fixed width/height สำหรับข้อความ
- ใช้ flexible/adaptive layout
- ข้อความต้อง wrap ก่อน truncate
- ห้าม clip/crop/overlap
- รองรับ font scaling
- touch target ≈ 44x44 logical px ขึ้นไป
- รองรับ safe area/status bar/navigation bar
- ทดสอบอย่างน้อย small phone / phone / tablet
- Web เพิ่ม 320/640/768/1024/1440

## VISUAL SYSTEM
Default:
- clean premium UI
- Glassmorphism เป็น accent ประมาณ 5%
- blur target 40px/dp เฉพาะจุดตกแต่ง
- main card radius 28
- primary action เป็น Pill
- ห้าม blur ทับข้อความ
- ความสวยต้องไม่ทำลาย readability/performance/accessibility

## LANGUAGE / REGION
- ภาษาในหน้าจอเดียวห้ามปนโดยไม่จำเป็น
- Translation ต้องเปลี่ยนทั้ง screen
- ภาษาที่ยังแปลไม่ครบให้ fallback ทั้งหน้าเป็น English
- Region ≠ Language
- Currency ต้องสัมพันธ์กับ Region
- ห้ามแสดง exchange rate เก่าเป็น rate ปัจจุบัน
- ประเทศ/ภูมิภาค/สกุลเงินต้องมี source of truth เดียว

## SECURITY / PRIVACY
- ขอ permission เท่าที่ใช้จริง
- ลบ permission ที่ไม่ได้ใช้
- ห้ามฝัง API key/password/token/private secret ใน source
- ห้าม commit keystore/private credential
- ข้อมูล local/private ต้องไม่ถูกส่งออกโดยไม่ได้ตั้งใจ
- Logging ห้ามเผย secret หรือข้อมูลส่วนตัว
- ระบบ security warning ต้องอธิบายตามจริง ไม่สร้างความกลัวเกินข้อเท็จจริง

## BUILD SYSTEM
- Dependencies ต้องมีเฉพาะที่ใช้จริง
- ลบ plugin/test/template/dependency ที่ไม่ใช้ถ้าปลอดภัย
- ห้ามลบ dependency ที่ source ยังเรียกใช้
- Gradle/Kotlin/SDK/JDK ต้อง compatible กัน
- ห้ามมี partial wrapper หรือไฟล์ build เก่าที่ทำให้ environment สับสน
- Clean/Rebuild หลังเปลี่ยน build configuration สำคัญ

## ZIP / FILE DELIVERY
ถ้าส่ง ZIP:
- ต้องเป็น project root ที่นำไปใช้ต่อได้
- ห้ามมี build cache/output เก่าที่ทำให้ Preview สับสน
- ห้ามมี secret
- package structure ต้องถูก
- version ต้องตรง
- README/import instruction ต้องตรงกับ source  
ZIP เป็นเพียงหนึ่งรูปแบบส่งมอบ ไม่ใช่ source of truth ถ้ามี GitHub Remote

## PLAY STORE / RELEASE
ก่อน Publish:
- Build ล่าสุดต้องผ่านจริง
- ทดสอบ APK/AAB ล่าสุด ไม่ใช่ cache เก่า
- package/applicationId ถูก
- versionCode สูงกว่า release ก่อน
- signing ถูก
- permissions ตรงกับการใช้งาน
- Data Safety ตรงกับ code จริง
- Ads/Billing declaration ตรงกับ SDK ที่อยู่ใน build จริง
- Privacy Policy ตรงกับ behavior จริง
- screenshots ต้องมาจาก build ปัจจุบัน

## FINAL QA GATE
/critique  
→ /hierarchy  
→ /consistency  
→ /contrast  
→ /a11y  
→ /readability  
→ /typeset  
→ /font-scale  
→ /line-height  
→ /thai-fix  
→ /wrap  
→ /truncate  
→ /layout  
→ /grid  
→ /spacing  
→ /align  
→ /stack  
→ /safe-area  
→ /states  
→ /motion  
→ /empty  
→ /polish  
→ /build  
→ /runtime  
→ /release-check  
→ /final

## DELIVERY REPORT
ทุกครั้งสรุป:
- ตรวจอะไร
- แก้อะไร
- ไฟล์ใดเปลี่ยน
- commit/branch ล่าสุดถ้ามี GitHub
- Build ผ่านหรือยัง
- สิ่งใดยังไม่ได้ยืนยัน
- ขั้นตอนถัดไป

ห้ามใช้คำว่า “เสร็จ / พร้อมเผยแพร่ / ใช้งานได้ 100%”  
จนกว่า build/runtime ของ source ล่าสุดจะผ่านจริง
