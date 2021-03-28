using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.BusinessRules;
using System.IO;
using System.Linq;
using Business.BusinessAspects.Autofac;
using Core.Aspect.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Microsoft.AspNetCore.Http;
using Core.Utilities.Helpers;

namespace Business.Concrete
{
    public class CarImageManager : ICarImageService
    {


        ICarImageDal _carImageDal;


        public CarImageManager(ICarImageDal carimageDal)
        {
            _carImageDal = carimageDal;
        }


        //[SecuredOperation("admin,carimage.add")]
        [ValidationAspect(typeof(CarImageValidator))]
        [CacheRemoveAspect("ICarImageService.Get")]
        public IResult Add(CarImage carImage, IFormFile file)
        {
            var result = BusinessRules.Run(CheckCarImageCount(carImage.CarId));
            
            if (result != null)
            {
                return result;
            }

            carImage.ImageDate = DateTime.Now;
            carImage.ImagePath = FileHelper.AddFile(file);
            
            _carImageDal.Add(carImage);

            return new SuccessResult(Messages.CarImageAdded);
        }


        [SecuredOperation("admin,carimage.delete")]
        [CacheRemoveAspect("ICarImageService.Get")]
        public IResult Delete(CarImage carImage)
        {
            var image = _carImageDal.Get(c => c.CarImageId == carImage.CarImageId);
            
            if (image == null)
            {
                return new ErrorResult(Messages.CarImageNotFound);
            }

            FileHelper.DeleteFile(image.ImagePath);

            _carImageDal.Delete(carImage);

            return new SuccessResult(Messages.CarImageDeleted);
        }


        [SecuredOperation("admin,carimage.update")]
        [ValidationAspect(typeof(CarImageValidator))]
        [CacheRemoveAspect("ICarImageService.Get")]
        public IResult Update(CarImage carImage, IFormFile file)
        {
            var oldImage = _carImageDal.Get(c => c.CarImageId == carImage.CarImageId);

            if (oldImage == null)
            {
                return new ErrorResult(Messages.CarImageNotFound);
            }

            carImage.ImageDate = DateTime.Now;
            carImage.ImagePath = FileHelper.UpdateFile(file, oldImage.ImagePath);

            _carImageDal.Update(carImage);

            return new SuccessResult(Messages.CarImageUpdated);
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll(), Messages.MessageListed);
        }


        [CacheAspect]
        [PerformanceAspect(5)]
        public IDataResult<CarImage> GetById(int carImageId)
        {
            return new SuccessDataResult<CarImage>(_carImageDal.Get(ci => ci.CarImageId == carImageId));
        }


        // Business Rules Methods
        private IResult CheckCarImageCount(int carId)
        {
            if (_carImageDal.GetAll(ci => ci.CarId == carId).Count >= 5)
            {
                return new ErrorResult(Messages.CarImageNumberError);
            }
            return new SuccessResult();
        }


    }
}