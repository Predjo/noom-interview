import React, { Component } from 'react';
import { inject } from 'mobx-react';

import AppStore from '../stores/AppStore';

export interface Props {
  appStore?: AppStore;
}

@inject('appStore')
class FoodView extends Component<Props> {
  public componentDidMount() {
    const { appStore } = this.props;
    if (appStore) {
      appStore.fetchData();
      appStore.fetchFood();
    }
  }

  public render() {
    return <div>Food view</div>;
  }
}

export default FoodView;
