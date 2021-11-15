import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import Filter from '../Filter';
import EditRedemptionLog from '../EditRedemptionLog';
import CreateRedemptionLog from '../CreateRedemptionLog';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        gridParams: { id: 1, subject: 'test', status: 'KIV' }
    };

    describe('handleCloseEditRedemptionDialog', () => {
        it('should call exactly functions when close edit redemption with unSuccessful', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditRedemptionDialog: jest.fn(),
                getLogsByCustomerId: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditRedemptionDialog(false);
           
            // Assert
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: false });
        });

        it('should call exactly functions when close edit redemption with successful', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditRedemptionDialog: jest.fn(),
                getLogsByCustomerId: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditRedemptionDialog(true);
           
            // Assert
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith({ id: 1, subject: 'test', status: 'KIV' });
        });
    });

    describe('handleCloseCreateRedemptionDialog', () => {
        it('should call exactly functions when close create redemption with unSuccessful', () => {
            // Arrange
            const props = {
                ...initProps,
                setCreateRedemptionDialog: jest.fn(),
                getLogsByCustomerId: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseCreateRedemptionDialog(false);
           
            // Assert
            expect(props.setCreateRedemptionDialog).toHaveBeenCalledWith({ show: false });
        });

        it('should call exactly functions when close create redemption with successful', () => {
            // Arrange
            const props = {
                ...initProps,
                setCreateRedemptionDialog: jest.fn(),
                getLogsByCustomerId: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseCreateRedemptionDialog(true);
           
            // Assert
            expect(props.setCreateRedemptionDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith({ id: 1, subject: 'test', status: 'KIV' });
        });

        describe('render', () => {
            it('should render correctly', () => {
                // Arrange
                const props = {
                    ...initProps,
                    editRedemptionDialog: { show: true, logId: 123 },
                    createRedemptionDialog: { show: true, logId: 456 }
                };
    
                // Act
                const container = shallow(<AppContainer {...props} />);
    
                // Assert
                expect(container).toMatchSnapshot();
                expect(container.find(Filter).length).toBe(1);
                expect(container.find(DataGrid).length).toBe(1);
                expect(container.find(EditRedemptionLog).length).toBe(1);
                expect(container.find(CreateRedemptionLog).length).toBe(1);
                expect(container.find(EditRedemptionLog).props().logId).toBe(123);
                expect(container.find(EditRedemptionLog).props().logId).toBe(456);
            });
        });
    });
});