import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, cleanup } from '../../test-utils';
import Header from '../header';

configure({ adapter: new Adapter() })

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    //render(<Header />);
    let wrapper = shallow(<Header></Header>)
    expect(wrapper.exists())
  });

  it('prop render', () => {
    let wrapper = shallow(<Header children={"hello"}/>);
    expect(wrapper.find("h2").text()).toEqual("hello");
  });
});
