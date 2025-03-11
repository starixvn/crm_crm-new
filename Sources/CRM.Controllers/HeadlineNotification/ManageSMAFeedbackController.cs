using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Constants;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Criteria.SMAPersonalMessage;
using CRM.Filters;
using CRM.Models.ManageSMAFeedback;
using CRM.Models.SMAPersonalMessage;
using CRM.Services;
using CRM.Services.Interfaces;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Mvc;
using static Fanex.NAP.Client.Helpers.Business.Constant;

namespace CRM.Controllers.HeadlineNotification
{
    [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Read)]
    public class ManageSMAFeedbackController(
        INapSession napSession,
        IBaseService baseService,
        ICommonService commonService) : BaseController
    {

        [HttpPost]
        public async Task<IActionResult> GetGridData([FromBody] GetSMAFeedbackCriteria criteria)
        {
            var feedbackSMAInfos = await baseService.GetDataAsync<SMAFeedbackInfo>(criteria);
            foreach (var feedback in feedbackSMAInfos)
            {
                feedback.CreateTime = commonService.ConvertToClientDateTime(feedback.CreateTime);
            }

            return Json(new { totalItems = criteria.TotalRows, data = feedbackSMAInfos });
        }
    }
}
