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
        require('../NewRemark').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            allSettings:{ 
                extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
                relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
                userId: 62585686
            },
            remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
            validateResult: { isSuccessful: false},
            createResult: { isSuccessful: false}
        };
        const state = {
            allSettings:{ 
                extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
                relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
                userId: 62585686
            },
            remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
            validateResult: { isSuccessful: false},
            createResult: { isSuccessful: false}
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