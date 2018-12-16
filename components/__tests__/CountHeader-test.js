import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import CountHeader from '../CountHeader';

it('renders correctly', () => {
  const tree = renderer.create(<CountHeader>Snapshot test!</CountHeader>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with number', () => {
  const tree = renderer.create(<CountHeader number={123}>Snapshot test!</CountHeader>).toJSON();

  expect(tree).toMatchSnapshot();
});
