using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Abstract;
using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarImagesController : ControllerBase
    {


        ICarImageService _carimageService;


        public CarImagesController(ICarImageService carimageService)
        {
            _carimageService = carimageService;
        }


        [HttpPost("add")]
        public IActionResult Add([FromForm] CarImage carImage, [FromForm(Name = "Image")] IFormFile file)
        {
            var result = _carimageService.Add(carImage, file);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }


        [HttpPost("delete")]
        public IActionResult Delete(CarImage carImage)
        {
            var result = _carimageService.Delete(carImage);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }


        [HttpPost("update")]
        public IActionResult Update([FromForm] CarImage carImage, [FromForm(Name = "Image")] IFormFile file)
        {
            var result = _carimageService.Update(carImage, file);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }


        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _carimageService.GetAll();

            if (result.Success)
            {
                return Ok(result.Data);
            }
            else
            {
                return BadRequest(result.Message);
            }
        }


        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _carimageService.GetById(id);

            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }


    }
}
