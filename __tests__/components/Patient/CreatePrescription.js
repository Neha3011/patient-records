import React from 'react';
import CreatePrescription from '../../../src/component/Patient/CreatePrescription';
import renderer from 'react-test-renderer';

test('render Header:', () => {
  const component = renderer.create(
      <CreatePrescription />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});