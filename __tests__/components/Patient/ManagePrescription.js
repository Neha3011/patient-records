import React from 'react';
import ManagePrescription from '../../../src/component/Patient/ManagePrescription';
import renderer from 'react-test-renderer';

test('render Header:', () => {
  const component = renderer.create(
      <ManagePrescription />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});