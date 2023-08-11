export const fetcher = (url: any, sentData: any) => {
  fetch(process.env.REACT_APP_API + url, sentData).then((res) => res.json());
};
