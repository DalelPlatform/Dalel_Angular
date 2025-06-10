export interface IRestaurant {
  Id: number;
  Name: string;
  Description: string;
  OfRooms: number;
  BuildingNo: string;
  Address: string;
  City: string;
  Region: string;
  Street: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  VerificationStatus: number; // int
  OwnerId: string; // foreign key
  Images: string[];
}
