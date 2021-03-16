import { ResponseModel } from "./response-model";

export interface ListResponseModel<T> extends ResponseModel {
  data:T[];
}
