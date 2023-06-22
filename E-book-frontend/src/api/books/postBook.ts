import { api } from '../../static/api';
import { axiosInstance } from '../axios/axiosInstance';

export const postBook = async (props: FormData) => {
  const response = await axiosInstance.post(api.endpoints.POST_BOOK, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
