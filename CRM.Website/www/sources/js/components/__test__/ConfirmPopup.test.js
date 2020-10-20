import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '../DraggableModalDialog';
import ConfirmPopup from '../ConfirmPopup';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('ConfirmPopup', () => {
    LangHelper.getResource = jest.fn(value => value);

    it('should have correct snapshots', () => {
        // Action
        const confirmPopup = shallow(<ConfirmPopup />);

        // Assert
        expect(confirmPopup).toMatchSnapshot();
    });

    describe('render', () => {
        it('should have Modal', () => {
            // Arrange
            const props = {
                size: 'lg',
                onClose: jest.fn()
            };

            // Action
            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Assert
            expect(confirmPopup.props().show).toBeTrue;
            expect(confirmPopup.props().backdrop).toBe('static');
            expect(confirmPopup.props().dialogAs).toEqual(DraggableModalDialog);
            expect(confirmPopup.props().className).toBe('confirmation-modal');
            expect(confirmPopup.props().keyboard).toBeFalse;
            expect(confirmPopup.props().size).toEqual(props.size);
            expect(confirmPopup.props().centered).toBeTrue;
            expect(confirmPopup.props().onHide).toEqual(props.onClose);
        });
        
        it('should have Modal Header', () => {
            // Arrange
            const props = {
                title: 'title'
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const header = confirmPopup.find(Modal.Header);

            // Assert
            expect(header.props().closeButton).toBeTrue;
            expect(header.find(Modal.Title).props().as).toBe('div');
            expect(header.find(Modal.Title).html()).toContain(props.title);
        });
        
        it('should have Modal Body without Alert', () => {
            // Arrange
            const props = {};

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const body = confirmPopup.find(Modal.Body);

            // Assert
            expect(body.find(Alert).length).toEqual(0);
        });
        
        it('should have Modal Body with Alert having successul requestResonse', () => {
            // Arrange
            const props = {
                requestResponse: {
                    isSuccessful: true,
                    message: 'message'
                }
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const body = confirmPopup.find(Modal.Body);

            // Assert
            expect(body.find(Alert).props().variant).toBe('success');
            expect(body.find(Alert).props().className).toBe('d-flex');
            expect(body.find(Alert).find('div').at(0).html()).toBe('<div><i class="fa fa-check"></i></div>');
            expect(body.find(Alert).find('div').at(1).html()).toBe(`<div class="ml-2">${props.requestResponse.message}</div>`);
        });
        
        it('should have Modal Body with Alert having unsuccessul requestResonse', () => {
            // Arrange
            const props = {
                requestResponse: {
                    isSuccessful: false,
                    message: 'message'
                }
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const body = confirmPopup.find(Modal.Body);

            // Assert
            expect(body.find(Alert).props().variant).toBe('danger');
            expect(body.find(Alert).props().className).toBe('d-flex');
            expect(body.find(Alert).find('div').at(0).html()).toBe('<div><i class="fa fa-exclamation-triangle"></i></div>');
            expect(body.find(Alert).find('div').at(1).html()).toBe(`<div class="ml-2">${props.requestResponse.message}</div>`);
        });
        
        it('should have Modal Body with content', () => {
            // Arrange
            const props = {
                content: 'content'
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const body = confirmPopup.find(Modal.Body);

            // Assert
            expect(body.html()).toContain(props.content);
        });
        
        it('should have Modal Footer', () => {
            // Arrange
            const props = {
                onSubmit: jest.fn(),
                onClose: jest.fn()
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const footer = confirmPopup.find(Modal.Footer);

            // Assert
            expect(footer.find(Button).at(0).props().variant).toBe('primary');
            expect(footer.find(Button).at(0).props().size).toBe('sm');
            expect(footer.find(Button).at(0).props().onClick).toEqual(props.onSubmit);
            expect(footer.find(Button).at(0).props().disabled).toBeFalse;
            expect(footer.find(Button).at(0).html()).toContain('OK');
            expect(footer.find(Button).at(1).props().size).toBe('sm');
            expect(footer.find(Button).at(1).props().onClick).toEqual(props.onClose);
            expect(footer.find(Button).at(1).html()).toContain('Cancel');
        });
        
        it('should have Modal Footer with OK button disabled', () => {
            // Arrange
            const props = {
                requestResponse: {
                    isSuccessful: true
                }
            };

            const confirmPopup = shallow(<ConfirmPopup {...props} />);

            // Action
            const footer = confirmPopup.find(Modal.Footer);

            // Assert
            expect(footer.find(Button).at(0).props().disabled).toBeTrue;
        });
    });
});