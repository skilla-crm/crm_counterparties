import s from './ButtonDelete.module.scss';
import classNames from 'classnames';
//components
import LoaderButton from '../../LoaderButton/LoaderButton';


const ButtonDelete = ({ handler, Icon, isLoading }) => {
    return (
        <div onClick={handler} className={s.root}>
            <Icon />
            <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                <LoaderButton color={'#E10D0D'} />
            </div>
        </div>
    )
};

export default ButtonDelete;