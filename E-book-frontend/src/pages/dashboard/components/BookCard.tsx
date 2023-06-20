import { IBook } from '../Dashboard';

interface BookCardProps {
  book: IBook;
}

export const BookCard = ({ book }: BookCardProps) => {
  console.log(book);
  return <div></div>;
};
