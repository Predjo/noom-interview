import cx from 'classnames';
import React from 'react';
import { observer } from 'mobx-react-lite';
import capitalize from 'lodash/capitalize';

import Card from 'react-bootstrap/Card';
import FoodItemList from './FoodItemList';

import Meal from '../models/Meal';
import MealType from '../models/MealType';

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
          <Card.Title>
            <i
              className={cx('fas', {
                'fa-utensils': meal.type !== MealType.snack,
                'fa-cookie-bite': meal.type === MealType.snack
              })}
            />{' '}
            {capitalize(type)}
          </Card.Title>
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
