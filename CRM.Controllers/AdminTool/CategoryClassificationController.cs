namespace CRM.Controllers.AdminTool
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.AdminTool;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    public class CategoryClassificationController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly ICategoryClassificationService categoryClassificationService;
        private readonly IExportExcelService excelService;

        public CategoryClassificationController(
            ISettingService settingService,
            ICategoryClassificationService categoryClassificationService,
            IExportExcelService excelService
        )
        {
            this.settingService = settingService;
            this.categoryClassificationService = categoryClassificationService;
            this.excelService = excelService;
        }

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
            IEnumerable<CategoryClassification> categoryClassifications = await categoryClassificationService.GetCategoryClassificationAsync(param);
            var groupCategory = categoryClassifications.GroupBy(x => x.MainCategoryID);
            return Json(new { totalItems = param.TotalRows, data = groupCategory });
        }

        public async Task<IActionResult> GetCategoryClassById(int mainCategoryId, int subCategoryId)
        {
            CategoryClassification categoryClassification = await categoryClassificationService.GetCategoryClassByIdAsync(mainCategoryId, subCategoryId);
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
            CommandResult commandResult = await categoryClassificationService.EditCategoryClassificationAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetCategoryClassification param)
        {
            param.PageIndex = 0;
            IEnumerable<CategoryClassification> categoryClassifications = await categoryClassificationService.GetCategoryClassificationAsync(param);
            var bytes = excelService.ExportCategoryClassification(categoryClassifications);
            return File(bytes, MimeType.XLSX, $"{ViewResources.CategoryClassification}.xlsx");
        }
    }
}
