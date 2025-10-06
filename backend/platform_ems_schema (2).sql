-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2025 at 09:25 PM
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
  `status` text NOT NULL,
  `reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 12, 14, 'Mc Donalds', 'Derk Iruma', '68c853297f26d_Pocket_Mortys.png', '68c214465412c_placeholder (1).png', '2025-09-15 19:28:53', '2025-09-15 19:28:53');

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
  `inclusions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`inclusions`)),
  `meal_sets` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meal_sets`)),
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services_tbl`
--

CREATE TABLE `services_tbl` (
  `id` int(11) NOT NULL,
  `category` text NOT NULL,
  `property_name` text NOT NULL,
  `property_description` text NOT NULL,
  `images_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"' CHECK (json_valid(`images_url`)),
  `highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"' CHECK (json_valid(`highlights`)),
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"' CHECK (json_valid(`amenities`)),
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"{}"' CHECK (json_valid(`location`)),
  `packages_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"' CHECK (json_valid(`packages_list`)),
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`skills`)),
  `experiences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`experiences`)),
  `independent_locations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`independent_locations`)),
  `status` text NOT NULL,
  `required_documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`required_documents`)),
  `reject_reason` text NOT NULL,
  `block_reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_tbl`
--

INSERT INTO `services_tbl` (`id`, `category`, `property_name`, `property_description`, `images_url`, `highlights`, `amenities`, `location`, `packages_list`, `skills`, `experiences`, `independent_locations`, `status`, `required_documents`, `reject_reason`, `block_reason`, `created_at`) VALUES
(6, 'Restaurant', 'Mc Donalds 123 4343', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500 asdasd', '[\"68d170297d767_Web 1920 – 10.png\",\"68d170297db9b_Screenshot 2025-09-10 at 4.59.43 PM.png\",\"68d170297dfac_image (6).png\",\"68d170297e2f6_Screenshot 2025-09-02 at 4.48.38 PM.png\"]', '[{\"title\":\"Lorem\",\"description\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\"},{\"title\":\"Lorem\",\"description\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\"}]', '[\"Lorem Ipsum is simply dummy text of the printing \",\"Lorem Ipsum is simply dummy text of the printing\",\"Lorem Ipsum is simply dummy text of the printing\"]', '{\"province\":\"Palawan\",\"city\":\"City of Puerto Princesa \",\"barangay\":\"Santa Monica\",\"street\":\"Purok El Rancho\",\"zip_code\":\"5300\",\"geocode\":[9.754957367892748,118.74886388862966]}', '[{\"package_name\":\"Package 1 - Special Package\",\"no_guest\":\"10\",\"price\":\"12000\",\"inclusions\":[\"Lorem Ipsum is simply dummy text of the \",\"Lorem Ipsum is simply dummy text of the \"],\"meal_sets\":[{\"title\":\"Happy Meals\",\"meals\":[\"Burger\",\"Jolly Spag\",\"Fries\"]},{\"title\":\"Super Duper Happy Meals\",\"meals\":[\"Palabok\",\"Pampanga Sisig\",\"Red Horse Beer\"]}],\"index\":0},{\"package_name\":\"Package 2 - Wedding Anniversary Promo\",\"no_guest\":\"50\",\"price\":\"50000\",\"inclusions\":[\"Lorem Ipsum is simply dummy text\",\"Lorem Ipsum is simply dummy text \",\"Lorem Ipsum is simply dummy text \"],\"meal_sets\":[{\"title\":\"Happy Happy Meals\",\"meals\":[\"Burger\",\"Pizza\",\"Sisig Pork\"]}],\"index\":1}]', '[]', '[]', '[]', 'Blocked', '[{\"url\":\"68d1907f14530_68d173357bea7_e805422b-3f07-45ff-87d1-b997db5503f8 (2).docx\",\"name\":\"68d173357bea7_e805422b-3f07-45ff-87d1-b997db5503f8 (2).docx\",\"type\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\"},{\"url\":\"68d1907f147f9_68d173357bea7_e805422b-3f07-45ff-87d1-b997db5503f8.docx\",\"name\":\"68d173357bea7_e805422b-3f07-45ff-87d1-b997db5503f8.docx\",\"type\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\"},{\"url\":\"68d1907f14a92_placeholder (1).png\",\"name\":\"placeholder (1).png\",\"type\":\"image/png\"},{\"url\":\"68d1907f14eac_EASYVENT_FINAL_PAPER-2.pdf\",\"name\":\"EASYVENT_FINAL_PAPER-2.pdf\",\"type\":\"application/pdf\"}]', 'Rejecting this because of the madafaking shit bro', 'Fuck you!', '2025-09-22 18:08:27'),
(7, 'Independent Provider', 'Sample Ind Name', 'Test About', '[\"68c72cd092f42_Web 1920 – 21.png\",\"68c72cd0937c2_Web 1920 – 20.png\",\"68c84501bafed_Messenger_creation_F58768EF-FA18-49C9-9A1B-9F360293E4DA.jpeg\"]', '[]', '[]', '{}', '[{\"package_name\":\"Test Pack\",\"price\":\"5000\",\"inclusions\":[\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\"],\"duration\":\"2\"},{\"package_name\":\"Test Package\",\"price\":\"6000\",\"inclusions\":[\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\"],\"duration\":\"5\"}]', '[\"Skill 1\",\"Skill 2\"]', '[\"Exp 1\",\"Exp 2\"]', '[{\"province\":\"Palawan\",\"city\":\"City of Puerto Princesa \",\"barangay\":\"Bagong Sikat \",\"geocode\":[9.79238400439124,118.71251551979776],\"zip_code\":\"5300\"},{\"province\":\"Palawan\",\"city\":\"El Nido\",\"barangay\":\"Mabini\",\"zip_code\":\"2323\",\"geocode\":[11.181747828274736,119.41600214036072]}]', 'Rejected', '[]', 'Test Rejection', '', '2025-09-23 19:22:14');

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
  `date_of_birth` date NOT NULL DEFAULT current_timestamp(),
  `status` text NOT NULL,
  `role` text NOT NULL,
  `contacts` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"[]"' CHECK (json_valid(`contacts`)),
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`id`, `email`, `password`, `personal_name`, `last_name`, `display_picture`, `bio`, `date_of_birth`, `status`, `role`, `contacts`, `created_at`) VALUES
(12, 'bacolodrachel6@gmail.com', '$2y$10$WN4ps.K54.xbuIPVRIqQSe0YWYqUWz3X26DgSlY1jEtzLB16sqrXW', 'Alicred', 'Derkyyy', '68c853297f26d_Pocket_Mortys.png', 'Test biological !!!', '1999-04-08', 'Active', 'Admin', '[{\"type\":\"Mobile\",\"value\":\"09072835691\"},{\"type\":\"Landline\",\"value\":\"455-87000\"}]', '2025-09-07 18:20:59'),
(15, 'derk@gmail.com', '$2y$10$KVppu3dwgU3.Fz7qI/ZMqOd28wY5canoUpR0eAxbIYyLhnthFtIue', 'Derkyy', 'Bac', '68d15b8eabe84_Pocket_Mortys.png', '', '0000-00-00', 'Blocked', 'Provider', '[]', '2025-09-22 14:21:40');

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
(12, 6, 'Admin', 'Active'),
(12, 7, 'Admin', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings_tbl`
--
ALTER TABLE `bookings_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversations_tbl`
--
ALTER TABLE `conversations_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages_tbl`
--
ALTER TABLE `messages_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages_tbl`
--
ALTER TABLE `packages_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_tbl`
--
ALTER TABLE `services_tbl`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `conversations_tbl`
--
ALTER TABLE `conversations_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages_tbl`
--
ALTER TABLE `messages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `packages_tbl`
--
ALTER TABLE `packages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services_tbl`
--
ALTER TABLE `services_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_tbl`
--
ALTER TABLE `users_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user_invitations_tbl`
--
ALTER TABLE `user_invitations_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_providers_tbl`
--
ALTER TABLE `user_providers_tbl`
  ADD CONSTRAINT `user_providers_tbl_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `services_tbl` (`id`),
  ADD CONSTRAINT `user_providers_tbl_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users_tbl` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
