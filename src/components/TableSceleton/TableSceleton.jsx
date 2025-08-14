import s from './TableSceleton.module.scss';
import classNames from 'classnames';
//components
import Loader from '../Loader/Loader';

const TableSceleton = ({isLoading}) => {
    return (

        <table className={classNames(s.root,isLoading && s.root_vis)}>
            <thead>
                <tr>
                    <th className={s.date}><Loader height={14} width={40} /></th>
                    <th className={s.number}><Loader height={14} width={50} /></th>
                    <th className={s.customer}><Loader height={14} width={60} /></th>
                    <th className={s.connection}><Loader height={14} width={114} /></th>
                    <th className={s.summ}><Loader height={14} width={70} /></th>
                    <th className={s.recipient}><Loader height={14} width={84} /></th>
                    <th className={s.bill}><Loader height={14} width={118} /></th>
                    <th className={s.progress}><Loader height={14} width={70} /></th>
                    <th className={s.status}><Loader height={14} width={64} /></th>
                    <th className={s.button}></th>
                </tr>

            </thead>
            <tbody>


                {[...Array(120)]?.map((el, i) => {
                    return <Row key={i} />
                })}
            </tbody>
        </table>
    )
};


const Row = () => {

    return (
        <tr className={s.row} >
            <div className={s.border}></div>
            <td className={s.date}>
                <Loader height={14} width={60} />
            </td>
            <td className={s.number}>
                <Loader height={14} width={30} />
            </td>
            <td className={s.customer}>
                <Loader height={14} width={280} />
            </td>
            <td className={s.connection}>

            </td>
            <td className={s.summ}>
                <Loader height={14} width={60} />
            </td>
            <td className={s.recipient}>
                <Loader height={14} width={280} />
            </td>
            <td className={s.bill}>
                <Loader height={14} width={220} />
            </td>
            <td className={s.progress}>
                <div className={s.line}>
                    <div className={s.bar}><Loader/></div>
                    <div className={s.bar}><Loader/></div>
                    <div className={s.bar}><Loader/></div>
                </div>
            </td>
            <td className={s.status}>

            </td>
            <td className={s.button}>

            </td>

        </tr >

    )
}
export default TableSceleton;