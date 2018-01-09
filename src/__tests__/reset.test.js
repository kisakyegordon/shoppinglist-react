import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import Reset from '../components/reset';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<Reset{...props} />);
};


describe('<Reset />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});