export interface ServiceProviderProfile {
  image?: File;
  about: string;
  website?: string;
  price: number;
  priceUnit: 'per_hour' | 'per_project';
  schedules: Schedule[];
}

export interface Schedule {
  day: string;
  enabled: boolean;
  availableFrom: string;
  availableTo: string;
}