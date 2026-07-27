export const safeFormat = (value: any, options?: Intl.NumberFormatOptions): string => {
  if (value === undefined || value === null || value === '') {
    return '0';
  }
  const num = Number(value);
  if (isNaN(num)) {
    return '0';
  }
  return num.toLocaleString('en-US', options);
};
