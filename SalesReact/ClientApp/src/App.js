import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { GoodsPage } from './components/pages/GoodsPage';
import { GoodTypesPage } from './components/pages/GoodTypesPage';
import { ReceiptsPage } from './components/pages/ReceiptsPage';
import { EditGoodPage } from './components/pages/EditGoodPage';
import { EditGoodTypePage } from './components/pages/EditGoodTypePage';
import { EditReceiptPage } from './components/pages/EditReceiptPage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />

        <Route path='/good-data' component={GoodsPage} />
        <Route path='/edit-good/:id' component={EditGoodPage} />

        <Route path='/goodType-data' component={GoodTypesPage} />
        <Route path='/edit-goodType/:id' component={EditGoodTypePage} />

        <Route path='/receipt-data' component={ReceiptsPage} />              
        <Route path='/edit-receipt/:id' component={EditReceiptPage} />

      </Layout>
    );
  }
}
