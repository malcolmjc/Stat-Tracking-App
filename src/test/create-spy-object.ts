export function createSpyObject<T>(keys: (keyof T)[]): SpyObject<T> {
  return keys.reduce((spy, key) => {
    (spy[key] as any) = jest.fn();
    return spy;
  }, {} as SpyObject<T>);
}
