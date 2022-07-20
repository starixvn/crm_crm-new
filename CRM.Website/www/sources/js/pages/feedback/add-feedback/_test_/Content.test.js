import React, { Suspense, lazy } from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';
import Content from '../Content';
import { shallow } from 'enzyme';
const CkEditor = lazy(() => import('@jsroot/components/ckeditor/index'));

describe('Content', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.getResource = jest.fn(value => value);

    const props = {
        editBlock: {
            isEditDescription: false
        },
        collapse: {
            solution: true,
            description : false
        },
        content: {
            solution: '',
            description: ''
        },
        handleEditBlock: jest.fn(),
        handleCollapseExpend: jest.fn(),
        handleChangeContent: jest.fn(),
        isInValidSolution: true
    };

    describe('render', () => {
        it('onclick collapse expend description call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
        
            // Action
            detail.find('.edit_block').at(0).simulate('click');

            // Assert
            expect(props.handleCollapseExpend).toHaveBeenCalledWith('description');
        });

        it('onclick collapse expend solution call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
        
            // Action
            detail.find('.edit_block').at(1).simulate('click');

            // Assert
            expect(props.handleCollapseExpend).toHaveBeenCalledWith('solution');
        });

        it('onclick edit block solution call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
        
            // Action
            detail.find('.edit_block').at(1).find('.float-right').simulate('click', {});

            // Assert
            expect(props.handleEditBlock).toHaveBeenCalledWith({}, 'isEditSolution');
        });
    });

    describe('renderPreviewDescription   ', () => {
        it('onclick edit block description call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
            const {content, collapse, handleEditBlock, handleCollapseExpend} = props;
            const preview = shallow(detail.instance().renderPreviewDescription(content, collapse, handleEditBlock, handleCollapseExpend));
            // Action
            preview.find('.edit_block').at(0).find('.float-right').simulate('click', {});

            // Assert
            expect(props.handleEditBlock).toHaveBeenCalledWith({}, 'isEditDescription');
        });
    }); 

    describe('renderEditBlockDescription  ', () => {
        it('onclick edit block description call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
            const {content, handleEditBlock, collapse, handleChangeContent, handleCollapseExpend} = props;
            const editBlock = shallow(detail.instance().renderEditBlockDescription(content, handleEditBlock, collapse, handleChangeContent, handleCollapseExpend));
            // Action
            editBlock.find('.edit_block').at(0).simulate('click', {});

            // Assert
            expect(props.handleCollapseExpend).toHaveBeenCalledWith('description');
        });

        it('onclick edit block solution call exact function', () => {
            // Arrange
            const detail = shallow(<Content {...props} />);
            const {content, handleEditBlock, collapse, handleChangeContent, handleCollapseExpend} = props;
            const editBlock = shallow(detail.instance().renderEditBlockDescription(content, handleEditBlock, collapse, handleChangeContent, handleCollapseExpend));

            // Action
            editBlock.find('.edit_block').find('.float-right').simulate('click', {});

            // Assert
            expect(props.handleEditBlock).toHaveBeenCalledWith({}, 'isEditDescription');
        });
    }); 
});