"use client";

import { useState, useEffect } from "react";
import ShopClient from "@/app/m-group/shop/ShopClient";

const OG    = "#F97316";  // orange primary
const OG_D  = "#EA580C";  // orange dark
const AMBER = "#F59E0B";  // amber accent
const DARK  = "#1C0A00";  // warm text dark
const DARK2 = "#FFF7ED";  // cream section bg
const WARM  = "#FFF3E0";  // warm cream bg
const CREAM = "#FFF7ED";  // orange-50 bg
const WHITE = "#FFFFFF";

const SITE_URL = "https://m-group.in.th";
const PHONE    = "089-487-1144";
const FAX      = "034-878369, 034-848022";
const EMAIL    = "sale@m-group.in.th";
const ADDRESS  = "58/9 ม.6 ซ.คลองมะเดื่อ 17/6 ต.คลองมะเดื่อ อ.กระทุ่มแบน จ.สมุทรสาคร 74110";

function injectStyle(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CONTENT = {
  th: {
    navBrand: "M-Group",
    navLinks: [
      { label: "เกี่ยวกับเรา", href: "#about" },
      { label: "สินค้า", href: "#products" },
      { label: "บริการ", href: "#services" },
      { label: "ติดตามสินค้า", href: "/m-group/orders" },
      { label: "Admin", href: "/login" },
      { label: "ลงทะเบียน", href: "/register" },
    ],
    heroTitle: "M-Group",
    heroTagline: '"ดูแล ใส่ใจ เกษตรไทย ครบวงจร"',
    heroDesc:
      "ผู้นำด้านอุปกรณ์การเกษตร อุปกรณ์สวนยาง เชือกและอุปกรณ์ประมง อุปกรณ์ก่อสร้าง อุปกรณ์ SAFETY และสินค้าเบ็ดเตล็ด ด้วยประสบการณ์มากกว่า 40 ปี",
    heroBtn: "เยี่ยมชมเว็บไซต์",
    aboutTitle: "เกี่ยวกับเรา",
    aboutBody:
      "มากกว่า 40 ปี ของ บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด หรือ M-Group ในฐานะผู้นำทางด้านอุปกรณ์การเกษตร ด้านอุปกรณ์สวนยาง อุปกรณ์ก่อสร้างและฮาร์ดแวร์ ด้วยการสนับสนุนและการอุปการะคุณของลูกค้าทุกท่าน เราจึงได้พัฒนาและมุ่งมั่นในการวางรากฐานธุรกิจให้สอดคล้องกับการเปลี่ยนแปลงที่ทันสมัยอยู่เสมอ ภายใต้นโยบาย \"ดูแล ใส่ใจ เกษตรไทย ครบวงจร\"",
    vision: "วิสัยทัศน์",
    visionBody:
      "ประเทศไทยกับหลายทศวรรษ ที่พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช พ่อหลวงของพวกเราทรงงาน และวางรากฐานโครงการไว้มากมายหลายนับหลาย 1,000 โครงการจากพระราชดำริ พร้อมปรัชญาเศรษฐกิจพอเพียงที่สามารถนำไปใช้และปรับเปลี่ยนได้กับทุกๆ ด้านในการดำรงชีพ แม้ว่าเทคโนโลยีจะก้าวล้ำมากเพียงใด อาชีพเกษตรกรก็ยังคงเป็นหนึ่งในอาชีพหลัก",
    statsItems: [
      { value: "40+", label: "ปีแห่งประสบการณ์" },
      { value: "20,000+", label: "รายการสินค้า" },
      { value: "15,000", label: "ตร.ม. คลังสินค้า" },
      { value: "4", label: "ประเภทธุรกิจ" },
    ],
    bizTypes: [
      { icon: "🏭", title: "ผู้ผลิตสินค้า", sub: "เฟอร์นิเจอร์ งานไม้ งานเหล็ก", desc: "โซฟา เก้าอี้" },
      { icon: "🏷️", title: "รับผลิตสินค้า OEM", sub: "รับ OEM สินค้าใน Brand ของลูกค้า", desc: "กรองแสง มุ้งไนล่อน ตาข่ายพลาสติก" },
      { icon: "🚚", title: "ผู้จัดจำหน่ายสินค้า", sub: "อุปกรณ์สวนยาง เชือกและประมง", desc: "อุปกรณ์ก่อสร้างฮาร์ดแวร์" },
      { icon: "🌍", title: "ผู้นำเข้าสินค้า", sub: "ตาข่ายลวด ถังพ่นยา ไฟชุด", desc: "เครื่องตัดหญ้า" },
    ],
    productsTitle: "หมวดหมู่สินค้า",
    products: [
      { icon: "🌾", cat: "อุปกรณ์การเกษตร", items: "ถังพ่นยา ปั๊มน้ำ สายยาง เครื่องตัดหญ้า เครื่องชั่ง" },
      { icon: "🌿", cat: "อุปกรณ์สวนยาง", items: "จอกยาง จักรรีดยาง และอุปกรณ์สวนยางครบชุด" },
      { icon: "🎣", cat: "เชือกและอุปกรณ์ประมง", items: "เชือกอวน ตาข่ายลวด ตาข่ายพลาสติก" },
      { icon: "🔧", cat: "อุปกรณ์ก่อสร้าง & ฮาร์ดแวร์", items: "สแลน กรองแสง มุ้งไนล่อน ถุงมือ รองเท้า" },
      { icon: "⚠️", cat: "อุปกรณ์ SAFETY", items: "อุปกรณ์นิรภัยครบวงจรสำหรับอุตสาหกรรม" },
      { icon: "📦", cat: "สินค้าเบ็ดเตล็ด", items: "ไฟชุด และสินค้าอื่นๆ อีกมากมาย รวมกว่า 20,000 รายการ" },
    ],
    servicesTitle: "บริการของเรา",
    servicesIntro: "เราคือผู้ผลิต นำเข้า และตัวแทน สินค้าหลากหลายชนิด เรามีความพร้อมในด้านการบริหารคลังสินค้า มีทีมงานคอยดูแลให้คำแนะนำเรื่องสินค้า และจัดส่งสินค้าในรูปแบบต่างๆ เพื่อเพิ่มความสะดวกและรวดเร็ว",
    services: [
      { icon: "🚛", title: "จัดส่งสินค้าทั่วประเทศ", desc: "บริษัทฯ มีระบบการจัดส่งที่มีประสิทธิภาพ มีความยืดหยุ่นสูง จัดส่งรวดเร็ว ตรวจสอบด้วยระบบ TMS และ 3PL" },
      { icon: "🏬", title: "คลังจัดเก็บสินค้า", desc: "รองรับระบบ Supply Chain บริการเติมสต็อกสินค้า (Just In Time) ตามที่ลูกค้าต้องการ" },
      { icon: "💬", title: "สอบถามราคาทาง LINE@", desc: "คลิ๊กที่นี่ !! เพื่อหาสินค้าที่ลูกค้าตามหา ราคาสินค้าต่างๆ ผ่านทาง LINE@ มีแอดมินคอยตอบท่านด้วยความรวดเร็ว" },
      { icon: "👤", title: "เจ้าหน้าที่บริการลูกค้า", desc: "บริษัทฯ เรามีเจ้าหน้าที่บริการลูกค้า คอยให้คำแนะนำการใช้สินค้าต่างๆ และการรับฟังปัญหาทางการใช้งานต่างๆ ของลูกค้า" },
    ],
    missionTitle: "พันธกิจ 5 ด้าน",
    missions: [
      { no: "1", title: "เพิ่มประสิทธิภาพด้านการขายและบริการ", desc: "Mobile Application ตรวจสอบสต็อก รับทราบปัญหาทั่วถึงกันทั้งองค์กร แก้ปัญหาอย่างมีระบบ" },
      { no: "2", title: "เพิ่มประสิทธิภาพคลังสินค้า", desc: "ขยายไลน์สินค้าเป็นกว่า 200,000 รายการใน 5 ปีข้างหน้า" },
      { no: "3", title: "เพิ่มประสิทธิภาพการขนส่ง", desc: "Next Day Delivery พร้อมตรวจสอบสถานะการจัดส่งได้แบบเรียลไทม์" },
      { no: "4", title: "สร้างระบบ Marketplace", desc: "สื่อกลางในการทำการตลาดให้ลูกค้าทุกท่าน รองรับ E-commerce ที่กำลังเติบโต" },
      { no: "5", title: "สร้างระบบการเรียนรู้ Smart Farm", desc: "รวมเทคโนโลยีใหม่ที่ทำให้เกษตรกรควบคุมปัจจัยต่างๆ วัดผลและเรียนรู้ได้" },
    ],
    contactTitle: "ติดต่อเรา",
    contactCta: "เยี่ยมชมเว็บไซต์",
    footerText: "© 2026 บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด (M-Group). All rights reserved.",
    aiPlatformBadge: "🚀 กำลังพัฒนา",
    aiPlatformTitle: "แพลตฟอร์มขายออนไลน์ด้วย AI",
    aiPlatformDesc: "เป้าหมายถัดไปของ M-Group คือการพัฒนาแพลตฟอร์ม E-Commerce ที่ AI ดูแลทุกขั้นตอน ตั้งแต่ตอบคำถามสินค้า ไปจนถึงยืนยันการชำระเงินและออกบิลอัตโนมัติ",
    aiSteps: [
      { icon: "🤖", step: "01", title: "AI ตอบคำถามสินค้า", desc: "ลูกค้าสอบถามสินค้า ราคา สต็อก ผ่าน AI Chatbot ตลอด 24 ชั่วโมง ไม่ต้องรอแอดมิน" },
      { icon: "🛒", step: "02", title: "เลือกสินค้า & สั่งซื้อ", desc: "AI ช่วยแนะนำสินค้าที่เหมาะสม รับออร์เดอร์ และสรุปรายการสั่งซื้อให้อัตโนมัติ" },
      { icon: "💳", step: "03", title: "ยืนยันการชำระเงิน", desc: "รองรับการอัพสลิป ตรวจสอบยอดชำระ และยืนยันการชำระเงินผ่าน AI อัตโนมัติ" },
      { icon: "🧾", step: "04", title: "ออกบิล & ยืนยันออร์เดอร์", desc: "ระบบสร้างใบเสร็จ ใบกำกับภาษี และส่งยืนยันการสั่งซื้อให้ลูกค้าทันที" },
    ],
    aiCta: "ติดตามความคืบหน้า",
  },
  en: {
    navBrand: "M-Group",
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Products", href: "#products" },
      { label: "Services", href: "#services" },
      { label: "Track Order", href: "/m-group/orders" },
      { label: "Admin", href: "/login" },
      { label: "Register", href: "/register" },
    ],
    heroTitle: "M-Group",
    heroTagline: '"Care. Commit. Complete Thai Agriculture."',
    heroDesc:
      "Leading supplier of agricultural equipment, rubber plantation tools, fishing rope, construction hardware, safety gear — over 40 years of excellence.",
    heroBtn: "Visit Website",
    aboutTitle: "About Us",
    aboutBody:
      "For over 40 years, Mahachok Mahachai Intertrade Co., Ltd. (M-Group) has been a leading supplier of agricultural, rubber plantation, and construction hardware. We continuously develop to stay aligned with modern changes under the policy 'Care. Commit. Complete Thai Agriculture.'",
    vision: "Vision",
    visionBody:
      "Thailand has benefited from royal projects and the philosophy of Sufficiency Economy — applicable to all aspects of life. Even as technology advances, farming remains vital. M-Group is committed to supporting Thai farmers every step of the way.",
    statsItems: [
      { value: "40+", label: "Years Experience" },
      { value: "20,000+", label: "Product Items" },
      { value: "15,000", label: "sqm Warehouse" },
      { value: "4", label: "Business Types" },
    ],
    bizTypes: [
      { icon: "🏭", title: "Manufacturer", sub: "Furniture, woodwork, metalwork", desc: "Sofas, chairs" },
      { icon: "🏷️", title: "OEM Production", sub: "OEM under customer brand", desc: "Sun shading, nylon nets, plastic mesh" },
      { icon: "🚚", title: "Distributor", sub: "Rubber tools, fishing rope", desc: "Construction hardware" },
      { icon: "🌍", title: "Importer", sub: "Wire mesh, spray tanks, lighting sets", desc: "Lawn mowers" },
    ],
    productsTitle: "Product Categories",
    products: [
      { icon: "🌾", cat: "Agricultural Equipment", items: "Spray tanks, pumps, hoses, lawn mowers, scales" },
      { icon: "🌿", cat: "Rubber Plantation Tools", items: "Rubber cups, rolling machines and full kits" },
      { icon: "🎣", cat: "Rope & Fishing Equipment", items: "Nylon rope, wire mesh, plastic netting" },
      { icon: "🔧", cat: "Construction & Hardware", items: "Shade cloth, nylon nets, gloves, boots" },
      { icon: "⚠️", cat: "Safety Equipment", items: "Full industrial safety gear solutions" },
      { icon: "📦", cat: "Miscellaneous", items: "Lighting and 20,000+ other products" },
    ],
    servicesTitle: "Our Services",
    servicesIntro: "We are a manufacturer, importer, and distributor of a wide range of products. We are fully equipped with warehouse management, a dedicated team to advise on products, and multiple delivery options for your convenience.",
    services: [
      { icon: "🚛", title: "Nationwide Delivery", desc: "Efficient and flexible delivery system with fast turnaround, tracked via TMS and 3PL platforms." },
      { icon: "🏬", title: "Warehouse & Storage", desc: "Supply chain-ready storage with Just In Time restocking service as required by customers." },
      { icon: "💬", title: "LINE@ Price Inquiry", desc: "Click here to find the products you need and check prices via LINE@. Our admin responds quickly." },
      { icon: "👤", title: "Customer Service", desc: "Our customer service team is always ready to advise on product usage and listen to all customer concerns." },
    ],
    missionTitle: "5 Strategic Missions",
    missions: [
      { no: "1", title: "Enhance Sales & Service", desc: "Mobile app for stock checking and issue tracking across the organisation." },
      { no: "2", title: "Upgrade Warehouse Capacity", desc: "Scale to 200,000 product items within 5 years." },
      { no: "3", title: "Improve Logistics", desc: "Next Day Delivery with real-time shipment tracking." },
      { no: "4", title: "Build Marketplace Platform", desc: "B2B/B2C marketplace bridging customers to growing E-commerce." },
      { no: "5", title: "Smart Farm Learning System", desc: "New technology enabling farmers to manage, measure and learn." },
    ],
    contactTitle: "Contact Us",
    contactCta: "Visit Website",
    footerText: "© 2026 Mahachok Mahachai Intertrade Co., Ltd. (M-Group). All rights reserved.",
    aiPlatformBadge: "🚀 In Development",
    aiPlatformTitle: "AI-Powered Online Sales Platform",
    aiPlatformDesc: "M-Group's next milestone: an AI-driven E-Commerce platform that handles every step — from answering product questions to confirming payments and auto-generating invoices.",
    aiSteps: [
      { icon: "🤖", step: "01", title: "AI Product Assistant", desc: "Customers can ask about products, prices, and stock 24/7 via AI Chatbot — no need to wait for staff." },
      { icon: "🛒", step: "02", title: "Product Selection & Order", desc: "AI recommends suitable products, accepts orders, and summarises purchase lists automatically." },
      { icon: "💳", step: "03", title: "Payment Confirmation", desc: "Upload payment slip, AI verifies the amount and confirms payment automatically." },
      { icon: "🧾", step: "04", title: "Invoice & Order Confirmation", desc: "System generates receipts and tax invoices, then sends order confirmation to the customer instantly." },
    ],
    aiCta: "Follow Our Progress",
  },
  zh: {
    navBrand: "M-Group",
    navLinks: [
      { label: "关于我们", href: "#about" },
      { label: "产品", href: "#products" },
      { label: "服务", href: "#services" },
      { label: "追踪订单", href: "/m-group/orders" },
      { label: "Admin", href: "/login" },
      { label: "注册", href: "/register" },

    ],
    heroTitle: "M-Group",
    heroTagline: '"关爱农业，泰国农业一站式服务"',
    heroDesc:
      "泰国农业设备、橡胶园工具、渔绳、建筑五金、安全防护用品的领先供应商，拥有逾40年丰富经验。",
    heroBtn: "访问官网",
    aboutTitle: "关于我们",
    aboutBody:
      '马哈坎·马哈猜进出口有限公司（M-Group）成立逾40年，是泰国农业设备、橡胶园工具及建筑五金的领先供应商。在广大客户的支持与信赖下，我们持续发展，致力于与时俱进，秉承「关爱农业，泰国农业一站式服务」的核心理念。',
    vision: "愿景",
    visionBody:
      '数十年来，泰国在已故国王普密蓬·阿杜德陛下的带领下，基于数千项皇家倡议和「充足经济」哲学，奠定了坚实的发展基础。无论技术如何进步，农业始终是国家的重要支柱。M-Group矢志不渝，全力支持泰国农民的每一步。',
    statsItems: [
      { value: "40+", label: "年经验" },
      { value: "20,000+", label: "产品种类" },
      { value: "15,000", label: "平方米仓库" },
      { value: "4", label: "业务类型" },
    ],
    bizTypes: [
      { icon: "🏭", title: "自主生产商", sub: "家具、木工制品、金属制品", desc: "沙发、椅子" },
      { icon: "🏷️", title: "OEM代工生产", sub: "接受客户品牌OEM代工", desc: "遮阳网、尼龙网、塑料网" },
      { icon: "🚚", title: "分销商", sub: "橡胶园工具、渔绳", desc: "建筑五金" },
      { icon: "🌍", title: "进口商", sub: "铁丝网、喷药桶、灯具套装", desc: "割草机" },
    ],
    productsTitle: "产品分类",
    products: [
      { icon: "🌾", cat: "农业设备", items: "喷药桶、水泵、水管、割草机、称重器" },
      { icon: "🌿", cat: "橡胶园工具", items: "橡胶杯、压胶机及完整配套工具" },
      { icon: "🎣", cat: "渔绳及渔具", items: "尼龙绳、铁丝网、塑料网" },
      { icon: "🔧", cat: "建筑及五金", items: "遮阳网、尼龙网、手套、靴子" },
      { icon: "⚠️", cat: "安全防护设备", items: "工业全套安全防护解决方案" },
      { icon: "📦", cat: "其他杂货", items: "灯具套装及超过20,000种其他产品" },
    ],
    servicesTitle: "我们的服务",
    servicesIntro: "我们是多种产品的生产商、进口商及代理商，具备完善的仓储管理能力，拥有专业团队为客户提供产品建议，并提供多种配送方式，力求便捷高效。",
    services: [
      { icon: "🚛", title: "全国配送", desc: "高效灵活的配送系统，快速发货，通过TMS和3PL物流平台实时追踪。" },
      { icon: "🏬", title: "仓储管理", desc: "支持供应链管理，根据客户需求提供即时补货（Just In Time）服务。" },
      { icon: "💬", title: "LINE@ 询价", desc: "点击这里！查找您需要的产品和价格，通过LINE@联系，专职客服快速响应。" },
      { icon: "👤", title: "客户服务", desc: "我们的客服团队随时为客户提供产品使用建议，并耐心倾听和解决各类使用问题。" },
    ],
    missionTitle: "五大战略使命",
    missions: [
      { no: "1", title: "提升销售与服务效率", desc: "通过移动应用实现库存查询和全组织问题追踪，系统化解决问题。" },
      { no: "2", title: "扩大仓储能力", desc: "5年内将产品种类扩展至200,000种以上。" },
      { no: "3", title: "优化物流配送", desc: "次日达配送服务，支持实时物流状态追踪。" },
      { no: "4", title: "建立电商平台", desc: "构建B2B/B2C市场平台，助力客户拓展电子商务业务。" },
      { no: "5", title: "智慧农场学习系统", desc: "引入新技术，帮助农民管理、测量和学习现代农业。" },
    ],
    contactTitle: "联系我们",
    contactCta: "访问官网",
    footerText: "© 2026 马哈坎马哈猜进出口有限公司 (M-Group). 版权所有。",
    aiPlatformBadge: "🚀 开发中",
    aiPlatformTitle: "AI 驱动的在线销售平台",
    aiPlatformDesc: "M-Group 的下一个里程碑：打造 AI 全流程电商平台，从回答产品咨询，到确认付款、自动开具发票，全程由 AI 处理。",
    aiSteps: [
      { icon: "🤖", step: "01", title: "AI 产品咨询助手", desc: "客户可全天24小时通过AI聊天机器人咨询产品、价格和库存，无需等待客服。" },
      { icon: "🛒", step: "02", title: "选品与下单", desc: "AI 推荐合适产品，自动接收订单并汇总采购清单。" },
      { icon: "💳", step: "03", title: "付款确认", desc: "上传付款凭证，AI 自动核对金额并确认付款。" },
      { icon: "🧾", step: "04", title: "开票与订单确认", desc: "系统自动生成收据和税务发票，并即时向客户发送订单确认。" },
    ],
    aiCta: "关注最新进展",
  },
};

export default function PageClient() {
  const [lang, setLang] = useState("th");
  const [menuOpen, setMenuOpen] = useState(false);
  const LANG_KEY = "goeun-agency-language";

  useEffect(() => {
    injectStyle("mgroup-anim", `
      @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
      @keyframes floatY { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-14px) rotate(2deg); } }
      @keyframes floatY2 { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-20px); } }
      .mg-fadein  { animation: fadeUp .75s cubic-bezier(.16,1,.3,1) both; }
      .mg-fadein2 { animation: fadeUp .75s cubic-bezier(.16,1,.3,1) .12s both; }
      .mg-fadein3 { animation: fadeUp .75s cubic-bezier(.16,1,.3,1) .25s both; }
      .mg-float  { animation: floatY 7s ease-in-out infinite; }
      .mg-float2 { animation: floatY2 9s ease-in-out .5s infinite; }
      .mg-card { transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease !important; }
      .mg-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 50px rgba(249,115,22,.2) !important; }
      .mg-card-3d { transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease !important; }
      .mg-card-3d:hover { transform: perspective(600px) translateY(-5px) rotateX(2deg) !important; box-shadow: 0 20px 50px rgba(249,115,22,.2) !important; }
      .mg-btn { transition: all .25s cubic-bezier(.34,1.56,.64,1) !important; }
      .mg-btn:hover { transform: scale(1.06) translateY(-2px) !important; box-shadow: 0 8px 32px rgba(249,115,22,.5) !important; }
      .mg-navlink { transition: color .2s !important; }
      .mg-navlink:hover { color: #EA580C !important; }
    `);
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved && CONTENT[saved]) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = CONTENT[lang];

  const Navbar = () => (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: WHITE,
      borderBottom: `2px solid ${OG}`,
      padding: "0 2rem", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 64,
      boxShadow: "0 2px 16px rgba(249,115,22,.12)",
    }}>
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/m-group-logo.png" alt="M-Group Logo" style={{ height: 36, width: "auto", objectFit: "contain", flexShrink: 0 }} />
        <span style={{ color: "#78350F", fontWeight: 600, fontSize: ".82rem", letterSpacing: .2 }}>บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }} className="d-none d-md-flex">
        {t.navLinks.map(l => (
          <a key={l.href} href={l.href} className="mg-navlink"
            style={{ color: "#44200A", textDecoration: "none", fontSize: ".88rem", fontWeight: 500 }}>
            {l.label}
          </a>
        ))}
        <div style={{ display: "flex", gap: 3 }}>
          {[["th", "TH"], ["en", "EN"], ["zh", "中文"]].map(([l, label]) => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? OG : "rgba(0,0,0,.05)",
              color: lang === l ? WHITE : "#44200A",
              border: lang === l ? "none" : "1px solid rgba(0,0,0,.1)",
              borderRadius: 6, padding: "4px 10px", fontWeight: 700, cursor: "pointer", fontSize: ".78rem",
            }}>{label}</button>
          ))}
        </div>
      </div>
      <button className="d-md-none" onClick={() => setMenuOpen(v => !v)}
        style={{ background: "none", border: "none", color: DARK, fontSize: 22, cursor: "pointer" }}>
        {menuOpen ? "✕" : "☰"}
      </button>
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0,
          background: WHITE,
          padding: "1.5rem 2rem",
          display: "flex", flexDirection: "column", gap: "1rem", zIndex: 998,
          borderBottom: `2px solid ${OG}`,
          boxShadow: "0 8px 20px rgba(0,0,0,.1)",
        }}>
          {t.navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ color: DARK, textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section style={{
      background: CREAM,
      padding: "7.5rem 2rem 4rem",
      position: "relative",
      overflow: "hidden",
      borderBottom: "1px solid rgba(249,115,22,.18)",
    }}>
      {/* Glow blobs */}
      <div style={{ position:"absolute", left:"-10%", top:"-5%", width:"60vw", height:"60vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(249,115,22,.08) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"-5%", bottom:"-5%", width:"45vw", height:"45vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(251,191,36,.06) 0%, transparent 65%)", pointerEvents:"none" }}/>
      {/* Floating shapes */}
      <div className="mg-float" style={{ position:"absolute", left:"6%", top:"28%", width:48, height:48, border:"1.5px solid rgba(249,115,22,.2)", borderRadius:10, transform:"rotate(20deg)", pointerEvents:"none" }}/>
      <div className="mg-float2" style={{ position:"absolute", right:"7%", top:"18%", width:32, height:32, background:"rgba(251,191,36,.08)", borderRadius:"50%", pointerEvents:"none" }}/>

      <div style={{
        maxWidth: 1100, margin: "0 auto", position: "relative",
        display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap",
      }}>
        {/* Left: text */}
        <div style={{ flex: "1 1 340px", textAlign: "left" }}>
          <h1 className="mg-fadein2" style={{
            background: `linear-gradient(135deg, ${DARK} 10%, ${OG} 50%, ${AMBER} 90%)`,
            filter: "drop-shadow(0 2px 16px rgba(249,115,22,.15))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(3.5rem,10vw,7rem)",
            fontWeight: 900,
            margin: "0 0 .4rem",
            lineHeight: .95,
            letterSpacing: "-2px",
          }}>
            {t.heroTitle}
          </h1>
          <p className="mg-fadein3" style={{
            color: OG_D, fontSize: "clamp(.95rem,2vw,1.15rem)",
            fontWeight: 700, margin: "0 0 1.2rem",
            fontStyle: "italic", letterSpacing: .5,
          }}>
            {t.heroTagline}
          </p>
          <p className="mg-fadein3" style={{
            color: "#78350F",
            fontSize: "clamp(.85rem,1.6vw,.95rem)",
            maxWidth: 480, margin: "0 0 2rem",
            lineHeight: 1.85, animationDelay: ".25s",
          }}>
            {t.heroDesc}
          </p>
          <div className="mg-fadein3" style={{ animationDelay: ".35s" }}>
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="mg-btn" style={{
              display: "inline-flex", alignItems: "center",
              background: `linear-gradient(135deg, ${OG}, ${OG_D})`,
              color: WHITE, fontWeight: 700, fontSize: ".88rem",
              padding: "8px 20px", borderRadius: 50, textDecoration: "none",
              boxShadow: "0 4px 24px rgba(249,115,22,.45), 0 0 0 1px rgba(249,115,22,.2)",
            }}>
              {t.heroBtn}
            </a>
          </div>
          <div style={{ width:80, height:3, margin:"2.5rem 0 0", background:`linear-gradient(90deg, ${OG}, ${AMBER}, transparent)`, borderRadius:2 }}/>
        </div>

        {/* Right: building image */}
        <div className="mg-fadein3" style={{
          flex: "1 1 380px", position: "relative",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 20px 60px rgba(249,115,22,.22), 0 4px 20px rgba(0,0,0,.1)",
          animationDelay: ".15s",
        }}>
          <img
            src="/m-group-building.jpg"
            alt="M-Group Building"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
          {/* Orange overlay tint */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(249,115,22,.18) 100%)",
            pointerEvents: "none",
          }}/>
        </div>
      </div>
    </section>
  );

  const Stats = () => (
    <section style={{
      background: `linear-gradient(100deg, #9A3412 0%, ${OG} 40%, ${OG_D} 70%, #9A3412 100%)`,
      padding: "3rem 2rem",
      position: "relative", overflow: "hidden",
      boxShadow: "0 8px 40px rgba(249,115,22,.25)",
    }}>
      <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,.04) 80px, rgba(255,255,255,.04) 81px)", pointerEvents:"none" }}/>
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", textAlign: "center" }}>
        {t.statsItems.map((s, i) => (
          <div key={s.label} style={{ padding:"0 1rem", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.2)" : "none" }}>
            <div style={{ fontSize: "clamp(2.2rem,5vw,3rem)", fontWeight: 900, color: WHITE, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,.2)" }}>{s.value}</div>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "rgba(255,255,255,.78)", marginTop: 4, letterSpacing: .5 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const About = () => (
    <section id="about" style={{ background: CREAM, padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", top:0, right:0, width:400, height:400, background:"radial-gradient(circle at top right, rgba(249,115,22,.07), transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <span style={{ display:"inline-block", background:`linear-gradient(135deg, ${OG}, ${AMBER})`, color:WHITE, borderRadius:6, padding:"3px 14px", fontSize:".72rem", fontWeight:800, letterSpacing:2.5, textTransform:"uppercase", marginBottom:".8rem" }}>About</span>
          <h2 style={{ color:DARK, fontWeight:900, fontSize:"clamp(1.8rem,4vw,2.8rem)", margin:"0 0 1rem", lineHeight:1.15 }}>{t.aboutTitle}</h2>
          <div style={{ width:52, height:4, background:`linear-gradient(90deg, ${OG}, ${AMBER})`, borderRadius:2 }}/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"3rem", alignItems:"start" }}>
          <div>
            <p style={{ color:"#44403c", lineHeight:1.9, fontSize:"1rem", marginBottom:"2rem" }}>{t.aboutBody}</p>
            <div style={{
              background:`linear-gradient(135deg, rgba(249,115,22,.06), rgba(251,191,36,.04))`,
              border:`1px solid rgba(249,115,22,.18)`,
              borderLeft:`4px solid ${OG}`,
              borderRadius:"0 14px 14px 0",
              padding:"1.6rem",
            }}>
              <h3 style={{ color:OG_D, fontWeight:800, fontSize:"1rem", margin:"0 0 .6rem" }}>🔭 {t.vision}</h3>
              <p style={{ color:"#57534e", lineHeight:1.85, margin:0, fontSize:".9rem" }}>{t.visionBody}</p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"1rem" }}>
            {t.bizTypes.map(b => (
              <div key={b.title} className="mg-card-3d" style={{
                background:WHITE, borderRadius:16, padding:"1.4rem 1.2rem",
                boxShadow:"0 4px 24px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.04)",
                border:"1px solid rgba(249,115,22,.08)",
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, right:0, width:60, height:60, background:"radial-gradient(circle at 80% 20%, rgba(249,115,22,.07), transparent 70%)", pointerEvents:"none" }}/>
                <div style={{ fontSize:"1.8rem", marginBottom:".5rem" }}>{b.icon}</div>
                <div style={{ fontWeight:800, color:DARK, fontSize:".88rem", marginBottom:".3rem" }}>{b.title}</div>
                {b.sub && <div style={{ color:OG_D, fontSize:".76rem", fontWeight:600, marginBottom:".2rem", lineHeight:1.4 }}>{b.sub}</div>}
                <div style={{ color:"#78716c", fontSize:".78rem", lineHeight:1.5 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Products = () => (
    <section id="products" style={{ background: DARK2, padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:"80%", height:"80%", background:"radial-gradient(ellipse, rgba(249,115,22,.04) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <div style={{ color:OG, fontWeight:800, fontSize:".72rem", letterSpacing:3, textTransform:"uppercase", marginBottom:".8rem" }}>— Products —</div>
          <h2 style={{ color:DARK, fontWeight:900, fontSize:"clamp(1.8rem,4vw,2.8rem)", margin:"0 0 1rem", lineHeight:1.15 }}>{t.productsTitle}</h2>
          <div style={{ width:52, height:4, background:`linear-gradient(90deg, ${OG}, ${AMBER})`, borderRadius:2, margin:"0 auto" }}/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"1.2rem" }}>
          {t.products.map((p, i) => (
            <div key={p.cat} className="mg-card" style={{
              background:WHITE,
              border:"1px solid rgba(249,115,22,.15)",
              borderTop:`3px solid ${OG}`,
              borderRadius:16, padding:"1.8rem 1.5rem",
              position:"relative", overflow:"hidden",
              boxShadow:"0 4px 20px rgba(249,115,22,.07)",
            }}>
              <div style={{ position:"absolute", bottom:-10, right:8, fontSize:"4.5rem", fontWeight:900, color:"rgba(249,115,22,.12)", lineHeight:1, userSelect:"none" }}>
                {String(i+1).padStart(2,"0")}
              </div>
              <div style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                width:52, height:52, borderRadius:14,
                background:"linear-gradient(135deg, rgba(249,115,22,.15), rgba(251,191,36,.1))",
                fontSize:"1.8rem", marginBottom:".8rem",
                border:"1px solid rgba(249,115,22,.2)",
              }}>{p.icon}</div>
              <div style={{ fontWeight:800, color:DARK, fontSize:".97rem", marginBottom:".5rem" }}>{p.cat}</div>
              <div style={{ color:"#78350F", fontSize:".85rem", lineHeight:1.7 }}>{p.items}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"2.5rem", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px rgba(249,115,22,.12)", border:"1px solid rgba(249,115,22,.15)" }}>
          <img src="/m-group-products-banner.jpg" alt="หมวดหมู่สินค้า" style={{ width:"100%", height:"auto", display:"block" }} />
        </div>
        <p style={{ textAlign:"center", color:"rgba(28,10,0,.5)", marginTop:"2rem", fontSize:".9rem" }}>
          มีทุน อยากขายสินค้า นึกไม่ออก — <span style={{ color:OG_D, fontWeight:700 }}>นึกถึงเรา ยินดีให้คำแนะนำ</span>
        </p>
      </div>
    </section>
  );

  const Services = () => (
    <section id="services" style={{ background: WARM, padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", right:"-5%", top:"-10%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, rgba(249,115,22,.07), transparent 65%)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"-5%", bottom:"-10%", width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, rgba(251,191,36,.05), transparent 65%)`, pointerEvents:"none" }}/>
      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <div style={{ color:OG, fontWeight:800, fontSize:".72rem", letterSpacing:3, textTransform:"uppercase", marginBottom:".8rem" }}>— Services —</div>
          <h2 style={{ color:DARK, fontWeight:900, fontSize:"clamp(1.8rem,4vw,2.8rem)", margin:"0 0 1rem", lineHeight:1.15 }}>{t.servicesTitle}</h2>
          {t.servicesIntro && (
            <p style={{ color:"#78350F", maxWidth:580, margin:"0 auto", lineHeight:1.8, fontSize:".93rem" }}>{t.servicesIntro}</p>
          )}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1.5rem" }}>
          {t.services.map(s => (
            <div key={s.title} className="mg-card" style={{
              background:WHITE,
              borderRadius:20, padding:"2rem 1.6rem",
              border:"1px solid rgba(249,115,22,.12)",
              boxShadow:"0 4px 20px rgba(249,115,22,.09)",
            }}>
              <div style={{
                width:54, height:54, borderRadius:14,
                background:`linear-gradient(135deg, ${OG}, ${OG_D})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"1.5rem", marginBottom:"1rem",
                boxShadow:"0 4px 16px rgba(249,115,22,.3)",
              }}>{s.icon}</div>
              <div style={{ fontWeight:800, color:DARK, fontSize:"1rem", marginBottom:".6rem" }}>{s.title}</div>
              <div style={{ color:"#78350F", fontSize:".875rem", lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AIPlatform = () => (
    <section id="ai-platform" style={{
      background: `linear-gradient(160deg, ${WHITE} 0%, ${CREAM} 60%, ${WARM} 100%)`,
      padding: "6rem 2rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position:"absolute", right:"5%", top:"10%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(249,115,22,.07), transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"2%", bottom:"5%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(251,191,36,.05), transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <span style={{
            display:"inline-block",
            background:"rgba(249,115,22,.1)", color:OG,
            border:"1px solid rgba(249,115,22,.28)", borderRadius:999,
            padding:"5px 18px", fontSize:".75rem", fontWeight:700, letterSpacing:1.5,
            marginBottom:"1rem", textTransform:"uppercase",
          }}>{t.aiPlatformBadge}</span>
          <h2 style={{ color:DARK, fontWeight:900, fontSize:"clamp(1.7rem,3.5vw,2.6rem)", margin:".5rem 0 1rem", lineHeight:1.2 }}>
            🤖 {t.aiPlatformTitle}
          </h2>
          <p style={{ color:"#78350F", maxWidth:580, margin:"0 auto", lineHeight:1.8, fontSize:".95rem" }}>
            {t.aiPlatformDesc}
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.2rem", marginBottom:"3rem" }}>
          {t.aiSteps.map(s => (
            <div key={s.step} className="mg-card" style={{
              background:WHITE,
              borderRadius:18, padding:"1.8rem 1.4rem",
              border:"1px solid rgba(249,115,22,.15)",
              position:"relative", overflow:"hidden",
              boxShadow:"0 4px 20px rgba(249,115,22,.1)",
            }}>
              <div style={{ position:"absolute", top:12, right:14, fontSize:"2.8rem", fontWeight:900, color:"rgba(249,115,22,.15)", lineHeight:1, userSelect:"none" }}>{s.step}</div>
              <div style={{
                width:44, height:44, borderRadius:12,
                background:"linear-gradient(135deg, rgba(249,115,22,.15), rgba(251,191,36,.1))",
                border:"1px solid rgba(249,115,22,.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"1.3rem", marginBottom:".8rem",
              }}>{s.icon}</div>
              <div style={{ color:OG_D, fontWeight:800, fontSize:".9rem", marginBottom:".5rem" }}>{s.title}</div>
              <div style={{ color:"#78350F", fontSize:".82rem", lineHeight:1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"1.5rem", flexWrap:"wrap",
            justifyContent:"center",
            background:WHITE,
            border:"1px solid rgba(249,115,22,.25)",
            borderRadius:16, padding:"1.2rem 2rem", marginBottom:"2rem",
          }}>
            {["AI Chatbot", "E-Commerce", "Auto Invoice", "Payment Verify", "Order Confirm"].map(tag => (
              <span key={tag} style={{ color:OG_D, fontSize:".82rem", fontWeight:600 }}>✓ {tag}</span>
            ))}
          </div>
          <br/>
          <a href={"mailto:" + EMAIL} className="mg-btn" style={{
            display:"inline-block",
            background:`linear-gradient(135deg, ${OG}, ${OG_D})`,
            color:WHITE, fontWeight:800, fontSize:".97rem",
            padding:"13px 32px", borderRadius:50, textDecoration:"none",
            boxShadow:"0 4px 24px rgba(249,115,22,.4)",
          }}>
            📧 {t.aiCta}
          </a>
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section id="contact" style={{ background: WHITE, padding: "6rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"80%", height:1, background:`linear-gradient(90deg, transparent, ${OG}, transparent)` }}/>
      <div style={{ maxWidth: 720, margin:"0 auto", position:"relative" }}>
        <div style={{ color:OG, fontWeight:800, fontSize:".72rem", letterSpacing:3, textTransform:"uppercase", marginBottom:".8rem" }}>— Contact —</div>
        <h2 style={{ color:DARK, fontWeight:900, fontSize:"clamp(1.7rem,3.5vw,2.5rem)", margin:"0 0 2rem", lineHeight:1.2 }}>
          {t.contactTitle}
        </h2>
        <div style={{
          background:CREAM,
          border:"1px solid rgba(249,115,22,.2)",
          borderRadius:20, padding:"2.5rem 2rem",
          marginBottom:"2rem",
          boxShadow:"0 4px 20px rgba(249,115,22,.1)",
        }}>
          <p style={{
            fontWeight:800, fontSize:"1.05rem", marginBottom:".8rem",
            background:`linear-gradient(90deg, ${OG}, ${AMBER})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          }}>บริษัท มหาโชค มหาชัย อินเตอร์เทรด จำกัด</p>
          <p style={{ color:"#78350F", fontSize:".9rem", lineHeight:1.85, marginBottom:"1.5rem" }}>📍 {ADDRESS}</p>
          <div style={{ display:"flex", gap:"1.2rem", justifyContent:"center", flexWrap:"wrap" }}>
            <a href={"tel:" + PHONE} style={{ color:OG_D, textDecoration:"none", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>📞 {PHONE}</a>
            <span style={{ color:"rgba(0,0,0,.15)" }}>|</span>
            <span style={{ color:"#78350F", fontSize:".88rem" }}>📠 {FAX}</span>
            <span style={{ color:"rgba(0,0,0,.15)" }}>|</span>
            <a href={"mailto:" + EMAIL} style={{ color:OG, textDecoration:"none", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>✉ {EMAIL}</a>
          </div>
        </div>
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="mg-btn" style={{
          display:"inline-block",
          background:`linear-gradient(135deg, ${OG}, ${OG_D})`,
          color:WHITE, fontWeight:800, fontSize:"1rem",
          padding:"14px 36px", borderRadius:50, textDecoration:"none",
          boxShadow:"0 4px 24px rgba(249,115,22,.4)",
        }}>
          🌐 {t.contactCta} → m-group.in.th ↗
        </a>
      </div>
    </section>
  );

  const Footer = () => (
    <footer style={{
      background: CREAM,
      borderTop: "1px solid rgba(249,115,22,.3)",
      color: "rgba(28,10,0,.45)",
      textAlign: "center",
      padding: "1.5rem",
      fontSize: ".8rem",
    }}>
      {t.footerText}
    </footer>
  );

  return (
    <div style={{ fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", overflowX: "hidden" }}>
      {Navbar()}
      {Hero()}
      <section id="shop">
        <ShopClient embedded />
      </section>
      {Stats()}
      {About()}
      {Products()}
      {Services()}
      {AIPlatform()}
      {Contact()}
      {Footer()}
    </div>
  );
}
