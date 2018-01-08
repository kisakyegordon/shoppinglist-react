import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import CreateList from '../components/createList';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<CreateList {...props} />);
};


describe('<CreateList />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});