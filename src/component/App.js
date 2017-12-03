import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import Patient from './Patient';
import Doctor from './Doctor';
import Header from './Header';
import Login from './Login';

class App extends React.Component {
  renderMainPanel = () => {
    return (
      <Switch location={this.props.location}>
        <Route path="/patient" component={Patient} />
        <Route path="/doctor" component={Doctor} />
        <Route path="/pharmacist" component={Doctor} />
      </Switch>
    );
  };

  render() {
    return (
      <div className="pharm">
        <Header />
        {(() => {
          if (this.props.location.pathname === '/') {
            return (
              <Login />
            );
          }
        })()}

        { this.renderMainPanel() }
      </div>
    );
  }
}

export default withRouter(App);
