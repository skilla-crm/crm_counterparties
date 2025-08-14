import s from './LoaderCircle.module.scss'
import classNames from 'classnames';

const LoaderCircle = ({ vis }) => {
    return (
        <div className={classNames(s.loader, vis && s.loader_vis)}></div>
    )
};

export default LoaderCircle;