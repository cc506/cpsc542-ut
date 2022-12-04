import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, cleanup } from '../../test-utils';
import Button from '../button';

configure({ adapter: new Adapter() })

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //render(<Button>Hello World</Button>);
    let wrapper = shallow(<Button>Hello World</Button>)
    expect(wrapper.exists())
  });
});
