DROP TABLE IF EXISTS room;

CREATE TABLE room
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  room_identifier VARCHAR2(40),
  player_one_identifier VARCHAR2(40),
  player_two_identifier VARCHAR2(40),
  player_one_ready BOOLEAN,
  player_two_ready BOOLEAN,
  player_one_victories INT,
  player_two_victories INT,
  player_one_score INT,
  player_two_score INT,
  current_word_index INT,
  typing_text CLOB
);

CREATE TABLE game_match
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  player_identifier VARCHAR(40),
  room_identifier VARCHAR(40),
  word VARCHAR(100),
  victory BOOLEAN,
  time_spent INT
);

CREATE TABLE high_score
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  player_identifier VARCHAR(40),
  victories INT
);