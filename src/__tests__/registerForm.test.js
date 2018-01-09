import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import RegisterForm from '../components/register/registerForm';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<RegisterForm {...props} />);
};


describe('<RegisterForm />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});