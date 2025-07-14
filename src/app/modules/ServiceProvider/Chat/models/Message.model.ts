export interface Message {
    Id: number,
    ServiceProviderId: string,
    ClientId: string,
    ChatId: number,
    Comment: string,
    CommentDate: Date,
    IsSenderClient: boolean,
    CategoryServicesId: number
}