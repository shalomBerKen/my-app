CREATE TABLE `tasks`(
    `task_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `community_id` BIGINT NOT NULL,
    `task_name` VARCHAR(255) NOT NULL,
    `task_details` VARCHAR(255) NOT NULL,
    `task_date` DATE NOT NULL,
    `is_done` TINYINT NOT NULL,
    `location` VARCHAR(255)
);
CREATE TABLE `users`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL
);

CREATE TABLE `task_users`(
    `user_id` BIGINT UNSIGNED NOT NULL ,
    `task_id` BIGINT NOT NULL,
    `received_approv` BIGINT NOT NULL,
    PRIMARY KEY(`task_id`, `user_id`)
);

CREATE TABLE `communities`(
    `community_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `community_name` VARCHAR(255) NOT NULL,
    `community_details` VARCHAR(255) NOT NULL
);
CREATE TABLE `users_communities`(
    `user_id` BIGINT NOT NULL,
    `community_id` BIGINT NOT NULL,
    `is_manager` BIGINT NOT NULL,
	PRIMARY KEY(`community_id`, `user_id`)
);