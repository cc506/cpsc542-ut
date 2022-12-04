import React from 'react';

import { renderApollo, cleanup, waitFor } from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configure, mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';
import Adapter from '@cfaester/enzyme-adapter-react-18';

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

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const history = ['/launch/1'];

    // const { getByText } = await renderApollo(
    //   <Routes>
    //     <Route path="launch/:launchId" element={<Launch />} />
    //   </Routes>,
    //   {
    //     mocks,
    //     history,
    //     resolvers: {},
    //   },
    // );

    let wrapper = mount(<MockedProvider mocks={mocks} resolvers={{}}>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn()
            return (<BrowserRouter>
                      <Routes>
                        <Route path="launch/:launchId" element={<Launch />} />
                      </Routes>  
                    </BrowserRouter>)
          }
        }
      </ApolloConsumer>
    </MockedProvider>)

    //await waitFor(() => getByText(/test mission/i));
    await waitFor( () => expect(wrapper.find(`test mission`)).toBeTruthy());
  });
});
