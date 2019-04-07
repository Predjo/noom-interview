import { observable, computed, action, IObservableArray, autorun } from 'mobx';

import Day, { IDay } from '../models/Day';
import Meal from '../models/Meal';
import IFood from '../models/IFood';

export interface IAppStoreData {
  dayList: IDay[];
}

export default class AppStore implements IAppStoreData {
  public readonly dayList: IObservableArray<Day> = observable.array([]);

  constructor(
    intitialData?: IAppStoreData,
    onChange?: (data: IAppStoreData) => void
  ) {
    this.setInitialData(intitialData);

    if (onChange) {
      autorun(() => onChange(this));
    }
  }

  @computed
  public get activeDay() {
    return this.dayList[this.dayList.length - 1];
  }

  @action.bound
  public setInitialData(intitialData?: IAppStoreData) {
    if (intitialData && intitialData.dayList) {
      this.dayList.replace(intitialData.dayList.map(day => Day.create(day)));
    } else {
      this.dayList.push(new Day());
    }
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
      this.activeDay.mealList[mealIndex].addFoodItem(food, quantity);
    }
  }

  @action.bound
  public closeActiveDay() {
    this.dayList.push(new Day());
  }
}
