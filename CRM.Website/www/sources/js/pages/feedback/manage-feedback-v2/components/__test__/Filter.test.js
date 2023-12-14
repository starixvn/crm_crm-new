import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
    });

    describe('functions', () => {
        const settingsInit = {
            customerTypes: [{ id: 1, name: 'test' }],
            mainCategories: [{ mainCategoryID : 0 }],
            subCategories: [{ mainCategoryID : 0 }],
            communications: [{ id: 1, name: 'test'}],
            responses: [{ id: 1, name: 'test'}],
            statuses: [{statusId: 1, name: 'test'}]
        };
        describe('handleChangeFromDate', () => {
            it('should update toDate when fromDate is change', () => {
                // Arrange
                const props = {
                    settings: settingsInit
                };
                const fromDate = new Date('2/5/2020 5:20:25 PM');

                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter {...props}/>);

                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
                //expect(container.state().toDate).toEqual(new Date('2/4/2021 5:20:25 PM'));
            });

            it('should not update toDate when fromDate is change', () => {
                // Arrange
                const props = {
                    settings: settingsInit
                };
                const fromDate = new Date('1/8/2021 5:20:25 PM');

                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter {...props}/>);

                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('1/8/2021 5:20:25 PM'));
                //expect(container.state().toDate).toEqual(new Date('4/8/2021 10:05:20 AM'));
            });
        });

        describe('handleChangeToDate', () => {
            it('should update toDate', () => {
                // Arrange
                const props = {
                    settings: settingsInit
                };
                const toDate = new Date('4/8/2021 9:05:20 AM');       
                const container = shallow(<Filter {...props}/>);
                // Act
                container.instance().handleChangeToDate(toDate);

                // Assert
                expect(container.state().toDate).toEqual(new Date('4/8/2021 9:05:20 AM'));
            });
        });

        describe('handleSubmit', () => {
            const event = { preventDefault: jest.fn() }; 

            it('should call exactly functions when submit', () => {
                // Arrange
                const props = {
                    settings: settingsInit,
                    gridParams: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParams: jest.fn(),
                    getGridFeedbacks: jest.fn()
                };
                const state = {
                    runningNumber: '',
                    userName: '',
                    isGuest: false,
                    fromDate: new Date('4/8/2021 9:05:20 AM'),
                    toDate: new Date('4/8/2021 9:05:20 AM'),
                    mainCategoryId: 0,
                    subCategoryId: 0,
                    communicationId: 0,
                    statusId: 0,
                    responseId: 0,
                    isReviewed: false,
                    handledBy: '',
                    reviewer: ''
                };
                const expectedParams = {
                    feedbackId: null,
                    userName: '',
                    isGuest: false,
                    fromDate: 'Apr 08, 2021',
                    toDate: 'Apr 08, 2021',
                    mainCategoryId: '',
                    subCategoryId: '',
                    communicationId: '',
                    statusId: '',
                    responseId: '',
                    isReviewed: false,
                    handledBy: '',
                    reviewer: '',
                    pageIndex: 1,
                    pageSize: 100
                };
                
                //Act
                const container = shallow(<Filter {...props} />);
                container.instance().setState(state);
                container.find("Form").simulate("submit", event);

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
                expect(props.getGridFeedbacks).toHaveBeenCalledWith(expectedParams);
            });

            it('should call exactly params when submit', () => {
                // Arrange
                const props = {
                    settings: settingsInit,
                    gridParams: {
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParams: jest.fn(),
                    getGridFeedbacks: jest.fn()
                };
                const state = {
                    runningNumber: '1',
                    userName: '',
                    isGuest: false,
                    fromDate: new Date('4/8/2021 9:05:20 AM'),
                    toDate: new Date('4/8/2021 9:05:20 AM'),
                    mainCategoryId: 0,
                    subCategoryId: 0,
                    communicationId: 1,
                    statusId: 1,
                    responseId: 1,
                    isReviewed: false,
                    handledBy: '',
                    reviewer: ''
                };
                const expectedParams = {
                    feedbackId: 1,
                    userName: '',
                    isGuest: false,
                    fromDate: 'Apr 08, 2021',
                    toDate: 'Apr 08, 2021',
                    mainCategoryId: '',
                    subCategoryId: '',
                    communicationId: 1,
                    statusId: 1,
                    responseId: 1,
                    isReviewed: false,
                    handledBy: '',
                    reviewer: '',
                    pageIndex: 1,
                    pageSize: 100
                };
                
                //Act
                const container = shallow(<Filter {...props} />);
                container.instance().setState(state);
                container.find("Form").simulate("submit", event);

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
            });
        });

        describe('handleChange', () => {
            it('call setState', () => {
                // Arrange
                const props = {
                    settings: settingsInit,
                    getDeletedFeedback: jest.fn()
                };
                
                //Act
                const container = shallow(<Filter {...props}/>);
                container.find('FormControl[name="username"]').at(0).simulate("change", { target: { name: 'username' , value: '123' } });

                // Assert
                expect(container.find('FormControl[name="username"]')).toHaveLength(1);
                expect(container.state().username).toBe('123');
            });

            it('parseInt when type select-one', () => {
                // Arrange
                const props = {
                    settings: settingsInit,
                    getDeletedFeedback: jest.fn()
                };
                
                //Act
                const container = shallow(<Filter {...props}/>);
                container.find('FormControl[name="username"]').at(0).simulate("change", { target: { name: 'username' , value: '123', type:'select-one' }});

                // Assert
                expect(container.find('FormControl[name="username"]')).toHaveLength(1);
                expect(container.state().username).toBe(123);
            });
        });
    });

    describe('render', () => {
        const settingsInit = {
            customerTypes: [{ id: 1, name: 'test' }],
            mainCategories: [{ mainCategoryID : 0 }],
            subCategories: [{ mainCategoryID : 0 }],
            communications: [{ id: 1, name: 'test'}],
            responses: [{ id: 1, name: 'test'}],
            statuses: [{statusId: 1, name: 'test'}]
        };

        it('should return null when settings are null', () => {
            // Arrange
            const props = {
                settings: null
            };
            const container = shallow(<Filter {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });

        it('handleChangeToDate correctly', () => {
            // Arrange
            const props = {
                settings: settingsInit
            };
            const container = shallow(<Filter {...props} />);
            container.instance().handleChangeFromDate = jest.fn();
            // Act
            // Action
            container.find(DatePicker).at(0).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChangeToDate correctly', () => {
            // Arrange
            const props = {
                settings: settingsInit
            };
            const container = shallow(<Filter {...props} />);
            container.instance().handleChangeToDate = jest.fn();
            // Act
            // Action
            container.find(DatePicker).at(1).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});