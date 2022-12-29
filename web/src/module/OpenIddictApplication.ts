import { FullAuditedAggregateRoot } from "./EntityDto";
import { PagedRequestDto } from "./PagedRequestDto";

export interface OpenIddictApplication extends FullAuditedAggregateRoot<string> {
    clientId: string;
    clientSecret: string;
    consentType: string;
    displayName: string;
    displayNames: string;
    permissions: string;
    postLogoutRedirectUris: string;
    properties: string;
    redirectUris: string;
    requirements: string;
    type: string;
    clientUri: string;
    logoUri: string;
}

export interface GetOpenIddictListInput extends PagedRequestDto {
    keywords: string;
}