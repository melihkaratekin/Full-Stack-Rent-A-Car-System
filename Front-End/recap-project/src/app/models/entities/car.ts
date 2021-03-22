import { CarImage } from "./car-image";

export class Car {
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePaths:CarImage[];
}
