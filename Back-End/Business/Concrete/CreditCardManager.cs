using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Core.Aspect.Autofac.Caching;
using Core.Aspects.Autofac.Performance;
using Core.Aspects.Autofac.Validation;
using System;
using System.Collections.Generic;
using System.Text;
using Business.ValidationRules.FluentValidation;
using Core.Utilities.BusinessRules;

namespace Business.Concrete
{
    public class CreditCardManager : ICreditCardService
    {


        ICreditCardDal _creditCardDal;


        public CreditCardManager(ICreditCardDal creditCardDal)
        {
            _creditCardDal = creditCardDal;
        }


        //[SecuredOperation("admin,creditcard.add")]
        [ValidationAspect(typeof(CreditCardValidator))]
        [CacheRemoveAspect("ICreditCardService.Get")]
        public IResult Add(CreditCard creditCard)
        {
            var result = BusinessRules.Run(CheckCardIsExists(creditCard.CustomerId, creditCard.CardNo));

            if (result != null)
            {
                return result;
            }

            _creditCardDal.Add(creditCard);

            return new SuccessResult(Messages.CardAdded);
        }


        //[SecuredOperation("admin,creditcard.delete")]
        [CacheRemoveAspect("ICreditCardService.Get")]
        public IResult Delete(CreditCard creditCard)
        {
            _creditCardDal.Delete(creditCard);

            return new SuccessResult(Messages.CardDeleted);
        }


        //[SecuredOperation("admin,creditcard.update")]
        [ValidationAspect(typeof(CreditCardValidator))]
        [CacheRemoveAspect("ICreditCardService.Get")]
        public IResult Update(CreditCard creditCard)
        {
            _creditCardDal.Update(creditCard);

            return new SuccessResult(Messages.CardUpdated);
        }


        //[CacheAspect]
        //[PerformanceAspect(5)]
        public IDataResult<List<CreditCard>> GetByCustomerId(int customerId)
        {
            return new SuccessDataResult<List<CreditCard>>(_creditCardDal.GetAll(c => c.CustomerId == customerId));
        }


        // Business Rules Methods
        private IResult CheckCardIsExists(int customerId, string cardNo)
        {
            var result = _creditCardDal.Get(c => c.CardNo == cardNo
                                            && c.CustomerId == customerId);

            if (result != null)
            {
                return new ErrorResult(Messages.CardIsExists);
            }
            return new SuccessResult();
        }


    }
}