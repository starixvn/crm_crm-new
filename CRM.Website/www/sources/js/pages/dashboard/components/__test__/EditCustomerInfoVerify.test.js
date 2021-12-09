import React from 'react';
import { shallow } from 'enzyme';
import { Button} from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import { EditCustomerInfoVerify } from '../EditCustomerInfoVerify';

describe('EditCustomerInfoVerify', () => {
    beforeAll(() => {
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        customerInfoVerify : {
            email: '___', isVerifyEmail: true,
            passport: '---', isVerifyPassport: false,
            birthDay: new Date('09/09/2021'), isVerifyBirthday: false,
            secretCode: '---', isVerifySecretCode: false,
            betCredit: 0, isVerifyBetCredit: false,
            givenCredit: 0, isVerifyGivenCredit: false
        }
    };

    describe('componentDidMount', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {...initProps};
            const expected = [
                { isChecked: true, name: 'Email', value: '___' },
                { isChecked: false, name: 'Passport Number', value: '---' },
                { isChecked: false, name: 'BirthDay', value: 'Sep 09, 2021' },
                { isChecked: false, name: 'Secret Code', value: '---' },
                { isChecked: false, name: 'Bet Credit', value: '0.00' },
                { isChecked: false, name: 'Given Credit', value: '0.00' }
            ];
            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();

            // Act
            container.componentDidMount();
            
            // Assert
            expect(container.state.data).toEqual(expected);
        });
    });

    describe('handleChange', () => {
        it('should setState exactly when change check', () => {
            // Arrange
            const props = {...initProps};
            const data = [
                { isChecked: true, name: 'Email', value: '___' },
                { isChecked: false, name: 'Passport Number', value: '---' },
                { isChecked: false, name: 'BirthDay', value: 'Sep 09, 2021' },
                { isChecked: false, name: 'Secret Code', value: '---' },
                { isChecked: false, name: 'Bet Credit', value: '0.00' },
                { isChecked: false, name: 'Given Credit', value: '0.00' }
            ];
            const expected = [
                { isChecked: false, name: 'Email', value: '___' },
                { isChecked: false, name: 'Passport Number', value: '---' },
                { isChecked: false, name: 'BirthDay', value: 'Sep 09, 2021' },
                { isChecked: false, name: 'Secret Code', value: '---' },
                { isChecked: false, name: 'Bet Credit', value: '0.00' },
                { isChecked: false, name: 'Given Credit', value: '0.00' }
            ];
            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();
            container.setState({ data: data });

            // Act
            container.handleChange(0);

            // Assert
            expect(container.state.data).toEqual(expected);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly props function when submit successful', async () => {
            // Arrange
            const props = {
                ...initProps,
                editCustomerVerify: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const data = [
                { isChecked: true, name: 'Email', value: '___' },
                { isChecked: false, name: 'Passport Number', value: '---' },
                { isChecked: false, name: 'BirthDay', value: 'Sep 09, 2021' },
                { isChecked: false, name: 'Secret Code', value: '---' },
                { isChecked: false, name: 'Bet Credit', value: '0.00' },
                { isChecked: false, name: 'Given Credit', value: '0.00' }
            ];
            const response = { data: { code: 0, isSuccessful: true } };
            const promise = Promise.resolve(response);
            const mockEvent = { preventDefault: jest.fn() };

            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();
            container.setState({ data: data });

            // Act
            container.handleSubmit(mockEvent);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editCustomerVerify).toHaveBeenCalled();
            expect(container.state.editResult).toEqual(response.data);
            expect(props.onClose).toHaveBeenCalledWith(true);
            expect(container.state.isSubmitting).toEqual(true);
        });

        it('should call exactly props function when submit unsuccessful', async () => {
            // Arrange
            const props = {
                ...initProps,
                editCustomerVerify: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const data = [
                { isChecked: true, name: 'Email', value: '___' },
                { isChecked: false, name: 'Passport Number', value: '---' },
                { isChecked: false, name: 'BirthDay', value: 'Sep 09, 2021' },
                { isChecked: false, name: 'Secret Code', value: '---' },
                { isChecked: false, name: 'Bet Credit', value: '0.00' },
                { isChecked: false, name: 'Given Credit', value: '0.00' }
            ];
            const response = { data: { code: 101, isSuccessful: false } };
            const promise = Promise.resolve(response);
            const mockEvent = { preventDefault: jest.fn() };

            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();
            container.setState({ data: data });

            // Act
            container.handleSubmit(mockEvent);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editCustomerVerify).toHaveBeenCalled();
            expect(container.state.isSubmitting).toEqual(false);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {...initProps};
            const container = shallow(<EditCustomerInfoVerify {...props} />);
            container.setState({ data: null });

            //Assert
            expect(container.type()).toEqual(null);
        });

        it('should call exactly function when click button', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();
            container.handleSubmit = jest.fn();

            const formRender = shallow(container.render());

            // Act
            formRender.find(Button).at(0).simulate('click');

            // Assert
            expect(container.handleSubmit).toHaveBeenCalled();
        });

        it('should call exactly function when change check', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<EditCustomerInfoVerify {...props} />).instance();
            container.handleChange = jest.fn();

            const formRender = shallow(container.render());

            // Act
            formRender.find('input').at(0).simulate('change',0);

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });
});