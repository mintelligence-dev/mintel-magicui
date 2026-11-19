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
  badge: {
    use: [l("A short status or count next to a title or in a table cell.", "สถานะหรือจำนวนสั้นๆ ข้างหัวข้อหรือในช่องตาราง")],
    avoid: [
      l("Something people click: use a button.", "สิ่งที่กดได้ ควรใช้ button", "button"),
      l("Sentences or long labels: a badge should be one or two words.", "ประโยคหรือข้อความยาว badge ควรมีแค่ 1–2 คำ"),
    ],
  },
  card: {
    use: [l("Grouping related content with a title and, if needed, an action.", "จัดกลุ่มเนื้อหาที่เกี่ยวข้องกัน พร้อมหัวข้อและปุ่มถ้าจำเป็น")],
    avoid: [
      l("Content over an image, gradient or video: use a glass card.", "เนื้อหาที่วางบนรูป พื้นไล่สี หรือวิดีโอ ควรใช้ glass card", "glass-card"),
      l("Rows of settings: use a grouped list.", "แถวของการตั้งค่า ควรใช้ grouped list", "grouped-list"),
      l("Cards inside cards.", "card ซ้อนใน card"),
    ],
  },
  input: {
    use: [l("One line of free text: a name, an email, a search term.", "ข้อความอิสระบรรทัดเดียว เช่น ชื่อ อีเมล คำค้นหา")],
    avoid: [
      l("A Thai national ID number: use the Thai ID input.", "เลขบัตรประชาชน ควรใช้ Thai ID input", "thai-id-input"),
      l("A Thai phone number: use the Thai phone input.", "เบอร์โทรไทย ควรใช้ Thai phone input", "thai-phone-input"),
      l("More than one line: use a textarea.", "ข้อความหลายบรรทัด ควรใช้ textarea", "textarea"),
    ],
  },
  table: {
    use: [l("A small table that does not need searching or sorting.", "ตารางเล็กๆ ที่ไม่ต้องค้นหาหรือเรียง")],
    avoid: [
      l("Search, sorting, selection or paging: use the data table.", "ต้องค้นหา เรียง เลือกแถว หรือแบ่งหน้า ควรใช้ data table", "data-table"),
      l("Thousands of rows: use the virtual table.", "ข้อมูลหลักพันแถว ควรใช้ virtual table", "virtual-table"),
    ],
  },
  timeline: {
    use: [l("An ordered history of what happened: status changes, shipment steps, an audit trail.", "ประวัติเหตุการณ์ตามลำดับ เช่น การเปลี่ยนสถานะ ขั้นตอนจัดส่ง บันทึกการแก้ไข")],
    avoid: [
      l("Steps the user is working through now: use a stepper.", "ขั้นตอนที่ผู้ใช้กำลังทำอยู่ ควรใช้ stepper", "stepper"),
      l("A chat between people: use the conversation view.", "แชตระหว่างคน ควรใช้ conversation", "conversation"),
    ],
  },
  avatar: {
    use: [l("A person or account, with initials when there is no photo.", "แทนคนหรือบัญชี แสดงตัวย่อชื่อเมื่อไม่มีรูป")],
    avoid: [
      l("Icons or logos that are not a person or account.", "ไอคอนหรือโลโก้ที่ไม่ได้แทนคนหรือบัญชี"),
      l("Showing a status on its own: use a badge.", "แสดงสถานะอย่างเดียว ควรใช้ badge", "badge"),
    ],
  },
  skeleton: {
    use: [l("Holding the place of content while it loads for the first time, in the shape of that content.", "จองที่ของเนื้อหาระหว่างโหลดครั้งแรก โดยมีรูปร่างเหมือนเนื้อหาจริง")],
    avoid: [
      l("There is no data: use an empty state.", "ไม่มีข้อมูล ควรใช้ empty state", "empty-state"),
      l("A task with known progress, such as an upload: use progress.", "งานที่รู้ความคืบหน้า เช่น อัปโหลด ควรใช้ progress", "progress"),
    ],
  },
  progress: {
    use: [l("A running task: an upload, an import, a multi-file save. Use the indeterminate bar when the length is unknown.", "งานที่กำลังทำ เช่น อัปโหลด นำเข้าข้อมูล ถ้าไม่รู้ว่านานแค่ไหนใช้แบบ indeterminate")],
    avoid: [
      l("One percentage shown as a figure in a card: use the progress ring.", "เปอร์เซ็นต์ตัวเดียวที่แสดงเป็นตัวเลขในการ์ด ควรใช้ progress ring", "progress-ring"),
      l("Page content that is loading: use skeletons.", "เนื้อหาของหน้าที่กำลังโหลด ควรใช้ skeleton", "skeleton"),
      l("Steps of a process: use a stepper.", "ขั้นตอนของกระบวนการ ควรใช้ stepper", "stepper"),
    ],
  },
  "progress-ring": {
    use: [l("One percentage as a compact figure: a goal reached, a probability, a quota used.", "เปอร์เซ็นต์ตัวเดียวแบบกะทัดรัด เช่น ความคืบหน้าเป้าหมาย โอกาสปิดการขาย โควตาที่ใช้ไป")],
    avoid: [
      l("Progress of a running task: use progress.", "ความคืบหน้าของงานที่กำลังทำ ควรใช้ progress", "progress"),
      l("Comparing several values: use a chart.", "เปรียบเทียบหลายค่า ควรใช้ chart", "chart"),
    ],
  },
  accordion: {
    use: [l("Details people open only when they need them: FAQ, advanced settings.", "รายละเอียดที่เปิดดูเมื่อจำเป็น เช่น คำถามที่พบบ่อย การตั้งค่าขั้นสูง")],
    avoid: [
      l("Content everyone must read: show it open.", "เนื้อหาที่ทุกคนต้องอ่าน ควรแสดงไว้เลย"),
      l("A hierarchy with several levels: use a tree view.", "ข้อมูลหลายชั้น ควรใช้ tree view", "tree-view"),
      l("Sibling views of one thing: use tabs.", "มุมมองระดับเดียวกันของสิ่งเดียว ควรใช้ tabs", "tabs"),
    ],
  },
  breadcrumb: {
    use: [l("Showing where a page sits in a hierarchy three or more levels deep.", "บอกตำแหน่งของหน้าในโครงสร้างที่ลึก 3 ชั้นขึ้นไป")],
    avoid: [
      l("Steps of a process: use a stepper.", "ขั้นตอนของกระบวนการ ควรใช้ stepper", "stepper"),
      l("Sites with one or two levels.", "เว็บที่มีแค่ 1–2 ชั้น"),
    ],
  },
  pagination: {
    use: [l("Paging through a long list that is loaded a page at a time.", "เปลี่ยนหน้าของรายการยาวที่โหลดทีละหน้า")],
    avoid: [
      l("A table that needs search and sorting too: the data table has paging built in.", "ตารางที่ต้องค้นหาและเรียงด้วย data table มีการแบ่งหน้าในตัว", "data-table"),
      l("Feeds on phones, where a Load more button is easier.", "รายการแบบ feed บนมือถือ ใช้ปุ่มโหลดเพิ่มจะง่ายกว่า"),
    ],
  },
  command: {
    use: [l("A ⌘K search over pages and actions, as a shortcut for people who use the keyboard.", "ค้นหาหน้าและคำสั่งด้วย ⌘K เป็นทางลัดสำหรับคนใช้คีย์บอร์ด")],
    avoid: [
      l("The only way to reach a feature: it must also be in the navigation.", "เป็นทางเดียวที่เข้าถึงฟีเจอร์ ต้องมีในเมนูด้วย"),
      l("Picking a value in a form: use a combobox.", "เลือกค่าในฟอร์ม ควรใช้ combobox", "combobox"),
    ],
  },
  sidebar: {
    use: [l("The shell of an app with many destinations, grouped.", "โครงของแอปที่มีหลายเมนู จัดเป็นกลุ่ม")],
    avoid: [
      l("A marketing site: use the site header section.", "เว็บ marketing ควรใช้ section header", "section-header"),
      l("A phone-first app with three to five destinations: use the tab bar.", "แอปที่ใช้บนมือถือเป็นหลักและมี 3–5 เมนู ควรใช้ tab bar", "tab-bar"),
    ],
  },
  slider: {
    use: [l("An approximate value or range where dragging feels natural: a price range, a volume.", "ค่าหรือช่วงโดยประมาณที่ลากแล้วเป็นธรรมชาติ เช่น ช่วงราคา ระดับเสียง")],
    avoid: [
      l("An exact number: use an input.", "ตัวเลขที่ต้องแม่นยำ ควรใช้ input", "input"),
      l("A few fixed options: use a segmented control.", "ตัวเลือกตายตัวไม่กี่ตัว ควรใช้ segmented control", "segmented-control"),
    ],
  },
  "toggle-group": {
    use: [l("Options that stay pressed, one or several at a time: text formatting, filters that combine.", "ตัวเลือกที่กดค้างได้ ทีละตัวหรือหลายตัว เช่น รูปแบบตัวอักษร ตัวกรองที่ใช้ร่วมกันได้")],
    avoid: [
      l("Switching one view between a few options: use a segmented control.", "สลับมุมมองเดียวระหว่างไม่กี่ตัวเลือก ควรใช้ segmented control", "segmented-control"),
      l("One setting that is on or off: use a switch.", "การตั้งค่าเดียวที่เปิดหรือปิด ควรใช้ switch", "switch"),
    ],
  },
  "tag-input": {
    use: [l("A free-form list of values people type: keywords, email addresses, labels.", "รายการค่าที่พิมพ์เองได้อิสระ เช่น คำค้น อีเมล ป้ายกำกับ")],
    avoid: [
      l("Choosing from a fixed list: use a combobox with multiple selection.", "เลือกจากรายการตายตัว ควรใช้ combobox แบบเลือกหลายค่า", "combobox"),
      l("A single value: use an input.", "ค่าเดียว ควรใช้ input", "input"),
    ],
  },
  "file-upload": {
    use: [l("Attaching documents or images, with limits on type and size.", "แนบเอกสารหรือรูป โดยจำกัดชนิดและขนาดไฟล์")],
    avoid: [
      l("Capturing a signature: use the signature pad.", "เก็บลายเซ็น ควรใช้ signature pad", "signature-pad"),
      l("Uploading without telling people the limits first.", "ให้อัปโหลดโดยไม่บอกข้อจำกัดก่อน"),
    ],
  },
  "thai-address": {
    use: [l("A postal address in Thailand: province, district, sub-district and postal code that stay consistent.", "ที่อยู่ในประเทศไทย จังหวัด อำเภอ ตำบล และรหัสไปรษณีย์ที่สอดคล้องกันเสมอ")],
    avoid: [
      l("Addresses outside Thailand: use plain inputs.", "ที่อยู่ต่างประเทศ ควรใช้ input ธรรมดา", "input"),
      l("Picking only a province: use a combobox.", "เลือกแค่จังหวัด ควรใช้ combobox", "combobox"),
    ],
  },
  "thai-id-input": {
    use: [l("A 13-digit Thai national ID number, checked as it is typed.", "เลขบัตรประชาชน 13 หลัก ตรวจความถูกต้องระหว่างพิมพ์")],
    avoid: [
      l("Passport numbers or foreign IDs: use an input.", "เลขหนังสือเดินทางหรือบัตรต่างชาติ ควรใช้ input", "input"),
      l("Proof of identity: it checks that the number is well formed, not who it belongs to.", "ใช้เป็นหลักฐานยืนยันตัวตน เพราะตรวจแค่ว่าเลขถูกรูปแบบ ไม่ได้ตรวจว่าเป็นของใคร"),
    ],
  },
  "thai-phone-input": {
    use: [l("A Thai mobile or landline number, including numbers pasted with +66.", "เบอร์มือถือหรือเบอร์บ้านของไทย รวมถึงเบอร์ที่วางมาเป็น +66")],
    avoid: [l("Numbers from other countries: use an input.", "เบอร์ต่างประเทศ ควรใช้ input", "input")],
  },
  "otp-input": {
    use: [l("A one-time code from SMS or email, four to eight digits.", "รหัสใช้ครั้งเดียวจาก SMS หรืออีเมล 4–8 หลัก")],
    avoid: [
      l("Passwords or PINs people remember: use an input.", "รหัสผ่านหรือ PIN ที่ผู้ใช้จำเอง ควรใช้ input", "input"),
      l("A Thai national ID number: use the Thai ID input.", "เลขบัตรประชาชน ควรใช้ Thai ID input", "thai-id-input"),
    ],
  },
  chart: {
    use: [l("A trend over time or a comparison between categories.", "แนวโน้มตามเวลา หรือการเปรียบเทียบระหว่างหมวด")],
    avoid: [
      l("One percentage: use the progress ring.", "เปอร์เซ็นต์ตัวเดียว ควรใช้ progress ring", "progress-ring"),
      l("Looking up exact values: use a table.", "ต้องดูค่าที่แม่นยำ ควรใช้ table", "table"),
    ],
  },
  "grouped-list": {
    use: [l("Settings and detail screens, mostly on phones: rows that open something or hold a switch.", "หน้าตั้งค่าและหน้ารายละเอียด โดยเฉพาะบนมือถือ แต่ละแถวเปิดหน้าต่อหรือมี switch")],
    avoid: [
      l("Data with several columns: use the data table.", "ข้อมูลหลายคอลัมน์ ควรใช้ data table", "data-table"),
      l("Nested items: use a tree view.", "รายการซ้อนหลายชั้น ควรใช้ tree view", "tree-view"),
    ],
  },
  conversation: {
    use: [l("A chat thread between a customer and an agent, from LINE, Messenger, TikTok or WhatsApp.", "แชตระหว่างลูกค้ากับเจ้าหน้าที่ จาก LINE, Messenger, TikTok หรือ WhatsApp")],
    avoid: [
      l("A history of events or changes: use a timeline.", "ประวัติเหตุการณ์หรือการเปลี่ยนแปลง ควรใช้ timeline", "timeline"),
    ],
  },
  "collapsing-header": {
    use: [l("Phone-style pages: a large title over long content that shrinks into a bar as you scroll.", "หน้าแบบแอปมือถือ ที่มีหัวข้อใหญ่อยู่เหนือเนื้อหายาว แล้วย่อเป็นแถบเมื่อเลื่อน")],
    avoid: [
      l("Desktop apps with many destinations: use the sidebar.", "แอปบนจอใหญ่ที่มีหลายเมนู ควรใช้ sidebar", "sidebar"),
      l("A marketing site header: use the site header section.", "header ของเว็บ marketing ควรใช้ section header", "section-header"),
    ],
  },
  label: {
    use: [l("Naming a form control that stands on its own.", "ตั้งชื่อให้ช่องกรอกที่ใช้เดี่ยวๆ")],
    avoid: [l("Fields built with the form component: its own label is wired to errors and descriptions.", "ช่องที่สร้างด้วย form เพราะ label ของ form ผูกกับข้อความผิดพลาดและคำอธิบายให้แล้ว", "form")],
  },
  textarea: {
    use: [l("Free text of more than one line: notes, a message, a reason.", "ข้อความอิสระหลายบรรทัด เช่น บันทึก ข้อความ เหตุผล")],
    avoid: [
      l("One line: use an input.", "บรรทัดเดียว ควรใช้ input", "input"),
      l("A list of separate values: use tag input.", "รายการค่าแยกกัน ควรใช้ tag input", "tag-input"),
    ],
  },
  checkbox: {
    use: [l("Independent yes/no choices in a form that is saved later, or picking several items from a list.", "ตัวเลือกใช่/ไม่ใช่ที่แยกกันในฟอร์มที่กดบันทึกทีหลัง หรือเลือกหลายรายการ")],
    avoid: [
      l("A setting that takes effect at once: use a switch.", "การตั้งค่าที่มีผลทันที ควรใช้ switch", "switch"),
      l("Picking exactly one option: use a radio group.", "เลือกได้ตัวเดียว ควรใช้ radio group", "radio-group"),
    ],
  },
  "radio-group": {
    use: [l("Picking one of two to five options that should all be visible.", "เลือก 1 จาก 2–5 ตัวเลือกที่ควรเห็นทั้งหมด")],
    avoid: [
      l("More than about five options: use a select.", "มีมากกว่าประมาณ 5 ตัวเลือก ควรใช้ select", "select"),
      l("Switching a view at once: use a segmented control.", "สลับมุมมองทันที ควรใช้ segmented control", "segmented-control"),
    ],
  },
  switch: {
    use: [l("A setting that turns on or off the moment it is toggled.", "การตั้งค่าที่เปิดหรือปิดทันทีที่กด")],
    avoid: [
      l("A choice that only applies after Save: use a checkbox.", "ตัวเลือกที่มีผลหลังกดบันทึก ควรใช้ checkbox", "checkbox"),
      l("Choosing between two named options: use a segmented control.", "เลือกระหว่างสองตัวเลือกที่มีชื่อ ควรใช้ segmented control", "segmented-control"),
    ],
  },
  form: {
    use: [l("Any form with validation: labels, descriptions and error messages stay connected to their fields.", "ฟอร์มที่มีการตรวจค่า โดย label คำอธิบาย และข้อความผิดพลาดผูกกับช่องกรอกให้เอง")],
    avoid: [l("A single field with nothing to validate, such as a search box: use an input.", "ช่องเดียวที่ไม่ต้องตรวจค่า เช่น ช่องค้นหา ควรใช้ input", "input")],
  },
  calendar: {
    use: [l("A calendar that is always on screen: booking, availability, a month overview.", "ปฏิทินที่แสดงตลอด เช่น การจอง วันว่าง ภาพรวมรายเดือน")],
    avoid: [l("A date field in a form: use the date picker.", "ช่องวันที่ในฟอร์ม ควรใช้ date picker", "date-picker")],
  },
  "date-picker": {
    use: [l("A date or date range in a form, shown in Buddhist Era years by default.", "วันที่หรือช่วงวันที่ในฟอร์ม แสดงปี พ.ศ. เป็นค่าเริ่มต้น")],
    avoid: [
      l("A calendar that stays visible: use the calendar.", "ปฏิทินที่ต้องแสดงตลอด ควรใช้ calendar", "calendar"),
      l("Dates far in the past, such as a birth date, as the only way to enter them: let people type too.", "วันที่ย้อนหลังไกลๆ เช่น วันเกิด ถ้าเลือกจากปฏิทินได้ทางเดียว ควรให้พิมพ์ได้ด้วย"),
    ],
  },
  "dropdown-menu": {
    use: [l("Actions for an item behind a button: a row's menu, a More button.", "คำสั่งของรายการที่ซ่อนหลังปุ่ม เช่น เมนูของแถว ปุ่มเพิ่มเติม")],
    avoid: [
      l("Choosing a value in a form: use a select.", "เลือกค่าในฟอร์ม ควรใช้ select", "select"),
      l("A small panel with fields or other content: use a popover.", "แผงเล็กที่มีช่องกรอกหรือเนื้อหาอื่น ควรใช้ popover", "popover"),
    ],
  },
  popover: {
    use: [l("A small panel next to its trigger: filters, a quick edit, extra detail with links.", "แผงเล็กข้างปุ่มที่เปิด เช่น ตัวกรอง แก้ไขด่วน รายละเอียดเพิ่มที่มีลิงก์")],
    avoid: [
      l("A list of actions: use a dropdown menu.", "รายการคำสั่ง ควรใช้ dropdown menu", "dropdown-menu"),
      l("A one-line hint: use a tooltip.", "คำอธิบายบรรทัดเดียว ควรใช้ tooltip", "tooltip"),
      l("A task that must be finished or cancelled: use a dialog.", "งานที่ต้องทำให้จบหรือยกเลิก ควรใช้ dialog", "dialog"),
    ],
  },
  "font-size-control": {
    use: [l("Public sites for a wide audience, including older readers: government and citizen services.", "เว็บสาธารณะที่มีผู้ใช้หลากหลาย รวมถึงผู้สูงอายุ เช่น บริการภาครัฐและประชาชน")],
    avoid: [l("Dense internal apps, where browser zoom is enough.", "แอปภายในที่ข้อมูลแน่น ใช้การซูมของเบราว์เซอร์ก็พอ")],
  },
  "animated-beam": {
    use: [l("Showing data moving between systems in an integration diagram.", "แสดงข้อมูลที่วิ่งระหว่างระบบในแผนภาพการเชื่อมต่อ")],
    avoid: [l("Decoration with no meaning, or many beams at once on phones.", "ใช้ตกแต่งโดยไม่มีความหมาย หรือใช้หลายเส้นพร้อมกันบนมือถือ")],
  },
  "animated-gradient-text": {
    use: [l("One short phrase to highlight: an announcement pill, a label above a headline.", "วลีสั้นๆ ที่อยากเน้น เช่น ป้ายประกาศ ข้อความเหนือหัวข้อ")],
    avoid: [l("Body text, long headings, or more than one per screen.", "เนื้อหา หัวข้อยาว หรือมากกว่า 1 จุดต่อหน้าจอ")],
  },
  "aurora-text": {
    use: [l("A few words of a hero headline.", "คำไม่กี่คำในหัวข้อใหญ่ของ hero")],
    avoid: [l("Body text, or next to other animated text.", "เนื้อหา หรือวางคู่กับข้อความเคลื่อนไหวอื่น")],
  },
  "blur-fade": {
    use: [l("Content appearing for the first time on a page.", "เนื้อหาที่ปรากฏครั้งแรกในหน้า")],
    avoid: [
      l("Lists or tables that re-render often.", "รายการหรือตารางที่แสดงผลใหม่บ่อย"),
      l("Revealing a statement word by word on scroll: use scroll reveal text.", "เผยข้อความทีละคำตอนเลื่อน ควรใช้ scroll reveal text", "scroll-reveal-text"),
    ],
  },
  "border-beam": {
    use: [l("Drawing the eye to one card: the featured plan, an AI feature.", "ดึงสายตาไปที่การ์ดใบเดียว เช่น แพ็กเกจแนะนำ ฟีเจอร์ AI")],
    avoid: [
      l("Several cards on the same screen.", "การ์ดหลายใบในหน้าจอเดียว"),
      l("A calmer highlight: use the shine border.", "อยากได้การเน้นที่นุ่มกว่า ควรใช้ shine border", "shine-border"),
    ],
  },
  "dot-pattern": {
    use: [l("A quiet texture behind a hero or an empty area.", "พื้นผิวเบาๆ หลัง hero หรือพื้นที่ว่าง")],
    avoid: [l("Behind dense text or tables.", "วางหลังข้อความแน่นๆ หรือตาราง")],
  },
  "magic-card": {
    use: [l("Feature cards on marketing pages viewed with a mouse.", "การ์ดฟีเจอร์ในหน้า marketing ที่ดูด้วยเมาส์")],
    avoid: [l("Data cards inside an app, or touch-first pages: use a card.", "การ์ดข้อมูลในแอป หรือหน้าที่ใช้นิ้วเป็นหลัก ควรใช้ card", "card")],
  },
  marquee: {
    use: [l("A loop of logos or short quotes that nobody needs to read in full.", "แถบวนของโลโก้หรือคำพูดสั้นๆ ที่ไม่จำเป็นต้องอ่านครบ")],
    avoid: [
      l("Information people must read.", "ข้อมูลที่ผู้ใช้ต้องอ่าน"),
      l("Items people should browse at their own pace: use the carousel section.", "รายการที่ควรเลื่อนดูเอง ควรใช้ section carousel", "section-carousel"),
    ],
  },
  meteors: {
    use: [l("A decorative hero background.", "พื้นหลังตกแต่งของ hero")],
    avoid: [l("App screens, or behind text people need to concentrate on.", "หน้าจอในแอป หรือหลังข้อความที่ต้องตั้งใจอ่าน")],
  },
  "number-ticker": {
    use: [l("A number that counts up once when it comes into view.", "ตัวเลขที่นับขึ้นครั้งเดียวเมื่อเลื่อนมาเห็น")],
    avoid: [
      l("Values that change often: the animation would never settle.", "ค่าที่เปลี่ยนบ่อย เพราะ animation จะไม่หยุด"),
      l("A ready-made row of statistics: use the stats section.", "แถวสถิติสำเร็จรูป ควรใช้ section stats", "section-stats"),
    ],
  },
  "shimmer-button": {
    use: [l("The one main call to action on a marketing page.", "ปุ่มหลักเพียงปุ่มเดียวในหน้า marketing")],
    avoid: [
      l("Ordinary actions inside an app: use a button.", "คำสั่งทั่วไปในแอป ควรใช้ button", "button"),
      l("More than one on a screen.", "มากกว่า 1 ปุ่มในหน้าจอเดียว"),
    ],
  },
  "shine-border": {
    use: [l("A calm animated border on one highlighted card.", "ขอบเคลื่อนไหวแบบนุ่มๆ บนการ์ดที่อยากเน้น 1 ใบ")],
    avoid: [
      l("Many cards at once.", "การ์ดหลายใบพร้อมกัน"),
      l("A stronger pull on attention: use the border beam.", "อยากดึงสายตาแรงกว่านี้ ควรใช้ border beam", "border-beam"),
    ],
  },
  "glass-card": {
    use: [l("Content over an image, a gradient or video.", "เนื้อหาที่วางบนรูป พื้นไล่สี หรือวิดีโอ")],
    avoid: [
      l("Plain backgrounds, where there is nothing to see through: use a card.", "พื้นหลังเรียบที่ไม่มีอะไรให้มองทะลุ ควรใช้ card", "card"),
      l("Long text that needs steady contrast.", "ข้อความยาวที่ต้องการสีตัดกันสม่ำเสมอ"),
    ],
  },
  "glass-button": {
    use: [l("Buttons that sit on glass or on media.", "ปุ่มที่วางบนกระจกหรือบนรูปและวิดีโอ")],
    avoid: [l("Forms and ordinary app screens: use a button.", "ฟอร์มและหน้าจอทั่วไปในแอป ควรใช้ button", "button")],
  },
  "glass-navbar": {
    use: [l("Top navigation that floats over a hero or media.", "เมนูด้านบนที่ลอยเหนือ hero หรือรูป")],
    avoid: [
      l("An app with many destinations: use the sidebar.", "แอปที่มีหลายเมนู ควรใช้ sidebar", "sidebar"),
      l("A complete site header with a phone menu: use the site header section.", "header เว็บสำเร็จรูปพร้อมเมนูมือถือ ควรใช้ section header", "section-header"),
    ],
  },
  "scroll-reveal-text": {
    use: [l("One key statement on a landing page.", "ข้อความสำคัญเพียงข้อเดียวในหน้า landing")],
    avoid: [l("Body copy, or anything people need to read at once.", "เนื้อหาทั่วไป หรือข้อมูลที่ต้องอ่านได้ทันที")],
  },
  "sticky-showcase": {
    use: [l("Explaining three to five features, each with its own visual, while scrolling.", "อธิบายฟีเจอร์ 3–5 ข้อ แต่ละข้อมีภาพของตัวเอง ระหว่างเลื่อนหน้า")],
    avoid: [
      l("More than about six items.", "มากกว่าประมาณ 6 ข้อ"),
      l("A ready-made section with copy and visuals: use the feature scroll section.", "อยากได้ section สำเร็จรูป ควรใช้ section feature scroll", "section-feature-scroll"),
    ],
  },
  "zoom-parallax": {
    use: [l("One striking media moment on a landing page.", "ช่วงโชว์ภาพเด่นเพียงครั้งเดียวในหน้า landing")],
    avoid: [l("More than once on a page, or inside an app.", "ใช้มากกว่า 1 ครั้งต่อหน้า หรือใช้ในแอป")],
  },
  dock: {
    use: [l("Up to about seven shortcuts on a desktop screen.", "ทางลัดไม่เกินประมาณ 7 อันบนจอใหญ่")],
    avoid: [
      l("Main navigation on phones: use the tab bar.", "เมนูหลักบนมือถือ ควรใช้ tab bar", "tab-bar"),
      l("Many destinations: use the sidebar.", "มีหลายเมนู ควรใช้ sidebar", "sidebar"),
    ],
  },
  "animated-tabs": {
    use: [l("Tabs on marketing pages where the sliding indicator is part of the look.", "tabs ในหน้า marketing ที่อยากให้ตัวชี้เลื่อนเป็นส่วนหนึ่งของดีไซน์")],
    avoid: [
      l("Ordinary app tabs: use tabs.", "tabs ทั่วไปในแอป ควรใช้ tabs", "tabs"),
      l("Filtering one view: use a segmented control.", "กรองมุมมองเดียว ควรใช้ segmented control", "segmented-control"),
    ],
  },
  drawer: {
    use: [l("Actions or a short form on phones, sliding up from the bottom.", "คำสั่งหรือฟอร์มสั้นๆ บนมือถือ เลื่อนขึ้นจากด้านล่าง")],
    avoid: [
      l("A side panel on desktop: use a sheet.", "แผงด้านข้างบนจอใหญ่ ควรใช้ sheet", "sheet"),
      l("A yes/no confirmation: use a dialog.", "การยืนยันใช่/ไม่ใช่ ควรใช้ dialog", "dialog"),
    ],
  },
  "tab-bar": {
    use: [l("Three to five top-level destinations in a mobile web app.", "เมนูหลัก 3–5 อันในเว็บแอปบนมือถือ")],
    avoid: [
      l("More than five destinations, or desktop layouts: use the sidebar.", "มีมากกว่า 5 เมนู หรือเป็นจอใหญ่ ควรใช้ sidebar", "sidebar"),
    ],
  },
  "section-header": {
    use: [l("The header of a marketing or company site.", "header ของเว็บ marketing หรือเว็บบริษัท")],
    avoid: [l("An app with many destinations: use the sidebar.", "แอปที่มีหลายเมนู ควรใช้ sidebar", "sidebar")],
  },
  "section-hero-split": {
    use: [l("A hero when you have a product screenshot or mockup to show.", "hero ที่มีภาพหน้าจอหรือ mockup ของสินค้าให้โชว์")],
    avoid: [l("No visual to show: use the centered hero.", "ไม่มีภาพให้โชว์ ควรใช้ hero แบบกึ่งกลาง", "section-hero-centered")],
  },
  "section-hero-centered": {
    use: [l("A hero that is carried by its headline, with no product image.", "hero ที่เด่นด้วยหัวข้อ ไม่มีภาพสินค้า")],
    avoid: [l("You have a product screenshot: use the split hero.", "มีภาพหน้าจอสินค้า ควรใช้ hero แบบสองคอลัมน์", "section-hero-split")],
  },
  "section-logo-cloud": {
    use: [l("Customer or partner logos you have permission to show.", "โลโก้ลูกค้าหรือพาร์ตเนอร์ที่ได้รับอนุญาตให้แสดง")],
    avoid: [
      l("Fewer than about four logos.", "มีโลโก้น้อยกว่าประมาณ 4 ราย"),
      l("What customers said: use testimonials.", "คำพูดของลูกค้า ควรใช้ testimonials", "section-testimonials"),
    ],
  },
  "section-testimonials": {
    use: [l("Real customer quotes with a name and role.", "คำพูดจริงของลูกค้า พร้อมชื่อและตำแหน่ง")],
    avoid: [l("Logos without quotes: use the logo cloud.", "มีแต่โลโก้ไม่มีคำพูด ควรใช้ logo cloud", "section-logo-cloud")],
  },
  "section-stats": {
    use: [l("Three or four numbers you can back up.", "ตัวเลข 3–4 ตัวที่มีที่มายืนยันได้")],
    avoid: [l("Numbers inside an app that update: show them as plain figures or a chart.", "ตัวเลขในแอปที่เปลี่ยนตลอด ควรแสดงเป็นตัวเลขธรรมดาหรือ chart", "chart")],
  },
  "section-feature-grid": {
    use: [l("Three to nine features of equal weight, each a title and a line of text.", "ฟีเจอร์ 3–9 ข้อที่สำคัญพอกัน แต่ละข้อมีหัวข้อกับคำอธิบายหนึ่งบรรทัด")],
    avoid: [
      l("Features that need a visual each: use the bento grid.", "ฟีเจอร์ที่ต้องมีภาพประกอบ ควรใช้ bento grid", "section-feature-bento"),
      l("A story told in order: use feature scroll.", "เรื่องราวที่เล่าตามลำดับ ควรใช้ feature scroll", "section-feature-scroll"),
    ],
  },
  "section-feature-scroll": {
    use: [l("Three to five features told as a story, each with a visual.", "ฟีเจอร์ 3–5 ข้อที่เล่าเป็นเรื่องราว แต่ละข้อมีภาพ")],
    avoid: [l("Many short features: use the feature grid.", "ฟีเจอร์สั้นๆ จำนวนมาก ควรใช้ feature grid", "section-feature-grid")],
  },
  "section-feature-slideshow": {
    use: [l("Features that each need a large screenshot, in limited space.", "ฟีเจอร์ที่แต่ละข้อต้องมีภาพหน้าจอใหญ่ ในพื้นที่จำกัด")],
    avoid: [l("Content everyone should see without clicking: use the feature grid.", "เนื้อหาที่ทุกคนควรเห็นโดยไม่ต้องกด ควรใช้ feature grid", "section-feature-grid")],
  },
  "section-feature-bento": {
    use: [l("Features of different importance, with small visuals.", "ฟีเจอร์ที่สำคัญไม่เท่ากัน พร้อมภาพประกอบเล็กๆ")],
    avoid: [l("Equal features with text only: use the feature grid.", "ฟีเจอร์ที่สำคัญเท่ากันและมีแต่ข้อความ ควรใช้ feature grid", "section-feature-grid")],
  },
  "section-carousel": {
    use: [l("Browsing items of one kind: case studies, screenshots, products.", "เลื่อนดูรายการประเภทเดียวกัน เช่น ผลงาน ภาพหน้าจอ สินค้า")],
    avoid: [
      l("Key content, which would be hidden behind the first slide.", "เนื้อหาสำคัญ เพราะจะถูกซ่อนหลังสไลด์แรก"),
      l("Logos: use the logo cloud.", "โลโก้ ควรใช้ logo cloud", "section-logo-cloud"),
    ],
  },
  "section-pricing": {
    use: [l("Two or three public plans with prices.", "แพ็กเกจ 2–3 แบบที่เปิดเผยราคา")],
    avoid: [l("Pricing by quote only: use the contact section.", "ราคาที่ต้องขอใบเสนอราคา ควรใช้ section contact", "section-contact")],
  },
  "section-faq": {
    use: [l("Four to ten questions people really ask.", "คำถาม 4–10 ข้อที่มีคนถามจริง")],
    avoid: [l("Long documentation: link to a help center.", "เอกสารยาว ควรลิงก์ไปศูนย์ช่วยเหลือ")],
  },
  "section-cta": {
    use: [l("Closing a page with one action.", "ปิดท้ายหน้าด้วยการกระทำเดียว")],
    avoid: [l("More than once on a page.", "ใช้มากกว่า 1 ครั้งต่อหน้า")],
  },
  "section-contact": {
    use: [l("Company contact details with a short enquiry form.", "ข้อมูลติดต่อบริษัท พร้อมฟอร์มสอบถามสั้นๆ")],
    avoid: [l("Long applications or sign-up flows: build them with the form component.", "แบบฟอร์มยาวหรือขั้นตอนสมัคร ควรสร้างด้วย form", "form")],
  },
  "section-footer": {
    use: [l("The footer of a marketing or company site.", "footer ของเว็บ marketing หรือเว็บบริษัท")],
    avoid: [l("App screens.", "หน้าจอในแอป")],
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
