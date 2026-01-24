import path from 'path'
import multer from 'multer'
import fs from 'fs'

export default class FileUploadMiddleware {
    public static readonly memoryLoader = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 2097152
        }
    })

    public static readonly excelFileLoader = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 10 * 1024 * 1024 // 10 MB for Excel files
        }
    })

    public static readonly uploadTmpFileDocumentEntryDiskLoader = multer({
        storage : multer.diskStorage({
            destination: (_req , _file, cb ) => {
                const dir = path.join(path.resolve('./') , './dist/public/_data_entry/' + _req.params._step + "/")
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir , {recursive : true})
                }
                cb(null, dir)
            },
            filename: (_req, _file, cb) => {
                const date = new Date()
                const setFileName = Math.floor(Math.random() * Date.now()).toString(36) + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getFullYear()
                cb( null,'DE_DOC_' + setFileName + '_' + path.extname(_file.originalname));
            }
        }),
        limits: {
            fileSize: 64 * 1024 * 1024, // 64 MByte
        },
    })

    public static readonly configBannerImageDiskLoader = multer({
        storage : multer.diskStorage({
            destination: (_req , _file, cb ) => {
                const dir = path.join(path.resolve('./') , './dist/public/config/banner-image/')
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir , {recursive : true})
                }
                cb(null, dir)
            },  
            filename: (_req, _file, cb) => {
                const date = new Date()
                const setFileName = Math.floor(Math.random() * Date.now()).toString(36) + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getFullYear()
                cb( null,'BANNER_IMAGE_' + setFileName + '_' + path.extname(_file.originalname));
            }
        }),
        limits: {
            fileSize: 64 * 1024 * 1024, // 64 MByte
        },
    })


}