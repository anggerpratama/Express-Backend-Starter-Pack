import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

function Match(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'match',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} must match ${relatedPropertyName}`;
                },
            },
        });
    };
}

export class UserDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    nik!: string;

    @IsString()
    @IsOptional()
    nip!: string | null;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty({ message: "Password confirm is required" })
    @Match('password', { message: "Password confirm must match password" })
    passwordConfirm?: string;

    @IsString()
    @IsOptional()
    profilePicture?: string | null;

    @IsBoolean()
    @IsNotEmpty()
    status!: boolean;

    @IsString()
    @IsNotEmpty()
    roleId!: string;
}