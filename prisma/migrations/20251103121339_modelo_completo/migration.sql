/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `criadoEm`,
    ADD COLUMN `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('ATENDENTE', 'GESTOR', 'ADMIN') NOT NULL DEFAULT 'ATENDENTE';

-- CreateTable
CREATE TABLE `Migrante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `nacionalidade` VARCHAR(191) NOT NULL,
    `pais_de_origem` VARCHAR(191) NOT NULL,
    `status_legal` VARCHAR(191) NOT NULL,
    `etnia` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,
    `tem_deficiencia` BOOLEAN NOT NULL DEFAULT false,
    `data_entrada_brasil` DATETIME(3) NOT NULL,
    `ponto_entrada_brasil` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,
    `grupoFamiliarId` INTEGER NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Migrante_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoFamiliar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_grupo_familiar` VARCHAR(191) NOT NULL,
    `pontoFocalId` INTEGER NULL,

    UNIQUE INDEX `GrupoFamiliar_numero_grupo_familiar_key`(`numero_grupo_familiar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atendimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_atendimento` DATETIME(3) NOT NULL,
    `local_atendimento` VARCHAR(191) NOT NULL,
    `tipo_assistencia` VARCHAR(191) NOT NULL,
    `consentimento` BOOLEAN NOT NULL,
    `prioridades` VARCHAR(191) NULL,
    `observacao` VARCHAR(191) NULL,
    `assistencia_entregue_por` VARCHAR(191) NOT NULL,
    `migranteId` INTEGER NOT NULL,
    `atendenteId` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_agendamento` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDENTE',
    `nome` VARCHAR(191) NULL,
    `contato` VARCHAR(191) NULL,
    `info_grupo_familiar` VARCHAR(191) NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Migrante` ADD CONSTRAINT `Migrante_grupoFamiliarId_fkey` FOREIGN KEY (`grupoFamiliarId`) REFERENCES `GrupoFamiliar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_migranteId_fkey` FOREIGN KEY (`migranteId`) REFERENCES `Migrante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_atendenteId_fkey` FOREIGN KEY (`atendenteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
