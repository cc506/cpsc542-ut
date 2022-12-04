import { ApolloConsumer } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { configure, mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderApollo, cleanup, waitFor } from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';
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
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  trips: [mockLaunch],
};

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page', async () => {
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];

    //const { getByText } = renderApollo(<Profile />, { mocks });

    let wrapper = mount(<MockedProvider mocks={mocks}>
      <ApolloConsumer>
        {
          client => {
            client.stop = jest.fn()
            return (<BrowserRouter><Profile /></BrowserRouter>)
          }
        }
      </ApolloConsumer>
    </MockedProvider>)

    // if the profile renders, it will have the list of missions booked
    //await waitFor(() => getByText(/test mission/i));
    await waitFor( () => expect(wrapper.find(`test mission`)).toBeTruthy());
  });
});
