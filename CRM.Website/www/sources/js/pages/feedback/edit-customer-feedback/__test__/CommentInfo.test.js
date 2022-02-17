import React from 'react';
import CommentInfo from '../CommentInfo';
import { Form } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('CommentInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    const props = {
        collapse:{
            description: true,
            solution: true
        },
        values: {hasRelated: true},
        fieldInput: {customerNameInput: ''},
        touched: {},
        errors: {},
        setFieldValue: jest.fn(),
        onCollapseExpand: jest.fn(),
        settings: {
            titles: [{id: 1, value: 'titles'}],
            licenseeTypes: [{id: 1, name: 'licenseeTypes'}],
            statuses: [{statusId: 1, name: 'statuses'}],
            responses: [{id: 1, value: 'responses'}],
            languages: [{languageId: 1, value: 'language'}],
            roles: [{id: 1, value: 'roles'}],
            countries: [{id: 1, value: 'countries'}]
        }
    };

    describe('renderReviewSection ', () => {
        it('handle change isReviewed correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<CommentInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderReviewSection());
            
            // Action
            render.find('input').simulate('change', {target: {checked: true}});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isReviewed', true);
        });

        it('handle change review correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<CommentInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderReviewSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('review','value');
        });

        it('handle errors review correctly', () => {
            // Arrange
            const errors = {
                review: 'errors'
            };

            const touched = {
                review: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const feedbackInfo = shallow(<CommentInfo {...propsClone} />);
             var render = shallow(feedbackInfo.instance().renderReviewSection());

             // Assert
             expect(render.find(CkEditor).props().isInvalid).toEqual(false);
        });
    });

    describe('renderSolutionSection', () => {
        it('handle collapse correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<CommentInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());
            
            // Action
            render.find(Form.Group).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('solution');
        });

        it('handle onClick correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<CommentInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());
            
            // Action
            render.find('span').simulate('click', {stopPropagation: jest.fn()});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isPreviewSolution', true);
        });

        it('handle change solution correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<CommentInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('solution','value');
        });
    });

    describe('renderDescriptionSection ', () => {
        it('handle collapse correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewDescription: false}}};
            const feedbackInfo = shallow(<CommentInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());
            
            // Action
            render.find(Form.Group).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('description');
        });

        it('handle onClick correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<CommentInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());
            
            // Action
            render.find('span').simulate('click', {stopPropagation: jest.fn()});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isPreviewSolution', true);
        });

        it('handle change solution correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<CommentInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('description','value');
        });
    });
});