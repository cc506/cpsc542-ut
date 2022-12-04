import React from 'react';

import { render, cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() })

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders mission without error', () => {
    // renderApollo(
    //   <LaunchTile
    //     launch={{
    //       __typename: 'Launch',
    //       isBooked: false,
    //       id: '1',
    //       mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
    //       rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    //     }}
    //   />,
    // );

    let wrapper = shallow(<LaunchTile launch={{
      __typename: 'Launch',
      isBooked: false,
      id: '1',
      mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
      rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    }}/>);
    expect(wrapper.find("h3").text()).toEqual("the first one");
  });

  it('renders null mission', () => {
    let wrapper = shallow(<LaunchTile launch={{
      __typename: 'Launch',
      isBooked: false,
      id: '1',
      mission: null,
      rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    }}/>);
    expect(wrapper.find("h3").text()).toEqual("");
  });

  it('renders rocket without error', () => {
    let wrapper = shallow(<LaunchTile launch={{
      __typename: 'Launch',
      isBooked: false,
      id: '1',
      mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
      rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    }}/>);
    expect(wrapper.find("h5").text()).toEqual("harambe");
  });

  it('renders null rocket', () => {
    let wrapper = shallow(<LaunchTile launch={{
      __typename: 'Launch',
      isBooked: false,
      id: '1',
      mission: null,
      rocket: null,
    }}/>);
    expect(wrapper.find("h5").text()).toEqual("");
  });
});
