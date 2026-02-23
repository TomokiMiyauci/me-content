export function ns<T extends string>(
  first: T,
): <U extends string>(b: U) => `${T}${U}` {
  return <U extends string>(last: U) => {
    return `${first}${last}`;
  };
}
