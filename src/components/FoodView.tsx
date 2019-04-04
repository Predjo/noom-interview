import React, { Component } from 'react';

import AppStore from '../stores/AppStore';

import DayListComponent from './DayList';

export interface Props {
  appStore?: AppStore;
}

class FoodView extends Component<Props> {
  public componentDidMount() {
    const { appStore } = this.props;
    if (appStore) {
      appStore.fetchData();
      appStore.fetchFood();
    }
  }

  public render() {
    const { appStore } = this.props;
    const { dayList, closeActiveDay, addMeal } = appStore!;

    return (
      <div>
        <DayListComponent
          dayList={dayList}
          onDayClose={closeActiveDay}
          onMealAdd={addMeal}
        />
      </div>
    );
  }
}

export default FoodView;
