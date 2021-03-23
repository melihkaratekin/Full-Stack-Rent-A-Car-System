import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/entities/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:Car[];

  constructor(private carService:CarService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    })
  }

  deleteCar(car:Car) {
    this.carService.deleteCar(car).subscribe((response) => {
      this.toastrService.error("The car is deleted.");
      setTimeout(() => { window.location.reload(); }, 1500);
    })
  }

}
