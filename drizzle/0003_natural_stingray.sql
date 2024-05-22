CREATE TABLE IF NOT EXISTS "users_to_words" (
	"user_id" integer NOT NULL,
	"word_id" integer NOT NULL,
	CONSTRAINT "users_to_words_user_id_word_id_pk" PRIMARY KEY("user_id","word_id")
);
--> statement-breakpoint
ALTER TABLE "words" ADD COLUMN "definition" json NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_words" ADD CONSTRAINT "users_to_words_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_words" ADD CONSTRAINT "users_to_words_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
