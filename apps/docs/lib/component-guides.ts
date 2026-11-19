// "When to use / when not to" for the components people reach for most. `[en, th]` pairs;
// an `alt` names another registry item to use instead (rendered as a link).
import items from "@/registry/items.json"

type Line = { en: string; th: string; alt?: string }
export type ComponentGuide = { use: Line[]; avoid: Line[] }

const l = (en: string, th: string, alt?: string): Line => ({ en, th, alt })

export const COMPONENT_GUIDES: Record<string, ComponentGuide> = {
  button: {
    use: [
      l("The main action of a page or dialog: one brand or default button per view.", "การกระทำหลักของหน้าหรือ dialog ใช้ปุ่ม brand หรือ default แค่ 1 ปุ่มต่อหน้าจอ"),
      l("Secondary actions next to it, with outline or ghost.", "การกระทำรองที่วางคู่กัน ใช้ outline หรือ ghost"),
      l("Destructive actions, with destructive and a confirmation step.", "การลบหรือยกเลิกถาวร ใช้ destructive พร้อมขั้นยืนยัน"),
    ],
    avoid: [
      l("Going to another page: use a link, so open-in-new-tab and history work.", "พาไปหน้าอื่น ควรใช้ลิงก์ เพื่อให้เปิดแท็บใหม่และกดย้อนกลับได้"),
      l("Several brand buttons side by side: nothing stands out any more.", "วางปุ่ม brand หลายปุ่มติดกัน จะไม่มีปุ่มไหนเด่นเลย"),
      l("Switching between views: use tabs or a segmented control.", "สลับมุมมอง ควรใช้ tabs หรือ segmented control", "tabs"),
    ],
  },
  dialog: {
    use: [
      l("A short task that must be finished or cancelled before going on: confirm, rename, a small form.", "งานสั้นๆ ที่ต้องทำให้จบหรือยกเลิกก่อนไปต่อ เช่น ยืนยัน เปลี่ยนชื่อ ฟอร์มเล็ก"),
      l("Confirming something that cannot be undone.", "ยืนยันสิ่งที่ย้อนกลับไม่ได้"),
    ],
    avoid: [
      l("Long forms or content people compare with the page: use a sheet.", "ฟอร์มยาวหรือเนื้อหาที่ต้องดูคู่กับหน้าเดิม ควรใช้ sheet", "sheet"),
      l("Telling people something happened: use a toast.", "แจ้งว่าทำสำเร็จแล้ว ควรใช้ toast", "toast"),
      l("Opening a dialog from a dialog.", "เปิด dialog ซ้อนใน dialog"),
    ],
  },
  sheet: {
    use: [
      l("Details or edit forms beside a list, keeping the list in view.", "ดูรายละเอียดหรือแก้ไขข้างรายการ โดยยังเห็นรายการอยู่"),
      l("Filters and settings that take more room than a popover.", "ตัวกรองและการตั้งค่าที่ยาวเกิน popover"),
    ],
    avoid: [
      l("A yes/no confirmation: use a dialog.", "การยืนยันใช่/ไม่ใช่ ควรใช้ dialog", "dialog"),
      l("Phones, where a bottom drawer is easier to reach.", "บนมือถือ ใช้ drawer จากด้านล่างจะเอื้อมถึงง่ายกว่า", "drawer"),
    ],
  },
  select: {
    use: [
      l("Picking one option from a short, known list (about 5–15).", "เลือก 1 ค่าจากรายการสั้นที่รู้อยู่แล้ว (ประมาณ 5–15 ตัวเลือก)"),
    ],
    avoid: [
      l("Long lists people need to search: use a combobox.", "รายการยาวที่ต้องค้นหา ควรใช้ combobox", "combobox"),
      l("Two to four options that should all be visible: use radio buttons or a segmented control.", "มี 2–4 ตัวเลือกที่ควรเห็นทั้งหมด ควรใช้ radio หรือ segmented control", "radio-group"),
      l("Several values at once: use tag input or checkboxes.", "เลือกหลายค่า ควรใช้ tag input หรือ checkbox", "tag-input"),
    ],
  },
  combobox: {
    use: [
      l("Long lists people search by typing: provinces, customers, products.", "รายการยาวที่ต้องพิมพ์ค้นหา เช่น จังหวัด ลูกค้า สินค้า"),
    ],
    avoid: [
      l("Fewer than about 7 options: a select is quicker.", "ตัวเลือกน้อยกว่าประมาณ 7 ตัว ใช้ select จะเร็วกว่า", "select"),
      l("Free text with suggestions only: use an input.", "ข้อความอิสระที่มีแค่คำแนะนำ ควรใช้ input", "input"),
    ],
  },
  tabs: {
    use: [
      l("Sibling views of the same thing: Overview, Cases, Files of one account.", "มุมมองระดับเดียวกันของสิ่งเดียวกัน เช่น ภาพรวม เคส ไฟล์ ของลูกค้ารายเดียว"),
    ],
    avoid: [
      l("Steps that must be done in order: use a stepper.", "ขั้นตอนที่ต้องทำตามลำดับ ควรใช้ stepper", "stepper"),
      l("Filtering one list (Day / Week / Month): use a segmented control.", "กรองรายการเดียว (วัน / สัปดาห์ / เดือน) ควรใช้ segmented control", "segmented-control"),
      l("More than about 6 tabs, or content people compare side by side.", "มีมากกว่าประมาณ 6 แท็บ หรือเนื้อหาที่ต้องเทียบกัน"),
    ],
  },
  "segmented-control": {
    use: [
      l("Two to five options that change one view: Day / Week / Month, List / Board.", "ตัวเลือก 2–5 ตัวที่เปลี่ยนมุมมองเดียว เช่น วัน / สัปดาห์ / เดือน หรือ รายการ / บอร์ด"),
    ],
    avoid: [
      l("Separate content per option: use tabs.", "แต่ละตัวเลือกมีเนื้อหาแยกกัน ควรใช้ tabs", "tabs"),
      l("Turning several options on at once: use a toggle group.", "เปิดหลายตัวเลือกพร้อมกัน ควรใช้ toggle group", "toggle-group"),
      l("More than five options or long labels: use a select.", "มีมากกว่า 5 ตัวเลือกหรือชื่อยาว ควรใช้ select", "select"),
    ],
  },
  toast: {
    use: [
      l("Confirming an action finished: saved, sent, copied.", "ยืนยันว่าการกระทำเสร็จแล้ว เช่น บันทึกแล้ว ส่งแล้ว คัดลอกแล้ว"),
      l("Offering a quick undo.", "ให้กดย้อนกลับ (undo) ได้ทันที"),
    ],
    avoid: [
      l("Errors people must fix: show them next to the field or with an alert.", "ข้อผิดพลาดที่ต้องแก้ ควรแสดงข้างช่องกรอกหรือใช้ alert", "alert"),
      l("Anything people need to read later: toasts disappear.", "ข้อมูลที่ต้องกลับมาอ่าน เพราะ toast หายไปเอง"),
    ],
  },
  alert: {
    use: [
      l("A message about the whole page or section that stays: maintenance, missing setup, a failed save.", "ข้อความที่เกี่ยวกับทั้งหน้าหรือทั้งส่วนและต้องอยู่ค้าง เช่น ปิดปรับปรุง ยังตั้งค่าไม่ครบ บันทึกไม่สำเร็จ"),
    ],
    avoid: [
      l("Success after an action: use a toast.", "แจ้งสำเร็จหลังกดปุ่ม ควรใช้ toast", "toast"),
      l("Several alerts stacked: combine them or fix the cause.", "alert หลายอันซ้อนกัน ควรรวมเป็นอันเดียวหรือแก้ที่ต้นเหตุ"),
    ],
  },
  tooltip: {
    use: [
      l("Naming an icon-only button.", "บอกชื่อปุ่มที่มีแต่ไอคอน"),
      l("A short hint that is nice to have, not needed.", "คำอธิบายสั้นๆ ที่มีก็ดี ไม่มีก็ได้"),
    ],
    avoid: [
      l("Information people need to finish a task: phones and keyboards may never show it.", "ข้อมูลที่จำเป็นต่อการทำงาน เพราะบนมือถือและคีย์บอร์ดอาจไม่เคยเห็น"),
      l("Links or buttons inside: use a popover.", "มีลิงก์หรือปุ่มอยู่ข้างใน ควรใช้ popover", "popover"),
    ],
  },
  "data-table": {
    use: [
      l("Up to a few thousand rows people search, sort, select and page through.", "ข้อมูลไม่เกินหลักพันแถวที่ต้องค้นหา เรียง เลือก และแบ่งหน้า"),
    ],
    avoid: [
      l("Tens of thousands of rows in one scroll: use the virtual table.", "ข้อมูลหลักหมื่นแถวในการเลื่อนครั้งเดียว ควรใช้ virtual table", "virtual-table"),
      l("A few static rows: a plain table is lighter.", "ข้อมูลไม่กี่แถวที่ไม่เปลี่ยน ใช้ table ธรรมดาเบากว่า", "table"),
      l("Phones as the main device: consider a grouped list.", "ใช้งานบนมือถือเป็นหลัก ลองใช้ grouped list", "grouped-list"),
    ],
  },
  "virtual-table": {
    use: [
      l("Thousands to tens of thousands of rows people scroll and sort in one go.", "ข้อมูลหลักพันถึงหลักหมื่นแถวที่ต้องเลื่อนและเรียงในที่เดียว"),
    ],
    avoid: [
      l("Data that needs pagination, search and row selection built in: use the data table.", "ต้องการแบ่งหน้า ค้นหา และเลือกแถวในตัว ควรใช้ data table", "data-table"),
      l("Pages people print or read with find-in-page: rows out of view are not in the page.", "หน้าที่ต้องพิมพ์หรือค้นด้วย Ctrl+F เพราะแถวที่ไม่อยู่บนจอจะไม่ถูกแสดงในหน้า"),
    ],
  },
  stepper: {
    use: [
      l("A process done in order: sign-up, checkout, a case moving through stages.", "กระบวนการที่ทำตามลำดับ เช่น สมัครสมาชิก ชำระเงิน เคสที่ผ่านแต่ละสถานะ"),
    ],
    avoid: [
      l("Views people jump between freely: use tabs.", "มุมมองที่สลับไปมาได้อิสระ ควรใช้ tabs", "tabs"),
      l("More than about 7 steps: group them.", "มีมากกว่าประมาณ 7 ขั้น ควรจัดกลุ่มใหม่"),
    ],
  },
  "empty-state": {
    use: [
      l("A list or page with nothing yet: say why and offer the next step.", "รายการหรือหน้าที่ยังไม่มีข้อมูล บอกเหตุผลและให้ปุ่มทำขั้นถัดไป"),
      l("A search with no results, with a way to clear filters.", "ค้นหาแล้วไม่เจอ พร้อมปุ่มล้างตัวกรอง"),
    ],
    avoid: [
      l("While data is still loading: use skeletons.", "ระหว่างโหลดข้อมูล ควรใช้ skeleton", "skeleton"),
      l("Errors: say what went wrong with an alert.", "เกิดข้อผิดพลาด ควรบอกสาเหตุด้วย alert", "alert"),
    ],
  },
  "tree-view": {
    use: [
      l("Nested data people open level by level: folders, org units, categories.", "ข้อมูลซ้อนกันที่เปิดดูทีละชั้น เช่น โฟลเดอร์ หน่วยงาน หมวดหมู่"),
    ],
    avoid: [
      l("Only one or two levels: an accordion or grouped list is simpler.", "มีแค่ 1–2 ชั้น ใช้ accordion หรือ grouped list จะง่ายกว่า", "accordion"),
      l("Site navigation: use the sidebar.", "เมนูนำทางของเว็บ ควรใช้ sidebar", "sidebar"),
    ],
  },
  "signature-pad": {
    use: [
      l("Consent and delivery forms that need a signature on screen.", "ฟอร์มยินยอมหรือรับสินค้าที่ต้องลงชื่อบนจอ"),
    ],
    avoid: [
      l("Legally binding e-signatures: use a certified e-signature service; a drawn image alone proves little.", "ลายเซ็นอิเล็กทรอนิกส์ที่ต้องมีผลทางกฎหมาย ควรใช้บริการ e-signature ที่รับรอง เพราะรูปลายเซ็นอย่างเดียวพิสูจน์ได้น้อย"),
      l("Signing in or identity checks: use OTP or Thai ID verification.", "การเข้าสู่ระบบหรือยืนยันตัวตน ควรใช้ OTP หรือการยืนยันเลขบัตรประชาชน", "otp-input"),
    ],
  },
}

// Build-time check: every guide and every "use instead" link points at a real registry item.
{
  const names = new Set((items as { name: string }[]).map((i) => i.name))
  for (const [name, g] of Object.entries(COMPONENT_GUIDES)) {
    if (!names.has(name)) throw new Error(`component-guides: unknown item "${name}"`)
    for (const line of [...g.use, ...g.avoid]) if (line.alt && !names.has(line.alt)) throw new Error(`component-guides: "${name}" links to unknown item "${line.alt}"`)
  }
}
