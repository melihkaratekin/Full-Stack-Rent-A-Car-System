using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTOs
{
    public class CarImagesDto : IDto
    {
        public int Id { get; set; }
        public string CarName { get; set; }
        public string ImagePath { get; set; }
    }
}
