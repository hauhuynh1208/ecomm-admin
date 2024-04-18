export const callAPI = async (url: string, options: Object): Promise<any> => {
  const res = await fetch(`${process.env.API_ENDPOINT}` + url, options);
  return res.json();
};
