export const getNavFromIndex = (index: string) => {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const matches = index.matchAll(regex);
  let id = 1;
  const result = Array.from(matches, (match) => ({
    id: id++,
    name: match[1],
    path: match[2],
  }));
  return result;
};
