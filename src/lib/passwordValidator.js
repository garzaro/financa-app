
const MIN_PASSWORD_LENGTH = 8;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

const validators = {
  minLength: ( pwd ) => pwd.length >= MIN_PASSWORD_LENGTH,
  hasUpperCase: ( pwd ) => /[A-Z]/.test( pwd ),
  hasLowerCase: ( pwd ) => /[a-z]/.test( pwd ),
  hasNumber: ( pwd ) => /\d/.test( pwd ),
  hasSpecialChar: ( pwd ) => SPECIAL_CHAR_REGEX.test( pwd ),
}

export const validarCriterioSenha = ( password ) =>
  Object.fromEntries(
    Object.entries( validators )
  )