using AutoMapper;
using Simple.Application.Contract.Users.Dto;
using Simple.Users;
using Volo.Abp.Identity;

namespace Simple.Application.Mapperfile;

public class UserInfoMapperProfile : Profile
{
    public UserInfoMapperProfile()
    {
        CreateMap<IdentityUser, UserInfoDto>()
            .ForPath(x => x.Avatar, x => x.MapFrom(opt => opt.ExtraProperties.GetOrDefault("Avatar")));

        CreateMap<UserInfoDto,IdentityUser>();

    }
}