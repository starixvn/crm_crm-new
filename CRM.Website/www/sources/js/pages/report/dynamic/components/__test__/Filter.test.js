import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Form } from 'react-bootstrap';
import DateTimeService from '@jsroot/common/dateTimeService';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    beforeEach(() => {
        window.currentClientTime = '7/4/2022 10:25:20 AM';
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        document.body.appendChild(hasReadSitePermission);
    });

    afterEach(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
        jest.clearAllMocks();
    });

    const initProps = {
        allSettings: {
            subCategories: [{ id: 1, value: 'test' }],
            subProducts: [{parentId: 1, id: 1, value: 'sb'}],
            periodTypes: [{ id: 1, name: 'Daily' }],
            statuses: [{ statusId: 2, name: 'closed' }],
            responses: [{ id: 2, value: 'Neutral' }],
            products: [{ id: 4600, value: 'SportsBook' }],
            roles: [{ id: 1, value: 'guest'} ],
            communicationTools: [{ id: 1001, name: 'emails' }],
            extensions: [{ id: 1, value: 5121 }],
            mainCategories: [{ mainCategoryID: 3000, name: 'General Net'}],
            sites: [{ id: 1, name: 'credit', childSites: [{ id: 1, name: '5111', childSites: [{ id: 1, name: '5111' }] }] }]
        },
        getAllSettings: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().componentDidMount();

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('handleUpdateFromDate', () => {
        it('should update toDate equal maxDate when fromDate is change by daily', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('2/5/2021 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('2/5/2021 5:20:25 PM'));
            // expect(container.state().toDate).toEqual(new Date('2/4/2022 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('2/5/2021 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('2/4/2022 5:20:25 PM'));
        });

        it('should update toDate equal currentDate when fromDate is change by daily', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('1/8/2022 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/8/2022 5:20:25 PM'));
            // expect(container.state().toDate).toEqual(new Date('4/8/2022 10:05:20 AM'));
            expect(container.instance().minToDate).toEqual(new Date('1/8/2022 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('4/8/2022 10:05:20 AM'));
        });
    });

    describe('handleUpdateToDate', () => {
        it('should update toDate by daily', () => {
            // Arrange
            const props = {...initProps};
            const toDate = new Date('4/8/2022 9:05:20 AM');       
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateToDate(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('4/8/2022 9:05:20 AM'));
        });
    });

    describe('handleUpdateFromWeek', () => {
        it('should update toDate equal fromDate when fromDate is change by weekly', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('12/10/2021 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            container.instance().setState({ toDate: new Date('4/9/2021 5:20:25 PM') });

            // Act
            container.instance().handleUpdateFromWeek(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('12/5/2021 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('12/5/2021 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('4/8/2022 10:05:20 AM'));
        });

        it('should update toDate equal maxDate when fromDate is change by weekly', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('1/8/2020 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/8/2020 5:20:25 PM'));
            // expect(container.state().toDate).toEqual(new Date('1/7/2021 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('1/8/2020 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('1/7/2021 5:20:25 PM'));
        });
    });

    describe('handleUpdateToWeek', () => {
        it('should update toDate by weekly', () => {
            // Arrange
            const props = {...initProps};
            const toDate = new Date('4/8/2022 9:05:20 AM');       
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateToWeek(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('4/9/2022 9:05:20 AM'));
        });
    });

    describe('handleUpdateFromMonth', () => {
        it('should update toDate equal currentDate when fromDate is change by monthly', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('1/10/2022 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            container.instance().setState({ toDate: new Date('4/9/2021 5:20:25 PM') });

            // Act
            container.instance().handleUpdateFromMonth(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/10/2022 5:20:25 PM'));
            expect(container.state().toDate).toEqual(new Date('04/09/2022 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('1/10/2022 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('4/8/2022 10:05:20 AM'));
        });

        it('should update toDate equal maxDate when fromDate is change by monthly', () => {
            // Arrange
            const props = {...initProps};
            const fromDate = new Date('1/8/2020 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            container.instance().setState({ toDate: new Date('4/9/2021 5:20:25 PM') });

            // Act
            container.instance().handleUpdateFromMonth(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/8/2020 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('1/8/2020 5:20:25 PM'));
            // expect(container.instance().maxToDate).toEqual(new Date('1/7/2021 5:20:25 PM'));
        });
    });

    describe('handleUpdateToMonth', () => {
        it('should update toDate by monthly', () => {
            // Arrange
            const props = {...initProps};
            const toDate = new Date('8/15/2022');       
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleUpdateToMonth(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('8/31/2022'));
        });
    });

    describe('handleUpdateFromYear', () => {
        it('should update toDate by yearly', () => {
            // Arrange
            const props = {...initProps};
            const firstDateYear = new Date('01/01/2022');       
            const container = shallow(<Filter {...props}/>);

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022 10:05:20 AM');

            // Act
            container.instance().handleUpdateFromYear(firstDateYear);

            // Assert
            expect(container.instance().minToDate).toEqual(new Date('01/01/2022'));
            expect(container.instance().maxToDate).toEqual(new Date('01/01/2022'));
            expect(container.state().fromDate).toEqual(new Date('01/01/2022'));
            expect(container.state().toDate).toEqual(new Date('12/31/2022'));
        });
    });

    describe('renderFilterDate', () => {
        it('should render DateTimePicker correctly when reportType is 1', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ reportType: 1 });

            // Act
            container.instance().renderFilterDate();

            // Assert
            expect(container.find(DatePicker).length).toBe(2);
            expect(container.find(DatePicker).at(0).props().dateFormat).toEqual('MMM dd, yyyy');
        });

        it('should render DateTimePicker correctly when reportType is 2', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ reportType: 2 });

            // Act
            container.instance().renderFilterDate();

            // Assert
            expect(container.find(DatePicker).length).toBe(2);
            expect(container.find(DatePicker).at(0).props().dateFormat).toEqual('52 (MMM dd, yyyy)');
        });

        it('should render DateTimePicker correctly when reportType is 3', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ reportType: 3 });

            // Act
            container.instance().renderFilterDate();

            // Assert
            expect(container.find(DatePicker).length).toBe(2);
            expect(container.find(DatePicker).at(0).props().dateFormat).toEqual('MMM yyyy');
        });

        it('should render DateTimePicker correctly when reportType is 4', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ reportType: 4 });

            // Act
            container.instance().renderFilterDate();

            // Assert
            expect(container.find(DatePicker).length).toBe(2);
            expect(container.find(DatePicker).at(0).props().dateFormat).toEqual('yyyy');
        });
    });

    describe('renderItems', () => {
        it('should render option correctly', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);

            // Act
            const actual = container.instance().renderItems('test', 1, 0);

            // Assert
            expect(actual).toEqual(<option key={0} value={1}>test</option>)
        });
    });

    describe('handleChangeReportType', () => {
        it('should setState exactly when reportType is 1', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = {
                target: { value: 1 }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022');

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeReportType(mockEvent);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('4/1/2022'));
            expect(container.state().toDate).toEqual(new Date('4/8/2022'));
        });

        it('should setState exactly when reportType is 2', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = {
                target: { value: 2 }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022');

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeReportType(mockEvent);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('4/8/2022').setDate(3));
            expect(container.state().toDate).toEqual(new Date('4/8/2022').setDate(9));
        });

        it('should setState exactly when reportType is 3', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = {
                target: { value: 3 }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022');

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeReportType(mockEvent);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('4/1/2022'));
            expect(container.state().toDate).toEqual(new Date('4/30/2022'));
        });

        it('should setState exactly when reportType is 4', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = {
                target: { value: 4 }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2022');

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeReportType(mockEvent);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/1/2022'));
            expect(container.state().toDate).toEqual(new Date('4/8/2022'));
        });
    });

    describe('handleChange', () => {
        it('should call setState exactly when handle change with no type', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'handler', value: 'test' }}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().handler).toBe('test');
        });

        it('should call setState exactly when handle change with have type', () => {
            // Arrange
            const props = {...initProps};
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'responseId', value: 20, type: 'select-one' }}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().responseId).toBe(20);
        });
    });

    describe('handleChangeSite', () => {
        it('should setState siteId exactly', () => {
            // Arrange
            const props = {...initProps};
            const param = { id : 12 };
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeSite(param);

            // Assert
            expect(container.state().siteId).toEqual(12);
        });
    });

    describe('filterSubCategoryOptions', () => {
        it('should return expected result', () => {
            // Arrange
            const props = {...initProps};
            const subCategories = [{ mainCategoryID: 2000 }, { mainCategoryID: 2001 }];
            const mainCategoryId = 2000;

            const container = shallow(<Filter {...props}/>);

            // Act
            const actual = container.instance().filterSubCategoryOptions(subCategories, mainCategoryId);

            expect(actual).toEqual([{ mainCategoryID: 2000 }]);
        });
    });

    describe('filterSubProductOptions', () => {
        it('should return expected result', () => {
            // Arrange
            const props = {...initProps};
            const subProducts = [{ parentId: 2000 }, { parentId: 2001 }];
            const productId = 2000;

            const container = shallow(<Filter {...props}/>);

            // Act
            const actual = container.instance().filterSubProductOptions(subProducts, productId);

            expect(actual).toEqual([{ parentId: 2000 }]);
        });
    });

    describe('handleToggleFilter', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ showFilter: false });

            // Act
            container.instance().handleToggleFilter();

            // Assert
            expect(container.state().showFilter).toBe(undefined);
        });
    });

    // describe('handleSubmit', () => {
    //     it('should call exactly props function', () => {
    //         // Arrange
    //         const props = {
    //             ...initProps,
    //             gridParams: {
    //                 pageIndex: 1,
    //                 pageSize: 100
    //             },
    //             getDynamicReports: jest.fn(),
    //             setGridParams: jest.fn()
    //         };
    //         const mockEvent = { preventDefault: jest.fn() };

    //         const container = shallow(<Filter {...props}/>);

    //         // Act
    //         container.instance().handleSubmit(mockEvent);

    //         // Assert
    //         //expect(props.getDynamicReports).toHaveBeenCalled();
    //         expect(props.setGridParams).toHaveBeenCalled();
    //     });
    // });

    describe('render', () => {
        it('should return null when allSettings is null', () => {
            // Arrange
            const props = {
                ...initProps,
                allSettings: null
            };

            const container = shallow(<Filter {...props}/>);

            // Assert
            expect(container.type()).toEqual(null);
        });

        it('should call exactly function when render', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);

            // Assert
            expect(container.find(Form.Control).length).toBe(12);
        });

        it('should render exactly className of span when showFiler', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ showFilter: true });

            // Assert
            expect(container.find('span').at(0).props().className).toEqual('fa fa-caret-up fa-sm icon-toggle');
        });

        it('should render exactly className of span when not showFiler', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ showFilter: false });

            // Assert
            expect(container.find('span').at(0).props().className).toEqual('fa fa-caret-down fa-sm icon-toggle');
        });
    });
});