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
