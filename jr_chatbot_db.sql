-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2024 at 06:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jr_chatbot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `define_message_reply`
--

CREATE TABLE `define_message_reply` (
  `ID` int(11) NOT NULL,
  `messages` varchar(500) NOT NULL,
  `replies` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `define_message_reply`
--

INSERT INTO `define_message_reply` (`ID`, `messages`, `replies`) VALUES
(1, 'Hii', 'Hello'),
(2, 'How are you?', 'I am fine, Thanks for asking.'),
(3, 'How many states in india', 'There are 29 states in india.'),
(4, 'What is color of sky', 'Blue');

-- --------------------------------------------------------

--
-- Table structure for table `instruction_table`
--

CREATE TABLE `instruction_table` (
  `ID` int(11) NOT NULL,
  `Instruction` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instruction_table`
--

INSERT INTO `instruction_table` (`ID`, `Instruction`) VALUES
(1, 'Write Table of 10'),
(2, 'Random Number');

-- --------------------------------------------------------

--
-- Table structure for table `undefine_reply_message`
--

CREATE TABLE `undefine_reply_message` (
  `ID` int(11) NOT NULL,
  `messages` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `undefine_reply_message`
--

INSERT INTO `undefine_reply_message` (`ID`, `messages`) VALUES
(1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `users_registration`
--

CREATE TABLE `users_registration` (
  `ID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `define_message_reply`
--
ALTER TABLE `define_message_reply`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `instruction_table`
--
ALTER TABLE `instruction_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `undefine_reply_message`
--
ALTER TABLE `undefine_reply_message`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users_registration`
--
ALTER TABLE `users_registration`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `define_message_reply`
--
ALTER TABLE `define_message_reply`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `instruction_table`
--
ALTER TABLE `instruction_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `undefine_reply_message`
--
ALTER TABLE `undefine_reply_message`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_registration`
--
ALTER TABLE `users_registration`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
