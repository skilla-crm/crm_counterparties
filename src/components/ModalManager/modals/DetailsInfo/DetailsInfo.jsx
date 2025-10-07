import React, { useState } from 'react';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Modal from 'components/General/Modal/Modal';

// Icons
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

// Styles
import s from './DetailsInfo.module.scss';

const DetailsInfo = () => {
  const { modalProps, hideModal } = useModal();

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modalHeader}>
          <div className={s.title}>
            <h3>Общая информация</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlue />
          </button>
        </div>

        <div className={s.body}>
          <p className={s.text}>
            Таблица содержит в себе данные о всех твоих продажах, покупках и транзакциях. Эти данные
            отсортированы в хронологическом порядке в соответствии с датами из первого столбца.
          </p>
          <p className={s.text}>
            Чтобы перейти к деталям документа, нажми на соответствующую ячейку.
          </p>

          <h4 className={s.subtitle}>Заказ</h4>
          <p className={s.text}>
            Столбец с заказами не подчиняется хронологическому порядку по датам. Если заказ
            находится на одной строке с продажей, значит эта продажа (УПД, акт или др.) была создана
            на основе этого заказа или прикреплена к нему.
          </p>
          <p className={s.text}>
            Несколько заказов могут быть объединены одной продажей, например был создан сборный УПД.
          </p>

          <h4 className={s.subtitle}>Предупреждения</h4>
          <p className={s.text}>
            В таблице могут встречаться оранжевые предупреждения. Они формируются системой
            автоматически, в случае если:
          </p>
          <ul className={s.list}>
            <li>• у заказа отсутствует продажа (отгрузочный документ)</li>
            <li>• создана продажа, не связанная ни с одним заказом</li>
            <li>• сумма заказа(ов) не совпадает с суммой продажи</li>
          </ul>
          <p className={s.text}>
            При наведении мышью на предупреждение тебе будет предложено добавить (создать или
            прикрепить) недостающий УПД (продажу) или прикрепить существующий заказ к продаже.
          </p>
          <p className={s.text}>
            Исправить возможную ошибку можно также путем изменения суммы продажи или заказа в режиме
            их редактирования.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsInfo;
