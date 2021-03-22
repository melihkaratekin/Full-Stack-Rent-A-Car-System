using Core.Entities;
using System;

namespace Entities.Concrete
{
    public class Payment : IEntity
    {
        public int PaymentId { get; set; }
        public int RentalId { get; set; }
        public string NameSurname { get; set; }
        public string CardNo { get; set; }
        public string ExpirationDate { get; set; }
        public string Cvc { get; set; }
    }
}