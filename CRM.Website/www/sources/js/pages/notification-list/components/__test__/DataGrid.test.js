import React from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES } from '@jsroot/common/constants';
import functions, { handleNewResendOptions } from '../../functions';
import AutoRefresh from '../AutoRefresh';
import toJson from 'enzyme-to-json';

describe('DataGrid', () => {
    LangHelper.getResource = jest.fn(value => value);

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            gridParams: {},
            notificationListGridData: {},
            resendOptions: {}
        };
        
        const store = mockStore(initialState);

        // Action
        const wrapper = shallow(<DataGridWrapper store={store} />);

        // Assert
        it('component renders correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
            expect(wrapper.props().children.props.notificationListGridData).toEqual(initialState.notificationListGridData);
            expect(wrapper.props().children.props.resendOptions).toEqual(initialState.resendOptions);
        });
    });
    
    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    function testGridDataNull(gridData) {
        it('renders null when gridData empty', () => {
            // Arrange
            const props = {
                gridParams: {},
                gridData: gridData,
                resendOptions: {}
            };
    
            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid).toBeNull;
        });
    }

    testGridDataNull();
    testGridDataNull(null);
    testGridDataNull({});
    testGridDataNull({ data: [] });

    describe('renders correctly child component', () => {
        it('has correct first div', () => {
            // Arrange
            const props = {
                gridParams: {},
                notificationListGridData: {
                    data: [
                        {
                            notificationId: 1,
                            status: 'Error'
                        }
                    ]
                },
                resendOptions: {}
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find('div').first().props().className).toEqual('d-flex table-title-v2 justify-content-between align-items-center');
        });

        it('has correct second div', () => {
            // Arrange
            const props = {
                gridParams: {},
                notificationListGridData: {
                    data: [
                        {
                            notificationId: 1,
                            status: 'Error'
                        }
                    ]
                },
                resendOptions: {}
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find('div').at(1).html()).toBe('<div>NotificationList</div>');
        });

        it('has correct AutoRefresh', () => {
            // Arrange
            const props = {
                gridParams: {},
                notificationListGridData: {
                    data: [
                        {
                            notificationId: 1,
                            status: 'Error'
                        }
                    ]
                },
                resendOptions: {}
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find(AutoRefresh).length).toBe(1);
        });

        it('contains Table having correct props', () => {
            // Arrange
            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                notificationListGridData: {
                    totalItems: 100,
                    data: [
                        {
                            notificationId: 1,
                            status: 'Error'
                        }
                    ]
                },
                resendOptions: {
                    shouldResetScrollPosition: true
                }
            };

            const pagingOption = {
                PageIndex: props.gridParams.pageIndex,
                PageSize: props.gridParams.pageSize,
                TotalItem: props.notificationListGridData.totalItems,
                PageList: PAGING_SIZES
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find(Table).props().minWidth).toBe(960);
            expect(dataGrid.find(Table).props().autoWidth).toBeTrue;
            expect(dataGrid.find(Table).props().isPaging).toBeTrue;
            expect(dataGrid.find(Table).props().pageOption).toEqual(pagingOption);
            expect(dataGrid.find(Table).props().containerPadding).toEqual(0);
            expect(dataGrid.find(Table).props().shouldResetScrollPosition).toEqual(props.resendOptions.shouldResetScrollPosition);
        });
    });

    describe('function component runs correctly', () => {
        it('runs onPaging', () => {
            // Arrange
            const expectedPageIndex = 1;
            const expectedPageSize = 100;
            const props = {
                gridParams: {},
                notificationListGridData: {
                    data: [
                        {
                            notificationId: 1,
                            status: 'Error'
                        }
                    ]
                },
                resendOptions: {},
                setGridParams: jest.fn(),
                getGridData: jest.fn((params, callback) => callback([])),
                setResendOptions: jest.fn()
            };

            const expectedParams = {
                pageIndex: expectedPageIndex,
                pageSize: expectedPageSize
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            functions.handleNewResendOptions = jest.fn(data => handleNewResendOptions(data, props.setResendOptions));

            // Action
            dataGrid.find(Table).props().onPaging(expectedPageIndex, expectedPageSize);
            
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
            expect(props.getGridData).toHaveBeenCalled();
            expect(props.setResendOptions).toHaveBeenCalled();
        });

        describe('buildNotificationListHeader', () => {
            it('renders regular header', () => {
                // Arrange
                const props = {
                    gridParams: {},
                    notificationListGridData: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);
    
                // Action
                const header = shallow(dataGrid.instance().buildNotificationListHeader());
                
                // Assert
                expect(header.find(HeaderCell).at(0).props().colWidth).toBe(6);
                expect(header.find(HeaderCell).at(0).html()).toContain('SymbolNo');
                expect(header.find(HeaderCell).at(1).props().colWidth).toBe(16);
                expect(header.find(HeaderCell).at(1).find('div').at(0).html()).toContain('NotificationID');
                expect(header.find(HeaderCell).at(1).find('div').at(1).html()).toContain('ReferenceId');
                expect(header.find(HeaderCell).at(2).props().colWidth).toBe(23);
                expect(header.find(HeaderCell).at(2).html()).toContain('Sender');
                expect(header.find(HeaderCell).at(2).html()).toContain('NotificationType');
                expect(header.find(HeaderCell).at(3).props().colWidth).toBe(17);
                expect(header.find(HeaderCell).at(3).html()).toContain('SendDateTimeGMTA8');
                expect(header.find(HeaderCell).at(4).props().colWidth).toBe(12);
                expect(header.find(HeaderCell).at(4).html()).toContain('BotService');
                expect(header.find(HeaderCell).at(5).props().colWidth).toBe(14);
                expect(header.find(HeaderCell).at(5).html()).toContain('DisplayName');
                expect(header.find(HeaderCell).at(6).props().colWidth).toBe(17);
                expect(header.find(HeaderCell).at(6).html()).toContain('GroupHeadline');
            });

            it('has action column', () => {
                // Arrange
                const props = {
                    gridParams: {},
                    notificationListGridData: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);
    
                // Action
                const header = shallow(dataGrid.instance().buildNotificationListHeader(true));
                
                // Assert
                expect(header.find(HeaderCell).at(9).props().colWidth).toBe(12);
                expect(header.find(HeaderCell).at(9).html()).toContain('Status');
            });
            
            it('has resend column', () => {
                // Arrange
                const props = {
                    gridParams: {},
                    notificationListGridData: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);
    
                // Action
                const header = shallow(dataGrid.instance().buildNotificationListHeader(true));
                
                // Assert
                expect(header.find(HeaderCell).at(10).props().colWidth).toBe(13);
            });
        });

        describe('buildNotificationListBody', () => {
            function testBuildNotificationListBodyNoData(isHost, colSpan) {
                it('buildNotificationListBody nodata', () => {
                    // Arrange
                    const props = {
                        gridParams: {},
                        notificationListGridData: {
                            data: []
                        },
                        resendOptions: {}
                    };
        
                    const dataGrid = shallow(<DataGrid {...props} />);
                    const expectedBody = [<Row key={`body${1}`} className='no-data' ><Cell colSpan={colSpan}>{'ThereIsNoData'}</Cell></Row>];
        
                    // Action
                    const body = dataGrid.instance().buildNotificationListBody(isHost);
                    
                    // Assert
                    expect(body).toEqual(expectedBody);
                });
            }

            testBuildNotificationListBodyNoData(true, 11);
            testBuildNotificationListBodyNoData(false, 9);

            function renderRow(item, index, isHost) {
                return <div key={index}>{isHost? item.notificationId : item.status}</div>;
            }

            function testBuildNotificationListBodyHasData(isHost) {
                it('buildNotificationListBody has data', () => {
                    // Arrange
                    const props = {
                        gridParams: {
                            pageIndex: 1,
                            pageSize: 100
                        },
                        notificationListGridData: {
                            data: [
                                {
                                    notificationId: 1,
                                    status: 'Error'
                                }
                            ]
                        },
                        resendOptions: {}
                    };
                    const startIndex = (props.pageIndex - 1) * props.pageSize + 1;
        
                    const dataGrid = shallow(<DataGrid {...props} />);
                    dataGrid.instance().renderRow = jest.fn(renderRow);
                    const expectedBody = props.notificationListGridData.data.map((item, index) => renderRow(item, index, isHost));
        
                    // Action
                    const body = dataGrid.instance().buildNotificationListBody(isHost);
                    
                    // Assert
                    expect(body).toEqual(expectedBody);
                });
            }

            testBuildNotificationListBodyHasData(true);
            testBuildNotificationListBodyHasData(false);
        });

        it('openContentPopup runs correctly', () => {
            // Arrange
            const item = { status: 'Error' };
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {},
                setContentPopup: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().setIsRefresh = jest.fn();

            // Action
            dataGrid.instance().openContentPopup(item);

            // Assert
            expect(props.setContentPopup).toHaveBeenCalledWith({
                show: true,
                data: item
            });
            expect(dataGrid.instance().setIsRefresh).toHaveBeenCalledWith(false);
        });

        it('openViewDetailPopup runs correctly', () => {
            // Arrange
            const item = { status: 'Error' };
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {},
                setViewDetailPopup: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().setIsRefresh = jest.fn();

            // Action
            dataGrid.instance().openViewDetailPopup(item);

            // Assert
            expect(props.setViewDetailPopup).toHaveBeenCalledWith({
                show: true,
                data: item
            });
            expect(dataGrid.instance().setIsRefresh).toHaveBeenCalled();
        });

        it('setIsRefresh runs correctly', () => {
            // Arrange
            const param = true;
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {},
                setIsRefresh: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().setNotShouldResetScrollPosition = jest.fn();

            // Action
            dataGrid.instance().setIsRefresh(param);

            // Assert
            expect(dataGrid.instance().setNotShouldResetScrollPosition).toHaveBeenCalled();
            expect(props.setIsRefresh).toHaveBeenCalledWith(param);
        });

        it('setNotShouldResetScrollPosition runs correctly', () => {
            // Arrange
            const param = true;
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {},
                setResendOptions: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            dataGrid.instance().setNotShouldResetScrollPosition(param);

            // Assert
            expect(props.setResendOptions).toHaveBeenCalledWith({
                ...props.resendOptions,
                shouldResetScrollPosition: false
            });
        });

        describe('isError', () => {
            it('isError returns true', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isError('Error');

                expect(result).toBeTrue;
            });

            it('isError returns false', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isError('string not equal "Error"');

                expect(result).toBeFalse;
            });
        });

        describe('isDuplicated', () => {
            it('isDuplicated returns true', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isDuplicated('Duplicated');

                expect(result).toBeTrue;
            });

            it('isDuplicated returns false', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isDuplicated('string not equal "Duplicated"');

                expect(result).toBeFalse;
            });
        });

        describe('isResolved', () => {
            it('isResolved returns true', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isResolved('Resolved');

                expect(result).toBeTrue;
            });

            it('isResolved returns false', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isResolved('string not equal "Resolved"');

                expect(result).toBeFalse;
            });
        });

        describe('isDuplicated', () => {
            it('isDuplicated returns true', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isDuplicated('Duplicated');

                expect(result).toBeTrue;
            });

            it('isDuplicated returns false', () => {
                // Arrange
                const props = {
                    notificationListGridData: {},
                    gridParams: {},
                    resendOptions: {}
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);

                // Action
                const result = dataGrid.instance().isDuplicated('string not equal "Duplicated"');

                // Assert
                expect(result).toBeFalse;
            });
        });

        it('validateResend runs correctly', () => {
            // Arrange
            const notificationId = 1;
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {},
                validateResend: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().setIsRefresh = jest.fn();

            // Action
            dataGrid.instance().validateResend(notificationId);

            // Assert
            expect(props.validateResend).toHaveBeenCalledWith({
                notificationIds: notificationId,
                isSingle: true
            });
            expect(dataGrid.instance().setIsRefresh).toHaveBeenCalledWith(false);
        });

        describe('renderRow', () => {
            it('renders regular Row', () => {
                // Arrange
                const headlines = 'headlines';
                const recipients = 'recipients';
                const item = {
                    notificationId: 'notificationId',
                    dataSource: 'LogId',
                    referenceId: '1',
                    sender: 'sender',
                    notificationTypeName: 'notificationTypeName',
                    sendDateString: 'sendDateString',
                    sendTimeString: 'sendTimeString',
                    BotService: 'BotService',
                    headlines: [ 1 ],
                    recipients: [ 1 ],
                    title: 'title',
                    status: 'status',
                    referenceIdList: '1,2'
                };

                const index = 1;
                const startIndex = 1;
                const props = {
                    gridParams: {},
                    notificationListGridData: {},
                    resendOptions: {
                        dataList: []
                    }
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);
                dataGrid.instance().startIndex = startIndex;
                functions.getHeadlines = jest.fn(() => headlines);
                functions.getRecipients = jest.fn(() => recipients);

                // Action
                const row = shallow(dataGrid.instance().renderRow(item, index, false));

                // Assert
                expect(row.find(Cell).at(0).props().className).toBe('text-center');
                expect(row.find(Cell).at(0).html()).toContain(index + startIndex);
                expect(row.find(Cell).at(1).props().className).toBe('text-center');
                expect(row.find(Cell).at(1).find('div').at(0).html()).toEqual(`<div>${item.notificationId}</div>`);
                expect(row.find(Cell).at(1).find('div').at(1).html()).toEqual(`<div>(Log: 1, 2)</div>`);
                expect(row.find(Cell).at(2).find('div').at(0).html()).toEqual(`<div>${item.sender}</div>`);
                expect(row.find(Cell).at(2).find('div').at(1).html()).toEqual(`<div>${item.notificationTypeName}</div>`);
                expect(row.find(Cell).at(3).props().className).toBe('text-center');
                expect(row.find(Cell).at(3).find('div').at(0).html()).toEqual(`<div>${item.sendDateString}</div>`);
                expect(row.find(Cell).at(3).find('div').at(1).html()).toEqual(`<div>${item.sendTimeString}</div>`);
                expect(row.find(Cell).at(5).html()).toContain('<td></td>');
                expect(row.find(Cell).at(6).html()).toContain('<td class=\"text-center\">headlines</td>');
                expect(row.find(Cell).at(7).html()).toContain("<td>recipients</td>");
            });
            
            it('has Cell 1 has related div when item status is duplicate', () => {
                // Arrange
                const item = {
                    status: 'Duplicate',
                    relatedNotificationIds: '1, 2, 3'
                };

                const index = 1;
                const props = {
                    gridParams: {},
                    notificationListGridData: {},
                    resendOptions: {
                        dataList: []
                    }
                };
    
                const dataGrid = shallow(<DataGrid {...props} />);
                dataGrid.instance().isDuplicated = jest.fn(() => true);

                // Action
                const row = shallow(dataGrid.instance().renderRow(item, index, false));

                // Assert
                expect(row.find(Cell).at(1).find('div').at(2).html()).toEqual(`<div>(Related ID: ${item.relatedNotificationIds})</div>`);
            });
        });

        it('handleChangeResendCheckbox runs correctly', () => {
            // Arrange
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {
                    dataList: [
                        {
                            status: 'value'
                        }
                    ]
                },
                setResendOptions: jest.fn(),
                setIsRefresh: jest.fn()
            };

            const dataList = [...props.resendOptions.dataList];
            dataList[0].isResent = true;
            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().isError = jest.fn(() => false);

            // Action
            dataGrid.instance().handleChangeResendCheckbox(0);

            // Assert
            expect(props.setResendOptions).toHaveBeenCalledWith({
                isCheckedAll: true,
                isDisabledResend: true,
                isHaveResendAll: props.resendOptions.isHaveResendAll,
                shouldResetScrollPosition: false,
                dataList
            });
        });

        it('handleChangeResendAllCheckbox runs correctly', () => {
            // Arrange
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {
                    isCheckedAll: false,
                    isHaveResendAll: true,
                    dataList: [
                        {
                            status: 'value'
                        }
                    ]
                },
                setResendOptions: jest.fn(),
                setIsRefresh: jest.fn()
            };

            const dataList = [...props.resendOptions.dataList];
            dataList[0].isResent = true;
            const dataGrid = shallow(<DataGrid {...props} />);

            // Action
            dataGrid.instance().handleChangeResendAllCheckbox(0);

            // Assert
            expect(props.setResendOptions).toHaveBeenCalledWith({
                isCheckedAll: true,
                isDisabledResend: false,
                isHaveResendAll: props.resendOptions.isHaveResendAll,
                shouldResetScrollPosition: false,
                dataList
            });
        });

        it('resendNotificationAll run correctly', () => {
            // Arrange
            const props = {
                notificationListGridData: {},
                gridParams: {},
                resendOptions: {
                    isCheckedAll: false,
                    isHaveResendAll: true,
                    dataList: [
                        {
                            status: 'value',
                            isResent: true
                        }
                    ]
                },
                validateResend: jest.fn()
            };

            const dataGrid = shallow(<DataGrid {...props} />);
            dataGrid.instance().isError = jest.fn(() => true);

            // Action
            dataGrid.instance().resendNotificationAll();

            // Assert
            expect(props.validateResend).toHaveBeenCalledWith({
                notificationIds: props.resendOptions.dataList.map(item => item.notificationId).join(','),
                isSingle: false
            });
        });
    });
});