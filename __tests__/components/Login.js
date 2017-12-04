import React from 'react';
import Login from '../../src/component/Login';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';

test('render Header:', () => {
  const component = renderer.create(
      <Router>
        <Login />
      </Router>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});