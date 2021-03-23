import { Brand } from './../../models/entities/brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm:FormGroup;

  constructor(private brandService:BrandService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getBrandById(params["brandId"]);
        this.createBrandUpdateForm();
      }
    });
  }

  getBrandById(brandId:number) {
    this.brandService.getBrandById(brandId).subscribe(response => {
      this.brand = response.data;
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
  }

  updateBrand(){
    this.brandUpdateForm.patchValue({ brandId: this.brand.brandId })
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(
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
