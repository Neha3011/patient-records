import React from 'react';
import classNames from 'classnames';


import CreatePrescription from './Patient/CreatePrescription';
import ManagePrescription from './Patient/ManagePrescription';

class Patient extends React.Component {
  state = {
    'activeTab': 'create'
  };

  onChangeActiveTab = (activeTab) => {
    this.setState({
      activeTab
    });
  };

  render() {
    return (
      <div className="patient">
        <div className="patient__header">
          <div
            className={classNames('patient__header__nav', {
            'patient__header__nav--active': this.state.activeTab === 'create'
          })}
            onClick={this.onChangeActiveTab.bind(this, 'create')}
          >
            Create Prescription
          </div>
          <div
            className={classNames('patient__header__nav', {
            'patient__header__nav--active': this.state.activeTab === 'manage'
          })}
            onClick={this.onChangeActiveTab.bind(this, 'manage')}
          >
            Manage Prescription
          </div>
        </div>
        {(() => {
          if (this.state.activeTab === 'manage') {
            return (
              <ManagePrescription />
            );
          } else {
            return (
              <CreatePrescription />
            );
          }
        })()}
      </div>
    );
  }
}

export default Patient;
