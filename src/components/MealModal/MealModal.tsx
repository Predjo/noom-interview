import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FoodItemList from '../FoodItemList';
import MealTypeSelector from './MealTypeSelector';
import FoodSearchTypeAhead from './FoodSearchTypeAhead';

import IFood from '../../models/IFood';
import Meal from '../../models/Meal';
import IFoodItem from '../../models/IFoodItem';
import MealType from '../../models/MealType';

import './MealModal.css';

export interface Props {
  show: boolean;
  onHide: () => void;
  mealTypeList: MealType[];
  onSave: (meal: Meal) => void;
}

const MealModal: React.FunctionComponent<Props> = (props: Props) => {
  const { show, onHide, mealTypeList, onSave } = props;

  const [selectedMealType, onSelectMealType] = useState<MealType>();
  const [foodItemList, onSetFoodItemList] = useState<IFoodItem[]>([]);
  const activeMealType = selectedMealType || mealTypeList[0];

  function close() {
    onHide();
    onSelectMealType(undefined);
    onSetFoodItemList([]);
  }

  function save() {
    onSave(new Meal(activeMealType, foodItemList));
    close();
  }

  function addFoodItem(food: IFood) {
    const existingFoodItemIndex = foodItemList.findIndex(
      f => f.food.id === food.id
    );

    // If food exists in the list add one more
    if (existingFoodItemIndex !== -1) {
      foodItemList[existingFoodItemIndex].quantity++;
      onSetFoodItemList([...foodItemList]);
    } else {
      onSetFoodItemList([...foodItemList, { food, quantity: 1 }]);
    }
  }

  function updateFoodQuantity(food: IFood, quantity: number) {
    const existingFoodItemIndex = foodItemList.findIndex(
      f => f.food.id === food.id
    );

    if (existingFoodItemIndex !== -1) {
      foodItemList[existingFoodItemIndex].quantity = quantity;
      onSetFoodItemList([...foodItemList]);
    }
  }

  return (
    <Modal show={show} onHide={onHide} className="add-meal-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add {capitalize(selectedMealType)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-controls">
          <MealTypeSelector
            mealTypeList={mealTypeList}
            selected={activeMealType}
            onSelect={onSelectMealType}
          />

          <FoodSearchTypeAhead onSelect={addFoodItem} />
        </div>

        {foodItemList.length > 0 ? (
          <FoodItemList
            foodList={foodItemList}
            canChangeQuantity={true}
            onChangeQuantity={updateFoodQuantity}
          />
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="info"
          onClick={save}
          disabled={foodItemList.length < 1}
        >
          Add meal
        </Button>

        <Button variant="warning" onClick={close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MealModal;
