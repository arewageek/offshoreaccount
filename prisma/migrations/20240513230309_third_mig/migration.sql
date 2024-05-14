-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'wire transfer',
ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP;
