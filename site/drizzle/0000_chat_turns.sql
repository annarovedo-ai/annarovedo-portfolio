CREATE TABLE `chat_turns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`persona` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`country` text,
	`turn` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `chat_turns_created_idx` ON `chat_turns` (`created_at`);--> statement-breakpoint
CREATE INDEX `chat_turns_session_idx` ON `chat_turns` (`session_id`);
