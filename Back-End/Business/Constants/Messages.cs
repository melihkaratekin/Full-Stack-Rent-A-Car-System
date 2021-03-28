using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Constants
{
    public static class Messages
    {
        // Common Messages
        public static string MaintenanceTime = "The system is in maintenance.";
        public static string MessageListed = "Listed.";
        public static string MessageNotListed = "Not listed.";

        // JWT Authentication Messages
        public static string TokenCreated = "Token created.";
        public static string AuthorizationDenied = "Authorization denied.";
        public static string LoginSuccessful = "Login successful.";
        public static string Registered = "Registered.";
        public static string UserAlreadyExists = "User already exists.";
        public static string UserNotFound = "User not found.";
        public static string WrongPassword = "Wrong password.";

        // Car Messages
        public static string CarAdded = "Car added.";
        public static string CarDeleted = "Car deleted.";
        public static string CarUpdated = "Car updated.";
        public static string CarNameInvalid = "Car name is invalid.";

        // Car Images Messages
        public static string CarImageAdded = "Car image added.";
        public static string CarImageDeleted = "Car image deleted.";
        public static string CarImageUpdated = "Car image updated.";
        public static string CarImageNumberError = "A car cannot have more than 5 images.";
        public static string CarImageNotFound = "Car image not found";

        // Brand Messages 
        public static string BrandAdded = "Brand added.";
        public static string BrandDeleted = "Brand deleted.";
        public static string BrandUpdated = "Brand updated.";
        public static string BrandNameInvalid = "Brand name is invalid.";

        // Color Messages
        public static string ColorAdded = "Color added.";
        public static string ColorDeleted = "Color deleted.";
        public static string ColorUpdated = "Color updated.";
        public static string ColorNameInvalid = "Color name is invalid.";

        // User Messages
        public static string UserAdded = "User added.";
        public static string UserDeleted = "User deleted.";
        public static string UserUpdated = "User updated.";
        public static string UserNameInvalid = "User name is invalid.";
        public static string CurrentPasswordIsWrong = "Your current password is wrong.";
        public static string PasswordUpdated = "Your password is updated successfully.";

        // Rental Messages
        public static string RentalAdded = "Rental added.";
        public static string RentalDeleted = "Rental deleted.";
        public static string RentalUpdated = "Rental updated.";
        public static string RentalNameInvalid = "Rental name is invalid.";
        public static string CarIsAlreadyRented = "Car is already rented.";
        public static string FindeksScoreIsNotEnough = "Your findeks score is not enough for this car.";

        // Customer Messages
        public static string CustomerAdded = "Customer added.";
        public static string CustomerDeleted = "Customer deleted.";
        public static string CustomerUpdated = "Customer updated.";
        public static string CustomerNameInvalid = "Customer name is invalid.";

        // Payment Messages
        public static string PaymentAdded = "Payment completed successfully.";

        // Credit Card Messages
        public static string CardAdded = "Card added.";
        public static string CardDeleted = "Card deleted.";
        public static string CardUpdated = "Card updated.";
        public static string CardIsExists = "Card is exists.";
        public static string CardIsNotExists = "Card is not exists.";
    }
}
