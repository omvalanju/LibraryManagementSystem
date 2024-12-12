export default interface BorrowedBookType {
  people_id: number;
  book_id: number;
  book_title: string;
  author_name: string;
  borrow_date: string;
  due_date: string;
  fine_amount: number;
  fine_status: string;
}
