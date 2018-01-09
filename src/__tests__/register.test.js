import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Register from '../components/register/register';

describe('<Register />', () => {
    it('match a snapshot', () => {
        const wrapper = shallow(<Register />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});