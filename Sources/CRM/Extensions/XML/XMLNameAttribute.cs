namespace CRM.Extensions.XML;

using System;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
public sealed class XMLNameAttribute(string name) : Attribute
{
    public string Name { get; } = name;
}