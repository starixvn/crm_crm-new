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
        require('../Filter').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            mainSettings: {
                displayOrder: 0,
                parentID: 0,
                settingId: 68001,
                settingName: "111111111",
                settingSource: null,
                settingValue: "te",
                childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
            }
        };
        const state = {
            mainSettings: {
                displayOrder: 0,
                parentID: 0,
                settingId: 68001,
                settingName: "111111111",
                settingSource: null,
                settingValue: "te",
                childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
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