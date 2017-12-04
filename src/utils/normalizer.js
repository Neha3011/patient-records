import isEmpty from 'is-empty';

/**
 * Normalizer: normalizerPrescription
 * This function will take medicines array as input
 * and return a normalized prescription as an output
 * **/

export function normalizerPrescription(prescriptionData) {
  const medicines = prescriptionData.filter((prescription) => {
    return !isEmpty(prescription);
  });

  return {
    'prescriptions': [{
      'id': '00000001',
      'doctorRequested': false,
      'pharmacistRequested': false,
      'doctorAllowed': false,
      'pharmacistAllowed': false,
      medicines
    }]
  };
}
