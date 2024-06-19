import { ICartType } from "./ICartType";

export interface IOrder {
    id?:number;
    userId:number;
    promoId:number;
    date:Date;
    totalPrice:number;
    country:string;
    city:string;
    address:string;
    numberOfItems?:number;
    orderItems:{}[];
}