import { Button } from "../_components/ui/button";

import { db } from "../_lib/prisma";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Transactions</h1>
      <Button className="mt-4">Transactions</Button>

      {transactions.map((transaction) => (
        <div key={transaction.id} className="border-b p-4">
          <p className="font-semibold">{transaction.name}</p>
          <p className="text-sm text-gray-500">
            {transaction.type} - {transaction.category}
          </p>
          <p className="text-lg font-bold">{transaction.amount.toString()}</p>
        </div>
      ))}
    </div>
  );
};
export default TransactionsPage;
