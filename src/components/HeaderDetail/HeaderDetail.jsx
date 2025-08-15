import s from "./HeaderDetail.module.scss";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  useCreateUpdMutation,
  useUpdateUpdMutation,
} from "../../redux/updsApiActions";
//icons
import { ReactComponent as IconDoneWhite } from "../../assets/icons/iconDoneWhite.svg";
//slice
import {
  setCustomerValidation,
  setDetailValidation,
  setNumberValidation,
  setPositionsValidation,
} from "../../redux/validation/slice";
//components
import Button from "../Genegal/Button/Button";
import Buttons from "../Buttons/Buttons";
import ButtonsEdit from "../ButtonsEdit/ButtonsEdit";
//constants
import { BUTTON_TEXT_CREATE } from "../../constants/upds";

const HeaderDetail = ({ id, type, setType }) => {
  const {
    customer,
    detail,
    signatory,
    contract,
    dateContract,
    numContract,
    numberBill,
    date,
    nds,
  } = useSelector((state) => state.mainInfo);
  const { positions, total } = useSelector((state) => state.positions);
  const [createUpd, { data, isError, isLoading }] = useCreateUpdMutation();
  const [updateUpd, { isLoading: isLoadingEdit }] = useUpdateUpdMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidation = () => {
    const customerValidation = customer?.partnership_id ? true : false;
    const detailValidation = detail?.partnership_id ? true : false;
    const numberValidation = Number(numberBill) !== 0 ? true : false;
    const positionsValidation = positions.every(
      (el) =>
        el?.rate?.name_service !== "" &&
        el?.rate?.name_service &&
        Number(el?.count) > 0 &&
        el?.count !== "" &&
        el?.units !== "" &&
        Number(el?.code) > 0 &&
        Number(el?.price) >= 0 &&
        Number(el?.total) >= 0
    );
    dispatch(setCustomerValidation(customerValidation));
    dispatch(setDetailValidation(detailValidation));
    dispatch(setNumberValidation(numberValidation));
    dispatch(setPositionsValidation(positionsValidation));

    if (
      customerValidation &&
      detailValidation &&
      numberValidation &&
      positionsValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreate = () => {
    const rows = positions?.map((el) => {
      return {
        description: el?.rate?.name_service,
        date: "",
        amount: Number(el?.count),
        unit: el?.units,
        okei: Number(el?.code),
        sum_unit: Number(el?.price),
        sum: Number(el?.total),
      };
    });
    const dataForSend = {
      order_ids: [],
      company_id: customer?.id,
      partnership_id: customer?.partnership_id,
      date: dayjs(date).format("YYYY-MM-DD"),
      num: Number(numberBill),
      detail_partnership_id: detail?.partnership_id,
      detail_number: detail?.num,
      company_contact_id:
        signatory.id &&
        signatory.id !== "dir" &&
        signatory.id !== "no" &&
        signatory.id !== "another"
          ? signatory.id
          : null,
      signature: signatory.id !== "no" ? signatory.name : null,
      contract: contract,
      contract_date: dayjs(dateContract).format("YYYY-MM-DD"),
      contract_n: numContract,
      rows,
      sum: total,
      nds,
    };

    if (handleValidation()) {
      createUpd(dataForSend).then((data) => {
        if (data.data.success) {
          const id = data.data.data.id;
          navigate(`/detail/${id}`);
        } else {
        }
      });
      return;
    }
  };

  const handleUpdate = () => {
    const rows = positions?.map((el) => {
      return {
        description: el?.rate?.name_service,
        date: /* el?.date ? el?.date : */ "",
        amount: Number(el?.count),
        unit: el?.units,
        okei: Number(el?.code),
        sum_unit: Number(el?.price),
        sum: Number(el?.total),
      };
    });
    const dataForSend = {
      company_id: customer?.id,
      partnership_id: customer?.partnership_id,
      date: dayjs(date).format("YYYY-MM-DD"),
      num: Number(numberBill),
      detail_partnership_id: detail?.partnership_id,
      detail_number: detail?.num,
      company_contact_id:
        signatory.id &&
        signatory.id !== "dir" &&
        signatory.id !== "no" &&
        signatory.id !== "another"
          ? signatory.id
          : null,
      signature: signatory.id !== "no" ? signatory.name : null,
      contract: contract,
      contract_date: dayjs(dateContract).format("YYYY-MM-DD"),
      contract_n: numContract,
      rows,
      sum: total,
      draft: 0,
      nds,
    };

    if (handleValidation()) {
      updateUpd({ body: dataForSend, id }).then((data) => {
        if (data.data.success) {
          setType("detail");
        } else {
        }
      });
      return;
    }
  };

  return (
    <div className={s.root}>
      {type == "create" && (
        <h2>
          Новый акт сверки №{numberBill} от {dayjs(date).format("DD.MM.YYYY")}
        </h2>
      )}
      {type == "draft" && (
        <h2>
          Новый акт сверки №{numberBill} от {dayjs(date).format("DD.MM.YYYY")}
        </h2>
      )}
      {type == "detail" && (
        <h2>
          Акт сверки №{numberBill} от {dayjs(date).format("DD.MM.YYYY")}
        </h2>
      )}
      {type == "edit" && (
        <h2>
          Акт сверки №{numberBill} от {dayjs(date).format("DD.MM.YYYY")}
        </h2>
      )}

      {type == "create" && (
        <Button
          type={"create"}
          handler={handleCreate}
          buttonText={BUTTON_TEXT_CREATE}
          Icon={IconDoneWhite}
          isLoading={isLoading}
        />
      )}

      {type === "draft" && (
        <Button
          type={"create"}
          handler={handleUpdate}
          buttonText={BUTTON_TEXT_CREATE}
          Icon={IconDoneWhite}
          isLoading={isLoadingEdit}
        />
      )}

      {type === "detail" && <Buttons setType={setType} id={id} />}
      {type === "edit" && (
        <ButtonsEdit
          setType={setType}
          id={id}
          handleUpdate={handleUpdate}
          isLoading={isLoadingEdit}
        />
      )}
    </div>
  );
};

export default HeaderDetail;
