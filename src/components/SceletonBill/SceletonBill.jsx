import s from './SceletonBill.module.scss';
import classNames from 'classnames';
import iconPreview from '../../assets/icons/iconPreview.png';
//components
import Loader from '../Loader/Loader';

const SceletonBill = ({ isLoading }) => {
    return (
        <div className={classNames(s.root, isLoading && s.root_vis)}>
            <div className={s.header}>
                <div className={s.title}>

                    <Loader height={22} width={340} />

                </div>

            </div>

            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.maininfo}>

                        <Loader height={21} width={220} />
                        <div className={s.field}>
                            <div className={s.sub}>
                                <Loader height={14} width={90} />
                            </div>

                            <div className={s.input}>
                                <Loader />
                            </div>
                        </div>

                        <div className={s.field}>
                            <div className={s.sub}>
                                <Loader height={14} width={110} />
                            </div>
                            <div className={s.input}>
                                <Loader />
                            </div>

                        </div>

                        <div className={s.block}>
                            <div className={s.field}>
                                <div className={s.sub}>
                                    <Loader height={14} width={70} />
                                </div>
                                <div className={classNames(s.input, s.input_2)}>
                                    <Loader />
                                </div>

                            </div>

                            <div className={s.field}>
                                <div className={s.sub}>
                                    <Loader height={14} width={70} />
                                </div>
                                <div className={classNames(s.input, s.input_2)}>
                                    <Loader />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={s.services}>
                        <Loader height={21} width={180} />
                        <div className={s.container_2}>
                            <div className={s.subs}>
                                <div className={s.number}></div>
                                <span className={s.name}> <Loader height={14} width={110} /></span>
                                <span className={s.count}> <Loader height={14} width={60} /></span>
                                <span className={s.units}> <Loader height={14} width={60} /></span>
                                <div className={s.code}>
                                    <span> <Loader height={14} width={50} /></span>
                                </div>

                                <div className={s.price}>
                                    <span> <Loader height={14} width={50} /></span>
                                </div>
                                <span className={s.total}> <Loader height={14} width={70} /></span>
                                <div className={s.button}></div>
                            </div>
                            {[...Array(1)].map((el, i) => {
                                return <Positions i={i} />
                            })}
                        </div>

                        <div className={s.bottom}>
                            <button className={s.button_add}>
                                <Loader height={20} width={120} />
                            </button>
                            <Loader height={20} width={100} />
                        </div>

                    </div>
                </div>

                <div className={s.preview}>
                    <img src={iconPreview}></img>
                    <p>Предварительный просмотр в разработке</p>
                </div>
            </div>
        </div>
    )
};


const Positions = ({ i }) => {
    return (
        <div className={s.position}>
            <p className={s.number}></p>
            <div className={s.name}>
                <Loader height={40} />
            </div>
            <div className={s.count}>
                <Loader height={40} />
            </div>
            <div className={s.units}>
                <Loader height={40} />
            </div>
            <div className={s.code}>
                <Loader height={40} />
            </div>

            <div className={s.price}>
                <Loader height={40} />
            </div>
            <div className={s.total}>
                <Loader height={40} />
            </div>
            <div className={s.button}>

            </div>
        </div>
    )
}

export default SceletonBill;
