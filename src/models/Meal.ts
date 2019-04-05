import { observable, computed, IObservableArray } from 'mobx';
import MealType from './MealType';
import IFood from './IFood';
import IFoodItem from './IFoodItem';

export interface IMeal {
  type: MealType;
  foodList: IFoodItem[];
}

export default class Meal implements IMeal {
  public type: MealType;
  public readonly foodList: IObservableArray<IFoodItem> = observable.array([]);

  public static create(data: IMeal) {
    return new Meal(data.type, data.foodList);
  }

  constructor(type: MealType, foodList: IFoodItem[] = []) {
    this.type = type;
    this.foodList = observable.array(foodList);
  }

  @computed
  public get calories() {
    return this.foodList.reduce(
      (acc, n) => acc + n.food.calories * n.quantity,
      0
    );
  }

  @computed
  public get hasFood() {
    return this.foodList.length > 0;
  }

  public addFoodItem(food: IFood, quantity: number) {
    this.foodList.push({ food, quantity });
  }

  public hasFoodItem(food: IFood): boolean {
    return this.foodList.some(fd => fd.food.id === food.id);
  }
}
