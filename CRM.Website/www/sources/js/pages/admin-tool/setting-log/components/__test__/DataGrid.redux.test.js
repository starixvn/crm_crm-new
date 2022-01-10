jest.mock('react-redux');
jest.mock('redux');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

describe('connect ', () => {
    let mapStateToProps, mapDispatchToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementation((mapStateToPropsFunc, mapDispatchToPropsFunc) => {
            mapStateToProps = mapStateToPropsFunc;
            mapDispatchToProps = mapDispatchToPropsFunc;
            return connectMock;
        });
        require('../DataGrid').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            gridParams: { pageIndex: 1, pageSize: 100 },
            gridDataSettingLogs: {
                data: [{
                    logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption',
                    fieldNames: ['ts', 'remark'], oldValuesList: ['test'], newValuesList: ['test']
                }],
                totalItems: 18
            }
        };
        const state = {
            gridParams: { pageIndex: 1, pageSize: 100 },
            gridDataSettingLogs: {
                data: [{
                    logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption',
                    fieldNames: ['ts', 'remark'], oldValuesList: ['test'], newValuesList: ['test']
                }],
                totalItems: 18
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
        bindActionCreators.mockImplementationOnce(mockBindAction);
        const dispatch = {};

        // Act
        mapDispatchToProps(dispatch);

        // Assert
        expect(mockBindAction).toHaveBeenCalledWith(ActionCreators, dispatch);
    });
});