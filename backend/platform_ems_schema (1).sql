-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2025 at 06:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `platform_ems_schema`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings_tbl`
--

CREATE TABLE `bookings_tbl` (
  `id_user` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `package_item` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '\'{}\'',
  `schedule` date NOT NULL,
  `status` text NOT NULL,
  `payment_receipt` text NOT NULL,
  `payment_method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings_tbl`
--

INSERT INTO `bookings_tbl` (`id_user`, `id_service`, `id`, `package_item`, `schedule`, `status`, `payment_receipt`, `payment_method`, `reason`, `created_at`) VALUES
(29, 9, 9, '{\"package_name\":\"tewt\",\"no_guest\":\"4\",\"price\":\"3434\",\"inclusions\":[\"2343\"],\"meal_sets\":[{\"title\":\"234\",\"meals\":[\"\"]}]}', '2025-10-16', 'Paid', '{\"url\":\"68e52f5e66129_images.jpg\",\"name\":\"images.jpg\",\"type\":\"image/jpeg\"}', '{\"type\":\"GCASH\",\"account_name\":\"12weqwe\",\"account_number\":\"qweqwe\"}', '', '2025-10-07 14:33:16'),
(29, 9, 10, '{\"package_name\":\"tewt\",\"no_guest\":\"4\",\"price\":\"3434\",\"inclusions\":[\"2343\"],\"meal_sets\":[{\"title\":\"234\",\"meals\":[\"\"]}]}', '2025-10-10', 'Payment Verification', '{\"url\":\"68e7f2c029e75_maxresdefault.jpg\",\"name\":\"maxresdefault.jpg\",\"type\":\"image/jpeg\"}', '{\"type\":\"GCASH\",\"account_name\":\"12weqwe\",\"account_number\":\"qweqwe\"}', '', '2025-10-09 16:37:59'),
(29, 9, 11, '{\"package_name\":\"tewt\",\"no_guest\":\"4\",\"price\":\"3434\",\"inclusions\":[\"2343\"],\"meal_sets\":[{\"title\":\"234\",\"meals\":[\"\"]}]}', '2025-10-22', 'Paid', '{\"url\":\"68f38d39cfaf4_589fd27f-3ad3-43bf-9ebf-f22ebe7f2a5e.jpg\",\"name\":\"589fd27f-3ad3-43bf-9ebf-f22ebe7f2a5e.jpg\",\"type\":\"image/jpeg\"}', '{\"type\":\"GCASH\",\"account_name\":\"12weqwe\",\"account_number\":\"qweqwe\"}', '', '2025-10-09 17:31:26'),
(31, 9, 12, '{\"package_name\":\"tewt\",\"no_guest\":\"4\",\"price\":\"3434\",\"inclusions\":[\"2343\"],\"meal_sets\":[{\"title\":\"234\",\"meals\":[\"\"]}]}', '2025-10-09', 'Pending', '', '', '', '2025-10-15 09:19:33'),
(35, 11, 13, '{\"package_name\":\"Birthday Party\",\"no_guest\":\"30\",\"price\":\"15000\",\"inclusions\":[\"Free Wifi\"],\"meal_sets\":[{\"title\":\"AM\",\"meals\":[\"Snacks & Coffee\"]}]}', '2025-10-07', 'Confirmed', '', '', '', '2025-10-18 13:03:37'),
(3, 3, 14, '{\"package_name\":\"asdasd\",\"no_guest\":\"23\",\"price\":\"123123\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"asdasd\",\"meals\":[\"zxcz\"]}]}', '2025-10-30', 'Paid', '{\"url\":\"68f8352ad3f4d_68e3861390bf9_Banner.jpg\",\"name\":\"68e3861390bf9_Banner.jpg\",\"type\":\"image/jpeg\"}', '{\"type\":\"LANDBANK\",\"account_name\":\"asd\",\"account_number\":\"asd\"}', 'Test rejectiong', '2025-10-21 17:51:41'),
(4, 3, 16, '{\"package_name\":\"asdasd\",\"no_guest\":\"23\",\"price\":\"123123\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"asdasd\",\"meals\":[\"zxcz\"]}]}', '2025-11-12', 'Pending', '', '', '', '2025-10-24 19:06:30'),
(4, 4, 17, '{\"package_name\":\"Test Package 101\",\"no_guest\":\"42\",\"price\":\"12323\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"\",\"meals\":[\"\"]}]}', '2025-11-28', 'Paid', '{\"url\":\"68fbe509ef5dc_EASYVENT-PLATFORM-NOTES.txt\",\"name\":\"EASYVENT-PLATFORM-NOTES.txt\",\"type\":\"text/plain\"}', '{\"type\":\"LANDBANK\",\"account_name\":\"asd\",\"account_number\":\"asd\"}', '', '2025-10-24 20:36:37'),
(3, 4, 18, '{\"package_name\":\"Test Package 101\",\"no_guest\":\"42\",\"price\":\"12323\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"\",\"meals\":[\"\"]}]}', '2025-11-12', 'Confirmed', '', '', '', '2025-10-25 04:42:57'),
(6, 4, 19, '{\"package_name\":\"Test Package 101\",\"no_guest\":\"42\",\"price\":\"12323\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"\",\"meals\":[\"\"]}]}', '2025-11-30', 'Confirmed', '', '', '', '2025-10-27 20:49:45');

-- --------------------------------------------------------

--
-- Table structure for table `comments_tbl`
--

CREATE TABLE `comments_tbl` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `id_booking` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments_tbl`
--

INSERT INTO `comments_tbl` (`id`, `id_user`, `id_service`, `id_booking`, `rating`, `comment`, `created_at`) VALUES
(3, 3, 3, 14, 4, 'Test Comment 123', '2025-10-27 20:02:44');

-- --------------------------------------------------------

--
-- Table structure for table `conversations_tbl`
--

CREATE TABLE `conversations_tbl` (
  `id` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `user1_name` text NOT NULL,
  `user2_name` text NOT NULL,
  `user1_image` text NOT NULL,
  `user2_image` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations_tbl`
--

INSERT INTO `conversations_tbl` (`id`, `id_user1`, `id_user2`, `user1_name`, `user2_name`, `user1_image`, `user2_image`, `created_at`, `updated_at`) VALUES
(6, 29, 29, 'Test', 'Admin Test', '68e51092f2d7d_Pocket_Mortys.png', '68e51092f2d7d_Pocket_Mortys.png', '2025-10-07 14:33:28', '2025-10-07 14:33:28'),
(7, 29, 29, 'Test', 'Admin Test', '68e51092f2d7d_Pocket_Mortys.png', '68e51092f2d7d_Pocket_Mortys.png', '2025-10-09 16:38:51', '2025-10-09 16:38:51'),
(8, 29, 29, 'Hue Hotel Plaza', 'Admin Test', '68e51092f2d7d_Pocket_Mortys.png', '68e51092f2d7d_Pocket_Mortys.png', '2025-10-18 12:44:09', '2025-10-18 12:44:09'),
(9, 2, 3, 'asdasd', 'Test Customer', '', '', '2025-10-21 18:00:13', '2025-10-21 18:00:13'),
(10, 2, 4, 'Mc Donalds', 'Customer 2 Test Account', '', '', '2025-10-24 20:37:00', '2025-10-24 20:37:00'),
(11, 2, 3, 'Mc Donalds', 'Test Customer', '', '', '2025-10-27 20:50:08', '2025-10-27 20:50:08'),
(12, 2, 6, 'Mc Donalds', 'Customer 3 Test User', '', '', '2025-10-27 20:50:15', '2025-10-27 20:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks_tbl`
--

CREATE TABLE `feedbacks_tbl` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
  `respondent` text NOT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks_tbl`
--

INSERT INTO `feedbacks_tbl` (`id`, `name`, `email`, `title`, `description`, `status`, `respondent`, `response`, `created_at`) VALUES
(1, 'Test User', 'testuser@gmail.com', 'Concern', '<p>Test description</p>', '', '', '', '2025-10-13 18:18:23'),
(2, 'Alicred Derkila', 'alicred@gmail.com', 'I want to be your partner in Crime', '<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><p></p><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><p></p><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>', '', '', '', '2025-10-13 18:34:09'),
(3, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ul><li><p>dami pa pong process</p></li></ul><p></p>', '', '', '', '2025-10-15 13:32:51'),
(4, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<p>dami pa pong process</p><p></p>', '', '', '', '2025-10-15 13:32:58'),
(5, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p>dami pa pong process</p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:00'),
(6, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ul><li><p>dami pa pong process</p></li></ul><p></p>', '', '', '', '2025-10-15 13:33:03'),
(7, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p>dami pa pong process</p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:07'),
(8, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p>dami pa pong process</p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:10'),
(9, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p>dami <em>pa pong process</em></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:14'),
(10, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p><strong>dami <em>pa pong process</em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:19'),
(11, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p><strong><em>dami pa pong process</em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:23'),
(12, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p><strong><em><u>dami pa pong process</u></em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:28'),
(13, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p></p></li></ol><p></p><ol><li><p><strong><em><u>dami pa pong process</u></em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:39'),
(14, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p></p></li></ol><p></p><ol><li><p><strong><em><u>dami pa pong process</u></em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:41'),
(15, 'Maria Eray', 'renabandiala27@gmail.com', 'report', '<ol><li><p></p></li></ol><p></p><ol><li><p><strong><em><u>dami pa pong process</u></em></strong></p></li></ol><p></p>', '', '', '', '2025-10-15 13:33:43'),
(16, 'Test Test', 'aj@gmail.com', 'Test', '<p>Test</p>', '', '', '', '2025-10-18 12:13:23'),
(17, 'Alfred Jay Ngujo', 'aj.ngujo08@gmail.com', 'Title Sample', '<p>ALSkdjasd</p><p>asd</p><p>as</p><p>da</p><p>sda</p><p>sd</p>', '', '', '', '2025-10-21 12:31:21'),
(19, 'Test User User Test', 'test@gmail.com', 'Test Title', '<p>Hakdog</p>', '', '', '', '2025-10-24 20:46:17');

-- --------------------------------------------------------

--
-- Table structure for table `logs_tbl`
--

CREATE TABLE `logs_tbl` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `role` text NOT NULL,
  `id_author` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs_tbl`
--

INSERT INTO `logs_tbl` (`id`, `title`, `description`, `role`, `id_author`, `created_at`) VALUES
(1, 'Invited User', 'Invited a new user bacolodrachel6@gmail.com', 'Admin', 29, '2025-10-09 17:49:35'),
(2, 'Blocked User', 'Blocker user ', 'Admin', 29, '2025-10-09 17:53:01'),
(3, 'Updated Service', 'Updated new Hue Hotel Plaza service', 'Provider', 29, '2025-10-10 11:53:38'),
(4, 'Created Booking', 'Booked a new service', 'Provider', 31, '2025-10-15 09:19:33'),
(5, 'Invited User', 'Invited a new user jetroselda75@gmail.com', 'Admin', 29, '2025-10-15 13:04:06'),
(6, 'Created Service', 'Created new Sirena\'s Halls of Fame Function Hall service', 'Provider', 33, '2025-10-15 13:23:43'),
(7, 'Created Service', 'Created new Technical Independent Provider service', 'Provider', 34, '2025-10-15 13:26:04'),
(8, 'Created Service', 'Created new Technical Independent Provider service', 'Provider', 34, '2025-10-15 13:26:07'),
(9, 'Created Service', 'Created new Technical Independent Provider service', 'Provider', 34, '2025-10-15 13:26:10'),
(10, 'Updated Service', 'Updated new Sirena\'s Halls of Fame service', 'Provider', 33, '2025-10-15 13:28:28'),
(11, 'Created Service', 'Created new Driving Independent Provider service', 'Provider', 34, '2025-10-15 13:35:46'),
(12, 'Invited User', 'Invited a new user nelyzagalia21@gmail.com', 'Admin', 29, '2025-10-18 12:14:56'),
(13, 'Active User', 'Active user bacolodrachel16@gmail.com', 'Admin', 29, '2025-10-18 12:18:11'),
(14, 'Confirmed Booking', 'Confirmed booking for customer Admin Test', 'Provider', 29, '2025-10-18 12:44:09'),
(15, 'Created Payment', 'Submitted a new payment for verification', 'Provider', 29, '2025-10-18 12:51:06'),
(16, 'Confirmed Payment', 'Confirmed Payment for customer Admin Test', 'Provider', 29, '2025-10-18 12:51:29'),
(17, 'Created Booking', 'Booked a new service', 'Provider', 35, '2025-10-18 13:03:37'),
(18, 'Created Service', 'Created new Test Hotel Hotel/Resort service', 'Provider', 2, '2025-10-21 17:32:20'),
(19, 'Created Service', 'Created new Test Hotel Hotel/Resort service', 'Provider', 2, '2025-10-21 17:32:20'),
(20, 'Created Service', 'Created new asd Hotel/Resort service', 'Provider', 2, '2025-10-21 17:38:00'),
(21, 'Updated Service', 'Updated new asdasd service', 'Provider', 2, '2025-10-21 17:39:32'),
(22, 'Updated Service', 'Updated new asdasd service', 'Provider', 2, '2025-10-21 17:43:14'),
(23, 'Created Booking', 'Booked a new service', 'Provider', 3, '2025-10-21 17:51:41'),
(24, 'Rejected Booking', 'Rejected booking for customer ', 'Provider', 0, '2025-10-21 17:54:36'),
(25, 'Rejected Booking', 'Rejected booking for customer ', 'Provider', 0, '2025-10-21 17:54:36'),
(26, 'Rejected Booking', 'Rejected booking for customer ', 'Provider', 0, '2025-10-21 17:54:42'),
(27, 'Rejected Booking', 'Rejected booking for customer ', 'Provider', 0, '2025-10-21 17:54:42'),
(28, 'Rejected Booking', 'Rejected booking for customer Test Customer', 'Provider', 2, '2025-10-21 17:56:30'),
(29, 'Rejected Booking', 'Rejected booking for customer Test Customer', 'Provider', 2, '2025-10-21 17:56:30'),
(30, 'Rejected Booking', 'Rejected booking for customer Test Customer', 'Provider', 2, '2025-10-21 17:57:34'),
(31, 'Rejected Booking', 'Rejected booking for customer Test Customer', 'Provider', 2, '2025-10-21 17:57:34'),
(32, 'Confirmed Booking', 'Confirmed booking for customer Test Customer', 'Provider', 2, '2025-10-21 18:00:13'),
(33, 'Created Payment', 'Submitted a new payment for verification', 'Provider', 3, '2025-10-22 01:36:42'),
(34, 'Confirmed Payment', 'Confirmed Payment for customer Test Customer', 'Provider', 2, '2025-10-22 02:04:24'),
(35, 'Created Booking', 'Booked a new service', 'Provider', 4, '2025-10-24 19:06:30'),
(36, 'Created Service', 'Created new Mc Donalds Restaurant service', 'Provider', 2, '2025-10-24 20:26:12'),
(37, 'Created Booking', 'Booked a new service', 'Provider', 4, '2025-10-24 20:36:37'),
(38, 'Confirmed Booking', 'Confirmed booking for customer Customer 2 Test Account', 'Provider', 2, '2025-10-24 20:37:00'),
(39, 'Created Payment', 'Submitted a new payment for verification', 'Provider', 4, '2025-10-24 20:43:54'),
(40, 'Confirmed Payment', 'Confirmed Payment for customer Customer 2 Test Account', 'Provider', 2, '2025-10-24 20:44:52'),
(41, 'Created Booking', 'Booked a new service', 'Provider', 3, '2025-10-25 04:42:57'),
(42, 'Created Service', 'Created new Test Function Hall Function Hall service', 'Provider', 5, '2025-10-27 19:08:21'),
(43, 'Created Service', 'Created new Lorem Ipsum is simply dummy text of the printing and typesetting industry. Function Hall service', 'Provider', 5, '2025-10-27 19:14:13'),
(44, 'Created Comment', 'Submitted a new feedback', 'Provider', 3, '2025-10-27 20:02:44'),
(45, 'Updated Service', 'Updated new Mc Donalds service', 'Provider', 2, '2025-10-27 20:34:38'),
(46, 'Updated Service', 'Updated new Mc Donalds service', 'Provider', 2, '2025-10-27 20:35:30'),
(47, 'Created Booking', 'Booked a new service', 'Provider', 6, '2025-10-27 20:49:45'),
(48, 'Confirmed Booking', 'Confirmed booking for customer Test Customer', 'Provider', 2, '2025-10-27 20:50:08'),
(49, 'Confirmed Booking', 'Confirmed booking for customer Customer 3 Test User', 'Provider', 2, '2025-10-27 20:50:15');

-- --------------------------------------------------------

--
-- Table structure for table `messages_tbl`
--

CREATE TABLE `messages_tbl` (
  `id_sender` int(11) NOT NULL,
  `id_convo` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isEdited` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages_tbl`
--

INSERT INTO `messages_tbl` (`id_sender`, `id_convo`, `id`, `message`, `created_at`, `isEdited`) VALUES
(29, 6, 21, 'Your reservation at Test is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-07 14:33:28', 0),
(29, 6, 22, 'Dafug', '2025-10-07 15:45:56', 0),
(29, 7, 23, 'Your reservation at Test is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-09 16:38:51', 0),
(29, 8, 24, 'Your reservation at Hue Hotel Plaza is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-18 12:44:09', 0),
(2, 9, 25, 'Your reservation at asdasd is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-21 18:00:13', 0),
(3, 9, 26, 'Hello', '2025-10-22 02:08:10', 0),
(2, 9, 27, 'Hi, can I help you?', '2025-10-22 02:09:04', 0),
(3, 9, 28, 'Yes you can', '2025-10-22 02:09:20', 0),
(2, 9, 29, 'Ok', '2025-10-22 02:09:25', 0),
(2, 10, 30, 'Your reservation at Mc Donalds is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-24 20:37:00', 0),
(4, 10, 31, 'Hello there', '2025-10-24 20:39:47', 0),
(2, 10, 32, 'Fuck you', '2025-10-24 20:50:43', 0),
(2, 11, 33, 'Your reservation at Mc Donalds is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-27 20:50:08', 0),
(2, 12, 34, 'Your reservation at Mc Donalds is confirmed! We\'re looking forward to welcoming you soon. If you have any changes to you booking or special requests, feel free to send us a message anytime', '2025-10-27 20:50:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications_tbl`
--

CREATE TABLE `notifications_tbl` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_ref` int(11) NOT NULL,
  `user_type` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications_tbl`
--

INSERT INTO `notifications_tbl` (`id`, `id_user`, `id_ref`, `user_type`, `title`, `description`, `status`, `created_at`) VALUES
(1, 2, 3, '', 'New Booking', 'asdasd has a new booking', 'Read', '2025-10-24 19:06:30'),
(2, 0, 4, 'Admin', 'New Listing', 'Mc Donalds has request for listing', 'Read', '2025-10-24 20:26:12'),
(3, 2, 4, '', 'Approved Listing', 'Mc Donalds has been approved.', 'Read', '2025-10-24 20:32:58'),
(4, 2, 4, '', 'Blocked Listing', 'Mc Donalds has been Blocked.', 'Read', '2025-10-24 20:34:39'),
(5, 2, 4, '', 'Published Listing', 'Mc Donalds has been Published.', 'Read', '2025-10-24 20:35:20'),
(6, 2, 4, '', 'New Booking', 'Mc Donalds has a new booking', 'Read', '2025-10-24 20:36:37'),
(7, 4, 17, '', 'Confirmed Booking', 'Your booking has been confirmed.', 'Read', '2025-10-24 20:37:00'),
(8, 2, 4, '', 'Customer 2 Test Account', 'Hello there', 'Read', '2025-10-24 20:39:47'),
(9, 2, 4, '', 'New Payment', 'Mc Donalds has a new payment', 'Read', '2025-10-24 20:43:54'),
(10, 4, 17, '', 'Confirmed Payment', 'Your payment has been confirmed.', 'Read', '2025-10-24 20:44:52'),
(11, 0, 0, 'Admin', 'New Feedback', 'Test Title', 'Read', '2025-10-24 20:46:17'),
(12, 4, 2, '', 'Test Provider', 'Fuck you', 'Read', '2025-10-24 20:50:43'),
(13, 2, 4, '', 'New Booking', 'Mc Donalds has a new booking', 'Unread', '2025-10-25 04:42:57'),
(14, 0, 5, 'Admin', 'New Listing', 'Test Function Hall has request for listing', 'Unread', '2025-10-27 19:08:21'),
(15, 0, 6, 'Admin', 'New Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has request for listing', 'Unread', '2025-10-27 19:14:13'),
(16, 5, 6, '', 'Approved Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been approved.', 'Unread', '2025-10-27 19:16:06'),
(17, 5, 6, '', 'Approved Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been approved.', 'Unread', '2025-10-27 19:18:01'),
(18, 5, 6, '', 'Approved Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been approved.', 'Unread', '2025-10-27 19:19:47'),
(19, 5, 6, '', 'Approved Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been approved.', 'Unread', '2025-10-27 19:22:10'),
(20, 5, 6, '', 'Rejected Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been rejected.', 'Unread', '2025-10-27 19:31:03'),
(21, 5, 6, '', 'Rejected Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been rejected.', 'Unread', '2025-10-27 19:31:03'),
(22, 5, 6, '', 'Rejected Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been rejected.', 'Unread', '2025-10-27 19:32:45'),
(23, 5, 6, '', 'Rejected Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been rejected.', 'Unread', '2025-10-27 19:32:45'),
(24, 5, 6, '', 'Rejected Listing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been rejected.', 'Unread', '2025-10-27 19:33:40'),
(25, 2, 4, '', 'New Booking', 'Mc Donalds has a new booking', 'Read', '2025-10-27 20:49:45'),
(26, 3, 18, '', 'Confirmed Booking', 'Your booking has been confirmed.', 'Unread', '2025-10-27 20:50:08'),
(27, 6, 19, '', 'Confirmed Booking', 'Your booking has been confirmed.', 'Unread', '2025-10-27 20:50:15'),
(28, 2, 3, '', 'Blocked Listing', 'asdasd has been Blocked.', 'Unread', '2025-10-27 20:55:30'),
(29, 2, 3, '', 'Published Listing', 'asdasd has been Published.', 'Unread', '2025-10-27 20:55:31');

-- --------------------------------------------------------

--
-- Table structure for table `packages_tbl`
--

CREATE TABLE `packages_tbl` (
  `id` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `package_name` text NOT NULL,
  `guest_no` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `inclusions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quick_messages_tbl`
--

CREATE TABLE `quick_messages_tbl` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `response` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quick_messages_tbl`
--

INSERT INTO `quick_messages_tbl` (`id`, `question`, `response`, `status`) VALUES
(1, 'How to Create  a Customer Account? 1232', '<p><strong>Details</strong>: The venue location is essential for both physical and virtual events. Include the full address, parking information, or access links for online events</p>', 'Active'),
(2, 'How do I register or RSVP?', '<h3></h3><ul><li><p><strong>Details</strong>: Attendees often need to know how to sign up for the event. This could involve filling out a form, sending an email, or clicking on a registration link</p></li></ul><p></p>', 'Deleted'),
(3, 'How to Create a Provider Account? a', '<p><strong>Details</strong>: Event schedules are crucial for attendees to plan their time. This includes start time, end time, and any breaks or intermissions 2</p>', 'Deleted'),
(4, 'How to Book a Service?', '<p><strong>Details</strong>: Event schedules are crucial for attendees to plan their time. This includes start time, end time, and any breaks or intermissions</p>', 'Active'),
(5, 'Another 1', '<p><strong>Details</strong>: Event schedules are crucial for attendees to plan their time. This includes start time, end time, and any breaks or intermissions</p>', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `services_tbl`
--

CREATE TABLE `services_tbl` (
  `id` int(11) NOT NULL,
  `category` text NOT NULL,
  `property_name` text NOT NULL,
  `property_description` text NOT NULL,
  `images_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"',
  `highlights` text NOT NULL DEFAULT '[]',
  `amenities` text NOT NULL DEFAULT '[]',
  `location` text NOT NULL DEFAULT '{}',
  `packages_list` text NOT NULL DEFAULT '[]',
  `skills` text NOT NULL DEFAULT '[]',
  `experiences` text NOT NULL DEFAULT '[]',
  `independent_locations` text NOT NULL DEFAULT '[]',
  `availability` text NOT NULL DEFAULT '[]',
  `status` text NOT NULL,
  `required_documents` text NOT NULL DEFAULT '[]',
  `reject_reason` text NOT NULL,
  `block_reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_tbl`
--

INSERT INTO `services_tbl` (`id`, `category`, `property_name`, `property_description`, `images_url`, `highlights`, `amenities`, `location`, `packages_list`, `skills`, `experiences`, `independent_locations`, `availability`, `status`, `required_documents`, `reject_reason`, `block_reason`, `created_at`) VALUES
(3, 'Hotel/Resort', 'asdasd', '', '[]', '[]', '[\"asd\",\"zxc\"]', '{}', '[{\"package_name\":\"asdasd\",\"no_guest\":\"23\",\"price\":\"123123\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"asdasd\",\"meals\":[\"zxcz\"]}]}]', '[]', '[]', '[]', '[]', 'Published', '[{\"url\":\"68f7c4f8b6fd2_68e3861390bf9_Banner.jpg\",\"name\":\"68e3861390bf9_Banner.jpg\",\"type\":\"image/jpeg\"}]', '', '', '2025-10-21 17:38:00'),
(4, 'Restaurant', 'Mc Donalds', 'Test MCDO', '[]', '[]', '[]', '{}', '[{\"package_name\":\"Test Package 101\",\"no_guest\":\"42\",\"price\":\"12323\",\"inclusions\":[\"qweqwe\"],\"meal_sets\":[{\"title\":\"\",\"meals\":[\"\"]}]}]', '[]', '[]', '[]', '[\"2025-10-29\"]', 'Published', '[{\"url\":\"68fbe0e4984d2_68e3861390bf9_Banner.jpg\",\"name\":\"68e3861390bf9_Banner.jpg\",\"type\":\"image/jpeg\"}]', '', '', '2025-10-24 20:26:12'),
(6, 'Function Hall', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '[\"68ffc4851f56b_Screenshot 2025-10-24 at 1.16.05 AM.png\",\"68ffc4851f92a_Screenshot 2025-10-24 at 1.11.57 AM.png\",\"68ffc4851fca7_Screenshot 2025-10-24 at 1.11.48 AM.png\"]', '[{\"title\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\",\"description\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\"}]', '[\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\"]', '{\"province\":\"Palawan\",\"city\":\"City of Puerto Princesa \",\"barangay\":\"Bahile\",\"geocode\":[9.791792135096339,118.71380267760165]}', '[{\"package_name\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\",\"no_guest\":\"2131\",\"price\":\"123123\",\"inclusions\":[\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\"],\"meal_sets\":[{\"title\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\",\"meals\":[\"Lorem Ipsum is simply dummy text of the printing and typesetting industry.\"]}]}]', '[]', '[]', '[]', '[]', 'Rejected', '[{\"url\":\"68ffc485191c6_Screenshot 2025-10-24 at 1.11.57 AM.png\",\"name\":\"Screenshot 2025-10-24 at 1.11.57 AM.png\",\"type\":\"image/png\"}]', 'asd', '', '2025-10-27 19:14:13');

-- --------------------------------------------------------

--
-- Table structure for table `settings_tbl`
--

CREATE TABLE `settings_tbl` (
  `id` int(11) NOT NULL,
  `landing_title` text NOT NULL,
  `landing_description` text NOT NULL,
  `landing_bg` text NOT NULL,
  `about` text NOT NULL,
  `policy` text NOT NULL,
  `terms` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings_tbl`
--

INSERT INTO `settings_tbl` (`id`, `landing_title`, `landing_description`, `landing_bg`, `about`, `policy`, `terms`) VALUES
(1, 'EasyVent', '\r\nOn this website, you can do more than just browse hotels, resorts, and restaurants with function halls and event packagesâ€”you can discover and compare venues that match your preferences and budget, making event planning easier and more convenient.\r\n', '68f66836e4a34_68e3861390bf9_Banner.jpg', '<p>This website is not only&nbsp; 123a platform that showcases establishments such as hotels, resorts, and restaurants that offer function halls and event packagesâ€”it also serves as a smart solution for customers to easily browse, compare, and choose from the best options that match their preferences and budgets. Whether you\'re looking for the perfect venue or browsing top-rated establishments for your event needs, the platform helps streamline the planning process and makes it easier to bring your dream event to life.</p><p>&nbsp;</p><p>In addition to venue discovery, the website also allows users to explore a wide range of individual services and offer their own as independent contractors. This dual-purpose platform empowers users to act as both customers and service providers. As a contractor, you can promote your skills and make your services visible to potential clients who are actively seeking event support. Unlike traditional service bundles, this platform allows for flexible, rate-based hiringâ€”making it easier for customers to find independent contractors that align with their specific budget. Overall, it provides a feasible, efficient, and user-friendly space for talented individuals to advertise their services and connect directly with clients.</p><p>&nbsp;</p><p><strong><em>As a Customer</em></strong></p><p>You can use this website to easily browse and compare hotels, resorts, and restaurants that offer function halls and event packages. Whether you\'re planning a birthday, wedding, seminar, or any kind of event, you can find venues that fit your preferences and budgetâ€”all in one convenient space.</p><p>&nbsp;</p><p><strong><em>As an Independent Service Provider</em></strong></p><p>You can offer your services directly on the platform. Whether you\'re a host, coordinator, decorator, photographer, or have any other event-related skills, you can showcase your expertise and get hired by clients looking for your specific talents. You can set your own rates and offer flexible, individual servicesâ€”no need for pre-set packages. This gives you the freedom to work on your own terms while reaching more potential customers.</p><p>&nbsp;</p><p><strong><em>As a Business or Company Provider</em></strong></p><p>You can list your businessâ€”such as a resort, hotel, or function hallâ€”on the platform and promote your available event packages to customers. This helps your business gain more visibility, attract bookings, and connect directly with people planning events. Itâ€™s a simple way to bring your services online and expand your reach.</p><p><strong>&nbsp;</strong></p><p><strong>ðŸŒŸ What Makes Our Platform Different?</strong></p><p>Our platform is more than just a place to book event venues and servicesâ€”it\'s a full-featured ecosystem designed to benefit both â€œcustomersâ€ and â€œservice providersâ€. Here\'s what sets us apart:</p><p>&nbsp;</p><p><strong>â­ Be Rated &amp; Get Recognized</strong></p><p><em>As a service provider or business, you can receive ratings and reviews from real customers, helping you build trust and credibility. The more great feedback you earn, the higher your visibility on the platform.</em></p><p><strong>&nbsp;</strong></p><p><strong>ðŸ’¸ Get Rates for Your Company</strong></p><p><em>Venue and service providers can post flexible pricing or detailed packages. Whether you offer hourly rates or full-service bundles, customers can view, compare, and choose based on their budget.</em></p><p>&nbsp;</p><p><strong>ðŸ’¬ Earn Reviews &amp; Feedback</strong></p><p><em>Both individual contractors and venue businesses can receive public feedback after completed bookings. This helps improve services, increase reputation, and attract more clients.</em></p><p>&nbsp;</p><p><strong>ðŸŽ Customers Enjoy Promos &amp; Special Offers</strong></p><p><em>Customers can access exclusive deals, limited-time promos, and seasonal discounts posted by service providers and venues. This makes event planning more budget-friendly and exciting.</em></p><p><strong>&nbsp;</strong></p><p><strong>ðŸ” Transparent &amp; Flexible Booking</strong></p><p><em>Customers can view detailed service and venue profiles, communicate directly with providers, and hire based on their needsâ€”whether itâ€™s for a single service or a full package.</em></p><p>&nbsp;</p><p><strong>ðŸ“Š Built-In Dashboard Tools</strong></p><p><em>Both customers and providers get personalized dashboards to manage bookings, schedules, reviews, and messagesâ€”making everything organized and accessible in one place.</em></p><p>&nbsp;&nbsp;</p>', '<p>At<strong> EasyVent</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform, whether as a customer, service provider, or business owner. 123<br><br><strong>&nbsp;1. Information We Collect</strong><br><br>We may collect the following types of information:<br><br></p><ul><li><p>Personal Information: Name, contact details, address, date of birth</p></li><li><p>Account Information: Email, password, profile picture, service categor</p></li><li><p>Booking Information: Event dates, location, services hired, payment status</p></li><li><p>Business Listings: Venue details, photos, packages, pricing</p></li><li><p>Usage Data: Device type, browser type, IP address, and interaction logs</p></li></ul><p><br><strong>&nbsp;2. How We Use Your Information</strong><br><br>Your data may be used for:<br><br></p><ul><li><p>Account creation and login</p></li><li><p>Service or venue bookings</p></li><li><p>Profile display for hired service providers</p></li><li><p>Communication between users</p></li><li><p>Transaction processing and history tracking</p></li><li><p>Improving our website features and user experience</p></li><li><p>Internal analytics and marketing (non-identifiable data only)</p></li></ul><p><br><strong>&nbsp;3. Information Sharing</strong><br><br>We do not sell your personal data. Your information may be shared only:<br><br></p><ul><li><p>With parties involved in your booking (e.g., the service provider or customer)</p></li><li><p>For payment processing via secure third-party providers</p></li><li><p>If required by law (e.g., fraud investigations, legal orders)</p></li></ul><p><br><strong>&nbsp;4. Data Security</strong><br><br>We implement appropriate security measures to protect your data against unauthorized access, loss, or misuse.<br><br><strong>&nbsp;5. Your Rights</strong><br><br></p><ul><li><p>You can update or delete your account at any time.</p></li><li><p>You can request access to your stored data.</p></li><li><p>You may opt out of promotional emails or marketing.</p></li></ul><p><br><strong>&nbsp;6. Cookies</strong><br><br>We use cookies for analytics and user session tracking. You can control cookie settings in your browser.<br>â€¨</p>', '<p>By accessing and using <strong>EasyVent</strong>, you agree to comply with and be bound by the following terms and conditions. 123<br><br><strong>&nbsp;1. Platform Usage</strong><br><br>* You must be at least 18 years old to use the platform.<br>* You agree to provide accurate and truthful information upon registration.<br>* You are responsible for maintaining the confidentiality of your account login.<br><br><strong>&nbsp;2. Roles and Responsibilities</strong><br><br>* Customers: May browse, book venues and services, and communicate with providers.<br>* Service Providers: May offer individual services, set their own rates, and accept or reject bookings.<br>* Business Providers: May list venue details and offer event packages.<br><br><strong>&nbsp;3. Bookings and Payments</strong><br><br>* All transactions and agreements are made directly between customers and service providers.<br>* Service providers must respond professionally to booking requests, even when declining.<br>* Refunds, cancellations, and reschedules must follow the agreed-upon terms between users.<br><br><strong>&nbsp;4. Code of Conduct</strong><br><br>All users must:<br><br>* Be respectful and honest in all interactions.<br>* Avoid spam, abuse, discrimination, or harassment.<br>* Only offer legal and safe services.<br><br>Violating these rules may result in account suspension or termination.<br><br><strong>&nbsp;5. Rejection Policy</strong><br><br>Service providers have the right to reject bookings for valid reasons (e.g., distance, schedule conflict) without penalty. A polite and clear reason must be selected or stated.<br><br><strong>&nbsp;6. Limitation of Liability</strong><br><br>[Your Website Name] acts only as a facilitator for connecting customers and service providers. We are not liable for service quality, disputes, or losses resulting from user interaction.<br><br><strong>&nbsp;7. Modifications</strong><br><br>We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on the website with updated effective dates.<br>â€¨<br>â€¨â€¨<br></p>');

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

CREATE TABLE `users_tbl` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `personal_name` text NOT NULL,
  `last_name` text NOT NULL,
  `display_picture` text NOT NULL,
  `bio` text NOT NULL,
  `payments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date_of_birth` date NOT NULL DEFAULT current_timestamp(),
  `status` text NOT NULL,
  `role` text NOT NULL,
  `contacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`id`, `email`, `password`, `personal_name`, `last_name`, `display_picture`, `bio`, `payments`, `date_of_birth`, `status`, `role`, `contacts`, `created_at`) VALUES
(1, 'bacolodrachel6@gmail.com', '$2y$10$Hyk4E5Ixavazp7VIAm7lQuaSc51tMY0Yb1zQsjlcETKTsQ5RmbMNO', 'Admin', 'Alicred', '', '', '[]', '0000-00-00', 'Active', 'Admin', '[]', '2025-10-20 15:11:29'),
(2, 'provider@gmail.com', '$2y$10$2u0q7jb.41I.4klXQI6IROdDHBkD.UHuJC0Fk3X6GbiOZ5t5hKF6K', 'Test', 'Provider', '', '', '[{\"type\":\"LANDBANK\",\"account_name\":\"asd\",\"account_number\":\"asd\"}]', '2025-10-02', 'Active', 'Provider', '[]', '2025-10-20 15:13:40'),
(3, 'customer@gmail.com', '$2y$10$biB3EiYphm5LV3DJYjyapef.n4ixC7idTqpefmX8hcWHxgC9d6HGu', 'Test', 'Customer', '', '', '[]', '0000-00-00', 'Active', 'Customer', '[]', '2025-10-20 15:14:23'),
(4, 'customer2@gmail.com', '$2y$10$tX2DFvBVpEY534woJPdUnOHkjSKOZOXrNoS2NUAyR3uZa1HYnEwwe', 'Customer 2', 'Test Account', '', '', '[]', '0000-00-00', 'Active', 'Customer', '[]', '2025-10-24 19:03:00'),
(5, 'provider2@gmail.com', '$2y$10$Nn13qN.9KKlngneq4foA9elws13/.4IyKkTKRkQgh4axhPjXqj4bO', 'Provider 2', 'Test User', '', '', '[{\"type\":\"LANDBANK\",\"account_name\":\"asd\",\"account_number\":\"asd\"}]', '0000-00-00', 'Pending', 'Provider', '[]', '2025-10-27 18:23:02'),
(6, 'customer3@gmail.com', '$2y$10$bCAR/Wv97d/NhITzGiY2xOYz3PdfzhVbvJKxXn0SntSOyI86V9JBW', 'Customer 3', 'Test User', '', '', '[]', '0000-00-00', 'Active', 'Customer', '[]', '2025-10-27 20:38:43');

-- --------------------------------------------------------

--
-- Table structure for table `user_invitations_tbl`
--

CREATE TABLE `user_invitations_tbl` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `reference` text NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_invitations_tbl`
--

INSERT INTO `user_invitations_tbl` (`id`, `id_user`, `reference`, `expiration_date`) VALUES
(11, 30, 'e33378175747444a3bb14221894bb8c283a5e20477d0fb9aa95a7211d9310045', '2025-10-11'),
(12, 32, '495d451ce7c45b2f0dc7bf76a4eec4483b87e909a4cd03de0e77693bd0a48e7c', '2025-10-16'),
(13, 36, '36de96007cbcc04dc1d4dca0974b2627c409671c9ff562ce7e1c95d3c518b7c5', '2025-10-19');

-- --------------------------------------------------------

--
-- Table structure for table `user_providers_tbl`
--

CREATE TABLE `user_providers_tbl` (
  `id_user` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `role` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_providers_tbl`
--

INSERT INTO `user_providers_tbl` (`id_user`, `id_service`, `role`, `status`) VALUES
(2, 3, 'Admin', 'Active'),
(2, 4, 'Admin', 'Active'),
(5, 6, 'Admin', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings_tbl`
--
ALTER TABLE `bookings_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments_tbl`
--
ALTER TABLE `comments_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversations_tbl`
--
ALTER TABLE `conversations_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks_tbl`
--
ALTER TABLE `feedbacks_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs_tbl`
--
ALTER TABLE `logs_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages_tbl`
--
ALTER TABLE `messages_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications_tbl`
--
ALTER TABLE `notifications_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quick_messages_tbl`
--
ALTER TABLE `quick_messages_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_tbl`
--
ALTER TABLE `services_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings_tbl`
--
ALTER TABLE `settings_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_tbl`
--
ALTER TABLE `users_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_invitations_tbl`
--
ALTER TABLE `user_invitations_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_providers_tbl`
--
ALTER TABLE `user_providers_tbl`
  ADD PRIMARY KEY (`id_user`,`id_service`),
  ADD KEY `id_user` (`id_user`,`id_service`),
  ADD KEY `id_service` (`id_service`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings_tbl`
--
ALTER TABLE `bookings_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `comments_tbl`
--
ALTER TABLE `comments_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `conversations_tbl`
--
ALTER TABLE `conversations_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feedbacks_tbl`
--
ALTER TABLE `feedbacks_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `logs_tbl`
--
ALTER TABLE `logs_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `messages_tbl`
--
ALTER TABLE `messages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `notifications_tbl`
--
ALTER TABLE `notifications_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `quick_messages_tbl`
--
ALTER TABLE `quick_messages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services_tbl`
--
ALTER TABLE `services_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_tbl`
--
ALTER TABLE `users_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
