import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (props: LoginProps) => {
  return await signInWithEmailAndPassword(firebaseAuth, props.email, props.password);
};
