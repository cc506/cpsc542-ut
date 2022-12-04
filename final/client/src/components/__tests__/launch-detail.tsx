import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

configure({ adapter: new Adapter() })

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    let wrapper = shallow(<LaunchDetail></LaunchDetail>)
    expect(wrapper.exists())
  });

  it('render with prop', () => {
    let wrapper = shallow(<LaunchDetail
           id={'1'}
           site={'earth'}
           rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
         />);
    expect(wrapper.find("h5").text()).toEqual("earth");
    expect(wrapper.find("h3").text()).toEqual("that one (big)")
  });

  // render(
    //   <LaunchDetail
    //     id={'1'}
    //     site={'earth'}
    //     rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
    //   />,
    // );
});
