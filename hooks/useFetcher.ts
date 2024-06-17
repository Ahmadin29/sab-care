import useUrl from "./useUrl";

export default async function useFetcher(endpoint: string, parameters?: any) {
  const headers = {
    Authorization: "API-TOKEN",
  };

  const url = useUrl({
    endpoint,
    parameters,
  });

  try {
    const res = await fetch(url, {
      headers,
    });
    const json = await res.json();

    return json;
  } catch (error: any) {
    console.error(error);

    return [null, error.status || "500"];
  }
}
