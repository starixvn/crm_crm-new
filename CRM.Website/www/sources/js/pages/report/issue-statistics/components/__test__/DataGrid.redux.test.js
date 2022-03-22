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
            gridParams: { reportType: 1 },
            gridData: {  name: 'Daily Issue Statistic Report From Mar 01, 2022 To Mar 22, 2022',
                    numberOfIssues: 0,
                    reportTypeId: 0,
                    shortName: 'Mar 01, 2022 To Mar 22, 2022' 
            }
        };
        const state = {
            
            gridParams: { reportType: 1 },
            gridData: {  name: 'Daily Issue Statistic Report From Mar 01, 2022 To Mar 22, 2022',
                    numberOfIssues: 0,
                    reportTypeId: 0,
                    shortName: 'Mar 01, 2022 To Mar 22, 2022'
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