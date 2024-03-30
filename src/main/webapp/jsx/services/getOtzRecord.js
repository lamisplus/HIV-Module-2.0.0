import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const getOtzRecord = async (id) => {
  const response = await axios.get(`${baseUrl}observation/person/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
