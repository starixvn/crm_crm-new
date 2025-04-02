namespace CRM.Services.Redemption;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.Redemption;
using CRM.Models.Redemption;
using Interfaces;

public interface IRedemptionService
{
    Task<IEnumerable<CustomerLogInfo>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria);
    Task<LogInfo> GetLogByIdAsync(int id);
}

public class RedemptionService(IBaseService baseService, ICommonService commonService) : IRedemptionService
{
    public async Task<IEnumerable<CustomerLogInfo>> GetLogsByCustomerIdAsync(GetLogsByCustomerIdCriteria criteria)
    {
        criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        var customerLogInfo = await baseService.GetDataAsync<CustomerLogInfo>(criteria);
        foreach (var customerLog in customerLogInfo)
        {
            customerLog.ClaimTime = commonService.ConvertToClientDateTime(customerLog.ClaimTime);
        }
           
        return customerLogInfo;
    }

    public async Task<LogInfo> GetLogByIdAsync(int id)
    {
        LogInfo redemptionLogInfo = null;
        var criteria = new GetLogByIdCriteria { Id = id };
        var redemptionLog = await baseService.GetDataAsync<LogInfo>(criteria);
        if (redemptionLog.Any())
        {
            redemptionLogInfo = redemptionLog.First();
            redemptionLogInfo.ClaimTime = commonService.ConvertToClientDateTime(redemptionLogInfo.ClaimTime);
        }

        return redemptionLogInfo;
    }
}