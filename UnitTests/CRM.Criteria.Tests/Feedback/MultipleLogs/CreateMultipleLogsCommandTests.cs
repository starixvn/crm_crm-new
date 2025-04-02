namespace CRM.Criteria.Tests.Feedback.MultipleLogs;

using System.Collections.Generic;
using AutoFixture;
using CRM.Criteria.Feedback.MultipleLogs;
using CRM.Models;
using CRM.Models.Feedback;
using CRM.Models.Feedback.MultipleLogs;
using Extensions.XML;
using Xunit;

public class CreateMultipleLogsCommandTests
{
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var command = new CreateMultipleLogsCommand();
        var expected = "Acc_CRM_NewManualFeedback_FeedbackIns_Multiple";

        // Act
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var command = new CreateMultipleLogsCommand();

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void CategoryXml_CategoriesAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var command = new CreateMultipleLogsCommand();

        // Assert
        Assert.Empty(command.CategoryXml);
    }

    [Fact]
    public void CategoryXml_CategoriesHaveData_ReturnAsExpected()
    {
        // Arrange
        var categories = fixture.Create<IEnumerable<CategorySubCategorySetting>>();

        // Act
        var command = new CreateMultipleLogsCommand
        {
            Categories = categories
        };

        // Assert
        Assert.Equal(categories.ToXML("ROOT").ToString(), command.CategoryXml);
    }

    [Fact]
    public void ProductXml_ProductsAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var command = new CreateMultipleLogsCommand();

        // Assert
        Assert.Empty(command.ProductXml);
    }

    [Fact]
    public void ProductXml_ProductsHaveData_ReturnAsExpected()
    {
        // Arrange
        var products = fixture.Create<IEnumerable<ProductSubProductBettypeSetting>>();

        // Act
        var command = new CreateMultipleLogsCommand
        {
            Products = products
        };

        // Assert
        Assert.Equal(products.ToXML("ROOT").ToString(), command.ProductXml);
    }

    [Fact]
    public void CustomerXml_CustomersAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var command = new CreateMultipleLogsCommand();

        // Assert
        Assert.Empty(command.CustomerXml);
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
        var customerXml = "<ROOT><Cust CustId='1' Username='SH5111001' /><Cust CustId='2' Username='SH5111002' /></ROOT>";

        // Act
        var command = new CreateMultipleLogsCommand
        {
            Customers = customers
        };

        // Assert
        Assert.Equal(customerXml, command.CustomerXml);
    }

    [Fact]
    public void RelatedCustomerXml_RelatedCustomersAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var command = new CreateMultipleLogsCommand();

        // Assert
        Assert.Empty(command.RelatedCustomerXml);
    }

    [Fact]
    public void RelatedCustomerXml_RelatedCustomersHaveData_ReturnAsExpected()
    {
        // Arrange
        var relatedCustomers = fixture.Create<IEnumerable<VerifyRelatedCustomerResult>>();

        // Act
        var command = new CreateMultipleLogsCommand
        {
            RelatedCustomers = relatedCustomers
        };

        // Assert
        Assert.Equal(relatedCustomers.ToXML("ROOT").ToString(), command.RelatedCustomerXml);
    }
}