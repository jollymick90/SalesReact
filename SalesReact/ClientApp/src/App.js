import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GoodListPage } from './components/modules/good/pages/GoodListPage'
import { EditGoodPage } from './components/modules/good/pages/EditGoodPage'
import { CategoryListPage } from './components/modules/category/pages/CategoryListPage'
import { EditCategoryPage } from './components/modules/category/pages/EditCategoryPage'
import { TaxListPage } from './components/modules/tax/pages/TaxListPage'
import { EditTaxPage } from './components/modules/tax/pages/EditTaxPage'
import { ReceiptListPage } from './components/modules/receipt/pages/ReceiptListPage'
import { EditReceiptPage } from './components/modules/receipt/pages/EditReceiptPage'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />

        <Route path='/good' component={GoodListPage} />
        {/* <Route path='/good/edit/:id' component={EditGoodPage} /> */}
        <Route path='/good-edit/:id' component={EditGoodPage} />

        <Route path='/category' component={CategoryListPage} />
        {/* <Route path='/category/edit/:id' component={EditCategoryPage} /> */}
        <Route path='/category-edit/:id' component={EditCategoryPage} />

        <Route path='/receipt' component={ReceiptListPage} />
        {/* <Route path='/receipt/edit/:id' component={EditReceiptPage} /> */}
        <Route path='/receipt-edit/:id' component={EditReceiptPage} />

        <Route path='/tax' component={TaxListPage} />
        <Route path='/tax-edit/:id' component={EditTaxPage} />
        {/* <Route path='/tax/edit/:id' component={EditTaxPage} /> */}

      </Layout>
    );
  }
}
