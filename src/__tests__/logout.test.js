import React from 'react';
import { shallow, configure }  from 'enzyme';
import Logout from '../components/logout';


describe ('<Logout />', () => {

    it('testing <Logout />', () => {
        const props = {history : []};
        const component = shallow(<Logout {...props} />);
        expect(component).toHaveLength(1);

    });
    it('passing test', () => {
        expect(true).toBeTruthy();
    });
    it('failing test', () => {
        expect(false).toBeFalsy();
    });
});

