using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Castle.DynamicProxy;
using Core.CrossCuttingConcerns.Validation;
using Core.Utilities.Interceptors;
using Core.Utilities.Messages;
using FluentValidation;

namespace Core.Aspects.Autofac.Validation
{
    public class ValidationAspect : MethodInterception
    {
        private Type _validatorType;

        /*

            Örneğin BrandManager'daki herhangi bir metoda aşağıdaki aspect kodunu yazmış olalım.

            [ValidationAspect(typeof(BrandValidator))]
                              ----------------------
                                        |
                                  BrandValidator

        */

        public ValidationAspect(Type validatorType)
        {
            // Gönderilen Validator'un (BrandValidator) IValidator tipinden olup olmadığını kontrol eder.
            if (!typeof(IValidator).IsAssignableFrom(validatorType))
            {
                // Değilse hata fırlatır.
                throw new System.Exception(AspectMessages.WrongValidationType);
            }
            // IValidator tipindeyse atamayı yapar. (_validatorType = BrandValidator)
            _validatorType = validatorType;
        }

        // OnBefore = Metot çalışmadan önce ilgili aspect'i devreye sokar.
        protected override void OnBefore(IInvocation invocation)
        {

            // Validator'dan (BrandValidator) bir instance oluşturur.
            var validator = (IValidator)Activator.CreateInstance(_validatorType);

            // Validator'ın  base sınıfındaki (AbstractValidator<Brand>) Generic argümanının değerini (Brand) alır.
            var entityType = _validatorType.BaseType.GetGenericArguments()[0];

            // Metodun parametrelerinde entityType sınıfından (Brand) instance alınmış entity'leri bul. (Örn: Brand brand)
            var entities = invocation.Arguments.Where(t => t.GetType() == entityType);

            // Hepsini gez ve Validator'daki (BrandValidator) koşulları sağladığını doğrula.
            foreach (var entity in entities)
            {
                ValidationTool.Validate(validator, entity);
            }
        }
    }
}