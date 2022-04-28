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
            customerReport: {
                customerList: [
                    {
                        headline: 1, checker: 'test', position: 1,
                        status: 'closed', username: 'name', firstName: 'vu',
                        lastName: 'otis', phone1: '123', phone2: '123',
                        phone3: '123', mobile: '456', fax: '', email: '',
                        skype: '', msn: '', whatsApp: '', line: '',
                        weChat: '', yahoo: '', bbm: '', qq: '',
                        language: '', isVIP: true, pic1: '', pic2: '',
                        pic3: '', pic4: '', birthDay: '4/27/2022',
                        passport: '', siteName: '', countryName: ''
                    }
                ]
            },
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        };
        const state = {
            customerReport: {
                customerList: [
                    {
                        headline: 1, checker: 'test', position: 1,
                        status: 'closed', username: 'name', firstName: 'vu',
                        lastName: 'otis', phone1: '123', phone2: '123',
                        phone3: '123', mobile: '456', fax: '', email: '',
                        skype: '', msn: '', whatsApp: '', line: '',
                        weChat: '', yahoo: '', bbm: '', qq: '',
                        language: '', isVIP: true, pic1: '', pic2: '',
                        pic3: '', pic4: '', birthDay: '4/27/2022',
                        passport: '', siteName: '', countryName: ''
                    }
                ]
            },
            gridParams: {
                pageIndex: 1,
                pageSize: 100
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