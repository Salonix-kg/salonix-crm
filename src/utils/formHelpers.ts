export const mustBeAtLeast = (fieldName: string, character = 2) =>
  `${fieldName} должно быть не менее ${character} символов`;

export const mustBeAtMost = (fieldName: string, character = 20) =>
  `${fieldName} должно быть не более ${character} символов`;

export const required = (fieldName?: string) =>
  fieldName ? `${fieldName} обязательно` : 'Обязательное поле';

export const incorrectFormat = 'Некорректный формат';
