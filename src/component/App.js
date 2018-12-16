import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ProductList from './ProductList';
import Summary from './Summary';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="topnav">
            <a href="/">Products</a>
            <a href="/summary">Summary</a>
          </div>
          <Route exact path="/" component={ProductList} />
          <Route path="/summary" component={Summary} />
        </div>
      </Router >
    )
  }
}

export default App;