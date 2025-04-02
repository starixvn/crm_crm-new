namespace CRM.Controllers.AdminTool;

using Constants;
using CRM.Models.AdminTool.CategoryClassification;
using CRM.Resources;
using CRM.Services.AdminTool;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class CategoryClassificationController(
    ISettingService settingService,
    ICategoryClassificationService categoryClassificationService,
    IExportExcelService excelService)
    : BaseController
{
    public async Task<IActionResult> GetAllSettings()
    {
        var settings = new
        {
            MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
            SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active)
        };

        return Json(settings);
    }

    [HttpPost]
    public async Task<IActionResult> GetCategoryClassification([FromBody] GetCategoryClassification param)
    {
        var categoryClassifications = await categoryClassificationService.GetCategoryClassificationAsync(param);
        var groupCategory = categoryClassifications.GroupBy(x => x.MainCategoryID);
        return Json(new { totalItems = param.TotalRows, data = groupCategory });
    }

    public async Task<IActionResult> GetCategoryClassById(int mainCategoryId, int subCategoryId)
    {
        var categoryClassification = await categoryClassificationService.GetCategoryClassByIdAsync(mainCategoryId, subCategoryId);
        if (categoryClassification == null)
        {
            return NotFound();
        }
        return Json(categoryClassification);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.CategoryClassification, Policy = Policy.Host)]
    public async Task<IActionResult> EditCategoryClassification([FromBody] EditCategoryClassification model)
    {
        var commandResult = await categoryClassificationService.EditCategoryClassificationAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetCategoryClassification param)
    {
        param.PageIndex = 0;
        var categoryClassifications = await categoryClassificationService.GetCategoryClassificationAsync(param);
        var bytes = excelService.ExportCategoryClassification(categoryClassifications);
        return File(bytes, MimeType.XLSX, $"{ViewResources.CategoryClassification}.xlsx");
    }
}