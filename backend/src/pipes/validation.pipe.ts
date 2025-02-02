import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exeptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!metadata.metatype || !metadata.metatype.prototype) {
            return value
        }
        const obj = plainToInstance(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            let messages = errors.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(messages)
        }
        return value
    }
}
