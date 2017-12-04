import React from 'react';
import _ from 'lodash';

import Popup from './../Popup';
import { setToLocalStorage, getFromLocalStorage } from '../../utils/localStorageHelpers';

class ManagePrescription extends React.Component {
  state = {
    'viewPrescription': false,
    'allowPrescriptionModal': false,
    'userType': '',
    'prescriptions': [],
    'selectedPrescription': []
  };

  componentWillMount() {
    this.fetchPrescriptionData();
  }

  toggleViewPrescription = (selectedPrescription) => {
    this.setState({
      'viewPrescription': !this.state.viewPrescription,
      selectedPrescription
    });
  };

  toggleAllowPrescription = (userType = '', selectedPrescription = []) => {
    this.setState({
      'allowPrescriptionModal': !this.state.allowPrescriptionModal,
      userType,
      selectedPrescription
    });
  };

  fetchPrescriptionData = () => {
    this.setState({
      'prescriptions': JSON.parse(getFromLocalStorage('prescriptions')).prescriptions
    });
  };

  allowPrescription = (type, prescriptionId) => {
    let prescriptions = _.clone(this.state.prescriptions);
    prescriptions = prescriptions.map((prescriptionData) => {
      if (prescriptionData.id === prescriptionId) {
        if (type === 'doctor') {
          prescriptionData.doctorAllowed = true;
          prescriptionData.doctorRequested = false;
        } else if (type === 'pharmacist') {
          prescriptionData.pharmacistAllowed = true;
          prescriptionData.pharmacistRequested = false;
        }
      }
      return prescriptionData;
    });

    this.setState({
      prescriptions
    }, () => {
      this.toggleAllowPrescription(type);
    });
    setToLocalStorage('prescriptions', JSON.stringify({
      'prescriptions': prescriptions
    }));
  };

  renderAllowPrescription = () => {
    return (
      <Popup
        contentLabel="Allow Prescription Confirmation"
        popupType="popup--prescription"
      >
        <div className="popup__header">
          {`Are you sure, you want to allow ${this.state.userType} to view your prescription?`}
        </div>
        <div className="popup__actions">
          <div
            className="popup__action btn-green btn-outline"
            onClick={this.toggleAllowPrescription}
          >
            CANCEL
          </div>
          <div
            className="popup__action btn-green"
            onClick={this.allowPrescription.bind(this, this.state.userType, this.state.selectedPrescription.id)}
          >
            ALLOW
          </div>
        </div>
      </Popup>
    );
  };

  renderModal = () => {
    const prescription = this.state.selectedPrescription;
    return (
      <Popup
        contentLabel="View Prescription"
        popupType="popup--prescription"
      >
        <div className="prescription">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="prescription__row">
                <th>Medicine Name</th>
                <th>Quantity</th>
              </tr>
              {
                prescription && prescription.medicines.map((data) => {
                  return (
                    <tr className="prescription__row" key={`${prescription.id}''${data.name}`}>
                      <td>{data.name}</td>
                      <td>{data.qty}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <div className="popup__close">
            <button onClick={this.toggleViewPrescription}>Close</button>
          </div>
        </div>
      </Popup>
    );
  };

  render() {
    return (
      <div className="prescription">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="prescription__row">
              <th>Prescription ID</th>
              <th>Medicine</th>
              <th>Doctor Request</th>
              <th>Pharmacist Request</th>
            </tr>
            {
              this.state.prescriptions.map((prescription) => {
                return (
                  <tr className="prescription__row" key={prescription.id}>
                    <td>{prescription.id}</td>
                    <td>
                      <a onClick={this.toggleViewPrescription.bind(this, prescription)}>View</a>
                      {(() => {
                        if (this.state.viewPrescription) {
                          return this.renderModal();
                        }
                      })()}
                    </td>
                    <td>
                      {(() => {
                        if (prescription.doctorRequested) {
                          return (
                            <a onClick={this.toggleAllowPrescription.bind(this, 'doctor', prescription)}>Allow</a>
                          );
                        } else if (prescription.doctorAllowed) {
                          return 'Request Granted';
                        } else {
                          return '--';
                        }
                      })()}
                      {(() => {
                        if (this.state.allowPrescriptionModal) {
                          return this.renderAllowPrescription();
                        }
                      })()}
                    </td>
                    <td>
                      {(() => {
                        if (prescription.pharmacistRequested) {
                          return (
                            <a onClick={this.toggleAllowPrescription.bind(this, 'pharmacist', prescription)}>Allow</a>
                          );
                        } else if (prescription.pharmacistAllowed) {
                          return 'Request Granted';
                        } else {
                          return '--';
                        }
                      })()}
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManagePrescription;
