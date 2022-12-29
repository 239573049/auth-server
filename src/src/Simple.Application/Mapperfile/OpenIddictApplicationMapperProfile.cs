using AutoMapper;
using Simple.Application.Contract.OpenIddict.Dto;
using Volo.Abp.OpenIddict.Applications;

namespace Simple.Application.Mapperfile;

public class OpenIddictApplicationMapperProfile : Profile
{
    public OpenIddictApplicationMapperProfile()
    {
        CreateMap<OpenIddictApplication, OpenIddictApplicationDto>();
    }
}