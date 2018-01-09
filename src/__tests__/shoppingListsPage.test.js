import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import ShoppingListsPage from '../components/shoppingListsPage';

let match = {
    params : '1'
}

const setUp = () => {
    const props = {
        match
    };
    return shallow(<ShoppingListsPage {...props} />);
};


describe('<ShoppingList />', () => {
    it('match a snapshot', () => {
        const wrapper = setUp();
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

});