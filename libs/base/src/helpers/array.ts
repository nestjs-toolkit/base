export function uniqueIds<T = any>(ids: ReadonlyArray<T>): T[] {
  const data = {};
  ids.forEach(id => {
    data[id.toString()] = id;
  });
  return Object.values(data);
}
