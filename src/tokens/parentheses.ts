export const open = "(";
export const close = ")";

export function enclose(...tokens: readonly string[]): readonly string[] {
  return [open, ...tokens, close];
}