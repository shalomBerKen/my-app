CREATE TABLE `tasks`(
    `id_task` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(255) NOT NULL,
    `task_details` VARCHAR(255) NOT NULL,
    `task_date` DATE NOT NULL,
    `is_done` TINYINT(1) NOT NULL,
    PRIMARY KEY `tasks_id_task_primary`(`id_task`)
);

CREATE TABLE `users`(
    `id_user` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    PRIMARY KEY `users_id_user_primary`(`id_user`)
);

CREATE TABLE `communities_tasks`(
    `id_community` BIGINT NOT NULL,
    `id_task` BIGINT NOT NULL,
    PRIMARY KEY `communities_tasks_id_primary`(`id_community`, `id_task`)
);

CREATE TABLE `task_users`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `task_id` BIGINT NOT NULL,
    `received_approv` BIGINT NOT NULL,
    PRIMARY KEY `task_users_user_id_primary`(`user_id`, `task_id`)
);

CREATE TABLE `communities`(
    `id_community` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `community_name` VARCHAR(255) NOT NULL,
    `community_details` VARCHAR(255) NOT NULL,
    PRIMARY KEY `communities_id_community_primary`(`id_community`)
);

CREATE TABLE `users_communities`(
    `id_user` BIGINT NOT NULL,
    `id_community` BIGINT NOT NULL,
    `is_manager` BIGINT NOT NULL,
    PRIMARY KEY `users_communities_id_primary`(`id_user`, `id_community`)
);