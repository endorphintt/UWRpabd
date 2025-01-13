import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
import * as mime from 'mime-types'

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const extension = mime.extension(file.mimetype) || 'jpg'
            const fileName = uuid.v4() + '.' + extension
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException(
                'fetching error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
