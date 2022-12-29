export interface EntityDto<TKey> {
    id: TKey;
}

export interface FullAuditedAggregateRoot<TKey> {
    isDeleted: boolean;
    deleterId: string | null;
    deletionTime: string | null;
}
