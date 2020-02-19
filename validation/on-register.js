import Validator from 'validator'
import { isEmpty } from './is-empty'

export const validateRegisterInput = (data) => {
    let errors = {};

    data.names = !isEmpty(data.names) ? data.names : '';
    data.surname = !isEmpty(data.surname) ? data.surname : '';
    data.identityDocumentNumber = !isEmpty(data.identityDocumentNumber) ? data.identityDocumentNumber : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    if (!Validator.isLength(data.names, { min: 2, max: 30 })) {
        errors.names = 'Debe ser entre 2 y 30 caracteres';
    }

    if (!Validator.isLength(data.surname, { min: 2, max: 30 })) {
        errors.surname = 'Debe ser entre 2 y 30 caracteres';
    }
    if (Validator.isEmpty(data.names)) {
        errors.names = 'Nombres  son requeridos';
    }
    if (Validator.isEmpty(data.surname)) {
        errors.surname = 'Apellidos  son requeridos';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email es requerido';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email es invalido';
    }
    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'Numero de telefono es requerido';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};