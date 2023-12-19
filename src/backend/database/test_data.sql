INSERT INTO tasks (task_name, task_details, task_date, is_done) VALUES
('Task 1', 'Details for Task 1', '2023-01-01', 0),
('Task 2', 'Details for Task 2', '2023-02-01', 1),
('Task 3', 'Details for Task 3', '2023-03-01', 0),
('Task 4', 'Details for Task 4', '2023-04-01', 1),
('Task 5', 'Details for Task 5', '2023-05-01', 0);
-- Add more rows as needed
INSERT INTO users (user_name, user_password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3'),
('user4', 'password4'),
('user5', 'password5');
-- Add more rows as needed
INSERT INTO task_users (user_id, task_id, received_approv) VALUES
(1, 1, 1),
(2, 1, 0),
(3, 2, 1),
(4, 2, 0),
(5, 3, 1);
-- Add more rows as needed
INSERT INTO communities (community_name, community_details) VALUES
('Community 1', 'Details for Community 1'),
('Community 2', 'Details for Community 2'),
('Community 3', 'Details for Community 3'),
('Community 4', 'Details for Community 4'),
('Community 5', 'Details for Community 5');
-- Add more rows as needed
INSERT INTO users_communities (id_user, id_community, is_manager) VALUES
(1, 1, 1),
(2, 1, 0),
(3, 2, 1),
(4, 2, 0),
(5, 3, 1),
(1, 4, 1),
(2, 4, 0),
(3, 5, 1),
(4, 5, 0),
(5, 5, 1);
-- Add more rows as needed
