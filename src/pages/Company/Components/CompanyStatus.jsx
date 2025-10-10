// React
import { useState } from 'react';

// Components
import Field from 'components/General/Field/Field';
import Switch from 'components/General/Switch/Switch';

// Icons
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';

// Styles
import s from '../Company.module.scss';

const CompanyStatus = ({ setField, data }) => {
    const [switchState, setSwitchState] = useState(false);
    const isDefault = data?.connect_to === 0;

    return (
        <div className={s.block}>
            <h3>Статус</h3>

            <div className={s.fields}>
                {isDefault ? (
                    <div className={s.default}>
                        <IconDoneGrey />
                        <span>Используется по умолчанию</span>
                        <Field
                            width={400}
                            info={
                                'Отметка автоматически будет снята при назначении другой компании, используемой по умолчанию'
                            }
                        />
                    </div>
                ) : (
                    <Switch
                        text="Использовать по умолчанию"
                        switchState={switchState}
                        setSwitchState={(val) => {
                            if (val) {
                                setField('is_default', 1);
                                setSwitchState(true);
                            } else {
                                setField('is_default', 0);
                                setSwitchState(false);
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyStatus;
