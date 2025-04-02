
namespace CRM.Models.SMAPersonalMessage;

using System;
using Extensions.XML;

[Serializable]
[XMLName("Content")]
public class SMATemplate
{
    [XMLName("Value")]
    public string Content { get; set; }
}