import parsePhoneNumberFromString from 'libphonenumber-js';

export const phoneNumberFormatter = (phoneNumber: string) => {
  const phone = parsePhoneNumberFromString(phoneNumber, 'KG');

  return phone ? phone.formatInternational() : null;
};
