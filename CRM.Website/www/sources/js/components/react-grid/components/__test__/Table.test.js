import React from 'react';
import Table from '../Table';
import RowLayout from '../RowLayout';
import createTableSection from '../tableSection';
import { DEFAULT_COLUMN_WIDTH, SCROLLBAR_WIDTH } from '../..//constants';
import Pager from '../Pager';
import functions from '../../functions';
import Site from '@jsroot/common/site';
import { shallow } from 'enzyme';
import { Tab } from 'bootstrap';

describe('Table', () => {
    const clientWidth = document.body.clientWidth;

    it('should have correct snapshot', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        // Action
        const table = shallow(<Table {...props} />);

        // Assert
        expect(table).toMatchSnapshot();
    });

    it('componentDidMount should run correctly', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        const debounceResizing = 'debounceResizing';
        const table = shallow(<Table {...props} />);
        table.instance()._handleResize = jest.fn();
        table.instance().debounceResizing = debounceResizing;
        window.addEventListener = jest.fn();

        // Action
        table.instance().componentDidMount();

        // Assert
        expect(table.instance()._handleResize).toHaveBeenCalled();
        expect(window.addEventListener).toHaveBeenCalledWith('resize', debounceResizing);
    });

    describe('componentDidUpdate', () => {
        it('should change state when maxWidth change', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                maxWidth: 5
            };
    
            const prevProps = { maxWidth: 10 };
            const maxWidthValue = props.maxWidth || clientWidth;
            const diffWidth = clientWidth - maxWidthValue;
            const table = shallow(<Table {...props} />);

            // Action
            table.instance().componentDidUpdate(prevProps);

            // Assert
            expect(table.instance().state.maxWidth).toEqual(maxWidthValue);
            expect(table.instance().diffWidth).toEqual(diffWidth);
        });

        it('should change state when maxWidth change and header change', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                maxWidth: 5
            };
    
            const prevProps = {
                header: {
                    props: {
                        children: [{}]
                    }
                },
                maxWidth: 10
            };

            const columnsWidth = 15;
            const table = shallow(<Table {...props} />);
            table.instance()._getColumnsWidth = jest.fn(() => columnsWidth);

            // Action
            table.instance().componentDidUpdate(prevProps);

            // Assert
            expect(table.instance().state.columnsWidth).toEqual(columnsWidth);
        });

        it('should scrollToTop when body change and shouldResetScrollPosition true', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                shouldResetScrollPosition: true
            };
    
            const prevProps = {
                body: []
            };

            const table = shallow(<Table {...props} />);
            const bodyWrapper = jest.fn();
            table.instance().bodyWrapper = bodyWrapper;
            functions.scrollToTop = jest.fn();

            // Action
            table.instance().componentDidUpdate(prevProps);

            // Assert
            expect(functions.scrollToTop).toHaveBeenCalledWith(bodyWrapper, 200);
        });
    });

    it('componentWillUnmount should run correctly', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        const table = shallow(<Table {...props} />);
        const debounceResizing = 'debounceResizing';
        table.instance().debounceResizing = debounceResizing;
        window.removeEventListener = jest.fn();

        // Action
        table.instance().componentWillUnmount();

        // Assert
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', debounceResizing);
    });

    describe('columnWidthSum', () => {
        it('should return null when columnsWidth false', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };
    
            const state = { columnsWidth: false };
            const table = shallow(<Table {...props} />);
            table.setState(state);

            // Action
            const result = table.instance().columnWidthSum;

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return null when columnsWidth element type not number', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };
    
            const state = { columnsWidth: [ 'value' ] };
            const table = shallow(<Table {...props} />);
            table.setState(state);

            // Action
            const result = table.instance().columnWidthSum;

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return expected when columnsWidth element type always number', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };
    
            const state = { columnsWidth: [ 1, 2 ] };
            const table = shallow(<Table {...props} />);
            table.setState(state);

            // Action
            const result = table.instance().columnWidthSum;

            // Assert
            expect(result).toEqual(3);
        });
    });

    it('_getNextColspanCells should return expected', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        const cells = [
            {
                props: {
                    colSpan: 1
                }
            },
            {
                props: {
                    colSpan: 2
                }
            }
        ];

        const fromCellIndex = 0;
        const toCellIndex = 3;
        const table = shallow(<Table {...props} />);

        // Action
        const result = table.instance()._getNextColspanCells(cells, fromCellIndex, toCellIndex);

        // Assert
        expect(result).toEqual(cells);
    });

    describe('_getColumnsWidth', () => {
        it('should return null when empty array headerRows', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };

            const headerRows = [];
            const table = shallow(<Table {...props} />);

            // Action
            const result = table.instance()._getColumnsWidth(headerRows);

            // Assert
            expect(result).toBeNull;
        });

        it('should return columnsWidth when not empty array headerRows', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };

            const cellList = [];
            const headerRows = [
                {
                    props: {
                        children: cellList
                    }
                }
            ];

            let columnsWidth = [];
            const table = shallow(<Table {...props} />);
            table.instance()._getWidthByCells = jest.fn();

            // Action
            table.instance()._getColumnsWidth(headerRows);

            // Assert
            expect(table.instance()._getWidthByCells).toHaveBeenCalledWith(headerRows, columnsWidth, {}, cellList, 0);
        });

        it('should return columnsWidth when not array headerRows', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };

            const cellList = [];
            const headerRows = {
                props: {
                    children: cellList
                }
            };

            let columnsWidth = [];
            const table = shallow(<Table {...props} />);
            table.instance()._getWidthByCells = jest.fn();

            // Action
            table.instance()._getColumnsWidth(headerRows);

            // Assert
            expect(table.instance()._getWidthByCells).toHaveBeenCalledWith(headerRows, columnsWidth, {}, cellList, 0);
        });
    });

    it('_getWidthByCells should run correctly', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        const cell = {};
        const cellList = [cell, null];
        const headerRows = {
            props: {
                children: cellList
            }
        };

        const columnsWidth = [];
        const currentRowIndex = 0;
        const currentNextCellIndexByRow = {};
        const table = shallow(<Table {...props} />);
        table.instance()._handleWidthOneCell = jest.fn();

        // Action
        table.instance()._getWidthByCells(headerRows, columnsWidth, currentNextCellIndexByRow, cellList, currentRowIndex);

        // Assert
        expect(table.instance()._handleWidthOneCell).toHaveBeenCalledTimes(1);
        expect(table.instance()._handleWidthOneCell).toHaveBeenCalledWith(headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex);
    });

    describe('_handleWidthOneCell', () => {
        it('should run correctly when colspan greater than 1', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };
    
            const cell = {
                props: {
                    colSpan: 2
                }
            };

            const headerRows = [
                {
                    props: {
                        children: []
                    }
                },
                {
                    props: {
                        children: []
                    }
                }
            ];

            const columnsWidth = [];
            const currentRowIndex = 0;
            const currentNextCellIndexByRow = {};
            const table = shallow(<Table {...props} />);
            table.instance()._getWidthByCells = jest.fn();
            table.instance()._getNextColspanCells = jest.fn(() => []);

            // Action
            table.instance()._handleWidthOneCell(headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex);

            // Assert
            expect(table.instance()._getWidthByCells).toHaveBeenCalledWith(headerRows, columnsWidth, currentNextCellIndexByRow, [], currentRowIndex + 1);
        });
    });

    describe('_handleResize', () => {
        it('should change state contentHeight', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                autoHeight: true
            };

            const state = { contentHeight: 10 };
            const event = { preventDefault: jest.fn() };
            const table = shallow(<Table {...props} />);
            const expected = 20;
            table.instance().bodyWrapper = true;
            table.instance().setState(state);
            table.instance()._calculateBodyHeight = jest.fn(() => expected);

            // Action
            table.instance()._handleResize(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(table.instance().state.contentHeight).toEqual(expected);
        });
        
        it('should change state maxWidth', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };

            const state = { maxWidth: 123 };
            const diffWidth = 10;
            const maxWidth = document.body.clientWidth - diffWidth
            const event = { preventDefault: jest.fn() };
            const table = shallow(<Table {...props} />);
            table.instance().diffWidth = diffWidth;
            table.instance().setState(state);

            // Action
            table.instance()._handleResize(event);

            // Assert
            expect(table.instance().state.maxWidth).toEqual(maxWidth);
        });
    });

    it('_calculateBodyHeight should return expected', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            }
        };

        const footerWrapper = { offsetHeight: 10 };
        const bodyWrapper = { offsetTop: 10 };
        const adjustedHeight = 10;
        const expected = window.innerHeight - (bodyWrapper.offsetTop + footerWrapper.offsetHeight + 70) - adjustedHeight;
        const table = shallow(<Table {...props} />);
        table.instance().footerWrapper = footerWrapper;
        table.instance().bodyWrapper = bodyWrapper;
        table.instance().adjustedHeight = adjustedHeight;

        // Action
        const result = table.instance()._calculateBodyHeight();

        // Assert
        expect(result).toEqual(expected);
    });

    it('_getUpdatedColumnLayout should return expected', () => {
        // Arrange
        const props = {
            header: {
                props: {
                    children: []
                }
            },
            width: 10,
            autoWidth: false,
            containerPadding: 10
        };

        const columnWidth = 10;
        const state = { columnsWidth: [ columnWidth ] };

        const sumOfColumnWidth = props.width - props.containerPadding - SCROLLBAR_WIDTH;
        const expected = state.columnsWidth.map(cellWidth =>
            sumOfColumnWidth / columnWidth * cellWidth);
        const table = shallow(<Table {...props} />);
        table.instance().setState(state);

        // Action
        const result = table.instance()._getUpdatedColumnLayout();

        // Assert
        expect(result).toEqual(expected);
    });

    describe('render', () => {
        it('should return null when columnsWidth empty', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                }
            };

            const state = { columnsWidth: [] };
            const table = shallow(<Table {...props} />);
            table.instance().setState(state);

            // Action
            const result = table.instance().render();

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return expected components', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                containerPadding: 10
            };

            const state = { maxWidth: 100 };
            const table = shallow(<Table {...props} />);
            table.instance().setState(state);

            // Action
            const result = shallow(table.instance().render());

            // Assert
            expect(result.find('div').at(1).props().className).toBe('table-container');
            expect(result.find('div').at(1).props().style).toEqual({ maxWidth: state.maxWidth - props.containerPadding });
        });
        
        it('should return expected components have Pager', () => {
            // Arrange
            const props = {
                header: {
                    props: {
                        children: []
                    }
                },
                isPaging: true,
                pageOption: {
                    PageIndex: 1
                },
                onPaging: jest.fn()
            };

            // Action
            const table = shallow(<Table {...props} />);

            // Assert
            expect(table.find(Pager).props().pageOption).toEqual(props.pageOption);
            expect(table.find(Pager).props().onPaging).toEqual(props.onPaging);
        });
    });
});