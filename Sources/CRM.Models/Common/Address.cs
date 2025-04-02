using System.Collections.Generic;

namespace CRM.Models.Common;

public class Address
{
    public List<string> LineList { get; set; }

    public Country Country { get; set; }

    public string City { get; set; }

    public string State { get; set; }

    public string PostCode { get; set; }
}