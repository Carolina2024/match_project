import { registerDecorator, ValidationOptions } from 'class-validator';
import { differenceInYears, parseISO } from 'date-fns';

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (!value) return false;

          const birthdate = parseISO(value);
          const age = differenceInYears(new Date(), birthdate);
          return age >= 18 && age <= 100;
        },
        defaultMessage(): string {
          return 'Debes tener al menos entre 18 años y 100 años para poder registrarte';
        },
      },
    });
  };
}
