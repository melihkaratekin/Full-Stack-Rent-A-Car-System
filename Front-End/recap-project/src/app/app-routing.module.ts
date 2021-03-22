import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  {path: "", pathMatch:"full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/filter/:brandId", pathMatch:"full", component: CarComponent},
  {path: "cars/filter/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/filter/:brandId/:colorId", pathMatch:"full", component: CarComponent},
  {path: "cars/cardetail/:carId", component: CarDetailComponent},
  {path: "payment/:rentalId/:totalPrice", component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
