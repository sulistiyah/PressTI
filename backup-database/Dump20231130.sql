-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db_press_ti
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `noTelepon` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Admin PressTI','admin@gmail.com','081292323052','$2a$08$u.Ass0Xtc9fB./CAmcOGgO5HOfp3HPOz/2aGDCvKJLWLIpxBJenYO','2023-11-28 18:07:07','2023-11-28 18:07:07');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `face`
--

DROP TABLE IF EXISTS `face`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `face` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `descriptions` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userMahasiswaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`),
  KEY `userMahasiswaId` (`userMahasiswaId`),
  CONSTRAINT `face_ibfk_1` FOREIGN KEY (`userMahasiswaId`) REFERENCES `user_mahasiswa` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `face`
--

LOCK TABLES `face` WRITE;
/*!40000 ALTER TABLE `face` DISABLE KEYS */;
/*!40000 ALTER TABLE `face` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `data` longblob,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelas`
--

DROP TABLE IF EXISTS `kelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kodeKelas` varchar(30) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `programStudiId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `programStudiId` (`programStudiId`),
  CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`programStudiId`) REFERENCES `program_studi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelas`
--

LOCK TABLES `kelas` WRITE;
/*!40000 ALTER TABLE `kelas` DISABLE KEYS */;
INSERT INTO `kelas` VALUES (1,'TK-IA','Teknik Komputer I A',1),(2,'TK-IB','Teknik Komputer I B',1),(3,'TK-IIA','Teknik Komputer II A',1),(4,'TK-IIB','Teknik Komputer II B',1),(5,'TK-IIIA','Teknik Komputer III A',1),(6,'TK-IIIB','Teknik Komputer III B',1),(7,'MI-IA','Manajemen Informatika I A',2),(8,'MI-IB','Manajemen Informatika I B',2),(9,'MI-IC','Manajemen Informatika I C',2),(10,'MI-IIA','Manajemen Informatika II A',2),(11,'MI-IIB','Manajemen Informatika II B',2),(12,'MI-IIC','Manajemen Informatika II C',2),(13,'MI-IIIA','Manajemen Informatika III A',2),(14,'MI-IIIB','Manajemen Informatika III B',2),(15,'MI-IIIC','Manajemen Informatika III C',2),(16,'TRPL-IA','Teknologi Rekayasa Perangkat Lunak I A',3),(17,'TRPL-IB','Teknologi Rekayasa Perangkat Lunak I B',3),(18,'TRPL-IC','Teknologi Rekayasa Perangkat Lunak I C',3),(19,'TRPL-ID','Teknologi Rekayasa Perangkat Lunak I D',3),(20,'TRPL-IIA','Teknologi Rekayasa Perangkat Lunak II A',3),(21,'TRPL-IIB','Teknologi Rekayasa Perangkat Lunak II B',3),(22,'TRPL-IIC','Teknologi Rekayasa Perangkat Lunak II C',3),(23,'TRPL-IID','Teknologi Rekayasa Perangkat Lunak II D',3),(24,'TRPL-IIIA','Teknologi Rekayasa Perangkat Lunak III A',3),(25,'TRPL-IIIB','Teknologi Rekayasa Perangkat Lunak III B',3),(26,'TRPL-IIIC','Teknologi Rekayasa Perangkat Lunak III C',3),(27,'TRPL-IVA','Teknologi Rekayasa Perangkat Lunak IV A',3),(28,'TRPL-IVB','Teknologi Rekayasa Perangkat Lunak IV B',3),(29,'TRPL-IVC','Teknologi Rekayasa Perangkat Lunak IV C',3),(30,NULL,NULL,NULL);
/*!40000 ALTER TABLE `kelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mata_kuliah`
--

DROP TABLE IF EXISTS `mata_kuliah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mata_kuliah` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kodeMatkul` varchar(30) DEFAULT NULL,
  `mataKuliah` varchar(50) DEFAULT NULL,
  `programStudiId` int DEFAULT NULL,
  `kelasId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `programStudiId` (`programStudiId`),
  KEY `kelasId` (`kelasId`),
  CONSTRAINT `mata_kuliah_ibfk_1` FOREIGN KEY (`programStudiId`) REFERENCES `program_studi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mata_kuliah_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mata_kuliah`
--

LOCK TABLES `mata_kuliah` WRITE;
/*!40000 ALTER TABLE `mata_kuliah` DISABLE KEYS */;
/*!40000 ALTER TABLE `mata_kuliah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_studi`
--

DROP TABLE IF EXISTS `program_studi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program_studi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kodeProdi` varchar(30) DEFAULT NULL,
  `programStudi` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_studi`
--

LOCK TABLES `program_studi` WRITE;
/*!40000 ALTER TABLE `program_studi` DISABLE KEYS */;
INSERT INTO `program_studi` VALUES (1,'PS1','Teknik Komputer'),(2,'PS2','Manajemen Informatika'),(3,'PS3','Teknologi Rekayasa Perangkat Lunak');
/*!40000 ALTER TABLE `program_studi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `set_presensi`
--

DROP TABLE IF EXISTS `set_presensi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `set_presensi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanggal` datetime DEFAULT NULL,
  `jamMulai` time DEFAULT NULL,
  `jamBerakhir` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `programStudiId` int DEFAULT NULL,
  `kelasId` int DEFAULT NULL,
  `mataKuliahId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `programStudiId` (`programStudiId`),
  KEY `kelasId` (`kelasId`),
  KEY `mataKuliahId` (`mataKuliahId`),
  CONSTRAINT `set_presensi_ibfk_1` FOREIGN KEY (`programStudiId`) REFERENCES `program_studi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `set_presensi_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `set_presensi_ibfk_3` FOREIGN KEY (`mataKuliahId`) REFERENCES `mata_kuliah` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_presensi`
--

LOCK TABLES `set_presensi` WRITE;
/*!40000 ALTER TABLE `set_presensi` DISABLE KEYS */;
/*!40000 ALTER TABLE `set_presensi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_dosen`
--

DROP TABLE IF EXISTS `user_dosen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_dosen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nip` varchar(30) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `noTelepon` varchar(30) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rePassword` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_dosen`
--

LOCK TABLES `user_dosen` WRITE;
/*!40000 ALTER TABLE `user_dosen` DISABLE KEYS */;
INSERT INTO `user_dosen` VALUES (1,'1234567890','Sulis Tiyah','sulis@gmail.com','081292323052',NULL,'$2a$08$UKKMOz0rJWgsP33B0fOlMeM4KMV.xf9OfTnlYXgjekxQPsyAQ4eci','$2a$08$UKKMOz0rJWgsP33B0fOlMeM4KMV.xf9OfTnlYXgjekxQPsyAQ4eci',NULL,'2023-11-08 14:55:16','2023-11-10 13:52:30'),(2,'123456','Sulis Tiyah','sulis@gmail.com','081292323052',NULL,'$2a$08$7olRx8dvY7oFZMbJu8BaK.ciaB/opSNxFfhXLy4xMBoGZoMZUpW8a','$2a$08$j914tfjVbZBCS48q9aVg4u9QCEFYhdgwv6x0VjCUMHOzQcyljj4je',NULL,'2023-11-10 12:51:17','2023-11-10 12:51:17'),(3,'1234567','Sulis Tiyah','sulis@gmail.com','081292323052',NULL,'$2a$08$koyTW0pwvLBghMwNYnXem.nb24GOXO8rFH83xCjIQCIxtVodeurAW','$2a$08$3g8.M5yg/NvTp0oDPmoyi.38I7VXyqzNAJ6HxE2V.C0h96EiK5Giy',NULL,'2023-11-10 13:07:26','2023-11-10 13:07:26'),(6,'12345678','Sulis Tiyah','sulis@gmail.com','081292323052',NULL,'$2a$08$bE4sxDeMD1BARnU7CQ16BuwPelVZWHTROUvkvL9yN.2uwAm2.2of.','$2a$08$.byVdGqKtVz0N8ULFq//xuOzw22nVYFFOPMzZqZjlNTm8gJizL50G',NULL,'2023-11-10 13:18:12','2023-11-10 13:18:12');
/*!40000 ALTER TABLE `user_dosen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_mahasiswa`
--

DROP TABLE IF EXISTS `user_mahasiswa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_mahasiswa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nim` varchar(30) DEFAULT NULL,
  `nama` varchar(50) NOT NULL,
  `noTelepon` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rePassword` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `programStudiId` int DEFAULT NULL,
  `kelasId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `programStudiId` (`programStudiId`),
  KEY `kelasId` (`kelasId`),
  CONSTRAINT `user_mahasiswa_ibfk_1` FOREIGN KEY (`programStudiId`) REFERENCES `program_studi` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_mahasiswa_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_mahasiswa`
--

LOCK TABLES `user_mahasiswa` WRITE;
/*!40000 ALTER TABLE `user_mahasiswa` DISABLE KEYS */;
INSERT INTO `user_mahasiswa` VALUES (4,'2001081002','Sulis Tiyah','081292323052','$2a$08$XRVGwbIcyO5VJ7V4WBnJWujj3zSF7s7cDv8XHjwPoOXAELAnzxkYK','$2a$08$XRVGwbIcyO5VJ7V4WBnJWujj3zSF7s7cDv8XHjwPoOXAELAnzxkYK',NULL,NULL,'2023-11-07 09:02:46','2023-11-11 09:26:19',1,6),(5,'2001082033','Aldo Spama Putra Suir','081292323052','$2a$08$i7ckQemZ3APVOCmFEnA64u5CMxFVz6r8gSmDI5nEQG5eRR3fITTBa','$2a$08$48l3jstES9Tpzvqd001/f.h/IgqgacBAgZukKw1k7dBvCo08mPzDu',NULL,NULL,'2023-11-07 13:36:32','2023-11-07 13:36:32',1,6),(6,'2001081001','Bintang Ramadhana Putra','081292323052','$2a$08$p8ifL54/t7ayZwmGOOPUxek9BnyKl0eNG/dSloUrZENKzV6qCGzCG','$2a$08$EDIDRLyueotXo8zFpq2io.9bYO5OoGt31zvikxAazSn9s6SaG7I0y',NULL,NULL,'2023-11-10 10:32:30','2023-11-10 10:32:30',1,6),(7,'2001081003','Ali Zikri Fadli','081292323052','$2a$08$Tl7dh5EOEgGy6.8My2Q/KeqaP/C3oc1ThKLiKiZe5wbRuY/pNxo2e','$2a$08$YjHbmZoRz2VAQwM.sunuEeTcDmG6Iv/GteU8XMniSemAeXAYHlBs.',NULL,NULL,'2023-11-10 11:54:46','2023-11-10 11:54:46',1,6),(8,'2001081008','Wezi Adri Wilmi','081292323052','$2a$08$4QmooAiNhUrB07Ss61sKquxYSqUgREFZI3JmFAOK.MPJsSVStrDkO','$2a$08$b0kjFcqq4qjfuU0zefP2kOp39kRtpw3CUrLvO5mW6CNcntlJZOfrS',NULL,NULL,'2023-11-11 08:35:54','2023-11-11 08:35:54',1,6),(9,'2001081006','Dira','081292323052','$2a$08$MpvgRPCv7YvUahqNDIAeru4uuG5FcNzEt64IEG9sm4Gj0FmRKgNPm','$2a$08$R6D7k/itiHwFFxoLX1X7DOLtVXbeUBTukZOKk7CGdTRfHHkmLjv0m',NULL,NULL,'2023-11-18 14:51:18','2023-11-18 14:51:18',1,6);
/*!40000 ALTER TABLE `user_mahasiswa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-30 17:09:05
