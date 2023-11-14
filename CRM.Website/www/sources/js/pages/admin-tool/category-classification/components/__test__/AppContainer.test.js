import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';
import * as shareScripts from '@jsroot/common/shareScripts';

jest.mock('react-toastify');

describe('AppContainer', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        editCategoryClassPopup: { show: true },
        deleteCategoryClassPopup: { show: true },
        gridParams: {
            categoryIds: '',
            subCategoryIds: '',
            remark: '',
            inactiveSettings: false,
            pageIndex: 1,
            pageSize: 100
        }
    };

    describe('componentDidMount', () => {
        it('should call exact props get data', () => {
            //Arrange
            const promise = Promise.resolve(2);
            shareScripts.getPermission = jest.fn(() => promise);
            shareScripts.getFilterParams = jest.fn();
            //Act
            shallow(<AppContainer {...initProps}/>);

            //Assert
            expect(shareScripts.getPermission).toHaveBeenCalled();
            expect(document.title).toEqual(LangHelper.getResource('CategoryClassification'));
        });
    });

    describe('handleCloseEditPopup', () => {
        it('should call exact function props', () => {
            //Arrange
            const props = {
                ...initProps,
                setEditCategoryClassPopup: jest.fn(),
                setCategoryClassId: jest.fn(),
                setEditCategoryClassResult: jest.fn()
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleCloseEditPopup();

            //Assert
            expect(props.setEditCategoryClassPopup).toHaveBeenCalled();
            expect(props.setCategoryClassId).toHaveBeenCalled();
            expect(props.setEditCategoryClassResult).toHaveBeenCalled();
        });
    });

    describe('handleCloseDeletePopup', () => {
        it('should call exact function props', () => {
            //Arrange
            const props = {
                ...initProps,
                setDeleteCategoryClassPopup: jest.fn()
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleCloseDeletePopup();

            //Assert
            expect(props.setDeleteCategoryClassPopup).toHaveBeenCalled();
        });
    });

    describe('handleEditSuccess', () => {
        it('should call exact function props', () => {
            //Arrange
            const props = {
                ...initProps,
                getGridData: jest.fn()
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleCloseEditPopup = jest.fn();
            container.instance().handleEditSuccess();

            //Assert
            expect(props.getGridData).toHaveBeenCalled();
            expect(container.instance().handleCloseEditPopup).toHaveBeenCalled();
        });
    });

    describe('handleDeleteSuccess', () => {
        it('should call exact function props', () => {
            //Arrange
            const props = {
                ...initProps,
                setCategoryClassId: jest.fn(),
                setEditCategoryClassResult: jest.fn(),
                getGridData: jest.fn(),
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleDeleteSuccess();

            //Assert
            expect(props.getGridData).toHaveBeenCalled();
            expect(props.setEditCategoryClassResult).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });
    });

    describe('handleDelete', () => {
        it('should call exact toast when success', async () => {
            //Arrange
            const promise = Promise.resolve(() => {});
            const props = {
                ...initProps,
                selectCategoryClass: {
                    mainCategoryID: 1,
                    subCategoryID: 1
                },
                editCategoryClassResult: { isSuccessful: true },
                editCategoryClass: jest.fn(() => promise)
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleCloseDeletePopup = jest.fn();
            container.instance().handleDeleteSuccess = jest.fn();
            container.instance().handleDelete();
            await promise

            //Assert
            expect(container.instance().handleCloseDeletePopup).toHaveBeenCalled();
            expect(container.instance().handleDeleteSuccess).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith('RemoveRemarkSuccessfully');
        });

        it('should call exact toast when error', async () => {
            //Arrange
            const promise = Promise.resolve(() => {});
            const props = {
                ...initProps,
                selectCategoryClass: {
                    mainCategoryID: 1,
                    subCategoryID: 1
                },
                editCategoryClassResult: { isSuccessful: false },
                editCategoryClass: jest.fn(() => promise)
            };

            //Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().handleCloseDeletePopup = jest.fn();
            container.instance().handleDeleteSuccess = jest.fn();
            container.instance().handleDelete();
            await promise

            //Assert
            expect(container.instance().handleCloseDeletePopup).toHaveBeenCalled();
            expect(container.instance().handleDeleteSuccess).toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalledWith('RemoveRemarkFailed');
        });
    });
})