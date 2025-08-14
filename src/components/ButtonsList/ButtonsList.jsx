import s from './ButtonsList.module.scss';
//icons
import { ReactComponent as IconDocument } from '../../assets/icons/iconDocument.svg';
//constants
import { BUTTON_TEXT } from '../../constants/upds';
//components 
import Button from '../Genegal/Button/Button';


const ButtonsList = ({ type, handleAddBill }) => {


  


    return (
        <div className={s.root}>
          
            <Button
                type={type}
                handler={handleAddBill}
                buttonText={BUTTON_TEXT}
                Icon={IconDocument}
            />
        </div>
    )
};

export default ButtonsList;