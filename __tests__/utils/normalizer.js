import { normalizerPrescription } from '../../src/utils/normalizer';

test('returns normalized prescription data', () => {
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
      'pharmacistAllowed': false,
      'medicines': [{
        'name': 'brufin',
        'qty': 1
      }]
    }]
  };
  expect(normalizerPrescription(data)).toEqual(expectedData);
});