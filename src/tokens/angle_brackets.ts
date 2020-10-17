export const open = "<";
export const close = ">";

export function enclose(tokens: string | readonly string[]): readonly string[] {
  const normalizedTokens = typeof tokens === "string" ? [tokens] : tokens;
  return [open, ...normalizedTokens, close];
}