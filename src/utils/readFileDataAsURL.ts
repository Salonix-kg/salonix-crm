export const readFileAsDataURL = (
  file: File | string,
): Promise<string> | string => {
  if (typeof file === 'string') {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
