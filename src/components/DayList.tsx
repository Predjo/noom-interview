import React from 'react';
import { observer } from 'mobx-react-lite';

import DayComponent, { Props as DayComponentProps } from './Day';

import Day from '../models/Day';

import './DayList.css';

export interface Props
  extends Pick<DayComponentProps, 'onDayClose' | 'onMealAdd'> {
  dayList: Day[];
}

const DayListComponent: React.FunctionComponent<Props> = observer(
  ({ dayList, onDayClose, onMealAdd }: Props) => {
    return (
      <ul className="day-list">
        {dayList.reverse().map((day, index) => {
          return (
            <li key={index}>
              <DayComponent
                day={day}
                index={dayList.length - 1 - index}
                closed={index !== 0}
                onDayClose={onDayClose}
                onMealAdd={onMealAdd}
              />
            </li>
          );
        })}
      </ul>
    );
  }
);

export default DayListComponent;
