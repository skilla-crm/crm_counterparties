import Rate from 'components/General/Rate/Rate';
import s from './PriceList.module.scss';

const PriceList = ({ data }) => {
    console.log(data);
    return (
        <div className={s.root}>
            <span className={s.infoTitle}>
                Занесенный 0 в графу означает - "по согласованию". Идет только в
                договор. Ставка рабочим не публикуется.
            </span>
            <div className={s.content}>
                {' '}
                {data.length > 0 && (
                    <div className={s.list}>
                        <div className={s.subs}>
                            <span style={{ width: '100%' }}>
                                Наименование в документах
                            </span>
                            <span style={{ width: '300px' }}></span>
                            <span style={{ width: '100px' }}>Ед. изм.</span>
                            <span style={{ width: '60px' }}>Код</span>
                            <span style={{ width: '120px' }}>Клиенту</span>
                            <span style={{ width: '120px' }}>Исполнителям</span>
                        </div>
                        {data.map((el, i) => {
                            return (
                                <Rate
                                    id={el.id}
                                    number={i + 1}
                                    key={el.id}
                                    data={el}
                                    type={'price'}
                                    setValue={(value) => {}}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
export default PriceList;
