import s from './ButtonsEdit.module.scss';
//api
import {  useGetUpdQuery } from '../../redux/updsApiActions';

//constants
import { BUTTON_SAVE, BUTTON_CANCEL } from '../../constants/upds';
//icons
import { ReactComponent as IconGoToBack } from '../../assets/icons/IconGoToBack.svg'
import { ReactComponent as IconDoneWhite } from '../../assets/icons/iconDoneWhite.svg'
//components
import Button from '../Genegal/Button/Button';
import ButtonSecond from '../Genegal/ButtonSecond/ButtonSecond';


const ButtonsEdit = ({ id, setType, handleUpdate, isLoading }) => {
    const { refetch } = useGetUpdQuery(id);

    const handleCancelEdit = () => {
        refetch()
        setType('detail')
    }

    return (
        <div className={s.root}>
            <ButtonSecond
                handler={handleCancelEdit}
                buttonText={BUTTON_CANCEL}
                Icon={IconGoToBack}
                isLoading={false} />
            <Button
                type={'list'}
                handler={handleUpdate}
                buttonText={BUTTON_SAVE}
                Icon={IconDoneWhite}
                isLoading={isLoading}
            />


        </div>
    )
};

export default ButtonsEdit;