import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import Loader from 'components/TableSceleton/Loader/Loader';

import s from './TableSceleton.module.scss';

const TableSceleton = ({ isLoading }) => {
  const [load, setLoad] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setLoad(true);
    } else {
      setTimeout(() => {
        setLoad(false);
      }, 50);
    }
  }, [isLoading]);

  return (
    <table className={classNames(s.root, load && s.root_vis)}>
      <thead>
        <tr>
          <th>
            <Loader height={14} width={60} />
          </th>
          <th>
            <Loader height={14} width={50} />
          </th>
          <th>
            <Loader height={14} width={80} />
          </th>
          <th>
            <Loader height={14} width={150} />
          </th>
          <th>
            <Loader height={14} width={60} />
          </th>
          <th>
            <Loader height={14} width={160} />
          </th>
          <th>
            <Loader height={14} width={200} />
          </th>
          <th>
            <Loader height={14} width={130} />
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(40)].map((_, i) => (
          <Row key={i} />
        ))}
      </tbody>
    </table>
  );
};

const Row = () => (
  <tr className={s.row}>
    <td>
      <Loader height={14} width={60} />
    </td>
    <td>
      <Loader height={14} width={50} />
    </td>
    <td>
      <Loader height={14} width={80} />
    </td>
    <td>
      <Loader height={14} width={150} />
    </td>
    <td>
      <Loader height={14} width={60} />
    </td>
    <td>
      <Loader height={14} width={160} />
    </td>
    <td>
      <Loader height={14} width={200} />
    </td>
    <td>
      <Loader height={14} width={130} />
    </td>
  </tr>
);

export default TableSceleton;
