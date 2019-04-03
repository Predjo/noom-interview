import {
  observable,
  computed,
  action,
  runInAction,
  IObservableArray
} from 'mobx';

import Day from '../models/Day';
import Meal from '../models/Meal';
import IFood from '../models/Food';

export default class AppStore {
  public readonly dayList: IObservableArray<Day>;
  public readonly foodList: IObservableArray<IFood>;

  constructor() {
    this.dayList = observable([]);
    this.foodList = observable([]);
  }

  @computed
  get activeDay() {
    return this.dayList[this.dayList.length - 1];
  }

  @action
  addMeal(meal: Meal) {
    if (this.activeDay) {
      this.activeDay.addMeal(meal);
    }
  }

  @action
  addFood(mealIndex: number, food: IFood, quantity: number) {
    if (this.activeDay.mealList[mealIndex]) {
      this.activeDay.mealList[mealIndex].addFood(food, quantity);
    }
  }

  @action
  closeActiveDay() {
    this.dayList.push(new Day());
  }

  @action
  fetchFood() {
    fetch('/data/food.json')
      .then(response => response.json())
      .then((data: IFood[]) => {
        runInAction(() => {
          this.foodList.replace(data);
        });
      });
  }

  @action
  fetchData() {
    this.dayList.push(new Day());
  }
}
