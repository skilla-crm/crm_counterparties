import Switch from 'components/EmailSender/Switch/Switch';
import Field from 'components/General/Field/Field';
import InputNum from 'components/General/InputNum/InputNum';
import InputText from 'components/General/InputText/InputText';
import { use, useEffect, useState } from 'react';
import s from './Other.module.scss';

const Other = ({ data }) => {
    const [debt, setDebt] = useState(0);
    const [minSum, setMinSum] = useState(0);
    const [activity, setActivity] = useState(false);

    useEffect(() => {
        if (data) {
            setDebt(data.debt_threshold ?? 0);
            setMinSum(data.min_acc_sum ?? 0);
            setActivity(Boolean(data.only_repayment));
        }
    }, [data]);

    return (
        <div className={s.root}>
            <div className={s.content}>
                <Switch
                    text="Назначить основным"
                    switchState={activity}
                    handleSwitch={() => setActivity(!activity)}
                />
                <Field
                    text="Порог задолженности"
                    info="Порог при котором заказы клиента не принимаются"
                >
                    <InputNum width={300} num={debt} setNum={setDebt} />
                </Field>
                <Field text="Минимальная сумма на счете">
                    <InputNum width={300} num={minSum} setNum={setMinSum} />
                </Field>
            </div>
        </div>
    );
};
export default Other;
