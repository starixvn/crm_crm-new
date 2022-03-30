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
        require('../Details').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            gridParamDetails: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0 },
            details: { 
                mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
             }
        };
        const state = {
            gridParamDetails: {type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0},
            details: { 
                mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
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