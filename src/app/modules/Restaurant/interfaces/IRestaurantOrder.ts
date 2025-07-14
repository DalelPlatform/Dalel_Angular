import { OrderStatus } from "./Enums/Restaurant/OrderStatus.enum";

export interface IRestaurantOrder {
    Id: number;
    Date: Date;
    TotalPrice: number;
    OrderStatus: OrderStatus;
    RestaurantId: number;
    ClientId: string;
    RestaurantName: string;
    ClientName: string;
}
