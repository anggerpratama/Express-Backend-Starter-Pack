
import * as fs from 'fs';
import path from 'path'

export class FileSystemService {

    public deleteFile(dir : string , filename : string) : void {
        const fullPath = path.join(path.resolve('./') , './dist/public/' + dir)

        const fileExists = fs.existsSync(fullPath + '/' + filename);
        if (fileExists) {
            fs.unlinkSync(fullPath + '/' + filename);
        }
    }

    public deleteFileOnDir(dir : string) : void {
        const fullPath = path.join(path.resolve('./') , './dist/public/' + dir)

        for (const file of fs.readdirSync(fullPath)) {
            const fileStat = fs.statSync(path.join(fullPath , file))
            if (fileStat.isDirectory()) {
                const fullNPath = path.join(fullPath , file)
                for (const nFile of fs.readdirSync(fullNPath)) {
                    fs.unlinkSync(fullNPath + '/' + nFile);
                }
            }else {
                fs.unlinkSync(fullPath + '/' + file);
            }
        }
    }

    public readAndCheckFileExist(dir : string , filename : string) : string | null {
        const fullPath = path.join(path.resolve('./') , './dist/public/' + dir)

        const fileLoc = path.join(fullPath + '/' + filename)

        const fileExists = fs.existsSync(fileLoc);
        if (fileExists) {
            return fileLoc
        }

        return null
    }

    public moveFile(oldDir : string , newDir: string) {

        const fullPathOld = path.join(path.resolve('./') , './dist/public/' + oldDir)
        const fullPathNew = path.join(path.resolve('./') , './dist/public/' + newDir)

        fs.mkdirSync(path.dirname(fullPathNew), { recursive: true });
        
        return fs.renameSync(fullPathOld , fullPathNew)

    }

}