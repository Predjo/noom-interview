import React from 'react';
import { observer } from 'mobx-react-lite';

import MealComponent from './Meal';

import Meal from '../models/Meal';

import './MealList.css';

export interface Props {
  mealList: Meal[];
}

const MealListComponent: React.SFC<Props> = observer(({ mealList }: Props) => {
  return (
    <ul className="meal-list">
      {mealList.map((meal, index) => {
        return (
          <li key={index}>
            <MealComponent meal={meal} index={index} />
          </li>
        );
      })}
    </ul>
  );
});

export default MealListComponent;
