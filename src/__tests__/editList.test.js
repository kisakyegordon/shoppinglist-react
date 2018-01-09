// import React from 'react';
// import {shallow} from 'enzyme';
// import {shallowToJson} from 'enzyme-to-json';
// import EditList from '../components/edit/editList';


// let match = {
//     params : '1'
// }
// let res = {
//     body : {
//         list : {
//             name : "ghjg"
//         }
//     }
// }
// let name = "sdfasd"
// console.log(res)
// const setUp = () => {
//     const props = {
//         match,
//         name
//     };
//     return shallow(<EditList {...props} />);
// };


// describe('<EditList />', () => {
//     it('match a snapshot', () => {
//         const wrapper = setUp();
//         expect(shallowToJson(wrapper)).toMatchSnapshot();
//     });
// });