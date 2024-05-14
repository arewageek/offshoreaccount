/*
  Warnings:

  - You are about to drop the column `description` on the `Transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT NOT NULL DEFAULT 'wire transfer';
