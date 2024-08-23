import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import  * as functions from '../../common.functions';
import  * as shareScripts from '@jsroot/common/shareScripts';
import { toast } from 'react-toastify';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn(key => key);
        DateTimeService.toLongDateTimeFormat = jest.fn(val => val);
        DateTimeService.toShortDateFormat = jest.fn(val => val);
        DateTimeService.toClientDateTime = jest.fn(val => val);
        DateTimeService.startOfDay = jest.fn(val => val);
        functions.statusOptionOST = [{id: 'New', name: 'New', checked: true}];
        functions.statusOptionCSD = [{id: 'Active', name: 'Active', checked: true}];
        functions.isEitherExitsFromToId = jest.fn(() => true);
        functions.isFromIdOverToId = jest.fn(() => true);
        functions.checkExceedMaxInt = jest.fn();
        shareScripts.isHavePermissionOnSite = jest.fn(() => true);
        shareScripts.isHaveLicenseePermissionOnSite = jest.fn(() => true);
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isLoadGrid: true,
        filterParams: {
            isOstUser: true, matchId: 1, statuses: 'New, Draft', isCompareIdEqual: true,
            fromDate: '20/8/2024', toDate: '20/8/2024', notificationId: 1, sender: 'sa',
            fromNotificationId: 1, toNotificationId: 2, messageId: 1, content: 'test', isTestOnly: true
        },
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        autoRefresh: { value: 60, isSubmit: true },
        setGridParams: jest.fn(),
        getGridData: jest.fn(),
        setAutoRefresh: jest.fn(),
    };

    describe('componentDidMount', () => {
        it('should set state exactly when filterParams full data', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: {
                    fromDate: '10/8/2024',
                    toDate: '10/8/2024',
                    statuses: 'Test'
                },
                isTestOnly: false
            };
            const container = shallow(<Filter {...props}/>).instance();
            container.setState(state);

            //Act
            container.componentDidMount();

            //Assert
            expect(container.state.filter.statuses).toEqual('New, Draft');
            expect(container.state.filter.isTestOnly).toEqual(true);
        });

        it('should set state exactly when filterParams not full data', () => {
            //Arrange
            const props = {
                ...initProps,
                filterParams: {
                    ...initProps.filterParams,
                    isOstUser: false,
                    fromDate: null,
                    toDate: null,
                    statuses: null,
                    isTestOnly: null
                }
            };
            const state = {
                filter: {
                    fromDate: '30/8/2024',
                    toDate: '31/8/2024',
                    statuses: 'Test',
                },
                isTestOnly: false
            };
            const container = shallow(<Filter {...props}/>).instance();
            container.setState(state);

            //Act
            container.componentDidMount();

            //Assert
            expect(container.state.filter.statuses).toEqual('Test');
            expect(container.state.filter.isTestOnly).toEqual(false);
            expect(container.state.filter.fromDate).toEqual('30/8/2024');
            expect(container.state.filter.toDate).toEqual('31/8/2024');
        });
    });

    describe('handleFilterChange', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: {
                    fromDate: '10/8/2024',
                    toDate: '10/8/2024',
                    statuses: 'Test'
                },
                isTestOnly: false
            };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            container.handleFilterChange('name', 'value');

            //Assert
            expect(container.state.filter.name).toEqual('value');
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('handleDateChange', () => {
        it('should call exactly function', () => {
            //Arrange
            const props = {...initProps};
            const params = ['20/8/2024', '25/8/2024'];
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleFilterChange = jest.fn();

            //Act
            container.handleDateChange(params);

            //Assert
            expect(container.handleFilterChange).toHaveBeenCalled();
        });
    });

    describe('handleChangeNotificationType', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const arrAttId = ['notificationId', 'fromNotificationId', 'toNotificationId'];
            arrAttId.forEach(item => {
                const appContainer = document.createElement('div');
                appContainer.setAttribute('id', item);
                document.body.appendChild(appContainer); 
            });
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();

            //Act
            container.handleChangeNotificationType();

            //Assert
            expect(container.state.isCompareIdEqual).toEqual(false);
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('handleChangeStatus', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();

            //Act
            container.handleChangeStatus('', 'Sending');

            //Assert
            expect(container.state.filter.statuses).toEqual('Sending');
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('handleChangeTestData', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();

            //Act
            container.handleChangeTestData('', 'Sending');

            //Assert
            expect(container.state.filter.isTestOnly).toEqual(true);
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('isValidParams', () => {
        it('should return errMsg exactly when isCompareIdEqual false', () => {
            //Arrange
            const props = {...initProps};
            const filter = props.filterParams;
            const state = {
                isCompareIdEqual: false,
                filter: filter
            };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isValidParams();

            //Assert
            expect(container.state.isValidNotification).toEqual(true);
            expect(actual.isValid).toEqual(false);
            expect(actual.errMsg).toEqual(['BothFromToNotificationId', 'ToCannotGreaterFromValue']);
        });

        it('should return errMsg exactly when isCompareIdEqual true and fromDate is null', () => {
            //Arrange
            const props = {...initProps};
            const filter = {
                ...props.filterParams,
                fromDate: null,
                toDate: null
            }
            const state = {
                isCompareIdEqual: true,
                filter: filter
            };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isValidParams();

            //Assert
            expect(actual.isValid).toEqual(false);
            expect(actual.errMsg).toEqual(['InvalidRangeDateFilter']);
        });
    });

    describe('handleChangeNotificationFromTo', () => {
        it('should call exactly function', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleFilterChange = jest.fn();

            //Act
            container.handleChangeNotificationFromTo('name', 'value');

            //Assert
            expect(container.state.isValidNotification).toEqual(false);
            expect(container.handleFilterChange).toHaveBeenCalled();
        });
    });

    describe('isDisabledField', () => {
        it('should return exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: props.filterParams
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isDisabledField();

            //Assert
            expect(actual).toEqual(1);
        });
    });

    describe('isDisabledMessage', () => {
        it('should return exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: props.filterParams
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isDisabledMessage();

            //Assert
            expect(actual).toEqual(1);
        });
    });

    describe('isDisabledNotification', () => {
        it('should return exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: props.filterParams
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isDisabledNotification();

            //Assert
            expect(actual).toEqual(1);
        });
    });

    describe('getParams', () => {
        it('should return exactly when isCompareIdEqual true', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: props.filterParams,
                isCompareIdEqual: true,
                isOstUser: true
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.getParams();

            //Assert
            expect(actual.notificationId).toEqual(1);
        });

        it('should return exactly when isCompareIdEqual false', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                filter: props.filterParams,
                isCompareIdEqual: false,
                isOstUser: false
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.getParams();

            //Assert
            expect(actual.notificationId).toEqual(null);
        });
    });

    describe('submit', () => {
        it('should call props function exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                isOstUser: true
            }
            const validParams = { isValid: true, errMsg: [] };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.isValidParams = jest.fn(() => validParams);
            container.getParams = jest.fn(() => {});

            //Act
            container.submit();

            //Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
            expect(props.setAutoRefresh).toHaveBeenCalled();
        });

        it('should call toast.error exactly', () => {
            //Arrange
            const props = {...initProps};
            const state = {
                isOstUser: false
            }
            const validParams = { isValid: false, errMsg: ['Message false'] };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.isValidParams = jest.fn(() => validParams);
            toast.error = jest.fn();

            //Act
            container.submit();

            //Assert
            expect(toast.error).toHaveBeenCalledWith('Message false');
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly', () => {
            //Arrange
            const props = {...initProps};
            const event = {
                preventDefault: jest.fn()
            }
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.submit = jest.fn();

            //Act
            var actual = container.handleSubmit(event);

            //Assert
            expect(container.submit).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('handleResetPaging', () => {
        it('should call exactly', async () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.submit = jest.fn();

            //Act
            await container.handleResetPaging();
            jest.runAllTimers();

            //Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(container.submit).toHaveBeenCalled();
        });
    });

    describe('handleChangeUser', () => {
        it('should call exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleResetPaging = jest.fn();

            //Act
            container.handleChangeUser(0);

            //Assert
            expect(container.state.isOstUser).toEqual(true);
            expect(container.handleResetPaging).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleChangeUser = jest.fn();
            container.handleSubmit = jest.fn();
            container.handleDateChange = jest.fn();
            container.isDisabledField = jest.fn();
            container.handleFilterChange = jest.fn();
            container.handleChangeNotificationType = jest.fn();
            container.isDisabledNotification = jest.fn();
            container.handleChangeNotificationFromTo = jest.fn();
            container.handleChangeStatus = jest.fn();
            container.handleChangeTestData = jest.fn();

            //Act
            var actual = container.render();
            var render = shallow(<div>{actual}</div>);
            render.find('.user-ost').at(0).simulate('click');
            render.find('.user-licensee').at(0).simulate('click');
            render.find('.form-filter').at(0).simulate('submit');

            //Assert
            expect(container.handleChangeUser).toHaveBeenCalledWith(0);
            expect(container.handleChangeUser).toHaveBeenCalledWith(1);
            expect(container.handleSubmit).toHaveBeenCalled();
        });

        it('should render exactly DatePicker', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleChangeUser = jest.fn();
            container.handleSubmit = jest.fn();
            container.handleDateChange = jest.fn();
            container.isDisabledField = jest.fn();
            container.handleFilterChange = jest.fn();
            container.handleChangeNotificationType = jest.fn();
            container.isDisabledNotification = jest.fn();
            container.handleChangeNotificationFromTo = jest.fn();
            container.handleChangeStatus = jest.fn();
            container.handleChangeTestData = jest.fn();

            //Act
            var actual = container.render();
            var render = shallow(<div>{actual}</div>);
            render.find(DatePicker).at(0).props().onChangeDate();
            render.find(DatePicker).at(0).props().disabled;

            //Assert
            expect(container.handleDateChange).toHaveBeenCalled();
            expect(container.isDisabledField).toHaveBeenCalled();
        });

        it('should render exactly matchId', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleChangeUser = jest.fn();
            container.handleSubmit = jest.fn();
            container.handleDateChange = jest.fn();
            container.isDisabledField = jest.fn();
            container.handleFilterChange = jest.fn();
            container.handleChangeNotificationType = jest.fn();
            container.isDisabledNotification = jest.fn();
            container.handleChangeNotificationFromTo = jest.fn();
            container.handleChangeStatus = jest.fn();
            container.handleChangeTestData = jest.fn();

            //Act
            var actual = container.render();
            var render = shallow(<div>{actual}</div>);
            render.find('#matchId').at(0).props().disabled;
            render.find('#matchId').at(0).simulate('change', { target: {value:''}});

            //Assert
            expect(container.isDisabledField).toHaveBeenCalled();
            expect(container.handleFilterChange).toHaveBeenCalled();
        });

        it('should render exactly From', () => {
            //Arrange
            const props = {...initProps};
            const state = { isCompareIdEqual: true };
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleChangeUser = jest.fn();
            container.handleSubmit = jest.fn();
            container.handleDateChange = jest.fn();
            container.isDisabledField = jest.fn();
            container.handleFilterChange = jest.fn();
            container.handleChangeNotificationType = jest.fn();
            container.isDisabledNotification = jest.fn();
            container.handleChangeNotificationFromTo = jest.fn();
            container.handleChangeStatus = jest.fn();
            container.handleChangeTestData = jest.fn();

            //Act
            var actual = container.render();
            var render = shallow(<div>{actual}</div>);
            render.find(Form.Control).at(1).props().disabled;
            render.find(Form.Control).at(1).simulate('change');
            render.find('#fromNotificationId').at(0).props().disabled;
            render.find('#fromNotificationId').at(0).simulate('change', { target: {value:''}});
            render.find('#toNotificationId').at(0).props().disabled;
            render.find('#toNotificationId').at(0).simulate('change', { target: {value:''}});
            render.find('#notificationId').at(0).props().disabled;
            render.find('#notificationId').at(0).simulate('change', { target: {value:''}});
            render.find('#messageId').at(0).props().disabled;
            render.find('#messageId').at(0).simulate('change', { target: {value:''}});
            render.find(Form.Control).at(6).props().disabled;
            render.find(Form.Control).at(6).simulate('change', { target: {value:''}});
            render.find(MultipleSelect).at(0).props().isDisable;
            render.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
            render.find(Form.Control).at(7).props().disabled;
            render.find(Form.Control).at(7).simulate('change', { target: {value:''}});
            render.find(Form.Check).at(0).props().disabled;
            render.find(Form.Check).at(0).simulate('change');

            //Assert
            expect(container.isDisabledField).toHaveBeenCalled();
            expect(container.handleChangeNotificationType).toHaveBeenCalled();
            expect(container.handleChangeNotificationFromTo).toHaveBeenCalled();
            expect(container.handleFilterChange).toHaveBeenCalled();
            expect(container.handleChangeStatus).toHaveBeenCalled();
            expect(container.handleChangeTestData).toHaveBeenCalled();
        });
    });
});