import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  brands:Brand[];
  colors:Color[];
  brandName:any;
  colorName:any;
  carUpdateForm:FormGroup;

  constructor(private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarById(params["carId"]);
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });
  }

  getCarById(carId:number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.car = response.data;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required]
    })
  }

  updateCar(){
    this.carUpdateForm.patchValue({ carId: this.car.carId })
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        },
        responseError => {
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

}
