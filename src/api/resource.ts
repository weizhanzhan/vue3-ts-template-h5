import { ResourceOption } from "@/entities/resource";
import request from "@/utils/request";
export const getResouceList = () => {
  return request<ResourceOption[]>({
    url: "api/resource/list",
    method: "get"
  });
};
