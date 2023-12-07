export type Expense = {
  id: number,
  userId: number,
  userFullName: string,
  typeId: number,
  type: string,
  amount: number,
  detail: string,
  date: Date,
};

export type NewExpense = {
  userId: number,
  typeId: number,
  amount: number,
  detail: string,
  date: Date,
};
