export interface MeatIntakeData {
  [date: string]: {
    isMeatless: boolean;
    meatType?: string[];
    meatMeals?: string[];
  };
}