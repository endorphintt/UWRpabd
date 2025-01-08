import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @IsEmail({}, { message: 'uncorrect email' })
    readonly email: string
    @IsString({ message: 'have to be a string value' })
    @Length(8, 40, { message: 'min 8 letters' })
    readonly password: string
    @IsString({ message: 'have to be a string value' })
    readonly name: string
}
