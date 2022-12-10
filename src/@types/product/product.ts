export interface Iproduct {
    title: string;
    callback: Function;
    content: string;
    id?: string;
    authorId: string;
}

export interface IDelete {
    id: string;
    callback: Function;
}

export interface IUpdate {
    title: string;
    callback: Function;
    content: string;
    id?: string;
}
