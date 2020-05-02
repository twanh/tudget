
export function sortTransactionsByDate(transactions) {
  return transactions.sort((cur, next) => {
    const d1 = new Date(cur.spendOn)
    const d2 = new Date(next.spendOn)
    return d1 > d2 ? (-1) : (d1 < d2 ? 1 : 0)
  })
}