import React from 'react';
import { mount } from 'enzyme';
import FoodView from './FoodView';

import AppStore, { IAppStoreData } from '../stores/AppStore';
import MealType from '../models/MealType';

import DayComponent from '../components/Day';
import MealComponent from '../components/Meal';
import FoodItemComponents from '../components/FoodItem';

const foodBeer = { id: 5, name: 'Beer', unit: 'pint', calories: 160 };
const foodPizza = { id: 4, name: 'Pizza', unit: 'gram', calories: 200 };

const initialData: IAppStoreData = {
  dayList: [
    {
      mealList: [
        {
          type: MealType.lunch,
          foodList: [
            { food: foodBeer, quantity: 2 },
            { food: foodPizza, quantity: 1 }
          ]
        }
      ]
    }
  ]
};

const appStore = new AppStore(initialData);

describe('FoodView', () => {
  const component = mount(<FoodView appStore={appStore} />);

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render 1 Day Component', () => {
    expect(component.find(DayComponent).length).toBe(1);
  });

  it('should render 1 Meal Component', () => {
    expect(component.find(MealComponent).length).toBe(1);
  });

  it('should render 2 FoodItem Components', () => {
    expect(component.find(FoodItemComponents).length).toBe(2);
  });
});
