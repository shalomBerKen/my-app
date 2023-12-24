-- Insert data into communities table
INSERT INTO communities (community_name, community_details) VALUES
('Tech Enthusiasts', 'A community for technology lovers'),
('Fitness Fanatics', 'Get fit together!'),
('Book Club', 'Discuss and explore new books');

-- Insert data into users table
INSERT INTO users (user_name, user_password) VALUES
('john_doe', 'password123'),
('jane_smith', 'securepass'),
('bob_carter', 'letmein');

-- Insert data into tasks table
INSERT INTO tasks (community_id, task_name, task_details, task_date, is_done) VALUES
(1, 'Code Review', 'Review the latest code changes', '2023-01-10', 0),
(2, 'Morning Run', 'Run for 5 miles', '2023-01-15', 0),
(3, 'Discuss Chapter 5', 'Discuss key points from Chapter 5', '2023-01-20', 0);

-- Insert data into task_users table
INSERT INTO task_users (user_id, task_id, received_approv) VALUES
(1, 1, 0),
(2, 1, 0),
(3, 2, 0),
(1, 3, 0),
(2, 3, 0);

-- Insert data into users_communities table
INSERT INTO users_communities (user_id, community_id, is_manager) VALUES
(1, 1, 1),
(2, 1, 0),
(3, 2, 1),
(1, 3, 1),
(2, 3, 0);

