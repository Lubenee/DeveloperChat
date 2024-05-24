export const fetchData = async (uri: string, options?: RequestInit) => {
  const response = await fetch(uri, options);
  if (!response.ok) {
    const err = await response.text();
    console.error("From Fetch Data: ", err);
    throw err;
  }
  return response;
};
