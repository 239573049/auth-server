import { FullAuditedAggregateRoot } from "./EntityDto";
import { PagedRequestDto } from "./PagedRequestDto";

export class OpenIddictApplication implements FullAuditedAggregateRoot<string> {
    isDeleted: boolean = false;
    deleterId: string | null | undefined;
    deletionTime: string | null | undefined;
    clientId: string | null | undefined;
    clientSecret: string | null | undefined;
    consentType: string | null | undefined;
    displayName: string| null| undefined;;
    displayNames: string| null| undefined;;
    permissions: string| null| undefined;;
    postLogoutRedirectUris: string| null| undefined;;
    properties: string| null| undefined;;
    redirectUris: string| null| undefined;;
    requirements: string| null| undefined;;
    type: string| null| undefined;;
    clientUri: string| null| undefined;;
    logoUri: string| null| undefined;;
}

export interface GetOpenIddictListInput extends PagedRequestDto {
    keywords: string;
}