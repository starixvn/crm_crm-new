import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getMainSettings', () => {
            // Arrange
            const props = {
                getMainSettings: jest.fn()
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getMainSettings).toHaveBeenCalled();
        });
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn(),
            getMainSettings: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });


    describe('handleCloseUpdatePopup', () => {
        it('should call exactly functions when close', () => {
            // Arrange
            const props = {
                getMainSettings: jest.fn(),
                setOpenUpdatePopup: jest.fn(),
                setMainSettingRelation: jest.fn()
            };
            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseUpdatePopup();
           
            // Assert
            expect(props.setOpenUpdatePopup).toHaveBeenCalledWith({show: false, title: '', parentId: null});
            expect(props.setMainSettingRelation).toHaveBeenCalledWith(null);
        });
    });


    describe('render', () => {
        it('should render null', () => {
            // Arrange
            const props = {
                getMainSettings: jest.fn(),
                updatePopup: { show: true},
                gridParams: { settingName: 'test' },
                mainSettings: [{settingName: 'test'}]
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });

        it('should render correctly', () => {
            // Arrange
            const props = {
                getMainSettings: jest.fn(),
                updatePopup: { show: true},
                gridParams: { settingName: 'test' },
                mainSettings: [{
                    displayOrder: 0,
                    parentID: 0,
                    settingId: 68001,
                    settingName: "test",
                    settingSource: null,
                    settingValue: "te",
                    childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
                }]
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            container.instance().setState({policy: 2});

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});