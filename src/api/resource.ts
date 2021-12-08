import { ResourceOption } from "@/entities/resource";
import request from "@/utils/request";
export const getResouceList = () => {
  return request<ResourceOption[]>({
    url: "api/resource/list",
    method: "get"
  });
};
interface ApiType {
  "/couse/buy": {
    id: number;
  };
}

function test<T extends keyof ApiType>(url: T, obj: ApiType[T]) {
  console.log(url, obj);
}
test("/couse/buy", { id: 1 });
