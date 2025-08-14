import s from './Button.module.scss';
import classNames from 'classnames';
//components
import LoaderButton from '../../LoaderButton/LoaderButton';


const Button = ({ type, handler, buttonText, Icon, isLoading, width }) => {
    return (
        <div onClick={handler} className={classNames(s.root, width && s.root_width)}>
            {type === 'list' && <Icon />}
            {type === 'list' && <div className={classNames(s.loaderLeft, width && s.loaderCenter, isLoading && s.loaderLeft_vis)}>
                <LoaderButton color={'#fff'}/>
            </div>}
            <p>{buttonText}</p>
            {type === 'create' && <Icon />}
            {type === 'create' && <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                <LoaderButton color={'#fff'}/>
            </div>}
        </div>
    )
};

export default Button;