import s from './Create.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
//components
import Upd from '../../components/Upd/Upd';

const Create = () => {
    const [anim, setAnim] = useState(false)

    useEffect(() => {
        document.title = `Создать УПД`
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <Upd type={'create'} />
        </div>
    )
};

export default Create;