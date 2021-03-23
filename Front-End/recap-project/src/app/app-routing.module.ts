import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';


const routes: Routes = [
  {path: "", pathMatch:"full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/filter/:brandId", pathMatch:"full", component: CarComponent},
  {path: "cars/filter/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/filter/:brandId/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/cardetail/:carId", component: CarDetailComponent},
  {path: "carlist", component: CarListComponent},
  {path: "cars/add", component: CarAddComponent},
  {path: "cars/update/:carId", component: CarUpdateComponent},
  {path: "brandlist", component: BrandListComponent},
  {path: "brands/add", component: BrandAddComponent},
  {path: "brands/update/:brandId", component: BrandUpdateComponent},
  {path: "colorlist", component: ColorListComponent},
  {path: "colors/add", component: ColorAddComponent},
  {path: "colors/update/:colorId", component: ColorUpdateComponent},
  {path: "payment/:rentalId/:totalPrice", component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
