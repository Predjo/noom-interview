import React from 'react';
import capitalize from 'lodash/capitalize';
import Dropdown from 'react-bootstrap/Dropdown';

import MealType from '../../models/MealType';

export interface MealTypeSelectorProps {
  selected: MealType;
  mealTypeList: MealType[];
  onSelect: (type: MealType) => void;
}

const MealTypeSelector: React.FunctionComponent<MealTypeSelectorProps> = (
  props: MealTypeSelectorProps
) => {
  const { selected, onSelect, mealTypeList } = props;

  const avaliableMealTypes = mealTypeList.filter(n => n !== selected);

  return (
    <Dropdown onSelect={(type: MealType) => onSelect(type)}>
      <Dropdown.Toggle
        variant="success"
        id="meal-select-toggle"
        disabled={avaliableMealTypes.length === 0}
      >
        {capitalize(selected)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {avaliableMealTypes.map(type => (
          <Dropdown.Item key={type} eventKey={type}>
            {capitalize(type)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MealTypeSelector;
