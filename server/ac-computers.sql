DROP DATABASE IF EXISTS `ac-computers-db`;
CREATE DATABASE `ac-computers-db`;
USE `ac-computers-db`;

DROP TABLE IF EXISTS `products`, `users`, `sessions`, `recovery`, `categories`, `multimedias`, `specs`, `roles`;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de sesiones
CREATE TABLE `sessions` (
    `sid` VARCHAR(60) NOT NULL PRIMARY KEY,
    `expires` DATETIME DEFAULT NULL,
    `data` TEXT DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de recuperacion de cuentas
CREATE TABLE `recoveries` (
    `recovery_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `recovery_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de roles
CREATE TABLE `roles` (
    `role_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `role_name` VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, "usuario"),
(2, "administrador");

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de usuarios
CREATE TABLE `users` (
    `user_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_name` VARCHAR(50) NOT NULL,
    `user_lastname` VARCHAR(60) NOT NULL,
    `user_email` VARCHAR(80) NOT NULL UNIQUE,
    `user_phone` DECIMAL(10, 0),
    `role_id` INT NOT NULL DEFAULT 1,
    `user_password` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`user_id`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `role_id`, `user_password`) VALUES
('7dd55767-9222-47c9-a079-4a179cf3c3a0', 'Amalia', 'Castro Ardila', 'amaliacastro78@gmail.com', 3118835868, 2, '$2b$10$0IpB6LdgICHLL1n9bRNpT.J9jYfWcpBIHYN.NnN4VhMn9.hLYohwS'),
('e479bc7a-10c8-471c-8193-59454b75d0e0', 'Andrés', 'Gutiérrez Hurtado', 'andres52885241@gmail.com', 3209202177, 2, '$2b$10$RUBCVdhvvFXb6khHZO2AMu8UAM6hsvgW3wqGT3A8un7vlAkAOrT1a');

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de categorias
CREATE TABLE `categories` (
    `category_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `category_name` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, "computador"),
(2, "componente");

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de productos
CREATE TABLE `products` (
    `product_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `product_name` VARCHAR(100) NOT NULL,
    `product_description` TEXT NOT NULL,
    `product_image_url` VARCHAR(255) NOT NULL DEFAULT "/images/products/default.jpg",
    `product_price` DECIMAL(10, 0) NOT NULL,
    `product_discount` INT NOT NULL DEFAULT 0,
    `product_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `category_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_image_url`, `product_price`, `product_discount`, `product_date`, `category_id`) VALUES
-- Computers
('348f6d78-bf0f-489a-8f61-ef6d80b61058', 'PC Torre Gamer WARZONE X', 'La PC Torre Gamer WARZONE X es la opción ideal para gamers y profesionales que buscan potencia y rendimiento excepcionales en juegos y trabajos demandantes. Con componentes de alta gama, garantiza una experiencia fluida en todo tipo de aplicaciones.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733210739/ac-computers/348f6d78-bf0f-489a-8f61-ef6d80b61058.jpg', 4449000, 11, '2024-12-03 02:25:32', 1),
('4a5ffa91-d4fe-40fe-97e3-a1104737a6a7', 'PC Torre Gamer KRATOS', 'La PC Torre Gamer KRATOS es ideal para quienes buscan un alto rendimiento en gaming y tareas exigentes, ofreciendo un balance perfecto entre velocidad, potencia gráfica y estabilidad, todo a un precio competitivo.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733211245/ac-computers/4a5ffa91-d4fe-40fe-97e3-a1104737a6a7.jpg', 3149000, 13, '2024-12-03 02:33:58', 1),
('65792e1e-1360-41ab-b10e-e0db9a2a7fca', 'PC Torre Gamer FENIX 8', 'La PC Torre Gamer FENIX 8 está diseñada para un alto rendimiento. Con el procesador AMD Ryzen 5 8600 y una potente tarjeta gráfica, ofrece la potencia necesaria para ejecutar juegos y aplicaciones pesadas con facilidad.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214061/ac-computers/65792e1e-1360-41ab-b10e-e0db9a2a7fca.jpg', 2924000, 9, '2024-12-03 03:20:53', 1),
('660992b5-8e42-4751-806f-cf05c8fb1d82', 'PC Torre Gamer Warrior R6', 'La PC Torre Gamer Warrior R6 es una excelente opción para quienes buscan un equipo con buen rendimiento y capacidad para soportar juegos y programas exigentes. Ideal para quienes buscan fiabilidad y desempeño sin sacrificar el costo.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212986/ac-computers/660992b5-8e42-4751-806f-cf05c8fb1d82.jpg', 1958000, 9, '2024-12-03 03:02:59', 1),
('79d13a36-cd2f-46b4-8a7d-65f0676f8e3c', 'PC Torre Gamer GEAR R6', 'La PC Torre Gamer GEAR R6 es ideal para quienes buscan un rendimiento sólido a un precio accesible, perfecta para gaming casual y tareas de productividad. Ofrece un rendimiento estable y duradero.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214347/ac-computers/79d13a36-cd2f-46b4-8a7d-65f0676f8e3c.jpg', 1958000, 17, '2024-12-03 03:25:40', 1),
('8567ce6b-c51e-4c8d-b649-4e5f15d423dc', 'PC Torre Gamer THOR 8', 'La PC Torre Gamer THOR 8 es una opción potente para quienes buscan un equipo con características avanzadas, ideal para usuarios que requieren alto rendimiento en juegos AAA y aplicaciones de alto nivel.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213151/ac-computers/8567ce6b-c51e-4c8d-b649-4e5f15d423dc.jpg', 2924000, 10, '2024-12-03 03:05:46', 1),
('9967564a-1ac4-4f48-95a4-ece8ada82e77', 'PC Torre Gamer ARES', 'La PC Torre Gamer ARES es ideal para gamers que buscan un equipo de alto rendimiento. Con un procesador potente y una excelente tarjeta gráfica, es perfecta para ejecutar juegos AAA y multitareas sin problemas.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214188/ac-computers/9967564a-1ac4-4f48-95a4-ece8ada82e77.jpg', 3499000, 11, '2024-12-03 03:23:01', 1),
('c2ef984b-fc48-44ba-99df-022d034c1240', 'PC Torre Gamer DARK', 'La PC Torre Gamer DARK es una excelente opción para quienes buscan rendimiento y eficiencia. Este equipo ofrece la potencia necesaria para jugar y trabajar en tareas exigentes sin comprometer la calidad.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213955/ac-computers/c2ef984b-fc48-44ba-99df-022d034c1240.jpg', 1900000, 11, '2024-12-03 03:19:08', 1),
('e783f6af-32c4-4311-bbbc-4f6b6542197c', 'PC Torre Gamer THANOS', 'La PC Torre Gamer THANOS ofrece un rendimiento increíble para gaming y multitareas. Con un procesador de última generación y una tarjeta gráfica potente, está diseñada para quienes necesitan velocidad y poder sin límites.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213390/ac-computers/e783f6af-32c4-4311-bbbc-4f6b6542197c.jpg', 4050000, 28, '2024-12-03 03:09:43', 1),
('e7b16c67-631f-462f-a0d2-68f03761b2f1', 'PC Torre GHOST PRO', 'La PC Torre GHOST PRO es una opción asequible y potente para quienes buscan un equipo para tareas diarias y gaming de nivel medio. Con una buena relación calidad-precio, es perfecta para quienes desean eficiencia a bajo costo.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212681/ac-computers/e7b16c67-631f-462f-a0d2-68f03761b2f1.jpg', 1319000, 6, '2024-12-03 02:57:53', 1),

-- Components
('0dcc4d23-f815-4417-a224-123344547219', 'Fuente XPG Pylon 750W 80+ Bronze', 'Fuente de poder de 750W con certificación 80 Plus Bronze, ideal para equipos gaming y estaciones de trabajo.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257104/ac-computers/0dcc4d23-f815-4417-a224-123344547219.png', 306000, 0, '2024-12-03 14:04:01', 2),
('297d6182-8ccb-48d4-9f30-b7a2736c32d2', 'Thermaltake View 200 TG ARGB', 'Chasis para PC ATX con panel lateral de vidrio templado y ventiladores ARGB preinstalados.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258197/ac-computers/297d6182-8ccb-48d4-9f30-b7a2736c32d2.jpg', 416000, 0, '2024-12-03 20:03:56', 2),
('2d0d648e-8492-4446-a23b-fc803c11f600', 'MSI GeForce RTX 3050 6GB', 'Tarjeta gráfica con 6GB GDDR6, ideal para juegos en 1080p con soporte para Ray Tracing.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257237/ac-computers/2d0d648e-8492-4446-a23b-fc803c11f600.jpg', 956000, 0, '2024-12-03 14:03:48', 2),
('8f30e3e7-05db-49dc-9da3-e77d0504c78c', 'Procesador AMD Ryzen 9 7900', 'CPU de alto rendimiento con 12 núcleos y 24 hilos, ideal para multitarea y juegos exigentes.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257747/ac-computers/8f30e3e7-05db-49dc-9da3-e77d0504c78c.jpg', 1989000, 0, '2024-12-03 14:03:52', 2),
('967cc582-c49e-42bf-9e0e-db4a052f568b', 'Fuente de Poder Aerocool VX650', 'Fuente de poder de 650W con certificación 80 PLUS Bronze.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258328/ac-computers/967cc582-c49e-42bf-9e0e-db4a052f568b.png', 250000, 0, '2024-12-03 20:03:14', 2),
('a8b55d93-f902-4b01-aa0d-deaf89e2de86', 'Procesador Intel Core i5-12400', 'Procesador de 6 núcleos y 12 hilos, frecuencia base de 2.5 GHz y turbo hasta 4.4 GHz.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733256108/ac-computers/a8b55d93-f902-4b01-aa0d-deaf89e2de86.jpg', 930000, 0, '2024-12-03 14:00:22', 2),
('aef6ad01-a22b-4f4b-94e8-8626dfc71888', 'SSD Kingston NV2 512GB', 'Unidad SSD M.2 NVMe de alto rendimiento y capacidad.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257362/ac-computers/aef6ad01-a22b-4f4b-94e8-8626dfc71888.jpg', 300000, 0, '2024-12-03 14:03:05', 2),
('c51a5c55-7487-4645-9016-8474174e46a9', 'Tarjeta Madre MSI B760M-P', 'Placa base compatible con procesadores Intel de 12va y 13va generación.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257507/ac-computers/c51a5c55-7487-4645-9016-8474174e46a9.jpg', 670000, 0, '2024-12-03 14:02:04', 2),
('ca913a4b-5217-467f-aa60-eeb4a9ebc63b', 'Monitor LG 34WQ75C-B UltraWide', 'Monitor ultrapanorámico de 34 pulgadas con resolución UWFHD y soporte HDR10.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257855/ac-computers/ca913a4b-5217-467f-aa60-eeb4a9ebc63b.jpg', 3089000, 0, '2024-12-03 14:04:08', 2),
('f00d98e9-d0de-4245-b181-124854362889', 'Memoria RAM Corsair Vengeance LPX 16GB', 'Módulo de memoria DDR4 de 3200 MHz, ideal para gaming y multitarea.', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257603/ac-computers/f00d98e9-d0de-4245-b181-124854362889.jpg', 380000, 0, '2024-12-03 14:02:50', 2);


-- ---------------------------------------------------------------
--
-- Tabla de Detalles de especificaciones de los productos
CREATE TABLE `specs` (
    `spec_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `spec_key` VARCHAR(20) NOT NULL,
    `spec_value` VARCHAR(50) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `specs` (`spec_id`, `spec_key`, `spec_value`, `product_id`) VALUES
('030a72f9-386f-4c9a-b2ff-e78f1c2bfa9f', 'Conectores PCIe', '2', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('0585e5d2-8ed0-4457-9f3d-ef8ccb8d7b4c', 'Procesador', 'AMD Ryzen 7 5700G', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('064add99-dc4e-423e-9767-165c2cd3d791', 'Socket', 'LGA1700', 'c51a5c55-7487-4645-9016-8474174e46a9'),
('0779a11e-052d-4ddd-a46e-047f76947bed', 'Board', 'A620M (Hasta 128GB)', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('082f6774-cf80-4ec8-81c7-45e9bdbc753f', 'Fuente de poder', '500W Reales', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('09981c7c-e989-4884-8cf2-7eb67b51ecdd', 'Chasis', 'NUEVO W69 + 7 Fan ARGB', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('09dd8e2f-43bc-4d11-a35f-15320ebffba5', 'Procesador', 'AMD Ryzen 5 5600GT 3.9GHz', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('0d0b0058-ba3b-4022-8de5-d58534f657a1', 'Fuente de poder', '600W BRONZE', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('0f34fe47-40a2-49f6-baa1-900050328183', 'Almacenamiento', 'SSD 512GB NVME', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('10addc91-74a5-434d-83f9-889749690aea', 'Certificación', '80 PLUS Bronze', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('15783656-1b03-49c3-a9e1-4f2f64f0928c', 'RAM', '16GB 3200MHz (1*16 Blindada)', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('161ac527-7f43-4c8c-8ac8-8f2298af1119', 'Chasis', 'X10', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('2608b390-e7ed-4004-b566-219fd1c4d78e', 'Resolución', 'UWFHD', 'ca913a4b-5217-467f-aa60-eeb4a9ebc63b'),
('2a428cfb-4cc6-4432-a2c2-30a51675787a', 'Procesador', 'AMD Ryzen 5 8600G 4.2GHz', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('2afef58c-3ba9-488b-9bcd-9c9d373fddfc', 'Formato', 'ATX', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('2bc7ab26-8b64-45c4-9830-877c94c558eb', 'Procesador', 'AMD RYZEN 7 8700G 4.2 GHz', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('2c5165f4-fbfc-4566-bac1-9108a5db9afd', 'Procesador', 'AMD Ryzen 5 5600X 4.6GHz', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('2db8a581-d2e7-496c-aace-1bf42d278f6e', 'Núcleos', '12', '8f30e3e7-05db-49dc-9da3-e77d0504c78c'),
('2fd07c21-cbdc-49ce-9873-6dd213336e10', 'Grafica', 'Radeon™ Graphics', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('32865542-b035-4856-a95b-6d268653b3f5', 'Almacenamiento', 'SSD 512 GB', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('342a3b0b-d37c-4da6-8ee3-4522587f34af', 'Hilos', '12', 'a8b55d93-f902-4b01-aa0d-deaf89e2de86'),
('35e76953-04f7-4bf0-9597-e5ed3134abdc', 'Procesador', 'AMD RYZEN 5 5500 3.6 GHz', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('3795570b-1b12-40ec-b3ba-401a3c050ba3', 'Capacidad', '512 GB', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('39d083e7-bf99-4188-b704-58f217a834c8', 'Fuente de poder', '600W', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('3a17f3f8-82f3-4fc0-b0a6-e8f9b6de3787', 'Frecuencia Base', '4.7 GHz', '8f30e3e7-05db-49dc-9da3-e77d0504c78c'),
('3dbdfd82-75f6-45b5-a3fe-050af532a940', 'Almacenamiento', 'SSD 500 GB M.2 4.0', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('3ebef6a3-b082-4e75-901d-8428dd2db7e3', 'Fuente de poder', '500W+ 80 White', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('429858a8-996c-42f8-883e-194dc7b639e2', 'RAM', '32GB 3200MHz (RGB 2X16)', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('45f772a1-01b7-477a-9265-db7907c18f7d', 'Formato', 'Micro-ATX', 'c51a5c55-7487-4645-9016-8474174e46a9'),
('4a6ff09c-3a25-4163-97a9-ba4f6d7e0762', 'Fuente de poder', '650W 80 Plus Bronze', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('4bac8c3f-b505-44de-9112-5e9f597c3df3', 'Certificación', '80 Plus Bronze', '0dcc4d23-f815-4417-a224-123344547219'),
('4c41a8f3-096f-4ae7-a690-ef9eb63bb255', 'Chasis', 'Iceberg Flow X + 4 Fan', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('4d56480a-c2d8-4076-bc4d-c6abf822bb23', 'Fuente de poder', '650W REAL', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('4dbb0f78-3920-4b85-80fe-bc51f18aa231', 'Material', 'Vidrio templado', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('4febb943-cae2-4ee0-bf5a-e6c3950ef91f', 'Grafica', 'Radeon™ Graphics Integrados', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('504482f1-7e86-4369-ab6f-28345a39841c', 'Procesador', 'AMD RYZEN 5 5600GT 3.9 GHz', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('5b4890c5-bbf7-4c6f-9a26-9a62be4e9f97', 'Grafica', 'Radeon™ Graphics Integrados', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('5d3ed37d-299c-49ac-b564-43e8bf90e0a0', 'Almacenamiento', 'SSD 1TB M.2', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('61e2851f-0d10-458d-8c6f-77eb793a9bb6', 'Grafica', 'Incorporados AMD Radeon 760M', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('64ba65c8-3d03-4ffa-a90a-e589deac0b86', 'Capacidad', '16 GB', 'f00d98e9-d0de-4245-b181-124854362889'),
('680fb5c0-201d-4e2b-acf7-327b127be9de', 'Chasis', 'THERMALTAKE NEGRO 4 FAN V200', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('6d2388ce-314c-420f-8258-b51de1933deb', 'Board', 'A520M (Hasta 64GB)', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('6e80d8ae-c8e6-4149-9361-dcdb0f89dace', 'Board', 'B550 Wifi y Bluetooth (Hasta 128GB)', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('71464ecb-7b3a-4635-9688-9b1da6f1f304', 'Board', 'board B550 wifi (hasta 128GB)', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('716d7486-e789-4ff8-9d95-c69122124c5e', 'Tamaño', '34 pulgadas', 'ca913a4b-5217-467f-aa60-eeb4a9ebc63b'),
('74f2b384-ce41-4dc3-8f0f-347d209f2790', 'Board', 'BOARD B550 Wifi Y Bluetooth (Hasta 128GB)', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('75417e03-0583-4c23-85db-a5076ecf3099', 'Fuente de poder', '600W BRONZE', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('7583182f-b7f2-43c6-9128-f9d22ac8dc24', 'Chasis', 'L23 6 FAN', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('7b1a7f16-7164-4ed1-961e-9de33f08d9d5', 'Grafica', 'RX 6600 8 GB', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('7b633b01-5d85-4ada-bb07-de11113ee35d', 'Chasis', 'Flow E + 4 Fan ARGB', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('7ba16bd4-353d-4517-93ab-e7b84177da5b', 'Almacenamiento', 'SSD 1TB M.2', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('7bd1560f-897f-4855-9c4a-2bc887b96811', 'Chasis', 'X18 Malla', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('7e0c90ca-70c3-43ea-b4fe-854dba9b3e51', 'Núcleos', '6', 'a8b55d93-f902-4b01-aa0d-deaf89e2de86'),
('8079974c-e83f-4a0f-af14-ff401786db96', 'RAM', 'DDR4 16GB 3200MHz (1X16 Blindada)', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('815efdf0-e973-4ebb-9b16-e134fb0ba4d4', 'Almacenamiento', 'SSD 512 GB M.2', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('87e01c2c-8436-4bd3-b0e3-d1cac18a8b33', 'RAM soportada', 'DDR4 hasta 128 GB', 'c51a5c55-7487-4645-9016-8474174e46a9'),
('8d1bd3d5-9900-4cd8-8a60-778d110e581b', 'Rendimiento', '1080p, Ray Tracing', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('8dad3ff7-e6ac-4e27-9697-c840f3733f58', 'Almacenamiento', 'SSD 512 GB M.2', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('8ded16f1-1b9d-4de6-b8ce-6c4d6af14403', 'Socket', 'LGA1700', 'a8b55d93-f902-4b01-aa0d-deaf89e2de86'),
('90a5974e-a311-47b1-9780-5a3fe4a66b40', 'Grafica', 'Radeon™ Vega 8 Graphics Integrados 2000 MHz', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('9184153d-e723-45ba-93ba-841bf42f988c', 'RAM', '16GB 3200MHz Blindada (2X8 Blindada)', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('92f0f4c3-d17a-4341-93d3-5398adc0804a', 'Frecuencia máxima', '4.4 GHz', 'a8b55d93-f902-4b01-aa0d-deaf89e2de86'),
('92fe1f7a-41d9-45dd-b08e-a778238dcbfd', 'RAM', 'DDR4 16GB 3200MHz (1X16 Blindada)', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('935b583a-4378-4217-b8fe-a9183b68b564', 'RAM', 'DDR5 16GB 5200MHz Blindada', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('95d0b53d-db62-4273-85ac-ada856eecfaa', 'RAM', '32GB 3200MHz (RGB 2x16)', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('9606c6f4-be25-4447-9df7-b84f7828d3df', 'RAM', 'DDR4 16GB 3200MHz (1X16)', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('9c580419-feea-4816-acc7-340fb2efb9f5', 'Board', 'B550 Wifi y Bluetooth (Hasta 128GB)', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('9d2c58d2-277c-434f-8064-4fe846c8eb3a', 'Fuente de poder', '600W', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('9eaab77a-b2cc-4b0c-8d39-00c6c24e09ff', 'Grafica', '8GB GeForce RTX 4060', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('9ebae9c2-b9a7-4609-a463-8d42c9e8f82d', 'Board', 'B650M (Hasta 128GB) WIFI', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('a0cb6bdd-6e04-4e8a-9273-2d5d2912782f', 'Fuente de poder', '700W 80 PLUS WHITE', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('a918f7f8-3971-43fb-a6bf-2a66e329e399', 'HDR', 'HDR10', 'ca913a4b-5217-467f-aa60-eeb4a9ebc63b'),
('a94c132c-1d82-4e16-a1c9-a6cefaa4f42d', 'Chasis', 'COUGAR ARCHON 3 fan RGB', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('ab6fdc98-ee99-4818-b336-baa6796fa2ae', 'Fuente de poder', '550W+ 80 Bronze', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('ac7f2d34-0b1b-4716-b537-3b7cdc50131c', 'Procesador', 'AMD RYZEN 5 5600X 4.5 GHz', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('ad11b895-68bc-45c0-a608-91c1156b04e2', 'Conectividad', 'HDMI, DisplayPort', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('ae18abbd-91d3-42aa-92b5-6831ca0fa24e', 'Hilos', '24', '8f30e3e7-05db-49dc-9da3-e77d0504c78c'),
('ae8c48a3-3dc1-4207-a87a-5d0c2222637c', 'Board', 'A520M (Hasta 64GB)', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('b11ca61c-5c0d-4970-91d8-61483cce2227', 'Grafica', 'GeForce RTX 3050 8GB', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('b33641ad-d66a-4b5d-b8d6-0691863d9ced', 'RAM', 'DDR5 16GB 5600MHz Blindada', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('b36be344-5f3e-42f3-a21b-9752f90f3016', 'Board', 'BOARD B550 (Hasta 128GB) WIFI Y BLUETOOTH', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('b3b6d365-5fce-4acc-b934-216583e320d5', 'Interfaz', 'NVMe PCIe Gen 3.0', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('b4cbc47f-ee95-40aa-b94b-49c0b979a620', 'Procesador', 'AMD RYZEN 5 4600G 3.7 GHz', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('b6a7d425-1524-492c-a61d-d51e3b2f7013', 'Chasis', 'W69 7 FAN ARGB', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('be6d2e03-e5ef-4fbd-8e91-5e5bf610ea45', 'Formato', 'DIMM', 'f00d98e9-d0de-4245-b181-124854362889'),
('c6e7abfe-ded3-4725-8f5a-ab0a3efd2a4c', 'Procesador', 'AMD Ryzen 7 5700X + Disipador RGB', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('c7a4617a-47db-41b2-8946-29f7a0cf1c73', 'Ventiladores', '3x 120mm ARGB', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('c8bb6c36-7f2b-4748-a895-12c515e1a7c4', 'Board', 'B550M 4 SLOT Wifi y Bluetooth (Hasta 128GB)', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('d2820d89-f6af-4439-a4b2-fb180939ea8e', 'Modularidad', 'No modular', '0dcc4d23-f815-4417-a224-123344547219'),
('d45e61aa-56e9-4a1b-b9f0-91561e38cbf9', 'RAM', '16GB 3200MHz (1X16 RGB)', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('dad8fbd3-e91d-49a5-b6d8-8e7762f4ee5c', 'Potencia', '750W', '0dcc4d23-f815-4417-a224-123344547219'),
('de534116-7a97-4857-8f4c-29834361905c', 'Almacenamiento', 'SSD 500 GB SATA', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('e07b80ae-d8e9-4066-96bc-a10e0fe87f42', 'Memoria', '6GB GDDR6', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('e60da387-e391-4bd9-9042-0114a5b377bc', 'Grafica', 'RTX 3050 DE 6 GB', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('ec178886-45c2-4071-a5c0-0710efb774e6', 'Almacenamiento', 'SSD 500GB M.2', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('f0d2ea5b-139a-48f8-bf13-c107630de883', 'Formato', 'M.2 2280', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('f4b237e5-e846-479d-87cf-3447946dca8f', 'Chasis', 'TURBO Z9 + 4 Fan ARGB', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('f517533f-9864-4cc0-8c96-0b7bf70c9580', 'Grafica', 'Incorporados AMD Radeon 780M', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('f7bb26e2-f204-4188-96be-8b60ef4c8432', 'Velocidad', '3200 MHz', 'f00d98e9-d0de-4245-b181-124854362889'),
('faa0c3ba-b7a6-422f-967d-3b468492bf75', 'Potencia', '650W', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('fcd7d33c-3c31-4187-a53e-b7e37dc7fe5f', 'Almacenamiento', 'SSD 512GB M.2', '9967564a-1ac4-4f48-95a4-ece8ada82e77');

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de los archivos multimedia
CREATE TABLE `multimedias` (
    `media_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `media_url` VARCHAR(255) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `multimedias` (`media_id`, `media_url`, `product_id`) VALUES
('0ebc4901-788e-41bb-a88c-207c77b2cb07', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257238/ac-computers/medias/0ebc4901-788e-41bb-a88c-207c77b2cb07.jpg', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('11663bcb-7d30-487d-ac74-e447f0c6eaa2', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257508/ac-computers/medias/11663bcb-7d30-487d-ac74-e447f0c6eaa2.jpg', 'c51a5c55-7487-4645-9016-8474174e46a9'),
('14bb8a16-4ee6-4de1-ba76-5e0cdc67988d', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257856/ac-computers/medias/14bb8a16-4ee6-4de1-ba76-5e0cdc67988d.jpg', 'ca913a4b-5217-467f-aa60-eeb4a9ebc63b'),
('14ed9ce9-7934-4526-9f30-23ebc6141951', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733210740/ac-computers/medias/14ed9ce9-7934-4526-9f30-23ebc6141951.png', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('18ca4122-43bf-456c-be76-43e198bfc925', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257363/ac-computers/medias/18ca4122-43bf-456c-be76-43e198bfc925.jpg', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('18dc147e-546b-44b0-803b-f0cf10b38bc0', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258329/ac-computers/medias/18dc147e-546b-44b0-803b-f0cf10b38bc0.png', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('199d3133-adfd-4ba7-b1f5-4dde21141cfe', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213155/ac-computers/medias/199d3133-adfd-4ba7-b1f5-4dde21141cfe.jpg', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('1d5544cb-24c7-48fb-b375-460e9545cb77', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258330/ac-computers/medias/1d5544cb-24c7-48fb-b375-460e9545cb77.png', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('2c30bd7d-b319-4d79-879b-effa556f341b', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257363/ac-computers/medias/2c30bd7d-b319-4d79-879b-effa556f341b.jpg', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('39feebce-dc3e-4880-b1eb-2f3657ea42c1', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257509/ac-computers/medias/39feebce-dc3e-4880-b1eb-2f3657ea42c1.png', 'c51a5c55-7487-4645-9016-8474174e46a9'),
('41d5d671-3067-41c8-8c8a-99f6dbffb4fe', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213392/ac-computers/medias/41d5d671-3067-41c8-8c8a-99f6dbffb4fe.jpg', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('4739ab87-8988-4eb8-8528-ac0771bbc3d4', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257363/ac-computers/medias/4739ab87-8988-4eb8-8528-ac0771bbc3d4.jpg', 'aef6ad01-a22b-4f4b-94e8-8626dfc71888'),
('4d8bf816-2320-4009-bfdc-859b645dedb5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212988/ac-computers/medias/4d8bf816-2320-4009-bfdc-859b645dedb5.png', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('4ed90e24-a4bf-41a8-9559-626b821a6cad', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257856/ac-computers/medias/4ed90e24-a4bf-41a8-9559-626b821a6cad.jpg', 'ca913a4b-5217-467f-aa60-eeb4a9ebc63b'),
('4f8446a4-a10d-41be-b226-d52704ef0970', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213392/ac-computers/medias/4f8446a4-a10d-41be-b226-d52704ef0970.jpg', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('54d64ccc-6f5b-4835-ad64-f1fe819712e6', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257106/ac-computers/medias/54d64ccc-6f5b-4835-ad64-f1fe819712e6.jpg', '0dcc4d23-f815-4417-a224-123344547219'),
('5c5f584f-eba4-493c-b5ad-069e589156f5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213392/ac-computers/medias/5c5f584f-eba4-493c-b5ad-069e589156f5.png', 'e783f6af-32c4-4311-bbbc-4f6b6542197c'),
('638f91d6-efef-4a4f-b303-961799fbe726', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214062/ac-computers/medias/638f91d6-efef-4a4f-b303-961799fbe726.png', '65792e1e-1360-41ab-b10e-e0db9a2a7fca'),
('7535e342-59d0-4ac4-b1bd-3921bc0906a6', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212681/ac-computers/medias/7535e342-59d0-4ac4-b1bd-3921bc0906a6.jpg', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('7576bbfa-6c21-490b-a614-ed32ddd3b18d', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214189/ac-computers/medias/7576bbfa-6c21-490b-a614-ed32ddd3b18d.jpg', '9967564a-1ac4-4f48-95a4-ece8ada82e77'),
('8d737ed5-ef90-4e73-925d-3184c3cf3d88', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257604/ac-computers/medias/8d737ed5-ef90-4e73-925d-3184c3cf3d88.jpg', 'f00d98e9-d0de-4245-b181-124854362889'),
('9058d2f1-b90e-4695-bf42-ce840a47a3a5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733211246/ac-computers/medias/9058d2f1-b90e-4695-bf42-ce840a47a3a5.jpg', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('956130a7-d30a-4ae0-a43b-41321501c2ba', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733211246/ac-computers/medias/956130a7-d30a-4ae0-a43b-41321501c2ba.jpg', '4a5ffa91-d4fe-40fe-97e3-a1104737a6a7'),
('9ca3816a-1c82-4b4c-9811-c16c05aed694', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212682/ac-computers/medias/9ca3816a-1c82-4b4c-9811-c16c05aed694.jpg', 'e7b16c67-631f-462f-a0d2-68f03761b2f1'),
('9d6ffb27-f890-4f65-ac6c-1d1ce6718373', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214349/ac-computers/medias/9d6ffb27-f890-4f65-ac6c-1d1ce6718373.png', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('a1002ad1-fb0a-4cd4-b4c4-843705e961a1', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213956/ac-computers/medias/a1002ad1-fb0a-4cd4-b4c4-843705e961a1.jpg', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('a6b31e22-b08b-4204-8b98-6eef5435dc79', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258198/ac-computers/medias/a6b31e22-b08b-4204-8b98-6eef5435dc79.jpg', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('b38218f7-421c-4b8d-9599-fdae712f77ff', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213159/ac-computers/medias/b38218f7-421c-4b8d-9599-fdae712f77ff.jpg', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('b6e8527e-6f14-472c-ad7e-d5d7121e328e', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733210740/ac-computers/medias/b6e8527e-6f14-472c-ad7e-d5d7121e328e.jpg', '348f6d78-bf0f-489a-8f61-ef6d80b61058'),
('c202c10a-7a65-4d8b-9ba0-d2c4d6bb6137', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257238/ac-computers/medias/c202c10a-7a65-4d8b-9ba0-d2c4d6bb6137.jpg', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('c401311a-7db1-46ce-adf3-0243ac53ea1c', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213156/ac-computers/medias/c401311a-7db1-46ce-adf3-0243ac53ea1c.jpg', '8567ce6b-c51e-4c8d-b649-4e5f15d423dc'),
('c4a3a10d-9179-4d66-89ef-1f6b13fb9624', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258330/ac-computers/medias/c4a3a10d-9179-4d66-89ef-1f6b13fb9624.png', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('cc7d2476-328d-4024-a079-983a56f69730', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257748/ac-computers/medias/cc7d2476-328d-4024-a079-983a56f69730.jpg', '8f30e3e7-05db-49dc-9da3-e77d0504c78c'),
('d89b0606-88af-4a4e-bc2e-4967fd1a4df3', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257604/ac-computers/medias/d89b0606-88af-4a4e-bc2e-4967fd1a4df3.jpg', 'f00d98e9-d0de-4245-b181-124854362889'),
('dbd1467a-c7f5-4de6-8b6f-da667437f28b', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733212988/ac-computers/medias/dbd1467a-c7f5-4de6-8b6f-da667437f28b.jpg', '660992b5-8e42-4751-806f-cf05c8fb1d82'),
('e6feac3c-5a40-40d3-b485-2499608b45fa', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258330/ac-computers/medias/e6feac3c-5a40-40d3-b485-2499608b45fa.png', '967cc582-c49e-42bf-9e0e-db4a052f568b'),
('f2bc6e96-9e7b-41ab-86b9-e28f878f63c5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257238/ac-computers/medias/f2bc6e96-9e7b-41ab-86b9-e28f878f63c5.jpg', '2d0d648e-8492-4446-a23b-fc803c11f600'),
('f487cb04-7b2c-4976-9b68-d83ca80f7177', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733213956/ac-computers/medias/f487cb04-7b2c-4976-9b68-d83ca80f7177.jpg', 'c2ef984b-fc48-44ba-99df-022d034c1240'),
('f76f72e7-a598-44de-9d31-025d47056ef2', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258198/ac-computers/medias/f76f72e7-a598-44de-9d31-025d47056ef2.jpg', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('f800f350-32b5-45cc-870d-2be3253223eb', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733257748/ac-computers/medias/f800f350-32b5-45cc-870d-2be3253223eb.jpg', '8f30e3e7-05db-49dc-9da3-e77d0504c78c'),
('fa1309ec-73cc-487a-a08c-8fb3ee696d5d', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214348/ac-computers/medias/fa1309ec-73cc-487a-a08c-8fb3ee696d5d.jpg', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('fb90b0ff-0608-4e16-8065-d37424701fe9', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733258198/ac-computers/medias/fb90b0ff-0608-4e16-8065-d37424701fe9.jpg', '297d6182-8ccb-48d4-9f30-b7a2736c32d2'),
('ff179eb7-114d-45c0-b14a-e6ed2455310e', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214348/ac-computers/medias/ff179eb7-114d-45c0-b14a-e6ed2455310e.jpg', '79d13a36-cd2f-46b4-8a7d-65f0676f8e3c'),
('ff85744e-e758-46a4-8d1c-acced74a52f9', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1733214189/ac-computers/medias/ff85744e-e758-46a4-8d1c-acced74a52f9.jpg', '9967564a-1ac4-4f48-95a4-ece8ada82e77');

ALTER TABLE `recoveries`
ADD CONSTRAINT `fk_recoveries_users`
FOREIGN KEY (`user_id`)
REFERENCES `users` (`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `users`
ADD CONSTRAINT `fk_users_roles`
FOREIGN KEY (`role_id`)
REFERENCES `roles` (`role_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `products`
ADD CONSTRAINT `fk_products_categories`
FOREIGN KEY (`category_id`)
REFERENCES `categories` (`category_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `specs`
ADD CONSTRAINT `fk_specs_products`
FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `multimedias`
ADD CONSTRAINT `fk_multimedias_products`
FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;
