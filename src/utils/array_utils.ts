export function isTruthy<T>(array: T[] | undefined): array is T[] {
  return (array != null && array.length !== 0);
}

export function isFalsy<T>(array: T[] | undefined): array is undefined {
  return !isTruthy(array);
}

function emptyFactory<T>(): <T>() => readonly T[] {
  return () => [];
}

export const empty = emptyFactory();

export function isLastIndex<T>(array: T[], index: number) {
  return array.length - 1 === index;
}