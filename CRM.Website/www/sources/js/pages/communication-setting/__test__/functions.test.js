import { getSubCategories } from '../functions';

describe('functions', () => {
    it('getSubCategories should be return expect data', () => {
        // Arrange
        const isCheckDefault = true;
        const subCategoryList = [{
            mainCategoryID: 1,
            name: "asd",
            subCategoryId: 1
        }];
        const selectedSubCategoryIds = '';

        const expected = {
            data: [{
                name: "asd",
                subCategoryId: 1,
                checked: true
            }]
        };

        // Action
        const result = getSubCategories(isCheckDefault, subCategoryList, selectedSubCategoryIds);

        // Assert
        expect(result).toEqual(expected.data);
    });

    it('getSubCategories should be return distinct data', () => {
        // Arrange
        const isCheckDefault = true;
        const subCategoryList = [
            {
                mainCategoryID: 1,
                name: "asd",
                subCategoryId: 1
            }, {
                mainCategoryID: 2,
                name: "asd",
                subCategoryId: 1
            }];
        const selectedSubCategoryIds = '';

        const expected = {
            data: [{
                name: "asd",
                subCategoryId: 1,
                checked: true
            }]
        };

        // Action
        const result = getSubCategories(isCheckDefault, subCategoryList, selectedSubCategoryIds);

        // Assert
        expect(result).toEqual(expected.data);
    });

    it('getSubCategories should be return check element', () => {
        // Arrange
        const isCheckDefault = false;
        const subCategoryList = [
            {
                mainCategoryID: 1,
                name: "test",
                subCategoryId: 1
            }, {
                mainCategoryID: 2,
                name: "asd",
                subCategoryId: 2
            }];
        const selectedSubCategoryIds = '1';

        const expected = {
            data: [{
                name: "test",
                subCategoryId: 1,
                checked: true
            }, {
                name: "asd",
                subCategoryId: 2,
                checked: false
            }]
        };

        // Action
        const result = getSubCategories(isCheckDefault, subCategoryList, selectedSubCategoryIds);

        // Assert
        expect(result).toEqual(expected.data);
    });
});