import React from 'react';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';

import IFood from '../models/IFood';

import './FoodItem.css';

export interface Props {
  index: number;
  food: IFood;
  quantity: number;
  canChangeQuantity?: boolean;
  onChangeQuantity?: (food: IFood, quantity: number) => void;
}

const FoodItemComponent: React.FunctionComponent<Props> = observer(
  ({ food, quantity, canChangeQuantity, onChangeQuantity }: Props) => {
    const { name, unit, calories } = food;

    function onChange(event: React.FormEvent<React.ChangeEvent>) {
      if (onChangeQuantity) {
        onChangeQuantity(
          food,
          Number((event.target as HTMLInputElement).value)
        );
      }
    }

    return (
      <tr className="food-item">
        <td>{name}</td>
        <td>
          {calories}/{unit}
        </td>
        <td>
          {canChangeQuantity ? (
            <span>
              <Form.Control
                autoFocus={true}
                value={String(quantity)}
                type="number"
                min={0.1}
                step={0.1}
                onChange={onChange}
              />
            </span>
          ) : (
            <span>
              {quantity} {unit}
              {quantity != 1 ? 's' : ''}
            </span>
          )}
        </td>
      </tr>
    );
  }
);

FoodItemComponent.displayName = 'FoodItemComponent';

export default FoodItemComponent;
