import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const now = new Date();
          return value.toISOString() <= now.toISOString();
        },
        defaultMessage() {
          return 'Date must not be in the future';
        },
      },
    });
  };
}
