INSERT INTO Reservations (Reservation_ID, User_ID, Book_ID, Reservation_Date, Status) VALUES
(1, 1, 3, '2024-01-12', 'Pending'),
(2, 2, 2, '2024-01-18', 'Completed'),
(3, 3, 1, '2024-01-20', 'Cancelled');

INSERT INTO Staff (Staff_ID, Name, Position, Email, Phone_Number, Hire_Date) VALUES
(1, 'Diana Prince', 'Librarian', 'diana@example.com', '1231231234', '2023-12-01'),
(2, 'Clark Kent', 'Assistant Librarian', 'clark@example.com', '9879879876', '2023-11-15');

INSERT INTO Borrow_Records (Record_ID, User_ID, Book_ID, Borrow_Date, Due_Date, Return_Date, Fine_Amount) VALUES
(1, 1, 2, '2024-01-15', '2024-02-01', NULL, 0.00),
(2, 2, 1, '2024-01-10', '2024-01-25', '2024-01-22', 0.00),
(3, 3, 3, '2024-01-20', '2024-02-05', NULL, 2.50);

INSERT INTO Users (User_ID, Name, Email, Phone_Number, Address, Join_Date) VALUES
(1, 'Alice Smith', 'alice@example.com', '1234567890', '123 Main St, Cityville', '2024-01-01'),
(2, 'Bob Johnson', 'bob@example.com', '9876543210', '456 Oak St, Townsville', '2024-01-05'),
(3, 'Charlie Brown', 'charlie@example.com', '5555555555', '789 Pine St, Hamlet', '2024-01-10');

INSERT INTO Books (Book_ID, Title, Author, Publisher, ISBN, Published_Year, Copies_Available) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', '9780743273565', 1925, 5),
(2, '1984', 'George Orwell', 'Secker & Warburg', '9780451524935', 1949, 8),
(3, 'To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', '9780060935467', 1960, 3);

INSERT INTO Fines (Fine_ID, User_ID, Total_Fine_Amount, Fine_Paid) VALUES
(1, 3, 2.50, FALSE),
(2, 1, 0.00, TRUE),
(3, 2, 0.00, TRUE);


