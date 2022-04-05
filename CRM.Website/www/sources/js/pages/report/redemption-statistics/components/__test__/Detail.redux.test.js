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
        require('../Detail').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            gridParamDetails: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0 },
            gridDataDetails: { 
                amount: 2, claimTime: "Oct 04, 2021 12:00:00 AM", currency: "RM",
                currencyId: 2, doneBy: "sa", status: "Deleted", subject: "test", userName: "881HK"
            },
            detailPopup: { show: true, title: 'test' }
        };
        const state = {
            gridParamDetails: {type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0},
            gridDataDetails: { 
                amount: 2, claimTime: "Oct 04, 2021 12:00:00 AM", currency: "RM",
                currencyId: 2, doneBy: "sa", status: "Deleted", subject: "test", userName: "881HK"
            },
            detailPopup: { show: true, title: 'test' }
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