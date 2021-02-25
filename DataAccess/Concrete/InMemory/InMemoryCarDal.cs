using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.InMemory
{
    public class InMemoryCarDal : ICarDal
    {
        List<Car> _cars;

        public InMemoryCarDal()
        {
            _cars = new List<Car>()
            {
                new Car{Id=1,BrandId=2,ColorId=1,ModelYear=2005,DailyPrice=50000,Description="AMG"},
                new Car{Id=2,BrandId=2,ColorId=1,ModelYear=2010,DailyPrice=25000,Description="Sport"},
                new Car{Id=3,BrandId=3,ColorId=2,ModelYear=2015,DailyPrice=55000,Description="Diesel"},
                new Car{Id=4,BrandId=3,ColorId=2,ModelYear=2020,DailyPrice=35000,Description="GTI"},
                new Car{Id=5,BrandId=1,ColorId=3,ModelYear=2021,DailyPrice=45000,Description="M5"},
                new Car{Id=6,BrandId=1,ColorId=3,ModelYear=2021,DailyPrice=50000,Description="Sport"},
            };
        }
        public void Add(Car car)
        {
            _cars.Add(car);
            
        }

        public void Delete(Car car)
        {
            Car deleteToCar;
            deleteToCar = _cars.SingleOrDefault(c => c.Id == car.Id);
            _cars.Remove(deleteToCar);
        }

        public Car Get(Expression<Func<Car, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public List<Car> GetAll()
        {
            return _cars;
        }

        public List<Car> GetAll(Expression<Func<Car, bool>> filter = null)
        {
            throw new NotImplementedException();
        }

        public Car GetByID(int carId)
        {
            return _cars.SingleOrDefault(c => c.Id == carId);
        }

        public List<CarDetailDto> GetCarDetails()
        {
            throw new NotImplementedException();
        }

        public List<CarImagesDto> GetCarImages(int carId)
        {
            throw new NotImplementedException();
        }

        public void Update(Car car)
        {
            Car updateToCar;
            updateToCar = _cars.SingleOrDefault(c => c.Id == car.Id);

            updateToCar.BrandId = car.BrandId;
            updateToCar.ColorId = car.ColorId;
            updateToCar.DailyPrice = car.DailyPrice;
            updateToCar.Description = car.Description;
            updateToCar.ModelYear = car.ModelYear;

        }
    }
}
