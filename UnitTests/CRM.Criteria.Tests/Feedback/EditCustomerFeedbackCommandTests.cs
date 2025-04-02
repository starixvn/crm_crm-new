namespace CRM.Criteria.Tests.Feedback;

using System.Collections.Generic;
using AutoFixture;
using CRM.Criteria.Feedback;
using CRM.Models.Feedback;
using Extensions.XML;
using Xunit;

public class EditCustomerFeedbackCommandTests
{
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var command = new EditCustomerFeedbackCommand();
        var expected = "Acc_CRM_FeedbackInfoUpd";

        // Act
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var command = new EditCustomerFeedbackCommand();

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var categories = fixture.Create<IEnumerable<CategorySubCategorySetting>>();
        var command = new EditCustomerFeedbackCommand
        {
            FeedbackId = 1,
            CommunicationToolIds = "1,2",
            LanguageId = 1,
            Categories = categories
        };

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
        var command = new EditCustomerFeedbackCommand();

        // Assert
        Assert.Empty(command.CategoryXml);
    }

    [Fact]
    public void CategoryXml_CategoriesHaveData_ReturnAsExpected()
    {
        // Arrange
        var categories = fixture.Create<IEnumerable<CategorySubCategorySetting>>();

        // Act
        var command = new EditCustomerFeedbackCommand
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
        var command = new EditCustomerFeedbackCommand();

        // Assert
        Assert.Empty(command.ProductXml);
    }

    [Fact]
    public void ProductXml_ProductsHaveData_ReturnAsExpected()
    {
        // Arrange
        var products = fixture.Create<IEnumerable<ProductSubProductBettypeSetting>>();

        // Act
        var command = new EditCustomerFeedbackCommand
        {
            Products = products
        };

        // Assert
        Assert.Equal(products.ToXML("ROOT").ToString(), command.ProductXml);
    }
}