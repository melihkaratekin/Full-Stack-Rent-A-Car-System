using System;
using System.Collections.Generic;
using System.Text;
using System.Transactions;
using Castle.DynamicProxy;
using Core.Utilities.Interceptors;

namespace Core.Aspects.Autofac.Transaction
{
    public class TransactionScopeAspect : MethodInterception
    {
        public override void Intercept(IInvocation invocation)
        {
            using (TransactionScope transactionScope = new TransactionScope())
            {
                try
                {
                    // Metodu çalıştır.
                    invocation.Proceed();
                    // İşlem tamamlandı olarak tanımla.
                    transactionScope.Complete();
                }
                catch (Exception e)
                {
                    // Herhangi bir exception yakalandıysa işlemi geri alır.
                    transactionScope.Dispose();
                    throw;
                }
            }
        }
    }
}