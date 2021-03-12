using Core.DataAccess.EntityFramework;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User, DatabaseContext>, IUserDal
    {
        public List<OperationClaim> GetClaims(User user)
        {
            using (var context = new DatabaseContext())
            {
                var result = from operationClaim in context.OperationClaims
                             join userOperationClaim in context.UserOperationClaims
                             on operationClaim.OCId equals userOperationClaim.OCId
                             where userOperationClaim.UserId == user.Id
                             select new OperationClaim
                             {
                                 OCId = operationClaim.OCId,
                                 OCName = operationClaim.OCName
                             };
                return result.ToList();
            }
        }
    }
}