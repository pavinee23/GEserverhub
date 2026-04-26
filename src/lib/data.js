export const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const languageStorageKey = "goeun-agency-language";

export const fallbackProfile = {
  brand_name: "GOEUN SERVER HUB",
  headline: "ศูนย์กลางระบบลูกค้าและหน้าโปรโมทบริการของคุณ",
  subheadline:
    "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
  phone: "081-234-5678",
  email: "goeunserverhub@gmail.com",
  address: "Bangkok, Thailand",
};

export const fallbackServices = [
  {
    id: 1,
    title: "บริการดูแลระบบ",
    description: null,
    highlight: "ดูแลและบำรุงรักษาระบบ",
  },
  {
    id: 2,
    title: "บริการเช่าโดเมนรายปี",
    description: null,
    highlight: "จดและต่ออายุโดเมน",
  },
  {
    id: 3,
    title: "บริการยิงแอด",
    description: null,
    highlight: "โฆษณา Facebook/Google",
  },
  {
    id: 4,
    title: "บริการออกแบบหน้าเว็บ",
    description: null,
    highlight: "UI/UX Design",
  },
  {
    id: 5,
    title: "บริการพัฒนาระบบ",
    description: null,
    highlight: "พัฒนาซอฟต์แวร์ตามความต้องการ",
  },
  {
    id: 6,
    title: "บริการอื่นๆ",
    description: null,
    highlight: "บริการเสริมอื่นๆ",
  },
];

export const fallbackClients = [
  {
    id: 1,
    name: "M-Group",
    slug: "m-group",
    description:
      "\"ดูแล ใส่ใจ เกษตรไทย ครบวงจร\" บริการสินค้าด้านการเกษตร ในราคาปลีก-ส่ง ด้วยสินค้าหลากหลายมากกว่า 10,000 รายการ",
    status: "online",
    contact_email: "sale@m-group.in.th",
    contact_phone: "089-4871144",
    contact_fax: "034-878369, 034-848022",
    thumbnail: "/m-group-building.jpg",
    system_url: "https://strong-dory-enabled.ngrok-free.app/m-group",
  },
  {
    id: 2,
    name: "Green Retail Group",
    slug: "green-retail-group",
    description: "ระบบมอนิเตอริ่ง ผู้ใช้ Demo",
    status: "online",
    contact_email: "it@green-retail.example.com",
    contact_phone: "02-555-1199",
    thumbnail: "/uploads/logos/Guser-demo.png",
    system_url: "/customer-dashboard-login",
  },
  {
    id: 3,
    name: "M-Factory",
    slug: "m-factory",
    description: "ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว",
    status: "online",
    contact_email: "m.factoryandresort@gmail.com",
    contact_phone: "+66 095-241-1833",
    thumbnail: "/m-factory/LINE_ALBUM_12369_260417_1.jpg",
    system_url: "https://m-factoryandresort.com",
  },
  {
    id: 4,
    name: "M-Resort",
    slug: "m-retsort",
    description: "เอ็มรีสอร์ท บริการที่พัก บรรยากาศส่วนตัว",
    status: "online",
    contact_email: "mukhngamnuch@gmail.com",
    contact_phone: "095-241-1833",
    thumbnail: "/uploads/logos/1776692894976-ecji3u.jpg",
    system_url: "https://m-factoryandresort.com/",
  },
  {
    id: 5,
    name: "คาโก้ ไทย-เกาหลี / เกาหลี-ไทย",
    slug: "cargo",
    description: "บริการส่งสินค้าทางเครื่องบิน ไทย ↔ เกาหลี ปลอดภัย รวดเร็ว พร้อมติดตามสถานะออนไลน์",
    status: "online",
    contact_email: "goeunserverhub@gmail.com",
    contact_phone: "+66 095-241-1833",
    thumbnail: "/uploads/logos/cargo.jpg",
    system_url: "/cargo/track",
  },
  {
    id: 6,
    name: "Green Retail Group",
    slug: "green-retail-energy",
    description: "ระบบมอนิเตอริ่งพลังงานไฟฟ้า",
    status: "online",
    contact_email: "it@green-retail.example.com",
    contact_phone: "02-555-1199",
    thumbnail: "/uploads/logos/G-monitoring.png",
    system_url: "/energy-dashboard-login",
  },
];

export const filterOptions = [
  { key: "all", label: "ทั้งหมด" },
  { key: "online", label: "พร้อมใช้งาน" },
  { key: "maintenance", label: "บำรุงรักษา" },
  { key: "coming-soon", label: "เร็ว ๆ นี้" },
];

export const languageOptions = [
  { key: "th", label: "TH" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中" },
  { key: "ko", label: "KO" },
];

export function clientPortalUrl(slug) {
  return `${backendBaseUrl}/portal/${slug}`;
}

export function clientLoginUrl(slug) {
  return `${backendBaseUrl}/go/${slug}`;
}

export function statusClassName(status) {
  if (status === "online") return "status-online";
  if (status === "maintenance") return "status-maintenance";
  return "status-coming-soon";
}

export async function getJson(paths) {
  const candidates = Array.isArray(paths) ? paths : [paths];
  let lastError = null;
  for (const path of candidates) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Request failed");
}
