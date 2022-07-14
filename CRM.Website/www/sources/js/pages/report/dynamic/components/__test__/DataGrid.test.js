import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow, mount } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });
    
    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    const initProps = {
        dynamicReports: {
            data: {
                childReports: [
                    {
                        feedbackId: null ,
                        childReports: [{ feedbackId: 1, duration: '0: 1: 0',dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }] }] 
                    }
                ],
                totalChildReports: 2
            },
            mainCategories: [{ settingId: 0, settingValue: "test", childSettings: [{subCategoryId: 0, name: "All"}]}]
        },
        gridParams: { pageIndex: 1, pageSize: 100, fromDate: '1/1/2022', toDate: '12/31/2022' } 
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(10);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                dynamicReports: { data: { childReports: [] } }             
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={10}>ThereIsNoData</Cell></Row>];
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
            container.renderGroupRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('renderGroupRow', () => {
        it('should render exactly function', () => {
            // Arrange
            const props = {...initProps};
            const data = {
                childReports: [{ feedbackId: 1, duration: '0: 1: 0',dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }] }]
            };
            const keyToggle = 1;

            const container = mount(<DataGrid {...props}/>);
            container.instance().handleToggleEach = jest.fn();
            container.instance().renderRow = jest.fn();
        
            // Act
            const actual = mount(container.instance().renderGroupRow(data, keyToggle));
            actual.find(Cell).at(0).simulate('click');

            // Assert
            expect(container.instance().handleToggleEach).toHaveBeenCalledWith(NaN);
            expect(container.instance().renderRow).toHaveBeenCalled();
        });

        it('should render exactly className of span when have toggle', () => {
            // Arrange
            const props = {...initProps};
            const data = {
                childReports: [{ feedbackId: 1, duration: '0: 1: 0',dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }] }]
            };
            const keyToggle = 1;

            const container = mount(<DataGrid {...props}/>);
            container.instance().setState({ toggles: [1] });
        
            // Act
            const actual = mount(container.instance().renderGroupRow(data, keyToggle));

            // Assert
            expect(actual.find('span').at(0).props().className).toEqual('pr-2 fa fa-caret-down');
        });

        it('should render exactly className of span when no have toggle', () => {
            // Arrange
            const props = {...initProps};
            const data = {
                childReports: [{ feedbackId: 1, duration: '0: 1: 0',dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }] }]
            };
            const keyToggle = 1;

            const container = mount(<DataGrid {...props}/>);
            container.instance().setState({ toggles: [0,2,3] });
        
            // Act
            const actual = mount(container.instance().renderGroupRow(data, keyToggle));

            // Assert
            expect(actual.find('span').at(0).props().className).toEqual('pr-2 fa fa-caret-down');
        });
    });

    describe('renderRow', () => {
        it('should return null when toggles include key', () => {
            // Arrange
            const props = {...initProps};
            const item = {
                feedbackId: 1234, duration: '0: 1: 0', dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }]
            }
            const container = shallow(<DataGrid {...props}/>);
            container.instance().setState({ toggles: [1,2] })
            
            // Act
            const actual = container.instance().renderRow(item, 1, 1);

            // Assert
            expect(actual).toEqual(null);
        });

        it('should call handleViewCommunication when click FeedbackId', () => {
            // Arrange
            const props = {...initProps};
            const item = {
                feedbackId: 1234, duration: '0: 1: 0', dynamicSettings: [{ mainCategoryId: 0, subCategoryId : 0 }]
            }
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleViewCommunication = jest.fn();

            const row = shallow(container.renderRow(item, 1, 1));

            // Act
            row.find(Cell).at(1).props().onClick();

            // Assert
            expect(container.handleViewCommunication).toHaveBeenCalledWith(1234);
        });
    });

    describe('handleViewCommunication', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setViewCommunicationDialog: jest.fn()
            };
            const param = 1;
            const container = shallow(<DataGrid {...props}/>);

            // Act
            container.instance().handleViewCommunication(param);

            // Assert
            expect(props.setViewCommunicationDialog).toHaveBeenCalledWith({feedbackId: 1, show: true});
        });
    });

    describe('handleToggleEach', () => {
        it('should setState exactly when have key', () => {
            // Arrange
            const props = {...initProps};
            const param = 1;

            const container = shallow(<DataGrid {...props}/>);
            container.instance().setState({ toggles: [1,2,3] });

            // Act
            container.instance().handleToggleEach(param);

            // Assert
            expect(container.state().toggles).toEqual([2,3]);
        });

        it('should setState exactly when no have key', () => {
            // Arrange
            const props = {...initProps};
            const param = 4;

            const container = shallow(<DataGrid {...props}/>);
            container.instance().setState({ toggles: [1,2,3] });

            // Act
            container.instance().handleToggleEach(param);

            // Assert
            expect(container.state().toggles).toEqual([1,2,3,4]);
        });
    });

    describe('handleToggleAll', () => {
        it('should setState exactly when isExpand false', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<DataGrid {...props}/>);
            container.instance().setState({ isExpand: false });

            // Act
            container.instance().handleToggleAll();

            // Assert
            expect(container.state()).toEqual({shouldResetScrollPosition: true, toggles: [1], isExpand: true });
        });

        it('should setState exactly when isExpand true', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<DataGrid {...props}/>);
            container.instance().setState({ isExpand: true });

            // Act
            container.instance().handleToggleAll();

            // Assert
            expect(container.state()).toEqual({ toggles: [], isExpand: false, shouldResetScrollPosition: true });
        });
    });

    describe('handleGroupCategory', () => {
        it('should return expect array', () => {
            // Arrange
            const params = [
                { mainCategoryId: 3024, subCategoryId: 4069 },
                { mainCategoryId: 3024, subCategoryId: 4070 },
                { mainCategoryId: 3025, subCategoryId: 4080 },
                { mainCategoryId: 3024, subCategoryId: 4071 }
            ];
            const expectValue = [
                { mainCategoryId: 3024, subCategoryId: [ 4069, 4070, 4071 ] },
                { mainCategoryId: 3025, subCategoryId: [ 4080 ] }
            ];
            // Act
            const container = shallow(<DataGrid />);
            const received = container.instance().handleGroupCategory(params);

            // Assert
            expect(received).toEqual(expectValue);
        });
    });

    describe('renderCategoryColumn', () => {
        it('should return expected result', () => {
            // Arrange
            const props = {...initProps};
            const param = [{ mainCategoryId: 0, subCategoryId : 0 }];

            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleGroupCategory = jest.fn(() => [{ mainCategoryId: 0, subCategoryId: [0] }]);

            // Act
            const actual = container.instance().renderCategoryColumn(param);

            // Assert
           // expect(actual[0]).toEqual(<React.Fragment><div className="font-weight-bold">test</div><div className="font-italic ml-3">All</div></React.Fragment>);
        });
    });

    describe('renderToolBox', () => {
        it('click view chart call exact function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleViewChart = jest.fn();
            // Act
            const row = shallow(container.instance().renderToolBox());
            row.find('span').at(0).simulate('click');
            // Assert
            expect(container.instance().handleViewChart).toHaveBeenCalled();
        });

        it('click collapse call exact function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleToggleAll = jest.fn();
            // Act
            const row = shallow(container.instance().renderToolBox());
            row.find('span').at(1).simulate('click');
            // Assert
            expect(container.instance().handleToggleAll).toHaveBeenCalled();
        });

        it('should render className collapse exactly when isExpand true', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />);
            container.instance().setState({isExpand: true});
            // Act
            const row = shallow(container.instance().renderToolBox());
            // Assert
            expect(row.find('span').at(1).props().className).toEqual('fa fa-compress pl-3 icon');
        });

        it('should render className collapse exactly when isExpand false', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />);
            container.instance().setState({isExpand: false});
            // Act
            const row = shallow(container.instance().renderToolBox());
            // Assert
            expect(row.find('span').at(1).props().className).toEqual('fa fa-expand pl-3 icon');
        });

        it('click collapse call exact function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleToggleAll = jest.fn();
            // Act
            const row = shallow(container.instance().renderToolBox());
            row.find('span').at(1).simulate('click');
            // Assert
            expect(container.instance().handleToggleAll).toHaveBeenCalled();
        });

        it('click export excel call exact function', () => {
            // Arrange
            const props = {
                ...initProps,
                exportExcel: jest.fn()
            }
            const container = shallow(<DataGrid {...props} />);
            container.instance().handleExportExcel = jest.fn();
            // Act
            const row = shallow(container.instance().renderToolBox());
            row.find('span').at(2).simulate('click');
            // Assert
            expect(container.instance().handleExportExcel).toHaveBeenCalled();
        });
    });

    describe('renderGenerateTitle', () => {
        it('should return exactly result when reportType is 1', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { ...initProps.gridParams, reportType: 1 }
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            const actual = container.instance().renderGenerateTitle();

            // Assert
            expect(actual).toEqual(<span>Daily Communication Logs From 1/1/2022 To 12/31/2022 [2]</span>);
        });

        it('should return exactly result when reportType is 2', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { ...initProps.gridParams, reportType: 2 }
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            const actual = container.instance().renderGenerateTitle();

            // Assert
            expect(actual).toEqual(<span>Weekly Communication Logs From 1/1/2022 To 12/31/2022 [2]</span>);
        });

        it('should return exactly result when reportType is 3', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { ...initProps.gridParams, reportType: 3 }
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            const actual = container.instance().renderGenerateTitle();

            // Assert
            expect(actual).toEqual(<span>Monthly Communication Logs From 1/1/2022 To 12/31/2022 [2]</span>);
        });

        it('should return exactly result when reportType is 4', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: { ...initProps.gridParams, reportType: 4 }
            };

            const container = shallow(<DataGrid {...props}/>);

            // Act
            const actual = container.instance().renderGenerateTitle();

            // Assert
            expect(actual).toEqual(<span>Yearly Communication Logs From 1/1/2022 To 12/31/2022 [2]</span>);
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

    describe('handleViewChart', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setViewChartDialog: jest.fn()
            };

            const container = shallow(<DataGrid {...props}/>);
            
            // Act
            container.instance().handleViewChart();

            // Assert
            expect(props.setViewChartDialog).toHaveBeenCalled();
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                gridParams: { pageIndex: 1, pageSize: 100 },
                setGridParams: jest.fn(),
                getDynamicReports: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />);

            // Act
            container.instance().onPaging(1, 100);

            // Assert
            expect(container.state()).toEqual({ toggles: [], isExpand: true, shouldResetScrollPosition: true });
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getDynamicReports).toHaveBeenCalledWith({ pageIndex: 0, pageSize: 100 });
        });
    });

    describe('render', () => {
        it('should return null when dynamicReports is null', () => {
            // Arrange
            const props = {
                ...initProps,
                dynamicReports: null
            };

            const container = shallow(<DataGrid {...props} />);

            // Assert
            expect(container.type()).toEqual(null);
        });
    });
});