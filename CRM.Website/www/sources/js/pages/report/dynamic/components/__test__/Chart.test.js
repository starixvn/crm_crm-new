import React from "react";
import { shallow } from "enzyme";
import { Modal } from 'react-bootstrap';
import { Chart } from '../Chart';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        chartInfo: {
            name: 'Daily testing',
            shortName: 'Daily',
            childReports: [
                {
                    shortName: 'test',
                    totalChildReports: 2
                }
            ]
        }
    };

    describe('getDataChart', () => {
        it('should return exactly', () => {
            // Arrange
            const container = shallow(<Chart {...initProps}/>);
            const param = {
                childReports: [
                    {
                        shortName: 'test',
                        totalChildReports: 2
                    }
                ]
            };

            // Act
            const actual = container.instance().getDataChart(param);

            expect(actual).toEqual([{ name: 'test', test: 2 }]);
        });
    });

    describe('getLabelChart', () => {
        it('should return expected result', () => {
            // Arrange
            const container = shallow(<Chart {...initProps}/>);
            const param = {
                childReports: [
                    {
                        shortName: 'test',
                        totalChildReports: 2
                    }
                ]
            };

            // Act
            const actual = container.instance().getLabelChart(param);

            expect(actual).toEqual(['test']);
        });
    });

    describe('render', () => {
        it('should close chart popup when click close button', () => {
            // Arrange
            const props = {
                ...initProps,
                onClose: jest.fn()
            }
            const container = shallow(<Chart {...props} />);

            // Act
            container.find(Modal).props().onHide();

            // Assert
            expect(props.onClose).toHaveBeenCalled();
        });
    });
})