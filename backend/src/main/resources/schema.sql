DROP TABLE IF EXISTS room;

CREATE TABLE room
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  room_identifier VARCHAR2(40),
  player_one_identifier VARCHAR2(40),
  player_two_identifier VARCHAR2(40),
  player_one_ready BOOLEAN,
  player_two_ready BOOLEAN,
  player_one_score INT,
  player_two_score INT,
  current_word_index INT,
  typing_text CLOB
);