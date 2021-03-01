using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities.Concrete
{
    public class UserOperationClaim : IEntity
    {
        [Key]
        public int UOCId { get; set; }
        public int OCId { get; set; }
        public int UserId { get; set; }
        
    }
}