import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { DataStore } from './data/DataStore';
import { StoreAccessSelector as Selector } from './generator/StoreAccessSelector';
import { ItemDisplay } from './generator/ItemDisplay';
import { ModelNavigator } from './generator/ModelNavigator';
import { ModelPresenter } from './generator/ModelPresenter';

export default class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
            <Provider store={DataStore}>
          <div className="col-2">
              <ModelNavigator  />
          </div>
          <div className="col">
                <ItemDisplay />
          </div>
            </Provider>
        </div>
        <div>
          <Provider store={DataStore}>
            <ModelPresenter store={DataStore} />
          </Provider>
        </div>
      </div>
    )
  }
}
