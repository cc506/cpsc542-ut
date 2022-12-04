import { renderApollo, cleanup, waitFor } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import { shallow, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloConsumer } from '@apollo/client';

configure({ adapter: new Adapter() })

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // const { getByTestId } = renderApollo(<ActionButton />);
    // expect(getByTestId('action-button')).toBeTruthy();
    let wrapper = shallow(<ActionButton />);
    expect(wrapper.find({"data-testid": "action-button"})).toBeTruthy();
  });

  it('shows correct label', () => {
    // const { getByText, container } = renderApollo(<ActionButton />);
    // getByText(/add to cart/i);
    let wrapper = shallow(<ActionButton />);
    expect(wrapper.find(`add to cart`)).toBeTruthy();

    // rerender with different props to same container
    waitFor(() => cartItemsVar(['1']));
    // renderApollo(<ActionButton id="1" />, { container });
    // getByText(/remove from cart/i);
    wrapper = shallow(<ActionButton id="1"/>);
    expect(wrapper.find(`remove from cart`)).toBeTruthy()
    
    // rerender with different props to same container
    cartItemsVar([]);
    // renderApollo(<ActionButton isBooked={true} />, { container });
    // getByText(/cancel this trip/i);
    wrapper = shallow(
      <MockedProvider>
        <ApolloConsumer>
          { client => {
            client.stop = jest.fn();
            return <ActionButton isBooked={true}/>
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    expect(wrapper.find(`cancel this trip`)).toBeTruthy()
  });
});
