import React from 'react';
import {shallow} from 'enzyme';
import Home from '../components/home';

describe ('<Home />', () => {
    it('Should have an "<h2>" tag', () =>{
        const wrapper = shallow(<Home />);
        expect(wrapper.contains(<h2> Welcome To My Shopping List  </h2>)).toBe(true);
    } );

});