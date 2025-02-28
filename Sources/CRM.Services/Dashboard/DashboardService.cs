namespace CRM.Services.Dashboard;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.Dashboard;
using CRM.Models.CommunicationLogs;
using CRM.Models.Dashboard;
using CRM.Models.Feedback;
using CRM.Models.Redemption;
using Interfaces;
using Models;

public interface IDashboardService
{
    Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria);
    Task<IEnumerable<CustomerLogInfo>> GetRedemptionLogsAsync(GetRedemptionLogsCriteria criteria);
    Task<IEnumerable<CommunicationLog>> GetCommunicationLogsAsync(GetCommunicationLogsCriteria criteria);
    Task<CustomerInfoVerify> GetCustomerInfoVerifyAsync(GetCustomerInfoVerifyCriteria criteria);
    Task<CommandResult> EditCustomerVerifyAsync(EditCustomerVerifyCommand command);
}

public class DashboardService(
    IBaseService baseService,
    ICommonService commonService)
    : IDashboardService
{
    public async Task<IEnumerable<string>> GetCustomerRemarksAsync(GetCustomerRemarksCriteria criteria)
    {
        return await baseService.GetDataAsync<string>(criteria);
    }

    public async Task<IEnumerable<CustomerLogInfo>> GetRedemptionLogsAsync(GetRedemptionLogsCriteria criteria)
    {
        var redemptionLogs = await baseService.GetDataAsync<CustomerLogInfo>(criteria);
        foreach (var redemptionLog in redemptionLogs)
        {
            redemptionLog.ClaimTime = commonService.ConvertToClientDateTime(redemptionLog.ClaimTime);
        }
        return redemptionLogs;
    }

    public async Task<IEnumerable<CommunicationLog>> GetCommunicationLogsAsync(GetCommunicationLogsCriteria criteria)
    {
        var (communicationLogs, settings) = await baseService.FetchMultipleAsync<CommunicationLog, FeedbackSettingRelation>(criteria);
        foreach (var communicationLog in communicationLogs)
        {
            communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
            communicationLog.Settings = settings.Where(x => x.FeedbackId == communicationLog.FeedbackId).ToList();
        }
        communicationLogs = communicationLogs.Where(x => x.Settings.Any());
        return communicationLogs;
    }

    public async Task<CustomerInfoVerify> GetCustomerInfoVerifyAsync(GetCustomerInfoVerifyCriteria criteria)
    {
        return await baseService.GetDataEntityAsync<CustomerInfoVerify>(criteria);
    }

    public async Task<CommandResult> EditCustomerVerifyAsync(EditCustomerVerifyCommand command)
    {
        return await baseService.ExecuteNonQueryAsync(command);
    }
}