using Castle.DynamicProxy;
using Core.CrossCuttingConcerns.Caching;
using Core.Utilities.Interceptors;
using Core.Utilities.IoC;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace Core.Aspect.Autofac.Caching
{
    public class CacheAspect : MethodInterception
    {
        private int _duration;
        private ICacheManager _cacheManager;

        public CacheAspect(int duration = 60)
        {
            _duration = duration;
            _cacheManager = ServiceTool.ServiceProvider.GetService<ICacheManager>();
        }

        public override void Intercept(IInvocation invocation)
        {

            // Örneğin BrandManager'daki GetById'ye CacheAspect ekledik varsayalım.


            // invocation.Method.ReflectedType.FullName = RentACarSystem.Business.Concrete.IBrandService
            // invocation.Method.Name = GetById
            // methodName = Business.Abstract.IBrandService.GetById
            var methodName = string.Format($"{invocation.Method.ReflectedType.FullName}.{invocation.Method.Name}");
            
            // Metodun parametrelerini arguments'e ata. (brandId)
            var arguments = invocation.Arguments.ToList();

            // Parametre varsa String'e dönüştür, yoksa null ata.
            // key = Business.Abstract.IBrandService.GetById( brandId ) => brandId'ye atanan değer neyse o yazılır. (1, 2 vb)
            var key = $"{methodName}({string.Join(",", arguments.Select(x => x?.ToString() ?? "<Null>"))})";
            
            // Eğer key değeri cache bellekte varsa
            if (_cacheManager.IsAdd(key))
            {
                // invocation.ReturnValue = Metodu hiç çalıştırmadan şu değeri dön demektir.
                // Metot hiç çalıştırılmadan cache'de o key'e ait olan değer dönecek.
                invocation.ReturnValue = _cacheManager.Get(key);
                return;
            }
            
            // Eğer key değeri cache bellekte yoksa Proceed ile metodu çalıştır.
            invocation.Proceed();

            // Bu key'i ve return edilen değeri belirlenen zaman dilimi kadar cache belleğe ekle.
            _cacheManager.Add(key, invocation.ReturnValue, _duration);

        }
    }
}