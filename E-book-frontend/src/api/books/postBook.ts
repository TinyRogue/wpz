import { api } from '../../static/api';
import { axiosInstance } from '../axios/axiosInstance';

interface PostBookProps {
  userId: string;
  title: string;
  bodyRef: string;
  imageRef: string;
}

export const postBook = async (props: PostBookProps) => {
  return await axiosInstance.post(api.endpoints.POST_BOOK, props);
};
