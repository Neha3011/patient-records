import isEmpty from 'is-empty';

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
