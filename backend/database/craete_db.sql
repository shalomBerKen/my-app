CREATE TABLE `tasks` (
    `id_task` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(255) NOT NULL,
    `task_details` VARCHAR(255) NOT NULL,
    `task_date` DATE NOT NULL,
    `is_done` TINYINT NOT NULL,
    PRIMARY KEY `tasks_id_task_primary` (`id_task`)
);

CREATE TABLE `users`(
    `id_user` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    PRIMARY KEY `users_id_user_primary`(`id_user`)
);

CREATE TABLE `task_users`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `task_id` BIGINT NOT NULL,
    `received_approv` BIGINT NOT NULL,
    PRIMARY KEY `task_users_user_id_primary`(`user_id`, `task_id`)
);

CREATE TABLE `communities_tasks`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_community` BIGINT NOT NULL,
    `id_task` BIGINT NOT NULL
);

CREATE TABLE `communities`(
    `id_community` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `community_name` VARCHAR(255) NOT NULL,
    `community_details` VARCHAR(255) NOT NULL,
    PRIMARY KEY `communities_id_community_primary`(`id_community`)
);

CREATE TABLE `users_communities`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_user` BIGINT NOT NULL,
    `id_community` BIGINT NOT NULL,
    `is_manager` BIGINT NOT NULL,
    PRIMARY KEY `users_communities_id_primary`(`id`)
);
ALTER TABLE
    `users_communities` ADD PRIMARY KEY `users_communities_id_primary`(`id`);
ALTER TABLE
    `task_users` ADD CONSTRAINT `task_users_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id_user`);
ALTER TABLE
    `users_communities` ADD CONSTRAINT `users_communities_id_community_foreign` FOREIGN KEY(`id_community`) REFERENCES `communities`(`id_community`);
ALTER TABLE
    `users_communities` ADD CONSTRAINT `users_communities_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `users`(`id_user`);
ALTER TABLE
    `communities` ADD CONSTRAINT `communities_id_community_foreign` FOREIGN KEY(`id_community`) REFERENCES `tasks`(`id_task`);
ALTER TABLE
    `tasks` ADD CONSTRAINT `tasks_id_task_foreign` FOREIGN KEY(`id_task`) REFERENCES `task_users`(`task_id`);