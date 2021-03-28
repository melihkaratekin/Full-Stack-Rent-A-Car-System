import { CarImage } from "./car-image";

export class CarDetail {
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePaths:CarImage[];
  minFindeksScore:number;
}
