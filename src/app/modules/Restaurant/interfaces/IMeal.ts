
import { AvailabilityStatus } from "./Enums/Meals/AvailabilityStatus.enum";
import { FoodCategory } from "./Enums/Meals/FoodCategory.enum";
import { SizeOfPiece } from "./Enums/Meals/SizeOfPiece.enum";

export interface IMeal {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  AvailabilityStatus : AvailabilityStatus;
  FoodCategory : FoodCategory;
  PieceSize : SizeOfPiece;
  Duration : number;
  DietaryTags : string;
  RestaurantName : string;
  Images : string[];
}
