import React from 'react';
import { shallow } from 'enzyme';
import { AutoRefresh } from '../AutoRefresh';
import LangHelper from '@jsroot/common/langHelper';
import  * as functions from '../../common.functions';

describe('AutoRefresh', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn((key) => key);
        functions.isValidGetDataAutoRefresh = jest.fn(() => true);
        document.addEventListener = jest.fn();

        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isRefresh: true,
        setAutoRefresh: jest.fn(),
        setGridParams: jest.fn(),
        getGridData: jest.fn(),
        setIsRefresh: jest.fn(),
        autoRefresh: {
            countDown: 10,
            value: 60
        },
        gridParams: { pageIndex: 1, pageSize: 100 }
    };

    describe('componentDidMount', () => {
        it('should call exactly function', () => {
            //Arrange
            const props = {
                ...initProps
            };
            const container = shallow(<AutoRefresh {...props} />).instance();
            container.handleClickOutside = jest.fn();

            //Act
            container.componentDidMount();

            //Assert
            expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
            expect(document.addEventListener).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should call setAutoRefresh not when props not changes', () => {
            // Arrange
            const props = {
                ...initProps
            };
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();

            // Act
            container.componentDidUpdate(props);

            // Assert
            expect(props.setAutoRefresh).toHaveBeenCalledTimes(0);
        });
        
        it('should call setAutoRefresh when props changes', () => {
            // Arrange
            const props = {
                ...initProps
            };
            const prevProps = {
                autoRefresh: {
                    countDown: 10,
                    value: 50,
                    current: ''
                }
            }
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();

            //Act
            container.componentDidUpdate(prevProps);

            //Assert
            expect(props.setAutoRefresh).toHaveBeenCalledWith({
                ...props.autoRefresh,
                countDown: props.autoRefresh.value
            });
        });

        it('should call setAutoRefresh and getGridData when container countDown equal zero, isRefresh true and container value greater than zero', () => {
            //Arrange
            const props = {
                ...initProps,
                autoRefresh: {
                    value: 90,
                    countDown: 0
                }
            };
            const expectedParams = {
                ...props.params,
                pageIndex: 1,
                pageSize: 100
            };
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();

            //Act
            container.componentDidUpdate(props);
            container.isValidGetDataAutoRefresh = jest.fn(() => true);

            //Assert
            expect(props.setAutoRefresh).toHaveBeenCalledWith({
                ...props.autoRefresh,
                countDown: props.autoRefresh.value
            });
            expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
            expect(props.getGridData).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('componentWillUnmount', () => {
        it('should call exactly function', () => {
            //Arrange
            const props = {
                ...initProps
            };
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();
            container.intervalCountDown = jest.fn(() => 1);
            document.removeEventListener = jest.fn();
    
            //Act
            container.componentWillUnmount();
    
            //Assert
            expect(clearInterval).toHaveBeenCalledWith(container.intervalCountDown);
            expect(document.removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
        });
    });

    describe('handleClickOutside', () => {
        it('should state isOpenDropdown change', () => {
            // Arrange
            const mockRef = {
                event: { target: '' },
                contains: jest.fn(() => false)
            };
            const props = {
                ...initProps
            };
            const state = { isOpenDropdown: true };

            const autoRefresh = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();
            autoRefresh.autoRefresh.current = mockRef;
            autoRefresh.setState(state);

            // Action
            autoRefresh.handleClickOutside(mockRef.event);

            // Assert
            expect(autoRefresh.state.isOpenDropdown).toBeFalse;
        });
    });

    describe('handleAutoRefreshChange', () => {
        it('should call exactly functions', () => {
            // Arrange
            const value = 10;
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
    
            // Action
            container.handleAutoRefreshChange(value);
    
            // Assert
            expect(container.state.isOpenDropdown).toBeFalse;
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
            expect(props.setAutoRefresh).toHaveBeenCalledWith({
                ...props.autoRefresh,
                value: value
            });
        });
    });

    describe('handleRefresh', () => {
        it('should call exactly functions', () => {
            // Arrange
            const value = 10;
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
    
            // Action
            container.handleRefresh(value);
    
            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
            expect(props.setAutoRefresh).toHaveBeenCalledWith({
                ...props.autoRefresh,
                countDown: props.autoRefresh.value
            });
        });
    });

    describe('toggleAutoFreshDropdown', () => {
        it('should call exactly functions', () => {
            // Arrange
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Action
            container.toggleAutoFreshDropdown();
    
            // Assert
            expect(container.state.isOpenDropdown).toBeFalse;
        });
    });

    describe('render', () => {
        it('should call exactly functions when auto-refresh-value click', () => {
            // Arrange
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().toggleAutoFreshDropdown = jest.fn();

            // Action
            container.render();
            container.find('.auto-refresh-value').at(0).simulate('click');

            // Assert
            expect(container.instance().toggleAutoFreshDropdown).toHaveBeenCalled();
        });

        it('should call exactly functions when link-click click', () => {
            // Arrange
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().handleRefresh = jest.fn();

            // Action
            container.render();
            container.find('.link-click').at(0).simulate('click');

            // Assert
            expect(container.instance().handleRefresh).toHaveBeenCalled();
        });

        it('should call exactly functions when li click', () => {
            // Arrange
            const state = {
                isOpenDropdown: true
            };
            const props = {
                ...initProps
            };
    
            const container = shallow(<AutoRefresh {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            container.instance().handleAutoRefreshChange = jest.fn();

            // Action
            container.render();
            container.find('li').at(0).simulate('click');
            container.find('li').at(1).simulate('click');
            container.find('li').at(2).simulate('click');
            container.find('li').at(3).simulate('click');
            container.find('li').at(4).simulate('click');

            // Assert
            expect(container.instance().handleAutoRefreshChange).toHaveBeenCalledWith(60);
            expect(container.instance().handleAutoRefreshChange).toHaveBeenCalledWith(90);
            expect(container.instance().handleAutoRefreshChange).toHaveBeenCalledWith(120);
            expect(container.instance().handleAutoRefreshChange).toHaveBeenCalledWith(150);
            expect(container.instance().handleAutoRefreshChange).toHaveBeenCalledWith(0);
        });
    });
});