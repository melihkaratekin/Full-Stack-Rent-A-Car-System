using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using System;
using System.Collections.Generic;

namespace ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            //CarTest();
            //BrandTest();
            //ColorTest();
            //AddRentalTest();
        }

        private static void CarTest()
        {
            CarManager carManager = new CarManager(new EfCarDal());
            /*
            carManager.Add(new Car { Id = 6, BrandId = 1, ColorId = 3, CarName = "B", ModelYear = 2021, DailyPrice = 2500, Description = "AMGv2" });
            carManager.Update(new Car { Id = 4, BrandId = 2, ColorId = 1, CarName = "B", ModelYear = 2019, DailyPrice = 18000, Description = "TSI" });
            carManager.Delete(new Car { Id = 6 });
            */
            //var result = carManager.GetCarDetails(1);
            
            //if(result.Success == true)
            //{
            //    foreach (var car in result.Data)
            //    {
            //        Console.WriteLine("Car Name: " + car.CarName +
            //                    "      Car Brand Name: " + car.BrandName +
            //                    "      Car Color Name: " + car.ColorName +
            //                    "      Car Daily Price: " + car.DailyPrice);
            //    }
            //}
            //else
            //{
            //    Console.WriteLine(result.Message);
            //}

        }

        private static void BrandTest()
        {
            BrandManager brandManager = new BrandManager(new EfBrandDal());
            /*
            brandManager.Add(new Brand { BrandId = 4, BrandName = "Bentley" });
            brandManager.Update(new Brand { BrandId = 3, BrandName = "Audi" });
            brandManager.Delete(new Brand { BrandId = 4 });
            */
            var result = brandManager.GetAll();

            if (result.Success == true)
            {
                foreach (var brand in result.Data)
                {
                    Console.WriteLine("Brand Id: " + brand.BrandId +
                                "      Brand Name: " + brand.BrandName);
                }
            }
            else
            {
                Console.WriteLine(result.Message);
            }
        }

        private static void ColorTest()
        {
            ColorManager colorManager = new ColorManager(new EfColorDal());
            /*
            colorManager.Add(new Color { ColorId = 6, ColorName = "Yellow" });
            colorManager.Update(new Color { ColorId = 3, ColorName = "Red" });
            colorManager.Delete(new Color { ColorId = 6 });
            */
            var result = colorManager.GetAll();

            if (result.Success == true)
            {
                foreach (var color in result.Data)
                {
                    Console.WriteLine("Color Id: " + color.ColorId +
                                "      Color Name: " + color.ColorName);
                }
            }
            else
            {
                Console.WriteLine(result.Message);
            }
        }

        private static void AddRentalTest()
        {
            UserManager userManager = new UserManager(new EfUserDal());
            CustomerManager customerManager = new CustomerManager(new EfCustomerDal());
            RentalManager rentalManager = new RentalManager(new EfRentalDal());

            //userManager.Add(new User { Id = 10, FirstName = "User", LastName = "Name", Email = "a@a.com", Password="12345" });
            //customerManager.Add(new Customer { CustomerId = 8, UserId = 10, CompanyName = "XYZ" });
            //rentalManager.Add(new Rental { RentalId = 8, CarId = 5, CustomerId = 10, RentDate = "22.02.2021", ReturnDate = "23.02.2021"  });
        }

        

    }
}
