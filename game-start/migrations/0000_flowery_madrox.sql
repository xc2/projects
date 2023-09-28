CREATE TABLE `nodes` (
	`key` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`hostname` text DEFAULT '' NOT NULL,
	`port` integer DEFAULT 0 NOT NULL,
	`tags` text DEFAULT '',
	`priority` integer DEFAULT 100,
	`shared_key` text DEFAULT '' NOT NULL,
	`method` text DEFAULT 'aes-128-gcm',
	`udp` integer DEFAULT false,
	`disabled` integer DEFAULT false,
	`created_at` datetime DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
	`updated_at` datetime DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);