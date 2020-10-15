import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import NewPicManagement from '../NewPicManagement';
import EditPicManagement from '../EditPicManagement';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

jest.mock('react-toastify');

describe('AppContainer', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders component correctly', () => {
        // Act
        const container = shallow(<AppContainer />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('renders default component correctly', () => {
        // Arrange
        const props = { isHost: false };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(Filter).props().isHost).toBe(props.isHost);

        expect(container.find(DataGrid).length).toBe(1);
        expect(container.find(DataGrid).props().isHost).toBe(props.isHost);
    });

    it('render NewPicManagement component correctly', () => {
        // Arrange
        const props = {
            createPicPopup: { show: true }
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(NewPicManagement).length).toBe(1);
    });

    it('render EditPicManagement component correctly', () => {
        // Arrange
        const props = {
            editPicPopup: { show: true }
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(EditPicManagement).length).toBe(1);
    });

    it('render Confirm component correctly', () => {
        // Arrange
        const props = {
            confirmPopup: { show: true, username: '', picId: 1, checked: false }
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(ConfirmPopup).length).toBe(1);
    });

    describe('method', () => {
        describe('changeActiveStatus', () => {
            it('should call exactly functions when change active status successfully', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const props = {
                    confirmPopup: { show: true, username: '', picId: 1, checked: false },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    changeActiveStatus: jest.fn(() => promise),
                    activeResult: { isSuccessful: true, message: '' },
                    getGridData: jest.fn()
                };
                const container = shallow(<AppContainer {...props} />).instance();
                container.closeConfirmActive = jest.fn();

                // Act
                container.changeActiveStatus();
                await promise;
                jest.runAllTimers();

                // Assert
                expect(container.closeConfirmActive).toHaveBeenCalled();
                expect(toast.success).toHaveBeenCalled();
                expect(props.getGridData).toHaveBeenCalledWith(props.gridParams);
            });

            it('should call exactly functions when change active status fail', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const props = {
                    confirmPopup: { show: true, username: '', picId: 1, checked: false },
                    gridParams: { pageSize: 100, pageIndex: 1 },
                    changeActiveStatus: jest.fn(() => promise),
                    activeResult: { isSuccessful: false, message: 'error' }
                };
                const container = shallow(<AppContainer {...props} />).instance();
                container.closeConfirmActive = jest.fn();

                // Act
                container.changeActiveStatus();
                await promise;
                jest.runAllTimers();

                // Assert
                expect(container.closeConfirmActive).toHaveBeenCalled();
                expect(toast.error).toHaveBeenCalledWith(props.activeResult.message);
            });
        });

        describe('closeConfirmActive', () => {
            it('should set state correctly', () => {
                // Arrange
                const props = {
                    setConfirmPopup: jest.fn()
                };
                const expected = { show: false, username: '', picId: null, checked: false };
                const container = shallow(<AppContainer {...props} />).instance();

                // Act
                container.closeConfirmActive();

                // Assert
                expect(props.setConfirmPopup).toHaveBeenCalledWith(expected);
            });
        });
    });
});