import { normalizerPrescription, normalizeAddPrescriptionData } from '../../src/utils/normalizer';

test('returns normalized prescription data', () => {
  const data = [{
    'name': 'brufin',
    'qty': 1
  }];

  const expectedData = {
    'id': 1,
    'doctorRequested': false,
    'pharmacistRequested': false,
    'doctorAllowed': false,
    'pharmacistAllowed': false,
    'medicines': [{
      'name': 'brufin',
      'qty': 1
    }]
  };
  expect(normalizerPrescription(data, 0)).toEqual(expectedData);
});

test('returns normalized update prescription data', () => {
  const data = [{
    'name': 'brufin',
    'qty': 1
  }];

  const expectedData = {
    'prescriptions': [{
      'id': '00000001',
      'doctorRequested': false,
      'pharmacistRequested': false,
      'doctorAllowed': false,
      'pharmacistAllowed': true,
      'medicines': [{
        'name': 'Bruffen', 'qty': '1'
      }, {
        'name': 'Citrizine', 'qty': '3'
      }]
    }, {
      'id': '000000011',
      'doctorRequested': false,
      'pharmacistRequested': false,
      'doctorAllowed': false,
      'pharmacistAllowed': false,
      'medicines': [{
        'name': 'brufin',
        'qty': 1
      }]
    }]
  };
  expect(normalizeAddPrescriptionData(data)).toEqual(expectedData);
});