import { API_URL } from "@/constants/Config";

interface Props {
  endpoint: string;
  parameters?: any;
}

export default function useUrl({ endpoint, parameters }: Props) {
  const params = new URLSearchParams();

  if (parameters) {
    Object.keys(parameters).forEach((key: any) => {
      params.append(key, parameters[key]);
    });
  }

  return `${API_URL}${endpoint}?${params}`;
}
