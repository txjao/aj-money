import Modal from "react-modal";
import { api } from "../services/api";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImage from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useState, useContext } from "react";
import { useTransactions } from "../hooks/useTransactions";



interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen,onRequestClose,}: NewTransactionModalProps) {

  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [amount,  setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit'); 

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');


    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImage} alt="fecharModal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input placeholder="Título" 
        value={title}
        onChange= {event => setTitle(event.target.value)} />


        <input 
        type="number"
        value={amount}
        onChange= {event => setAmount(parseInt(event.target.value))}
        placeholder="Valor" />

        <TransactionTypeContainer>
          
          <RadioBox 
          type="button"          
          onClick={() => {setType('deposit'); }}
          isActive = {type === 'deposit'}
          activeColor = "green"
          >
            <img src={incomeImg} alt="income" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
          type="button"
          onClick={() => {setType('withdraw'); }}
          isActive = {type === 'withdraw'}
          activeColor = "red"
          >
            <img src={outcomeImg} alt="outcome" />
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input 
        placeholder="Categoria"
        value={category} 
        onChange= {event => setCategory(event.target.value)} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
