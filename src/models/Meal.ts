import { observable, computed, IObservableArray } from 'mobx';
import MealType from './MealType';
import IFood from './Food';

interface FoodItem {
  food: IFood;
  quantity: number;
}

export interface IMeal {
  type: MealType;
  foodList: FoodItem[];
}

export default class Meal implements IMeal {
  public type: MealType;
  public readonly foodList: IObservableArray<FoodItem>;

  public static create(data: IMeal) {
    return new Meal(data.type, data.foodList);
  }

  constructor(type: MealType, foodList: FoodItem[] = []) {
    this.type = type;
    this.foodList = observable(foodList);
  }

  @computed
  get calories() {
    return this.foodList.reduce(
      (acc, n) => acc + n.food.calories * n.quantity,
      0
    );
  }

  addFood(food: IFood, quantity: number) {
    this.foodList.push({ food, quantity });
  }

  hasFood(food: IFood): boolean {
    return this.foodList.some(fd => fd.food.id === food.id);
  }
}
