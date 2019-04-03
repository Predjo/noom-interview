import { observable, computed, IObservableArray } from 'mobx';
import Meal, { IMeal } from './Meal';
import MealType, { MealTypeOrder } from './MealType';

export interface IDay {
  mealList: IMeal[];
}

export default class Day implements IDay {
  public readonly mealList: IObservableArray<Meal>;

  constructor(mealList: Meal[] = []) {
    this.mealList = observable(mealList);
  }

  @computed
  get calories() {
    return this.mealList.reduce((acc, n) => acc + n.calories, 0);
  }

  @computed
  get lastMeal() {
    return this.mealList[this.mealList.length - 1];
  }

  canAddMealType(type: MealType) {
    if (!this.lastMeal) {
      return true;
    }

    return (
      MealTypeOrder.findIndex(n => n === type) >=
      MealTypeOrder.findIndex(n => n === this.lastMeal.type)
    );
  }

  addMeal(meal: Meal) {
    if (this.canAddMealType(meal.type)) {
      this.mealList.push(meal);
    } else {
      throw new Error('Can not add more meals of this type');
    }
  }
}
