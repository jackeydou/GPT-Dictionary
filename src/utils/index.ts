export const newLineReg = /^\s+|\s+$/g;

export function removeNewlines(str: string) {
  return str.replace(newLineReg, '');
}
