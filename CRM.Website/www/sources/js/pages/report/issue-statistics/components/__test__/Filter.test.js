import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { toast } from 'react-toastify';

describe('Filter', () => {
    beforeAll(() => {
       
    });

    beforeEach(() => {
        LangHelper.getResource = jest.fn((key) => key);
        window.currentClientTime = '4/8/2021 10:05:20 AM';
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        document.body.appendChild(hasReadSitePermission);
    });

    afterEach(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
    });
    
    const stateInit = {
        groupBy: 1,
        showFilter: true
    };
    const propsInit = {
        gridParams: {
            pageIndex: 1,
            pageSize: 7
        },
        settings: {
            mainCategories: [{ mainCategoryID : 0 }],
            subCategories: [{ mainCategoryID : 0 }]
        },
        setGridParams: jest.fn(),
        getGridData: jest.fn()
    };

    describe('functions', () => {
        describe('handleChangeFromDate', () => {
            it('should update toDate when fromDate greater than toDate', () => {
                // Arrange
                const fromDate = new Date('2/5/2020 5:20:25 PM');
                const toDate = new Date('1/5/2020 5:20:25 PM');

                const state = {...stateInit, ...{toDate: toDate}};
                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
                expect(container.state().toDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
            });

            it('should update toDate to endOfMonth when toDate greater than endOfMonth', () => {
                // Arrange
                const fromDate = new Date('5/2/2020 5:20:25 PM');
                const toDate = new Date('6/1/2020 5:20:25 PM');

                const state = {...stateInit, ...{toDate: toDate}};
                DateTimeService.toShortDateTimeFormat = jest.fn(() => '5/30/2020 5:20:25 PM');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('5/2/2020 5:20:25 PM'));
                expect(container.state().toDate).toEqual(new Date('5/30/2020 5:20:25 PM'));
            });
        });

        describe('handleChangeToDate', () => {
            it('should update fromDate when fromDate greater than toDate', () => {
                // Arrange
                const fromDate = new Date('2/5/2020 5:20:25 PM');
                const toDate = new Date('1/5/2020 5:20:25 PM');

                const state = {...stateInit, ...{fromDate: fromDate}};
                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeToDate(toDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('1/5/2020 5:20:25 PM'));
                expect(container.state().toDate).toEqual(new Date('1/5/2020 5:20:25 PM'));
            });

            it('should update fromDate to startOfMonth when startDateOfMonth greater than toDate', () => {
                // Arrange
                const fromDate = new Date('1/4/2020 5:20:25 PM');
                const toDate = new Date('2/5/2020 5:20:25 PM');

                const state = {...stateInit, ...{fromDate: fromDate}};
                DateTimeService.toShortDateTimeFormat = jest.fn(() => '2/5/2020 5:20:25 PM');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeToDate(toDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
                expect(container.state().toDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
            });
        });

        describe('handleChangeMonthToDate', () => {
            it('should update toMonthDate when fromMonthGetYear different vs toMonthGetYear', () => {
                // Arrange
                const toMonthDate = new Date('2/5/2021 5:20:25 PM');
                const fromMonthDate = new Date('1/5/2020 5:20:25 PM');

                const state = {...stateInit, ...{fromMonthDate: fromMonthDate}};
                DateTimeService.endMonthOfYear = jest.fn(() => '12/1/2020');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeMonthToDate(toMonthDate);

                // Assert
                expect(container.state().toMonthDate).toEqual(new Date('2/5/2021 5:20:25 PM'));
            });
        });

        describe('handleChangeMonthFromDate', () => {
            it('should update fromMonthDate when fromMonthGetYear different vs toMonthGetYear', () => {
                // Arrange
                const toMonthDate = new Date('2/5/2021 5:20:25 PM');
                const fromMonthDate = new Date('1/5/2020 5:20:25 PM');
    
                const state = {...stateInit, ...{toMonthDate: toMonthDate}};
                DateTimeService.firstMonthOfYear = jest.fn(() => '01/1/2020 5:20:25 PM');
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(state);
                // Act
                container.instance().handleChangeMonthFromDate(fromMonthDate);
    
                // Assert
                expect(container.state().fromMonthDate).toEqual(new Date('1/5/2020 5:20:25 PM'));
            });
        });

        describe('handleChange', () => {
            it('call setState', () => {
                // Arrange
                
                //Act
                const container = shallow(<Filter {...propsInit}/>);
                container.instance().setState(stateInit);
                container.find('FormControl[name="groupBy"]').at(0).simulate("change", { target: { name: 'groupBy' , value: '2', type:'select-one' } });

                // Assert
                expect(container.find('FormControl[name="groupBy"]')).toHaveLength(1);
                expect(container.state().groupBy).toBe(2);
            });
        });

        describe('handleSubmit', () => {
            it('should return error if mainCategory is not selected', () => {
                // Arrange
                const state = {...stateInit, mainCategoryId : -1};
                toast.error = jest.fn();
                
                //Act
                const container = shallow(<Filter {...propsInit} />);
                container.instance().setState(state);
                container.find("Form").simulate("submit");

                // Assert
                expect(toast.error).toHaveBeenCalledWith(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory')));
            });
           
            it('should call exactly params when reportType is daily', () => {
                // Arrange
                const params = {
                    fromDate: new Date('4/8/2021 9:05:20 AM'),
                    toDate: new Date('4/8/2021 9:05:20 AM'),
                    mainCategoryId: 0,
                    subCategoryId: 0
                };
                const expectedParams = {
                    reportType: 1,
                    fromDate: 'Apr 08, 2021',
                    toDate: 'Apr 08, 2021',
                    mainCategoryId: 0,
                    subCategoryId: 0,
                    isGetFullReport: false,
                    pageIndex: 1,
                    pageSize: 7
                };
                const state = {...stateInit, ...params};
                
                //Act
                const container = shallow(<Filter {...propsInit} />);
                container.instance().setState(state);
                container.find("Form").simulate("submit");

                // Assert
                expect(propsInit.setGridParams).toHaveBeenCalledWith(expectedParams);
                expect(propsInit.getGridData).toHaveBeenCalledWith(expectedParams);
            });

            it('should call exactly params when reportType is monthly', () => {
                // Arrange
                const params = {
                    fromMonthDate: new Date('4/8/2021 9:05:20 AM'),
                    toMonthDate: new Date('4/8/2021 9:05:20 AM'),
                    mainCategoryId: 0,
                    subCategoryId: 0
                };
                const expectedParams = {
                    reportType: 2,
                    fromDate: 'Apr 08, 2021',
                    toDate: 'Apr 30, 2021',
                    mainCategoryId: 0,
                    subCategoryId: 0,
                    isGetFullReport: true,
                    pageIndex: 1,
                    pageSize: 7
                };
                stateInit.groupBy = 2;
                const state = {...stateInit, ...params};
                
                //Act
                const container = shallow(<Filter {...propsInit} />);
                container.instance().setState(state);
                container.find("Form").simulate("submit");

                // Assert
                expect(propsInit.setGridParams).toHaveBeenCalledWith(expectedParams);
                expect(propsInit.getGridData).toHaveBeenCalledWith(expectedParams);
            });
        });

        describe('handleToggleFilter', () => {
            let EventBak;
            let windowBak;
    
            beforeAll(() => {
                EventBak = global.Event;
                windowBak = global.window.dispatchEvent;
                global.Event = jest.fn();
                global.window.dispatchEvent = jest.fn();
            });
    
            afterAll(() => {
                global.Event = EventBak;
                global.window.dispatchEvent = windowBak;
            });
        });

    });

    describe('render', () => {
        it('handleChangeFromDate correctly', () => {
            // Arrange
            stateInit.groupBy = 1;
            const container = shallow(<Filter {...propsInit} />);
            container.instance().setState(stateInit);
            container.instance().handleChangeFromDate = jest.fn();
            // Act
            container.find(DatePicker).at(0).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChangeToDate correctly', () => {
            // Arrange
            stateInit.groupBy = 1;
            const container = shallow(<Filter {...propsInit} />);
            container.instance().handleChangeToDate = jest.fn();
            container.instance().setState(stateInit);
            // Act
            container.find(DatePicker).at(1).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });

        it('handleChangeMonthFromDate correctly', () => {
            // Arrange
            stateInit.groupBy = 3;
            const date = new Date('2/5/2020 5:20:25 PM');
            const container = shallow(<Filter {...propsInit} />);
            container.instance().setState(stateInit);
            container.instance().handleChangeMonthFromDate = jest.fn();
            // Act
            container.find(DatePicker).at(0).simulate('change', date);

            // Assert
            expect(container.instance().handleChangeMonthFromDate).toHaveBeenCalled();
        });

        it('handleChangeMonthToDate correctly', () => {
            // Arrange
            stateInit.groupBy = 3;
            const date = new Date('2/5/2020 5:20:25 PM');
            const container = shallow(<Filter {...propsInit} />);
            container.instance().handleChangeMonthToDate = jest.fn();
            container.instance().setState(stateInit);
            // Act
            container.find(DatePicker).at(1).simulate('change', date);

            // Assert
            expect(container.instance().handleChangeMonthToDate).toHaveBeenCalled();
        });

        it('handleToggleFilter correctly', () => {
            // Arrange
            const container = shallow(<Filter {...propsInit} />);
            container.instance().handleToggleFilter = jest.fn();
            container.instance().setState(stateInit);
            // Act
            container.find('span').at(0).simulate('click');

            // Assert
            expect(container.instance().handleToggleFilter).toHaveBeenCalledWith(false);
        });

        it('handleToggleFilter correctly when showFilter is false', () => {
            // Arrange
            stateInit.showFilter = false;
            const container = shallow(<Filter {...propsInit} />);
            container.instance().handleToggleFilter = jest.fn();
            container.instance().setState(stateInit);
            // Act
            container.find('span').at(0).simulate('click');

            // Assert
            expect(container.instance().handleToggleFilter).toHaveBeenCalledWith(true);
        });
    });
});