import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transactions {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const newBalance = this.transactions.reduce<Balance>(
      (previosValue, currentValue) => {
        const newIncome =
          currentValue.type === 'income'
            ? previosValue.income + currentValue.value
            : previosValue.income;
        const newOutcome =
          currentValue.type === 'outcome'
            ? previosValue.outcome + currentValue.value
            : previosValue.outcome;

        return {
          income: newIncome,
          outcome: newOutcome,
          total: newIncome - newOutcome,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return newBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
