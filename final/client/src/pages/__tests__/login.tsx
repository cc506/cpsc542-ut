import React from 'react';

import { renderApollo, cleanup, fireEvent, waitFor } from '../../test-utils';
import Login, { LOGIN_USER } from '../login';
import { cache, isLoggedInVar } from '../../cache';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() })

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    renderApollo(<Login />);
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: { query: LOGIN_USER, variables: { email: 'a@a.a' } },
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];

    // const { getByText, getByTestId } = await renderApollo(<Login />, {
    //   mocks,
    //   cache,
    // });

    let wrapper = shallow(<MockedProvider mocks={mocks} cache={cache}>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn()
            return <Login />
          }
        }
      </ApolloConsumer>
    </MockedProvider>)

    // fireEvent.change(getByTestId('login-input'), {
    //   target: { value: 'a@a.a' },
    // });
    wrapper.find({"data-testid": "login-input"}).simulate('change', {target: { value: 'a@a.a' }})

    // fireEvent.click(getByText(/log in/i));
    wrapper.find('log in').simulate('click');

    // login is done if loader is gone
    // await waitFor(() => getByText(/log in/i));
    await waitFor(() => expect(wrapper.find('log in')));

    expect(isLoggedInVar()).toBeTruthy();
  });
});
