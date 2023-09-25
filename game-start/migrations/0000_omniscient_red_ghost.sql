CREATE TABLE `nodes` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`hostname` text NOT NULL,
	`port` integer NOT NULL,
	`tags` text,
	`priority` integer
);
