-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "routingNumber" TEXT NOT NULL,
    "swiftCode" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_id_key" ON "Transactions"("id");
