export const question = "?";

export function emit(nullable?: boolean) {
  if (nullable) return [question];
  else return [];
}