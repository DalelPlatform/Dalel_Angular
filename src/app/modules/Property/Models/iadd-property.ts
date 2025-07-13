export interface IAddProperty {
  Description: string;
  Amenities: string;
  PricePerNight: number;
  NumberOfRooms: number;
  BuildingNo: number;
  FloorNo: number;
  Address: string;
  City: string;
  Region: string;
  Street: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: string;
  CancelationOptions: boolean;
  IsForRent: boolean;
  VerificationStatus: number;
  CancelationCharges: number;
  PropertyImages: string[];
}
