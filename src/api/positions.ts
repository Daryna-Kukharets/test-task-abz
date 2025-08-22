import { fetchData } from ".";

export type Position = {
  id: number;
  name: string;
};

export type PositionsResponse = {
  success: boolean;
  positions?: Position[];
  message?: string;
};

export const fetchPositions = async (): Promise<PositionsResponse> => {
  return fetchData<PositionsResponse>(
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
  );
};
