

export interface PropertyImage {
    id: number;
    imageUrl: string;
    propertyId: number;
  }
  
  export interface PropertyOwner {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export enum VerificationStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2
  }
  
  export interface Property {
    id: number;
    description: string;
    amenities: string;
    numberOfRooms: number;
    pricePerNight: number;
    buildingNo: number;
    floorNo: number;
    address: string;
    city: string;
    region: string;
    street: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    cancelationOptions: boolean;
    isForRent: boolean;
    verificationStatus: VerificationStatus;
    cancelationCharges: number;
    modificationDate: Date;
    ownerId: string;
    isDeleted: boolean;
    propertyOwner?: PropertyOwner;
    propertyImages?: PropertyImage[];
  }