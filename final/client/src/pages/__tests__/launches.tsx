import React from 'react';
import { ApolloConsumer, InMemoryCache } from '@apollo/client';

import { renderApollo, cleanup, waitFor } from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';
import { configure, mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() })

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];
    // const { getByText } = await renderApollo(<Launches />, {
    //   mocks,
    //   cache,
    // });

    let wrapper = mount(<MockedProvider mocks={mocks} cache={cache}>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn()
            return (<BrowserRouter><Launches /></BrowserRouter>)
          }
        }
      </ApolloConsumer>
    </MockedProvider>)

    //await waitFor(() => getByText(/test mission/i));
    await waitFor( () => expect(wrapper.find(`test mission`)).toBeTruthy());
  });
});
