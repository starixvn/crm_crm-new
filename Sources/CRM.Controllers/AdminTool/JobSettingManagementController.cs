namespace CRM.Controllers.AdminTool
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.JobSettingManagement;
    using CRM.Models.AdminTool;
    using Fanex.NAP.Client;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.JobSettingManagement, Policy = Policy.Read)]
    public class JobSettingManagementController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;

        public JobSettingManagementController(
            INapSession napSession,
            IBaseService baseService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
        }

        public async Task<IActionResult> GetServiceNameSettings()
        {
            var criteria = new GetServiceNameSettingCriteria();
            var serviceNames = await baseService.GetDataAsync<string>(criteria);
            return Json(serviceNames);
        }

        public async Task<IActionResult> GetSettingNames([FromBody] GetConfigSettingCriteria criteria)
        {
            var configs = await baseService.GetDataAsync<JobSetting>(criteria);
            var groupSettingName = configs.GroupBy(x => x.SettingName).Select(y => y.Key);
            return Json(groupSettingName);
        }

        [HttpPost]
        public async Task<IActionResult> GetConfigSettings([FromBody] GetConfigSettingCriteria criteria)
        {
            var configs = await baseService.GetDataAsync<JobSetting>(criteria);
            return Json(configs);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.JobSettingManagement, Policy = Policy.Host)]
        public async Task<IActionResult> EditJobSetting([FromBody] EditJobSettingCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }
    }
}