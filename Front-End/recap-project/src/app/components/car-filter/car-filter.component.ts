import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {

  title = "Filter"
  brands: Brand[] = [];
  colors: Color[] = [];
  brandId: Number;
  brandFilterText:string
  colorId: Number;
  colorFilterText:string;

  constructor(private brandService: BrandService,
              private colorService: ColorService) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getSelectedBrand(brandId: Number) {
    if (this.brandId == brandId) {
      return true;
    }
    else {
      return false;
    }
  }

  getSelectedColor(colorId: Number) {
    if (this.colorId == colorId) {
      return true;
    }
    else {
      return false;
    }
  }

}
