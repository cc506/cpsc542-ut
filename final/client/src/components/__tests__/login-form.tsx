import React from 'react';

import { render, cleanup } from '../../test-utils';
import LoginForm from '../login-form';
import {configure, shallow, mount} from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";


configure({adapter: new Adapter()})

describe('Login Form', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
   //render(<LoginForm login={() => {}}/>);
    expect(mount(<LoginForm login={() => {}}/>));
  });

  
});
