export interface IRegister {
    name: string;
    email: string;
    password: string;
    callback: Function;
}

export interface ILogin {
    email: string;
    password: string;
    callback: Function;
}
