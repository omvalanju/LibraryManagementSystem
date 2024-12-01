CREATE TABLE Books (
    Book_ID INT PRIMARY KEY,
    Title VARCHAR(255),
    Author VARCHAR(255),
    Publisher VARCHAR(255),
    ISBN VARCHAR(20),
    Published_Year YEAR,
    Copies_Available INT
);

CREATE TABLE Users (
    User_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Phone_Number VARCHAR(15),
    Address TEXT,
    Join_Date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Borrow_Records (
    Record_ID INT PRIMARY KEY,
    User_ID INT,
    Book_ID INT,
    Borrow_Date DATE,
    Due_Date DATE,
    Return_Date DATE,
    Fine_Amount DECIMAL(10, 2),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Books(Book_ID)
);

CREATE TABLE Staff (
    Staff_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Position VARCHAR(100),
    Email VARCHAR(255) UNIQUE,
    Phone_Number VARCHAR(15),
    Hire_Date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Reservations (
    Reservation_ID INT PRIMARY KEY,
    User_ID INT,
    Book_ID INT,
    Reservation_Date DATE,
    Status ENUM('Pending', 'Completed', 'Cancelled'),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Book_ID) REFERENCES Books(Book_ID)
);

CREATE TABLE Fines (
    Fine_ID INT PRIMARY KEY,
    User_ID INT,
    Total_Fine_Amount DECIMAL(10, 2),
    Fine_Paid BOOLEAN,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);
