import { toast } from 'react-toastify';
import CustomToast from 'components/General/CustomToast/CustomToast';

const useToast = () => {
  const showToast = (message, type = 'success', icon) => {
    toast(
      ({ closeToast }) => (
        <CustomToast message={message} closeToast={closeToast} type={type} icon={icon} />
      ),
      { autoClose: 3000, closeButton: false }
    );
  };

  return { showToast };
};
export default useToast;
