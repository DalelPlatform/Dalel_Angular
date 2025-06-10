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
    PropertyOwner: string,
    VerificationStatus: number,
    Images?: string[]
}
