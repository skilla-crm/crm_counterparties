import dayjs from 'dayjs';
import s from './Requisites.module.scss';

const Requisites = ({ general = {}, requisites = {} }) => {
    const {
        name,
        inn,
        kpp,
        ogrn,

        is_percent,

        date_add,
    } = general;

    const {
        director,
        director_position,
        director_rod,
        signatory,
        address,
        address_ur,
        edo_id,
    } = requisites;

    return (
        <div className={s.root}>
            <div className={s.gridContainer}>
                <div className={s.row}>
                    <p>Наименование</p>
                    <div>{name || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>ИНН</p>
                    <div>{inn || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>КПП</p>
                    <div>{kpp || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>ОГРН</p>
                    <div>{ogrn || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>ФИО лица, действ. без доверенности</p>
                    <div>{director || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Должность</p>
                    <div>{director_position || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Действует на основании</p>
                    <div>{director_rod || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Подписант по доверенности</p>
                    <div>
                        <span> {signatory.full_name || '-'}</span>
                        {Boolean(Object.keys(signatory || {}).length) && (
                            <p>{`действует до ${signatory.doc_validity_period}`}</p>
                        )}
                    </div>
                </div>

                <div className={s.row}>
                    <p>Юр. адрес</p>
                    <div>{address_ur || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Факт. адрес</p>
                    <div>{address || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Идентификатор ЭДО</p>
                    <div>{edo_id || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Процент</p>
                    <div>{is_percent || '-'}</div>
                </div>

                <div className={s.row}>
                    <p>Добавлен</p>
                    <p>{dayjs(date_add).format('DD.MM.YYYY') || ''}</p>
                </div>
            </div>
        </div>
    );
};

export default Requisites;
