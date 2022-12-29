namespace Simple.Application.Contract.OpenIddict.Dto;

public class GetOpenIddictListInput : PagedRequestDto
{
    public string? Keywords { get; set; }
}