import s from './LoaderButton.module.scss'

const LoaderButton = ({color}) => {
    return (
        <div style={{borderColor: `${color}`}} className={s.loader}></div>
    )
};

export default LoaderButton;