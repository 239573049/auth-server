using AutoMapper;
using Simple.Application.Contract.Permissions.Dto;
using Volo.Abp.PermissionManagement;

namespace Simple.Application.Mapperfile;

public class PermissionMapperProfile : Profile
{
    public PermissionMapperProfile()
    {
        CreateMap<PermissionWithGrantedProviders, PermissionWithGrantedDto>();
    }
}