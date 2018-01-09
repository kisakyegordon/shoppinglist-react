import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import LoginForm from '../components/login/loginForm';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<LoginForm {...props} />);
};


describe('<LoginForm />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});