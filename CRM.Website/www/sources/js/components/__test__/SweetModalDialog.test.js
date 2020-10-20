import React, { Fragment } from 'react';
import DraggableModalDialog from '../DraggableModalDialog';
import SweetModalDialog from '../SweetModalDialog';
import { Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('SweetModalDialog', () => {
    LangHelper.getResource = jest.fn(value => value);

    it('should have correct snapshots', () => {
        // Action
        const sweetModalDialog = shallow(<SweetModalDialog />);

        // Assert
        expect(sweetModalDialog).toMatchSnapshot();
    });

    describe('render', () => {
        it('should have Modal', () => {
            // Arrange
            const props = {
                backdropClassName: 'backdropClassName',
                className: 'className',
                size: 'lg',
                onClose: jest.fn()
            };

            // Action
            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Assert
            expect(sweetModalDialog.props().show).toBeTrue;
            expect(sweetModalDialog.props().backdrop).toBe('static');
            expect(sweetModalDialog.props().dialogAs).toEqual(DraggableModalDialog);
            expect(sweetModalDialog.props().backdropClassName).toEqual(props.backdropClassName);
            expect(sweetModalDialog.props().className).toEqual(props.className);
            expect(sweetModalDialog.props().keyboard).toBeFalse;
            expect(sweetModalDialog.props().size).toEqual(props.size);
            expect(sweetModalDialog.props().centered).toBeTrue;
            expect(sweetModalDialog.props().onHide).toEqual(props.onClose);
        });

        it('should have Modal Header', () => {
            // Arrange
            const props = {
                title: 'title'
            };

            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Action
            const header = sweetModalDialog.find(Modal.Header);

            // Assert
            expect(header.props().closeButton).toBeTrue;
            expect(header.find(Modal.Title).props().as).toBe('div');
            expect(header.find(Modal.Title).html()).toContain(props.title);
        });

        it('should have Modal Body with contents', () => {
            // Arrange
            const props = {
                contents: <div></div>
            };

            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Action
            const body = sweetModalDialog.find(Modal.Body);

            // Assert
            expect(body.props().children).toEqual(props.contents);
        });

        it('should have not Modal Footer without buttons', () => {
            // Arrange
            const props = {};
            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Action
            const footer = sweetModalDialog.find(Modal.Footer);

            // Assert
            expect(footer.length).toEqual(0);
        });

        it('should have not Modal Footer with empty buttons', () => {
            // Arrange
            const props = {
                buttons: []
            };

            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Action
            const footer = sweetModalDialog.find(Modal.Footer);

            // Assert
            expect(footer.length).toEqual(0);
        });

        it('should have Modal Footer with not empty buttons', () => {
            // Arrange
            const button = <div></div>;
            const props = {
                buttons: [
                    button
                ]
            };

            const expected = [<Fragment key={0}>{button}</Fragment>]
            const sweetModalDialog = shallow(<SweetModalDialog {...props} />);

            // Action
            const footer = sweetModalDialog.find(Modal.Footer);

            // Assert
            expect(footer.props().children).toEqual(expected);
        });
    });
});