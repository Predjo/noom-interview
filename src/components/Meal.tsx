import React from 'react';
import { observer } from 'mobx-react-lite';
import capitalize from 'lodash/capitalize';

import Card from 'react-bootstrap/Card';
import FoodItemList from './FoodItemList';

import Meal from '../models/Meal';

import './Meal.css';

export interface Props {
  index: number;
  meal: Meal;
}

const MealComponent: React.FunctionComponent<Props> = observer(
  ({ meal }: Props) => {
    const { type, foodList, calories, hasFood } = meal;

    return (
      <Card className="meal-card">
        <Card.Body>
          <Card.Title>{capitalize(type)}</Card.Title>
          <Card.Subtitle>
            {foodList.length} food items {calories} calories
          </Card.Subtitle>

          {hasFood ? <FoodItemList foodList={foodList} /> : null}

          <Card.Text />
        </Card.Body>
      </Card>
    );
  }
);

MealComponent.displayName = 'MealComponent';

export default MealComponent;
