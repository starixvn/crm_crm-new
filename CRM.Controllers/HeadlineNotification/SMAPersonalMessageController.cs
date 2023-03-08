namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.NotificationList;
    using CRM.Models.SMAPersonalMessage;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.PICManagement, Policy = Policy.Host)]
    public class SMAPersonalMessageController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public SMAPersonalMessageController(
            INapSession napSession,
            IBaseService baseService,
            ICommonService commonService)
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.commonService = commonService;
        }


        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICManagement, Policy = Policy.Host)]
        public async Task<IActionResult> GetGridData()
        {
            var data = new SMAMessageInfor
            {
                Id = 123,
                CreatedDate = new DateTime(),
                MessageId = 1,
                Creator = "Teddy",
                Title = "Test SMA send message",
                Username = "HL1",
                Content = "您好，客服部在此通知以下的通告:\r\n\r\n请注意:[足球] 由于注单在有进球的危险时段中误被接受, \"威尔斯 -vs- 奥地利\" [M88 沙巴虚拟西班牙联赛PES 21 第2季 - 15分钟赛事 - 30/3*早盘*]!"
            };
            var datas = new List<SMAMessageInfor>();

            for(var i = 0; i <= 10; i++)
            {
                datas.Add(data);
            }

            return Json(new { totalItems = datas.Count, data = datas });
        }
    }
}
