// React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setHasUnsavedChanges } from '../../../../redux/slices/detailChangesSlice';
import {
    setDebt,
    setMinSum,
    setActivity,
    setDraftDebt,
    setDraftMinSum,
    setDraftActivity,
} from '../../../../redux/slices/otherDataSlice';

// Components
import Field from 'components/General/Field/Field';
import InputNum from 'components/General/InputNum/InputNum';
import Switch from 'components/EmailSender/Switch/Switch';

// Styles
import s from './Other.module.scss';

const Other = ({ data }) => {
    const dispatch = useDispatch();
    const { draftDebt, draftMinSum, draftActivity } = useSelector(
        (state) => state.otherData
    );

    useEffect(() => {
        if (data) {
            dispatch(setDebt(data.debt_threshold ?? 0));
            dispatch(setMinSum(data.min_acc_sum ?? 0));
            dispatch(setActivity(Boolean(data.only_repayment)));
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (!data) return;

        const hasChanges =
            draftDebt !== (data.debt_threshold ?? 0) ||
            draftMinSum !== (data.min_acc_sum ?? 0) ||
            draftActivity !== Boolean(data.only_repayment);

        dispatch(setHasUnsavedChanges(hasChanges));
    }, [draftDebt, draftMinSum, draftActivity, data, dispatch]);
    return (
        <div className={s.root}>
            <div className={s.content}>
                <Switch
                    text="Заказы только по предоплате"
                    switchState={draftActivity}
                    handleSwitch={() =>
                        dispatch(setDraftActivity(!draftActivity))
                    }
                />
                <Field
                    text="Порог задолженности"
                    info="Порог при котором заказы клиента не принимаются"
                >
                    <InputNum
                        width={300}
                        num={draftDebt}
                        setNum={(val) => dispatch(setDraftDebt(val))}
                    />
                </Field>
                <Field text="Минимальная сумма на счете">
                    <InputNum
                        width={300}
                        num={draftMinSum}
                        setNum={(val) => dispatch(setDraftMinSum(val))}
                    />
                </Field>
            </div>
        </div>
    );
};
export default Other;
