import { useDeleteTransactionMutation } from '../redux/services/transactionApi';

const useDeleteTransaction = () => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDeleteTransaction = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteTransaction({ id }).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении транзакции:', error);
      const status = error.status ?? 'Unknown status';
      alert(`Не удалось удалить транзакцию. Код ошибки: ${status}. ${error.originalStatus}`);
    }
  };

  return handleDeleteTransaction;
};

export default useDeleteTransaction;
