-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: finalproject
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `competencies`
--

DROP TABLE IF EXISTS `competencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competencies`
--

LOCK TABLES `competencies` WRITE;
/*!40000 ALTER TABLE `competencies` DISABLE KEYS */;
INSERT INTO `competencies` VALUES (1,'Comunication skills','comp1.jpg','Refers to the ability to effectively convey information, ideas, thoughts, and feelings to others in a clear and concise manner.'),(2,'A strong commitment to goals','comp2.jpg','Refers to the dedication and determination to achieve set objectives or targets. It involves demonstrating a steadfast focus, persistence, and resilience in pursuing and accomplishing desired outcomes.'),(3,'Emotional inteligence','comp3.jpg','Refers to the ability to recognize, understand, manage, and effectively express emotions, both in oneself and in others. It involves being aware of one\'s own emotions and their impact, as well as being attuned to the emotions of others and being able to empathize with them.'),(4,'Accountability and responsability','comp4.jpg','Accountability and responsibility is a combined concept in the workplace that emphasizes taking ownership and being answerable for one\'s actions, tasks, and outcomes.'),(5,'A learning mentality','comp5.jpg','Refers to the mindset and attitude of continuously seeking opportunities for personal and professional growth through acquiring new knowledge, developing new skills, and embracing challenges.');
/*!40000 ALTER TABLE `competencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `serviceType` tinyint DEFAULT NULL,
  `id_c` int DEFAULT NULL,
  `id_v` int DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `work_type` tinyint DEFAULT NULL,
  `limit` tinyint DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_b_idx` (`id_c`),
  KEY `id_v_idx` (`id_v`),
  CONSTRAINT `id_c` FOREIGN KEY (`id_c`) REFERENCES `competencies` (`id`),
  CONSTRAINT `id_v` FOREIGN KEY (`id_v`) REFERENCES `volunteers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Taller de pintura','Taller de pintura para trabajar la comunicación. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-05-10','16:00:00',2,3,1,'dirección 1',1,22,'defaultPainting.jpg'),(2,'Taller de escultura','Taller de escultura para trabajar la asertividad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-06-13','17:00:00',2,1,2,'dirección 2',2,33,'defaultSculpture.jpg'),(3,'Taller de kungfu','Taller de kungfu para trabajar la fiabilidad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-05-03','19:00:00',2,4,3,'dirección 3',3,4,'defaultKungfu.jpg'),(4,'Grupo de terapia','Terapia grupal de tarde. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-04-22','16:00:00',1,2,4,'dirección 4',0,7,'defaultTherapy.jpg'),(5,'Taller de cerámica','Taller de cerámica para trabajar la adaptabilidad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-07-17','20:00:00',2,5,5,'dirección 5',4,23,'defaultCeramic.jpeg'),(6,'Taller de pintura','Taller de pintura para trabajar la comunicación. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-05-20','10:00:00',2,3,1,'direccion 6',1,8,'defaultPainting.jpg'),(7,'Taller de escultura','Taller de escultura para trabajar la asertividad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-08-13','12:00:00',2,1,2,'direccion 7',2,9,'defaultSculpture.jpg'),(8,'Taller de kungfu','Taller de kungfu para trabajar la fiabilidad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-05-04','10:00:00',2,4,3,'direccion 8',3,12,'defaultKungfu.jpg'),(9,'Grupo de terapia','Terapia grupal de tarde. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-05-22','16:00:00',1,2,4,'direccion 9',0,14,'defaultTherapy.jpg'),(10,'Taller de cerámica','Taller de cerámica para trabajar la adaptabilidad. He aqui un monton mas de informacion inexistente que solo hace que ocupar un espacio necesario pero a la vez incoherente, pues eso, nada.','2023-07-17','10:00:00',2,5,5,'direccion 10',4,14,'defaultCeramic.jpeg'),(13,'Wushu traditional','A workshop about chinese traditional martial arts and how those can help you to be calm and happy.','2023-05-31','17:00:00',2,5,11,'08033 Barcelona',3,15,'defaultKungfu.jpg'),(19,'taller de espiritualidad','Trabajaremos la meditación desde el punto de vista taoista para ayudar con el trabajo de la ansiedad y el estrés, de cara a mejorar en términos de adaptabildad en el trabajo y la vida en general.','2023-05-16','14:51:00',2,2,18,'centro taoista de Barcelona',2,15,'1684252086026-hfn-blog-meditation-rememorari.jpg'),(20,'demo','demo','2023-05-16','13:04:00',2,1,19,'demo',1,1,'defaultPainting.jpg'),(21,'el workshop','esto es un workshop','2023-05-18','11:41:00',2,2,20,'aqui',4,12,'defaultCeramic.jpeg'),(22,'Céramica para la meditación','Este es un workshop en el que vamos a trabajar con cerámica para buscar formas de relajarnos a través de la meditación.','2023-05-18','15:30:00',2,5,20,'Barcelona 08022',4,10,'defaultCeramic.jpeg'),(23,'Cerámica artística','En este taller se profundiza acerca de la bases de la cerámica como arte. Trabajaremos en las bases de como se trata el barro y como convertir el material en una pieza artística. Para cuando acabemos el taller habremos hecho como mínimo una pieza de cerámica.','2023-06-09','18:00:00',2,2,21,'Sant Andreu, Barcelona 08030',4,10,'defaultCeramic.jpeg'),(24,'Cerámica para el dia a dia','En este taller trabajaremos la cerámica como hacían las personas hace años, para el uso diario. Crearemos múltiples piezas como vasos o jarrones para el uso diario y veremos las dificultades que supone hacer objetos cerámicos para que duren mucho tiempo. Os espero!','2023-05-19','19:50:00',2,2,21,'Sant Andreu, Barcelona 08030',4,10,'defaultCeramic.jpeg'),(25,'Las bases de la cerámica','En este taller de introducción nos introduciremos en las bases del arte cerámico. Veremos cuales son las distintas fases para generar piezas de cerámica, tanto en un sentido utilitario como artístico. Y sobre todo las múltiples dificultades que existen en el proceso de creación de cada pieza. Es un taller al que venir con muchas ganas de aprender, sea desde cero o con conocimientos previos. Os veo pronto!','2023-05-22','19:55:00',2,5,21,'Sant Andreu, Barcelona 08030',4,15,'defaultCeramic.jpeg'),(26,'el de prueba','este es el de prueba para hacer la presentación de prueba 2.','2023-05-19','20:55:00',2,5,21,'aqui',4,12,'defaultCeramic.jpeg');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `password` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `pronouns` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (1,'Eva','eva11@gmail.com','hola soy Eva','evaeva','evatutor.png','666116611',1),(2,'Lydia','lydia22@gmail.com','hola soy Lydia','lydialydia','lydiatutor.png','666226622',2),(3,'Rosa','rosa33@gmail.com','hola soy Rosa','rosarosa','rosatutor.png','666336633',1),(4,'Cristina','cristina44@gmail.com','hola soy Cristina','cristinacristina','cristinatutor.png','666446644',1),(5,'Maria','maria55@gmail.com','hola soy Maria','mariamaria','mariatutor.png','666556655',1),(6,'marina','marina@marina',NULL,'$2b$10$DGmHQ3QT/Y7F9jTfXd8zDOp3zAgk6vbo/dM.Shodv9rOEahuBmqGy','default.png','666778899',1),(7,'Alex','alex@woop.es','Hola! soy Alex, si has entrado en mi perfil probablemente es porque soy tu tutor, si tienes cualquier consulta no dudes en enviarme un email o escribirme a través del futuro chat que tendrá la web.','$2b$10$V6aiWV1nzyIpWXH4sMb3o.uiI6jys/aL.W7JCb6YRh/AITIn.jxua','1684514269933-alextutor.jpg','666775588',3);
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `id_t` int DEFAULT NULL,
  `pronouns` tinyint DEFAULT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `record` varchar(150) DEFAULT NULL,
  `letter` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_t_idx` (`id_t`),
  CONSTRAINT `id_t` FOREIGN KEY (`id_t`) REFERENCES `tutor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Clara','clara333@gmail.com','claraclara','clarauser.png',1,1,'666663333','record3.pdf',NULL),(4,'Elsa','elsa444@gmail.com','elsaelsa','elsauser.png',1,1,'666664444','record4.pdf',NULL),(5,'Silvia','silvia555@gmail.com','silviasilvia','silviauser.png',1,0,'666665555','record5.pdf',NULL),(6,'Marina','marinacarrerasala@gmail.com','$2b$10$h2KratqQzml.utYHuZhwHeoh6Rk5OBcxmhs3h1p6BwwwcECKfO8Te','default.png',1,1,'666554433','marinacr.pdf',NULL),(7,'client','c@c','$2b$10$2N1NyfNJLRZpkscp9WQp.e.k6Xy/QQeQg3/RRz0p79r1Co3dEClbm','default.png',6,3,'666554433','clientcriminalrecord.pdf','1684415424890-AdriÃ _Manday_CV_EN.pdf'),(8,'client','client@client','$2b$10$HBCAVatAvQDFjz.gFSv5jO4cHEBF2E9G3mua5vTnt3hX8vc2JHBRG','default.png',7,3,'666112233','clientcriminalrecord.pdf','1683911041040-AdriÃ _Manday_CV_EN.pdf'),(16,'democ','democ@democ.com','$2b$10$HnD1pR5Swdt4vp951IFoKOzlfQguPZioUikmzIetOe.hguMgU8SQ.','default.png',1,1,'','yes',NULL),(17,'Olga','olga@gmail.com','$2b$10$ozkOqmJO13HSQQlHMBQnZ.IKopu/WtQ4GP.6e5bk/.pi6wzmS/uWG','default.png',7,1,'665543234','yes',NULL),(18,'Andrea','andrea@gmail.com','$2b$10$KIEycdzCSvuHeqReIjhLbu3k71Jmt/.dQeVMRt/glCEF2RQKAX7NS','default.png',7,1,'643345634','yes',NULL),(19,'Sonia','sonia@gmail.com','$2b$10$pWAfN2ALT.wW6UcUdahJDerJ6ETyWLrjfIlPjrH3VA5RCcOB/wzfO','default.png',7,1,'643545454','yes',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_services`
--

DROP TABLE IF EXISTS `users_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_u` int DEFAULT NULL,
  `id_s` int DEFAULT NULL,
  `verification` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_u_idx` (`id_u`),
  KEY `id_s_idx` (`id_s`),
  CONSTRAINT `id_s` FOREIGN KEY (`id_s`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_u` FOREIGN KEY (`id_u`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_services`
--

LOCK TABLES `users_services` WRITE;
/*!40000 ALTER TABLE `users_services` DISABLE KEYS */;
INSERT INTO `users_services` VALUES (3,3,2,0),(4,4,2,0),(5,5,3,0),(31,8,3,0),(32,7,1,0),(33,7,2,0),(36,8,5,0),(39,8,19,1),(40,16,20,1),(41,17,9,0),(42,17,22,1),(43,18,22,0),(44,19,22,0),(46,17,26,0),(47,17,25,0),(48,18,26,0),(49,18,25,0),(50,19,26,0),(51,19,25,0);
/*!40000 ALTER TABLE `users_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS `volunteers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `pronouns` tinyint DEFAULT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteers`
--

LOCK TABLES `volunteers` WRITE;
/*!40000 ALTER TABLE `volunteers` DISABLE KEYS */;
INSERT INTO `volunteers` VALUES (1,'Berta','berta1@gmail.com','bertaberta','berta.png',1,1,'666111111',NULL),(2,'Ada','ada2@gmail.com','adaada','ada.png',1,1,'666222222',NULL),(3,'Marina','marina3@gmail.com','marinamarina','marina.png',1,2,'666333333',NULL),(4,'Laura','laura4@gmail.com','lauralaura','laura.png',0,1,'666444444',NULL),(5,'Sara','sara5@gmail.com','sarasara','sara.png',1,0,'666555555',NULL),(8,'marina','marina@marina','$2b$10$pRhvJ4.OFug./jOKcpCAd.j/AVE/o1PypnSaHyKvR3vFasH/0k39C','default.png',1,1,'666554433',NULL),(10,'user1','user1@u','$2b$10$H1kv/D.MGz2d87iS0xRmoOBnzYj.st0O7A.0OB5rywoHmnpf2xXMW','1683043112006-oscar.jpg',1,3,'666778899','user 1 description'),(11,'artist','artist@artist','$2b$10$/pkefN214kACIWesnyEieeQ3Dk3kiovzFHvY/IXKfT8VXGjFdAcKm','1683900531678-oscar.jpg',1,3,'666558833','My name is Oscar, bfasjh sdj sadj akjsd asdk sjdb adk'),(17,'artista','artista@artista','$2b$10$JcTnmzhlD.QR2iQmK.TDmOJy3oJSnV6cNg3Oi25cA.Ggbrtq0EaDy','default.png',1,3,'',NULL),(18,'artista2','artista2@artista2.com','$2b$10$uXbV3TNpFjkYDEmDvsQf6.CAA0vAbKlqgSVdDd4hfAXlfUk2FiOG2','1684251692652-dcxd9dj-dc03ffb7-1e81-4095-aef3-db8778fd61f2.png',1,3,'','Soy el artista 2 :D'),(19,'demoa','demoa@demoa.com','$2b$10$RPcgeoDWSg6RQWTtwZiskuTY04b1Y7kxI378KBbeR023NEBqb8NcK','default.png',1,1,'',NULL),(20,'artista','artista@gmail.com','$2b$10$LlpYF/r3qykm7wUbyKd6/OZ0YmT6Qfc5RNk1tWY8zftiM3V04clJ.','1684414217500-pepe.jpg',1,3,'654234235','Soy un artista :D'),(21,'Alba','alba@woop.es','$2b$10$QlCfFvv36jWT8DVgX2FCY.N5VJ8wi7Ye7Oy7cDtWTjVGY8R6250vC','1684514371407-albaartista.jpg',1,1,'674564645','Hola soy Alba! hace años que me dedica al bello arte de la cerámica. Creo que es una muy buena herramienta para aprender sobre la paciencia, a parte de ser muy relajante. Os veo en mis workshops :D');
/*!40000 ALTER TABLE `volunteers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 19:11:52
