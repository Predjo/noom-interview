import React from 'react';

import AppStore from '../stores/AppStore';

import DayListComponent from './DayList';

export interface Props {
  appStore: AppStore;
}

const FoodView: React.FunctionComponent<Props> = (props: Props) => {
  const { appStore } = props;
  const { dayList, closeActiveDay, addMeal } = appStore;

  return (
    <div>
      <DayListComponent
        dayList={dayList}
        onDayClose={closeActiveDay}
        onMealAdd={addMeal}
      />
    </div>
  );
};

export default FoodView;
