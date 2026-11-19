import items from "@/registry/items.json"

export type Category = "core" | "forms" | "data" | "navigation" | "effects" | "glass" | "motion" | "mobile"

export type RegistryItem = {
  name: string
  title: string
  description: string
  category: Category
  dependencies: string[]
  files: string[]
}

export const CATEGORY_ORDER: Category[] = ["core", "forms", "data", "navigation", "glass", "motion", "mobile", "effects"]

export const CATEGORY_LABEL: Record<Category, { en: string; th: string }> = {
  core: { en: "Core UI", th: "Core UI" },
  forms: { en: "Forms", th: "Forms" },
  data: { en: "Data display", th: "แสดงข้อมูล" },
  navigation: { en: "Navigation", th: "นำทาง" },
  effects: { en: "Effects", th: "Effects" },
  glass: { en: "Glass", th: "Glass" },
  motion: { en: "Fluid Motion", th: "Fluid Motion" },
  mobile: { en: "Mobile", th: "Mobile" },
}

type RawItem = {
  name: string
  title: string
  description: string
  dependencies?: string[]
  files: { path: string }[]
  meta?: { category?: string }
}

// Core UI items that belong to the "Forms" group in the docs navigation.
const FORM_ITEMS = new Set([
  "input", "label", "textarea", "checkbox", "radio-group", "switch", "select", "combobox", "calendar", "date-picker", "form",
  "file-upload", "thai-address",
])

const DATA_ITEMS = new Set(["table", "data-table", "chart", "timeline", "stepper", "grouped-list"])
const NAV_ITEMS = new Set(["breadcrumb", "pagination", "accordion", "sheet", "collapsing-header"])

const categoryOf = (it: RawItem): Category =>
  (it.meta?.category as Category) ??
  (FORM_ITEMS.has(it.name) ? "forms" : DATA_ITEMS.has(it.name) ? "data" : NAV_ITEMS.has(it.name) ? "navigation" : "core")

export const ITEMS: RegistryItem[] = (items as RawItem[]).map((it) => ({
  name: it.name,
  title: it.title,
  description: it.description,
  category: categoryOf(it),
  dependencies: it.dependencies ?? [],
  files: it.files.map((f) => f.path),
}))

/** Number of registry items in the given categories (all when omitted). */
export const countItems = (...categories: Category[]) =>
  categories.length ? ITEMS.filter((i) => categories.includes(i.category)).length : ITEMS.length

export const itemsByCategory = () =>
  CATEGORY_ORDER.map((c) => ({ category: c, items: ITEMS.filter((i) => i.category === c) })).filter((g) => g.items.length)

export type PropDoc = { name: string; type: string; default?: string; description: { en: string; th: string } }

export type ComponentDoc = {
  /** Thai version of the registry description. */
  th: string
  /** Props Mintel adds or changes. Primitive props are documented upstream (see `upstream`). */
  props?: PropDoc[]
  /** Docs for the underlying primitive. */
  upstream?: { label: string; href: string }
}

const p = (name: string, type: string, en: string, th: string, def?: string): PropDoc => ({
  name,
  type,
  default: def,
  description: { en, th },
})

const radix = (part: string) => ({ label: `Radix ${part}`, href: `https://www.radix-ui.com/primitives/docs/components/${part.toLowerCase().replace(/ /g, "-")}` })

/** One entry per registry item — enforced at build time by scripts/build-registry.mjs. */
export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  button: {
    th: "ปุ่มพร้อม variant ของแบรนด์ (default, brand gradient, secondary, outline, ghost, destructive, link) กดแล้วยุบแบบ spring",
    props: [
      p("variant", '"default" | "brand" | "secondary" | "outline" | "ghost" | "destructive" | "link"', "Visual style. `brand` uses the brand gradient.", "รูปแบบปุ่ม `brand` ใช้ gradient ของแบรนด์", '"default"'),
      p("size", '"default" | "sm" | "lg" | "icon"', "Size. `icon` gets a 44px touch target on touch screens.", "ขนาด `icon` มีพื้นที่กด 44px บนจอสัมผัส", '"default"'),
      p("asChild", "boolean", "Render the child element (e.g. a link) with button styles.", "ใช้ element ลูก (เช่นลิงก์) แต่แต่งเป็นปุ่ม", "false"),
    ],
  },
  badge: {
    th: "ป้ายสถานะ มีแบบ brand, soft, success, warning และ destructive",
    props: [p("variant", '"default" | "brand" | "secondary" | "soft" | "success" | "warning" | "destructive" | "outline"', "Visual style.", "รูปแบบป้าย", '"default"')],
  },
  card: {
    th: "การ์ด แบ่งเป็น header, title, description, action, content และ footer ตั้ง interactive ให้ยกขึ้นตอนชี้",
    props: [p("interactive", "boolean", "Lift on hover and press on click, for cards that open something.", "ยกขึ้นตอนชี้และยุบตอนกด สำหรับการ์ดที่กดได้", "false")],
  },
  input: { th: "ช่องกรอกข้อความ ใช้ตัวอักษร 16px บนมือถือเพื่อไม่ให้ iOS ซูม ขอบเปลี่ยนสีนุ่มๆ และสั่นเบาๆ เมื่อ aria-invalid" },
  dialog: { th: "หน้าต่าง modal พื้นหลังเบลอ เปิดแบบซูมเข้า", upstream: radix("Dialog") },
  select: { th: "dropdown เลือกค่า มีเครื่องหมายถูกสีแบรนด์", upstream: radix("Select") },
  table: { th: "ตารางข้อมูล มี header, body, footer, caption และไฮไลต์แถวเมื่อชี้" },
  stepper: {
    th: "แสดงความคืบหน้าเป็นขั้นตอน มีแบบลูกศร (เหมือน Path ของ Salesforce แต่เป็นสี Mintel) และแบบวงกลมตัวเลขสำหรับฟอร์มหลายขั้น",
    props: [
      p("steps", "{ value; label; description? }[]", "Stages in order.", "ขั้นตอนตามลำดับ"),
      p("value", "string", "Current step.", "ขั้นปัจจุบัน"),
      p("variant", '"arrow" | "steps"', "Chevron path or numbered wizard.", "แบบลูกศร หรือวงกลมตัวเลข", '"arrow"'),
      p("onStepClick", "(value: string) => void", "Makes steps clickable.", "ทำให้กดเลือกขั้นได้"),
      p("selected", "string", "A picked-but-unconfirmed step (for “Mark as current”).", "ขั้นที่เลือกไว้แต่ยังไม่ยืนยัน (ใช้กับปุ่ม “ตั้งเป็นขั้นปัจจุบัน”)"),
    ],
  },
  timeline: {
    th: "ประวัติเหตุการณ์แนวตั้ง จุดหรือไอคอนมีสีตามสถานะ มีเวลาและคำอธิบาย ขั้นปัจจุบันมีวงกระเพื่อมเบาๆ",
    props: [
      p("title", "ReactNode", "Event title (TimelineItem).", "หัวข้อเหตุการณ์ (TimelineItem)"),
      p("time", "ReactNode", "Time or date shown on the right.", "เวลาหรือวันที่ แสดงด้านขวา"),
      p("icon", "ReactNode", "Icon inside a larger dot.", "ไอคอนในจุดขนาดใหญ่"),
      p("variant", '"default" | "brand" | "success" | "warning" | "destructive"', "Dot color.", "สีของจุด", '"default"'),
      p("current", "boolean", "Pulses the dot and sets aria-current.", "ให้จุดกระเพื่อม และตั้ง aria-current", "false"),
    ],
  },
  avatar: {
    th: "รูปโปรไฟล์ทรงกลม มีตัวอักษรย่อเมื่อไม่มีรูป จุดสถานะออนไลน์ วงแหวนสีแบรนด์ และแบบกลุ่มซ้อนกัน",
    props: [
      p("size", '"sm" | "default" | "lg"', "Avatar size.", "ขนาด", '"default"'),
      p("status", '"online" | "away" | "busy" | "offline"', "Presence dot.", "จุดสถานะ"),
      p("ring", "boolean", "Brand-gradient ring.", "วงแหวนสีแบรนด์", "false"),
      p("max", "number", "AvatarGroup: how many to show before “+N”.", "AvatarGroup: แสดงกี่คนก่อนรวมเป็น “+N”"),
    ],
    upstream: radix("Avatar"),
  },
  skeleton: { th: "กล่องรอโหลด มีแสงวิ่งผ่านเบาๆ ถ้าผู้ใช้ปิด motion จะเป็นการกะพริบช้าๆ แทน" },
  alert: {
    th: "ข้อความแจ้งในหน้า มีโทนปกติ แบรนด์ สำเร็จ เตือน และผิดพลาด ใส่ไอคอนได้",
    props: [p("variant", '"default" | "brand" | "success" | "warning" | "destructive"', "Tone.", "โทนสี", '"default"')],
  },
  "empty-state": {
    th: "หน้าว่างที่ดูเป็นมิตร ไอคอนมีแสงสีแบรนด์รอบๆ มีหัวข้อ คำอธิบาย และปุ่ม",
    props: [
      p("icon", "ReactNode", "Icon in the halo.", "ไอคอน"),
      p("title", "ReactNode", "Headline.", "หัวข้อ"),
      p("description", "ReactNode", "One or two short sentences.", "คำอธิบายสั้นๆ"),
      p("action", "ReactNode", "Buttons.", "ปุ่ม"),
    ],
  },
  accordion: {
    th: "หัวข้อที่กดขยายได้ ความสูงเลื่อนนุ่มๆ ลูกศรหมุนแบบ spring",
    props: [p("type", '"single" | "multiple"', "One or many open at once.", "เปิดได้ทีละอันหรือหลายอัน"), p("collapsible", "boolean", "Single: allow closing the open item.", "แบบ single: กดปิดอันที่เปิดอยู่ได้")],
    upstream: radix("Accordion"),
  },
  breadcrumb: {
    th: "เส้นทางไปยังหน้าปัจจุบัน คั่นด้วยลูกศร ย่อเป็น … ได้เมื่อยาว",
    props: [
      p("asChild", "boolean", "BreadcrumbLink: render your router's Link (its only child) instead of <a>.", "BreadcrumbLink: ใช้ Link ของ router (ลูกตัวเดียว) แทน <a>", "false"),
      p("children", "ReactNode", "BreadcrumbSeparator: custom separator icon.", "BreadcrumbSeparator: ไอคอนคั่นแบบกำหนดเอง"),
    ],
  },
  pagination: {
    th: "ตัวแบ่งหน้า แสดงหน้าแรก/สุดท้ายเสมอ มี … เมื่อหน้าเยอะ หน้าปัจจุบันเป็นสีแบรนด์ มีป้ายภาษาไทย",
    props: [
      p("page", "number", "Current page (1-based).", "หน้าปัจจุบัน (เริ่มที่ 1)"),
      p("pageCount", "number", "Total pages.", "จำนวนหน้าทั้งหมด"),
      p("onPageChange", "(page: number) => void", "Called with the new page.", "เรียกเมื่อเปลี่ยนหน้า"),
      p("siblings", "number", "Pages shown on each side of the current one.", "จำนวนหน้าข้างๆ หน้าปัจจุบัน", "1"),
      p("locale", '"en" | "th"', "Label language.", "ภาษาของป้าย", '"en"'),
    ],
  },
  sheet: {
    th: "แผงที่เลื่อนออกจากขอบจอ ใช้กับตัวกรอง รายละเอียด หรือแก้ไขเร็ว แบบล่างมีที่จับและเว้นขอบล่างของมือถือ",
    props: [p("side", '"right" | "left" | "top" | "bottom"', "SheetContent: edge to slide from.", "SheetContent: ขอบที่เลื่อนออกมา", '"right"')],
    upstream: radix("Dialog"),
  },
  "file-upload": {
    th: "ลากไฟล์มาวางหรือกดเลือก ตรวจชนิดและขนาดไฟล์ แสดงรายการไฟล์และแถบความคืบหน้าของแต่ละไฟล์",
    props: [
      p("files", "UploadFile[]", "Selected files (controlled).", "ไฟล์ที่เลือก (controlled)"),
      p("onFilesChange", "(files: UploadFile[]) => void", "Called when files are added or removed.", "เรียกเมื่อเพิ่มหรือลบไฟล์"),
      p("accept", "string", 'Like <input accept>: ".pdf,image/*".', 'เหมือน <input accept> เช่น ".pdf,image/*"'),
      p("maxSize", "number", "Max bytes per file.", "ขนาดสูงสุดต่อไฟล์ (ไบต์)"),
      p("multiple", "boolean", "Allow several files.", "เลือกได้หลายไฟล์", "true"),
      p("locale", '"en" | "th"', "Label language.", "ภาษาของป้าย", '"en"'),
    ],
  },
  "thai-address": {
    th: "ที่อยู่ไทย เลือกจังหวัด → อำเภอ → ตำบล แล้วเติมรหัสไปรษณีย์ให้ หรือพิมพ์รหัสไปรษณีย์ก่อนก็ได้ กรุงเทพฯ ใช้คำว่าเขต/แขวง ข้อมูลโหลดเมื่อใช้งานครั้งแรก",
    props: [
      p("value / defaultValue", "{ provinceId?; districtId?; subDistrictId?; zip? }", "Picked ids and postal code.", "id ที่เลือกและรหัสไปรษณีย์"),
      p("onValueChange", "(value, names) => void", "Called with ids and the names in the chosen language.", "ได้ทั้ง id และชื่อตามภาษาที่เลือก"),
      p("locale", '"th" | "en"', "Labels and place names.", "ภาษาของป้ายและชื่อสถานที่", '"th"'),
      p("dataUrl", "string", "Where the dataset is served.", "ที่อยู่ไฟล์ข้อมูล", '"/mintel/thai-address.json"'),
      p("disabled", "boolean", "Disable every field.", "ปิดการใช้งานทุกช่อง"),
    ],
  },
  "data-table": {
    th: "ตารางข้อมูลจาก TanStack Table มีช่องค้นหา กดหัวคอลัมน์เพื่อเรียง เลือกแถว และแบ่งหน้า",
    props: [
      p("columns", "ColumnDef<TData>[]", "TanStack column definitions.", "นิยามคอลัมน์ของ TanStack"),
      p("data", "TData[]", "Rows.", "ข้อมูลแต่ละแถว"),
      p("searchable", "boolean", "Show the search box.", "แสดงช่องค้นหา", "true"),
      p("selectable", "boolean", "Add a checkbox column.", "เพิ่มคอลัมน์ช่องติ๊ก", "false"),
      p("pageSize", "number", "Rows per page.", "จำนวนแถวต่อหน้า", "10"),
      p("onSelectionChange", "(rows: TData[]) => void", "Selected rows.", "แถวที่เลือก"),
      p("toolbar", "ReactNode", "Extra controls next to search.", "ปุ่มหรือตัวกรองเพิ่มข้างช่องค้นหา"),
      p("locale", '"en" | "th"', "Label language.", "ภาษาของป้าย", '"en"'),
    ],
    upstream: { label: "TanStack Table", href: "https://tanstack.com/table" },
  },
  chart: {
    th: "กราฟจาก recharts ใช้ชุดสีข้อมูลของ Mintel (--chart-1 ถึง 5) tooltip แบบกระจกและ legend",
    props: [
      p("config", "ChartConfig", "Per-series label and color; exposes --color-<key>.", "ชื่อและสีของแต่ละชุดข้อมูล ใช้เป็น --color-<key>"),
      p("valueFormatter", "(value) => ReactNode", "ChartTooltipContent: format values.", "ChartTooltipContent: จัดรูปแบบตัวเลข"),
    ],
    upstream: { label: "recharts", href: "https://recharts.org" },
  },
  "grouped-list": {
    th: "รายการแบบหน้าตั้งค่า แบ่งเป็นกลุ่มมุมโค้ง มีไอคอน ค่า ลูกศร หรือสวิตช์ด้านขวา เส้นคั่นเริ่มหลังไอคอน",
    props: [
      p("header / footer", "ReactNode", "GroupedSection: text above and below the group.", "GroupedSection: ข้อความเหนือและใต้กลุ่ม"),
      p("icon / iconTone", 'ReactNode / "brand" | "blue" | "purple" | "cyan" | "green" | "amber" | "red" | "gray"', "GroupedRow: icon in a colored tile.", "GroupedRow: ไอคอนในกล่องสี", '"brand"'),
      p("title / description", "ReactNode", "GroupedRow: main text and a smaller line.", "GroupedRow: ข้อความหลักและบรรทัดรอง"),
      p("value", "ReactNode", "GroupedRow: short value on the right.", "GroupedRow: ค่าด้านขวา"),
      p("trailing", "ReactNode", "GroupedRow: control on the right (switch …); hides the chevron.", "GroupedRow: ตัวควบคุมด้านขวา (เช่นสวิตช์) แทนลูกศร"),
      p("href / onClick", "string / () => void", "GroupedRow: makes the row a link or button with a chevron.", "GroupedRow: ทำให้แถวกดได้ เป็นลิงก์หรือปุ่ม"),
      p("destructive", "boolean", "GroupedRow: red title for actions like sign out.", "GroupedRow: หัวข้อสีแดง เช่น ออกจากระบบ", "false"),
    ],
  },
  "collapsing-header": {
    th: "หัวข้อหน้าตัวใหญ่ที่เลื่อนหายไป แล้วหัวข้อเล็กค่อยๆ โผล่ในแถบด้านบนที่กลายเป็นกระจก ใช้ได้ทั้งเลื่อนทั้งหน้าและในกล่องที่เลื่อนได้",
    props: [
      p("title", "ReactNode", "Page title (big, then compact in the bar).", "หัวข้อหน้า (ตัวใหญ่ แล้วย่อไปอยู่ในแถบ)"),
      p("leading / trailing", "ReactNode", "Bar content left and right, e.g. back and actions.", "ปุ่มซ้ายและขวาของแถบ เช่น ย้อนกลับ และปุ่มคำสั่ง"),
      p("children", "ReactNode", "Content under the big title, e.g. a search field.", "เนื้อหาใต้หัวข้อใหญ่ เช่น ช่องค้นหา"),
    ],
  },
  tabs: { th: "แท็บที่เลือกเป็นสีแบรนด์ เนื้อหาค่อยๆ ปรากฏ", upstream: radix("Tabs") },
  toast: {
    th: "แจ้งเตือนมุมจอ (sonner) วาง <Toaster /> ครั้งเดียวแล้วเรียก toast() ได้ทุกที่ สลับ dark mode ตามหน้า",
    upstream: { label: "sonner", href: "https://sonner.emilkowal.ski" },
  },
  label: { th: "ป้ายชื่อของช่องกรอก รองรับ accessibility", upstream: radix("Label") },
  textarea: { th: "ช่องข้อความหลายบรรทัด สูงขึ้นอัตโนมัติตามข้อความ" },
  checkbox: { th: "ช่องติ๊ก มีสถานะ indeterminate กดแล้วเด้งแบบ spring พื้นที่กด 44px", upstream: radix("Checkbox") },
  "radio-group": { th: "ตัวเลือกแบบเลือกได้ข้อเดียว พื้นที่กด 44px", upstream: radix("Radio Group") },
  switch: {
    th: "สวิตช์เปิด/ปิด ตัวเลื่อนใช้ spring ของแบรนด์",
    props: [p("size", '"default" | "sm"', "Switch size.", "ขนาดสวิตช์", '"default"')],
    upstream: radix("Switch"),
  },
  form: {
    th: "ชุดประกอบฟอร์มสำหรับ react-hook-form + zod ผูก label, คำอธิบาย และ error ให้ screen reader อ่านได้ถูก",
    upstream: { label: "react-hook-form", href: "https://react-hook-form.com" },
  },
  combobox: {
    th: "select ที่พิมพ์ค้นหาได้ (ไทย/อังกฤษ) เลือกหลายค่าเป็น chip และดึงตัวเลือกจาก API ได้",
    props: [
      p("options", "{ value; label; keywords?; icon?; disabled? }[]", "Options. `keywords` are searchable but hidden (e.g. the Thai or English name).", "ตัวเลือก `keywords` ใช้ค้นหาได้แต่ไม่แสดง (เช่นชื่อไทย/อังกฤษ)"),
      p("multiple", "boolean", "Select several values (shown as chips).", "เลือกได้หลายค่า แสดงเป็น chip", "false"),
      p("value / onValueChange", "string | string[]", "Controlled value (array when `multiple`).", "ค่าที่เลือก (เป็น array เมื่อ `multiple`)"),
      p("locale", '"th" | "en"', "Language of built-in strings.", "ภาษาของข้อความในตัว", '"th"'),
      p("onSearchChange", "(search: string) => void", "Called as the user types — fetch options here.", "เรียกตอนพิมพ์ ใช้ดึงตัวเลือกจาก API"),
      p("shouldFilter", "boolean", "Set false when filtering on the server.", "ตั้ง false เมื่อกรองฝั่ง server", "true"),
      p("loading", "boolean", "Show the loading row.", "แสดงสถานะกำลังโหลด", "false"),
      p("maxChips", "number", "Chips shown before “+N” (multiple only).", "จำนวน chip ก่อนแสดง “+N”", "3"),
    ],
    upstream: { label: "cmdk", href: "https://cmdk.paco.me" },
  },
  calendar: {
    th: "ปฏิทินภาษาไทย แสดงปี พ.ศ. เป็นค่าเริ่มต้น รองรับเลือกวันเดียว หลายวัน และช่วงวันที่",
    props: [
      p("era", '"buddhist" | "gregorian"', "Year display. Defaults to BE for Thai, CE for other locales.", "รูปแบบปี ค่าเริ่มต้น พ.ศ. สำหรับไทย และ ค.ศ. สำหรับภาษาอื่น"),
      p("locale", "DayPickerLocale", "Any react-day-picker locale.", "locale ของ react-day-picker", "th"),
    ],
    upstream: { label: "react-day-picker", href: "https://daypicker.dev" },
  },
  "date-picker": {
    th: "เลือกวันที่และช่วงวันที่ ภาษาไทยแสดง พ.ศ. ภาษาอังกฤษแสดง ค.ศ. ค่าที่ได้เป็น Date ปกติ",
    props: [
      p("value / onValueChange", "Date | DateRange", "Controlled value — always a normal JS Date.", "ค่าวันที่ (เป็น Date ปกติเสมอ)"),
      p("locale", '"th" | "en"', "Calendar language and built-in strings.", "ภาษาปฏิทินและข้อความในตัว", '"th"'),
      p("era", '"buddhist" | "gregorian"', "Defaults to BE for Thai and CE for English.", "ค่าเริ่มต้น พ.ศ. สำหรับไทย ค.ศ. สำหรับอังกฤษ"),
      p("dropdowns", "boolean", "Month/year dropdowns (good for birth dates).", "มี dropdown เดือน/ปี (เหมาะกับวันเกิด)", "false"),
      p("fromYear / toYear", "number", "Year range for dropdowns.", "ช่วงปีของ dropdown"),
    ],
  },
  "dropdown-menu": { th: "เมนู dropdown มีเมนูย่อย ติ๊กเลือก แสดงคีย์ลัด และแบบสีแดงสำหรับคำสั่งลบ", upstream: radix("Dropdown Menu") },
  tooltip: { th: "คำอธิบายเมื่อชี้ ใช้ได้โดยไม่ต้องครอบ provider", upstream: radix("Tooltip") },
  popover: { th: "กล่องลอยที่ผูกกับปุ่ม", upstream: radix("Popover") },
  "font-size-control": {
    th: "ปุ่มปรับขนาดตัวอักษร (ก- ก ก+) ขยายทั้งหน้าผ่าน font-size ของ html จำค่าที่เลือก และมีสคริปต์สำหรับ head ไม่ให้หน้ากระพริบ",
    props: [
      p("steps", "number[]", "Root font sizes in percent.", "ขนาดฟอนต์ของหน้าเป็นเปอร์เซ็นต์", "[87.5, 100, 112.5, 125]"),
      p("defaultStep", "number", "Index of the normal size.", "ลำดับของขนาดปกติ", "1"),
      p("locale", '"th" | "en"', "ก or A labels.", "ใช้ ก หรือ A", '"th"'),
      p("storageKey", "string", "localStorage key (use the same in fontScaleScript).", "คีย์ใน localStorage (ใช้คีย์เดียวกับ fontScaleScript)", '"mintel-font-scale"'),
      p("onScaleChange", "(percent: number) => void", "Called after the size changes.", "เรียกหลังเปลี่ยนขนาด"),
      p("<FontScaleScript storageKey? />", "component", "Render in <head>: applies the saved size before the first paint.", "วางใน <head> ให้ขนาดที่บันทึกไว้มีผลก่อนแสดงผล"),
    ],
  },

  "animated-beam": {
    th: "เส้นแสงวิ่งเชื่อมระหว่างกล่อง เหมาะทำแผนภาพ flow",
    props: [
      p("containerRef / fromRef / toRef", "RefObject<HTMLElement>", "Container and the two ends of the beam.", "กล่องหลักและปลายทั้งสองของเส้น"),
      p("curvature", "number", "Bend of the path in px.", "ความโค้งของเส้น (px)", "0"),
      p("reverse", "boolean", "Animate in the opposite direction.", "วิ่งกลับทิศ", "false"),
    ],
  },
  "animated-gradient-text": {
    th: "ตัวอักษร gradient ที่สีเลื่อนไปเรื่อยๆ",
    props: [p("colorFrom / colorTo", "string", "Gradient colors.", "สีของ gradient", "brand → brand-accent")],
  },
  "aurora-text": {
    th: "ตัวอักษรไล่สีแบบแสงออโรร่า",
    props: [p("colors", "string[]", "Gradient stops.", "สีที่ใช้ไล่", "brand colors"), p("speed", "number", "Animation speed multiplier.", "ตัวคูณความเร็ว", "1")],
  },
  "blur-fade": {
    th: "ค่อยๆ ปรากฏแบบเบลอ เมื่อ scroll มาถึง",
    props: [
      p("inView", "boolean", "Animate when scrolled into view.", "เล่นเมื่อ scroll มาถึง", "false"),
      p("delay / duration", "number", "Seconds.", "วินาที", "0 / 0.4"),
      p("direction", '"up" | "down" | "left" | "right"', "Entry direction.", "ทิศทางที่เข้ามา", '"down"'),
    ],
  },
  "border-beam": {
    th: "ลำแสงวิ่งรอบกรอบ",
    props: [p("size", "number", "Beam length in px.", "ความยาวลำแสง (px)", "50"), p("duration", "number", "Seconds per loop.", "วินาทีต่อรอบ", "6"), p("reverse", "boolean", "Run backwards.", "วิ่งกลับทิศ", "false")],
  },
  "dot-pattern": {
    th: "พื้นหลังลายจุด มีโหมด glow ให้จุดกะพริบ",
    props: [p("glow", "boolean", "Pulsing dots (CSS animation).", "จุดกะพริบ (CSS animation)", "false"), p("width / height / cr", "number", "Spacing and dot radius.", "ระยะห่างและขนาดจุด", "16 / 16 / 1")],
  },
  "magic-card": {
    th: "การ์ดที่มี spotlight วิ่งตามเมาส์",
    props: [p("mode", '"gradient" | "orb"', "Spotlight style.", "รูปแบบ spotlight", '"gradient"')],
  },
  marquee: {
    th: "แถบเลื่อนวนไม่สิ้นสุด เช่น โลโก้ลูกค้า",
    props: [p("pauseOnHover", "boolean", "Pause while hovered.", "หยุดเมื่อชี้", "false"), p("reverse", "boolean", "Scroll the other way.", "เลื่อนกลับทิศ", "false"), p("vertical", "boolean", "Scroll vertically.", "เลื่อนแนวตั้ง", "false")],
  },
  meteors: {
    th: "ดาวตกวิ่งผ่านพื้นหลัง",
    props: [p("number", "number", "How many meteors.", "จำนวนดาวตก", "20")],
  },
  "number-ticker": {
    th: "ตัวเลขวิ่งนับขึ้นจนถึงค่าที่กำหนด",
    props: [p("value", "number", "Target number.", "ตัวเลขเป้าหมาย"), p("decimalPlaces", "number", "Decimals shown.", "จำนวนทศนิยม", "0"), p("delay", "number", "Seconds before counting.", "หน่วงก่อนเริ่ม (วินาที)", "0")],
  },
  "shimmer-button": {
    th: "ปุ่มที่มีแสงวิ่งรอบขอบ พื้นเป็น gradient ของแบรนด์",
    props: [p("shimmerColor", "string", "Color of the sweep.", "สีของแสง", '"#ffffff"'), p("background", "string", "Button fill.", "พื้นปุ่ม", "brand gradient")],
  },
  "shine-border": {
    th: "ขอบไล่สีแบรนด์ที่เคลื่อนไหว",
    props: [p("borderWidth", "number", "Border width in px.", "ความหนาขอบ (px)", "1"), p("shineColor", "string | string[]", "Colors of the shine.", "สีของขอบ", "brand colors")],
  },

  "glass-card": {
    th: "การ์ดกระจกฝ้า เปิดการหักเหแสงที่ขอบได้ (Chrome/Edge + เมาส์) มีพื้นทึบสำรองเมื่อผู้ใช้ลดความโปร่งใส",
    props: [
      p("refraction", "boolean", "Edge-lens distortion (Chromium + mouse only).", "การหักเหแสงที่ขอบ (เฉพาะ Chromium + เมาส์)", "false"),
      p("refractionStrength", "number", "Displacement in px.", "ระดับการบิดภาพ (px)", "40"),
    ],
  },
  "glass-button": {
    th: "ปุ่มกระจกทรงแคปซูล กดแล้วยุบแบบ spring",
    props: [
      p("variant", '"default" | "tinted" | "accent"', "Clear, brand-tinted or accent-tinted glass.", "กระจกใส สีแบรนด์ หรือสี accent", '"default"'),
      p("size", '"default" | "sm" | "lg" | "icon"', "`icon` is 44px.", "`icon` ขนาด 44px", '"default"'),
    ],
  },
  "glass-navbar": {
    th: "แถบเมนูด้านบนแบบกระจก เต็มความกว้างหรือลอยเป็นแคปซูล เว้นที่ให้รอยบาก iPhone",
    props: [
      p("floating", "boolean", "Floating pill instead of a full-width bar.", "แบบแคปซูลลอยแทนแถบเต็มจอ", "false"),
      p("hideOnScroll", "boolean", "Slide away while scrolling down, come back on the way up.", "ซ่อนตอนเลื่อนลง โผล่ตอนเลื่อนขึ้น", "false"),
    ],
  },
  "segmented-control": {
    th: "ตัวเลือกแบบแบ่งช่อง ตัวที่เลือกเลื่อนแบบ spring ใช้ลูกศรคีย์บอร์ดได้",
    props: [
      p("options", "{ value; label }[]", "Segments.", "ช่องตัวเลือก"),
      p("value / defaultValue / onValueChange", "string", "Selected segment.", "ค่าที่เลือก"),
      p("variant", '"default" | "brand"', "White thumb or brand-colored thumb.", "ตัวเลือกสีขาว หรือสีแบรนด์", '"default"'),
    ],
  },

  "scroll-reveal-text": {
    th: "ข้อความค่อยๆ สว่างขึ้นทีละคำตามการ scroll ตัดคำภาษาไทยได้ถูก",
    props: [
      p("text", "string", "Text to reveal.", "ข้อความ"),
      p("locale", "string", "Word segmentation locale (Thai has no spaces).", "locale สำหรับตัดคำ", '"th"'),
      p("dim", "number", "Opacity of words not yet revealed.", "ความจางของคำที่ยังไม่ถึง", "0.15"),
      p("as", '"p" | "h2" | "h3" | "div"', "Element to render.", "แท็กที่ใช้", '"p"'),
    ],
  },
  "sticky-showcase": {
    th: "ภาพค้างอยู่กับที่ขณะเนื้อหาด้านข้างเลื่อนผ่าน บนมือถือเรียงต่อกันลงมา",
    props: [p("items", "{ title; description?; visual }[]", "Steps and their visuals.", "ขั้นตอนและภาพของแต่ละขั้น")],
  },
  "zoom-parallax": {
    th: "ภาพเต็มจอที่ย่อเข้าเป็นการ์ดตาม scroll ขณะที่หัวข้อจางหาย",
    props: [
      p("overlay", "ReactNode", "Content over the media that fades out.", "เนื้อหาที่ซ้อนบนภาพและจางหาย"),
      p("height", "string", "Scroll distance of the effect.", "ระยะ scroll ของเอฟเฟกต์", '"200svh"'),
      p("toScale / radius", "number", "Final scale and corner radius.", "ขนาดและความมนสุดท้าย", "0.82 / 28"),
    ],
  },
  dock: {
    th: "แถบไอคอนที่ขยายตามเมาส์ บนจอสัมผัสเป็นการกดแบบ spring แทน",
    props: [
      p("size / magnification / distance", "number", "Resting size, size under the pointer, and reach in px.", "ขนาดปกติ ขนาดตอนขยาย และระยะที่มีผล (px)", "44 / 68 / 140"),
      p("DockItem label", "string", "Accessible name and tooltip.", "ชื่อสำหรับ screen reader และ tooltip"),
    ],
  },
  "animated-tabs": {
    th: "แท็บที่ตัวชี้เลื่อนตามด้วย spring มีแบบ pill และ underline",
    props: [p("variant", '"pill" | "underline"', "Indicator style.", "รูปแบบตัวชี้", '"pill"')],
    upstream: radix("Tabs"),
  },

  drawer: {
    th: "bottom sheet สำหรับมือถือ ลากที่แถบด้านบนลงเพื่อปิด เว้นที่ให้ home indicator ตั้ง snapPoints ให้หยุดได้หลายความสูง",
    props: [
      p("open / defaultOpen / onOpenChange", "boolean", "Controlled or uncontrolled open state.", "สถานะเปิด/ปิด"),
      p("snapPoints", "number[]", "DrawerContent: resting heights as fractions of the screen, e.g. [0.4, 0.9].", "DrawerContent: ความสูงที่หยุดได้ เป็นสัดส่วนของจอ เช่น [0.4, 0.9]"),
      p("defaultSnapPoint", "number", "DrawerContent: index of the height to open at.", "DrawerContent: ลำดับความสูงตอนเปิด", "0"),
      p("onSnapPointChange", "(index: number) => void", "DrawerContent: called when it settles on a new height.", "DrawerContent: เรียกเมื่อหยุดที่ความสูงใหม่"),
      p("snapLabels", "{ expand; collapse }", "DrawerContent: accessible names for the handle button.", "DrawerContent: ชื่อปุ่มที่จับสำหรับ screen reader"),
    ],
    upstream: radix("Dialog"),
  },
  "tab-bar": {
    th: "แถบแท็บด้านล่างแบบกระจกสำหรับ mobile web/PWA ตัวชี้เลื่อนแบบ spring",
    props: [
      p("items", "{ value; label; icon; href? }[]", "Tabs; with `href` they render as links.", "แท็บ ถ้ามี `href` จะเป็นลิงก์"),
      p("value / onValueChange", "string", "Active tab.", "แท็บที่เลือก"),
    ],
  },
}
