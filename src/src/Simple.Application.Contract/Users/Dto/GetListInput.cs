namespace Simple.Application.Contract.Users.Dto;

public class GetListInput : PagedRequestDto
{
    public string? Keywords { get; set; }
}