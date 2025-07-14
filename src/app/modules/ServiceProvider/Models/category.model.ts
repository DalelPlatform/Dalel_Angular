import { ServiceProvider } from "./serviceprovider.model";

export interface CategoryServices
{
    Id: number,
    Name: string,
    Description: string,
    ServiceProviders: ServiceProvider[]
}