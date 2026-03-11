-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `officeId` INTEGER NOT NULL DEFAULT 1,
    `staffId` INTEGER NULL,
    `roles` JSON NOT NULL,
    `permissions` JSON NOT NULL,
    `isSelfServiceUser` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nameDecorated` VARCHAR(191) NULL,
    `externalId` VARCHAR(191) NULL,
    `openingDate` JSON NULL,
    `hierarchy` VARCHAR(191) NOT NULL DEFAULT '.',
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNo` VARCHAR(191) NOT NULL,
    `status` JSON NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `activationDate` JSON NULL,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `gender` JSON NULL,
    `officeId` INTEGER NOT NULL DEFAULT 1,
    `officeName` VARCHAR(191) NULL,
    `staffId` INTEGER NULL,
    `staffName` VARCHAR(191) NULL,
    `timeline` JSON NULL,
    `fullname` VARCHAR(191) NULL,
    `imagePresent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clients_accountNo_key`(`accountNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNo` VARCHAR(191) NOT NULL,
    `status` JSON NOT NULL,
    `clientId` INTEGER NOT NULL,
    `clientName` VARCHAR(191) NULL,
    `clientAccountNo` VARCHAR(191) NULL,
    `loanProductId` INTEGER NULL,
    `loanProductName` VARCHAR(191) NULL,
    `loanType` JSON NULL,
    `currency` JSON NULL,
    `principal` DOUBLE NOT NULL DEFAULT 0,
    `termFrequency` INTEGER NULL,
    `timeline` JSON NULL,
    `summary` JSON NULL,
    `repaymentSchedule` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loans_accountNo_key`(`accountNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `savings_accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNo` VARCHAR(191) NOT NULL,
    `status` JSON NOT NULL,
    `clientId` INTEGER NOT NULL,
    `clientName` VARCHAR(191) NULL,
    `savingsProductId` INTEGER NULL,
    `savingsProductName` VARCHAR(191) NULL,
    `currency` JSON NULL,
    `accountBalance` DOUBLE NOT NULL DEFAULT 0,
    `timeline` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `savings_accounts_accountNo_key`(`accountNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `currency` JSON NULL,
    `principal` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `savings_accounts` ADD CONSTRAINT `savings_accounts_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
