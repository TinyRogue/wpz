import { api } from '../../static/api';
import { axiosInstance } from '../axios/axiosInstance';

interface GetBooksProps {
  userId: string;
}

export const getBooks = async ({ userId }: GetBooksProps) => {
  return await axiosInstance.get(api.endpoints.GET_BOOKS(userId), {
    headers: { crossDomain: true },
  });
};
