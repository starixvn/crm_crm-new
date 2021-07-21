namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddGuestFeedback;
    using CRM.Models.Feedback.AddGuessFeedback;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public AddGuestFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IBaseService baseService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
        }

        public async Task<ActionResult> AllSetting()
        {
            var languages = await settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countries = await settingService.GetCountryAsync(SettingConstants.Active, true);
            var extentionList = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var extentionListRemmoveNA = extentionList.Where(x => x.Id != NAConstants.ExtentionNA);
            var extentionNA = extentionList.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusListRemoveDelete = statusList.Where(s => s.StatusId != (int)CRMStatus.Deleted).ToList();
            var provinces = await settingService.GetProvinceAsync();
            var communicationToolList = await settingService.GetCommunicationToolAsync(SettingConstants.Active);
            var siteList = await settingService.GetSiteAsync();
            var responsesLists = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var titleList = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
            var licenseeTypeList = await settingService.GetLicenseeTypeAsync();
            var productList = await settingService.GetProductAsync(SettingConstants.Active);
            var productListRemoveNAAndActive = productList.Where(p => p.Id != NAConstants.ProductNA);
            var productNA = productList.FirstOrDefault(p => p.Id == NAConstants.ProductNA);
            var subproduct = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var subproductRemoveNA = subproduct.Where(p => p.Id != NAConstants.SubProductNA && p.ParentId != 0);
            var subproductNA = subproduct.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var bettypeRemoveNAAndActive = bettypes.Where(b => b.Id != NAConstants.BettypeNA);
            var bettypeNA = bettypes.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);
            var mainCategoryList = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategoryList = await settingService.GetSubCategoryAsync(active: SettingConstants.Active);
            var settings = new AllSettingToAddFeedback
            {
                Extensions = extentionListRemmoveNA,
                Countries = countries,
                Provinces = provinces,
                CommunicationTools = communicationToolList,
                Languages = languages,
                Sites = siteList,
                Responses = responsesLists,
                Status = statusListRemoveDelete,
                Titles = titleList,
                LicenseeType = licenseeTypeList,
                ProductNA = productNA,
                SubProductNA = subproductNA,
                BettypeNA = bettypeNA,
                ExtensionNA = extentionNA,
                Products = productListRemoveNAAndActive,
                SubProducts = subproductRemoveNA,
                Bettypes = bettypeRemoveNAAndActive,
                MainCategories = mainCategoryList,
                SubCategories = subCategoryList
            };

            return Json(settings);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] AddGuestFeedbackCommand command)
        {
            var isHostDeletedFeedback = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host);
            if (command.StatusId == (int)CRMStatus.Deleted && !isHostDeletedFeedback)
            {
                var commandResult = new CommandResult
                {
                    Code = (int)HttpStatusCode.Forbidden,
                    Message = ViewResources.AddCustomerFeedbackPermission
                };
                return Json(commandResult);
            }

            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }
    }
}