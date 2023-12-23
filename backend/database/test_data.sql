-- Insert data into 'users' table
INSERT INTO `users` (`user_name`, `user_password`) VALUES
    ('JohnDoe', 'password123'),
    ('JaneSmith', 'letmein'),
    ('BobJohnson', 'securepass'),
    ('AliceWhite', '123456'),
    ('EvaGreen', 'p@ssw0rd'),
    ('CharlieBrown', 'qwerty'),
    ('DavidLee', 'pass123'),
    ('GraceTaylor', 'password!'),
    ('SamuelBlack', '987654'),
    ('OliviaDavis', 'ilovecoding');

-- Insert data into 'communities' table
INSERT INTO `communities` (`community_name`, `community_details`) VALUES
    ('Tech Enthusiasts', 'A community for tech lovers'),
    ('Fitness Freaks', 'Health and fitness enthusiasts'),
    ('Book Club', 'For avid readers'),
    ('Travelers', 'Exploring the world together'),
    ('Foodies', 'For those who love food'),
    ('Photography Club', 'Capturing moments through lenses'),
    ('Music Lovers', 'For music enthusiasts'),
    ('Artists Hub', 'Connecting artists worldwide'),
    ('Gaming Community', 'For gamers by gamers'),
    ('Coding Wizards', 'The coding community');

-- Insert data into 'tasks' table
INSERT INTO `tasks` (`task_name`, `task_details`, `task_date`, `is_done`) VALUES
    ('Complete Project X', 'Finish all tasks related to Project X', '2023-01-10', 0),
    ('Gym Workout', 'Cardio and strength training', '2023-01-15', 1),
    ('Discuss Book of the Month', 'Share thoughts on this month''s book', '2023-01-20', 0),
    ('Plan Trip to Europe', 'Research and plan the itinerary', '2023-02-01', 0),
    ('Explore Local Cuisine', 'Visit new restaurants in the city', '2023-02-10', 1),
    ('Photo Exhibition Preparation', 'Select and print photos for the exhibition', '2023-02-15', 0),
    ('Music Jam Session', 'Collaborative music creation', '2023-03-01', 0),
    ('Art Collaboration Project', 'Work on a joint art project', '2023-03-10', 1),
    ('Gaming Tournament', 'Organize and participate in a gaming tournament', '2023-03-15', 0),
    ('Code Review Session', 'Review and improve code together', '2023-03-20', 1);

-- Insert data into 'communities_tasks' table
INSERT INTO `communities_tasks` (`id_community`, `id_task`) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);

-- Insert data into 'users_communities' table
INSERT INTO `users_communities` (`id_user`, `id_community`, `is_manager`) VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 0),
    (4, 4, 1),
    (5, 5, 0),
    (6, 6, 1),
    (7, 7, 0),
    (8, 8, 1),
    (9, 9, 0),
    (10, 10, 1);

-- Insert data into 'task_users' table
INSERT INTO `task_users` (`user_id`, `task_id`, `received_approv`) VALUES
    (1, 1, 0),
    (2, 2, 1),
    (3, 3, 0),
    (4, 4, 1),
    (5, 5, 0),
    (6, 6, 1),
    (7, 7, 0),
    (8, 8, 1),
    (9, 9, 0),
    (10, 10, 1);
