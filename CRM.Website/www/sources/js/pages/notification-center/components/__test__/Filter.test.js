import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button, Modal } from 'react-bootstrap';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import  * as functions from '../../common.functions';
import  * as shareScripts from '@jsroot/common/shareScripts';
import { toast } from 'react-toastify';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';

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
            expect(container.state.filter.isTestOnly).toEqual(false);
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('isValidParams', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();

            //Act
            container.isValidParams('', 'Sending');

            //Assert
            expect(container.state.filter.isTestOnly).toEqual(false);
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });
});