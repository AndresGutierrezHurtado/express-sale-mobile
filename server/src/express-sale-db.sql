DROP DATABASE IF EXISTS `express-sale-db`;
CREATE DATABASE `express-sale-db`;
USE `express-sale-db`;

DROP TABLE IF EXISTS `users`, `recoveries`, `workers`, `roles`, `products`, `categories`, `ratings`, `user_ratings`, `product_ratings`, `medias`, `orders`, `payment_details`, `shipping_details`, `order_products`, `sessions`;

-- ---------------------------------------------------------------
-- Sessions Table
CREATE TABLE `sessions` (
  `sid` VARCHAR(36) NOT NULL,
  `expires` DATETIME DEFAULT NULL,
  `data` TEXT DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------
-- Password Recovery Table
CREATE TABLE `recoveries` (
    `recovery_id` VARCHAR(60) PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `recovery_status` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    `recovery_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `recovery_expiration` TIMESTAMP NOT NULL DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Roles Table
CREATE TABLE `roles` (
    `role_id` INT PRIMARY KEY AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'usuario'),
(2, 'vendedor'),
(3, 'domiciliario'),
(4, 'administrador');

-- ---------------------------------------------------------------
-- Categories Table
CREATE TABLE `categories` (
    `category_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `category_name` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'moda'),
(2, 'comida'),
(3, 'tecnologia'),
(4, 'otros');

-- ---------------------------------------------------------------
-- Users Table
CREATE TABLE `users` (
    `user_id` VARCHAR(60) PRIMARY KEY NOT NULL,
    `user_name` VARCHAR(100) NOT NULL,
    `user_lastname` VARCHAR(100) NOT NULL,
    `user_email` VARCHAR(255) UNIQUE NOT NULL,
    `user_alias` VARCHAR(50) NOT NULL,
    `user_phone` DECIMAL(10, 0),
    `user_address` TEXT,
    `user_password` TEXT NOT NULL,
    `user_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `user_update` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `user_image_url` VARCHAR(255) DEFAULT '/images/default.jpg',
    `role_id` INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`user_id`, `user_name`, `user_lastname`, `user_email`, `user_alias`, `user_phone`, `user_address`, `user_password`, `user_date`, `user_update`, `user_image_url`, `role_id`) VALUES
('a30cd113-2e9a-4e8b-87f2-7cb7e27ff27f', 'Express', 'Sale', 'expresssale.exsl@gmail.com', 'Express_Sale', NULL, NULL, '$2a$10$LLVuZDAM7c5rwvuDdbqIJumcy1tIAbWCNFO4DxB6KLCYaqqQ7wbKW', '2024-01-17 09:23:43', '2024-10-31 07:17:28', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730359052/express-sale/users/a30cd113-2e9a-4e8b-87f2-7cb7e27ff27f.jpg', 4),
('1997e4d2-fa0d-4cdd-b7a1-f970570a813e', 'Andrés', 'Gutiérrez Hurtado', 'andres52885241@gmail.com', 'Andres_Gutierrez', 3209202177, 'Dg. 68D Sur #70c-31, Bogotá, Colombia', '$2a$10$mwjk.9LQkXn0Q/OtdB5k6uZU6Diaw07lzT.75hx9O/1bbDwwEzYIW', '2024-02-13 09:23:50', '2024-10-31 07:16:44', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730359008/express-sale/users/1997e4d2-fa0d-4cdd-b7a1-f970570a813e.jpg', 2),
('1dc76732-83ea-4a78-afb8-e759959ee5c3', 'David Fernando', 'Diaz Niausa', 'davidfernandodiazniausa@gmail.com', 'David_Diaz', 3214109557, 'Cra. 5i Este #89-23, Bogotá, Colombia', '$2a$10$aNvO8Br.5mKKqpzNAuoO4umUP0ZRB..dFtttiA3n7DObEN/x1cW/y', '2024-03-13 09:23:54', '2024-10-31 07:17:43', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730359067/express-sale/users/1dc76732-83ea-4a78-afb8-e759959ee5c3.jpg', 2),
('b015e026-c217-4c39-962e-4d477c3640c9', 'Juan Sebastian', 'Bernal Gamboa', 'juansebastianbernalgamboa@gmail.com', 'Juan_Bernal', 3053964455, 'Cra. 5i Este #89-23, Bogotá, Colombia', '$2a$10$g0iPipqxpIAsbFdHXEW3femJivexGekXSXrc2EHICLfdipOZVsP7G', '2024-04-15 09:24:02', '2024-10-31 07:18:05', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730359088/express-sale/users/b015e026-c217-4c39-962e-4d477c3640c9.jpg', 2),
('e7864790-7e10-4af8-af5f-67b1af7cc1f6', 'Jaider Harley', 'Rondon Herrera', 'rondonjaider@gmail.com', 'Jaider_Rondon', 3112369205, 'Cra. 5i Este #89-23, Bogotá, Colombia', '$2a$10$QjOD1CqPAYG/eyzzy2neneB50f78LmQqqirNg.Sv4gfTL1efYEpBO', '2024-05-05 09:23:57', '2024-10-31 07:18:17', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730359101/express-sale/users/e7864790-7e10-4af8-af5f-67b1af7cc1f6.jpg', 2),
('2078ad6a-1373-4940-90a0-bf4bf1228e73', 'Samuel', 'Useche Chaparro', 'samuuseche01@gmail.com', 'Samuel_Useche', 3107838443, 'Cl. 68f Sur #71g-82, Bogotá, Colombia', '$2a$10$XWDYW/hzBQuStDg4WTyUn.N2lH3VloZVx2.U4raQ.FkCfWQsmt3N.', '2024-06-13 09:24:10', '2024-05-02 09:24:10', '/images/default.jpg', 3),
('764ca4c3-b387-4be5-ab11-8d39db2e99af', 'Kevin Alejandro', 'Parra Cifuentes', 'luisparra5380@gmail.com', 'Kevin_Parra', 'Cra. 19b #62a Sur, Bogotá, Colombia', 3212376552, '$2a$10$wRvGOuETCvUYQvJx9K/2t.LwY4DG6/l5SE6UX7vTDQavIvahS1EO6', '2024-07-14 09:24:19', '2024-10-13 09:24:19', '/images/default.jpg', 1),
('7d7aa315-f996-4316-8af4-86fe4786ce4b', 'Wendy Alejandra', 'Navarro Arias', 'nwendy798@gmail.com', 'Wendy_Navarro', 3044462452, 'Dg. 69 Sur #68-20, Bogotá, Colombia', '$2a$10$z1yVOAC4MEPVxGl4WjQQmeX078Rq7eJEfE9UOyYSVLj79FlsYSBlq', '2024-09-22 09:26:37', '2024-10-13 09:26:37', '/images/default.jpg', 1);

-- ---------------------------------------------------------------
-- Workers Table
CREATE TABLE `workers` (
    `worker_id` VARCHAR(60) PRIMARY KEY,
    `worker_description` TEXT NOT NULL DEFAULT 'usuario nuevo.',
    `worker_balance` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `user_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `workers` (`worker_id`, `worker_description`, `worker_balance`, `user_id`) VALUES
('3439d1be-f5ee-4a34-98e7-accec2eb1729', 'usuario nuevo.', 0, '1997e4d2-fa0d-4cdd-b7a1-f970570a813e'), -- Andrés Gutiérrez
('5a5c533d-55f8-469e-b3a3-724deba8c0ad', 'usuario nuevo.', 0, '1dc76732-83ea-4a78-afb8-e759959ee5c3'), -- David Fernando Diaz
('285dd857-d030-4f90-a193-5383500b0963', 'usuario nuevo.', 0, 'e7864790-7e10-4af8-af5f-67b1af7cc1f6'), -- Jaider Rondon
('0b89b820-4c52-4ebd-aa4f-18262eac02db', 'usuario nuevo.', 0, 'b015e026-c217-4c39-962e-4d477c3640c9'), -- Juan Bernal
('4859698d-85f6-4e33-a668-c10a7d2a5a2d', 'usuario nuevo.', 0, '2078ad6a-1373-4940-90a0-bf4bf1228e73'); -- Samuel Useche

-- ---------------------------------------------------------------
-- Withdrawals Table
CREATE TABLE `withdrawals` (
    `withdrawal_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `worker_id` VARCHAR(60) NOT NULL,
    `withdrawal_amount` DECIMAL(10, 2) NOT NULL,
    `withdrawal_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Products Table
CREATE TABLE `products` (
    `product_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `product_name` VARCHAR(255) NOT NULL,
    `product_description` TEXT NOT NULL,
    `product_quantity` INT NOT NULL,
    `product_price` DECIMAL(10, 0) NOT NULL,
    `product_image_url` VARCHAR(255) NOT NULL DEFAULT '/images/default.jpg',
    `product_status` ENUM('privado', 'publico') NOT NULL DEFAULT 'publico',
    `product_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` VARCHAR(60) NOT NULL,
    `category_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_quantity`, `product_price`, `product_image_url`, `product_status`, `product_date`, `user_id`, `category_id`) VALUES
('09fd4c7b-cd37-4e6d-a7f6-ae8f93734005', 'Rubik`s Cube', 'El clásico cubo de Rubik, con su diseño de colores vivos y su desafiante mecánica, es uno de los rompecabezas más populares y reconocidos del mundo.', 15, 15000, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360610/express-sale/products/09fd4c7b-cd37-4e6d-a7f6-ae8f93734005.jpg', 'publico', '2024-10-13 09:31:52', '1997e4d2-fa0d-4cdd-b7a1-f970570a813e', 4),
('10014419-f396-4639-925f-2b0814aa81f3', 'Nike Air Jordan 1', 'Las icónicas zapatillas Nike Air Jordan 1 son un clásico atemporal en el mundo de la moda urbana, conocidas por su estilo y comodidad.', 15, 289900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360004/express-sale/products/10014419-f396-4639-925f-2b0814aa81f3.jpg', 'publico', '2024-10-13 09:36:21', '1dc76732-83ea-4a78-afb8-e759959ee5c3', 1),
('56a133ce-d6b7-4d63-9564-9fa656232efa', 'Megaplex | Creatine Power', 'Suplemento de proteína en polvo de alta calidad, ideal para la recuperación muscular y el crecimiento después del entrenamiento.', 10, 59900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360834/express-sale/products/56a133ce-d6b7-4d63-9564-9fa656232efa.png', 'publico', '2024-10-13 09:31:07', '1997e4d2-fa0d-4cdd-b7a1-f970570a813e', 4),
('5d34b009-ce5b-4e20-950c-9b89dc4b09ae', 'KitKat', 'El delicioso chocolate KitKat, con sus característicos barquillos y su irresistible sabor, es el snack perfecto para disfrutar en cualquier momento del día.', 28, 4000, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360750/express-sale/products/5d34b009-ce5b-4e20-950c-9b89dc4b09ae.jpg', 'publico', '2024-10-13 09:33:06', 'b015e026-c217-4c39-962e-4d477c3640c9', 2),
('662c229a-a176-4f98-b3e1-0b3bb60ff5e0', 'PlayStation 5', 'La PlayStation 5 es la consola de última generación de Sony, que ofrece gráficos impresionantes, carga ultrarrápida y una amplia variedad de juegos exclusivos.', 12, 4599900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360694/express-sale/products/662c229a-a176-4f98-b3e1-0b3bb60ff5e0.jpg', 'publico', '2024-10-13 09:34:59', 'e7864790-7e10-4af8-af5f-67b1af7cc1f6', 3),
('8c468cdc-7cf2-4ffa-99e2-b4e8310fc715', 'Xbox Series X', 'La Xbox Series X ofrece potencia de próxima generación, velocidades de carga ultrarrápidas y una amplia biblioteca de juegos para una experiencia de juego inigualable.', 13, 3599900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360678/express-sale/products/8c468cdc-7cf2-4ffa-99e2-b4e8310fc715.png', 'publico', '2024-10-13 09:33:56', 'e7864790-7e10-4af8-af5f-67b1af7cc1f6', 3),
('a9458fa5-cc05-4a77-a1dc-9ff1378b1465', 'Casio G-Shock GA-2100', 'El reloj Casio G-Shock GA-2100 es conocido por su resistencia y estilo, con características como resistencia a golpes, al agua y un diseño moderno y elegante.', 10, 224000, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360642/express-sale/products/a9458fa5-cc05-4a77-a1dc-9ff1378b1465.jpg', 'publico', '2024-10-13 09:36:30', '1dc76732-83ea-4a78-afb8-e759959ee5c3', 1),
('b0beb7fb-57b5-4881-a29f-c86581dbae19', 'Mancuernas Ajustables', 'Un par de mancuernas ajustables con diferentes pesos, perfectas para entrenamiento de fuerza en casa o en el gimnasio.', 8, 89900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360593/express-sale/products/b0beb7fb-57b5-4881-a29f-c86581dbae19.jpg', 'publico', '2024-10-13 09:31:30', '1997e4d2-fa0d-4cdd-b7a1-f970570a813e', 4),
('ddc2a91d-65b6-4316-9222-84cde0759911', 'Nutella', 'La crema de avellanas Nutella, con su textura suave y su sabor dulce, es un imprescindible en el desayuno de millones de personas en todo el mundo.', 22, 7000, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360734/express-sale/products/ddc2a91d-65b6-4316-9222-84cde0759911.jpg', 'publico', '2024-10-13 09:32:50', 'b015e026-c217-4c39-962e-4d477c3640c9', 2),
('e359851d-9813-463f-aff9-3a552a887134', 'Cadena Cubana de Plata', 'Una cadena cubana de plata es un accesorio clásico y llamativo que puede complementar cualquier atuendo, ya sea casual o más elegante.', 9, 31200, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360627/express-sale/products/e359851d-9813-463f-aff9-3a552a887134.jpg', 'publico', '2024-10-13 09:36:50', '1dc76732-83ea-4a78-afb8-e759959ee5c3', 1),
('e3e3e594-5c65-433f-a4a3-94f75dd4aef9', 'Galletas Oreo', 'Las deliciosas galletas Oreo, con su crujiente galleta y su cremoso relleno de vainilla, son un clásico de la merienda que gusta a niños y adultos por igual.', 40, 26900, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360709/express-sale/products/e3e3e594-5c65-433f-a4a3-94f75dd4aef9.jpg', 'publico', '2024-10-13 09:32:41', 'b015e026-c217-4c39-962e-4d477c3640c9', 2),
('fba1a2fb-3e81-447e-adf5-e984682d700d', 'iPhone 13 Pro', 'El iPhone 13 Pro es el último modelo de Apple que combina un diseño elegante con un rendimiento potente y cámaras avanzadas para capturar imágenes impresionantes.', 8, 2100000, 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1730360661/express-sale/products/fba1a2fb-3e81-447e-adf5-e984682d700d.jpg', 'publico', '2024-10-13 09:35:12', 'e7864790-7e10-4af8-af5f-67b1af7cc1f6', 3);

-- ---------------------------------------------------------------
-- Ratings Table
CREATE TABLE `ratings` (
    `rating_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `rating_comment` TEXT NOT NULL,
    `rating_image_url` VARCHAR(255),
    `rating_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `rating_value` INT NOT NULL,
    `user_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- User Ratings Table
CREATE TABLE `user_ratings` (
    `rating_id` VARCHAR(60) NOT NULL,
    `user_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Product Ratings Table
CREATE TABLE `product_ratings` (
    `rating_id` VARCHAR(60) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Media Files Table
CREATE TABLE `medias` (
    `media_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `media_url` VARCHAR(255) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `medias` (`media_id`, `media_url`, `product_id`) VALUES
('024d534c-809d-435d-9bbb-6a242c42ee89', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254748/express-sale/products/multimedia/024d534c-809d-435d-9bbb-6a242c42ee89.jpg', 'fba1a2fb-3e81-447e-adf5-e984682d700d'),
('03714d14-fb11-4f85-8354-617fb3d883b8', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254522/express-sale/products/multimedia/03714d14-fb11-4f85-8354-617fb3d883b8.jpg', 'e359851d-9813-463f-aff9-3a552a887134'),
('19d8eeb6-2bf2-49cc-9d42-7f2c54bf9096', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253817/express-sale/products/multimedia/19d8eeb6-2bf2-49cc-9d42-7f2c54bf9096.jpg', '10014419-f396-4639-925f-2b0814aa81f3'),
('25128d40-9b67-47e5-853e-d603f38c6460', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254401/express-sale/products/multimedia/25128d40-9b67-47e5-853e-d603f38c6460.jpg', 'b0beb7fb-57b5-4881-a29f-c86581dbae19'),
('2a4bd8e4-a227-44f1-b989-6a00c10f4ec5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254577/express-sale/products/multimedia/2a4bd8e4-a227-44f1-b989-6a00c10f4ec5.jpg', 'e359851d-9813-463f-aff9-3a552a887134'),
('3aeeccf9-9488-4250-90b6-35472ecfa17f', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253817/express-sale/products/multimedia/3aeeccf9-9488-4250-90b6-35472ecfa17f.jpg', '10014419-f396-4639-925f-2b0814aa81f3'),
('3dbf4471-ebde-4365-9409-794b681a006a', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254192/express-sale/products/multimedia/3dbf4471-ebde-4365-9409-794b681a006a.jpg', '8c468cdc-7cf2-4ffa-99e2-b4e8310fc715'),
('4ab47714-66ff-477b-9298-7a483823e926', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253956/express-sale/products/multimedia/4ab47714-66ff-477b-9298-7a483823e926.jpg', '662c229a-a176-4f98-b3e1-0b3bb60ff5e0'),
('4b30c14d-eb5a-4342-9ed0-9ad7b51c0031', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253817/express-sale/products/multimedia/4b30c14d-eb5a-4342-9ed0-9ad7b51c0031.jpg', '10014419-f396-4639-925f-2b0814aa81f3'),
('54db3afb-a0aa-4280-b2ab-510fb9ecefe4', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254286/express-sale/products/multimedia/54db3afb-a0aa-4280-b2ab-510fb9ecefe4.jpg', 'a9458fa5-cc05-4a77-a1dc-9ff1378b1465'),
('598fbf2c-5954-46f7-a1d0-7b577dd07a5a', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253902/express-sale/products/multimedia/598fbf2c-5954-46f7-a1d0-7b577dd07a5a.jpg', '5d34b009-ce5b-4e20-950c-9b89dc4b09ae'),
('6b00ea02-1141-4db0-a3fa-df774a39791e', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253645/express-sale/products/multimedia/6b00ea02-1141-4db0-a3fa-df774a39791e.jpg', '09fd4c7b-cd37-4e6d-a7f6-ae8f93734005'),
('73e6ab4f-4857-4f5f-a84e-772c8b4846c6', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254401/express-sale/products/multimedia/73e6ab4f-4857-4f5f-a84e-772c8b4846c6.jpg', 'b0beb7fb-57b5-4881-a29f-c86581dbae19'),
('77cec2e0-73c1-4e9b-97ea-6fd746fdd2ac', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254747/express-sale/products/multimedia/77cec2e0-73c1-4e9b-97ea-6fd746fdd2ac.jpg', 'fba1a2fb-3e81-447e-adf5-e984682d700d'),
('7bfd837f-e3ce-4a9d-a84e-67b142090ebf', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253956/express-sale/products/multimedia/7bfd837f-e3ce-4a9d-a84e-67b142090ebf.png', '662c229a-a176-4f98-b3e1-0b3bb60ff5e0'),
('89337bcc-cde6-4cb6-b735-15411a63c7d8', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254208/express-sale/products/multimedia/89337bcc-cde6-4cb6-b735-15411a63c7d8.jpg', '8c468cdc-7cf2-4ffa-99e2-b4e8310fc715'),
('9229bd50-7a6e-46ab-a623-00e1f1fb14cf', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254577/express-sale/products/multimedia/9229bd50-7a6e-46ab-a623-00e1f1fb14cf.jpg', 'e359851d-9813-463f-aff9-3a552a887134'),
('95c3bf4b-a348-48e1-b379-c06d6dabea0c', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254686/express-sale/products/multimedia/95c3bf4b-a348-48e1-b379-c06d6dabea0c.jpg', 'e3e3e594-5c65-433f-a4a3-94f75dd4aef9'),
('b3e568ea-db28-42a9-b65c-35504f2294fa', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253644/express-sale/products/multimedia/b3e568ea-db28-42a9-b65c-35504f2294fa.jpg', '09fd4c7b-cd37-4e6d-a7f6-ae8f93734005'),
('bb4a10b4-69a6-46ae-a3bc-1f24d6a959a6', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254747/express-sale/products/multimedia/bb4a10b4-69a6-46ae-a3bc-1f24d6a959a6.jpg', 'fba1a2fb-3e81-447e-adf5-e984682d700d'),
('c220b426-90cd-42da-a80b-6d60e7cb2c71', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732252097/express-sale/products/multimedia/c220b426-90cd-42da-a80b-6d60e7cb2c71.jpg', '56a133ce-d6b7-4d63-9564-9fa656232efa'),
('c5fbc777-26f5-4a8b-a9b1-bd87fb67ecfc', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253902/express-sale/products/multimedia/c5fbc777-26f5-4a8b-a9b1-bd87fb67ecfc.jpg', '5d34b009-ce5b-4e20-950c-9b89dc4b09ae'),
('c8662b84-8da1-47b8-ba73-d8eaec4ee4c4', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254287/express-sale/products/multimedia/c8662b84-8da1-47b8-ba73-d8eaec4ee4c4.jpg', 'a9458fa5-cc05-4a77-a1dc-9ff1378b1465'),
('d6b115b6-68e3-4ab0-bbb2-23abc00c637e', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253902/express-sale/products/multimedia/d6b115b6-68e3-4ab0-bbb2-23abc00c637e.jpg', '5d34b009-ce5b-4e20-950c-9b89dc4b09ae'),
('d72d62e6-8806-4400-b18a-1241195db238', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253956/express-sale/products/multimedia/d72d62e6-8806-4400-b18a-1241195db238.jpg', '662c229a-a176-4f98-b3e1-0b3bb60ff5e0'),
('e361cd86-66e4-4c1e-af17-d18b0b5c2cca', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254401/express-sale/products/multimedia/e361cd86-66e4-4c1e-af17-d18b0b5c2cca.jpg', 'b0beb7fb-57b5-4881-a29f-c86581dbae19'),
('e74683e3-9be0-4e25-93ff-1f7f940792e1', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732253644/express-sale/products/multimedia/e74683e3-9be0-4e25-93ff-1f7f940792e1.jpg', '09fd4c7b-cd37-4e6d-a7f6-ae8f93734005'),
('e7a0b822-8101-4e78-8a95-7337e4524db5', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254489/express-sale/products/multimedia/e7a0b822-8101-4e78-8a95-7337e4524db5.jpg', 'ddc2a91d-65b6-4316-9222-84cde0759911'),
('f3143f18-2cb5-4a94-9246-65ff3e5c975d', 'https://res.cloudinary.com/dyuh7jesr/image/upload/v1732254577/express-sale/products/multimedia/f3143f18-2cb5-4a94-9246-65ff3e5c975d.jpg', 'e359851d-9813-463f-aff9-3a552a887134');

-- ---------------------------------------------------------------
-- Carts Table
CREATE TABLE `carts` (
    `cart_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL,
    `product_quantity` INT NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Orders Table
CREATE TABLE `orders` (
    `order_id` VARCHAR(60) NOT NULL PRIMARY KEY,
    `user_id` VARCHAR(60) NOT NULL,
    `order_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `order_status` ENUM('pendiente', 'enviando', 'entregado', 'recibido') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Payment Details Table
CREATE TABLE `payment_details` (
    `payment_id` VARCHAR(60) PRIMARY KEY,
    `order_id` VARCHAR(60) NOT NULL,
    `payu_reference` VARCHAR(255) NOT NULL,
    `payment_method` VARCHAR(100) NOT NULL,
    `payment_amount` DECIMAL(10, 0) NOT NULL,
    `buyer_name` VARCHAR(100) NOT NULL,
    `buyer_email` VARCHAR(255) NOT NULL,
    `buyer_document_type` ENUM('CC', 'CE', 'TI', 'PPN', 'NIT', 'SSN', 'EIN') NOT NULL DEFAULT 'CC',
    `buyer_document_number` DECIMAL(10, 0) NOT NULL,
    `buyer_phone` DECIMAL(10, 0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Shipping Details Table
CREATE TABLE `shipping_details` (
    `shipping_id` VARCHAR(60) PRIMARY KEY,
    `order_id` VARCHAR(60) NOT NULL,
    `worker_id` VARCHAR(60),
    `shipping_address` TEXT NOT NULL,
    `shipping_coordinates` VARCHAR(100) NOT NULL,
    `shipping_start` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `shipping_end` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `shipping_cost` DECIMAL(10, 0) NOT NULL,
    `shipping_message` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Order Products Table
CREATE TABLE `order_products` (
    `order_id` VARCHAR(60) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL,
    `product_price` DECIMAL(10, 0) NOT NULL,
    `product_quantity` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
-- Foreign Keys
ALTER TABLE `users`
ADD CONSTRAINT `fk_users_roles`
FOREIGN KEY (`role_id`)
REFERENCES `roles`(`role_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `workers`
ADD CONSTRAINT `fk_workers_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `products`
ADD CONSTRAINT `fk_products_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_products_categories`
FOREIGN KEY (`category_id`)
REFERENCES `categories`(`category_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `ratings`
ADD CONSTRAINT `fk_ratings_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `user_ratings`
ADD CONSTRAINT `fk_user_ratings_ratings`
FOREIGN KEY (`rating_id`)
REFERENCES `ratings`(`rating_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_user_ratings_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `product_ratings`
ADD CONSTRAINT `fk_product_ratings_ratings`
FOREIGN KEY (`rating_id`)
REFERENCES `ratings`(`rating_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_product_ratings_products`
FOREIGN KEY (`product_id`)
REFERENCES `products`(`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `medias`
ADD CONSTRAINT `fk_medias_products`
FOREIGN KEY (`product_id`)
REFERENCES `products`(`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `orders`
ADD CONSTRAINT `fk_orders_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `payment_details`
ADD CONSTRAINT `fk_payment_details_orders`
FOREIGN KEY (`order_id`)
REFERENCES `orders`(`order_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `shipping_details`
ADD CONSTRAINT `fk_shipping_details_orders`
FOREIGN KEY (`order_id`)
REFERENCES `orders`(`order_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_shipping_details_workers`
FOREIGN KEY (`worker_id`)
REFERENCES `workers`(`worker_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `order_products`
ADD CONSTRAINT `fk_order_products_orders`
FOREIGN KEY (`order_id`)
REFERENCES `orders`(`order_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_order_products_products`
FOREIGN KEY (`product_id`)
REFERENCES `products`(`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `recoveries`
ADD CONSTRAINT `fk_recoveries_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `withdrawals`
ADD CONSTRAINT `fk_withdrawals_workers`
FOREIGN KEY (`worker_id`)
REFERENCES `workers`(`worker_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `carts`
ADD CONSTRAINT `fk_carts_users`
FOREIGN KEY (`user_id`)
REFERENCES `users`(`user_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_carts_products`
FOREIGN KEY (`product_id`)
REFERENCES `products`(`product_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;
