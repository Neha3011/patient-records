import isEmpty from 'is-empty';
import { getFromLocalStorage } from './localStorageHelpers';

/**
 * Normalizer: normalizerPrescription
 * This function will take medicines array as input
 * and return a normalized prescription as an output
 * */

export function normalizerPrescription(prescriptionData, lastIndex) {
  const medicines = prescriptionData.filter((prescription) => {
    return !isEmpty(prescription);
  });

  return {
    'id': lastIndex + 1,
    'doctorRequested': false,
    'pharmacistRequested': false,
    'doctorAllowed': false,
    'pharmacistAllowed': false,
    medicines
  };
}


/**
 * Normalizer: normalizeAddPrescriptionData
 * This function will update prescription data
 * */

export function normalizeAddPrescriptionData(medicines) {
  const storagePrescription = JSON.parse(getFromLocalStorage('prescriptions'));
  const prevPrescription = storagePrescription ? storagePrescription.prescriptions : [];
  const prescriptionLength = prevPrescription.length - 1;
  const lastIndex = prescriptionLength !== -1 ? prevPrescription[prescriptionLength].id : 0;
  const newPrescription = normalizerPrescription(medicines, lastIndex);
  prevPrescription.push(newPrescription);
  return {
    'prescriptions': prevPrescription
  };
}
