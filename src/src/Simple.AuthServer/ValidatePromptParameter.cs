using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using OpenIddict.Abstractions;
using OpenIddict.Server;

namespace Simple;

public class ValidatePromptParameter : 
        IOpenIddictServerHandler<OpenIddictServerEvents.ValidateAuthorizationRequestContext>
{
    public static OpenIddictServerHandlerDescriptor Descriptor { get; }
        = OpenIddictServerHandlerDescriptor.CreateBuilder<OpenIddictServerEvents.ValidateAuthorizationRequestContext>()
            .UseSingletonHandler<ValidatePromptParameter>()
            .SetOrder(OpenIddictServerHandlers.Authentication.ValidateNonceParameter.Descriptor.Order + 1_000)
            .SetType(OpenIddictServerHandlerType.BuiltIn)
            .Build();

    /// <inheritdoc/>
    public ValueTask HandleAsync(OpenIddictServerEvents.ValidateAuthorizationRequestContext context)
    {
        if (context is null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        // Reject requests specifying prompt=none with consent/login or select_account.
        if (context.Request.HasPrompt(OpenIddictConstants.Prompts.None) &&
            (context.Request.HasPrompt(OpenIddictConstants.Prompts.Consent) ||
             context.Request.HasPrompt(OpenIddictConstants.Prompts.Login) ||
             context.Request.HasPrompt(OpenIddictConstants.Prompts.SelectAccount)))
        {
            return default;
        }

        return default;
    }
}