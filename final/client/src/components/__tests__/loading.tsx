import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, cleanup } from '../../test-utils';
import Loading from '../loading';

configure({ adapter: new Adapter() })

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //render(<Loading />);
    let wrapper = shallow(<Loading></Loading>)
    expect(wrapper.exists())
  });
});
