ALTER TABLE "words" DROP CONSTRAINT "words_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "clerk_attributes";--> statement-breakpoint
ALTER TABLE "words" DROP COLUMN IF EXISTS "definition";--> statement-breakpoint
ALTER TABLE "words" DROP COLUMN IF EXISTS "user_id";