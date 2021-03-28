import { CreditCard } from './../../models/entities/credit-card';
import { CreditCardService } from './../../services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from './../../models/entities/rental';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/entities/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
              private creditCardService:CreditCardService,
              private rentalService:RentalService,
              private localStorage:LocalStorageService,
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
    this.paymentModel.rentalId = this.rental.rentalId;

    if(this.paymentModel.saveCard == true) {

      let creditCard:CreditCard = new CreditCard();
      creditCard.customerId = this.localStorage.get("customerId") == null ? 0 : Number(this.localStorage.get("customerId"));
      creditCard.nameSurname = this.paymentModel.nameSurname;
      creditCard.cardNo = this.paymentModel.cardNo;
      creditCard.expirationDate = this.paymentModel.expirationDate;
      creditCard.cvc = this.paymentModel.cvc;
      this.creditCardService.addCreditCard(creditCard).subscribe(
        res => { this.toastrService.success("Credit card is saved."); },
        err => { this.toastrService.info("Credit card is already exists"); }
      )

    }

    this.paymentService.addPayment(this.paymentModel).subscribe(
      res => { this.toastrService.success("Payment is successful."); },
      err => { this.toastrService.error("Payment error."); }
    )
  }

}
