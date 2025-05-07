import { IUserRegister } from './user.model';

export interface IServiceProvider extends IUserRegister {
    WorkType: string;
    LicenseNumber: string;
    Image: string;
    Skills: string[];
    StartProffessionDate: Date;
    Address: string;
    City: string;
    About: string;
    License: string;
    Certificate: string;
    CategoryServiceId: number;
    AverageRate: number;
  }
  
  export interface IPropertyOwner extends IUserRegister {

  }
  
  export interface IHotelOwner extends IUserRegister {

  }

    export interface IRestaurantOwner extends IUserRegister {

    }

    export interface IDriver extends IUserRegister {
        LicenseNumber: string;
        Avaliablitiy: string;
    }
    export interface ITravelAgencyOwner extends IUserRegister {
        
    }
    export interface IHomeChef extends IUserRegister {
        FoodSafetyCertificate: string;
        BankDetails: string;
        WorkingHours: string;
        IsDeleted: boolean;
        
    }