#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NuGet.Config", "."]
COPY ["src/Simple.AuthServer/Simple.AuthServer.csproj", "src/Simple.AuthServer/"]
COPY ["src/Simple.EntityFrameworkCore/Simple.EntityFrameworkCore.csproj", "src/Simple.EntityFrameworkCore/"]
COPY ["src/Simple.Domain/Simple.Domain.csproj", "src/Simple.Domain/"]
COPY ["src/Simple.Domain.Shared/Simple.Domain.Shared.csproj", "src/Simple.Domain.Shared/"]
RUN dotnet restore "src/Simple.AuthServer/Simple.AuthServer.csproj"
COPY . .
WORKDIR "/src/src/Simple.AuthServer"
RUN dotnet build "Simple.AuthServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Simple.AuthServer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Simple.AuthServer.dll"]