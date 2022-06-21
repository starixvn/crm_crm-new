import React from 'react';
import { DataGrid } from '../DataGrid';
import { shallow } from 'enzyme';
import { Table, Row, Cell, HeaderCell, HeaderRow } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
    const gridParams = {
        pageIndex: 1,
        pageSize: 3
    };
    const childReport = {
        id: 100,
        name: "Italy",
        numberOfIssues: 2
    };
    const gridData = {
        name: 'Settlement Issues Report',
        totalChildReports: 2,
        childReports: [
            {
                name: "Sep",
                childReports: [childReport]
            },
            {
                name: "Nov",
                childReports: [childReport, { ...childReport, id: 0, name: "N/A" }]
            }
        ],
        total: {
            name: "Grand Total",
            numberOfIssues: 6,
            totalChildReports: 2,
            childReports: [
                {
                    ...childReport, numberOfIssues: 4
                },
                {
                    ...childReport,
                    id: 0,
                    name: "N/A"
                }
            ]
        }
    };

    it('render dataGrid component', () => {
        // Arrange
        const props = {
            gridParams,
            gridData
        };

        // Act
        const container = shallow(<DataGrid {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('render null', () => {
        // Arrange
        const container = shallow(<DataGrid />);

        // Act
        const render = container.instance().render();

        // Assert
        expect(render).toBeNull();
    });

    it('build header', () => {
        // Arrange
        const expectedHeader = <HeaderRow>
            <HeaderCell colWidth={10}>Month</HeaderCell>
            <HeaderCell colWidth={15}>Country</HeaderCell>
            <HeaderCell colWidth={15}>Amount</HeaderCell>
            <HeaderCell colWidth={15}>Total</HeaderCell>
        </HeaderRow>;
        const props = {
            gridParams,
            gridData
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        const header = container.instance().buildHeader();

        // Assert
        expect(header).toEqual(expectedHeader);
    });

    it('build body', () => {
        // Arrange
        const props = {
            gridParams,
            gridData
        };
        const container = shallow(<DataGrid {...props} />);
        container.instance().renderRow = jest.fn();
        container.instance().renderLastRow = jest.fn();

        // Act
        container.instance().buildBody();

        // Assert
        expect(container.instance().renderRow).toHaveBeenCalledTimes(2);
        expect(container.instance().renderLastRow).toHaveBeenCalledWith({ ...props.gridData.total });
    });

    it('render row', () => {
        // Arrange
        const expectedRow = [
            <Row key={100}>
                <Cell className="text-center" rowSpan={2}>Nov</Cell>
                <Cell>Italy</Cell>
                <Cell className="text-right">{2}</Cell>
                <Cell className="text-center" rowSpan={2} />
            </Row>,
            <Row key={"N/A"}>
                <Cell>N/A</Cell>
                <Cell className="text-right">{2}</Cell>
            </Row>
        ];
        const props = {
            gridParams,
            gridData
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        const row = container.instance().renderRow({
            name: "Nov",
            childReports: [childReport, { ...childReport, id: 0, name: "N/A" }]
        });

        // Assert
        expect(row).toEqual(expectedRow);
    });

    it('render last row', () => {
        // Arrange
        const expectedLastRow = [
            <Row className="last-row" key={100}>
                <Cell className="text-center" rowSpan={2}>Grand Total</Cell>
                <Cell>Italy</Cell>
                <Cell className="text-right">{4}</Cell>
                <Cell className="text-center" rowSpan={2}>{6}</Cell>
            </Row>,
            <Row className="last-row" key={0}>
                <Cell>N/A</Cell>
                <Cell className="text-right">{2}</Cell>
            </Row>
        ];
        const props = {
            gridParams,
            gridData
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        const lastRow = container.instance().renderLastRow({ ...gridData.total });

        // Assert
        expect(lastRow).toEqual(expectedLastRow);
    });

    it('build body no data', () => {
        // Arrange
        const expectedBody = [<Row key={'body'} className="no-data"><Cell colSpan="4">ThereIsNoData</Cell></Row>];
        const props = {
            gridParams,
            gridData: { ...gridData, childReports: [], totalChildReports: 0 }
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        const body = container.instance().buildBody();

        // Assert
        expect(body).toEqual(expectedBody);
    });

    it('should show chart popup when click chart button', () => {
        // Arrange
        const props = {
            gridParams,
            gridData,
            setChartPopup: jest.fn()
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        container.find('.tool-box span.btn-chart').simulate('click');

        // Assert
        expect(props.setChartPopup).toHaveBeenCalledWith({ show: true });
    });

    it('should open new window to download excel when click export button', () => {
        // Arrange
        const props = {
            gridParams,
            gridData,
            exportExcel: jest.fn()
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        container.find('.tool-box span.icon-excel').simulate('click');

        // Assert
        expect(props.exportExcel).toHaveBeenCalledWith(gridParams);
    });

    it('onPaging', () => {
        // Arrange
        const props = {
            gridParams,
            gridData,
            setGridParams: jest.fn(),
            getGridData: jest.fn()
        };
        const container = shallow(<DataGrid {...props} />);

        // Act
        container.find(Table).props().onPaging(2, 3);

        // Assert
        expect(props.setGridParams).toHaveBeenCalledWith({ ...gridParams, pageIndex: 2, pageSize: 3 });
        expect(props.getGridData).toHaveBeenCalledWith({ ...gridParams, pageIndex: 2, pageSize: 3 });
    });
});