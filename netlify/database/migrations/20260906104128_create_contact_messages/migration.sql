CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY,
	"name" varchar(160) NOT NULL,
	"email" varchar(200) NOT NULL,
	"subject" varchar(200) DEFAULT 'General' NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
