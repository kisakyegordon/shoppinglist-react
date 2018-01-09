import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Header from '../components/header/header';

describe('<Header />', () => {
    it('match a snapshot', () => {
        const wrapper = shallow(<Header />);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});