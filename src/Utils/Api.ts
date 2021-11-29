export const apiUrl = "http://localhost:9000";

export const apiFetch = (
  path: string,
  method: "POST" | "GET",
  params: FormData,
  done: (data: string) => void,
  error?: (e: string) => void
) => {
  fetch(apiUrl + path, {
    method: method,
    body: method === "POST" ? params : undefined,
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        res
          .text()
          .then(done)
          .catch((e) => error && error(e));
      } else {
        error && error(res.status.toString());
      }
    })
    .catch((e) => error && error(e));
};
