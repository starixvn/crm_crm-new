namespace CRM.Models.PicAndHeadline;

using System.Collections.Generic;

public class PicOfDirectAccount
{
    public IEnumerable<PicModel> Pic { get; set; }

    public IEnumerable<DirectAccountInfo> DirectAccounts { get; set; }
}