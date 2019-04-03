import AppStore from './AppStore';

import Meal from '../models/Meal';
import MealType from '../models/MealType';

const foodBeer = { id: 5, name: 'Beer', unit: 'pint', calories: 160 };
const foodPizza = { id: 4, name: 'Pizza', unit: 'gram', calories: 200 };

describe('AppStore', () => {
  let store: AppStore;

  it('creates the store', () => {
    store = new AppStore();
    store.fetchData();
    expect(store.dayList.length).toBe(1);
  });

  it('adds meal to the store', () => {
    const meal = new Meal(MealType.breakfast);
    meal.addFood(foodBeer, 2);
    meal.addFood(foodPizza, 1);

    store.addMeal(meal);

    expect(store.activeDay.mealList.length).toBe(1);
    expect(store.activeDay.calories).toBe(
      foodBeer.calories * 2 + foodPizza.calories
    );
  });

  it('adds meals of different type to the store', () => {
    const meal = new Meal(MealType.lunch);
    meal.addFood(foodPizza, 2);

    expect(meal.calories).toBe(foodPizza.calories * 2);

    store.addMeal(meal);

    expect(store.activeDay.mealList.length).toBe(2);
    expect(store.activeDay.calories).toBe(
      foodBeer.calories * 2 + foodPizza.calories * 3
    );
  });

  it('fails to add meal of previous type', () => {
    const meal = new Meal(MealType.breakfast);
    meal.addFood(foodBeer, 1);

    expect(() => {
      store.addMeal(meal);
    }).toThrow();
  });

  it('closes the day', () => {
    store.closeActiveDay();

    expect(store.dayList.length).toBe(2);
    expect(store.activeDay.mealList.length).toBe(0);
    expect(store.activeDay.calories).toBe(0);
  });

  it('can export data as JSON and convert it back', () => {
    const json = store.dataToJSON();

    expect(typeof json).toBe('string');

    const storeData = store.JSONtoData(json);
    expect(storeData.dayList.length).toBe(2);
  });
});
