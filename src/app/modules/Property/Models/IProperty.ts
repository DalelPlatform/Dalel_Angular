export interface IProperty {
    Id: number,
    Description: string,
    Amenities: string,
    NumberOfRooms: number,
    PricePerNight: number,
    BuildingNo: number,
    FloorNo: number,
    Address: string,
    City: string,
    Region: string,
    Street: string,
    PhoneNumber: string
    IsForRent: boolean,
    Latitude: number,
    Longitude: number,
    CancelationOptions: boolean,
    CancelationCharges: number,
    PropertyOwner: string,
    Rating: number,
    VerificationStatus: number,
    Images?: string[]
}

export enum VerificationStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2
  }