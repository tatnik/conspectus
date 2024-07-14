export const getFile = async (fileName: string) => {
  const data = { text: '', err: '' };
  try {
    const doc = await import(`../markdown${fileName}`);
    const res = await fetch(doc.default);
    data.text = await res.text();
  } catch (error) {
    data.err = (error as Error).message;
  }
  return data;
};

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

export const getImgName = (mdPath: string) => 'conspectus/jpg/md' + mdPath + '-220.jpg';
