import React from 'react';
import { toast } from 'react-toastify';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import NewFeedbackSubject from '../NewFeedbackSubject';
import EditFeedbackSubject from '../EditFeedbackSubject';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

jest.mock('react-toastify');

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const container = shallow(<AppContainer />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(1);
    });

    describe('create feedback subject', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                createFeedbackSubjectPopup: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(NewFeedbackSubject).length).toBe(1);
        });

        it('should call exactly functions when close popup', () => {
            // Arrange
            const props ={
                setCreateFeedbackSubjectPopup: jest.fn(),
                setCreateFeedbackSubjectResult: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreatePopup();

            // Assert
            expect(props.setCreateFeedbackSubjectPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateFeedbackSubjectResult).toHaveBeenCalledWith(null);
        });

        it('should call exactly functions when create feedback subject successful', () => {
            // Arrange
            const props = {
                gridParams: {},
                getFeedBackSubject: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseCreatePopup = jest.fn();

            // Act
            container.handleCreateSuccess();

            // Assert
            expect(props.getFeedBackSubject).toHaveBeenCalledWith(props.gridParams);
            expect(container.handleCloseCreatePopup).toHaveBeenCalled();
        });
    });

    describe('edit feedback subject', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                editFeedbackSubjectPopup: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(EditFeedbackSubject).length).toBe(1);
        });

        it('should call exactly functions when close popup', () => {
            // Arrange
            const props = {
                setEditFeedbackSubjectPopup: jest.fn(),
                setEditFeedbackSubjectResult: jest.fn(),
                setSelectFeedbackSubjectId: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditPopup();

            // Assert
            expect(props.setEditFeedbackSubjectPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setEditFeedbackSubjectResult).toHaveBeenCalledWith(null);
            expect(props.setSelectFeedbackSubjectId).toHaveBeenCalledWith(null);
        });

        it('should call exactly functions when edit feedback subject successful', () => {
            // Arrange
            const props = {
                gridParams: {},
                getFeedBackSubject: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseEditPopup = jest.fn();

            // Act
            container.handleEditSuccess();

            // Assert
            expect(props.getFeedBackSubject).toHaveBeenCalledWith(props.gridParams);
            expect(container.handleCloseEditPopup).toHaveBeenCalled();
        });
    });

    describe('edit status feedback subject', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                editStatusFeedbackSubjectPopup: { show:true, id: 1, isActive: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(SweetModalDialog).length).toBe(1);
            expect(container.find(SweetModalDialog).props().contents)
                .toStrictEqual(<div>Are you sure you want to <span>deactivate</span> Feedback Subject Template <strong>1</strong>?</div>);
        });

        it('should call exactly functions when close popup', () => {
            // Arrange
            const props = {
                setEditStatusFeedbackSubjectPopup: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditStatusPopup();

            // Assert
            expect(props.setEditStatusFeedbackSubjectPopup).toHaveBeenCalledWith({ show: false });
        });

        it('should call exactly functions when close successful', async () => {
            // Arrange
            const response = { data: { isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            const props = {
                editStatusFeedbackSubjectPopup: { id: 1, isActive: true },
                editStatusFeedbackSubject: jest.fn(() => promise),
                getFeedBackSubject: jest.fn(),
                gridParams: {}
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseEditStatusPopup = jest.fn();

            // Act
            container.handleEditStatus();
            await promise;

            // Assert
            expect(props.editStatusFeedbackSubject).toHaveBeenCalledWith({ templateId: 1, isActive: false });
            expect(toast.success).toHaveBeenCalledWith('EditStatusFeedbackSubjectSuccessfully');
            expect(container.handleCloseEditStatusPopup).toHaveBeenCalled();
            expect(props.getFeedBackSubject).toHaveBeenCalledWith(props.gridParams);
        });

        it('should call exactly functions when delete unsuccessful', async () => {
            // Arrange
            const response = { data: { isSuccessful: false, message: 'update status unsuccessful' } };
            const promise = Promise.resolve(response);
            const props = {
                editStatusFeedbackSubjectPopup: { id: 1, isActive: true },
                editStatusFeedbackSubject: jest.fn(() => promise),
                getFeedBackSubject: jest.fn(),
                gridParams: {}
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseEditStatusPopup = jest.fn();

            // Act
            container.handleEditStatus();
            await promise;

            // Assert
            expect(props.editStatusFeedbackSubject).toHaveBeenCalledWith({ templateId: 1, isActive: false });
            expect(toast.error).toHaveBeenCalledWith('update status unsuccessful');
            expect(container.handleCloseEditStatusPopup).toHaveBeenCalled();
            expect(props.getFeedBackSubject).toHaveBeenCalledWith(props.gridParams);
        });
    });
});
