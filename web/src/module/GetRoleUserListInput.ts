import { PagedRequestDto } from "./PagedRequestDto";

export interface GetRoleUserListInput extends PagedRequestDto {
    keywords: string | null;
    roleId: string;
    loading:boolean;
}