import classNames from 'classnames';

import s from './LoaderCircle.module.scss';

const LoaderCircle = ({ vis }) => {
  return <div className={classNames(s.loader, vis && s.loader_vis)}></div>;
};

export default LoaderCircle;
