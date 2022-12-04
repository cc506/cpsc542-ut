import React from 'react';

import { render, cleanup } from '../../test-utils';
import PageContainer from '../page-container';
import {configure, shallow } from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() })

describe('Page Container', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //render(<PageContainer />);
    let wrapper = shallow(<PageContainer />);
    expect(wrapper.exists());
  });

  it('finds rendered fragment element', () => {
    let wrapper = shallow(<PageContainer props={"prop"}/>);
    expect(wrapper.find("Fragment")).toBeTruthy();
  });

  it('finds rendered bar element', () => {
    let wrapper = shallow(<PageContainer props={"prop"}/>);
    expect(wrapper.find("Bar")).toBeTruthy();
  });

  it('finds rendered container element', () => {
    let wrapper = shallow(<PageContainer props={"prop"}/>);
    expect(wrapper.find("container")).toBeTruthy();
  });
});
