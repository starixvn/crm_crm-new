import React from 'react';
import { OptionsEdit } from '../OptionsEdit';
import { shallow, mount } from 'enzyme';

describe('OptionsEdit', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        optionDialog: {
            showOption: true,
            top: 0, left: 0,
            status: 'Open', titleIdSearch: 720,
        },
        setOptionDialog: jest.fn()
    };

    const initFireEvent = () => {
        const map = {};
      
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
      
        document.removeEventListener = jest.fn(event => {
            delete map[event];
        });
      
        return map;
    };

    describe('handleClickOutSide', () => {
        const fireEvent = initFireEvent();
        const children = <div id="contextMenu"></div>;

        it('should not call setOptionDialog when clicking inside', () => {
            // Arrange
            const props = {...initProps};
            const onClick = jest.fn();
            
            // Act
            const container = mount(
                <OptionsEdit onClick={onClick} {...props}>{children}</OptionsEdit>,
            );
            fireEvent.click({ target: container.find("#contextMenu").instance() });
            
            // Assert
            expect(props.setOptionDialog).not.toHaveBeenCalled();
        });

        it('should call setOptionDialog when clicking outside', () => {
            // Arrange
            const props = {...initProps};
            
            // Act
            mount(<OptionsEdit {...props}>{children}</OptionsEdit>);
            fireEvent.click({ target: document.body });

            // Assert
            expect(props.setOptionDialog).toHaveBeenCalledTimes(1);
            expect(props.setOptionDialog).toHaveBeenCalledWith({show: false});
        });
    });

    describe('handleEditSearch', () => {
        it('should call exactly function when edit search', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<OptionsEdit {...props} />);
            container.instance().handleEditSearch(720);
           
            // Assert
            expect(props.setOptionDialog).toHaveBeenCalledWith({show: false});
            expect(props.setEditInformDialog).toHaveBeenCalledWith({show: true, titleId: 720});
        });
    });

    describe('handleRemovedAccountLogs', () => {
        it('should call exactly function when remove account logs', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParamRemovedLogs: jest.fn(),
                getRemovedAccountLogs: jest.fn(),
                setRemovedLogDialog: jest.fn()
            };
            const expected = { titleId: 720, pageIndex: 1, pageSize: 100 };

            // Act
            const container = shallow(<OptionsEdit {...props} />);
            container.instance().handleRemovedAccountLogs(720);
           
            // Assert
            expect(props.setOptionDialog).toHaveBeenCalledWith({show: false});
            expect(props.setGridParamRemovedLogs).toHaveBeenCalledWith(expected);
            expect(props.getRemovedAccountLogs).toHaveBeenCalledWith(expected);
            expect(props.setRemovedLogDialog).toHaveBeenCalledWith({show: true});
        });
    });

    describe('handleCloseCase', () => {
        it('should call exactly function when close case', () => {
            // Arrange
            const props = {
                ...initProps,
                editInformStatus: jest.fn(),
                getInforms: jest.fn()
            }; 

            // Act
            const container = shallow(<OptionsEdit {...props} />);
            container.instance().handleCloseCase(720);
           
            // Assert
            expect(props.setOptionDialog).toHaveBeenCalledWith({show: false});
            expect(props.editInformStatus).toHaveBeenCalledWith({ titleId: 720, statusType: true});
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleOpenCase', () => {
        it('should call exactly function when open case', () => {
            // Arrange
            const props = {
                ...initProps,
                editInformStatus: jest.fn(),
                getInforms: jest.fn()
            }; 

            // Act
            const container = shallow(<OptionsEdit {...props} />);
            container.instance().handleOpenCase(720);
           
            // Assert
            expect(props.setOptionDialog).toHaveBeenCalledWith({show: false});
            expect(props.editInformStatus).toHaveBeenCalledWith({ titleId: 720, statusType: false});
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render when status is Open', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<OptionsEdit {...props} />).instance();
            container.handleEditSearch = jest.fn();
            container.handleRemovedAccountLogs = jest.fn();
            container.handleCloseCase = jest.fn();

            // Act
            const actual = shallow(container.render());
            actual.find('li').at(0).props().onClick();
            actual.find('li').at(2).props().onClick();
            actual.find('li').at(4).props().onClick();

            // Assert
            expect(container.handleEditSearch).toHaveBeenCalledWith(720);
            expect(container.handleRemovedAccountLogs).toHaveBeenCalledWith(720);
            expect(container.handleCloseCase).toHaveBeenCalledWith(720);
        });

        it('should render when status is Closed', () => {
            // Arrange
            const props = {
                ...initProps,
                optionDialog: {
                    showOption: true,
                    top: 0, left: 0,
                    status: 'Closed', titleIdSearch: 720,
                },
            };
            const container = shallow(<OptionsEdit {...props} />).instance();
            container.handleOpenCase = jest.fn();
            container.handleRemovedAccountLogs = jest.fn();

            // Act
            const actual = shallow(container.render());
            actual.find('li').at(0).props().onClick();
            actual.find('li').at(2).props().onClick();

            // Assert
            expect(container.handleOpenCase).toHaveBeenCalledWith(720);
            expect(container.handleRemovedAccountLogs).toHaveBeenCalledWith(720);
        });
    });
});