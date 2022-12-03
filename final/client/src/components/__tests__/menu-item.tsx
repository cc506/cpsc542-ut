import React from 'react';

import { render, cleanup } from '../../test-utils';
import MenuItem from '../menu-item';
import { renderApollo } from '../../test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('Menu Item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //renderApollo(<MenuItem to="/wow" />);
    let wrapper = shallow(<MenuItem to="/wow"></MenuItem>)
    expect(wrapper.exists())
  });
});
