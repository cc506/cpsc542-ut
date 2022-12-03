import { renderApollo, cleanup, waitFor } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
    expect(wrapper.render().text().includes("Add to Cart")).toBe(true);

    // rerender with different props to same container
    waitFor(() => cartItemsVar(['1']));
    // renderApollo(<ActionButton id="1" />, { container });
    // getByText(/remove from cart/i);
    wrapper = shallow(<ActionButton id="1"/>);
    expect(wrapper.render().text().includes("Remove from Cart")).toBe(true);
    
    // rerender with different props to same container
    cartItemsVar([]);
    // renderApollo(<ActionButton isBooked={true} />, { container });
    // getByText(/cancel this trip/i);
    wrapper = shallow(<ActionButton isBooked={true}/>);
    expect(wrapper.render().text().includes("Cancel This Trip")).toBe(true);
  });
});
