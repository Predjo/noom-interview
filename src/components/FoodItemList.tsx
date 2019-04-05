import React from 'react';
import { observer } from 'mobx-react-lite';

import Table from 'react-bootstrap/Table';

import FoodItemComponent, { Props as FoodItemComponentProps } from './FoodItem';

import { IFoodItem } from '../models/Meal';

import './FoodItemList.css';

export interface Props
  extends Pick<
    FoodItemComponentProps,
    'canChangeQuantity' | 'onChangeQuantity'
  > {
  foodList: IFoodItem[];
}

const FoodItemList: React.FunctionComponent<Props> = observer(
  ({ foodList, canChangeQuantity, onChangeQuantity }: Props) => {
    return (
      <Table className="food-item-list" striped={true} hover={true}>
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((foodItem, index) => {
            return (
              <FoodItemComponent
                key={index}
                food={foodItem.food}
                quantity={foodItem.quantity}
                index={index}
                canChangeQuantity={canChangeQuantity}
                onChangeQuantity={onChangeQuantity}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
);

export default FoodItemList;
