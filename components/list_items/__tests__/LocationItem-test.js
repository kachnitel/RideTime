import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import LocationItem from '../LocationItem';

it('renders correctly', () => {
  testLocation = {
   name: 'Place'
  }
    const tree = renderer.create(<LocationItem location={testLocation}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

