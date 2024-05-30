import { getCards } from "./profileActions";
import { allTransactionsPerUser } from "./transactonsAction";

export async function getTrxFromClient({ user }: { user: string | undefined }) {
  console.log("transactions from the server component");

  const transactions = await allTransactionsPerUser({ user });

  console.log(user, transactions, "middle man");

  return await transactions;
}

export async function getCardsFromClient({ id }: { id: string }) {
  const cards = await getCards({ id });

  console.log("done", { cards });

  return cards;
}
