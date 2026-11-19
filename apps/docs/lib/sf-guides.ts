// "When to use / not for" for the Salesforce components people most often choose between.
// An `alt` names another LWC from lib/sf-index.ts to use instead (rendered as a link).
import { SF_INDEX } from "@/lib/sf-index"

type Line = { en: string; th: string; alt?: string }
export type SfGuide = { use: Line[]; avoid: Line[] }

const l = (en: string, th: string, alt?: string): Line => ({ en, th, alt })

export const SF_GUIDES: Record<string, SfGuide> = {
  kanban: {
    use: [
      l("Related records people move between stages: Opportunities by Stage, Cases by Status.", "record ลูกที่ต้องย้ายไปมาระหว่างสถานะ เช่น Opportunity ตาม Stage หรือ Case ตาม Status"),
      l("Boards with a handful of columns and up to a few dozen cards.", "บอร์ดที่มีไม่กี่คอลัมน์ และการ์ดไม่เกินหลักสิบ"),
    ],
    avoid: [
      l("Just listing related records, with no stages to move between.", "แค่แสดงรายการ record ลูก โดยไม่มีสถานะให้ย้าย", "relatedCards"),
      l("The stage of the record you are on.", "สถานะของ record ที่กำลังเปิดอยู่", "path"),
      l("Hundreds of records: use a list view or report.", "ข้อมูลหลักร้อย record ควรใช้ list view หรือ report"),
    ],
  },
  relatedCards: {
    use: [
      l("A related list that reads better as cards: a few key fields per record, on desktop and phones.", "related list ที่อ่านเป็นการ์ดง่ายกว่า แสดงฟิลด์สำคัญไม่กี่ช่องต่อ record ทั้งบนจอใหญ่และมือถือ"),
    ],
    avoid: [
      l("Records people move between stages.", "record ที่ต้องย้ายสถานะ", "kanban"),
      l("Attached files.", "ไฟล์แนบ", "filesGallery"),
      l("Many columns to compare or sort: the standard related list is better.", "ต้องเทียบหรือเรียงหลายคอลัมน์ ใช้ related list มาตรฐานจะดีกว่า"),
    ],
  },
  path: {
    use: [
      l("The stage of the record you are on, from one picklist: Case Status, Opportunity Stage.", "สถานะของ record ที่เปิดอยู่ จาก picklist ตัวเดียว เช่น Case Status หรือ Opportunity Stage"),
    ],
    avoid: [
      l("You need guidance text and key fields per stage: the standard Path has them.", "ต้องการคำแนะนำและฟิลด์สำคัญของแต่ละขั้น ซึ่ง Path มาตรฐานมีให้"),
      l("Switching between views of the page.", "สลับมุมมองของหน้า", "tabs"),
    ],
  },
  statCard: {
    use: [
      l("One number that matters on its own: cases today, open orders.", "ตัวเลขเดียวที่มีความหมายในตัวเอง เช่น เคสวันนี้ ออเดอร์ที่ค้าง"),
    ],
    avoid: [
      l("The number only makes sense with its direction over time.", "ตัวเลขที่ต้องดูคู่กับแนวโน้มถึงจะมีความหมาย", "kpiTrend"),
      l("A percentage towards a goal.", "เปอร์เซ็นต์ความคืบหน้าสู่เป้าหมาย", "progressRing"),
    ],
  },
  kpiTrend: {
    use: [
      l("A number with its recent history and whether the change is good or bad.", "ตัวเลขพร้อมประวัติช่วงล่าสุด และบอกว่าการเปลี่ยนแปลงดีหรือแย่"),
    ],
    avoid: [
      l("You have no history to plot: a lone number is clearer.", "ไม่มีข้อมูลย้อนหลังให้วาดกราฟ ตัวเลขเดี่ยวจะชัดกว่า", "statCard"),
      l("Reading exact values from a chart: use a report chart.", "ต้องอ่านค่าจากกราฟอย่างละเอียด ควรใช้ report chart"),
    ],
  },
  activityTimeline: {
    use: [
      l("Tasks and Events of the record in one timeline, on a record page.", "Task และ Event ของ record ในไทม์ไลน์เดียว บนหน้า record"),
    ],
    avoid: [
      l("Your own list of events (status history, shipment steps).", "รายการเหตุการณ์ของเราเอง เช่น ประวัติสถานะ ขั้นตอนจัดส่ง", "timeline"),
      l("Emails, calls logged by integrations and other activity types: the standard Activity component covers them.", "อีเมล การโทรจากระบบเชื่อมต่อ และกิจกรรมแบบอื่น ซึ่ง Activity มาตรฐานรองรับครบกว่า"),
    ],
  },
  timeline: {
    use: [
      l("An ordered history you provide from your own LWC: status changes, shipment steps.", "ประวัติตามลำดับที่ส่งข้อมูลมาจาก LWC ของเราเอง เช่น การเปลี่ยนสถานะ ขั้นตอนจัดส่ง"),
    ],
    avoid: [
      l("Tasks and Events of a record, with no code.", "Task และ Event ของ record โดยไม่ต้องเขียนโค้ด", "activityTimeline"),
      l("A process with a current stage people can change.", "กระบวนการที่มีขั้นปัจจุบันและเปลี่ยนได้", "path"),
    ],
  },
  tabs: {
    use: [
      l("Sibling views inside your own LWC, each with its own content.", "มุมมองระดับเดียวกันใน LWC ของเราเอง แต่ละแท็บมีเนื้อหาของตัวเอง"),
    ],
    avoid: [
      l("Laying out a page in App Builder: use the standard Tabs component there.", "จัดหน้าใน App Builder ควรใช้ Tabs มาตรฐานของ App Builder"),
      l("Switching a filter or range for one view.", "สลับตัวกรองหรือช่วงเวลาของมุมมองเดียว", "segmentedControl"),
    ],
  },
  segmentedControl: {
    use: [
      l("Two to five options that change one view: Day / Week / Month, List / Board.", "ตัวเลือก 2–5 ตัวที่เปลี่ยนมุมมองเดียว เช่น วัน / สัปดาห์ / เดือน หรือ รายการ / บอร์ด"),
    ],
    avoid: [
      l("Separate content per option.", "แต่ละตัวเลือกมีเนื้อหาแยกกัน", "tabs"),
      l("More than five options, or long labels: use a combobox.", "มีมากกว่า 5 ตัวเลือกหรือชื่อยาว ควรใช้ combobox"),
    ],
  },
  recordForm: {
    use: [
      l("Editing or creating one record with a chosen set of fields, grouped in sections.", "แก้ไขหรือสร้าง record เดียว ด้วยชุดฟิลด์ที่เลือกเอง จัดเป็นหมวด"),
    ],
    avoid: [
      l("Several steps, branching or more than one object: build a screen Flow.", "มีหลายขั้นตอน มีเงื่อนไข หรือเกี่ยวกับหลาย object ควรทำเป็น screen Flow"),
      l("The whole record with its page layout: the standard Record Detail follows the layout for you.", "ทั้ง record ตาม page layout ซึ่ง Record Detail มาตรฐานทำตาม layout ให้เอง"),
    ],
  },
  quickActions: {
    use: [
      l("The three or four things people do most on a page, as large buttons: start a Flow, open an action, follow a link.", "สิ่งที่คนทำบ่อยที่สุด 3–4 อย่างในหน้า เป็นปุ่มใหญ่ เช่น เริ่ม Flow เปิด action หรือเปิดลิงก์"),
    ],
    avoid: [
      l("Every action of the object: the highlights panel already lists them.", "action ทั้งหมดของ object ซึ่ง highlights panel แสดงอยู่แล้ว"),
      l("More than about eight buttons: nothing stands out.", "ปุ่มมากกว่าประมาณ 8 ปุ่ม จะไม่มีปุ่มไหนเด่น"),
    ],
  },
  filesGallery: {
    use: [
      l("Files of a record where the picture matters: photos, receipts, scanned documents.", "ไฟล์ของ record ที่ต้องเห็นภาพ เช่น รูปถ่าย ใบเสร็จ เอกสารสแกน"),
    ],
    avoid: [
      l("Uploading files: add the standard Files related list or a file upload next to it.", "การอัปโหลดไฟล์ ให้วาง related list Files มาตรฐานหรือปุ่มอัปโหลดคู่กัน"),
      l("Related records that are not files.", "record ลูกที่ไม่ใช่ไฟล์", "relatedCards"),
    ],
  },
  announcement: {
    use: [
      l("A message for everyone who opens the page: maintenance, a policy change, a deadline.", "ข้อความถึงทุกคนที่เปิดหน้านี้ เช่น ปิดปรับปรุง เปลี่ยนนโยบาย กำหนดส่ง"),
    ],
    avoid: [
      l("Feedback after an action: use a toast.", "แจ้งผลหลังกดปุ่ม ควรใช้ toast"),
      l("Messages that must be acknowledged: closing it is remembered in that browser only.", "ข้อความที่ต้องมีหลักฐานว่ารับทราบ เพราะการปิดถูกจำไว้เฉพาะในเบราว์เซอร์นั้น"),
    ],
  },
  slaTimer: {
    use: [
      l("Time left until a DateTime field on the record: a response or resolution deadline.", "เวลาที่เหลือจนถึงฟิลด์ DateTime ของ record เช่น กำหนดตอบกลับหรือปิดเคส"),
    ],
    avoid: [
      l("Entitlement milestones with business hours: the standard Milestones component knows them.", "milestone ของ entitlement ที่คิดตามเวลาทำการ ซึ่ง Milestones มาตรฐานรองรับ"),
      l("Progress that is not about time.", "ความคืบหน้าที่ไม่เกี่ยวกับเวลา", "progressRing"),
    ],
  },
  brandLoader: {
    use: [
      l("Once per Lightning page, to give standard components the Mintel brand (Theme = brand).", "หน้า Lightning ละ 1 ตัว เพื่อให้ component มาตรฐานเป็นแบรนด์ Mintel (Theme = brand)"),
      l("To make Mintel components follow the org's own theme (Theme = follow-org).", "ให้ component ของ Mintel ใช้ธีมของ org (Theme = follow-org)"),
    ],
    avoid: [
      l("Experience Cloud LWR sites: link the stylesheet in the head markup instead, so it loads before the page paints.", "เว็บ Experience Cloud แบบ LWR ควรใส่ stylesheet ใน head markup แทน เพื่อให้โหลดก่อนหน้าเว็บแสดงผล"),
      l("More than one per page with different themes.", "วางหลายตัวในหน้าเดียวโดยตั้ง Theme ต่างกัน"),
    ],
  },
}

// Build-time check: every guide and every "use instead" link points at a real component.
{
  const names = new Set(SF_INDEX.map((c) => c.name))
  for (const [name, g] of Object.entries(SF_GUIDES)) {
    if (!names.has(name)) throw new Error(`sf-guides: unknown component "${name}"`)
    for (const line of [...g.use, ...g.avoid]) if (line.alt && !names.has(line.alt)) throw new Error(`sf-guides: "${name}" links to unknown component "${line.alt}"`)
  }
}
