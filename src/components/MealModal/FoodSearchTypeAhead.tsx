import React, { useState, useRef, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import IFood from '../../models/Food';

export interface FoodSearchTypeAheadProps {
  onSelect: (food: IFood) => void;
}

export interface Option {
  label: string;
  value: IFood;
}

const FoodSearchTypeAhead: React.FunctionComponent<FoodSearchTypeAheadProps> = (
  props: FoodSearchTypeAheadProps
) => {
  const typeAheadRef = useRef<any>(null);
  const [options, setOptions] = useState<Option[]>([]);

  async function onSearch() {
    const response = await fetch('/data/food.json');
    const data: IFood[] = await response.json();

    setOptions(data.map(food => ({ label: food.name, value: food })));
  }

  function onChange(options: Option[]) {
    if (options && options[0] && options[0].value) {
      props.onSelect(options[0].value);
      if (typeAheadRef.current) {
        typeAheadRef.current.getInstance().clear();
      }
    }
  }

  return (
    <AsyncTypeahead
      id="meal-modal-typeahead"
      autoFocus={true}
      ref={typeAheadRef}
      onSearch={onSearch}
      placeholder="Search for food..."
      options={options}
      multiple={false}
      isLoading={false}
      allowNew={false}
      highlightOnlyResult={true}
      onChange={onChange}
    />
  );
};

export default FoodSearchTypeAhead;
