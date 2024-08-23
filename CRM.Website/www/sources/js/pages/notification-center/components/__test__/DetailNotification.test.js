import React from 'react';
import DetailNotification from '../DetailNotification';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal } from 'react-bootstrap';
import CommonNotification from '../CommonNotification';

describe('DetailNotification', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should render onHide exactly', () => {
            //Arrange
            const props = { onClose: jest.fn(), actionParam: {} };
            const container = shallow(<DetailNotification {...props}/>).instance();

            //Act
            var actual = shallow(<div>{container.render()}</div>);
            
            //Assert
            expect(actual.find(Modal).at(0).props().onHide).toEqual(props.onClose);
        });

        it('should render CommonNotification exactly', () => {
            //Arrange
            const props = { onClose: jest.fn(), actionParam: {} };
            const container = shallow(<DetailNotification {...props}/>).instance();

            //Act
            var actual = shallow(<div>{container.render()}</div>);
            
            //Assert
            expect(actual.find(CommonNotification).at(0).props().actionParam).toEqual(props.actionParam);
        });

        it('should render Button exactly', () => {
            //Arrange
            const props = { onClose: jest.fn(), actionParam: {} };
            const container = shallow(<DetailNotification {...props}/>).instance();

            //Act
            var actual = shallow(<div>{container.render()}</div>);
            actual.find(Button).at(0).simulate('click');
            
            //Assert
            expect(props.onClose).toHaveBeenCalled();
        });
    });
});