using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities.Concrete
{
    public class OperationClaim : IEntity
    {
        [Key]
        public int OCId { get; set; }
        public string OCName { get; set; }
    }
}
