import React from 'react';
import _ from 'lodash';

import Popup from './Popup';
import { setToLocalStorage, getFromLocalStorage } from '../utils/localStorageHelpers';

class Doctor extends React.Component {
  state = {
    'viewPrescription': false,
    'allowPrescriptionModal': false,
    'prescriptions': [],
    'userType': ''
  };

  componentWillMount() {
    const userType = this.props.location.pathname.replace('/', '');
    this.setState({
      userType
    });
    this.fetchPrescriptionData();
  }

  fetchPrescriptionData = () => {
    this.setState({
      'prescriptions': JSON.parse(getFromLocalStorage('prescriptions')).prescriptions
    });
  };

  toggleViewPrescription = () => {
    this.setState({
      'viewPrescription': !this.state.viewPrescription
    });
  };

  toggleRequestPrescription = () => {
    this.setState({
      'allowPrescriptionModal': !this.state.allowPrescriptionModal
    });
  };

  requestPrescription = (prescriptionId) => {
    let prescriptions = _.clone(this.state.prescriptions);
    prescriptions = prescriptions.map((prescriptionData) => {
      if (prescriptionData.id === prescriptionId) {
        if (this.state.userType === 'doctor') {
          prescriptionData.doctorRequested = true;
        } else if (this.state.userType === 'pharmacist') {
          prescriptionData.pharmacistRequested = true;
        }
      }
      return prescriptionData;
    });

    this.setState({
      prescriptions
    }, () => {
      this.toggleRequestPrescription();
    });

    setToLocalStorage('prescriptions', JSON.stringify({
      'prescriptions': prescriptions
    }));
  };

  renderAllowPrescription = (type, prescriptionId) => {
    return (
      <Popup
        contentLabel="Allow Prescription Confirmation"
        popupType="popup--prescription"
      >
        <div className="popup__header">
          {`Are you sure, you want to request to access prescription: ${type} ?`}
        </div>

        <div className="popup__actions">
          <span
            className="popup__action btn-green btn-outline"
            onClick={this.toggleRequestPrescription}
          >
            CANCEL
          </span>
          <span
            className="popup__action btn-green"
            onClick={this.requestPrescription.bind(this, type, prescriptionId)}
          >
            REQUEST
          </span>
        </div>
      </Popup>
    );
  };

  renderModal = (prescription, prescriptionId) => {
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
                    <tr className="prescription__row" key={`${prescriptionId}''${data.name}`}>
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
              <th>Actions</th>
            </tr>
            {
              this.state.prescriptions.map((prescription) => {
                return (
                  <tr className="prescription__row" key={prescription.id}>
                    <td>{prescription.id}</td>
                    <td>
                      {(() => {
                        if ((this.state.userType === 'doctor' && prescription.doctorAllowed)
                            || (this.state.userType === 'pharmacist' && prescription.pharmacistAllowed)) {
                          return (
                            <a onClick={this.toggleViewPrescription}>View</a>
                          );
                        } else if ((this.state.userType === 'doctor' && prescription.doctorRequested)
                            || (this.state.userType === 'pharmacist' && prescription.pharmacistRequested)) {
                          return (
                            <span>Access Requested</span>
                          );
                        } else {
                          return (
                            <a onClick={this.toggleRequestPrescription}>Request Access</a>
                          );
                        }
                      })()}
                      {(() => {
                        if (this.state.viewPrescription) {
                          return this.renderModal(prescription, prescription.id);
                        } else if (this.state.allowPrescriptionModal) {
                          return this.renderAllowPrescription(prescription.id);
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

export default Doctor;
