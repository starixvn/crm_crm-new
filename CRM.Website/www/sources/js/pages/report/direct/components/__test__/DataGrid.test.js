import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(31);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: { totalCustomer: 1, customerList: [] },
                gridParams: {
                    headline: null,
                    username: null,
                    excludeIgnoredAcc: true,
                    pageIndex: 1,
                    pageSize: 100
                }
            };
            const expectedBody = [<Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={31}>{'ThereIsNoData'}</Cell>
            </Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody(props.gridData.customerList);

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {
                gridData: {
                    customerList: [
                        {
                            bBM: "---",
                            checker: null,
                            countryName: null,
                            currency: "HK$",
                            email: "---",
                            FirstName: "---",
                            headline: null,
                            introducedBy: null,
                            language_name: "English",
                            lastName: "---",
                            line: "---",
                            mSN: "---",
                            mobilePhone: "-----",
                            pIC1: "-------",
                            pIC2: "-------",
                            pIC3: "-------",
                            pIC4: "-------",
                            phone: "-----",
                            phone2: "-----",
                            phone3: "-----",
                            position: "Member",
                            qQ: "---",
                            site: "BEST-ODDS",
                            skype: "---",
                            status: "Closed",
                            username: "0000HK",
                            isVIP: true,
                            weChat: "---",
                            whatsApp: "---",
                            yahoo: null
                        }
                    ],
                    totalCustomer: 1
                },
                gridParams: {
                    headline: null,
                    username: null,
                    excludeIgnoredAcc: true,
                    pageIndex: 1,
                    pageSize: 100
                }
            };

            const expected = <Row>
                <Cell className="text-center height-row" />
                <Cell className="text-center">not assign group</Cell>
                <Cell className="text-center">0000HK</Cell>
                <Cell className="text-center">Closed</Cell>
                <Cell className="text-center">BEST-ODDS</Cell>
                <Cell className="text-center">HK$</Cell>
                <Cell className="text-center">Member</Cell>
                <Cell className="text-center" />
                <Cell className="text-center">English</Cell>
                <Cell className="text-center" />
                <Cell className="text-center" />
                <Cell className="text-center"><i aria-hidden="true" class="fa fa-check icon-check" /></Cell>
                <Cell className="text-center" />
                <Cell className="text-center">---</Cell>
                <Cell className="text-center">-----</Cell>
                <Cell className="text-center">-----</Cell>
                <Cell className="text-center">-----</Cell>
                <Cell className="text-center" />
                <Cell className="text-center" />
                <Cell className="text-center" />
                <Cell className="text-center" />
                <Cell className="text-center">-----</Cell>
                <Cell className="text-center">---</Cell>
                <Cell className="text-center">---</Cell>
                <Cell className="text-center" />
                <Cell className="text-center">---</Cell>
                <Cell className="text-center">---</Cell>
                <Cell className="text-center">---</Cell>
                <Cell className="text-center" />
                <Cell className="text-center" />
                <Cell className="text-center" />
            </Row>;


            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody(props.gridData.customerList);

            // Assert
            expect(actual.Cell).toEqual(expected.Cell);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                gridParams: {
                    headline: null,
                    username: null,
                    excludeIgnoredAcc: true
                },
                exportExcel: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleExportExcel();

            // Assert
            expect(props.exportExcel).toHaveBeenCalledWith({ headline: null, username: null, excludeIgnoredAcc: true });
        });
        
        it('click export excel call exact function', () => {
            // Arrange
            const props = {
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            }
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleExportExcel = jest.fn();
            // Act
            const row = shallow(container.instance().renderCustomButtonReport());
            row.find('span').at(0).simulate('click');
            // Assert
            expect(container.instance().handleExportExcel).toHaveBeenCalled();
        });
    });

    describe('onPagingDirect', () => {
        it('should call exactly functions when on Paging Direct ', () => {
            // Arrange
            const props = {
                setGridParams: jest.fn(),
                getGridData: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPagingDirect(1, 200);

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });
    });
});