import React from 'react';
import _ from 'lodash';

import { normalizeAddPrescriptionData } from '../../utils/normalizer';
import { setToLocalStorage } from '../../utils/localStorageHelpers';

class CreatePrescription extends React.Component {
  state = {
    'medicines': [{}, {}, {}],
    'isSavedPrescription': false
  };

  onMedicinesChange = (key, index, value) => {
    const medicines = _.clone(this.state.medicines);
    medicines[index][key] = value.target.value;
    this.setState({
      medicines
    });
  };

  addPrescription = () => {
    const prescriptions = normalizeAddPrescriptionData(this.state.medicines);
    setToLocalStorage('prescriptions', JSON.stringify(prescriptions));
    this.setState({
      'isSavedPrescription': true
    }, () => {
      setTimeout(() => {
        this.setState({
          'medicines': [{}, {}, {}],
          'isSavedPrescription': false
        });
      }, 2000);
    });
  };

  render() {
    return (
      <div className="patient__actions">
        <div className="patient__actions__create">
          <div className="patient__actions__header">
            Add prescription
          </div>

          <div className="patient__actions__container">
            <div className="patient__actions__create__details">
              Name :
              <input
                type="text"
                placeholder="Enter medicine name here"
                className="patient__actions__create__details__name"
                value={this.state.medicines[0].name || ''}
                onChange={this.onMedicinesChange.bind(this, 'name', 0)}
              />
            </div>

            <div className="patient__actions__create__details">
              Quantity :
              <input
                type="number"
                placeholder="Qty"
                className="patient__actions__create__details__qty"
                value={this.state.medicines[0].qty || ''}
                onChange={this.onMedicinesChange.bind(this, 'qty', 0)}
              />
            </div>
          </div>

          <div className="patient__actions__container">
            <div className="patient__actions__create__details">
              Name :
              <input
                type="text"
                placeholder="Enter medicine name here"
                className="patient__actions__create__details__name"
                value={this.state.medicines[1].name || ''}
                onChange={this.onMedicinesChange.bind(this, 'name', 1)}
              />
            </div>

            <div className="patient__actions__create__details">
              Quantity :
              <input
                type="number"
                placeholder="Qty"
                className="patient__actions__create__details__qty"
                value={this.state.medicines[1].qty || ''}
                onChange={this.onMedicinesChange.bind(this, 'qty', 1)}
              />
            </div>
          </div>

          <div className="patient__actions__container">
            <div className="patient__actions__create__details">
              Name :
              <input
                type="text"
                placeholder="Enter medicine name here"
                className="patient__actions__create__details__name"
                value={this.state.medicines[2].name || ''}
                onChange={this.onMedicinesChange.bind(this, 'name', 2)}
              />
            </div>

            <div className="patient__actions__create__details">
              Quantity :
              <input
                type="number"
                placeholder="Qty"
                className="patient__actions__create__details__qty"
                value={this.state.medicines[2].qty || ''}
                onChange={this.onMedicinesChange.bind(this, 'qty', 2)}
              />
            </div>
          </div>

          {(() => {
            if (this.state.isSavedPrescription) {
              return (
                <div className="patient__success">
                  Saved Successfully
                </div>
              );
            }
          })()}
          <button
            className="patient__actions__submit"
            onClick={this.addPrescription}
          >
            Submit Prescription
          </button>
        </div>
      </div>
    );
  }
}

export default CreatePrescription;
