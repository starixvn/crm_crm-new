FROM hub.nexdev.net/base/dotnet/core/sdk:6.0-alpine AS builder

WORKDIR /src

COPY ["nuget.config", "."]
COPY ["CRM.Letstalk.Webhook/CRM.BotService.Endpoint.csproj", "CRM.Letstalk.Webhook/"]
COPY ["CRM.Letstalk.Client/CRM.Letstalk.Client.csproj", "CRM.Letstalk.Client/"]
COPY ["CRM.Letstalk.Core/CRM.BotService.Core.csproj", "CRM.Letstalk.Core/"]
COPY ["CRM.Core/CRM.Core.csproj", "CRM.Core/"]
COPY ["CRM.Resources/CRM.Resources.csproj", "CRM.Resources/"]
COPY ["CRM.Models/CRM.Models.csproj", "CRM.Models/"]

RUN dotnet restore "CRM.Letstalk.Webhook/CRM.BotService.Endpoint.csproj"

COPY . .

WORKDIR "/src/CRM.Letstalk.Webhook"

RUN dotnet publish -r linux-x64 --self-contained false -o /app

FROM hub.nexdev.net/base/dotnet/core/aspnet:6.0-alpine AS base

WORKDIR /app

COPY --from=builder /app .
ENV TZ="America/La_Paz"

ENTRYPOINT ["dotnet", "CRM.BotService.Endpoint.dll"]