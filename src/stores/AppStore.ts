import {
  observable,
  computed,
  action,
  runInAction,
  IObservableArray
} from 'mobx';

import Day, { IDay } from '../models/Day';
import Meal from '../models/Meal';
import IFood from '../models/Food';

export default class AppStore {
  public readonly dayList: IObservableArray<Day> = observable.array([]);
  public readonly foodList: IObservableArray<IFood> = observable.array([]);

  constructor() {}

  @computed
  public get activeDay() {
    return this.dayList[this.dayList.length - 1];
  }

  @action.bound
  public addMeal(meal: Meal) {
    if (this.activeDay) {
      this.activeDay.addMeal(meal);
    }
  }

  @action.bound
  public addFood(mealIndex: number, food: IFood, quantity: number) {
    if (this.activeDay.mealList[mealIndex]) {
      this.activeDay.mealList[mealIndex].addFood(food, quantity);
    }
  }

  @action.bound
  public closeActiveDay() {
    this.dayList.push(new Day());
  }

  @action.bound
  public fetchFood() {
    fetch('/data/food.json')
      .then(response => response.json())
      .then((data: IFood[]) => {
        runInAction(() => {
          this.foodList.replace(data);
        });
      });
  }

  @action.bound
  public fetchData() {
    this.dayList.push(new Day());
  }

  public dataToJSON() {
    return JSON.stringify({
      dayList: this.dayList
    });
  }

  public JSONtoData(json: string) {
    try {
      const data = JSON.parse(json) as { dayList: IDay[] };
      return { dayList: data.dayList.map(dayData => Day.create(dayData)) };
    } catch (e) {
      return { dayList: [] };
    }
  }
}
