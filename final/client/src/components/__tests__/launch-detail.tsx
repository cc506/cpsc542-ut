import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

configure({ adapter: new Adapter() })

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // render(
    //   <LaunchDetail
    //     id={'1'}
    //     site={'earth'}
    //     rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
    //   />,
    // );

    let wrapper = shallow(<LaunchDetail></LaunchDetail>)
    expect(wrapper.exists())
  });
});
