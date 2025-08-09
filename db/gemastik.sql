-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 09, 2025 at 08:23 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gemastik`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `prompt` text NOT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `user_id`, `prompt`, `response`, `created_at`) VALUES
(66, 24, 'apa saja yang baik dilakukan ibu hamil pada pagi hari', 'Halo! Selamat pagi! Senang sekali bisa membantu dan memberikan semangat untuk Ibu di pagi yang cerah ini. Ada banyak hal baik yang bisa Ibu lakukan di pagi hari untuk kesehatan dan kebahagiaan Ibu dan si kecil:\n\n*   **Bangun Perlahan dan dengan Lembut:** Hindari bangun terlalu cepat, karena perubahan posisi yang mendadak bisa membuat Ibu pusing. Berikan waktu sejenak untuk meregangkan tubuh dan menarik napas dalam-dalam sebelum Ibu benar-benar bangun.\n\n*   **Minum Air Putih Hangat:** Setelah bangun, minum segelas air putih hangat bisa membantu menghidrasi tubuh setelah semalaman beristirahat dan melancarkan pencernaan. Ibu bisa menambahkan sedikit perasan lemon untuk menambah kesegaran dan vitamin C.\n\n*   **Sarapan Bergizi:** Sarapan adalah makanan terpenting, apalagi untuk Ibu hamil. Pilih makanan yang kaya serat, protein, dan karbohidrat kompleks. Contohnya, oatmeal dengan buah-buahan dan kacang-kacangan, roti gandum dengan telur rebus, atau yogurt dengan granola. Hindari makanan olahan dan makanan tinggi gula.\n\n*   **Olahraga Ringan:** Jika Ibu merasa mampu, lakukan olahraga ringan seperti jalan kaki santai, yoga kehamilan, atau peregangan ringan. Olahraga pagi bisa membantu meningkatkan energi, memperbaiki suasana hati, dan melancarkan sirkulasi darah. Konsultasikan dengan dokter kandungan Ibu sebelum memulai program olahraga apapun.\n\n*   **Berjemur Sinar Matahari Pagi:** Berjemur di bawah sinar matahari pagi selama 10-15 menit bisa membantu tubuh menghasilkan vitamin D yang penting untuk kesehatan tulang dan perkembangan bayi. Lindungi kulit Ibu dengan tabir surya jika perlu.\n\n*   **Meditasi atau Mindfulness:** Luangkan waktu sejenak untuk bermeditasi atau melakukan latihan mindfulness. Ini bisa membantu Ibu merasa lebih tenang, mengurangi stres, dan meningkatkan fokus.\n\n*   **Menulis Jurnal Kehamilan:** Menulis jurnal kehamilan bisa menjadi cara yang baik untuk mencatat perkembangan kehamilan Ibu, mengungkapkan perasaan dan pikiran, serta mengabadikan momen-momen berharga.\n\n*   **Berbicara dengan Bayi:** Meskipun bayi Ibu masih kecil, Ibu bisa mulai berbicara dengannya, membacakan cerita, atau menyanyikan lagu. Ini bisa membantu mempererat ikatan antara Ibu dan bayi.\n\nYang terpenting adalah mendengarkan tubuh Ibu dan melakukan apa yang membuat Ibu merasa nyaman dan bahagia. Setiap kehamilan itu unik, jadi jangan ragu untuk menyesuaikan rutinitas pagi Ibu sesuai dengan kebutuhan dan preferensi Ibu.\n\nApakah ada hal lain yang ingin Ibu tanyakan atau ceritakan? Saya siap mendengarkan dan memberikan dukungan sepenuh hati.\n', '2025-08-07 11:19:08'),
(67, 24, 'terrimakasih', 'Sama-sama! Jangan ragu untuk bertanya apapun yang ada di pikiranmu seputar kehamilan. Saya di sini untuk membantu dan mendukungmu. Semoga kehamilanmu lancar dan menyenangkan ya! 😊\n', '2025-08-07 11:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `gizi_harian`
--

CREATE TABLE `gizi_harian` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `berat_badan` int NOT NULL,
  `waktu` enum('pagi','siang','sore','malam') DEFAULT NULL,
  `jumlah` int NOT NULL,
  `satuan` enum('gram','piring','sendok','gelas','buah','porsi') DEFAULT NULL,
  `makanan` text NOT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `kalori` int DEFAULT NULL,
  `protein` float DEFAULT NULL,
  `lemak` float DEFAULT NULL,
  `karbohidrat` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gizi_harian`
--

INSERT INTO `gizi_harian` (`id`, `user_id`, `tanggal`, `berat_badan`, `waktu`, `jumlah`, `satuan`, `makanan`, `response`, `created_at`, `kalori`, `protein`, `lemak`, `karbohidrat`) VALUES
(21, 24, '2025-08-07', 65, 'pagi', 1, 'piring', 'Nasi goreng telur beserta irisan timun', '**Analisis Gizi Singkat (Estimasi):**\n\n*   **Kalori:** ~400-500 kcal\n*   **Protein:** ~15-20 gram\n*   **Lemak:** ~20-30 gram\n*   **Karbohidrat:** ~40-60 gram\n\n**Saran Tambahan:**\n\n*   **Tambahkan sumber serat:**\n    *   Buah-buahan segar (contoh: apel, pisang, jeruk)\n    *   Sayuran hijau (contoh: bayam, brokoli)\n*   **Minuman:**\n    *   Susu hamil atau susu biasa (untuk tambahan kalsium dan protein)\n    *   Air putih (untuk hidrasi)\n*   **Camilan sehat (jika diperlukan):**\n    *   Yogurt\n    *   Kacang-kacangan\n    *   Biskuit gandum utuh\n', '2025-08-07 11:16:40', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jurnal_harian`
--

CREATE TABLE `jurnal_harian` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `tanggal` date NOT NULL,
  `mood` enum('senang','baik','biasa','sedih','marah') DEFAULT NULL,
  `keluhan` text NOT NULL,
  `response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jurnal_harian`
--

INSERT INTO `jurnal_harian` (`id`, `user_id`, `tanggal`, `mood`, `keluhan`, `response`, `created_at`) VALUES
(32, 24, '2025-08-07', 'senang', 'Saya merasa cukup tenang, tapi sedikit khawatir soal pemeriksaan minggu depan', 'Pemeriksaan minggu depan memang bisa membuat sedikit khawatir, itu sangat wajar kok. Banyak ibu hamil merasakan hal yang sama. Begini, daripada rasa khawatir itu terus menghantui, mari kita ubah jadi persiapan yang matang. \n\nCoba pikirkan, apa saja yang membuat Ibu khawatir dengan pemeriksaan minggu depan? Apakah ada hal spesifik yang ingin ditanyakan pada dokter atau bidan? Menuliskan pertanyaan-pertanyaan itu sebelumnya bisa sangat membantu lho. Dengan begitu, saat pemeriksaan, Ibu bisa lebih fokus dan tidak ada yang terlewat.\n\nSelain itu, coba ingat-ingat kembali hasil pemeriksaan sebelumnya. Apakah ada catatan khusus dari dokter atau bidan yang perlu Ibu tanyakan lebih lanjut? Mempersiapkan catatan kecil tentang riwayat kehamilan Ibu juga akan membantu dokter atau bidan memberikan saran yang lebih tepat.\n\nYang terpenting, ingatlah bahwa pemeriksaan ini bertujuan untuk memastikan Ibu dan bayi dalam keadaan sehat. Petugas kesehatan ada untuk membantu dan memberikan yang terbaik. Jadi, jangan ragu untuk bertanya apa pun yang mengganjal di pikiran Ibu.\n\nMungkin Ibu juga bisa mencoba teknik relaksasi sederhana, seperti menarik napas dalam-dalam dan menghembuskannya perlahan, atau mendengarkan musik yang menenangkan. Ini bisa membantu mengurangi rasa cemas sebelum hari pemeriksaan.\n\nJika rasa khawatir itu sangat mengganggu, jangan sungkan untuk bercerita dengan orang terdekat, seperti suami, keluarga, atau teman yang juga sedang hamil. Berbagi perasaan bisa sangat membantu meringankan beban pikiran.\n\nSemoga pemeriksaan minggu depan berjalan lancar ya, Bu! Ingat, Ibu hebat dan mampu menghadapinya.\n', '2025-08-07 11:12:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ibu_hamil','keluarga') NOT NULL,
  `hpht` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `date`, `email`, `password`, `role`, `hpht`, `created_at`) VALUES
(24, 'ariefraa', 'Arief Rachman Sahertian', '2000-01-01', 'iw8628940@gmail.com', '$2b$10$J.TYDZmR44gXHLqEr/sGKeacrRAxZDoxcDcwJFXeKS8c6xjdS0e/G', 'ibu_hamil', '2025-06-01', '2025-08-02 19:22:26');

-- --------------------------------------------------------

--
-- Table structure for table `usersgoogle`
--

CREATE TABLE `usersgoogle` (
  `id` int NOT NULL,
  `googleId` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `photo` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usersgoogle`
--

INSERT INTO `usersgoogle` (`id`, `googleId`, `name`, `email`, `photo`, `createdAt`, `updatedAt`) VALUES
(1, '112891753854634128348', 'Arief Rachman Sahertian', 'iw8628940@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIQLEUYcGMh0oyzgvmcySwQb2kW7_pNXn0jOrpVVlhN7NwCf9RB=s96-c', '2025-07-07 10:44:43', '2025-07-07 10:44:43'),
(2, '106407307403854875665', 'Arief_Rachman_Sahertian', 'arief_rachman_sahertian@teknokrat.ac.id', 'https://lh3.googleusercontent.com/a/ACg8ocJbwLJBxB_yMfRQMKuGpwlQ2QAW6zQXBms_NWAzygE_f_LcnQ=s96-c', '2025-07-07 10:49:10', '2025-07-07 10:49:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `gizi_harian`
--
ALTER TABLE `gizi_harian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `jurnal_harian`
--
ALTER TABLE `jurnal_harian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usersgoogle`
--
ALTER TABLE `usersgoogle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `googleId` (`googleId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `gizi_harian`
--
ALTER TABLE `gizi_harian`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `jurnal_harian`
--
ALTER TABLE `jurnal_harian`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `usersgoogle`
--
ALTER TABLE `usersgoogle`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gizi_harian`
--
ALTER TABLE `gizi_harian`
  ADD CONSTRAINT `gizi_harian_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jurnal_harian`
--
ALTER TABLE `jurnal_harian`
  ADD CONSTRAINT `jurnal_harian_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
