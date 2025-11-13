// React
import React, { useRef } from 'react';

// Redux
import { useDispatch } from 'react-redux';

//hooks
import { useModal } from 'hooks/useModal';

//Components
import UniButton from 'components/General/UniButton/UniButton';
import SegmentButtons from 'components/General/SegmentButtons/SegmentButtons';

// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';

// Styles
import s from './List.module.scss';

const TABS = [
    { value: 'approved', label: 'Контрагенты' },
    { value: 'notApproved', label: 'Непроверенные контрагенты' },
];

const ListHeader = ({
    activeTab,
    setCounterpartiesType,
    setActiveTab,
    setAnim,
    isLoading,
    counters = {},
}) => {
    const { showModal } = useModal();
    const controlRef = useRef(null);
    const dispatch = useDispatch();
    const segmentRefs = useRef(TABS.map(() => React.createRef()));

    const segmentsWithRef = TABS.map((tab, i) => ({
        ...tab,
        ref: segmentRefs.current[i],
    }));

    const getCountForTab = (id) => {
        if (id === 'approved') {
            return counters?.approved ?? null;
        }
        if (id === 'notApproved') {
            return counters?.notApproved ?? null;
        }
        return 0;
    };

    const handleShowModalAdd = () => {
        showModal('ADD_COUNTERPARTY');
    };

    return (
        <header className={s.header}>
            <div className={s.block}>
                <SegmentButtons
                    segments={segmentsWithRef}
                    value={activeTab}
                    callback={(val) => {
                        setAnim(false);
                        setTimeout(() => {
                            setActiveTab(val);
                            setCounterpartiesType(0);
                        }, 150);

                        setTimeout(() => {
                            setAnim(true);
                        }, 150);
                    }}
                    controlRef={controlRef}
                    counters={counters}
                    load={isLoading}
                />

                <div className={s.buttons}>
                    <UniButton
                        icon={IconPlus}
                        text="Добавить контрагента"
                        onClick={handleShowModalAdd}
                    />
                </div>
            </div>
        </header>
    );
};

export default ListHeader;
