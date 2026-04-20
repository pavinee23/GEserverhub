// Seed mock products into the Product table
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  { id: 1, category: "agri", sku: "AG-001", name: "ถังพ่นยา 20 ลิตร", nameEn: "20L Spray Tank", nameZh: "20升喷药桶", price: 890, priceWholesale: 750, unit: "ถัง", minOrder: 1, minWholesale: 10, desc: "ถังพ่นยาสะพายหลัง 20 ลิตร ปั๊มมือ ทนทาน เหมาะสำหรับพ่นยาฆ่าแมลงและปุ๋ย", img: null, stock: 150, rating: 4.5, sold: 320 },
  { id: 2, category: "agri", sku: "AG-002", name: "เครื่องตัดหญ้า 2 จังหวะ", nameEn: "2-Stroke Brush Cutter", nameZh: "二冲程割草机", price: 3200, priceWholesale: 2800, unit: "เครื่อง", minOrder: 1, minWholesale: 5, desc: "เครื่องตัดหญ้าแบบสะพายหลัง เครื่องยนต์ 2 จังหวะ กำลัง 26cc น้ำหนักเบา ใช้งานง่าย", img: null, stock: 80, rating: 4.7, sold: 210 },
  { id: 3, category: "agri", sku: "AG-003", name: "ปั๊มน้ำไฟฟ้า 0.5 แรงม้า", nameEn: "0.5 HP Water Pump", nameZh: "0.5马力水泵", price: 1450, priceWholesale: 1250, unit: "เครื่อง", minOrder: 1, minWholesale: 5, desc: "ปั๊มน้ำอัตโนมัติสำหรับสวนเกษตร ทนทาน ประหยัดไฟ", img: null, stock: 60, rating: 4.4, sold: 185 },
  { id: 4, category: "agri", sku: "AG-004", name: "สายยาง PVC 1 นิ้ว (50 เมตร)", nameEn: "PVC Hose 1 inch 50m", nameZh: "1寸PVC水管50米", price: 650, priceWholesale: 520, unit: "ม้วน", minOrder: 1, minWholesale: 10, desc: "สายยาง PVC คุณภาพสูง ทนแรงดันน้ำ ไม่แข็งตัวในอากาศเย็น", img: null, stock: 200, rating: 4.3, sold: 450 },
  { id: 5, category: "agri", sku: "AG-005", name: "เครื่องชั่งดิจิตอล 100 กก.", nameEn: "100kg Digital Scale", nameZh: "100公斤数字秤", price: 2100, priceWholesale: 1850, unit: "เครื่อง", minOrder: 1, minWholesale: 3, desc: "เครื่องชั่งดิจิตอลแสดงผลแม่นยำ ทนทาน เหมาะสำหรับงานเกษตรและคลังสินค้า", img: null, stock: 45, rating: 4.6, sold: 98 },
  { id: 6, category: "rubber", sku: "RB-001", name: "จอกยางพารา (100 ชิ้น)", nameEn: "Rubber Latex Cup x100", nameZh: "乳胶杯100个", price: 380, priceWholesale: 300, unit: "แพ็ค", minOrder: 1, minWholesale: 20, desc: "จอกรองน้ำยางพาราคุณภาพดี ทนทาน ใช้ได้นาน", img: null, stock: 500, rating: 4.5, sold: 620 },
  { id: 7, category: "rubber", sku: "RB-002", name: "จักรรีดยาง รีดน้ำยางสด", nameEn: "Rubber Wringer Machine", nameZh: "橡胶压榨机", price: 5500, priceWholesale: 4900, unit: "เครื่อง", minOrder: 1, minWholesale: 2, desc: "จักรรีดยางพาราสดแบบมือหมุน โครงเหล็ก แข็งแรง ทนทาน", img: null, stock: 30, rating: 4.8, sold: 75 },
  { id: 8, category: "rubber", sku: "RB-003", name: "มีดกรีดยาง สแตนเลส (แพ็ค 5)", nameEn: "Rubber Tapping Knife x5", nameZh: "割胶刀不锈钢5把", price: 220, priceWholesale: 175, unit: "แพ็ค", minOrder: 1, minWholesale: 20, desc: "มีดกรีดยางพาราสแตนเลสคุณภาพสูง คมทนนาน จับถนัดมือ", img: null, stock: 300, rating: 4.4, sold: 380 },
  { id: 9, category: "fishing", sku: "FS-001", name: "เชือกอวนไนล่อน 3 มม. (100 เมตร)", nameEn: "Nylon Net Rope 3mm 100m", nameZh: "3mm尼龙绳100米", price: 480, priceWholesale: 400, unit: "ม้วน", minOrder: 1, minWholesale: 20, desc: "เชือกอวนไนล่อนความแข็งแรงสูง ทนน้ำทะเล เหมาะสำหรับงานประมงและเกษตร", img: null, stock: 400, rating: 4.5, sold: 520 },
  { id: 10, category: "fishing", sku: "FS-002", name: "ตาข่ายพลาสติก 1.5×50 เมตร", nameEn: "Plastic Net 1.5×50m", nameZh: "塑料网1.5×50米", price: 750, priceWholesale: 620, unit: "ม้วน", minOrder: 1, minWholesale: 10, desc: "ตาข่ายพลาสติก HDPE ช่องตาข่าย 2 นิ้ว ทนแสงแดด UV ใช้งานได้หลายปี", img: null, stock: 180, rating: 4.6, sold: 290 },
  { id: 11, category: "fishing", sku: "FS-003", name: "ตาข่ายลวดกัลวาไนซ์ 1×30 เมตร", nameEn: "Galvanized Wire Mesh 1×30m", nameZh: "镀锌铁丝网1×30米", price: 1200, priceWholesale: 980, unit: "ม้วน", minOrder: 1, minWholesale: 5, desc: "ตาข่ายลวดกัลวาไนซ์ทนสนิม ช่องตาข่าย 1 นิ้ว เหมาะสำหรับงานรั้วและกรง", img: null, stock: 120, rating: 4.7, sold: 175 },
  { id: 12, category: "construction", sku: "CS-001", name: "สแลนกรองแสง 70% (2×50 เมตร)", nameEn: "70% Shade Cloth 2×50m", nameZh: "70%遮阳网2×50米", price: 1650, priceWholesale: 1400, unit: "ม้วน", minOrder: 1, minWholesale: 5, desc: "สแลนกรองแสง 70% สีดำ ใยสังเคราะห์ HDPE ทนทาน ลดอุณหภูมิ ป้องกัน UV", img: null, stock: 90, rating: 4.5, sold: 240 },
  { id: 13, category: "construction", sku: "CS-002", name: "มุ้งไนล่อน 1.2×30 เมตร", nameEn: "Nylon Mesh 1.2×30m", nameZh: "尼龙防虫网1.2×30米", price: 980, priceWholesale: 820, unit: "ม้วน", minOrder: 1, minWholesale: 10, desc: "มุ้งไนล่อนกันแมลง ตาถี่ ใช้คลุมผักและโรงเรือนเกษตร ทนทาน", img: null, stock: 150, rating: 4.4, sold: 320 },
  { id: 14, category: "safety", sku: "SF-001", name: "ถุงมือยางกันสารเคมี (คู่)", nameEn: "Chemical Rubber Gloves", nameZh: "防化学品橡胶手套", price: 85, priceWholesale: 65, unit: "คู่", minOrder: 5, minWholesale: 100, desc: "ถุงมือยางธรรมชาติ กันสารเคมี น้ำยาง และสิ่งสกปรก ยาวถึงข้อศอก", img: null, stock: 1000, rating: 4.5, sold: 850 },
  { id: 15, category: "safety", sku: "SF-002", name: "รองเท้าบูทยาง Safety (คู่)", nameEn: "Rubber Safety Boots", nameZh: "橡胶安全靴", price: 390, priceWholesale: 320, unit: "คู่", minOrder: 1, minWholesale: 12, desc: "รองเท้าบูทยาง PVC กันน้ำ กันสารเคมี พื้นกันลื่น เหมาะงานเกษตรและก่อสร้าง", img: null, stock: 200, rating: 4.6, sold: 420 },
  { id: 16, category: "safety", sku: "SF-003", name: "หมวกนิรภัย Safety Helmet", nameEn: "Safety Helmet", nameZh: "安全帽", price: 185, priceWholesale: 145, unit: "ใบ", minOrder: 1, minWholesale: 20, desc: "หมวกนิรภัยมาตรฐาน มอก. ABS รับแรงกระแทก ปรับขนาดได้ หลายสี", img: null, stock: 350, rating: 4.3, sold: 560 },
  { id: 17, category: "misc", sku: "MC-001", name: "ไฟสปอร์ตไลท์ LED 100W", nameEn: "LED Spotlight 100W", nameZh: "100W LED射灯", price: 890, priceWholesale: 740, unit: "ดวง", minOrder: 1, minWholesale: 10, desc: "ไฟสปอร์ตไลท์ LED 100W กันน้ำ IP65 แสงขาว 6500K เหมาะกลางแจ้งและโรงงาน", img: null, stock: 120, rating: 4.7, sold: 290 },
  { id: 18, category: "misc", sku: "MC-002", name: "ไฟล้อม LED สายยาว 10 เมตร", nameEn: "LED String Light 10m", nameZh: "LED灯串10米", price: 350, priceWholesale: 280, unit: "ชุด", minOrder: 1, minWholesale: 20, desc: "ไฟประดับ LED สายยาว 10 เมตร กันน้ำ ใช้ได้ทั้งในและนอกอาคาร", img: null, stock: 250, rating: 4.4, sold: 380 },
  { id: 19, category: "agri", sku: "AG-006", name: "โดรนพ่นยา 10 ลิตร (เช่า)", nameEn: "10L Drone Sprayer (Rental)", nameZh: "10升无人机喷药(租赁)", price: 1500, priceWholesale: 1200, unit: "วัน", minOrder: 1, minWholesale: 3, desc: "บริการเช่าโดรนพ่นยา 10 ลิตร พร้อมนักบิน บินได้ 15 ไร่/ชม.", img: null, stock: 5, rating: 4.9, sold: 45 },
  { id: 20, category: "construction", sku: "CS-003", name: "ลวดผูกเหล็ก 1 กก.", nameEn: "Binding Wire 1kg", nameZh: "绑扎铁丝1公斤", price: 65, priceWholesale: 50, unit: "ม้วน", minOrder: 5, minWholesale: 50, desc: "ลวดผูกเหล็กอ่อน ชุบดำ ขนาด 18 เบอร์ ใช้ผูกเหล็กก่อสร้าง", img: null, stock: 800, rating: 4.2, sold: 970 },
];

async function main() {
  console.log("Seeding products...");
  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: {
        sku: p.sku,
        category: p.category,
        name: p.name,
        nameEn: p.nameEn,
        nameZh: p.nameZh,
        price: p.price,
        priceWholesale: p.priceWholesale,
        unit: p.unit,
        minOrder: p.minOrder,
        minWholesale: p.minWholesale,
        desc: p.desc,
        img: p.img,
        stock: p.stock,
        rating: p.rating,
        sold: p.sold,
      },
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
