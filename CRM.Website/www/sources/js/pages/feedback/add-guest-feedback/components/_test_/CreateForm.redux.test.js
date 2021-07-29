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
            feedbackSubjectTemplates: [{ subjectId: 1, subject: 'test' }],
            confirmCreateGuestDialog: { show: false },
            addFeedbackResult: {isSuccessful: true}
        };
        const state = {
            settings: { extensions: { id: 1, type: 'tests' } },
            feedbackSubjectTemplates: [{ subjectId: 1, subject: 'test' }],
            confirmCreateGuestDialog: { show: false },
            addFeedbackResult: {isSuccessful: true}
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