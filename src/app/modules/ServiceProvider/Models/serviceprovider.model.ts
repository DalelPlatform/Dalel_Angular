import { scheduleItem } from "./schedule.model";

export interface ServiceProvider {
  UserId: string;
  UserName: string;
  ServiceArea: string;
  CategoryServicesId: number;
  Image: string;
  District?:string;
  Country?: string;
  ZipCode?: string;
  Schedules: scheduleItem[];
  Price?: number;
  PriceUnit?: string;
  Website?: string;
  City?: string;
  Address?: string;
  
  About?: string;
}