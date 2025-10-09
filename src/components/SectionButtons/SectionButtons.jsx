import { useDispatch } from 'react-redux';

//styles
import classNames from 'classnames';
import s from './SectionButtons.module.scss';

const SectionButtons = ({
    list,
    active,
    setActive,
    load = false,
    counters = [],
}) => {
    const dispatch = useDispatch();
    const handleActive = (e) => {
        const id = e.currentTarget.id;
        setActive(id);
    };

    return (
        <ul className={classNames(s.root)}>
            {list?.map((el) => {
                return (
                    <li
                        key={el.id}
                        id={el.id}
                        onClick={handleActive}
                        className={classNames(
                            s.item,
                            el.id === active && s.item_active
                        )}
                    >
                        <p>{el.title}</p>
                        <sup
                            className={classNames(
                                s.count,
                                load && s.count_load
                            )}
                        >
                            {counters?.find((item) => item.id === el.id)?.count}
                        </sup>
                        <div
                            className={classNames(
                                s.overlay,
                                el.id === active && s.overlay_hidden
                            )}
                        ></div>
                    </li>
                );
            })}
        </ul>
    );
};

export default SectionButtons;
