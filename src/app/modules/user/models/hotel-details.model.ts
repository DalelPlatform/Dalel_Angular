export interface HotelDetails {
    id: number;
    name: string;
    description: string;
    city: string;
    street: string;
    address: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    cancelationOptions: boolean;
    cancelationCharges: number;
    ownerId: string;
    verificationStatus: string;   // enum as string
    images: string[];             // URLs returned by server
  }
  