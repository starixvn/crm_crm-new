namespace CRM.Models.Setting;

using System;
using System.Collections.Generic;

[Serializable]
public class SiteInfo : BaseModel
{
    public bool IsLicensee { get; set; }

    public bool IsActive { get; set; }

    public string SiteLabel { get; set; }

    public List<SiteInfo> ChildSites { get; set; }
}