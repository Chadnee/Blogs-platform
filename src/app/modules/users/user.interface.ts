export type TUser = {
    Id : string;
    password:string;
    needsChangePassword:boolean;
    email:string;
    role: "Author" | "Admin";
    status:"In-progress" | "Blocked";
    isDeleted: boolean

}