declare type SpyObject<T> = Partial<Record<keyof T, jest.Mock<any>>>;

declare function createSpyObject<T>(keys: (keyof T)[]): SpyObject<T>;
