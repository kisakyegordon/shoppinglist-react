import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Login from '../components/login/login';

describe('<Login />', () => {
    it('match a snapshot', () => {
        const wrapper = shallow(<Login />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});