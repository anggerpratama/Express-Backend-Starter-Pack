import { UserEntity } from "../../users/entities/user.entity";

export const UserLoginFactory = (data: UserEntity) => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        lastLogin: data.lastLogin,
        expiredSessionTime: data.expiredSessionTime,
        sessionId: data.sessionId,
        status: data.status,
    }
}