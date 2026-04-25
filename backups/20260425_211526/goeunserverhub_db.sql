/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: goeunserverhub
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-0+deb13u1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `Account_userId_idx` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `nameTh` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('ONLINE','MAINTENANCE','COMING_SOON','OFFLINE') NOT NULL DEFAULT 'COMING_SOON',
  `contactEmail` varchar(191) DEFAULT NULL,
  `contactPhone` varchar(191) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `systemUrl` varchar(191) DEFAULT NULL,
  `logoUrl` varchar(191) DEFAULT NULL,
  `domainRegisteredAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Client_slug_key` (`slug`),
  KEY `Client_slug_idx` (`slug`),
  KEY `Client_status_idx` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES
('cmo6viudt0001qhga9f5j4jzc','M-Factory',NULL,'m-factory',NULL,'ONLINE','m.factoryandresort@gmail.com','+66 095-241-1833',NULL,'https://m-factoryandresort.com',NULL,NULL,'2026-04-24 23:13:22.775','2026-04-20 07:28:50.513'),
('cmo6viueb0002qhgad1v22u6k','M-Group',NULL,'m-group',NULL,'ONLINE','sale@m-group.in.th','089-4871144',NULL,NULL,NULL,NULL,'2026-04-20 07:28:50.531','2026-04-20 07:28:50.531'),
('cmo6viuen0003qhga32hwcu3n','GOEUN SERVER HUB',NULL,'goeun-server-hub','','ONLINE','goeunserverhub@gmail.com','+66081-234567','','ge-serverhub.com','/uploads/logos/1776694124366-rd4x8l.jpg',NULL,'2026-04-20 07:28:50.543','2026-04-20 14:08:48.344'),
('cmo6x1sht0008qhvqygcgasiq','M-retsort','เอ็มรีสอร์ท','m-retsort','เอ็มรีสอร์ท  บริการที่พัก บรรยากาศส่วนตัว','ONLINE','mukhngamnuch@gmail.com','095-241-1833','เอ็มรีสอร์ท 222 ซอย คลองโซน 6 ตำบล ลาดหลุมแก้ว อำเภอลาดหลุมแก้ว ปทุมธานี 12140  ','https://m-factoryandresort.com/','/uploads/logos/1776692894976-ecji3u.jpg',NULL,'2026-04-24 23:13:22.775','2026-04-20 15:02:10.074'),
('cmo9bve0m0000qhtikd261ug2','Green Retail Group',NULL,'green-retail-group','ระบบมอนิเตอริ่ง ผู้ใช้ Demo','ONLINE','it@green-retail.example.com','02-555-1199',NULL,'/customer-dashboard-login',NULL,NULL,'2026-04-22 00:42:02.038','2026-04-22 01:21:00.734');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ClientService`
--

DROP TABLE IF EXISTS `ClientService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientService` (
  `clientId` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL,
  `assignedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`clientId`,`serviceId`),
  KEY `ClientService_clientId_idx` (`clientId`),
  KEY `ClientService_serviceId_idx` (`serviceId`),
  CONSTRAINT `ClientService_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ClientService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientService`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ClientService` WRITE;
/*!40000 ALTER TABLE `ClientService` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClientService` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `id` varchar(191) NOT NULL,
  `clientId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `idCard` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Customer_clientId_idx` (`clientId`),
  KEY `Customer_name_idx` (`name`),
  CONSTRAINT `Customer_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Expense`
--

DROP TABLE IF EXISTS `Expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Expense` (
  `id` varchar(191) NOT NULL,
  `number` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'THB',
  `status` varchar(191) NOT NULL DEFAULT 'รอชำระ',
  `notes` text DEFAULT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `receiptNumber` varchar(191) DEFAULT NULL,
  `receiptFile` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Expense_number_key` (`number`),
  KEY `Expense_category_idx` (`category`),
  KEY `Expense_date_idx` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Expense`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Expense` WRITE;
/*!40000 ALTER TABLE `Expense` DISABLE KEYS */;
INSERT INTO `Expense` VALUES
('cmo6xw4ux0000qhckz881fb94','EXP260420-00001','ค่าเช่าเซิร์ฟเวอร์/โดเมน',32000.00,'KRW','รอชำระ','รอแก้ไขตามยอดที่ชำระจริง     ชำระค่าโดเมนหลัก ge-serverhub.com','2027-04-16 00:00:00.000',NULL,NULL,'2026-04-20 08:35:09.849','2026-04-20 08:35:09.849'),
('cmo7bf9yg0000qhhdecedr56b','EXP260420-00002','ค่าเช่าเซิร์ฟเวอร์/โดเมน',18702.00,'KRW','แนบใบเสร็จแล้ว','ge-serverhub.com     Invoice number NKBQJH4J-0005\n','2026-04-17 00:00:00.000','2802-8830','[\"/uploads/receipts/1776696837141-z8m2uo.jpg\",\"/uploads/receipts/1776696837367-9666uz.pdf\"]','2026-04-20 14:53:57.929','2026-04-20 14:53:57.929'),
('cmo7bhvm40001qhhdcbg6qh4i','EXP260420-00003','ค่าเช่าเซิร์ฟเวอร์/โดเมน',18702.00,'KRW','แนบใบเสร็จแล้ว','m-factoryandresort.com    Invoice number NKBQJH4J-0006','2026-04-20 00:00:00.000','2646-1755','[\"/uploads/receipts/1776696958957-cz79s2.jpg\",\"/uploads/receipts/1776696959136-2dhbkm.pdf\"]','2026-04-20 14:55:59.309','2026-04-20 14:55:59.309'),
('cmo7bkujm0002qhhdiv26ryxd','EXP260420-00004','ค่าบริการภายนอก',32831.00,'KRW','แนบใบเสร็จแล้ว','Claude Pro   AI code   Invoice number K6CHS41L-0004','2026-04-18 00:00:00.000','2624-8386-0931','[\"/uploads/receipts/1776697097592-kc7bgc.jpg\",\"/uploads/receipts/1776697097743-l337lk.pdf\"]','2026-04-20 14:58:17.890','2026-04-20 14:58:17.890'),
('cmo7bowl50003qhhdnqudjasn','EXP260421-00001','ค่าบริการภายนอก',30251.00,'KRW','แนบใบเสร็จแล้ว','ngrok Inc.  Forward IP getaway  Local to Public      Invoice number DYWNCD-00006','2026-04-17 00:00:00.000','DYWNCD-00006','[\"/uploads/receipts/1776697286801-yz5wcq.pdf\",\"/uploads/receipts/1776697287014-fj59bl.jpg\"]','2026-04-20 15:01:27.161','2026-04-20 15:01:27.161');
/*!40000 ALTER TABLE `Expense` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Invoice` (
  `id` varchar(191) NOT NULL,
  `number` varchar(191) NOT NULL,
  `receiptNumber` varchar(191) DEFAULT NULL,
  `clientId` varchar(191) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'THB',
  `status` enum('PENDING','PAID','OVERDUE','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `dueDate` datetime(3) DEFAULT NULL,
  `paidAt` datetime(3) DEFAULT NULL,
  `stripeId` varchar(191) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Invoice_number_key` (`number`),
  UNIQUE KEY `Invoice_receiptNumber_key` (`receiptNumber`),
  UNIQUE KEY `Invoice_stripeId_key` (`stripeId`),
  KEY `Invoice_clientId_idx` (`clientId`),
  KEY `Invoice_status_idx` (`status`),
  KEY `Invoice_userId_fkey` (`userId`),
  CONSTRAINT `Invoice_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
INSERT INTO `Invoice` VALUES
('cmo6vyr9g0001qhvq03kwyvp4','INV260420-00001','RCP260417-0001','cmo6viudt0001qhga9f5j4jzc',NULL,2000.00,'THB','PAID','2026-04-16 00:00:00.000','2026-04-20 07:41:12.962',NULL,'ค่าบรืการดูแลระบบ เดือน เมษายน 2569','2026-04-20 07:41:12.964','2026-04-20 07:41:12.964'),
('cmo6vzowk0003qhvqlwjuhobj','INV260420-00002',NULL,'cmo6viudt0001qhga9f5j4jzc',NULL,2000.00,'THB','PENDING','2026-05-16 00:00:00.000',NULL,NULL,'ค่าบริการดูแลระบบ','2026-04-20 07:41:56.564','2026-04-20 07:41:56.564'),
('cmo6w7ju80005qhvq0gqqy4kb','INV260420-00003',NULL,'cmo6viudt0001qhga9f5j4jzc',NULL,1500.00,'THB','PAID','2026-04-16 00:00:00.000','2026-04-20 07:48:03.246',NULL,'ค่าเช่า โดเมน รายปี','2026-04-20 07:48:03.248','2026-04-20 07:48:03.248'),
('cmo6w9pq40007qhvqc4td6ml9','INV260420-00004',NULL,'cmo6viudt0001qhga9f5j4jzc',NULL,1500.00,'THB','PENDING','2027-04-16 00:00:00.000',NULL,NULL,'ค่าบริการ เช่าโดเมน รายปี','2026-04-20 07:49:44.189','2026-04-20 07:49:44.189'),
('cmo6x7v2k000eqhvqhvds8z2k','INV260420-00005',NULL,'cmo6x1sht0008qhvqygcgasiq',NULL,3500.00,'THB','PENDING','2026-04-27 00:00:00.000',NULL,NULL,'ค่ายิงแอดเฟสบุ๊ค รายสัปดาห์','2026-04-20 08:16:17.420','2026-04-20 08:16:17.420'),
('cmo6xa2gz000gqhvq6hzxwilh','INV260420-00006',NULL,'cmo6x1sht0008qhvqygcgasiq',NULL,3500.00,'THB','PAID','2026-04-13 00:00:00.000','2026-04-20 08:18:00.321',NULL,'ค่ายิงแอดเฟสบุ๊ค รายสัปดาห์','2026-04-20 08:18:00.323','2026-04-20 08:18:00.323');
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` varchar(191) NOT NULL,
  `type` enum('INVOICE','SYSTEM_ALERT','WELCOME','PASSWORD_RESET') NOT NULL,
  `channel` enum('EMAIL','LINE','PUSH') NOT NULL,
  `recipient` varchar(191) NOT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `body` text NOT NULL,
  `sent` tinyint(1) NOT NULL DEFAULT 0,
  `sentAt` datetime(3) DEFAULT NULL,
  `error` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `Notification_sent_idx` (`sent`),
  KEY `Notification_type_idx` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `nameEn` varchar(191) NOT NULL,
  `nameZh` varchar(191) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `priceWholesale` decimal(10,2) NOT NULL,
  `unit` varchar(191) NOT NULL,
  `minOrder` int(11) NOT NULL DEFAULT 1,
  `minWholesale` int(11) NOT NULL DEFAULT 10,
  `desc` text DEFAULT NULL,
  `img` varchar(191) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(3,1) NOT NULL DEFAULT 5.0,
  `sold` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `promotion` varchar(191) DEFAULT NULL,
  `promotionPrice` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_sku_key` (`sku`),
  KEY `Product_category_idx` (`category`),
  KEY `Product_active_idx` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES
(1,'AG-001','agri','ถังพ่นยา 20 ลิตร','20L Spray Tank','20升喷药桶',890.00,750.00,'ถัง',1,10,'ถังพ่นยาสะพายหลัง 20 ลิตร ปั๊มมือ ทนทาน เหมาะสำหรับพ่นยาฆ่าแมลงและปุ๋ย',NULL,150,4.5,320,1,NULL,NULL,'2026-04-24 14:18:00.602','2026-04-24 14:18:00.602'),
(2,'AG-002','agri','เครื่องตัดหญ้า 2 จังหวะ','2-Stroke Brush Cutter','二冲程割草机',3200.00,2800.00,'เครื่อง',1,5,'เครื่องตัดหญ้าแบบสะพายหลัง เครื่องยนต์ 2 จังหวะ กำลัง 26cc น้ำหนักเบา ใช้งานง่าย',NULL,80,4.7,210,1,NULL,NULL,'2026-04-24 14:18:00.709','2026-04-24 14:18:00.709'),
(3,'AG-003','agri','ปั๊มน้ำไฟฟ้า 0.5 แรงม้า','0.5 HP Water Pump','0.5马力水泵',1450.00,1250.00,'เครื่อง',1,5,'ปั๊มน้ำอัตโนมัติสำหรับสวนเกษตร ทนทาน ประหยัดไฟ',NULL,60,4.4,185,1,NULL,NULL,'2026-04-24 14:18:00.980','2026-04-24 14:18:00.980'),
(4,'AG-004','agri','สายยาง PVC 1 นิ้ว (50 เมตร)','PVC Hose 1 inch 50m','1寸PVC水管50米',650.00,520.00,'ม้วน',1,10,'สายยาง PVC คุณภาพสูง ทนแรงดันน้ำ ไม่แข็งตัวในอากาศเย็น',NULL,200,4.3,450,1,NULL,NULL,'2026-04-24 14:18:01.004','2026-04-24 14:18:01.004'),
(5,'AG-005','agri','เครื่องชั่งดิจิตอล 100 กก.','100kg Digital Scale','100公斤数字秤',2100.00,1850.00,'เครื่อง',1,3,'เครื่องชั่งดิจิตอลแสดงผลแม่นยำ ทนทาน เหมาะสำหรับงานเกษตรและคลังสินค้า',NULL,45,4.6,98,1,NULL,NULL,'2026-04-24 14:18:01.028','2026-04-24 14:18:01.028'),
(6,'RB-001','rubber','จอกยางพารา (100 ชิ้น)','Rubber Latex Cup x100','乳胶杯100个',380.00,300.00,'แพ็ค',1,20,'จอกรองน้ำยางพาราคุณภาพดี ทนทาน ใช้ได้นาน',NULL,500,4.5,620,1,NULL,NULL,'2026-04-24 14:18:01.124','2026-04-24 14:18:01.124'),
(7,'RB-002','rubber','จักรรีดยาง รีดน้ำยางสด','Rubber Wringer Machine','橡胶压榨机',5500.00,4900.00,'เครื่อง',1,2,'จักรรีดยางพาราสดแบบมือหมุน โครงเหล็ก แข็งแรง ทนทาน',NULL,30,4.8,75,1,NULL,NULL,'2026-04-24 14:18:01.154','2026-04-24 14:18:01.154'),
(8,'RB-003','rubber','มีดกรีดยาง สแตนเลส (แพ็ค 5)','Rubber Tapping Knife x5','割胶刀不锈钢5把',220.00,175.00,'แพ็ค',1,20,'มีดกรีดยางพาราสแตนเลสคุณภาพสูง คมทนนาน จับถนัดมือ',NULL,300,4.4,380,1,NULL,NULL,'2026-04-24 14:18:01.178','2026-04-24 14:18:01.178'),
(9,'FS-001','fishing','เชือกอวนไนล่อน 3 มม. (100 เมตร)','Nylon Net Rope 3mm 100m','3mm尼龙绳100米',480.00,400.00,'ม้วน',1,20,'เชือกอวนไนล่อนความแข็งแรงสูง ทนน้ำทะเล เหมาะสำหรับงานประมงและเกษตร',NULL,400,4.5,520,1,NULL,NULL,'2026-04-24 14:18:01.204','2026-04-24 14:18:01.204'),
(10,'FS-002','fishing','ตาข่ายพลาสติก 1.5×50 เมตร','Plastic Net 1.5×50m','塑料网1.5×50米',750.00,620.00,'ม้วน',1,10,'ตาข่ายพลาสติก HDPE ช่องตาข่าย 2 นิ้ว ทนแสงแดด UV ใช้งานได้หลายปี',NULL,180,4.6,290,1,NULL,NULL,'2026-04-24 14:18:01.228','2026-04-24 14:18:01.228'),
(11,'FS-003','fishing','ตาข่ายลวดกัลวาไนซ์ 1×30 เมตร','Galvanized Wire Mesh 1×30m','镀锌铁丝网1×30米',1200.00,980.00,'ม้วน',1,5,'ตาข่ายลวดกัลวาไนซ์ทนสนิม ช่องตาข่าย 1 นิ้ว เหมาะสำหรับงานรั้วและกรง',NULL,120,4.7,175,1,NULL,NULL,'2026-04-24 14:18:01.255','2026-04-24 14:18:01.255'),
(12,'CS-001','construction','สแลนกรองแสง 70% (2×50 เมตร)','70% Shade Cloth 2×50m','70%遮阳网2×50米',1650.00,1400.00,'ม้วน',1,5,'สแลนกรองแสง 70% สีดำ ใยสังเคราะห์ HDPE ทนทาน ลดอุณหภูมิ ป้องกัน UV',NULL,90,4.5,240,1,NULL,NULL,'2026-04-24 14:18:01.305','2026-04-24 14:18:01.305'),
(13,'CS-002','construction','มุ้งไนล่อน 1.2×30 เมตร','Nylon Mesh 1.2×30m','尼龙防虫网1.2×30米',980.00,820.00,'ม้วน',1,10,'มุ้งไนล่อนกันแมลง ตาถี่ ใช้คลุมผักและโรงเรือนเกษตร ทนทาน',NULL,150,4.4,320,1,NULL,NULL,'2026-04-24 14:18:01.420','2026-04-24 14:18:01.420'),
(14,'SF-001','safety','ถุงมือยางกันสารเคมี (คู่)','Chemical Rubber Gloves','防化学品橡胶手套',85.00,65.00,'คู่',5,100,'ถุงมือยางธรรมชาติ กันสารเคมี น้ำยาง และสิ่งสกปรก ยาวถึงข้อศอก',NULL,1000,4.5,850,1,NULL,NULL,'2026-04-24 14:18:01.445','2026-04-24 14:18:01.445'),
(15,'SF-002','safety','รองเท้าบูทยาง Safety (คู่)','Rubber Safety Boots','橡胶安全靴',390.00,320.00,'คู่',1,12,'รองเท้าบูทยาง PVC กันน้ำ กันสารเคมี พื้นกันลื่น เหมาะงานเกษตรและก่อสร้าง',NULL,200,4.6,420,1,NULL,NULL,'2026-04-24 14:18:01.478','2026-04-24 14:18:01.478'),
(16,'SF-003','safety','หมวกนิรภัย Safety Helmet','Safety Helmet','安全帽',185.00,145.00,'ใบ',1,20,'หมวกนิรภัยมาตรฐาน มอก. ABS รับแรงกระแทก ปรับขนาดได้ หลายสี',NULL,350,4.3,560,1,NULL,NULL,'2026-04-24 14:18:01.503','2026-04-24 14:18:01.503'),
(17,'MC-001','misc','ไฟสปอร์ตไลท์ LED 100W','LED Spotlight 100W','100W LED射灯',890.00,740.00,'ดวง',1,10,'ไฟสปอร์ตไลท์ LED 100W กันน้ำ IP65 แสงขาว 6500K เหมาะกลางแจ้งและโรงงาน',NULL,120,4.7,290,1,NULL,NULL,'2026-04-24 14:18:01.545','2026-04-24 14:18:01.545'),
(18,'MC-002','misc','ไฟล้อม LED สายยาว 10 เมตร','LED String Light 10m','LED灯串10米',350.00,280.00,'ชุด',1,20,'ไฟประดับ LED สายยาว 10 เมตร กันน้ำ ใช้ได้ทั้งในและนอกอาคาร',NULL,250,4.4,380,1,NULL,NULL,'2026-04-24 14:18:01.654','2026-04-24 14:18:01.654'),
(19,'AG-006','agri','โดรนพ่นยา 10 ลิตร (เช่า)','10L Drone Sprayer (Rental)','10升无人机喷药(租赁)',1500.00,1200.00,'วัน',1,3,'บริการเช่าโดรนพ่นยา 10 ลิตร พร้อมนักบิน บินได้ 15 ไร่/ชม.',NULL,5,4.9,45,1,NULL,NULL,'2026-04-24 14:18:01.705','2026-04-24 14:18:01.705'),
(20,'CS-003','construction','ลวดผูกเหล็ก 1 กก.','Binding Wire 1kg','绑扎铁丝1公斤',65.00,50.00,'ม้วน',5,50,'ลวดผูกเหล็กอ่อน ชุบดำ ขนาด 18 เบอร์ ใช้ผูกเหล็กก่อสร้าง',NULL,800,4.2,970,1,NULL,NULL,'2026-04-24 14:18:01.728','2026-04-24 14:18:01.728'),
(21,'AG-007','agri','ถาดเพาะกล้า 50 หลุม','50-Cell Seedling Tray','50孔育苗盘',35.00,25.00,'ใบ',10,100,'ถาดเพาะกล้าพลาสติก 50 หลุม ทนทาน ใช้ซ้ำได้ เหมาะสำหรับเพาะพืชผักและไม้ดอก','/m-group-products/1.png',500,4.4,380,1,NULL,NULL,'2026-04-24 14:18:01.755','2026-04-24 14:18:01.755'),
(22,'AG-008','agri','เครื่องพ่นยาไฟฟ้า 12V 16 ลิตร','12V Electric Sprayer 16L','12V电动喷雾器16升',1290.00,1050.00,'เครื่อง',1,5,'เครื่องพ่นยาไฟฟ้าสะพายหลัง 16 ลิตร ใช้แบตเตอรี่ 12V ปรับแรงดันได้ หัวพ่น 4 แบบ','/m-group-products/2.png',70,4.6,155,1,NULL,NULL,'2026-04-24 14:18:01.787','2026-04-24 14:18:01.787'),
(23,'AG-009','agri','ปั๊มหอยโข่ง 1 แรงม้า','Centrifugal Pump 1HP','1马力离心泵',1850.00,1600.00,'เครื่อง',1,3,'ปั๊มหอยโข่งมอเตอร์ 1 แรงม้า ดูดน้ำได้ลึก 8 เมตร อัตราการไหล 100 ลิตร/นาที','/m-group-products/4.png',40,4.5,88,1,NULL,NULL,'2026-04-24 14:18:01.819','2026-04-24 14:18:01.819'),
(24,'AG-010','agri','จอบด้ามไม้ เหล็กหล่อ','Iron Hoe with Wooden Handle','铸铁锄头木柄',185.00,145.00,'เล่ม',1,20,'จอบเหล็กหล่อคุณภาพสูง ด้ามไม้แข็งแรง เหมาะสำหรับขุดดิน พรวนดิน และปลูกพืช','/m-group-products/6.png',250,4.3,310,1,NULL,NULL,'2026-04-24 14:18:01.997','2026-04-24 14:18:01.997'),
(25,'AG-011','agri','รถไถเดินตาม 6 แรงม้า','6HP Power Tiller','6马力手扶拖拉机',28500.00,25000.00,'เครื่อง',1,1,'รถไถเดินตาม เครื่องยนต์ดีเซล 6 แรงม้า ไถ พรวน และสูบน้ำได้ น้ำหนักเบา ใช้งานง่าย','/m-group-products/7.png',12,4.8,34,1,NULL,NULL,'2026-04-24 14:18:02.028','2026-04-24 14:18:02.028'),
(26,'AG-012','agri','อาหารไก่ เนื้อ 30 กก.','Broiler Chicken Feed 30kg','肉鸡饲料30公斤',520.00,450.00,'กระสอบ',1,20,'อาหารไก่เนื้อ สูตรครบถ้วน โปรตีนสูง วิตามินและแร่ธาตุครบ เร่งการเจริญเติบโต','/m-group-products/5.png',200,4.5,420,1,NULL,NULL,'2026-04-24 14:18:02.055','2026-04-24 14:18:02.055'),
(27,'AG-013','agri','สายยางดำ PE 3/4 นิ้ว (100 เมตร)','PE Hose 3/4 inch 100m','3/4寸PE黑管100米',980.00,820.00,'ม้วน',1,5,'สายยางดำ PE ทนแดด ทนน้ำ ใช้สำหรับระบบน้ำหยดและสปริงเกลอร์ในสวนเกษตร',NULL,150,4.4,265,1,NULL,NULL,'2026-04-24 14:18:02.087','2026-04-24 14:18:02.087'),
(28,'RB-004','rubber','อีทีฟอน 39% (Ethephon) 1 ลิตร','Ethephon 39% 1L','乙烯利39%溶液1升',280.00,230.00,'ขวด',1,24,'สารกระตุ้นน้ำยางพาราอีทีฟอน 39% ใช้ทาหน้ายาง เพิ่มผลผลิตน้ำยาง ได้รับการรับรอง','/m-group-products/9.png',200,4.7,480,1,NULL,NULL,'2026-04-24 14:18:02.122','2026-04-24 14:18:02.122'),
(29,'RB-005','rubber','กล่องใส่น้ำยาง 2 ลิตร (แพ็ค 50)','Latex Box 2L x50','2升乳胶盒50个装',290.00,230.00,'แพ็ค',1,10,'กล่องบรรจุน้ำยางพาราขนาด 2 ลิตร ทรงสี่เหลี่ยม มีฝาปิด สะอาด ปลอดภัย ส่งโรงงาน',NULL,300,4.5,290,1,NULL,NULL,'2026-04-24 14:18:02.145','2026-04-24 14:18:02.145'),
(30,'RB-006','rubber','ถังน้ำยาง HDPE 20 ลิตร','HDPE Latex Tank 20L','HDPE乳胶桶20升',185.00,145.00,'ใบ',1,20,'ถังน้ำยาง HDPE 20 ลิตร ฝาเกลียว ทนทาน ไม่เป็นสนิม ใช้เก็บและขนส่งน้ำยางพารา',NULL,400,4.6,340,1,NULL,NULL,'2026-04-24 14:18:02.269','2026-04-24 14:18:02.269'),
(31,'RB-007','rubber','เสาฉากยางพารา เหล็กชุบ (แพ็ค 10)','Rubber Tapping Stand x10','橡胶采集架10个',340.00,280.00,'แพ็ค',1,10,'เสาฉากสำหรับวางจอกรองน้ำยาง ทำจากเหล็กชุบกันสนิม แข็งแรง ติดตั้งง่าย','/m-group-products/8.png',180,4.4,210,1,NULL,NULL,'2026-04-24 14:18:02.305','2026-04-24 14:18:02.305'),
(32,'FS-004','fishing','เชือก PE 3 เส้น 6 มม. (100 เมตร)','PE Rope 3-Strand 6mm 100m','PE三股绳6mm100米',560.00,460.00,'ม้วน',1,10,'เชือก PE 3 เส้น ขนาด 6 มม. ทนน้ำทะเล แรงดึง 500 กก. สีขาว ใช้ในงานประมงและเกษตร',NULL,300,4.5,410,1,NULL,NULL,'2026-04-24 14:18:02.354','2026-04-24 14:18:02.354'),
(33,'FS-005','fishing','อวนล้อม ตา 1.5 นิ้ว ยาว 100 เมตร','Surrounding Net 1.5inch 100m','围网1.5寸100米',2200.00,1850.00,'ม้วน',1,3,'อวนล้อมไนล่อน ตาห่าง 1.5 นิ้ว ยาว 100 เมตร ลึก 3 เมตร ทนทาน ทนแดด UV','/m-group-products/10.png',60,4.6,85,1,NULL,NULL,'2026-04-24 14:18:02.386','2026-04-24 14:18:02.386'),
(34,'FS-006','fishing','ตะกั่วถ่วงน้ำหนัก 1 กก.','Fishing Lead Sinkers 1kg','渔铅坠1公斤',120.00,95.00,'กก.',1,20,'ตะกั่วถ่วงน้ำหนักสำหรับงานประมง หล่อจากตะกั่วบริสุทธิ์ หลากหลายขนาด',NULL,250,4.3,320,1,NULL,NULL,'2026-04-24 14:18:02.437','2026-04-24 14:18:02.437'),
(35,'FS-007','fishing','เชือกกล้วย PP 3 มม. (200 เมตร)','PP Rope 3mm 200m','PP绳3mm200米',180.00,140.00,'ม้วน',2,30,'เชือกกล้วย PP สีเหลือง-ดำ ขนาด 3 มม. ยาว 200 เมตร เหนียว ทนทาน ราคาประหยัด',NULL,600,4.4,780,1,NULL,NULL,'2026-04-24 14:18:02.534','2026-04-24 14:18:02.534'),
(36,'CS-004','construction','รถเข็นมือ ล้อยาง 100 กก.','Wheelbarrow 100kg Rubber Wheel','橡胶轮手推车100公斤',1450.00,1200.00,'คัน',1,3,'รถเข็นมือ โครงเหล็กหนา ล้อยางเติมลม ความจุ 100 กก. เหมาะสำหรับงานก่อสร้างและเกษตร','/m-group-products/12.png',45,4.7,120,1,NULL,NULL,'2026-04-24 14:18:02.563','2026-04-24 14:18:02.563'),
(37,'CS-005','construction','สแลนกรองแสง 50% (1×50 เมตร)','50% Shade Cloth 1×50m','50%遮阳网1×50米',780.00,640.00,'ม้วน',1,10,'สแลนกรองแสง 50% สีเขียว ใยสังเคราะห์ HDPE กันแดด กันฝุ่น ใช้ในโรงเรือนและก่อสร้าง',NULL,110,4.5,195,1,NULL,NULL,'2026-04-24 14:18:02.586','2026-04-24 14:18:02.586'),
(38,'CS-006','construction','ท่อ PVC ชั้น 8.5 ขนาด 4 นิ้ว (4 เมตร)','PVC Pipe Class 8.5 4inch 4m','4寸PVC管8.5级4米',320.00,260.00,'ท่อน',1,20,'ท่อ PVC ชั้น 8.5 ขนาด 4 นิ้ว ยาว 4 เมตร มอก.17-2532 ทนแรงดัน เหมาะงานระบบน้ำและก่อสร้าง',NULL,80,4.3,145,1,NULL,NULL,'2026-04-24 14:18:02.614','2026-04-24 14:18:02.614'),
(39,'CS-007','construction','แผ่นโปลีคาร์บอเนต 4 มม. (1.22×2.44 เมตร)','Polycarbonate Sheet 4mm 1.22×2.44m','4mm聚碳酸酯板1.22×2.44米',1380.00,1150.00,'แผ่น',1,5,'แผ่นโปลีคาร์บอเนตใส 4 มม. กันกระแทก กันแดด UV ใช้ทำหลังคา โรงเรือน และหน้าต่าง',NULL,55,4.6,98,1,NULL,NULL,'2026-04-24 14:18:02.645','2026-04-24 14:18:02.645'),
(40,'SF-004','safety','แว่นตานิรภัย กันสะเก็ด','Safety Goggles Anti-Splatter','防溅安全护目镜',65.00,48.00,'อัน',5,50,'แว่นตานิรภัยโพลีคาร์บอเนต กันสะเก็ด กันสารเคมี มาตรฐาน ANSI Z87.1','/m-group-products/11.png',500,4.5,680,1,NULL,NULL,'2026-04-24 14:18:02.734','2026-04-24 14:18:02.734'),
(41,'SF-005','safety','ชุด PPE กันสารเคมี (ชิ้น)','Chemical PPE Coverall','化学防护服',480.00,390.00,'ชุด',1,20,'ชุด PPE กันสารเคมีแบบทั้งตัว วัสดุโพลีโพรพีลีน กันไอระเหย กันสารเคมีกลุ่ม A-C',NULL,150,4.4,240,1,NULL,NULL,'2026-04-24 14:18:02.934','2026-04-24 14:18:02.934'),
(42,'SF-006','safety','หน้ากากกรองฝุ่น N95 (กล่อง 20 ชิ้น)','N95 Dust Mask Box of 20','N95防尘口罩盒装20个',340.00,280.00,'กล่อง',1,10,'หน้ากากกรองฝุ่น N95 มาตรฐาน กรองฝุ่น PM2.5 เชื้อโรค และสารเคมีบางชนิด',NULL,300,4.6,520,1,NULL,NULL,'2026-04-24 14:18:02.962','2026-04-24 14:18:02.962'),
(43,'SF-007','safety','เข็มขัดนิรภัย 2 จุด (Full Body Harness)','Full Body Harness 2-Point','全身安全带双挂点',890.00,720.00,'ชุด',1,10,'เข็มขัดนิรภัยแบบ Full Body รับน้ำหนักได้ถึง 140 กก. มาตรฐาน EN361 เหมาะงานสูง',NULL,80,4.7,145,1,NULL,NULL,'2026-04-24 14:18:02.987','2026-04-24 14:18:02.987'),
(44,'MC-003','misc','กระทะอลูมิเนียม 36 ซม.','Aluminum Wok 36cm','36厘米铝锅',320.00,255.00,'ใบ',1,12,'กระทะอลูมิเนียมหล่อ ขนาด 36 ซม. ก้นหนา 4 มม. ให้ความร้อนสม่ำเสมอ น้ำหนักเบา','/m-group-products/14.png',180,4.4,260,1,NULL,NULL,'2026-04-24 14:18:03.011','2026-04-24 14:18:03.011'),
(45,'MC-004','misc','เครื่องชั่งแบบห้อย 50 กก.','Hanging Scale 50kg','50公斤吊秤',290.00,230.00,'เครื่อง',1,10,'เครื่องชั่งแบบห้อย สเกล 50 กก. อ่านค่าง่าย สปริงเหล็กกล้า เหมาะสำหรับชั่งสินค้าเกษตร','/m-group-products/16.png',120,4.3,190,1,NULL,NULL,'2026-04-24 14:18:03.037','2026-04-24 14:18:03.037'),
(46,'MC-005','misc','ธูปขาว 3 หุน (1 กล่อง)','White Incense Sticks 3 hua (1 box)','白香3分装（1盒）',85.00,65.00,'กล่อง',1,20,'ธูปขาวคุณภาพดี กลิ่นหอมอ่อน ไม่ฉุน ขนาด 3 หุน บรรจุกล่อง ใช้ไหว้บูชา','/m-group-products/18.png',400,4.5,580,1,NULL,NULL,'2026-04-24 14:18:03.070','2026-04-24 14:18:03.070'),
(47,'MC-006','misc','กล่องลัง ลูกฟูก 5 ชั้น (20×30×25 ซม.)','5-Layer Corrugated Box 20×30×25cm','5层瓦楞纸箱20×30×25厘米',28.00,20.00,'ใบ',20,200,'กล่องลังลูกฟูก 5 ชั้น ขนาด 20×30×25 ซม. แข็งแรง ทนน้ำหนัก เหมาะบรรจุสินค้าทั่วไป','/m-group-products/15.png',1000,4.2,1250,1,NULL,NULL,'2026-04-24 14:18:03.170','2026-04-24 14:18:03.170'),
(48,'MC-007','misc','ไฟสปอร์ตไลท์ LED 200W กันน้ำ','LED Floodlight 200W Waterproof','200W防水LED泛光灯',1650.00,1380.00,'ดวง',1,5,'ไฟสปอร์ตไลท์ LED 200W IP66 กันน้ำ กันฝุ่น แสงขาว 6500K ประหยัดไฟ ทนทาน','/m-group-products/13.png',75,4.7,165,1,NULL,NULL,'2026-04-24 14:18:03.212','2026-04-24 14:18:03.212');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Receipt`
--

DROP TABLE IF EXISTS `Receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Receipt` (
  `id` varchar(191) NOT NULL,
  `number` varchar(191) NOT NULL,
  `clientId` varchar(191) NOT NULL,
  `customerId` varchar(191) DEFAULT NULL,
  `customerName` varchar(191) NOT NULL DEFAULT '',
  `customerAddress` text DEFAULT NULL,
  `customerPhone` varchar(191) DEFAULT NULL,
  `customerEmail` varchar(191) DEFAULT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'THB',
  `issuedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `subtotal` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Receipt_number_key` (`number`),
  KEY `Receipt_clientId_idx` (`clientId`),
  KEY `Receipt_customerId_idx` (`customerId`),
  KEY `Receipt_issuedAt_idx` (`issuedAt`),
  CONSTRAINT `Receipt_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Receipt_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receipt`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Receipt` WRITE;
/*!40000 ALTER TABLE `Receipt` DISABLE KEYS */;
INSERT INTO `Receipt` VALUES
('cmo79kw8y0001qh3axzagqao9','RCP260420-00001','cmo6x1sht0008qhvqygcgasiq',NULL,'Mr.Thanate  Phongthai',NULL,NULL,NULL,'THB','2026-04-18 15:00:00.000',6600.00,6400.00,NULL,'2026-04-20 14:02:20.866','2026-04-20 14:31:00.246');
/*!40000 ALTER TABLE `Receipt` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ReceiptItem`
--

DROP TABLE IF EXISTS `ReceiptItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReceiptItem` (
  `id` varchar(191) NOT NULL,
  `receiptId` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT 1.00,
  `unitPrice` decimal(10,2) NOT NULL,
  `discountPercent` decimal(5,2) NOT NULL DEFAULT 0.00,
  `discountAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `amount` decimal(10,2) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ReceiptItem_receiptId_idx` (`receiptId`),
  KEY `ReceiptItem_sortOrder_idx` (`sortOrder`),
  CONSTRAINT `ReceiptItem_receiptId_fkey` FOREIGN KEY (`receiptId`) REFERENCES `Receipt` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReceiptItem`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ReceiptItem` WRITE;
/*!40000 ALTER TABLE `ReceiptItem` DISABLE KEYS */;
INSERT INTO `ReceiptItem` VALUES
('cmo7alqxl0000qhlqksfrlv6r','cmo79kw8y0001qh3axzagqao9','วันที่เข้าพัก 18-19 เมษายน 2569   1 คืน 2 วัน',1.00,800.00,0.00,0.00,800.00,0,'2026-04-20 14:31:00.246'),
('cmo7alqxl0001qhlqx4xo613o','cmo79kw8y0001qh3axzagqao9','วันที่เข้าพัก 19-21 เมษายน 2569   2 คืน 3 วัน  ห้อง VIP',2.00,900.00,0.00,0.00,1800.00,1,'2026-04-20 14:31:00.246'),
('cmo7alqxl0002qhlqzwbvhqp1','cmo79kw8y0001qh3axzagqao9','วันที่เข้าพัก 21-26 เมษายน 2569   5 คืน 6 วัน',5.00,800.00,5.00,0.00,3800.00,2,'2026-04-20 14:31:00.246');
/*!40000 ALTER TABLE `ReceiptItem` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `highlight` varchar(191) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `Service` VALUES
('cmo6wquzl0000qhusugfmjreb','บริการดูแลระบบ',NULL,'ดูแลและบำรุงรักษาระบบ',NULL,1,'2026-04-20 08:03:04.161','2026-04-20 08:03:04.161'),
('cmo6wqv010001qhusjh92gzm0','บริการเช่าโดเมนรายปี',NULL,'จดและต่ออายุโดเมน',NULL,1,'2026-04-20 08:03:04.178','2026-04-20 08:03:04.178'),
('cmo6wqv0d0002qhusw3mzpmyc','บริการยิงแอด',NULL,'โฆษณา Facebook/Google',NULL,1,'2026-04-20 08:03:04.189','2026-04-20 08:03:04.189'),
('cmo6wqv110003qhusi1vpkl2m','บริการออกแบบหน้าเว็บ',NULL,'UI/UX Design',NULL,1,'2026-04-20 08:03:04.213','2026-04-20 08:03:04.213'),
('cmo6wqv1h0004qhusezds6zuw','บริการพัฒนาระบบ',NULL,'พัฒนาซอฟต์แวร์ตามความต้องการ',NULL,1,'2026-04-20 08:03:04.230','2026-04-20 08:03:04.230'),
('cmo6wqv1y0005qhusaxeobrwk','บริการอื่นๆ',NULL,'บริการเสริมอื่นๆ',NULL,1,'2026-04-20 08:03:04.246','2026-04-20 08:03:04.246');
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_idx` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `role` enum('SUPER_ADMIN','ADMIN','CLIENT') NOT NULL DEFAULT 'CLIENT',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `clientId` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_username_key` (`username`),
  KEY `User_email_idx` (`email`),
  KEY `User_clientId_idx` (`clientId`),
  CONSTRAINT `User_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
('cmocyymui0000jhhhv7b6v3ex','admin','admin','admin',NULL,NULL,'$2b$12$QOwlNmySRR3MzFRJ7DFcj..VtBOERfZMv9.m6Rlux2rqz0btgaWCe','SUPER_ADMIN','2026-04-24 13:51:43.127','2026-04-24 13:51:43.127',NULL),
('green-retail-user-001','Green Retail Demo','greenretail','demo@green-retail.example.com',NULL,NULL,'$2b$10$VB86P90EmP6i/IMuTtYLMu9cpFT.AYp6pIm.yyax5oJfa4WUrHAaS','CLIENT','2026-04-22 13:09:06.000','2026-04-22 13:09:06.000',NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping routines for database 'goeunserverhub'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-04-25 21:15:51
