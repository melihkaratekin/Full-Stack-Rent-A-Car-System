import { ResponseModel } from "./response-model";

export interface ItemResponseModel<T> extends ResponseModel {
  data:T;
}
