import React from 'react';

import { renderApollo, cleanup, waitFor } from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';
import { MockedProvider } from '@apollo/client/testing';
import { mount, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { ApolloConsumer } from '@apollo/client';

configure({ adapter: new Adapter() })

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    //const { getByTestId } = renderApollo(<Cart />, { cache });

    let wrapper = mount(
      <MockedProvider cache={cache}>
        <ApolloConsumer>
          {
            client => {
              client.stop = jest.fn()
              return <Cart></Cart>
            }
          }
        </ApolloConsumer>
      </MockedProvider>
    )

    //return waitFor(() => getByTestId('empty-message'));
    return waitFor(() =>  expect(wrapper.find({"data-testid": "empty-message"})));
  });

  it('renders cart', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    //const { getByTestId } = renderApollo(<Cart />, { cache, mocks });

    let wrapper = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <ApolloConsumer>
          {
            client => {
              client.stop = jest.fn()
              return <Cart></Cart>
            }
          }
        </ApolloConsumer>
      </MockedProvider>
    )

    cartItemsVar(['1']);
    //return waitFor(() => getByTestId('book-button'));
    return waitFor(() => expect(wrapper.find({"data-testid": "book-button"})));
  });
});
