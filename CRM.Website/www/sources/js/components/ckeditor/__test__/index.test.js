import React from 'react';
import { shallow } from 'enzyme';
import CkEditor from '../index';
import Site from '@jsroot/common/site';

describe('CkEditor', () => {
    const props = {
        colorEditBlock: '',
        username: 'testuser',
        data: '',
        onChange: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should remove tabindex attribute of modal element if it exists', () => {
            const modalElement = document.createElement('div');
            modalElement.setAttribute('class', 'modal');
            modalElement.setAttribute('tabindex', '0');
            document.body.appendChild(modalElement);

            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.componentDidMount();
            expect(modalElement.getAttribute('tabindex')).toBeNull();

            document.body.removeChild(modalElement);
        });
    });

    describe('componentDidUpdate', () => {
        it('should set editor data if new data prop is different and editor does not have focus', () => {
            const prevProps = {
                data: 'test'
            };

            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.editor = {
                editor: {
                    setData: jest.fn(),
                    focusManager: { hasFocus: false }
                }
            };
            wrapper.componentDidUpdate(prevProps);

            expect(wrapper.editor.editor.setData).toHaveBeenCalled();
        });
    });

    describe('onEditorChange', () => {
        it('should call exact function', () => {
            const event = { editor: { getData: jest.fn() } };
            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.editor = {
                editor: {
                    setData: jest.fn(),
                    focusManager: { hasFocus: true }
                }
            };
            wrapper.onEditorChange(event);

            expect(props.onChange).toHaveBeenCalled();
        });
    });

    describe('onKeyPress', () => {
        it('should dispatch a KeyboardEvent when the keyCode is 1114195', () => {
            const event = {
                data: {
                    keyCode: 1114195
                },
                cancel: jest.fn()
            };

            const dispatchSpy = jest.spyOn(document, 'dispatchEvent');
            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.onKeyPress(event);

            expect(dispatchSpy).toHaveBeenCalledWith(new KeyboardEvent('keydown', { 'key': 's', ctrlKey: true }));

            expect(event.cancel).toHaveBeenCalled();
        });

        it('should not dispatch a KeyboardEvent when the keyCode is not 1114195', () => {
            const event = {
                data: {
                    keyCode: 123
                },
                cancel: jest.fn()
            };

            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.onKeyPress(event);

            expect(event.cancel).not.toHaveBeenCalled();
        });
    });

    describe('onLoadPlugin', () => {
        const props = {
            username: 'testuser',
            colorEditBlock: '#123456',
            data: ''
        };

        const editorMock = {
            addCommand: jest.fn(),
            ui: {
                addButton: jest.fn()
            },
            insertHtml: jest.fn()
        };

        const CKEDITORMock = {
            plugins: {
                add: jest.fn()
            },
            addCss: jest.fn()
        };

        const wrapper = shallow(<CkEditor {...props} />).instance();
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should add the editblock plugin to CKEDITOR with the expected init function', () => {
            wrapper.onLoadPlugin(CKEDITORMock);

            expect(CKEDITORMock.plugins.add).toHaveBeenCalledWith('editblock', expect.objectContaining({
                init: expect.any(Function)
            }));

            const initFunction = CKEDITORMock.plugins.add.mock.calls[0][1].init;

            const editorInstance = { ...editorMock };
            initFunction(editorInstance);

            expect(editorInstance.addCommand).toHaveBeenCalledWith('insertEditBlock', expect.objectContaining({
                exec: expect.any(Function)
            }));

            expect(editorInstance.ui.addButton).toHaveBeenCalledWith('EditBlock', expect.objectContaining({
                label: 'Insert Edit Block',
                command: 'insertEditBlock',
                toolbar: 'insert'
            }));

            expect(CKEDITORMock.addCss).toHaveBeenCalledWith('body {margin: 2px !important;}');
        });

        it('should insert the expected HTML when the insertEditBlock command is executed', () => {
            wrapper.onLoadPlugin(CKEDITORMock);
            const initFunction = CKEDITORMock.plugins.add.mock.calls[0][1].init;

            const editorInstance = { ...editorMock };
            initFunction(editorInstance);

            const commandFunction = editorInstance.addCommand.mock.calls[0][1].exec;

            commandFunction(editorInstance);

            expect(editorInstance.insertHtml).toHaveBeenCalledWith(expect.stringContaining(props.username));
            expect(editorInstance.insertHtml).toHaveBeenCalledWith(expect.stringContaining('&nbsp;'));
        });
    });

    describe('onLoaded', () => {
        const editorMock = {
            editor: {
                on: jest.fn()
            }
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should set the editor instance and unblock the UI when the instanceReady event fires', () => {
            const wrapper = shallow(<CkEditor {...props} />).instance();
            wrapper.onLoaded(editorMock);

            expect(editorMock.editor.on).toHaveBeenCalledWith('instanceReady', expect.any(Function));

            const eventFunction = editorMock.editor.on.mock.calls[0][1];

            Site.unblockUI = jest.fn();
            eventFunction({});

            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });
});
