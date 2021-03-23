import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  colorUpdateForm:FormGroup;

  constructor(private colorService:ColorService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getColorById(params["colorId"]);
        this.createColorUpdateForm();
      }
    });
  }

  getColorById(colorId:number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      this.color = response.data;
    });
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  updateColor(){
    this.colorUpdateForm.patchValue({ colorId: this.color.colorId })
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(
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
