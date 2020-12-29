DROP TABLE IF EXISTS movie;

CREATE TABLE movie (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_title VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    thumbs_up INT DEFAULT 0,
    thumbs_down INT DEFAULT 0
);