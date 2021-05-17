INSERT INTO User (username, email, password)
VALUES
('Fred'),
('flinstone@gmail.com'),
('wilma');

INSERT INTO Post (title, post_url, user_id)
VALUES
('Some title'),
('some_url'),
(1);

INSERT INTO Vote (user_id, post_id)
VALUES
(1),
(1);