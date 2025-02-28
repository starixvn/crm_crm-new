namespace CRM.Services.AdminTool;

using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.AdminTool.CategoryClassification;
using CRM.Models.AdminTool.CategoryClassification;
using Fanex.NAP.Client;
using Models;

public interface ICategoryClassificationService
{
    Task<IEnumerable<CategoryClassification>> GetCategoryClassificationAsync(GetCategoryClassification param);
    Task<CategoryClassification> GetCategoryClassByIdAsync(int mainCategoryId, int subCategoryId);
    Task<CommandResult> EditCategoryClassificationAsync(EditCategoryClassification modal);
}

public class CategoryClassificationService(
    INapSession napSession,
    IBaseService baseService) : ICategoryClassificationService
{
    public async Task<IEnumerable<CategoryClassification>> GetCategoryClassificationAsync(GetCategoryClassification param)
    {
        var criteria = new GetCategoryClassificationCriteria
        {
            Categories = param.Categories,
            Active = 1,
            RemarkSearch = param.Remark,
            PageIndex = param.PageIndex,
            PageSize = param.PageSize
        };
        var categoryClassifications = await baseService.GetDataAsync<CategoryClassification>(criteria);
        param.TotalRows = criteria.TotalRows;
        return categoryClassifications;
    }

    public async Task<CategoryClassification> GetCategoryClassByIdAsync(int mainCategoryId, int subCategoryId)
    {
        var criteria = new GetCategoryClassificationByIdCriteria
        {
            MainCategoryID = mainCategoryId,
            SubCategoryID = subCategoryId
        };
        return await baseService.GetDataEntityAsync<CategoryClassification>(criteria);
    }

    public async Task<CommandResult> EditCategoryClassificationAsync(EditCategoryClassification modal)
    {
        var command = new EditCategoryClassificationCommand
        {
            UserId = napSession.UserId,
            IP = string.Empty,
            MainCategoryID = modal.MainCategoryID,
            SubCategoryID = modal.SubCategoryID,
            ActionType = modal.ActionType,
            RemarkNewValue = modal.RemarkNewValue
        };
        return await baseService.ExecuteNonQueryAsync(command);
    }
}