import { observable, computed, IObservableArray } from 'mobx';
import Meal, { IMeal } from './Meal';
import MealType, { MealTypeOrder } from './MealType';

export interface IDay {
  mealList: IMeal[];
}

export default class Day implements IDay {
  public readonly mealList: IObservableArray<Meal> = observable.array([]);

  public static create(data: IDay) {
    return new Day(data.mealList.map(data => Meal.create(data)));
  }

  constructor(mealList: Meal[] = []) {
    this.mealList = observable.array(mealList);
  }

  @computed
  public get calories() {
    return this.mealList.reduce((acc, n) => acc + n.calories, 0);
  }

  @computed
  public get lastMeal() {
    return this.mealList[this.mealList.length - 1];
  }

  @computed
  public get hasMeals() {
    return this.mealList.length > 0;
  }

  public canAddMealType(type: MealType) {
    if (!this.lastMeal) {
      return true;
    }

    return (
      MealTypeOrder.findIndex(n => n === type) >=
      MealTypeOrder.findIndex(n => n === this.lastMeal.type)
    );
  }

  public addMeal(meal: Meal) {
    if (this.canAddMealType(meal.type)) {
      this.mealList.push(meal);
    } else {
      throw new Error('Can not add more meals of this type');
    }
  }
}
