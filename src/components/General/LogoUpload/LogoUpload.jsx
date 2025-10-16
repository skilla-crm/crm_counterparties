import s from './LogoUpload.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
//icons
import { ReactComponent as IconUpload } from 'assets/icons/iconUpload.svg';
import { ReactComponent as IconUploadBlack } from 'assets/icons/iconUploadBlack.svg';
import { ReactComponent as IconDelete2 } from 'assets/icons/iconDelete2.svg';
import { ReactComponent as IconReplace } from 'assets/icons/iconReplace.svg';
import UniButton from '../UniButton/UniButton';
import Modal from 'components/ModalManual/Modal';
import LogoUploadInstruction from './LogoUploadInstruction/LogoUploadInstruction';
//components

const LogoUpload = ({ disabled, width, height, logo, setLogo }) => {
    const [imageHover, setImageHover] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (logo) {
            typeof logo === 'string'
                ? setImage(logo)
                : setImage(URL.createObjectURL(logo));
        } else {
            /*  setTimeout(() => {
                setImage(null)
            }, 250)
 */
        }
    }, [logo]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleImageHover = () => {
        setImageHover(true);
    };

    const handleImageBlur = () => {
        setImageHover(false);
    };

    const handleDelete = () => {
        setLogo(null);
    };

    const handleReplace = () => {
        setOpenModal(true);
    };

    const handleStopPropagination = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className={s.root}>
            <div
                style={{ width: logo ? width : '', height: logo ? height : '' }}
                className={s.block}
            >
                <UniButton
                    onClick={handleOpenModal}
                    text={'Загрузить файл'}
                    width={200}
                    icon={IconUpload}
                    type="outline"
                />

                <div
                    style={{ width: `${width}px`, height: `${height}px` }}
                    onMouseEnter={handleImageHover}
                    onMouseLeave={handleImageBlur}
                    onClick={handleStopPropagination}
                    className={classNames(s.image, logo && s.image_vis)}
                >
                    <div
                        className={classNames(
                            s.overlay,
                            imageHover && s.overlay_vis
                        )}
                    >
                        <div className={s.buttons}>
                            <IconReplace
                                className={s.button_overlay}
                                onClick={handleReplace}
                            />
                            <IconDelete2
                                className={s.button_overlay}
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                    <img src={image}></img>
                </div>
            </div>

            {openModal && (
                <Modal
                    title={'Загрузка логотипа'}
                    Icon={IconUploadBlack}
                    onClose={() => setOpenModal(false)}
                >
                    <LogoUploadInstruction
                        logo={logo}
                        setLogo={setLogo}
                        height={height}
                        width={width}
                        setOpenModal={setOpenModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default LogoUpload;
