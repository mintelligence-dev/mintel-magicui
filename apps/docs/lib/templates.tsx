import blocks from "@/registry/blocks.json"
import ConsolePage from "@/registry/mintel/blocks/console-page"
import DashboardPage from "@/registry/mintel/blocks/dashboard-page"
import LandingPage from "@/registry/mintel/blocks/landing-page"
import LoginPage from "@/registry/mintel/blocks/login-page"
import MobileAppPage from "@/registry/mintel/blocks/mobile-app-page"
import RegisterPage from "@/registry/mintel/blocks/register-page"

export type Template = { name: string; title: string; description: string; route: string; registryDependencies: string[] }

export const TEMPLATES = blocks as Template[]

export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType> = {
  "login-page": LoginPage,
  "dashboard-page": DashboardPage,
  "mobile-app-page": MobileAppPage,
  "landing-page": LandingPage,
  "console-page": ConsolePage,
  "register-page": RegisterPage,
}

export const TEMPLATE_TH: Record<string, string> = {
  "login-page": "หน้าเข้าสู่ระบบแบบแบ่งครึ่ง: ฝั่งแบรนด์ไล่สีพร้อมการ์ดกระจก และฟอร์มอีเมล/รหัสผ่าน",
  "dashboard-page": "แดชบอร์ดงานบริการลูกค้า: sidebar, ตัวกรองช่วงวันที่, การ์ดสถิติ และตารางเคสพร้อมกรองช่องทางและเมนูของแต่ละแถว",
  "mobile-app-page": "โครงแอปมือถือ (mobile web / PWA): แถบบนแบบกระจก, ตัวกรองแบบแบ่งช่อง, รายการแชท, แถบแท็บด้านล่าง และ drawer เขียนข้อความ",
  "landing-page": "หน้า marketing: navbar กระจก, hero เคลื่อนไหว, แถบโลโก้, การ์ดฟีเจอร์มี spotlight, สถิติ และ call to action",
  "console-page": "หน้าจอเจ้าหน้าที่ contact center: เมนูซ้ายย่อได้, รายการแชตค้นหาและกรองได้พร้อมจำนวนที่ยังไม่อ่าน, หน้าแชต และแผงเคสที่มี SLA นับถอยหลัง แท็ก และประวัติ บนมือถือสลับระหว่างรายการกับแชต",
  "register-page": "สมัครสมาชิก 4 ขั้น: บัญชี, เลขบัตรประชาชน (เช็ค check digit), เบอร์โทรพร้อมยืนยัน OTP และที่อยู่ไทยค้นจากรหัสไปรษณีย์ แล้วสรุปข้อมูล",
}
