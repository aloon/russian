CREATE TABLE join_words (
  id              SERIAL PRIMARY KEY,
  word1           VARCHAR(255) NOT NULL,
  word2           VARCHAR(255) NOT NULL,
  category_id     INTEGER NOT NULL
);

CREATE INDEX join_words_idx_category_id ON join_words (category_id);