using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;

namespace DataAccess.Abstract
{
    public interface IPaymentDal : IEntityRepository<Payment>
    {
    }
}
