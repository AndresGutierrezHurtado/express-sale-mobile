DROP DATABASE IF EXISTS `express-sale-bd`;
CREATE DATABASE `express-sale-bd`;
USE `express-sale-bd`;


DROP TABLE IF EXISTS `usuarios`, `recuperacion_cuentas`, `trabajadores`, `roles`, `productos`, `categorias`, `calificaciones`, `calificaciones_usuarios`, `calificaciones_productos`, `multimedias`, `pedidos`, `detalles_pagos`, `detalles_envios`, `productos_pedidos`;

-- ---------------------------------------------------------------
--
-- Tabla de recuperación de contraseñas
CREATE TABLE `recuperacion_cuentas` (
    `recuperacion_id` INT PRIMARY KEY AUTO_INCREMENT,
    `usuario_id` INT NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `fecha_expiracion` TIMESTAMP DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Usuarios
CREATE TABLE `usuarios` (
    `usuario_id` INT PRIMARY KEY AUTO_INCREMENT,
    `usuario_nombre` VARCHAR(100) NOT NULL,
    `usuario_apellido` VARCHAR(100) NOT NULL,
    `usuario_correo` VARCHAR(255) UNIQUE NOT NULL,
    `usuario_alias` VARCHAR(50) UNIQUE NOT NULL,
    `usuario_telefono` DECIMAL(10, 0) UNIQUE,
    `usuario_direccion` TEXT,
    `usuario_contra` TEXT NOT NULL,
    `usuario_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `usuario_actualizacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `usuario_imagen_url` VARCHAR(255) DEFAULT '/public/images/users/default.jpg',
    `rol_id` INT DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`usuario_id`, `usuario_nombre`, `usuario_apellido`, `usuario_correo`, `usuario_alias`, `usuario_direccion`, `usuario_telefono`, `usuario_contra`, `usuario_creacion`, `usuario_actualizacion`, `usuario_imagen_url`, `rol_id`) VALUES
(1, 'Express', 'Sale', 'expresssale.exsl@gmail.com', 'Express_Sale', NULL, NULL, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 04:39:15', '2024-07-25 04:56:12', '/public/images/users/1.jpg', 4),
(2, 'Andrés', 'Gutiérrez Hurtado', 'andres52885241@gmail.com', 'Andres_Gutierrez', 'Dg. 68D Sur #70c-31, Bogotá, Colombia', 3209202177, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 04:47:10', '2024-07-25 04:47:10', '/public/images/users/2.jpg', 2),
(3, 'David Fernando', 'Diaz Niausa', 'davidfernandodiazniausa@gmail.com', 'David_Diaz', 'Cra. 5i Este #89-23, Bogotá, Colombia', 3214109557, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 04:53:27', '2024-07-25 04:53:27', '/public/images/users/default.jpg', 2),
(4, 'Jaider Harley', 'Rondon Herrera', 'rondonjaider@gmail.com', 'Jaider_Rondon', 'Cra. 5i Este #89-23, Bogotá, Colombia', 3112369205, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 04:54:25', '2024-07-25 04:54:25', '/public/images/users/default.jpg', 2),
(5, 'Juan Sebastian', 'Bernal Gamboa', 'juansebastianbernalgamboa@gmail.com', 'Juan_Bernal', 'Cra. 5i Este #89-23, Bogotá, Colombia', 3053964455, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 04:55:02', '2024-07-25 04:55:02', '/public/images/users/default.jpg', 2),
(6, 'Kevin Alejandro', 'Parra Cifuentes', 'luisparra5380@gmail.com', 'Kevin_Parra', 'Cra. 19b #62a Sur, Bogotá, Colombia', 3212376552, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 05:04:47', '2024-07-25 05:04:47', '/public/images/users/default.jpg', 1),
(7, 'Samuel', 'Useche Chaparro', 'samuuseche01@gmail.com', 'Samuel_Useche', 'Cl. 68f Sur #71g-18, Bogotá, Colombia', 3107838443, '81dc9bdb52d04dc20036dbd8313ed055', '2024-07-25 05:05:19', '2024-07-25 05:05:19', '/public/images/users/default.jpg', 3);

-- ---------------------------------------------------------------
--
-- Tabla de Trabajadores
CREATE TABLE `trabajadores` (
    `trabajador_id` INT PRIMARY KEY AUTO_INCREMENT,
    `trabajador_descripcion` TEXT NOT NULL DEFAULT 'usuario nuevo.',
    `trabajador_numero_trabajos` INT NOT NULL DEFAULT 0,
    `trabajador_saldo` DECIMAL(10, 0) NOT NULL DEFAULT 0,
    `usuario_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `trabajadores` (`usuario_id`) VALUES
(2), -- Andrés Gutiérrez
(3), -- David Diaz
(4), -- Jaider Herrera
(5), -- Juan Bernal
(7); -- Samuel Useche

-- ---------------------------------------------------------------
--
-- Tabla de retiros
CREATE TABLE `retiros` (
    `retiro_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `trabajador_id` INT NOT NULL,
    `retiro_valor` DECIMAL(10, 2) NOT NULL,
    `retiro_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Roles
CREATE TABLE `roles` (
    `rol_id` INT PRIMARY KEY AUTO_INCREMENT,
    `rol_nombre` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`rol_id`, `rol_nombre`) VALUES
(1, 'cliente'),
(2, 'vendedor'),
(3, 'domiciliario'),
(4, 'administrador');

-- ---------------------------------------------------------------
--
-- Tabla de Productos
CREATE TABLE `productos` (
    `producto_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `producto_nombre` VARCHAR(255) NOT NULL,
    `producto_descripcion` TEXT NOT NULL,
    `producto_cantidad` INT NOT NULL,
    `producto_precio` DECIMAL(10, 0) NOT NULL,
    `producto_imagen_url` VARCHAR(255) NOT NULL DEFAULT '/public/images/products/default.jpg',
    `producto_estado` ENUM('privado', 'publico') NOT NULL DEFAULT 'publico',
    `producto_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `usuario_id` INT NOT NULL,
    `categoria_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos en la tabla productos con la URL de la imagen
INSERT INTO `productos` (`producto_nombre`, `producto_descripcion`, `producto_fecha`, `producto_imagen_url`, `producto_precio`, `producto_cantidad`, `categoria_id`, `usuario_id`) VALUES
-- Moda
('Nike Air Jordan 1', 'Las icónicas zapatillas Nike Air Jordan 1 son un clásico atemporal en el mundo de la moda urbana, conocidas por su estilo y comodidad.', '2024-02-01', '/public/images/products/1.jpg', 289900.00, 15, 1, 3),
('Cadena Cubana de Plata', 'Una cadena cubana de plata es un accesorio clásico y llamativo que puede complementar cualquier atuendo, ya sea casual o más elegante.', '2024-03-25', '/public/images/products/2.jpg', 24900.00, 9, 1, 3),
('Casio G-Shock GA-2100', 'El reloj Casio G-Shock GA-2100 es conocido por su resistencia y estilo, con características como resistencia a golpes, al agua y un diseño moderno y elegante.', '2024-04-20', '/public/images/products/3.jpg', 224000.00, 10, 1, 3),
-- Tecnología
('iPhone 13 Pro', 'El iPhone 13 Pro es el último modelo de Apple que combina un diseño elegante con un rendimiento potente y cámaras avanzadas para capturar imágenes impresionantes.', '2024-05-10', '/public/images/products/4.jpg', 2100000.00, 8, 3, 4),
('Xbox Series X', 'La Xbox Series X ofrece potencia de próxima generación, velocidades de carga ultrarrápidas y una amplia biblioteca de juegos para una experiencia de juego inigualable.', '2024-05-05', '/public/images/products/5.jpg', 3599900.00, 13, 3, 4),
('PlayStation 5', 'La PlayStation 5 es la consola de última generación de Sony, que ofrece gráficos impresionantes, carga ultrarrápida y una amplia variedad de juegos exclusivos.', '2024-04-15', '/public/images/products/6.jpg', 4599900.00, 12, 3, 4),
-- Comida
('Galletas Oreo', 'Las deliciosas galletas Oreo, con su crujiente galleta y su cremoso relleno de vainilla, son un clásico de la merienda que gusta a niños y adultos por igual.', '2024-03-01', '/public/images/products/7.jpg', 26900.00, 40, 2, 5),
('Nutella', 'La crema de avellanas Nutella, con su textura suave y su sabor dulce, es un imprescindible en el desayuno de millones de personas en todo el mundo.', '2024-02-10', '/public/images/products/8.jpg', 7000.00, 22, 2, 5),
('KitKat', 'El delicioso chocolate KitKat, con sus característicos barquillos y su irresistible sabor, es el snack perfecto para disfrutar en cualquier momento del día.', '2024-03-20', '/public/images/products/9.jpg', 4000.00, 28, 2, 5),
-- Otros
('Mancuernas Ajustables', 'Un par de mancuernas ajustables con diferentes pesos, perfectas para entrenamiento de fuerza en casa o en el gimnasio.', '2024-04-05', '/public/images/products/10.jpg', 89900.00, 8, 4, 2),
('Megaplex | Creatine Power', 'Suplemento de proteína en polvo de alta calidad, ideal para la recuperación muscular y el crecimiento después del entrenamiento.', '2024-05-01', '/public/images/products/11.jpg', 59900.00, 10, 4, 2),
('Rubik`s Cube', 'El clásico cubo de Rubik, con su diseño de colores vivos y su desafiante mecánica, es uno de los rompecabezas más populares y reconocidos del mundo.', '2024-02-15', '/public/images/products/12.jpg', 15000.00, 15, 4, 2);

-- ---------------------------------------------------------------
--
-- Tabla de Categorías
CREATE TABLE `categorias` (
    `categoria_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `categoria_nombre` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categorias` (`categoria_id`, `categoria_nombre`) VALUES
(1, 'moda'),
(2, 'comida'),
(3, 'tecnologia'),
(4, 'otros');

-- ---------------------------------------------------------------
--
-- Tabla de Calificaciones
CREATE TABLE `calificaciones` (
    `calificacion_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `calificacion_comentario` TEXT NOT NULL,
    `calificacion_imagen_url` VARCHAR(255) NOT NULL,
    `calificacion_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `calificacion` INT NOT NULL,
    `usuario_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Relación Calificaciones y Usuarios
CREATE TABLE `calificaciones_usuarios` (
    `calificacion_id` INT NOT NULL,
    `usuario_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Relación Calificaciones y Productos
CREATE TABLE `calificaciones_productos` (
    `calificacion_id` INT NOT NULL,
    `producto_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de archivos multimedia
CREATE TABLE `multimedias` (
    `multimedia_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `multimedia_url` VARCHAR(255) NOT NULL,
    `multimedia_tipo` ENUM('imagen', 'video') NOT NULL,
    `producto_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `multimedias` (`multimedia_url`, `multimedia_tipo`, `producto_id`) VALUES
('/public/images/products/media/1_0.20240728012919.jpg', 'imagen', 1),
('/public/images/products/media/1_1.20240728012919.mp4', 'video', 1),
('/public/images/products/media/1_2.20240728012919.jpg', 'imagen', 1);

-- ---------------------------------------------------------------
--
-- Tabla de Pedidos
CREATE TABLE `pedidos` (
    `pedido_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `usuario_id` INT NOT NULL,
    `pedido_fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `pedido_estado` ENUM('pendiente', 'enviando', 'entregado', 'recibido') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de Pagos
CREATE TABLE `detalles_pagos` (
    `pago_id` INT PRIMARY KEY AUTO_INCREMENT,
    `pedido_id` INT NOT NULL,
    `pago_metodo` INT NOT NULL, -- polPaymentMethodType
    `pago_valor` DECIMAL(10, 0) NOT NULL, -- TX_VALUE
    `comprador_nombre` VARCHAR(100), -- buyerFullName
    `comprador_correo` VARCHAR(255) NOT NULL, -- buyerEmail
    `comprador_tipo_documento` ENUM('CC', 'CE', 'TI', 'PPN', 'NIT', 'SSN', 'EIN') NOT NULL DEFAULT 'CC', -- payerDocumentType
    `comprador_numero_documento` DECIMAL(10, 0) NOT NULL, -- payerDocument
    `comprador_telefono` DECIMAL(10, 0) -- payerPhone
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Detalles de Envíos
CREATE TABLE `detalles_envios` (
    `envio_id` INT PRIMARY KEY AUTO_INCREMENT,
    `pedido_id` INT NOT NULL,
    `trabajador_id` INT,
    `envio_direccion` TEXT NOT NULL,
    `envio_coordenadas` VARCHAR(100),
    `fecha_inicio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `fecha_entrega` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `envio_valor` DECIMAL(10, 0),
    `envio_mensaje` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Tabla de Relación Productos y Pedidos
CREATE TABLE `productos_pedidos` (
    `pedido_id` INT NOT NULL,
    `producto_id` INT NOT NULL,
    `producto_precio` DECIMAL(10, 0) NOT NULL,
    `producto_cantidad` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------
--
-- Llaves Foráneas
ALTER TABLE `usuarios`
ADD CONSTRAINT `fk_usuarios_roles` 
FOREIGN KEY (`rol_id`) 
REFERENCES `roles`(`rol_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `trabajadores`
ADD CONSTRAINT `fk_trabajadores_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `productos`
ADD CONSTRAINT `fk_productos_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_productos_categorias` 
FOREIGN KEY (`categoria_id`) 
REFERENCES `categorias`(`categoria_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `calificaciones`
ADD CONSTRAINT `fk_calificaciones_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `calificaciones_usuarios`
ADD CONSTRAINT `fk_calificaciones_usuarios_calificaciones` 
FOREIGN KEY (`calificacion_id`) 
REFERENCES `calificaciones`(`calificacion_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_calificaciones_usuarios_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `calificaciones_productos`
ADD CONSTRAINT `fk_calificaciones_productos_calificaciones` 
FOREIGN KEY (`calificacion_id`) 
REFERENCES `calificaciones`(`calificacion_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_calificaciones_productos_productos` 
FOREIGN KEY (`producto_id`) 
REFERENCES `productos`(`producto_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `multimedias`
ADD CONSTRAINT `fk_multimedia_productos` 
FOREIGN KEY (`producto_id`) 
REFERENCES `productos`(`producto_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `pedidos`
ADD CONSTRAINT `fk_pedidos_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `detalles_pagos`
ADD CONSTRAINT `fk_detalles_pagos_pedidos` 
FOREIGN KEY (`pedido_id`) 
REFERENCES `pedidos`(`pedido_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `detalles_envios`
ADD CONSTRAINT `fk_detalles_envios_pedidos` 
FOREIGN KEY (`pedido_id`) 
REFERENCES `pedidos`(`pedido_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_detalles_envios_trabajadores` 
FOREIGN KEY (`trabajador_id`) 
REFERENCES `trabajadores`(`trabajador_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `productos_pedidos`
ADD CONSTRAINT `fk_productos_pedidos_pedidos` 
FOREIGN KEY (`pedido_id`) 
REFERENCES `pedidos`(`pedido_id`)
ON UPDATE CASCADE
ON DELETE CASCADE,
ADD CONSTRAINT `fk_productos_pedidos_productos` 
FOREIGN KEY (`producto_id`) 
REFERENCES `productos`(`producto_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `recuperacion_cuentas`
ADD CONSTRAINT `fk_recuperacion_cuentas_usuarios` 
FOREIGN KEY (`usuario_id`) 
REFERENCES `usuarios`(`usuario_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE `retiros`
ADD CONSTRAINT `fk_retiros_usuarios` 
FOREIGN KEY (`trabajador_id`) 
REFERENCES `trabajadores`(`trabajador_id`)
ON UPDATE CASCADE
ON DELETE CASCADE;

DELIMITER $$
CREATE TRIGGER insertar_trabajador_despues_de_insertar_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF (NEW.rol_id = 2 OR NEW.rol_id = 3) THEN
        INSERT INTO trabajadores (usuario_id) VALUES (NEW.usuario_id);
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER bajar_saldo_trabajador_despues_de_insertar_retiros
AFTER INSERT ON retiros
FOR EACH ROW
BEGIN
    UPDATE trabajadores SET trabajador_saldo = trabajador_saldo - NEW.retiro_valor WHERE trabajador_id = NEW.trabajador_id;
END$$
DELIMITER ;