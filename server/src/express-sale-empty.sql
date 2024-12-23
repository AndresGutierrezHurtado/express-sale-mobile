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

-- ---------------------------------------------------------------
-- Workers Table
CREATE TABLE `workers` (
    `worker_id` VARCHAR(60) PRIMARY KEY,
    `worker_description` TEXT NOT NULL DEFAULT 'usuario nuevo.',
    `worker_balance` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `user_id` VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
