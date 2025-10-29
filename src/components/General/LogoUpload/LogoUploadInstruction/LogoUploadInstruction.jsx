import { useEffect, useState } from 'react';
import s from './LogoUploadInstruction.module.scss';
//icons
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
//components
import DropZone from 'components/DropZone/DropZone';

import UniButton from 'components/General/UniButton/UniButton';

const LogoUploadInstruction = ({
    logo,
    setLogo,
    height,
    width,
    setOpenModal,
}) => {
    const [file, setFile] = useState(null);
    console.log(' file', file);

    useEffect(() => {
        setFile(logo);
    }, [logo]);

    const handleSetLogo = () => {
        console.log('logo upload', file);
        setLogo(file);
        setOpenModal(false);
    };

    console.log(' width', width);

    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.block}>
                    <p className={s.bold}>Логотип для боковой панели меню</p>
                    <span>Требования</span>
                    <ul className={s.list}>
                        <li>Формат PNG</li>
                        <li>250х250 пикс</li>
                        <li>Соотношение сторон 1:1</li>
                        <li>до 300 КБ</li>
                        <li>Фон прозрачный</li>
                        <li>Текст светлый или со светлой обводкой</li>
                    </ul>
                </div>

                <DropZone
                    file={file}
                    setFile={(file) => setFile(file)}
                    multiple={false}
                    maxSize={20}
                    type={'image'}
                    height={height * 2}
                    width={width * 2}
                />
            </div>

            <UniButton
                onClick={handleSetLogo}
                text={'Готово'}
                icon={IconDoneWhite}
                iconPosition={'right'}
            />
        </div>
    );
};

export default LogoUploadInstruction;
