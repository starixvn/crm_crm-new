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
        require('../CreateForm').default;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('props should be mapped correctly', () => {
        // Arrange
        const expected = {
            settings: { extensions: { id: 1, type: 'tests' } },
            verifyCustomerResults: [{ custId: 1, username: 'sa', isHeadline: true, isDirectAccount: false }],
            relatedCustomerResults: [{ headlineId: 1, custId: 1 }],
            feedbackSubjectTemplates: [{ subjectId: 1, subject: 'test' }],
            addRelatedCustomerDialog: { show: false },
            viewRelatedCustomerDialog: { show: false },
            confirmCreateMultipleLogsDialog: { show: false }
        };
        const state = {
            anotherState: 123,
            settings: { extensions: { id: 1, type: 'tests' } },
            verifyCustomerResults: [{ custId: 1, username: 'sa', isHeadline: true, isDirectAccount: false }],
            relatedCustomerResults: [{ headlineId: 1, custId: 1 }],
            feedbackSubjectTemplates: [{ subjectId: 1, subject: 'test' }],
            addRelatedCustomerDialog: { show: false },
            viewRelatedCustomerDialog: { show: false },
            confirmCreateMultipleLogsDialog: { show: false }
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