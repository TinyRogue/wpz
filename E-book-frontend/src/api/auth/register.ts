import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase';

interface RegisterProps {
  email: string;
  password: string;
}

export const register = async (props: RegisterProps) => {
  return await createUserWithEmailAndPassword(firebaseAuth, props.email, props.password);
};
