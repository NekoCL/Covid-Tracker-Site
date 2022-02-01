-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: covid_tracker
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `covid_tracker`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `covid_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `covid_tracker`;

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `admin_username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_username` (`admin_username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admins`
--

LOCK TABLES `Admins` WRITE;
/*!40000 ALTER TABLE `Admins` DISABLE KEYS */;
INSERT INTO `Admins` VALUES (1,'Barack','Obama','edbenchn@gmail.com','9f02d45c8bf5d969efbed7f884ca2b49272116734a3b0921d6643112dffc5909','BarackObama'),(2,'asdasd','qweqwe','test123@gmail.com','2bd9f0f6292e9f7cef15b8ada1b0a44eb09643e0f9c49cf41a81192c19ce09c6','asdasd'),(3,'donald','j trump','trump@gmail.com','b41e6560a4467aa44f85d4dc8eebe1db4a65fa8eac469ae9198d022c960ea295','donald'),(5,'trump1234','asdasdfa','test123@gmail.com','7281fb99ae02abb21e82304b9313628979af1e0231faaffe5c2afaed30063c02','donaldqwe');
/*!40000 ALTER TABLE `Admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Business`
--

DROP TABLE IF EXISTS `Business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Business` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `venue_size` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `business_type` varchar(30) DEFAULT NULL,
  `business_number` int DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `business_code` varchar(30) DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `flag` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `business_code` (`business_code`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `Business_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `Owners` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Business`
--

LOCK TABLES `Business` WRITE;
/*!40000 ALTER TABLE `Business` DISABLE KEYS */;
INSERT INTO `Business` VALUES (1,'BOB FISHMONGER',1000,100,'SEAFOOD',1515151,'10 City St',5000,'AAABBBCCC',3,0),(2,'Rob\'s Pub',150,20,'Pub',1616161,'30 Hotdog Rd',4950,'AAB',4,1),(3,'BOB\'S HOME MADE PORRIDGE',600,60,'FOOD',99999,'10 mary St',5000,'ZZZZZZ',3,0),(5,'BOB SPECIAL MAMAK',400,40,'food',999999,'20 Drive St',5000,'XXVVBBC',3,0),(7,'BOB LOLIPOP',300,30,'FOOD',433399999,'10 Street',5000,'XNNNNJSJSK',3,1),(8,'BOB ARCADE',200,20,'Gaming',123123123,'10 Street Miles',5000,'XXJSJSJSJS',3,0),(9,'BOB THE BUILDER',1000,100,'CONSTRUCTION',123123132,'10 King St',5000,'XXJJKKS',3,1),(10,'ADAM MUSIC',300,30,'Music',1231234,'80 Saint St',5000,'LMPJSFFG',5,1),(11,'BOB MART',1000,100,'Shopping',123123,'310 King St',5000,'LSDFASFASFASF',3,1);
/*!40000 ALTER TABLE `Business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hotspot`
--

DROP TABLE IF EXISTS `Hotspot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hotspot` (
  `hotspot_id` int NOT NULL AUTO_INCREMENT,
  `zip` int DEFAULT NULL,
  `yes_col` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`hotspot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hotspot`
--

LOCK TABLES `Hotspot` WRITE;
/*!40000 ALTER TABLE `Hotspot` DISABLE KEYS */;
INSERT INTO `Hotspot` VALUES (1,5000,'Yes'),(2,5001,'Yes'),(3,5002,'Yes'),(12,5006,'Yes'),(16,5010,'Yes');
/*!40000 ALTER TABLE `Hotspot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Owners`
--

DROP TABLE IF EXISTS `Owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Owners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `business_id` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `contact_number` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `Owners_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Owners`
--

LOCK TABLES `Owners` WRITE;
/*!40000 ALTER TABLE `Owners` DISABLE KEYS */;
INSERT INTO `Owners` VALUES (1,'eedd','ededed','weqwwef',NULL,NULL,'edbenchn@gmail.com','business1','d8b19d95c27c5ce3ef483d30e83f29ff4d43a36aa7c5cac014412ea87bddddcf',NULL,123123213),(2,'qweqwe','asdfasd','asdasd',3124,NULL,'testing123@gmail.com','business2','ed2456914e48c1e17b7bd922177291ef8b7f553edf1b1f66b6fc1a076524b22f','1997-06-09',123123123),(3,'Bob','Noss','111 Tree St',5005,NULL,'bobo@test.corn','Bobo','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','1950-05-12',123123),(4,'Rob','Boss','51 Mustard Ave',5111,NULL,'robo@test.corn','Robo','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','1974-08-30',555432),(5,'adam','lambert','60 St',5000,NULL,'adam1@gmail.com','adam','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','2021-05-30',1231312);
/*!40000 ALTER TABLE `Owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restriction`
--

DROP TABLE IF EXISTS `Restriction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restriction` (
  `restrict_id` int NOT NULL AUTO_INCREMENT,
  `restrictions` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`restrict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restriction`
--

LOCK TABLES `Restriction` WRITE;
/*!40000 ALTER TABLE `Restriction` DISABLE KEYS */;
INSERT INTO `Restriction` VALUES (1,'Yes');
/*!40000 ALTER TABLE `Restriction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCheckIn`
--

DROP TABLE IF EXISTS `UserCheckIn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCheckIn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int DEFAULT NULL,
  `date_time` varchar(30) DEFAULT NULL,
  `business_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `business_id` (`business_id`),
  CONSTRAINT `UserCheckIn_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `UserCheckIn_ibfk_2` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCheckIn`
--

LOCK TABLES `UserCheckIn` WRITE;
/*!40000 ALTER TABLE `UserCheckIn` DISABLE KEYS */;
INSERT INTO `UserCheckIn` VALUES (14,1,'2021-06-10 16:00:30',1),(15,1,'2021-06-10 16:00:56',1),(22,1,'2021-06-11 05:05:32',1),(23,1,'2021-06-11 05:13:58',1),(24,1,'2021-06-11 05:15:51',1),(25,1,'2021-06-12 10:57:06',2),(26,7,'2021-06-12 16:14:27',2),(27,7,'2021-06-12 16:14:29',2),(28,7,'2021-06-12 16:14:34',1),(29,7,'2021-06-12 16:20:32',1),(30,7,'2021-06-12 16:20:57',1),(31,7,'2021-06-12 16:21:08',1),(32,7,'2021-06-12 16:21:14',2),(33,7,'2021-06-12 16:24:12',2),(34,7,'2021-06-12 16:24:21',1),(35,7,'2021-06-12 16:26:59',1),(36,3,'2021-06-14 09:26:40',2),(37,3,'2021-06-14 09:48:11',2),(38,3,'2021-06-14 11:05:44',1),(39,1,'2021-06-14 11:38:56',2);
/*!40000 ALTER TABLE `UserCheckIn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `contact_number` int DEFAULT NULL,
  `email_sub` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Pie','Face','100 Food St',5000,'edbenchn@gmail.com','Cake','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','01-06-2021',87654321,'Yes'),(3,'edmond','koh','Adelaide',1111,'test123@email.com','edkoh','428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324','2021-06-02',491133028,'No'),(4,'ben','x','1 two street',5011,'a1839458@student.adelaide.edu.au','ben','5a376993386af8e4af5cdc54bd764da8897bf366f4dc133c82811cb68b4a6a2b','2000-06-01',412345678,'No'),(7,'Salmon','Tuna','152 Food St',4999,'sashimi@test.corn','Sushi','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','2021-06-03',77777777,'Yes'),(21,'123','123','123',123,'123','123123','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','2021-06-29',123,'No'),(22,'321','321','321',321,'321','321','8d23cf6c86e834a7aa6eded54c26ce2bb2e74903538c61bdd5d2197997ab2f72','2021-06-01',321,'No');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-14 12:27:39
