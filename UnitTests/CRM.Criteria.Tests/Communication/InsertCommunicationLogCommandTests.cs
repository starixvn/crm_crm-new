namespace CRM.Criteria.Tests.Communication
{
    using System.Collections.Generic;
    using AutoFixture;
    using CRM.Core.Extensions.XML;
    using CRM.Criteria.Communication;
    using CRM.Models.Feedback;
    using Xunit;

    public class InsertCommunicationLogCommandTests
    {
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            //Arrange
            var criteria = new InsertCommunicationLogCommand();
            var expected = "Acc_CRM_CommunicationLogIns";

            //Act
            var actual = criteria.GetSettingKey();

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            //Arrange
            var criteria = new InsertCommunicationLogCommand();

            //Act
            var actual = criteria.IsValid();

            //Assert
            Assert.True(actual);
        }

        [Fact]
        public void CategoryXml_CategoriesAreEmpty_ReturnEmpty()
        {
            // Arrange

            // Act
            var command = new InsertCommunicationLogCommand();

            // Assert
            Assert.Empty(command.CategoryXml);
        }

        [Fact]
        public void CategoryXml_CategoriesHaveData_ReturnAsExpected()
        {
            // Arrange
            var categories = fixture.Create<IEnumerable<CategorySubCategorySetting>>();

            // Act
            var command = new InsertCommunicationLogCommand
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
            var command = new InsertCommunicationLogCommand();

            // Assert
            Assert.Empty(command.ProductXml);
        }

        [Fact]
        public void ProductXml_ProductsHaveData_ReturnAsExpected()
        {
            // Arrange
            var products = fixture.Create<IEnumerable<ProductSubProductBettypeSetting>>();

            // Act
            var command = new InsertCommunicationLogCommand
            {
                Products = products
            };

            // Assert
            Assert.Equal(products.ToXML("ROOT").ToString(), command.ProductXml);
        }
    }
}
