using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCustomerDal : EfEntityRepositoryBase<Customer, DatabaseContext>, ICustomerDal
    {
        public UserWhoIsCustomerDto GetCustomerIdOfUser(string email)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from c in context.Customers
                             join u in context.Users on c.UserId equals u.Id
                             where u.Email == email
                             select new UserWhoIsCustomerDto
                             {
                                 userId = u.Id,
                                 email = u.Email,
                                 customerId = c.CustomerId,
                                 FindeksScore = c.FindeksScore,
                                 CompanyName = c.CompanyName
                             };

                return result.SingleOrDefault();
            };
        }

    }
}