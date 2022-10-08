import {createContext, useEffect, useState, ReactNode} from 'react';
import { api } from './components/services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
  }
interface TransactionProviderProps{
    children: ReactNode;
}

//pega todos os dados da interface Transaction mas omitindo o id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 

//pega todos os dados da interface Transaction passadas no parametro
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>;

interface TransactionContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TrasanctionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );

export function TransactionProvider({ children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

   async function createTransaction(transactionInput: TransactionInput){
       const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
       })
      const { transaction } = response.data;

      setTransactions([
        ...transactions,
        transaction,
      ]);
    }

    return (
        <TrasanctionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TrasanctionContext.Provider>
    );
}