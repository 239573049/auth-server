using Volo.Abp.Application.Dtos;

namespace Simple.Application.Contract.OpenIddict.Dto;

/// <summary>
/// 编辑应用程序模型
/// </summary>
public class OpenIddictApplicationInput : EntityDto<Guid>
{
    /// <summary>
    /// Gets or sets the client identifier associated with the current application.
    /// </summary>
    public string ClientId { get; set; }

    /// <summary>
    /// Gets or sets the consent type associated with the current application.
    /// </summary>
    public string ConsentType { get; set; }

    /// <summary>
    /// Gets or sets the display name associated with the current application.
    /// </summary>
    public string? DisplayName { get; set; }

    /// <summary>
    /// Gets or sets the localized display names
    /// associated with the current application,
    /// serialized as a JSON object.
    /// </summary>
    public string? DisplayNames { get; set; }

    /// <summary>
    /// Gets or sets the permissions associated with the
    /// current application, serialized as a JSON array.
    /// </summary>
    public string? Permissions { get; set; }

    /// <summary>
    /// Gets or sets the application type associated with the current application.
    /// </summary>
    public string? Type { get; set; }

    /// <summary>URI to further information about client.</summary>
    public string? ClientUri { get; set; }

    /// <summary>URI to client logo.</summary>
    public string? LogoUri { get; set; }
}