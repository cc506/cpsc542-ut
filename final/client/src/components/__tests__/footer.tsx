import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';

configure({ adapter: new Adapter() })

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //renderApollo(<Footer />);
    let wrapper = shallow(<Footer></Footer>);
    expect(wrapper.exists())
  });
});
