import auth from "../config/auth";

import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../infrastructure/errors/BadRequestError";
import { container } from "tsyringe";
import { UserRepository } from "../domain/users/repositories/user.repository";
import { UnauthorizedAppError } from "../infrastructure/errors/UnauthorizedAppError";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { MenuEntity } from "../domain/master-data/menus/entities/menu.entity";
import { MenuRepository } from "../domain/master-data/menus/repositories/menu.repository";
import { RolesMenusEntity } from "../domain/master-data/roles/entities/role-menus.entity";
import { ResponseBuilders } from "../infrastructure/responses/ResponseBuilders";


export const tokenVerify = async (req : any , res: Response , next : NextFunction) => {

    const userRepository = container.resolve(UserRepository)
    const menuRepository = container.resolve(MenuRepository)
    
    try {

        const token = req.header('Authorization').replace('Bearer ' , '')

        if (token == null) {
            throw new BadRequestError("Invalid Token Request")
        }

        // check if token is static signature
        if (token == auth.static_token) {
            next()
        }

        // check token for existing user data (Logged users)
        let findUserToken = await userRepository.findByParamsWIRole({sessionId : token})

        if(findUserToken == null) {
            throw new UnauthorizedAppError("Token tidak ditemukan, silahkan login kembali")
        }
        const findUserRole = findUserToken.role
        if (findUserRole == null) {
            throw new UnauthorizedAppError("Hak Akses User belum di tentukan")
        }

        // check user access menu
        const requestSegments : string[] = req.path.split('/')
        
        const whiteList = [
            '/app-settings'
        ]
        const whiteListSegment = [
            'notifications',
            'public-auth'
        ]
        if (!whiteList.includes(req.path) && !whiteListSegment.includes(requestSegments[1])) {
            // check for tenant urls
            if (requestSegments.includes('backoffice')) {
                // check the user have tenant role
                if (findUserRole.isAdmin != true) {
                    throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-T-1]")
                }
            }
            // check for backoffice urls protected by access menus
            let dataMenu : MenuEntity | null = null
            let increaseSegmentUrl = 1
            let setUrl = '/' + requestSegments[increaseSegmentUrl]
            
            // note : checker for increaseSegmentUrl < 10 for limmiting when caused invinite loop
            while (dataMenu == null && increaseSegmentUrl < 10) {
                dataMenu = await menuRepository.findMasterMenuByApiUrl(setUrl)
                setUrl += '/' + requestSegments[++increaseSegmentUrl]
            }
            if (dataMenu == null) throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-1]")
            let userAccess = findUserRole.roleMenus.find(mns => mns.menuId === dataMenu.id) as RolesMenusEntity
        
            if (userAccess == null) throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-2]")
            if (userAccess.action == null) throw new UnauthorizedAppError("User access Action tidak ditemukan")
            // check access on action
            
            if ((req.method == "POST") && !userAccess.action.includes("Create") ) {
                throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-3]")
            }

            if ((req.method == "PUT") && !userAccess.action.includes("Update") ) {
                throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-4]")
            }

            if ((req.method == "DELETE" || req.method == "PATCH") && !userAccess.action.includes("Delete") ) {
                throw new UnauthorizedAppError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-5]")
            }

        }
        
        req.token = findUserToken

        next() 

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            if (error.name == "TokenExpiredError") {
                return new ResponseBuilders().errorsMessage(res , "Token sudah hangus, silahkan login kembali" , 401 , error)  
            }
        }
        if (error instanceof NotFoundError) {
            return new ResponseBuilders().errorsMessage(res , error.message , error.status , error)  
        }
        return new ResponseBuilders().errorsMessage(res , "Hak akses ditolak, silahkan login terlebih dahulu" , 401 , error)
    }
}