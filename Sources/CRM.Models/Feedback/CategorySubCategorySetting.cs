namespace CRM.Models.Feedback;

using System;
using Extensions.XML;

[Serializable]
[XMLName("Category")]
public class CategorySubCategorySetting
{
    [XMLName("MainCategoryID")]
    public int MainCategoryId { get; set; }

    [XMLName("SubCategoryID")]
    public int SubCategoryId { get; set; }
}