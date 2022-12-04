import React from 'react';
import LogoutButton from '../logout-button';

import { renderApollo, cleanup, fireEvent } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';
import { shallow, configure, mount, render  } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';

configure({ adapter: new Adapter() })

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    //renderApollo(<LogoutButton />);
    let wrapper = mount(<MockedProvider>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn();
            return <LogoutButton/>
          }
        }
      </ApolloConsumer>
    </MockedProvider>)
    expect(wrapper.render())
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', window.btoa('testTokenValue'));
    localStorage.setItem('userId', window.btoa('abc123'));
    //const { getByTestId } = renderApollo(<LogoutButton />, { cache });

    let wrapper = mount(<MockedProvider cache={cache}>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn();
            return <LogoutButton/>
          }
        }
      </ApolloConsumer>
    </MockedProvider>)

    //fireEvent.click(getByTestId('logout-button'));
    wrapper.find({"data-testid": "logout-button"}).first().simulate('click')

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
