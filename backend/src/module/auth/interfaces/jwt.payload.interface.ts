import { UserRole } from "src/common/enums/userRole.enum";

export  interface JwtPayload {
    id:string;
    email:string;
    role: UserRole
}