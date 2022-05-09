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
        require('../LicenseeMapping').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            licensees: [{
                0: "108bet",
                1: "108betTest",
                2: "109betTest",
                3: "11bet",
                4: "12B",
                5: "12Bet",
                6: "12BetHelen",
                7: "12BetWinA"
            }],
            licenseesMapping:[{
                licenseeManager: null,
                setting: "0sServices",
                settingId: 6727,
                settingSource: ""
            }],
            licenseesManager: [{
                custId: -5969,
                username: "111test"
            }],
            confirmCancelPopup: {show: false}
        };
        const state = {
            licensees: [{
                0: "108bet",
                1: "108betTest",
                2: "109betTest",
                3: "11bet",
                4: "12B",
                5: "12Bet",
                6: "12BetHelen",
                7: "12BetWinA"
            }],
            licenseesMapping:[{
                licenseeManager: null,
                setting: "0sServices",
                settingId: 6727,
                settingSource: ""
            }],
            licenseesManager: [{
                custId: -5969,
                username: "111test"
            }],
            confirmCancelPopup: {show: false}
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