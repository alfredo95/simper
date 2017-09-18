-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: basesimv1
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `nombreAdmin` varchar(20) DEFAULT NULL,
  `apPat` varchar(20) DEFAULT NULL,
  `apMat` varchar(20) DEFAULT NULL,
  `contra` varchar(20) NOT NULL,
  `user` varchar(20) NOT NULL,
  `imgAdmin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Carlos','Melo','Garcia','123','CM',NULL);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administradorprestamo`
--

DROP TABLE IF EXISTS `administradorprestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradorprestamo` (
  `Administrador_idAdministrador` int(11) NOT NULL,
  `Prestamos_idPrestamos` int(11) NOT NULL,
  PRIMARY KEY (`Administrador_idAdministrador`,`Prestamos_idPrestamos`),
  KEY `fk_Administrador_has_Prestamos_Prestamos1_idx` (`Prestamos_idPrestamos`),
  KEY `fk_Administrador_has_Prestamos_Administrador1_idx` (`Administrador_idAdministrador`),
  CONSTRAINT `fk_Administrador_has_Prestamos_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Administrador_has_Prestamos_Prestamos1` FOREIGN KEY (`Prestamos_idPrestamos`) REFERENCES `prestamo` (`idPrestamos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradorprestamo`
--

LOCK TABLES `administradorprestamo` WRITE;
/*!40000 ALTER TABLE `administradorprestamo` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradorprestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `balance`
--

DROP TABLE IF EXISTS `balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balance` (
  `idBalance` int(11) NOT NULL AUTO_INCREMENT,
  `numeroPeriodo` int(5) NOT NULL,
  `IVAPorEnterar` double DEFAULT NULL,
  `imptosPorPagar` double DEFAULT NULL,
  `proveedores` double DEFAULT NULL,
  `PTUPorPagar` double DEFAULT NULL,
  `prestamosMenosAnio` double DEFAULT NULL,
  `prestamosMasAnio` double DEFAULT NULL,
  `cajaBancos` double DEFAULT NULL,
  `cuentasPorCobrar` double DEFAULT NULL,
  `IVAAcreditable` double DEFAULT NULL,
  `almacenArtTerm` double DEFAULT NULL,
  `almacenMateriales` double DEFAULT NULL,
  `terreno` double DEFAULT NULL,
  `edifInsta` double DEFAULT NULL,
  `maqEquipo` double DEFAULT NULL,
  `mueblesEnseres` double DEFAULT NULL,
  `pagosAnticipado` double DEFAULT NULL,
  `gastosAmortizacion` double DEFAULT NULL,
  `capitalSocial` double DEFAULT NULL,
  `reservaLegal` double DEFAULT NULL,
  `utilidadAcum` double DEFAULT NULL,
  `depEdif` double DEFAULT NULL,
  `depMueblesEnseres` double DEFAULT NULL,
  `eqTrans` double DEFAULT NULL,
  `Proyectos_idProyecto` int(11) NOT NULL,
  `depTerreno` double DEFAULT NULL,
  `depMaqEquipo` double DEFAULT NULL,
  `depEqTrans` double DEFAULT NULL,
  PRIMARY KEY (`idBalance`,`Proyectos_idProyecto`),
  KEY `fk_Balance_Proyectos1_idx` (`Proyectos_idProyecto`),
  CONSTRAINT `fk_Balance_Proyectos1` FOREIGN KEY (`Proyectos_idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balance`
--

LOCK TABLES `balance` WRITE;
/*!40000 ALTER TABLE `balance` DISABLE KEYS */;
INSERT INTO `balance` VALUES (149,1,-50037.5,0,0,0,0,0,-1553037.5,0,0,0,0,1000000,2000000,7000000,500000,0,0,10000000,0,-703000,0,0,1000000,49,0,700000,0),(150,2,-50075,0,0,0,0,0,-1556075,0,0,0,0,1000000,2000000,7000000,500000,0,0,10000000,0,-1406000,0,0,1000000,49,0,1400000,0),(151,3,-50075,0,0,0,0,0,-1556075,0,0,0,0,1000000,2000000,7000000,500000,0,0,10000000,0,-2106000,0,0,1000000,49,0,2100000,0),(168,1,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,-300000,0,0,1000000,62,0,300000,0),(169,0,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,0,0,0,1000000,62,0,0,0),(170,2,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,-600000,0,0,1000000,62,0,600000,0),(243,1,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,-300000,0,0,1000000,92,0,300000,0),(244,0,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,0,0,0,1000000,92,0,0,0),(245,2,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,-600000,0,0,1000000,92,0,600000,0),(246,3,0,0,0,0,0,0,2500000,0,0,0,0,1000000,2000000,3000000,500000,0,0,10000000,0,-900000,0,0,1000000,92,0,900000,0);
/*!40000 ALTER TABLE `balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demanda`
--

DROP TABLE IF EXISTS `demanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demanda` (
  `numPeriodo` int(11) NOT NULL DEFAULT '0',
  `cantidad` int(11) DEFAULT '0',
  `Zona_idZonas` int(11) NOT NULL,
  `Producto_idProducto` int(11) NOT NULL,
  PRIMARY KEY (`numPeriodo`,`Zona_idZonas`,`Producto_idProducto`),
  KEY `fk_Demanda_Zona1_idx` (`Zona_idZonas`),
  KEY `fk_Demanda_Producto1_idx` (`Producto_idProducto`),
  CONSTRAINT `fk_Demanda_Producto1` FOREIGN KEY (`Producto_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Demanda_Zona1` FOREIGN KEY (`Zona_idZonas`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demanda`
--

LOCK TABLES `demanda` WRITE;
/*!40000 ALTER TABLE `demanda` DISABLE KEYS */;
INSERT INTO `demanda` VALUES (0,0,84,4),(0,0,84,5),(0,0,87,4),(0,0,87,5),(1,400,87,4),(1,350,87,5);
/*!40000 ALTER TABLE `demanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encabezado`
--

DROP TABLE IF EXISTS `encabezado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encabezado` (
  `idEncabezado` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `alias` varchar(20) DEFAULT NULL,
  `Proyecto_idProyecto` int(11) NOT NULL,
  `Proyecto_Usuario_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idEncabezado`,`Proyecto_idProyecto`,`Proyecto_Usuario_idUsuario`),
  KEY `fk_Encabezado_Proyecto1_idx` (`Proyecto_idProyecto`,`Proyecto_Usuario_idUsuario`),
  CONSTRAINT `fk_Encabezado_Proyecto1` FOREIGN KEY (`Proyecto_idProyecto`, `Proyecto_Usuario_idUsuario`) REFERENCES `proyecto` (`idProyecto`, `Usuario_idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encabezado`
--

LOCK TABLES `encabezado` WRITE;
/*!40000 ALTER TABLE `encabezado` DISABLE KEYS */;
/*!40000 ALTER TABLE `encabezado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maquinaria`
--

DROP TABLE IF EXISTS `maquinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maquinaria` (
  `idMaquinaria` int(11) NOT NULL AUTO_INCREMENT,
  `nombreMaq` varchar(20) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `cantidadProd` double DEFAULT NULL,
  `depAcum` double DEFAULT NULL,
  `imgMaq` varchar(50) DEFAULT NULL,
  `Producto_idProducto` int(11) NOT NULL,
  PRIMARY KEY (`idMaquinaria`,`Producto_idProducto`),
  KEY `fk_Maquinaria_Producto1_idx` (`Producto_idProducto`),
  CONSTRAINT `fk_Maquinaria_Producto1` FOREIGN KEY (`Producto_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maquinaria`
--

LOCK TABLES `maquinaria` WRITE;
/*!40000 ALTER TABLE `maquinaria` DISABLE KEYS */;
INSERT INTO `maquinaria` VALUES (1,'MaqX',1500000,4000,10,NULL,4),(2,'MaqY',100000,6000,35,NULL,5),(3,'MaqX2',85000,2500,20,NULL,4),(6,'MaqP',2000000,120,10,NULL,4);
/*!40000 ALTER TABLE `maquinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maquinariaproyecto`
--

DROP TABLE IF EXISTS `maquinariaproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maquinariaproyecto` (
  `Maquinaria_idMaquinaria` int(11) NOT NULL,
  `Proyectos_idProyecto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Maquinaria_idMaquinaria`,`Proyectos_idProyecto`),
  KEY `fk_Maquinaria_has_Proyectos_Proyectos1_idx` (`Proyectos_idProyecto`),
  KEY `fk_Maquinaria_has_Proyectos_Maquinaria1_idx` (`Maquinaria_idMaquinaria`),
  CONSTRAINT `fk_Maquinaria_has_Proyectos_Maquinaria1` FOREIGN KEY (`Maquinaria_idMaquinaria`) REFERENCES `maquinaria` (`idMaquinaria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Maquinaria_has_Proyectos_Proyectos1` FOREIGN KEY (`Proyectos_idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maquinariaproyecto`
--

LOCK TABLES `maquinariaproyecto` WRITE;
/*!40000 ALTER TABLE `maquinariaproyecto` DISABLE KEYS */;
INSERT INTO `maquinariaproyecto` VALUES (1,92,1),(6,49,2);
/*!40000 ALTER TABLE `maquinariaproyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacion` (
  `idNotificacion` int(11) NOT NULL,
  `nombreNoti` varchar(20) DEFAULT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `Balance_idBalance` int(11) NOT NULL,
  `Balance_Proyectos_idProyecto` int(11) NOT NULL,
  PRIMARY KEY (`idNotificacion`,`Balance_idBalance`,`Balance_Proyectos_idProyecto`),
  KEY `fk_Notificacion_Balance1_idx` (`Balance_idBalance`,`Balance_Proyectos_idProyecto`),
  CONSTRAINT `fk_Notificacion_Balance1` FOREIGN KEY (`Balance_idBalance`, `Balance_Proyectos_idProyecto`) REFERENCES `balance` (`idBalance`, `Proyectos_idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operacion`
--

DROP TABLE IF EXISTS `operacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operacion` (
  `Producto_idProducto` int(11) NOT NULL,
  `Zona_idZonas` int(11) NOT NULL,
  `Proyecto_idProyecto` int(11) NOT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  `numPeriodo` int(11) NOT NULL,
  `unidadesAlmacenadas` int(11) DEFAULT NULL,
  `unidadesVendidas` int(11) DEFAULT NULL,
  PRIMARY KEY (`Producto_idProducto`,`Zona_idZonas`,`Proyecto_idProyecto`,`Usuario_idUsuario`,`numPeriodo`),
  CONSTRAINT `fk_operacion_ProductoZonaProyecto1` FOREIGN KEY (`Producto_idProducto`, `Zona_idZonas`, `Proyecto_idProyecto`, `Usuario_idUsuario`) REFERENCES `ProductoZonaProyecto` (`Producto_idProducto`, `Zona_idZonas`, `Proyecto_idProyecto`, `Proyecto_Usuario_idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operacion`
--

LOCK TABLES `operacion` WRITE;
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
INSERT INTO `operacion` VALUES (4,87,92,1,1,100,999);
/*!40000 ALTER TABLE `operacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamo` (
  `idPrestamos` int(11) NOT NULL AUTO_INCREMENT,
  `nombrePrestamo` varchar(20) DEFAULT NULL,
  `intereses` double DEFAULT NULL,
  `plazoPago` int(11) DEFAULT NULL,
  `monto` double DEFAULT NULL,
  `tipoPrestamo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPrestamos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,'BMI',23,10,1000000,'X');
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProd` varchar(20) DEFAULT NULL,
  `costoDes` double DEFAULT NULL,
  `tiempoDes` int(11) DEFAULT NULL,
  `costoProd` double DEFAULT NULL,
  `costosFijosFabri` double DEFAULT NULL,
  `costosVarFabri` double DEFAULT NULL,
  `costoVarUniDist` double DEFAULT NULL,
  `gastosFijosAdmon` double DEFAULT NULL,
  `costosMPPorUniProd` double DEFAULT NULL,
  `uniMP` int(11) DEFAULT NULL,
  `costoUni` double DEFAULT NULL,
  `imgProd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (4,'ProductoX',2000000,2,1100,100000,300,200,300000,483,7,69,NULL),(5,'ProductoY',3000,2,70,5,7,8,9,1,2,28,NULL),(6,'ProductoZ',2000000,3,20,25,26,27,28,29,30,31,NULL);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoadministrador`
--

DROP TABLE IF EXISTS `productoadministrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productoadministrador` (
  `Productos_idProducto` int(11) NOT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL,
  PRIMARY KEY (`Productos_idProducto`,`Administrador_idAdministrador`),
  KEY `fk_Productos_has_Administrador_Administrador1_idx` (`Administrador_idAdministrador`),
  KEY `fk_Productos_has_Administrador_Productos1_idx` (`Productos_idProducto`),
  CONSTRAINT `fk_Productos_has_Administrador_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_has_Administrador_Productos1` FOREIGN KEY (`Productos_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoadministrador`
--

LOCK TABLES `productoadministrador` WRITE;
/*!40000 ALTER TABLE `productoadministrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `productoadministrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productozona`
--

DROP TABLE IF EXISTS `productozona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productozona` (
  `Zona_idZona` int(11) NOT NULL,
  `Producto_idProducto` int(11) NOT NULL,
  `costoDes` double DEFAULT NULL,
  `tiempoDes` int(11) DEFAULT NULL,
  PRIMARY KEY (`Zona_idZona`,`Producto_idProducto`),
  KEY `fk_table1_Producto2_idx` (`Producto_idProducto`),
  CONSTRAINT `fk_table1_Producto2` FOREIGN KEY (`Producto_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_Zona2` FOREIGN KEY (`Zona_idZona`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productozona`
--

LOCK TABLES `productozona` WRITE;
/*!40000 ALTER TABLE `productozona` DISABLE KEYS */;
INSERT INTO `productozona` VALUES (84,5,600000,2),(87,4,1,2),(87,5,3,4);
/*!40000 ALTER TABLE `productozona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productozonaproyecto`
--

DROP TABLE IF EXISTS `productozonaproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productozonaproyecto` (
  `Producto_idProducto` int(11) NOT NULL,
  `Zona_idZonas` int(11) NOT NULL,
  `Proyecto_idProyecto` int(11) NOT NULL,
  `Proyecto_Usuario_idUsuario` int(11) NOT NULL,
  `desarrollado` int(11) NOT NULL DEFAULT '0',
  `periodoInicio` int(11) DEFAULT NULL,
  `ultimoPeriodoDes` int(11) DEFAULT NULL,
  `periodosDes` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Producto_idProducto`,`Zona_idZonas`,`Proyecto_idProyecto`,`Proyecto_Usuario_idUsuario`),
  KEY `fk_table1_Zona1_idx` (`Zona_idZonas`),
  KEY `fk_table1_Proyecto1_idx` (`Proyecto_idProyecto`,`Proyecto_Usuario_idUsuario`),
  CONSTRAINT `fk_table1_Producto1` FOREIGN KEY (`Producto_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_table1_Proyecto1` FOREIGN KEY (`Proyecto_idProyecto`, `Proyecto_Usuario_idUsuario`) REFERENCES `proyecto` (`idProyecto`, `Usuario_idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_table1_Zona1` FOREIGN KEY (`Zona_idZonas`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productozonaproyecto`
--

LOCK TABLES `productozonaproyecto` WRITE;
/*!40000 ALTER TABLE `productozonaproyecto` DISABLE KEYS */;
INSERT INTO `productozonaproyecto` VALUES (4,87,92,1,1,0,0,0),(5,84,92,1,1,1,2,2),(5,87,92,1,1,3,3,1);
/*!40000 ALTER TABLE `productozonaproyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyecto` (
  `idProyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(45) DEFAULT NULL,
  `fechaCreacion` varchar(20) DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  `numProyecto` int(2) DEFAULT NULL,
  `cantMaxRes` double DEFAULT NULL,
  `cantMinRes` double DEFAULT NULL,
  PRIMARY KEY (`idProyecto`,`Usuario_idUsuario`),
  KEY `fk_Proyectos_Usuario1_idx` (`Usuario_idUsuario`),
  CONSTRAINT `fk_Proyectos_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (8,'ProyectoPR1','Jul 31, 2017',2,NULL,NULL,NULL),(49,'Manzanas','Aug 21, 2017',5,NULL,NULL,NULL),(50,'PR1','Aug 22, 2017',5,NULL,NULL,NULL),(62,'P7','Aug 24, 2017',1,NULL,NULL,NULL),(92,'Prueba5','Sep 1, 2017',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectoprestamos`
--

DROP TABLE IF EXISTS `proyectoprestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectoprestamos` (
  `Proyectos_idProyecto` int(11) NOT NULL,
  `Proyectos_Usuario_idUsuario` int(11) NOT NULL,
  `Prestamos_idPrestamos` int(11) NOT NULL,
  PRIMARY KEY (`Proyectos_idProyecto`,`Proyectos_Usuario_idUsuario`,`Prestamos_idPrestamos`),
  KEY `fk_Proyectos_has_Prestamos_Prestamos1_idx` (`Prestamos_idPrestamos`),
  KEY `fk_Proyectos_has_Prestamos_Proyectos1_idx` (`Proyectos_idProyecto`,`Proyectos_Usuario_idUsuario`),
  CONSTRAINT `fk_Proyectos_has_Prestamos_Prestamos1` FOREIGN KEY (`Prestamos_idPrestamos`) REFERENCES `prestamo` (`idPrestamos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proyectos_has_Prestamos_Proyectos1` FOREIGN KEY (`Proyectos_idProyecto`, `Proyectos_Usuario_idUsuario`) REFERENCES `proyecto` (`idProyecto`, `Usuario_idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectoprestamos`
--

LOCK TABLES `proyectoprestamos` WRITE;
/*!40000 ALTER TABLE `proyectoprestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyectoprestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectoproducto`
--

DROP TABLE IF EXISTS `proyectoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectoproducto` (
  `Proyectos_idProyecto` int(11) NOT NULL,
  `Productos_idProducto` int(11) NOT NULL,
  `desarrollado` int(11) DEFAULT '0',
  `periodoInicio` int(11) DEFAULT NULL,
  `ultimoPeriodoDes` int(11) DEFAULT NULL,
  `periodosDes` int(11) DEFAULT '1',
  PRIMARY KEY (`Proyectos_idProyecto`,`Productos_idProducto`),
  KEY `fk_Proyectos_has_Productos_Productos1_idx` (`Productos_idProducto`),
  KEY `fk_Proyectos_has_Productos_Proyectos1_idx` (`Proyectos_idProyecto`),
  CONSTRAINT `fk_Proyectos_has_Productos_Productos1` FOREIGN KEY (`Productos_idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proyectos_has_Productos_Proyectos1` FOREIGN KEY (`Proyectos_idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectoproducto`
--

LOCK TABLES `proyectoproducto` WRITE;
/*!40000 ALTER TABLE `proyectoproducto` DISABLE KEYS */;
INSERT INTO `proyectoproducto` VALUES (49,5,1,1,2,2),(92,4,1,0,0,0),(92,5,1,1,2,2);
/*!40000 ALTER TABLE `proyectoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(20) DEFAULT NULL,
  `apPat` varchar(20) DEFAULT NULL,
  `apMat` varchar(20) DEFAULT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL,
  `contra` varchar(20) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `imgUsuario` varchar(50) DEFAULT NULL,
  `numProyPermitidos` int(11) DEFAULT NULL,
  `cajaBancos` double DEFAULT NULL,
  `cuentasPorCobrar` double DEFAULT NULL,
  `IVAAcreditable` double DEFAULT NULL,
  `almacenArtTerm` double DEFAULT NULL,
  `almacenMateriales` double DEFAULT NULL,
  `terreno` double DEFAULT NULL,
  `edifInsta` double DEFAULT NULL,
  `maqEquipo` double DEFAULT NULL,
  `mueblesEnseres` double DEFAULT NULL,
  `eqTrans` double DEFAULT NULL,
  `pagosAnticipado` double DEFAULT NULL,
  `gastosAmortizacion` double DEFAULT NULL,
  `IVAPorEnterar` double DEFAULT NULL,
  `imptosPorPagar` double DEFAULT NULL,
  `proveedores` double DEFAULT NULL,
  `PTUPorPagar` double DEFAULT NULL,
  `capitalSocial` double DEFAULT NULL,
  `reservaLegal` double DEFAULT NULL,
  `utilidadAcum` double DEFAULT NULL,
  `prestamosMenosAnio` double DEFAULT NULL,
  `prestamosMasAnio` double DEFAULT NULL,
  PRIMARY KEY (`idUsuario`,`Administrador_idAdministrador`),
  KEY `fk_Usuario_Administrador1_idx` (`Administrador_idAdministrador`),
  CONSTRAINT `fk_Usuario_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juan','Calette','Jimenez',1,'123','JC',NULL,NULL,2500000,0,0,0,0,1000000,2000000,3000000,500000,1000000,0,0,0,0,0,0,10000000,0,0,0,0),(2,'Pedro','Fernandez','Zepeda',1,'123','PFZ',NULL,NULL,2500000,0,0,0,0,1000000,2000000,3000000,500000,1000000,0,0,0,0,0,0,10000000,0,0,0,0),(5,'Raul','Uribe','E',1,'raul705','raul705',NULL,NULL,2500000,0,0,0,0,1000000,2000000,3000000,500000,1000000,0,0,0,0,0,0,10000000,0,0,0,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariomaquinaria`
--

DROP TABLE IF EXISTS `usuariomaquinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuariomaquinaria` (
  `idMaquinaria` int(11) NOT NULL,
  `Producto_idProducto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT '1',
  PRIMARY KEY (`idMaquinaria`,`Producto_idProducto`,`idUsuario`,`Administrador_idAdministrador`),
  KEY `fk_table1_Usuario1_idx` (`idUsuario`,`Administrador_idAdministrador`),
  CONSTRAINT `fk_table1_Maquinaria1` FOREIGN KEY (`idMaquinaria`, `Producto_idProducto`) REFERENCES `maquinaria` (`idMaquinaria`, `Producto_idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_table1_Usuario1` FOREIGN KEY (`idUsuario`, `Administrador_idAdministrador`) REFERENCES `usuario` (`idUsuario`, `Administrador_idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariomaquinaria`
--

LOCK TABLES `usuariomaquinaria` WRITE;
/*!40000 ALTER TABLE `usuariomaquinaria` DISABLE KEYS */;
INSERT INTO `usuariomaquinaria` VALUES (1,4,1,1,1),(1,4,2,1,1),(1,4,5,1,1);
/*!40000 ALTER TABLE `usuariomaquinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarioproducto`
--

DROP TABLE IF EXISTS `usuarioproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarioproducto` (
  `idProducto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idAdministrador` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`,`idUsuario`,`idAdministrador`),
  KEY `fk_table1_Usuario2_idx` (`idUsuario`,`idAdministrador`),
  CONSTRAINT `fk_table1_Producto3` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_table1_Usuario2` FOREIGN KEY (`idUsuario`, `idAdministrador`) REFERENCES `usuario` (`idUsuario`, `Administrador_idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarioproducto`
--

LOCK TABLES `usuarioproducto` WRITE;
/*!40000 ALTER TABLE `usuarioproducto` DISABLE KEYS */;
INSERT INTO `usuarioproducto` VALUES (4,1,1),(4,2,1),(4,5,1);
/*!40000 ALTER TABLE `usuarioproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarioproductozona`
--

DROP TABLE IF EXISTS `usuarioproductozona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarioproductozona` (
  `idUsuario` int(11) NOT NULL,
  `idAdministrador` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `idZona` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idAdministrador`,`idProducto`,`idZona`),
  KEY `fk_usuarioproductozona_Producto1_idx` (`idProducto`),
  KEY `fk_usuarioproductozona_Zona1_idx` (`idZona`),
  CONSTRAINT `fk_usuarioproductozona_Producto1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarioproductozona_Usuario1` FOREIGN KEY (`idUsuario`, `idAdministrador`) REFERENCES `usuario` (`idUsuario`, `Administrador_idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarioproductozona_Zona1` FOREIGN KEY (`idZona`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarioproductozona`
--

LOCK TABLES `usuarioproductozona` WRITE;
/*!40000 ALTER TABLE `usuarioproductozona` DISABLE KEYS */;
INSERT INTO `usuarioproductozona` VALUES (1,1,4,87),(2,1,4,87),(5,1,4,87);
/*!40000 ALTER TABLE `usuarioproductozona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zona` (
  `idZona` int(11) NOT NULL AUTO_INCREMENT,
  `nombreZona` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES (84,'Queretaro'),(87,'CDMX');
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'basesimv1'
--

--
-- Dumping routines for database 'basesimv1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-10 21:01:24
