import { VerificationStatus } from "./Enums/VerificationStatus.enum";

export interface IRestaurant {
  Id: number;
  Name: string;
  Description: string;
  NumberOfRooms: number;
  BuildingNo: string;
  Address: string;
  City: string;
  Region: string;
  Street: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  VerificationStatus: VerificationStatus; // int
  Images: string[];
}
