export const getAvatarUrl = (value: File | string | null) => {
  if (value instanceof File) {
    return URL.createObjectURL(value);
  } else if (typeof value === 'string') {
    return value;
  }
  return '';
};
