namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions;
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

    //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
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
           // var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(true);
        }

        public async Task<ActionResult> GetAllSettings()
        {
            var customerTypes = settingService.GetAllCustomerTypes();
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.ActiveAndInactive);
            var mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.ActiveAndInactive);
            var subCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.ActiveAndInactive);
            var communications = await settingService.GetCommunicationToolAsync(SettingConstants.ActiveAndInactive, true);
            var status = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var settings = new
            {
                CustomerTypes = customerTypes,
                Responses = responses,
                MainCategories = mainCategories,
                subCategories = subCategories,
                Communications = communications,
                Statuses = status.Where(r => !string.Equals(r.Name, "Deleted"))
            };
            return Json(settings);
        }

        [HttpPost]
        //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<ActionResult> SearchManageFeedback([FromBody] ManageFeedbackCriteria criteria)
        {
            try
            {
                IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetManageFeedbackAsync(criteria);
                IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
                var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
                return Json(new { data = feedbacksOrder, mainCategories, totalItems = criteria.TotalRows });
            }
          catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<ActionResult> EditMultipleLogStatuses([FromBody] EditMultipleLogStatusCommand command)
        {
            try
            {
                command.ReviewerId = napSession.UserId;
                var result = await feedbackService.EditMultipleLogStatusAsync(command);
                return Json(result);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}