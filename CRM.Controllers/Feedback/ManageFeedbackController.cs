namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class ManageFeedbackController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;

        public ManageFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.feedbackService = feedbackService;
        }

        public IActionResult Index()
        {
            //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(true);
        }

        public async Task<ActionResult> AllSetting()
        {
            //var isReadCreateFb = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Read);
            //var isReadDeleteFb = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Read);
            //if(isReadCreateFb || isReadDeleteFb)
            //{
            var customerType = settingService.GetAllCustomerTypes();
            var review = settingService.GetReviews();
            var response = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.ActiveAndInactive);
            var responseList = response.ToList();
            responseList.Insert(
            0,
            new SettingRelation
            {
                Id = SettingConstants.NotApply,
                Value = ViewResources.All
            });
            var mainCategories = await settingService.GetMainCategoriesAndChildSettingAsync();
            var communication = await settingService.GetCommunicationToolAsync(SettingConstants.ActiveAndInactive, true);
            var communicationList = communication.ToList();
            communicationList.Insert(0, new Models.Setting.Setting { Id = SettingConstants.NotApply, Name = ViewResources.All });
            var status = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusList = status.Where(r => !string.Equals(r.Name, "Deleted")).ToList();
            statusList.Insert(0, new FeedbackStatus { StatusId = SettingConstants.NotApply, Name = ViewResources.All });
            var settings = new
            {
                CustomerTypes = customerType,
                Reviews = review,
                CustomerResponses = responseList,
                MainCategories = mainCategories,
                Communications = communicationList,
                Status = statusList
            };
            return Json(settings);

            //}
            //return Json(null);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<ActionResult> SearchManageFeedback([FromBody] ManageFeedbackCriteria criteria)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetManageFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetAllMainCategoriesFromAllSettings();
            var data = new
            {
                Feedbacks = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId),
                TotalItems = criteria.TotalRows,
                MainCategories = mainCategories
            };
            return Json(data);
        }
    }
}