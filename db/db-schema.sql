CREATE TABLE User (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE Board (
    board_id INT PRIMARY KEY,
    board_name VARCHAR(255),
    board_color_scheme VARCHAR(7),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Label (
    label_id INT PRIMARY KEY,
    label_name VARCHAR(255),
    label_color VARCHAR(7)
);

CREATE TABLE List (
    list_id INT PRIMARY KEY,
    list_name VARCHAR(255),
    board_id INT,
    position INT,
    members VARCHAR(255),
    FOREIGN KEY (board_id) REFERENCES Board(board_id)
);

CREATE TABLE Sprint (
    sprint_id INT PRIMARY KEY,
    sprint_name VARCHAR(255),
    board_id INT,
    start_date VARCHAR(7),
    end_date VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES Board(board_id)
);

CREATE TABLE Card (
    card_id INT PRIMARY KEY,
    card_title VARCHAR(255),
    card_description VARCHAR(255),
    list_id INT,
    sprint_id INT,
    due_date DATE,
    card_color_cover VARCHAR(7),
    member INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES List(list_id),
    FOREIGN KEY (sprint_id) REFERENCES Sprint(sprint_id)
);

CREATE TABLE Comment (
    comment_id INT PRIMARY KEY,
    card_id INT,
    card_title VARCHAR(255),
    sprint_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES Card(card_id)
);

CREATE TABLE User_Card (
    user_id INT,
    card_id INT,
    PRIMARY KEY (user_id, card_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (card_id) REFERENCES Card(card_id)
);

CREATE TABLE Card_Label (
    card_id INT,
    label_id INT,
    PRIMARY KEY (card_id, label_id),
    FOREIGN KEY (card_id) REFERENCES Card(card_id),
    FOREIGN KEY (label_id) REFERENCES Label(label_id)
);

CREATE TABLE User_Board (
    user_id INT,
    board_id INT,
    role VARCHAR(255),
    PRIMARY KEY (user_id, board_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (board_id) REFERENCES Board(board_id)
);
