import { api } from '../../static/api';
import { axiosInstance } from '..//axios/axiosInstance';

interface GetPhrasesProps {
  userId: string;
}

export const getPhrases = async ({ userId }: GetPhrasesProps) => {
  return await axiosInstance.get(api.endpoints.GET_PHRASES(userId));
};
