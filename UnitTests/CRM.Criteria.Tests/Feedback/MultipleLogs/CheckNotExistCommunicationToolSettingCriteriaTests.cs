namespace CRM.Criteria.Tests.Feedback.MultipleLogs;

using System.Collections.Generic;
using CRM.Criteria.Feedback.MultipleLogs;
using CRM.Models;
using Xunit;

public class CheckNotExistCommunicationToolSettingCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new CheckNotExistCommunicationToolSettingCriteria();
        var expected = "Acc_CRM_GuestFeedbackCheck_Multiple";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new CheckNotExistCommunicationToolSettingCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void CustomerXml_CustomersAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var criteria = new CheckNotExistCommunicationToolSettingCriteria();

        // Assert
        Assert.Empty(criteria.CustomerXml);
    }

    [Fact]
    public void CustomerXml_CustomersHaveData_ReturnAsExpected()
    {
        // Arrange
        var customers = new List<BaseModel>
        {
            new() { Id = 1, Name = "SH5111001" },
            new() { Id = 2, Name = "SH5111002" }
        };
        var customerXml = "<ROOT><Cust CustID='1' Username='SH5111001' /><Cust CustID='2' Username='SH5111002' /></ROOT>";

        // Act
        var criteria = new CheckNotExistCommunicationToolSettingCriteria
        {
            Customers = customers
        };

        // Assert
        Assert.Equal(customerXml, criteria.CustomerXml);
    }
}