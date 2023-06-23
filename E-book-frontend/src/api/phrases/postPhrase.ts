import { api } from '../../static/api';
import { axiosInstance } from '../axios/axiosInstance';

interface PostPhraseProps {
  userId: string;
  phrase: string;
  language: string;
}

export const postPhrase = async (props: PostPhraseProps) => {
  return await axiosInstance.post(api.endpoints.POST_PHRASE, props);
};

export const postExplain = async (props: PostPhraseProps) => {
  return await axiosInstance.post(api.endpoints.POST_EXPLAIN, props);
};
