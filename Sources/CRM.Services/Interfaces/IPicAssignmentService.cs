namespace CRM.Services.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;

public interface IPicAssignmentService
{
    Task<Tuple<PicAssignmentValidation, IEnumerable<AssignedDirectAccount>>> ValidateAssignmentDirectAccountAsync(ValidateAssignmentCriteria criteria);

    Task<IEnumerable<SiteInfo>> GetSystemSiteAsync(GetSystemSiteCriteria criteria);
}