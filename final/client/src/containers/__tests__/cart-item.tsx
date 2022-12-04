import { ApolloConsumer } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { renderApollo, cleanup, waitFor } from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

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

describe('cart item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('queries item and renders without error', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    // const { getByText } = renderApollo(<CartItem launchId={'1'} />, {
    //   mocks,
    //   addTypename: false,
    // });

    // check the loading state
    //getByText(/loading/i);
    let wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApolloConsumer>
          {
            client => {
              client.stop = jest.fn();
              return <CartItem launchId={'1'} />
            }
          }
        </ApolloConsumer>
      </MockedProvider>
    )
    expect(wrapper.find(`loading`))

    //return waitFor(() => getByText(/test mission/i));
    return waitFor(() => expect(wrapper.find(`test mission`)))
  });

  it('renders with error state', () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: 1 } },
        error: new Error('aw shucks'),
      },
    ];

    // since we know the error message, we can use getByText
    // to recognize the error
    const { getByText } = renderApollo(<CartItem launchId={'1'} />, {
      mocks,
      addTypename: false,
    });

    let wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {
            client =>{
              client.stop = jest.fn();
              return <CartItem launchId={'1'} />
            }
          }
        </ApolloConsumer>
      </MockedProvider>
    )

    //waitFor(() => getByText(/aw shucks/i));
    waitFor(() => expect(wrapper.render().text().includes(`${/aw shucks/i}`)));
  });
});
