import React from 'react';
import { observer } from 'mobx-react-lite';

import Card from 'react-bootstrap/Card';
import Meal from '../models/Meal';

import capitalize from 'lodash/capitalize';

import './Meal.css';

export interface Props {
  index: number;
  meal: Meal;
}

const MealComponent: React.SFC<Props> = observer(({ index, meal }: Props) => {
  const { type, foodList, calories } = meal;

  return (
    <Card className="meal-card">
      <Card.Body>
        <Card.Title>{capitalize(type)}</Card.Title>
        <Card.Subtitle>
          {foodList.length} food items {calories} calories
        </Card.Subtitle>

        <Card.Text />
      </Card.Body>
    </Card>
  );
});

export default MealComponent;
