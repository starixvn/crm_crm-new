namespace CRM.Services.UnitTests.Remark
{
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Remark;
    using CRM.Models.Remark;
    using CRM.Repositories;
    using CRM.Services.Remark;
    using NSubstitute;
    using Xunit;

    public class RemarkServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;
        private IRemarkRepository remarkRepository;

        [Fact]
        public async Task GetRemarkAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var remarks = fixture.Create<RemarkInfo>();
            var param = fixture.Create<GetRemarkCriteria>();
            var service = GetService();
            remarkRepository.GetRemarkAsync(param).Returns(remarks);

            // Act
            var actual = await service.GetRemarkAsync(param);

            //Assert
            Assert.Equal(remarks, actual);
        }

        [Fact]
        public void BuildRemarksXml_WithSpecialTrue_ChangeContent()
        {
            // Arrange
            var xmlContent = new StringBuilder();
            var remarks = new List<string>() { "test" };
            bool isSpecial = true;
            StringBuilder xmlContentExpected = new StringBuilder("<Remark Content=\"test\" IsSpecial=\"1\" />");

            // Act
            RemarkService.BuildRemarksXml(xmlContent, remarks, isSpecial);

            //Assert
            Assert.Equal(xmlContent.ToString(), xmlContentExpected.ToString());
        }

        [Fact]
        public void BuildRemarksXml_WithSpecialFalse_ChangeContent()
        {
            // Arrange
            var xmlContent = new StringBuilder();
            var remarks = new List<string>() { "test" };
            bool isSpecial = false;
            StringBuilder xmlContentExpected = new StringBuilder("<Remark Content=\"test\" IsSpecial=\"0\" />");

            // Act
            RemarkService.BuildRemarksXml(xmlContent, remarks, isSpecial);

            //Assert
            Assert.Equal(xmlContent.ToString(), xmlContentExpected.ToString());
        }

        [Fact]
        public async Task EditRemarkAsync_WhenCall_ReturnExpectedCommand()
        {
            //Arrange
            var commandResult = fixture.Create<CommandResult>();
            var service = GetService();
            var param = fixture.Create<EditRemarkCommand>();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditRemarkCommand>(x => param = x)).Returns(commandResult);

            //Act
            var actual = await service.EditRemarkAsync(param);

            //Assert
            Assert.Equal(commandResult, actual);
        }

        #region Helpers
        private RemarkService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            remarkRepository = Substitute.For<IRemarkRepository>();

            return new RemarkService(baseService, remarkRepository);
        }
        #endregion Helpers
    }
}
