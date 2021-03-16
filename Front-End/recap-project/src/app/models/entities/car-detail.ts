import { CarImage } from './car-image';

export interface CarDetail {
  carId:number;
  carName:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  imagePaths:CarImage[];
}
