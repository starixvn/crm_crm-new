namespace CRM.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Read)]
    public class PicAssignmentController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly INapSession napSession;
        private readonly IPermissionService permissionService;
        private readonly IPicAssignmentService picAssignmentService;
        private readonly IExportExcelService excelService;

        public PicAssignmentController(
            ISettingService settingService,
            IBaseService baseService,
            INapSession napSession,
            IPermissionService permissionService,
            IPicAssignmentService picAssignmentService,
            IExportExcelService excelService)
        {
            this.settingService = settingService;
            this.baseService = baseService;
            this.napSession = napSession;
            this.permissionService = permissionService;
            this.picAssignmentService = picAssignmentService;
            this.excelService = excelService;
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Read)]
        public async Task<IActionResult> AllSetting()
        {
            var sites = await picAssignmentService.GetSystemSiteAsync(new GetSystemSiteCriteria());
            var currency = (await settingService.GetCurrencyAsync()).OrderBy(c => c.Name);
            var positions = settingService.GetPositions(true);
            var pics = await baseService.GetDataAsync<PicInfo>(new GetPICCriteria { IsActive = true });
            var headlines = await baseService.GetDataAsync<BaseModel>(new GetHeadlinesCriteria());
            var allSetting = new
            {
                SiteList = sites.GroupBy(item => item.SiteLabel).Select(g => new { Name = g.Key, ChildSites = g.ToList() }),
                CurrencyList = currency,
                StatusList = Enum.GetValues(typeof(CustomerStatus)).Cast<CustomerStatus>().Select(status => status.ToString()),
                HeadlineTypeList = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => new BaseModel { Id = (int)status, Name = status.ToString() }),
                CustomerTypeList = settingService.GetAllCustomerTypes(),
                PositionList = positions,
                PicList = pics,
                HeadlineList = headlines
            };

            return Json(allSetting);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Host)]
        public async Task<IActionResult> ValidateAssignPic([FromBody] AssignPic model)
        {
            var criteria = new ValidateAssignmentCriteria
            {
                HeadlineId = model.HeadlineId,
                PicId = model.PicIds,
                Username = model.DirectAccountIds
            };

            var result = await picAssignmentService.ValidateAssignmentDirectAccountAsync(criteria);
            var data = new
            {
                IsSuccessful = criteria.ErrCode == 0,
                Message = criteria.ErrMsg,
                ErrorAccounts = result.Item1,
                AssignedDirectAccounts = result.Item2
            };

            return Json(data);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Host)]
        public async Task<IActionResult> AssignPIC([FromBody] AssignPic model)
        {
            var command = new AssignPicCommand
            {
                HeadlineId = model.HeadlineId,
                PicId = model.PicIds,
                DirectAccount = model.DirectAccountIds,
                IsKeepAssign = model.IsKeepAssign,
                UserId = napSession.UserId,
                LoginIP = ClientIP
            };

            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Host)]
        public async Task<IActionResult> RemoveAssignment([FromBody] IEnumerable<RemoveAssignment> removeAssignments)
        {
            var command = new RemoveAssignmentCommand
            {
                RemovedPICs = removeAssignments.ToXML("ROOT").ToString(),
                UserId = napSession.UserId,
                LoginIP = ClientIP
            };

            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Read)]
        public async Task<IActionResult> GetAllPICAssignment([FromBody] GetAssignmentCriteria criteria)
        {
            var rawData = await baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(criteria);
            var assignments = GeneratePicList(rawData.Item1, criteria.PageIndex, criteria.PageSize);
            var communicationTools = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true);
            var groupByComm = rawData.Item2.GroupBy(x => new { x.PicId, x.Username, x.Order, x.RoleId }).Select(y => new
            {
                Order = y.Key.Order,
                RoleId = y.Key.RoleId,
                PicName = y.Key.Username,
                PicId = y.Key.PicId,
                ListComm = y.ToList()
            }).OrderBy(y => y.Order)
                .ThenBy(y => y.RoleId)
                .ThenBy(y => y.PicName)
                .ToList();

            var response = new
            {
                Data = assignments,
                ListComm = communicationTools,
                CommunicationTools = groupByComm,
                TotalItems = criteria.TotalRows,
                TotalUnassignedDirectAccount = criteria.TotalUnassigned
            };

            return Json(response);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Host)]
        public async Task<IActionResult> SetDefaultPIC([FromBody] SetDefaultPicCommand command)
        {
            command.UserId = napSession.UserId;
            command.LoginIP = ClientIP;
            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Host)]
        public async Task<IActionResult> RemoveDefaultPIC([FromBody] RemoveDefaultPicCommand command)
        {
            command.UserId = napSession.UserId;
            command.LoginIP = ClientIP;
            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.PICAssignment, Policy = Policy.Read)]
        public async Task<IActionResult> ExportExcelReport([FromBody] GetAssignmentCriteria criteria)
        {
            criteria.PageIndex = null;
            criteria.PageSize = null;
            var picInfo = await baseService.FetchMultipleAsync<PICAssignmentInfo, AssignmentCommunication>(criteria);
            var groupAssignmentCommunications = picInfo.Item2.GroupBy(x => new { x.PicId, x.Username, x.Order, x.RoleId }).Select(y => new GroupAssignmentCommunication
            {
                Order = y.Key.Order,
                RoleId = y.Key.RoleId,
                PicName = y.Key.Username,
                PicId = y.Key.PicId,
                ListComm = y.ToList()
            }).OrderBy(y => y.Order)
                .ThenBy(y => y.RoleId)
                .ThenBy(y => y.PicName)
                .ToList();
            var isReadPicManagement = await permissionService.IsHavingPermissionAsync(FunctionKey.PICManagement);
            var isRenderPicManagement = isReadPicManagement && picInfo.Item2.ToList().Count > 0;
            IEnumerable<PICAssignmentInfo> assignments = GeneratePicList(picInfo.Item1, criteria.PageIndex, criteria.PageSize);
            var communicationTools = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true);
            var bytes = excelService.ExportPICAssignment(assignments, groupAssignmentCommunications, communicationTools, isRenderPicManagement);
            return File(bytes, MimeType.XLSX, $"{ViewResources.PICAssignment}.xlsx");
        }

        private static IEnumerable<PICAssignmentInfo> GeneratePicList(IEnumerable<PICAssignmentInfo> assignments
            , int? pageIndex, int? pageSize)
        {
            foreach (var assignment in assignments)
            {
                if (!string.IsNullOrWhiteSpace(assignment.PIC))
                {
                    var listPic = XMLIO.Deserialize<PicModel>(assignment.PIC);
                    assignment.PicList = listPic.OrderBy(p => p.Order).ThenBy(a => a.RoleId).ThenBy(r => r.PicName).ToList();
                    assignment.PicForMapping = listPic.Any() ? string.Join(",", listPic.Select(pic => pic.PicId)) : string.Empty;
                }

                if (!string.IsNullOrWhiteSpace(assignment.DefaultPIC))
                {
                    assignment.DefaultPicList = XMLIO.Deserialize<PicModel>(assignment.DefaultPIC);
                }
            }

            var data = assignments
                .OrderBy(i => i.HeadlineName, StringComparer.Ordinal)
                .ThenByDescending(p => p.PicList?.Count)
                .ThenBy(p => p.PicList != null)
                .ThenBy(o => o.PicForMapping)
                .ThenBy(i => i.DirectAccount, StringComparer.Ordinal);

            var results = data.OrderBy(i => i.HeadlineID == 0).ToList();
            for (int i = 0; i < results.Count; i++)
            {
                results[i].RowNum = (pageIndex != null && pageSize != null) ? i + ((pageIndex - 1) * pageSize) : i;
            }

            return results;
        }
    }
}