//Redux
import { useAddCompanyToArchiveMutation } from '../../../redux/companiesApiActions';

// Components
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconPlayer } from 'assets/icons/iconPlayer.svg';

// Styles
import s from './CompanyHeader.module.scss';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

const CompanyHeader = ({ data, onSave, isLoading }) => {
    const { showModal } = useModal();
    const [addCompanyToArchive, { isLoading: isLoadingArchive }] =
        useAddCompanyToArchiveMutation();

    const { showToast } = useToast();
    const isNewCompany = data?.is_archive === 1 && data?.draft === 1;
    const isArchiveCompany =
        data?.is_archive === 1 && data?.connect_to !== 0 && data?.draft === 0;
    const isNotInArchive = data?.is_archive !== 1 && data?.connect_to !== 0;
    const handleDeleteCompany = () => {
        showModal('DELETE_COMPANY_MODAL');
    };
    const handleAddToArchive = () => {
        showModal('ADD_COMPANY_TO_ARCHIVE_MODAL', { id: data?.id });
    };
    const handleRestoreFromArchive = async () => {
        try {
            const res = await addCompanyToArchive(data?.id).unwrap();
            if (res?.action === 'requires_payment') {
                showModal('GET_FROM_ARCHIVE_MODAL', { id: data?.id });
            }
            if (res?.action === 'restored_from_archive') {
                showToast('Компания успешно восстановлена', 'success');
            }
        } catch (error) {
            showToast('Произошла ошибка', 'error');
        }
    };

    return (
        <div className={s.header}>
            <h2>{!isNewCompany ? data?.partnership_name : 'Новая компания'}</h2>

            <div className={s.headerButtons}>
                {isNotInArchive && !isNewCompany && (
                    <UniButton
                        text="В архив"
                        type="danger"
                        icon={IconDelete}
                        onClick={handleAddToArchive}
                    />
                )}

                {/* {data?.is_archive === 1 && (
          <UniButton
            text="Удалить"
            type="danger"
            icon={IconDelete}
            onClick={handleDeleteCompany}
          />
        )} */}
                {isArchiveCompany && (
                    <UniButton
                        type="outline"
                        text="Сделать активной"
                        icon={IconPlayer}
                        width={200}
                        onClick={handleRestoreFromArchive}
                        isLoading={isLoadingArchive}
                        loaderColor="#002cfb"
                    />
                )}

                <UniButton
                    text={!isNewCompany ? 'Сохранить' : 'Добавить'}
                    icon={IconDoneWhite}
                    width={200}
                    onClick={onSave}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default CompanyHeader;
