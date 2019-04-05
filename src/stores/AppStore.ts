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

const LOCAL_STORAGE_KEY = 'calorie-counter-data';

export default class AppStore {
  public readonly dayList: IObservableArray<Day> = observable.array([]);

  private useLocalStorage: boolean;

  constructor(useLocalStorage?: boolean) {
    this.useLocalStorage = Boolean(useLocalStorage);
  }

  @computed
  public get activeDay() {
    return this.dayList[this.dayList.length - 1];
  }

  @action.bound
  public addMeal(meal: Meal) {
    if (this.activeDay) {
      this.activeDay.addMeal(meal);
      this.storeData();
    }
  }

  @action.bound
  public addFood(mealIndex: number, food: IFood, quantity: number) {
    if (this.activeDay.mealList[mealIndex]) {
      this.activeDay.mealList[mealIndex].addFoodItem(food, quantity);
    }
  }

  @action.bound
  public closeActiveDay() {
    this.dayList.push(new Day());
    this.storeData();
  }

  @action.bound
  public fetchData() {
    if (this.useLocalStorage) {
      const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const data = this.JSONtoData(json || '');

      if (data && data.dayList && data.dayList.length) {
        this.dayList.replace(data.dayList);
        return;
      }
    }

    this.dayList.push(new Day());
  }

  @action.bound
  public storeData() {
    if (this.useLocalStorage) {
      const json = this.dataToJSON();
      window.localStorage.setItem(LOCAL_STORAGE_KEY, json);
    }
  }

  private dataToJSON() {
    return JSON.stringify({
      dayList: this.dayList
    });
  }

  private JSONtoData(json: string) {
    try {
      const data = JSON.parse(json) as { dayList: IDay[] };
      return { dayList: data.dayList.map(dayData => Day.create(dayData)) };
    } catch (e) {
      return undefined;
    }
  }
}
