-- Align database enums with prisma/schema.prisma
-- This migration maps legacy enum values to the new ones without dropping data.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "TransactionPaymentMethod" AS ENUM (
    'CREDIT_CARD',
    'DEBIT_CARD',
    'BANK_TRANSFER',
    'BANK_SLIP',
    'CASH',
    'PIX',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- TransactionCategory: map legacy values into the new enum
BEGIN;
  CREATE TYPE "TransactionCategory_new" AS ENUM (
    'HOUSING',
    'TRANSPORTATION',
    'FOOD',
    'ENTERTAINMENT',
    'HEALTH',
    'UTILITY',
    'SALARY',
    'EDUCATION',
    'OTHER'
  );

  ALTER TABLE "Transaction"
  ALTER COLUMN "category" TYPE "TransactionCategory_new"
  USING (
    CASE "category"::text
      WHEN 'RENT' THEN 'HOUSING'
      WHEN 'UTILITIES' THEN 'UTILITY'
      WHEN 'HEALTHCARE' THEN 'HEALTH'
      WHEN 'SHOPPING' THEN 'OTHER'
      WHEN 'INVESTMENT' THEN 'OTHER'
      WHEN 'FOOD' THEN 'FOOD'
      WHEN 'ENTERTAINMENT' THEN 'ENTERTAINMENT'
      WHEN 'TRANSPORTATION' THEN 'TRANSPORTATION'
      WHEN 'EDUCATION' THEN 'EDUCATION'
      WHEN 'SALARY' THEN 'SALARY'
      WHEN 'OTHER' THEN 'OTHER'
      ELSE 'OTHER'
    END
  )::"TransactionCategory_new";

  ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
  ALTER TYPE "TransactionCategory_new" RENAME TO "TransactionCategory";
  DROP TYPE "TransactionCategory_old";
COMMIT;

-- PaymentMethod -> TransactionPaymentMethod: keep column & map values
ALTER TABLE "Transaction"
ALTER COLUMN "paymentMethod" TYPE "TransactionPaymentMethod"
USING (
  CASE "paymentMethod"::text
    WHEN 'CREDIT_CARD' THEN 'CREDIT_CARD'
    WHEN 'DEBIT_CARD' THEN 'DEBIT_CARD'
    WHEN 'BANK_TRANSFER' THEN 'BANK_TRANSFER'
    WHEN 'CASH' THEN 'CASH'
    WHEN 'PIX' THEN 'PIX'
    WHEN 'DIGITAL_WALLET' THEN 'OTHER'
    WHEN 'OTHER' THEN 'OTHER'
    ELSE 'OTHER'
  END
)::"TransactionPaymentMethod";

-- Drop legacy enum
DROP TYPE "PaymentMethod";

