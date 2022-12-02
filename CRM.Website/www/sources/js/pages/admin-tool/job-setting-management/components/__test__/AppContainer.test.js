import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getServiceNameSettings: jest.fn(),
        getSettingNames: jest.fn(),
        gridParams:{
            envr: 'UAT'
        },
        setEditPopup: jest.fn(),
        setEditJobSetting: jest.fn(),
        getConfigSettings: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exact props get data', () => {
            // Arrange
            //Act
            shallow(<AppContainer {...initProps} />);

            // Assert
            expect(initProps.getServiceNameSettings).toHaveBeenCalled();
            expect(initProps.getSettingNames).toHaveBeenCalled();
        });
    });

    describe('handleCloseEdit', () => {
        it('should call exact function', () => {
            // Arrange
            const appContainer = shallow(<AppContainer {...initProps} />).instance();

            //Act
            appContainer.handleCloseEdit();

            // Assert
            expect(initProps.setEditPopup).toHaveBeenCalledWith({show: false, data: null, isEditMultiple: false });
            expect(initProps.setEditJobSetting).toHaveBeenCalledWith(null);
        });
    });

    describe('handleSuccessEdit', () => {
        it('should call exact function', () => {
            // Arrange
            const appContainer = shallow(<AppContainer {...initProps} />).instance();
            appContainer.handleCloseEdit = jest.fn();
            //Act
            appContainer.handleSuccessEdit();

            // Assert
            expect(appContainer.handleCloseEdit).toHaveBeenCalled();
            expect(initProps.getConfigSettings).toHaveBeenCalledWith(initProps.gridParams);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer {...initProps} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const props = {
                ...initProps,
                serviceNames: null,
                settingNames: null
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});
