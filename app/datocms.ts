import { dataFallback } from "app/dataFallback";

export async function performRequest({
  query,
  variables = {},
  includeDrafts = false,
}: {
  query: string;
  variables?: object | undefined;
  includeDrafts?: boolean | undefined;
}) {
  const response = await fetch("https://graphql.datocms.com/", {
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
  });

  const responseBody = await response.json();

  if (!response.ok) return dataFallback;

  return responseBody;
}
