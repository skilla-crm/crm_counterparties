import s from './ButtonSecond.module.scss';
import classNames from 'classnames';
//components
import LoaderButton from '../../LoaderButton/LoaderButton';


const ButtonSecond = ({  handler, buttonText, Icon, isLoading }) => {
    return (
        <div onClick={handler} className={s.root}>
          <Icon className={classNames(s.icon, isLoading && s.icon_hidden)}/>
            <p>{buttonText}</p>
            <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                <LoaderButton color={'#002CFB'}/>
            </div>
        </div>
    )
};

export default ButtonSecond;