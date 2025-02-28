namespace CRM.Models.Setting;

using System;
using System.Collections.Generic;

[Serializable]
public class Product : SettingRelation
{
    public string Name { get; set; }

    public int ParentId { get; set; }

    public int GrandParentId { get; set; }

    public IList<Product> ChildSettings { get; set; }
}