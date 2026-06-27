BEGIN;
CREATE TYPE "TicketCategory_new" AS ENUM ('GESTIONE_MENU', 'PAGAMENTO', 'PRENOTAZIONI', 'ACCOUNT', 'ALTRO');
ALTER TABLE "Ticket" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Ticket" ALTER COLUMN "category" TYPE "TicketCategory_new" USING ("category"::text::"TicketCategory_new");
ALTER TYPE "TicketCategory" RENAME TO "TicketCategory_old";
ALTER TYPE "TicketCategory_new" RENAME TO "TicketCategory";
DROP TYPE "TicketCategory_old";
ALTER TABLE "Ticket" ALTER COLUMN "category" SET DEFAULT 'ALTRO';
COMMIT;
