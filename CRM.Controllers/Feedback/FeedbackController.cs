namespace CRM.Controllers.Feedback
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class FeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IFeedbackService feedbackService;

        public FeedbackController(
            INapSession napSession,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.feedbackService = feedbackService;
        }

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> GetNoOfInquiryByFeedbackId(int id)
        {
            EditNoOfInquiry feedback = await feedbackService.GetNoOfInquiryByFeedbackIdAsync(id);
            return Json(feedback);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditNoOfInquiry([FromBody] EditNoOfInquiryCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await feedbackService.EditNoOfInquiryAsync(command);
            return Json(commandResult);
        }
    }
}