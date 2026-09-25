# Zipspeed Privacy Policy Patch — v70 candidate

Status: **EXACT PATCH PREPARED / external repo not modified**

Source compared:
- App: `dachopol/ZIPSPEEDmain` current source
- External policy: `dachopol/privacy-policy/index.html` as inspected 2026-09-23

## Current policy mismatches

1. **Advertising ID / AdMob / Firebase Analytics**
   - Current policy says these are collected/used.
   - Current app source has no AdMob, Google Mobile Ads, Firebase Analytics, or Play Billing dependency.
   - FIX: remove those claims until such SDKs are actually implemented and Store declarations are updated.

2. **Device model / OS collection**
   - Current policy says device model and OS version are collected.
   - Current Zipspeed source does not store those fields in completed history.
   - FIX: do not claim collection unless implementation/evidence supports it.

3. **Location permission**
   - Current policy says ACCESS_FINE_LOCATION may be requested.
   - Current Android manifest requests only INTERNET and ACCESS_NETWORK_STATE.
   - FIX: remove ACCESS_FINE_LOCATION claim.

4. **Network data terminology**
   - Current policy says Ping and signal strength.
   - Current app measures HTTP latency/jitter/probe failures, throughput, loaded HTTP latency and related deterministic diagnostics. It does not claim radio signal-strength measurement.
   - FIX: use the actual measurement terminology.

5. **Measurement providers**
   - Current policy does not describe the current Cloudflare speed endpoint or optional user-triggered Measurement Lab Locate discovery.
   - FIX: disclose those external destinations and the fact that providers may see normal request/network metadata such as IP.

6. **Local history**
   - Current app stores completed results locally and does not save client IP/ISP/browser network hints in its history object.
   - FIX: state this directly.

7. **Manual region input**
   - Optional M-Lab discovery can use a user-entered ISO country code.
   - It is not inferred from app language or currency and does not request device location permission.
   - FIX: disclose accurately.

## Replacement policy text

### นโยบายความเป็นส่วนตัว Zipspeed

อัปเดตล่าสุด: 23 กันยายน 2026

Zipspeed ใช้ข้อมูลเครือข่ายเท่าที่จำเป็นต่อการทดสอบและแสดงผล โดยนโยบายนี้อธิบายพฤติกรรมของ build ปัจจุบัน หากภายหลังมีการเพิ่มโฆษณา ระบบชำระเงิน Analytics หรือสิทธิ์อุปกรณ์เพิ่มเติม นโยบายและคำประกาศใน Store ต้องได้รับการอัปเดตก่อนเผยแพร่ build ดังกล่าว

### 1. ข้อมูลและการวัดที่แอปใช้
- Zipspeed วัด Download, Upload, HTTP Latency, Jitter, HTTP probe failure และค่าที่คำนวณจากผลวัดจริง เช่น loaded HTTP latency และ throughput variation
- การทดสอบติดต่อ endpoint ที่ระบุในแอปโดยตรง ปัจจุบันมี Cloudflare Speed Test เป็น measurement endpoint หลัก
- ผู้ให้บริการปลายทางอาจเห็นข้อมูลเครือข่ายตามปกติของคำขออินเทอร์เน็ต เช่น IP address
- Zipspeed อาจแสดง metadata ที่ผู้ให้บริการตอบกลับ เช่น IP, ASN/ISP, edge code หรือพื้นที่โดยประมาณเมื่อมีข้อมูล
- ข้อมูลที่ไม่มีหลักฐานรองรับจะแสดงเป็นไม่ทราบ/ไม่มีข้อมูล แทนการสร้างค่าขึ้นเอง

### 2. ประวัติบนอุปกรณ์
- เฉพาะผลทดสอบที่สำเร็จเท่านั้นที่ถูกบันทึกในประวัติของ Zipspeed
- ประวัติถูกเก็บไว้ในเครื่องของผู้ใช้
- saved history ของ build ปัจจุบันไม่บันทึก Client IP, ISP หรือ browser network hints
- ผู้ใช้สามารถล้างประวัติในแอปได้

### 3. Measurement Lab discovery
- Zipspeed มีตัวเลือกให้ผู้ใช้กดค้นหาเซิร์ฟเวอร์ Measurement Lab (M-Lab) ผ่าน Locate API
- ฟังก์ชันนี้ไม่ทำงานอัตโนมัติ
- ผู้ใช้อาจใส่รหัสประเทศ ISO 2 ตัวอักษรเพื่อจำกัดผลค้นหา
- แอปไม่อนุมานประเทศจากภาษา/สกุลเงิน และไม่ใช้สิทธิ์ตำแหน่งอุปกรณ์สำหรับฟังก์ชันนี้
- build ปัจจุบันใช้ M-Lab สำหรับ discovery เท่านั้น และยังไม่เปิด NDT7 measurement
- URL access token จากผล discovery ไม่ถูกเก็บไว้เป็นข้อมูลถาวรของ Zipspeed

### 4. Browser network hints
- ในสภาพแวดล้อมที่ browser รองรับ แอปอาจแสดง connection type/effective type/downlink/RTT/Data Saver ที่ browser ประเมินให้
- ค่าเหล่านี้ถูกระบุว่าเป็น browser estimate ไม่ใช่ผล speed test ของ Zipspeed
- build ปัจจุบันไม่บันทึกค่าเหล่านี้ลง History และไม่ส่งไปปลายทางใหม่โดย Zipspeed

### 5. สิทธิ์ Android
build ปัจจุบันใช้:
- INTERNET
- ACCESS_NETWORK_STATE

build ปัจจุบันไม่ขอ CAMERA, MICROPHONE, ACCESS_FINE_LOCATION หรือ ACCESS_COARSE_LOCATION

### 6. โฆษณาและการชำระเงิน
build ปัจจุบันไม่มี AdMob/Google Mobile Ads SDK และไม่มี Play Billing SDK ดังนั้นนโยบายนี้ไม่อ้างว่ามีการใช้ Advertising ID เพื่อโฆษณา หากเพิ่มระบบดังกล่าวในอนาคต จะต้องอัปเดต Privacy Policy และ Store declarations ก่อนเผยแพร่ build นั้น

### 7. การแชร์
การแชร์ผลเกิดจากการกระทำของผู้ใช้ผ่าน Share flow ของระบบปฏิบัติการหรือการคัดลอกผล ผู้ใช้เป็นผู้เลือกปลายทางการแชร์

### 8. การเก็บรักษาและลบข้อมูล
ผู้ใช้สามารถล้างประวัติภายในแอปหรือลบข้อมูลแอป/ถอนการติดตั้งเพื่อเอาข้อมูล local history ออกจากอุปกรณ์

### 9. บริการภายนอก
บริการภายนอกที่ build ปัจจุบันสามารถติดต่อได้ตามฟังก์ชันที่ผู้ใช้ใช้งาน ได้แก่:
- Cloudflare Speed Test — measurement endpoint
- Measurement Lab Locate API — optional user-triggered server discovery

การประมวลผลข้อมูลที่บริการเหล่านี้ดำเนินการอยู่ภายใต้นโยบายของผู้ให้บริการแต่ละราย

### 10. การเปลี่ยนแปลงนโยบาย
เมื่อ behavior, SDK, permission หรือ data flow ของแอปเปลี่ยน นโยบายนี้ควรถูกอัปเดตให้ตรงกับ build ก่อนเผยแพร่

### 11. ติดต่อ
ให้คงข้อมูลติดต่อที่เจ้าของแอปอนุมัติไว้ใน privacy-policy repo ปัจจุบัน
