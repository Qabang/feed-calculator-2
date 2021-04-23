-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2021 at 10:59 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feed_calculator`
--

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `profileId` int(11) NOT NULL,
  `profileName` varchar(100) NOT NULL,
  `profileBorn` int(11) NOT NULL,
  `profileGender` varchar(15) NOT NULL,
  `profileWeight` int(11) NOT NULL,
  `profileType` varchar(10) NOT NULL,
  `profileLook` varchar(10) NOT NULL,
  `profileWalk` int(11) DEFAULT NULL,
  `profileTrotCanter` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rations`
--

CREATE TABLE `rations` (
  `rationId` int(11) NOT NULL,
  `rationAmount` int(11) NOT NULL,
  `rationTs` int(11) DEFAULT NULL,
  `rationMj` int(11) DEFAULT NULL,
  `rationSmrp` int(11) DEFAULT NULL,
  `rationCa` int(11) DEFAULT NULL,
  `rationP` int(11) DEFAULT NULL,
  `rationMg` int(11) DEFAULT NULL,
  `rationSelenium` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `profileId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`profileId`),
  ADD UNIQUE KEY `profileName` (`profileName`);

--
-- Indexes for table `rations`
--
ALTER TABLE `rations`
  ADD PRIMARY KEY (`rationId`),
  ADD KEY `profileId` (`profileId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `profileId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rations`
--
ALTER TABLE `rations`
  MODIFY `rationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rations`
--
ALTER TABLE `rations`
  ADD CONSTRAINT `rations_ibfk_1` FOREIGN KEY (`profileId`) REFERENCES `profiles` (`profileId`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
