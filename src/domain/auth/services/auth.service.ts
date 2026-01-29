import * as bcrypt from 'bcrypt'
import sessionConfig from '../../../config/cache';

import { injectable } from "tsyringe";
import { UserRepository } from "../../users/repositories/user.repository";
import { UserLoginDto } from "../dtos/user-login.dto";
import { NotFoundError } from "../../../infrastructure/errors/NotFoundError";
import { BadRequestError } from "../../../infrastructure/errors/BadRequestError";
import { GenerateRandomString } from '../../../infrastructure/functions/generate-random-string';
import { UserLoginFactory } from '../factories/user-login.factory';
import { UnauthorizedAppError } from '../../../infrastructure/errors/UnauthorizedAppError';

@injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async login(data : UserLoginDto) {
        
        let user = await this.userRepository.findByParamsWIRole({email: data.username})

        if (user == null) throw new UnauthorizedAppError("User tidak ditemukan")

        if (user.status != true) throw new BadRequestError("User tidak aktif, silahkan kontak admin")

        // check password
        let checkPassword = await bcrypt.compare(data.password , user.password)
        if (!checkPassword) {
            throw new BadRequestError("Password tidak sesuai , coba lagi")
        }

        if (user.expiredSessionTime && user.expiredSessionTime >= new Date()) {
            user.lastLogin = new Date();
        } else {
            user.sessionId = btoa(`${user.id}:${GenerateRandomString(10)}:${sessionConfig.session_key}:${Date.now()}`);
            user.expiredSessionTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
            user.lastLogin = new Date();
        }

        
        await this.userRepository.update(user.id, user);
        
        return UserLoginFactory(user);

    }
}