import { api } from '../../static/api';
import { axiosInstance } from '../axios/axiosInstance';

export const postBook = async (props: FormData) => {
  return await axiosInstance.post(api.endpoints.POST_BOOK, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
      crossDomain: true,
    },
  });
};
