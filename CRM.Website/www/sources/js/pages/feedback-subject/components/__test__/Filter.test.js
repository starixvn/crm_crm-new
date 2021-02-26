import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('filter', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const container = shallow(<Filter />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    describe('methods', () => {
        describe('handleChange', () => {
            it('should call setState when change feedback search keyword', () => {
                // Arrange
                const expected = {
                    feedbackSubjectSearch: 'feedback'
                };
                const container = shallow(<Filter />);

                // Act
                container.instance().handleChange({ target: { value: 'feedback', name: 'feedbackSubjectSearch' } });

                // Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('getParams', () => {
            it('should return expected params', () => {
                // Arrange
                const expected = {
                    Subject: '',
                    pageIndex: 1,
                    pageSize: 100
                };
                const container = shallow(<Filter />).instance();

                // Act
                const actual = container.getParams();

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions', () => {
                // Arrange
                const expectedParams = {
                    Subject: '',
                    pageIndex: 1,
                    pageSize: 50
                };
                const props = {
                    setGridParams: jest.fn(),
                    getFeedBackSubject: jest.fn()
                };
                const container = shallow(<Filter {...props} />).instance();
                container.getParams = jest.fn(() => expectedParams);

                // Act
                container.handleSubmit({ preventDefault: jest.fn() });

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
                expect(props.getFeedBackSubject).toHaveBeenCalledWith(expectedParams);
            });

            describe('handleOpenCreatePopup', () => {
                it('should call exactly functions', () => {
                    // Arrange
                    const props = {
                        isHost: true,
                        setCreateFeedbackSubjectPopup: jest.fn()
                    };
                    const container = shallow(<Filter {...props} />).instance();

                    // Act
                    container.handleOpenCreatePopup();

                    // Assert
                    expect(props.setCreateFeedbackSubjectPopup).toHaveBeenCalledWith({ show: true });
                });
            });
        });
    });
});