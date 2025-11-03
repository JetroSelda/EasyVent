-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 06:44 PM
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `messages_tbl`
--
ALTER TABLE `messages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `notifications_tbl`
--
ALTER TABLE `notifications_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `quick_messages_tbl`
--
ALTER TABLE `quick_messages_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services_tbl`
--
ALTER TABLE `services_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_tbl`
--
ALTER TABLE `users_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
