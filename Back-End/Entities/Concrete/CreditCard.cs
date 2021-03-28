using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Concrete
{
    public class CreditCard : IEntity
    {
        public int CreditCardId { get; set; }
        public int CustomerId { get; set; }
        public string NameSurname { get; set; }
        public string CardNo { get; set; }
        public string ExpirationDate { get; set; }
        public string Cvc { get; set; }
    }
}
