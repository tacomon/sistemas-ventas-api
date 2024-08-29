-- CreateTable
CREATE TABLE `rol` (
    `cveRol` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(250) NOT NULL,
    `clave` VARCHAR(45) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    PRIMARY KEY (`cveRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_usuario` (
    `cveUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cveRol` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_usuario_username_key`(`username`),
    PRIMARY KEY (`cveUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_usuario` ADD CONSTRAINT `tbl_usuario_cveRol_fkey` FOREIGN KEY (`cveRol`) REFERENCES `rol`(`cveRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
