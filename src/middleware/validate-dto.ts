import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ResponseBuilders } from "../infrastructure/responses/ResponseBuilders";

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // 1. Transform plain JSON to Class Instance
        const output = plainToInstance(dtoClass, req.body);

        // 2. Validate the instance
        const errors = await validate(output, {
            whitelist: true, // Strips properties that are not in the DTO
            forbidNonWhitelisted: true, // Throws error if extra properties are sent
        });

        if (errors.length > 0) {
            // 3. Format errors for the frontend
            const formatErrors = (validationErrors: ValidationError[], parentPath: string = ''): Array<{ path: string; msg: string }> => {
                const formattedErrors: Array<{ path: string; msg: string }> = [];

                for (const error of validationErrors) {
                    const currentPath = parentPath ? `${parentPath}.${error.property}` : error.property;

                    // Add errors for current property
                    if (error.constraints) {
                        for (const constraintMessage of Object.values(error.constraints)) {
                            formattedErrors.push({
                                path: currentPath,
                                msg: constraintMessage
                            });
                        }
                    }

                    // Recursively handle nested errors
                    if (error.children && error.children.length > 0) {
                        formattedErrors.push(...formatErrors(error.children, currentPath));
                    }
                }

                return formattedErrors;
            };

            const message = formatErrors(errors);

            return new ResponseBuilders().errorsMessage(res, "Validation failed", 400, message);
        }

        // 4. Replace req.body with the validated/transformed instance
        req.body = output;
        next();
    };
}