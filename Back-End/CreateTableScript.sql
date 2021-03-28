CREATE TABLE Brands (
    BrandId int NOT NULL IDENTITY,
    BrandName varchar(255) NOT NULL,
    CONSTRAINT PK_Brands PRIMARY KEY (BrandId)
);

CREATE TABLE Colors (
    ColorId int NOT NULL IDENTITY,
    ColorName varchar(255) NOT NULL,
    CONSTRAINT PK_Colors PRIMARY KEY (ColorId)
);

CREATE TABLE Cars (
    CarId int NOT NULL IDENTITY,
    BrandId int NOT NULL,
    ColorId int NOT NULL,
    CarName varchar(255) NOT NULL,
    ModelYear varchar(255) NOT NULL,
    DailyPrice decimal(18) NOT NULL,
    Description varchar(255) NOT NULL,
    MinFindeksScore int DEFAULT 0,
    CONSTRAINT PK_Cars PRIMARY KEY (CarId),
    FOREIGN KEY (BrandId) REFERENCES Brands(BrandId),
    FOREIGN KEY (ColorId) REFERENCES Colors(ColorId)
);

CREATE TABLE Users (
    Id int NOT NULL IDENTITY,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    PasswordSalt varbinary(500) NOT NULL,
    PasswordHash varbinary(500) NOT NULL,
    Status bit NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY (Id)
);

CREATE TABLE Customers (
    CustomerId int NOT NULL IDENTITY,
    UserId int NOT NULL,
    CompanyName varchar(255) NOT NULL,
    FindeksScore int DEFAULT 0,
    CONSTRAINT PK_Customers PRIMARY KEY (CustomerId),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Rentals (
    RentalId int NOT NULL IDENTITY,
    CarId int NOT NULL,
    CustomerId int NOT NULL,
    RentDate datetime NOT NULL,
    ReturnDate datetime DEFAULT NULL,
    CONSTRAINT PK_Rentals PRIMARY KEY (RentalId),
    FOREIGN KEY (CarId) REFERENCES Cars(CarId),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);

CREATE TABLE CarImages (
    CarImageId int NOT NULL IDENTITY,
    CarId int NOT NULL,
    ImagePath varchar(255) NOT NULL,
    ImageDate datetime DEFAULT GETDATE(),
    CONSTRAINT PK_CarImages PRIMARY KEY (CarImageId),
    FOREIGN KEY (CarId) REFERENCES Cars(CarId)
);

CREATE TABLE OperationClaims (
    OCId int NOT NULL IDENTITY,
    OCName varchar(255) NOT NULL,
    CONSTRAINT PK_OperationClaims PRIMARY KEY (OCId)
);

CREATE TABLE UserOperationClaims (
    UOCId int NOT NULL IDENTITY,
    OCId int NOT NULL,
    UserId int NOT NULL,
    CONSTRAINT PK_UserOperationClaims PRIMARY KEY (UOCId),
    FOREIGN KEY (OCId) REFERENCES OperationClaims(OCId),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Payments (
    PaymentId int NOT NULL IDENTITY,
    RentalId int NOT NULL,
    NameSurname varchar(255) NOT NULL,
    CardNo varchar(255) NOT NULL,
    ExpirationDate varchar(255) NOT NULL,
    Cvc varchar(255) NOT NULL,
    PaymentDate datetime DEFAULT GETDATE(),
    CONSTRAINT PK_Payments PRIMARY KEY (PaymentId),
    FOREIGN KEY (RentalId) REFERENCES Rentals(RentalId)
);

CREATE TABLE CreditCards (
    CreditCardId int NOT NULL IDENTITY,
    CustomerId int NOT NULL,
    NameSurname varchar(255) NOT NULL,
    CardNo varchar(255) NOT NULL,
    ExpirationDate varchar(255) NOT NULL,
    Cvc varchar(255) NOT NULL,
    CONSTRAINT PK_CreditCards PRIMARY KEY (CreditCardId),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);