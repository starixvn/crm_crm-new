import React from 'react';
import { Button } from 'react-bootstrap';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { CustomerInfoVerify } from '../CustomerInfoVerify';

describe('CustomerInfoVerify', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getCustomerInfoVerify: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<CustomerInfoVerify {...props} />).instance();

            // Act
            container.componentDidMount();

            // Assert
            expect(props.getCustomerInfoVerify).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should setState correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                customerInfoVerify: {
                    email: 'test',
                    isVerifyEmail: true,
                    isVerifyPassport: true,
                    isVerifyBirthday: false,
                    isVerifySecretCode: false,
                    isVerifyBetCredit: false,
                    isVerifyGivenCredit: false
                }
            };
            const prevProps = { customerInfoVerify: { email: 'test', isVerifyEmail: false } };
            const container = shallow(<CustomerInfoVerify {...props} />).instance();

            // Act
            container.componentDidUpdate(prevProps);

            // Asset
            expect(container.state.numberVerified).toBe(2);
            expect(container.state.energy).toBe(50);
        });
    });

    describe('handleEditCustomerVerifyDialog', () => {
        it('should call props function exactly', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditCustomerVerifyDialog: jest.fn()
            };

            const container = shallow(<CustomerInfoVerify {...props} />).instance();

            // Act
            container.handleEditCustomerVerifyDialog();

            // Assert
            expect(props.setEditCustomerVerifyDialog).toHaveBeenCalledWith({ show: true });
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                customerInfoVerify: null
            };
            const container = shallow(<CustomerInfoVerify {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });

        it('should render call exactly function when click buttton', () => {
            //Act
            const props = {
                ...initProps,
                customerInfoVerify: { email: 'test', isVerifyEmail: true }
            };
            const container = shallow(<CustomerInfoVerify {...props} />).instance();
            container.handleEditCustomerVerifyDialog = jest.fn();
            const formRender = shallow(container.render());

            // Act
            formRender.find(Button).at(0).simulate('click');

            //Assert
            expect(container.handleEditCustomerVerifyDialog).toHaveBeenCalled();
        });
    });
});