-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vibgyorpaints
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,_binary '\0','red.jpg',50,'Vibgyor Aspira Red'),(3,_binary '\0','blue.jpg',50,'Vibgyor Aspira Blue'),(4,_binary '\0','green.jpg',80,'Vibgyor Aspira Green'),(5,_binary '\0','cyan.png',60,'Vibgyor Aspira Cyan'),(6,_binary '\0','orange.jpg',60,'Vibgyor Aspira Orange'),(7,_binary '\0','purple.png',60,'Vibgyor Aspira Purple'),(8,_binary '\0','yellow.jpeg',60,'Vibgyor Aspira Yellow'),(9,_binary '\0','blue.jpg',60,'Woodtech Emporio PU Blue'),(10,_binary '\0','red.jpg',105,'Woodtech Emporio PU Red'),(11,_binary '\0','green.jpg',90,'Woodtech Emporio PU Green'),(12,_binary '\0','cyan.png',70,'Woodtech Emporio PU Cyan'),(13,_binary '\0','orange.jpg',125,'WWoodtech Emporio PU Orange'),(14,_binary '\0','purple.png',125,'Woodtech Emporio PU Purple'),(15,_binary '\0','yellow.jpeg',110,'Woodtech Emporio PU Yellow'),(16,_binary '\0','yellow.jpeg',95,'Aquadur Exterior Yellow'),(17,_binary '\0','purple.png',75,'Aquadur Exterior Purple');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 23:26:14
