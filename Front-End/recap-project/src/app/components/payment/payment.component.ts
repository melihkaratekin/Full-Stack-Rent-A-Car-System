import { RentalService } from 'src/app/services/rental.service';
import { Rental } from './../../models/entities/rental';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/entities/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  title = "Payment Screen"
  rental:Rental;
  paymentModel:Payment = new Payment();
  totalPrice:any;

  constructor(private paymentService:PaymentService,
              private rentalService:RentalService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["rentalId"] && params["totalPrice"]){
        this.totalPrice = params["totalPrice"];
        this.getRentalDetails(params["rentalId"]);
      }
    });
  }

  getRentalDetails(rentalId:Number) {
    this.rentalService.getRental(rentalId).subscribe(response => {
      this.rental = response.data;
    })
  }

  addPayment(form:NgForm) {
    this.paymentModel.RentalId = 1;
    this.paymentService.addPayment(this.paymentModel).subscribe(
      res => { this.toastrService.success("Payment is successful."); },
      err => { this.toastrService.error("Payment error."); }
    )
  }

}
