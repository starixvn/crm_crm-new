import LangHelper from '@jsroot/common/langHelper';
import * as commonFunction from '../common.functions';
import * as shareScripts from '@jsroot/common/shareScripts';

describe('commonFunctions', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const settings = {
        bettypeNA: {id: 0, name: 'N/A'},
        bettypes: [{id: 3, value: 'N/A', parentId: 2}],
        communicationToolNA: 'null',
        communicationTools:[{id: 0, name: 'N/A'}],
        countries:[{id: 0, name: 'N/A'}],
        extensionNA: {id: 0, value: 'N/A'},
        extensions:[{id: 0, value: 'N/A'}],
        languages: [{languageId: 0, name: 'N/A'}],
        licenseeTypes:[{id: 0, name: 'N/A'}],
        mainCategories: [{mainCategoryID: 1, name: 'settingName'}, {mainCategoryID: 2, name: 'settingName'}],
        productNA:{id: 0, value: 'N/A'},
        products: [{id: 0, value: 'N/A'}],
        responses: [{id: 0, value: 'N/A'}],
        roles: [{id: 0, value: 'N/A'}],
        sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
        statusId: [{id: 0, name: 'N/A'}],
        subCategories: [{subCategoryId: 1, mainCategoryID: 1}],
        subProductNA: {id: 0, value: 'N/A'},
        subProducts: [{id: 2, value: 'N/A', parentId: 1}]
    };

    describe('validateFormik', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {
                communicationToolIds: [],
                mainCategoryIds: '',
                subCategoryIds: '',
                languageId: 0,
                startTime:'2022-02-02',
                endTime:'2022-01-01'
            };
            const contents ={
                solution: '',
                remark: '',
                review: null,
                isReviewed: true
            };

            const verifySection = {
                customerNameInput: 'test',
                subject: ''
            };

            const expected = {
                customerNameInput: 'You must verify the username before saving this feedback.',
                startTime: LangHelper.formatString( LangHelper.getResource('FieldLessThanOrEqualTo'),
                LangHelper.getResource('StartTime'),LangHelper.getResource('EndTime')),
                communicationToolIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication')),
                mainCategoryIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory')),
                subCategoryIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')),
                languageId: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language')),
                subject: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject')),
                remark: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Remark')),
                solution: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution')),
                review: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Review'))
            };

            // Act
            const errors = commonFunction.validateFormik(values,contents, verifySection, settings);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('handleGroupCategory', () => {
        it('should return expect array', () => {
            // Arrange
            const params = [
                { mainCategoryId: 3024, subCategoryId: 4069 },
                { mainCategoryId: 3024, subCategoryId: 4070 },
                { mainCategoryId: 3025, subCategoryId: 4080 },
                { mainCategoryId: 3024, subCategoryId: 4071 }
            ];
            const expectValue = [
                { mainCategoryId: 3024, subCategoryId: [ 4069, 4070, 4071 ] },
                { mainCategoryId: 3025, subCategoryId: [ 4080 ] }
            ];
            // Act
            const received = commonFunction.filterGroupCategory(params);

            // Assert
            expect(received).toEqual(expectValue);
        });
    });

    describe('handleChangeProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateSubProduct = jest.fn();
            const setStateBetType = jest.fn();
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            commonFunction.handleChangeProduct(setFieldValue, '1,2', '1', settings, setStateSubProduct, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(setStateSubProduct).toHaveBeenCalledWith([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateSubProduct = jest.fn();
            const setStateBetType = jest.fn();

            // Act
            commonFunction.handleChangeProduct(setFieldValue, '', '1', settings, setStateSubProduct, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(setStateSubProduct).toHaveBeenCalledWith([]);
            expect(setStateBetType).toHaveBeenCalledWith([]);
        });
    });

    describe('handleChangeSubProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateBetType = jest.fn();
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            commonFunction.handleChangeSubProduct(setFieldValue, '1,2', '1', settings, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '1,2');
            expect(setStateBetType).toHaveBeenCalledWith([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateBetType = jest.fn();

            // Act
            commonFunction.handleChangeSubProduct(setFieldValue, '', '1', settings, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(setStateBetType).toHaveBeenCalledWith([]);
        });
    });

    describe('handlePasteCustomer', () => {
        it('should do as expected', () => {
            // Arrange
            const customerNameInput = 'sa';
            const setFieldValue = jest.fn();
            const event = { clipboardData: { getData: jest.fn(() => 'test1, test2') } };

            // Act
            commonFunction.handlePasteCustomer(setFieldValue, event, customerNameInput);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('customerNameInput', 'sa,test1,test2');
        });
    });

    describe('isValidCustomer', () => {
        it('should valid customer', () => {
            // Arrange
            const customer = 'sa';

            // Act
            const validCustomer = commonFunction.isValidCustomer(customer);

            // Assert
            expect(validCustomer).toBe(true);
        });

        it('should invalid customer', () => {
            // Arrange
            const customer = 'sa123465798123456789123456789123468789132465789132465789132';

            // Act
            const validCustomer = commonFunction.isValidCustomer(customer);

            // Assert
            expect(validCustomer).toBe(false);
        });
    });
});