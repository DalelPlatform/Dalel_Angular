import { BookingStatus } from "./Enums/BookingStatus.enum";

export interface IBookingProperty {
    Id:number;
    CheckIn:Date;
    CheckOut:Date;
    PricePerNight:number;
    PropertyName:string;
    ClientName:string;
    TotalPrice:number;
    Status:BookingStatus;
    PropertyId:number;
    ClientId:number;
}
