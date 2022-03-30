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
            gridParams: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" },
            gridData: { 
                title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                totalItems: 1,
                usernames: [{id: 10278938, name: "starixIT"}]
             }
        };
        const state = {
            gridParams: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" },
            gridData: { 
                title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                totalItems: 1,
                usernames: [{id: 10278938, name: "starixIT"}]
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