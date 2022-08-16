FROM hub.nexdev.net/base/dotnet/core/sdk:6.0-alpine AS builder

WORKDIR /src

COPY ["CRM.Website/CRM.Website.csproj", "CRM.Website/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]
COPY ["CRM.Services/CRM.Services.csproj", "CRM.Services/"]
COPY ["CRM.Repositories/CRM.Repositories.csproj", "CRM.Repositories/"]
COPY ["CRM.Models/CRM.Models.csproj", "CRM.Models/"]
COPY ["CRM.Criteria/CRM.Criteria.csproj", "CRM.Criteria/"]
COPY ["CRM.Letstalk.Client/CRM.Letstalk.Client.csproj", "CRM.Letstalk.Client/"]
COPY ["CRM.ViewModel/CRM.ViewModels.csproj", "CRM.ViewModel/"]
COPY ["CRM.Controllers/CRM.Controllers.csproj", "CRM.Controllers/"]
COPY ["nuget.config", ""]

RUN dotnet restore "CRM.Website/CRM.Website.csproj"

COPY . .

WORKDIR "/src/CRM.Website"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM hub.nexdev.net/base/dotnet/core/aspnet:6.0-final AS base

WORKDIR /app

COPY --from=builder /app .
ENV TZ="America/La_Paz"

# install System.Drawing native dependencies
RUN apt-get update \
    && apt-get install -y --allow-unauthenticated \
        libc6-dev \
        libgdiplus \
        libx11-dev \
     && rm -rf /var/lib/apt/lists/* 

ENTRYPOINT ["dotnet", "CRM.Website.dll"]