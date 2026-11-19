import blocks from "@/registry/blocks.json"
import DashboardPage from "@/registry/mintel/blocks/dashboard-page"
import LandingPage from "@/registry/mintel/blocks/landing-page"
import LoginPage from "@/registry/mintel/blocks/login-page"
import MobileAppPage from "@/registry/mintel/blocks/mobile-app-page"

export type Template = { name: string; title: string; description: string; route: string; registryDependencies: string[] }

export const TEMPLATES = blocks as Template[]

export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType> = {
  "login-page": LoginPage,
  "dashboard-page": DashboardPage,
  "mobile-app-page": MobileAppPage,
  "landing-page": LandingPage,
}

export const TEMPLATE_TH: Record<string, string> = {
  "login-page": "หน้าเข้าสู่ระบบแบบแบ่งครึ่ง: ฝั่งแบรนด์ไล่สีพร้อมการ์ดกระจก และฟอร์มอีเมล/รหัสผ่าน",
  "dashboard-page": "แดชบอร์ดงานบริการลูกค้า: sidebar, ตัวกรองช่วงวันที่, การ์ดสถิติ และตารางเคสพร้อมกรองช่องทางและเมนูของแต่ละแถว",
  "mobile-app-page": "โครงแอปมือถือ (mobile web / PWA): แถบบนแบบกระจก, ตัวกรองแบบแบ่งช่อง, รายการแชท, แถบแท็บด้านล่าง และ drawer เขียนข้อความ",
  "landing-page": "หน้า marketing: navbar กระจก, hero เคลื่อนไหว, แถบโลโก้, การ์ดฟีเจอร์มี spotlight, สถิติ และ call to action",
}
