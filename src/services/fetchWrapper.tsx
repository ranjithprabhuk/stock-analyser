export async function fetchWrapper(requestUrl: RequestInfo | URL, request?: RequestInit): Promise<any> {
  return await fetch(requestUrl, request)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
