import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { mount, shallow } from 'enzyme';
import ExcelIcon from '@jsroot/components/ExcelIcon';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        customerReport: {
            customerList: [
                {
                    headline: 1, checker: 'test', position: 1,
                    status: 'closed', username: 'name', firstName: 'vu',
                    lastName: 'otis', phone1: '123', phone2: '123',
                    phone3: '123', mobile: '456', fax: '', email: '',
                    skype: '', msn: '', whatsApp: '', line: '',
                    weChat: '', yahoo: '', bbm: '', qq: '',
                    language: '', isVIP: true, pic1: '', pic2: '',
                    pic3: '', pic4: '', birthDay: '4/27/2022',
                    passport: '', siteName: '', countryName: ''
                }
            ]
        },
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        }
    };

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
                ...initProps,
                customerReport: { customerList: [] }             
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center no-data' colSpan={31}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('renderRow', () => {
        it('should render expected row', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<DataGrid {...props}/>).instance();

            // Act
            const row = shallow(container.renderRow(props.customerReport.customerList, 1));

            //Assert
            expect(row.find(Cell).length).toBe(31);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                exportExcel: jest.fn()
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            container.instance().handleExportExcel();

            // Assert
            expect(props.exportExcel).toHaveBeenCalled();
        });
    });

    describe('onPaging', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParams: jest.fn(),
                getCustomerReport: jest.fn()
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            container.instance().onPaging(1, 100);

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getCustomerReport).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render null', () => {
            // Arrange
            const props = {
                ...initProps,
                customerReport: null
            };
            const container = shallow(<DataGrid {...props}/>);

            // Act
            container.instance().render();

            // Assert
            expect(container.type()).toBe(null);
        });

        it('should render ExcelIcon correctly', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<DataGrid {...props} />);
            const form = mount(container.instance().render());

            // Assert
            expect(form.find('ExcelIcon').length).toBe(1);
        });
    });
});