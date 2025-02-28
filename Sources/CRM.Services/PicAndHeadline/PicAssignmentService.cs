namespace CRM.Services.PicAndHeadline;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Interfaces;

public class PicAssignmentService(IBaseService baseService) : IPicAssignmentService
{
    public async Task<Tuple<PicAssignmentValidation, IEnumerable<AssignedDirectAccount>>> ValidateAssignmentDirectAccountAsync(ValidateAssignmentCriteria criteria)
    {
        var tuples = await baseService.FetchMultipleAsync<PicAssignmentValidation, AssignedDirectAccount>(criteria);
        return new Tuple<PicAssignmentValidation, IEnumerable<AssignedDirectAccount>>(tuples.Item1.FirstOrDefault(), tuples.Item2);
    }

    public async Task<IEnumerable<SiteInfo>> GetSystemSiteAsync(GetSystemSiteCriteria criteria)
    {
        return await baseService.GetDataAsync<SiteInfo>(criteria);
    }
}