import React from 'react';
import Doctor from '../../src/component/Doctor';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';

test('render Header:', () => {
  const component = renderer.create(
      <Router>
        <Doctor location={{'pathname': ''}} />
      </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});