import i18next from 'i18next';

// The functions in this module can be used to construct custom error messages for input validation.
export const onlyNumber = (t?: string): string =>
  t
    ? `${t} xanası yalnız rəqəmlərdən ibarət olmalıdır`
    : i18next.t('onlyDigitsField');

export const shouldContainNumber = (t?: string): string =>
  t ? `${t} xanasına rəqəm daxil olmalıdır` : `Bu xanaya rəqəm daxil olmalıdır`;

export const shouldContainLowerCase = (t?: string): string =>
  t
    ? `${t} xanasına kiçik hərf daxil olmalıdır`
    : `Bu xanaya kiçik hərf daxil olmalıdır`;

export const shouldContainUpperCase = (t?: string): string =>
  t
    ? `${t} xanasına böyük hərf daxil olmalıdır`
    : `Bu xanaya  böyük hərf daxil olmalıdır`;

export const shouldContainSpecialChar = (t?: string): string =>
  t
    ? `${t} xanasına xüsusi simvol daxil olmalıdır`
    : `Bu xanaya xüsusi simvol daxil olmalıdır`;

export const inputValidationText = (t?: string): string =>
  t ? `${t} xanasının daxil edilməsi məcburidir` : i18next.t('required');
export const minLengthCheck = (t: string, l: string): string =>
  `${t} Xanası ən azı ${l} xarakterdən ibarət olmalıdır`;
export const maxLengthCheck = (t: string, l: string): string =>
  `${t} Xanası ən çox ${l} xarakter olmalıdır`;

export const strongPasswordValidationText = (t?: string): string =>
  t
    ? `${t} xanasının ən az 8 simvol olmalıdır və daxilində ən az bir böyük hərif, kiçik hərif, xüsusi simvol və rəqəm olmalıdır`
    : `Şifrə xanasının ən az 8 simvol olmalıdır və daxilində ən az bir böyük hərif, kiçik hərif, xüsusi simvol və rəqəm olmalıdır`;
