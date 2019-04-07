import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import MealModal from './MealModal/MealModal';
import MealListComponent from './MealList';

import Day from '../models/Day';
import Meal from '../models/Meal';
import { MealTypeOrder } from '../models/MealType';

import './Day.css';

export interface Props {
  index: number;
  day: Day;
  closed: boolean;
  onDayClose: () => void;
  onMealAdd: (meal: Meal) => void;
}

const DayComponent: React.FunctionComponent<Props> = observer(
  ({ index, day, closed, onDayClose, onMealAdd }: Props) => {
    const { mealList, calories } = day;

    const [showModal, setShowModal] = useState(false);

    return (
      <Card className="day-card">
        <Card.Body>
          <Card.Title>Day {index}</Card.Title>
          <Card.Subtitle>
            {mealList.length} meals {calories} calories
          </Card.Subtitle>

          {day.hasMeals ? <MealListComponent mealList={mealList} /> : null}

          {!closed ? (
            <ButtonToolbar>
              <Button variant="info" onClick={() => setShowModal(true)}>
                Add meal
              </Button>

              <Button variant="warning" onClick={onDayClose}>
                Close day
              </Button>
            </ButtonToolbar>
          ) : null}
        </Card.Body>

        <MealModal
          show={showModal}
          onSave={(meal: Meal) => onMealAdd(meal)}
          onHide={() => setShowModal(false)}
          mealTypeList={MealTypeOrder.filter(type => day.canAddMealType(type))}
        />
      </Card>
    );
  }
);

DayComponent.displayName = 'DayComponent';

export default DayComponent;
