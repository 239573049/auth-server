import { EntityDto } from "./EntityDto";
import { PagedRequestDto } from "./PagedRequestDto";

export interface UserInfoDto extends EntityDto<string> {
    userName: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    phoneNumber: string | null;
    isActive: boolean;
    twoFactorEnabled: boolean;
    avatar: string | null;
}

export interface GetListInput extends PagedRequestDto {
    keywords: string | null;
}