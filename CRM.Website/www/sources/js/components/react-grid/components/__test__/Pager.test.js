import React from 'react';
import Pager from '../Pager';
import { shallow } from 'enzyme';

describe('Pager', () => {
    it('should have correct snapshot', () => {
        // Action
        const pager = shallow(<Pager />);

        // Assert
        expect(pager).toMatchSnapshot();
    });

    it('should have correct default state', () => {
        // Arrange
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            }
        };

        // Action
        const pager = shallow(<Pager {...props} />);

        // Assert
        expect(pager.instance().state).toEqual({
            inputValue: props.pageOption.PageIndex
        });
    });

    describe('componentDidUpdate', () => {
        it('should call _updateState when pageIndex change', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const prevProps = {
                pageOption: {
                    PageIndex: 2
                }
            };

            const pager = shallow(<Pager {...props} />);
            pager.instance()._updateState = jest.fn();

            // Action
            pager.instance().componentDidUpdate(prevProps);

            // Assert
            expect(pager.instance()._updateState).toHaveBeenCalledWith(props.pageOption.PageIndex);
        });

        it('should not call _updateState when pageIndex not change', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const prevProps = {
                pageOption: {
                    PageIndex: 1
                }
            };

            const pager = shallow(<Pager {...props} />);
            pager.instance()._updateState = jest.fn();

            // Action
            pager.instance().componentDidUpdate(prevProps);

            // Assert
            expect(pager.instance()._updateState).toHaveBeenCalledTimes(0);
        });
    });

    it('goToPage should run correctly', () => {
        // Arrange
        const index = 1;
        const pageSize = 10;
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            },
            onPaging: jest.fn()
        };

        const pager = shallow(<Pager {...props} />);

        // Action
        pager.instance().goToPage(index, pageSize);

        // Assert
        expect(props.onPaging).toHaveBeenCalledWith(index, pageSize);
    });

    describe('onKeyUpHandle', () => {
        it('should not call goToPage when code not equal 13', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const event = {
                keyCode: 1
            };

            const goToPage = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().goToPage = goToPage;

            // Action
            pager.instance().onKeyUpHandle(event);

            // Assert
            expect(goToPage).toHaveBeenCalledTimes(0);
        });
        
        it('should not call goToPage when code equal 13 and value not in valid range', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const event = {
                which: 13
            };

            const totalPage = 10;
            const state = { inputValue: '11' };
            const goToPage = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().goToPage = goToPage;
            pager.instance().setState(state);

            // Action
            pager.instance().onKeyUpHandle(event, totalPage);

            // Assert
            expect(goToPage).toHaveBeenCalledTimes(0);
        });
        
        it('should call goToPage when code equal 13 and value in valid range', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 10,
                    PageList: []
                }
            };

            const event = {
                which: 13
            };

            const totalPage = 10;
            const state = { inputValue: '9' };
            const goToPage = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().goToPage = goToPage;
            pager.instance().setState(state);

            // Action
            pager.instance().onKeyUpHandle(event, totalPage);

            // Assert
            expect(goToPage).toHaveBeenCalledWith(9, props.pageOption.PageSize);
        });
    })

    describe('onClickHandle', () => {
        it('should call handleFunc when isDisable false' , () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const isDisable = false;
            const handleFunc = jest.fn();
            const pager = shallow(<Pager {...props} />);

            // Action
            pager.instance().onClickHandle(isDisable, handleFunc);

            // Assert
            expect(handleFunc).toHaveBeenCalled();
        });
        
        it('should not call handleFunc when isDisable true' , () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const isDisable = true;
            const handleFunc = jest.fn();
            const pager = shallow(<Pager {...props} />);

            // Action
            pager.instance().onClickHandle(isDisable, handleFunc);

            // Assert
            expect(handleFunc).toHaveBeenCalledTimes(0);
        });
    });

    describe('onInputChangeHandler', () => {
        it('should call _updateState when valid number', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const event = {
                target: {
                    value: '10'
                }
            };

            const _updateState = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance()._updateState = _updateState;

            // Action
            pager.instance().onInputChangeHandler(event);

            // Assert
            expect(_updateState).toHaveBeenCalledWith(event.target.value);
        });
        
        it('should call _updateState when valid number', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const event = {
                target: {
                    value: 'not number'
                }
            };

            const _updateState = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance()._updateState = _updateState;

            // Action
            pager.instance().onInputChangeHandler(event);

            // Assert
            expect(_updateState).toHaveBeenCalledTimes(0);
        });
    });

    it('_updateState should change state correctly', () => {
        // Arrange
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            }
        };

        const inputValue = 'value';
        const pager = shallow(<Pager {...props} />);

        // Action
        pager.instance()._updateState(inputValue);

        // Assert
        expect(pager.instance().state.inputValue).toEqual(inputValue);
    });

    describe('_renderPageSizeSelection', () => {
        it('should return correct select', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const isDisable = true;
            const pageSize = 10;
            const _renderPageSizeOption = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance()._renderPageSizeOption = _renderPageSizeOption;
    
            // Action
            const result = shallow(pager.instance()._renderPageSizeSelection(isDisable, pageSize));
    
            // Assert
            expect(result.props().className).toBe('pagesize-select');
            expect(result.props().disabled).toBe(isDisable);
            expect(result.props().value).toBe(pageSize);
            expect(_renderPageSizeOption).toHaveBeenCalledWith(props.pageOption.PageList);
        });

        it('should return correct select onChange', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };

            const isDisable = false;
            const pageSize = 10;
            const onChange = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().goToPage = onChange;
            const result = shallow(pager.instance()._renderPageSizeSelection(isDisable, pageSize));
            const event = {
                target: {
                    value: '10'
                }
            };
    
            // Action
            result.simulate('change', event)

            // Assert
            expect(onChange).toHaveBeenCalledWith(1, Number(event.target.value));
        });
    });

    it('_renderPageSizeOption should return expected', () => {
        // Arrange
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            }
        };

        const value1 = 'value1';
        const value2 = 'value2';
        const pageList = [value1, value2];
        const expected = [
            <option key='pagesize0' value={value1}>{value1}</option>,
            <option key='pagesize1' value={value2}>{value2}</option>
        ]
        const pager = shallow(<Pager {...props} />);

        // Action
        const result = pager.instance()._renderPageSizeOption(pageList);

        // Assert
        expect(result).toEqual(expected);
    });

    describe('_renderPageIcon', () => {
        it('_renderPageIcon should return expected link', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const iconClass = 'iconClass';
            const isDisable = true;
            const onClickFunc = jest.fn();
            const pager = shallow(<Pager {...props} />);
    
            // Action
            const result = shallow(pager.instance()._renderPageIcon(iconClass, isDisable, onClickFunc));
    
            // Assert
            expect(result.props().className).toBe(`fa ${iconClass} disable`);
        });
        
        it('_renderPageIcon should return expected link onClick', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const iconClass = 'iconClass';
            const isDisable = false;
            const onClickFunc = jest.fn();
            const onClickHandle = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().onClickHandle = onClickHandle;
            const result = shallow(pager.instance()._renderPageIcon(iconClass, isDisable, onClickFunc));
    
            // Action
            result.simulate('click');
    
            // Assert
            expect(result.props().className).toBe(`fa ${iconClass} `);
            expect(onClickHandle).toHaveBeenCalledWith(isDisable, onClickFunc);
        });
    });

    describe('_renderPageInput', () => {
        it('should return expected component', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const index = 1;
            const totalPage = 10;
            const onInputChangeHandler = jest.fn();
            const pager = shallow(<Pager {...props} />);
            pager.instance().onInputChangeHandler = onInputChangeHandler;

            // Action
            const result = shallow(pager.instance()._renderPageInput(index, totalPage));

            // Assert
            expect(result.props().className).toBe('page-input');
            expect(result.find('span').at(0).html()).toBe('<span>Page </span>');
            expect(result.find('input').props().type).toBe('text');
            expect(result.find('input').props().className).toBe('page-form');
            expect(result.find('input').props().value).toEqual(index);
            expect(result.find('input').props().maxLength).toBe('4');
            expect(result.find('input').props().size).toBe('2');
            expect(result.find('input').props().onChange).toEqual(onInputChangeHandler);
            expect(result.find('span').at(1).html()).toBe(`<span> of ${totalPage} </span>`);
        });
        
        it('should return expected component containing input onKeyUp', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const index = 1;
            const totalPage = 10;
            const event = {};
            const pager = shallow(<Pager {...props} />);
            pager.instance().onKeyUpHandle = jest.fn();
            const result = shallow(pager.instance()._renderPageInput(index, totalPage));

            // Action
            result.find('input').simulate('keyUp', event);

            // Assert
            expect(pager.instance().onKeyUpHandle).toHaveBeenCalledWith(event, totalPage);
        });
    });

    it('_renderPageLabel should return expected', () => {
        // Arrange
        const props = {
            pageOption: {
                PageIndex: 1,
                PageList: []
            }
        };

        const index = 1;
        const totalPage = 10;
        const expected = <div className='page-input'><span>Page {`${index} of ${totalPage} `}</span></div>;
        const pager = shallow(<Pager {...props} />);

        // Action
        const result = pager.instance()._renderPageLabel(index, totalPage);

        // Assert
        expect(result).toEqual(expected);
    });

    describe('_renderPageInfo', () => {
        it('should return expected when viewTo not greater than totalItem', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const index = 1;
            const pageSize = 10;
            const totalItem = 100;
            const viewFrom = ((index - 1) * pageSize) + 1;
            const viewTo = index * pageSize;
            const expected = <span className='page-info'>{`Display ${viewFrom} to ${viewTo} of ${totalItem} item(s)`}</span>;
            const pager = shallow(<Pager {...props} />);
    
            // Action
            const result = pager.instance()._renderPageInfo(index, pageSize, totalItem);
    
            // Assert
            expect(result).toEqual(expected);
        });
        
        it('should return expected when viewTo greater than totalItem', () => {
            // Arrange
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: []
                }
            };
    
            const index = 2;
            const pageSize = 10;
            const totalItem = 10;
            const viewFrom = ((index - 1) * pageSize) + 1;
            const expected = <span className='page-info'>{`Display ${viewFrom} to ${totalItem} of ${totalItem} item(s)`}</span>;
            const pager = shallow(<Pager {...props} />);
    
            // Action
            const result = pager.instance()._renderPageInfo(index, pageSize, totalItem);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('render', () => {
        it('should return expected components', () => {
            // Arrange
            const minWidth = 1;
            const maxWidth = 10;
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageList: [],
                    TotalItem: 10,
                    PageSize: 10
                },
                minWidth,
                maxWidth,
                isAllowInputPageIndex: true
            };

            const state = { inputValue: '10' };
            const totalPage = Math.ceil(props.pageOption.TotalItem / props.pageOption.PageSize);
            const pager = shallow(<Pager {...props} />);
            pager.setState(state);
            pager.instance()._renderPageSizeSelection = jest.fn();
            pager.instance()._renderPageIcon = jest.fn((iconClass, isDisable, onClickFunc) => onClickFunc());
            pager.instance()._renderPageInput = jest.fn();

            // Action
            const result = shallow(pager.instance().render());

            // Assert
            expect(result.props().className).toBe('page-container');
            expect(result.props().style).toEqual({ minWidth, maxWidth, display: 'block' });
            expect(result.html()).toContain('Page size ');
            expect(pager.instance()._renderPageSizeSelection).toHaveBeenCalledWith(false, props.pageOption.PageSize);
            expect(pager.instance()._renderPageIcon).toHaveBeenCalledWith('fa-angle-double-left', true, expect.any(Function));
            expect(pager.instance()._renderPageIcon).toHaveBeenCalledWith('fa-angle-left', true, expect.any(Function));
            expect(pager.instance()._renderPageInput).toHaveBeenCalledWith(state.inputValue, totalPage);
            expect(pager.instance()._renderPageIcon).toHaveBeenCalledWith('fa-angle-right', true, expect.any(Function));
            expect(pager.instance()._renderPageIcon).toHaveBeenCalledWith('fa-angle-double-right', true, expect.any(Function));
        });
    });
});