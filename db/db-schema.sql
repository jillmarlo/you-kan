CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP
);

CREATE TABLE Boards (
    board_id INT PRIMARY KEY,
    board_name VARCHAR(255),
    board_color_scheme VARCHAR(7),
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Labels (
    label_id INT PRIMARY KEY,
    label_name VARCHAR(255),
    label_color VARCHAR(7)
);

CREATE TABLE Lists (
    list_id INT PRIMARY KEY,
    list_name VARCHAR(255),
    board_id INT,
    position INT,
    members VARCHAR(255),
    FOREIGN KEY (board_id) REFERENCES Boards(board_id)
);

CREATE TABLE Sprints (
    sprint_id INT PRIMARY KEY,
    sprint_name VARCHAR(255),
    board_id INT,
    start_date VARCHAR(7),
    end_date VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES Boards(board_id)
);

CREATE TABLE Cards (
    card_id INT PRIMARY KEY,
    card_title VARCHAR(255),
    card_description VARCHAR(255),
    list_id INT,
    sprint_id INT,
    due_date DATE,
    card_color_cover VARCHAR(7),
    member INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES Lists(list_id),
    FOREIGN KEY (sprint_id) REFERENCES Sprints(sprint_id)
);

CREATE TABLE Comments (
    comment_id INT PRIMARY KEY,
    card_id INT,
    card_title VARCHAR(255),
    sprint_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES Cards(card_id)
);

CREATE TABLE User_Cards (
    user_id INT,
    card_id INT,
    PRIMARY KEY (user_id, card_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id)
);

CREATE TABLE Card_Labels (
    card_id INT,
    label_id INT,
    PRIMARY KEY (card_id, label_id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id),
    FOREIGN KEY (label_id) REFERENCES Labels(label_id)
);

CREATE TABLE User_Boards (
    user_id INT,
    board_id INT,
    role VARCHAR(255),
    PRIMARY KEY (user_id, board_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (board_id) REFERENCES Boards(board_id)
);
