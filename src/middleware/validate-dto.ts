import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

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
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      
      return res.status(400).json({ errors: message });
    }

    // 4. Replace req.body with the validated/transformed instance
    req.body = output;
    next();
  };
}