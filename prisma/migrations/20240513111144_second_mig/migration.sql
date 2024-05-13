/*
  Warnings:

  - Added the required column `id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Cards" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "expireDate" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "balance" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Cards_id_key" ON "Cards"("id");
