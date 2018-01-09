import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import ShoppingList from '../components/shoppingList';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<ShoppingList {...props} />);
};


describe('<ShoppingList />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});