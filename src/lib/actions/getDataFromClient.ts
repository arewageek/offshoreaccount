import { getCards } from "./profileActions";
import { allTransactionsPerUser } from "./transactonsAction";

export async function getTrxFromClient({ user }: { user: string }) {
  const transactions = await allTransactionsPerUser({ user });

  return await transactions;
}

export async function getCardsFromClient({ id }: { id: string }) {
  const cards = await getCards({ id });

  return cards;
}
