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
            gridParams: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" },
            gridData: { 
                data:[{claimTime: "Jan 01, 0001 12:00:00 AM", subject: null, month: 12, year: 2021}],
                    title: "Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022",
                    totals: {RM: 5, US$: 15, EURO: 2}
             }
        };
        const state = {
            gridParams: { subject:"", fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" },
            gridData:{ 
                data:[{claimTime: "Jan 01, 0001 12:00:00 AM", subject: null, month: 12, year: 2021}],
                    title: "Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022",
                    totals: {RM: 5, US$: 15, EURO: 2}
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