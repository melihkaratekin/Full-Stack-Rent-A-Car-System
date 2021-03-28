import { UserPasswordUpdateComponent } from './components/user-password-update/user-password-update.component';
import { UserInfosUpdateComponent } from './components/user-infos-update/user-infos-update.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
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
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: "", pathMatch:"full", component: CarComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "updateinfos", component:UserInfosUpdateComponent, canActivate: [LoginGuard]},
  {path: "updatepassword", component:UserPasswordUpdateComponent, canActivate: [LoginGuard]},
  {path: "cars", component: CarComponent},
  {path: "cars/filterBrand/:brandId", pathMatch:"full", component: CarComponent},
  {path: "cars/filterColor/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/filter/:brandId/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/cardetail/:carId", component: CarDetailComponent},
  {path: "carlist", component: CarListComponent, canActivate: [LoginGuard]},
  {path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard]},
  {path: "cars/update/:carId", component: CarUpdateComponent, canActivate: [LoginGuard]},
  {path: "brandlist", component: BrandListComponent, canActivate: [LoginGuard]},
  {path: "brands/add", component: BrandAddComponent, canActivate: [LoginGuard]},
  {path: "brands/update/:brandId", component: BrandUpdateComponent, canActivate: [LoginGuard]},
  {path: "colorlist", component: ColorListComponent, canActivate: [LoginGuard]},
  {path: "colors/add", component: ColorAddComponent, canActivate: [LoginGuard]},
  {path: "colors/update/:colorId", component: ColorUpdateComponent, canActivate: [LoginGuard]},
  {path: "payment/:rentalId/:totalPrice/:customerId", component: PaymentComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
