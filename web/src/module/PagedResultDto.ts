export interface PagedResultDto<T> extends ListResultDto<T> {
    totalCount: number;
}

export interface ListResult<T> {
    items: T[];
}
export interface ListResultDto<T> {
    items: T[];
}