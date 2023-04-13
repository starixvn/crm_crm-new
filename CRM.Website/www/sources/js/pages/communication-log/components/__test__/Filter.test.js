import React from 'react';
import { Filter } from '../Filter';
import { Form } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import { shallow } from 'enzyme';

describe('Filter', () => {
    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'btn-submit-communication');
        document.body.appendChild(appContainer);
        window.currentClientTime = '24/9/2021 10:05:20 AM';
    });

    afterEach(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('btn-submit-communication');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const initProps = {
        statusFilter: [{ sites: {id: 1}}],
        gridParams: {
            pageSize: 100
        },
        getLogsByCustomerId: jest.fn(),
        setGridParams: jest.fn(),
        getStatusForFilter: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly function when did mount',() => {
            // Arrange
            const props = {
                ...initProps
            };

            //Act
            const container = shallow(<Filter {...props} />);
            container.instance().setState({
                fromDate: 'Sep 05, 2021',
                toDate: 'Sep 10, 2021'
            });

            // Assert
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getStatusForFilter).toHaveBeenCalled();
        });
    });

    describe('handleKeyDownFunc', () => {
        it('should call exactly func when type key is s', () => {
            // Arrange
            const event = {
                ctrlKey: true,
                key: 's',
                preventDefault: jest.fn()
            };

            // Act
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleKeyDownFunc(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should call exactly func when type key is i', () => {
            // Arrange
            const event = {
                ctrlKey: true,
                key: 'i',
                preventDefault: jest.fn()
            };
            const props = {
                ...initProps,
                setCreateCommunicationDialog: jest.fn()
            }

            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleKeyDownFunc(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.setCreateCommunicationDialog).toHaveBeenCalledWith({ show: true });
        });
    });

    describe('handleChange', () => {
        it('should call setState exactly when handle change with no type', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 720}};
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(720);
        });

        it('should call setState exactly when handle change with have type', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 20, type: 'select-one'}};
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(20);
        });
    });

    describe('handleChangeToDate', () => {
        it('should call setState exactly when handle change to date', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeToDate('Sep 01, 2021');
           
            // Assert
            expect(container.state().toDate).toBe('Sep 01, 2021');
            expect(container.state().maxFromDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleChangeFromDate', () => {
        it('should call setState exactly when handle change from date', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeFromDate('Sep 01, 2021');
           
            // Assert
            expect(container.state().fromDate).toBe('Sep 01, 2021');
            expect(container.state().minToDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleSubmit', () => {
        it('should call setState exactly when handle submit', () => {
            // Arrange
            const props = {
                ...initProps
            };
            const mockEvent = {
                preventDefault: jest.fn()
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ statusId: 10002, handler: 'sa' });
            container.instance().handleSubmit(mockEvent);

            // Assert
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
        });
    });

    describe('renderOptions', () => {
        it('should call return exactly expected', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const actual = container.instance().renderOptions('test',1,1);

            // Assert
            expect(actual).toEqual(<option key={1} value={1}>{'test'}</option>);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                statusFilter: null
            };
            const container = shallow(<Filter {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });

        it('onChange call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const event = {target: {name: "test", value: "test"}};
            const container = shallow(<Filter {...props} />);
            container.instance().handleChange = jest.fn();

            // Action
            container.find(Form.Control).at(0).simulate('change', event);
            container.find(Form.Control).at(1).simulate('change', event);

            // Assert
            expect(container.instance().handleChange).toHaveBeenCalled();
        });

        it('handleChange fromDate call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const value = 'value';
            const container = shallow(<Filter {...props} />);
            container.instance().handleChangeFromDate = jest.fn();

            // Action
            container.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChange toDate call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const value = 'value';
            const container = shallow(<Filter {...props} />);
            container.instance().handleChangeToDate = jest.fn();

            // Action
            container.find(DatePicker).at(1).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});