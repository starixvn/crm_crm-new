namespace CRM.Controllers.Remark
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class NewRemarkController : Controller
    {
        private readonly IRemarkService remarkService;
        private readonly ISettingService settingService;

        public NewRemarkController(
            IRemarkService remarkService,
            ISettingService settingService
        )
        {
            this.remarkService = remarkService;
            this.settingService = settingService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetRemarkTitles()
        {
            var remarkSettings = await settingService.GetSettingAsync(SettingName.RemarkTitles, true);
            var remarkSettingsOrder = remarkSettings.OrderBy(s => s.DisplayOrder).ToList();
            return Json(remarkSettingsOrder);
        }
    }
}
