jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

describe('connect', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../DataGridCommunication').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            communicationLogs: {
                data: [{ id: 1, settings: [{settingId: 3000, subSettingId: 4000}], duration: '1 : 0'}],
                mainCategories:[{ settingId: 3000, settingValue: 'test' ,childSettings:[{subCategoryId: 4000}] }]
            }
        };
        const state = {
            communicationLogs: {
                data: [{ id: 1, settings: [{settingId: 3000, subSettingId: 4000}], duration: '1 : 0'}],
                mainCategories:[{ settingId: 3000, settingValue: 'test' ,childSettings:[{subCategoryId: 4000}] }]
            }
        };

        // Act
        const actual = mapStateToProps(state);

        // Assert
        expect(actual).toEqual(expected);
    });

    it('bindActionCreators should be called with correct parameter', () => {
        // Arrange
        const mockBindAction = jest.fn();
        bindActionCreators.mockImplementation(mockBindAction);
        const dispatch = {};

        // Act
        mapDispatchToProps(dispatch);

        //Assert
        expect(mockBindAction).toHaveBeenCalledWith(ActionCreators, dispatch);
    });
});