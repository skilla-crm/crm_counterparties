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
  setNumberValidation,
  setDateRangeValidation
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
    numberBill,
    date,
    dateStart,
    dateEnd

  } = useSelector((state) => state.mainInfo);
  const [createUpd, { data, isError, isLoading }] = useCreateUpdMutation();
  const [updateUpd, { isLoading: isLoadingEdit }] = useUpdateUpdMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidation = () => {
    const customerValidation = customer?.partnership_id ? true : false;
    const numberValidation = Number(numberBill) !== 0 ? true : false;
    const dateRangeValidation = dateStart && dateStart !== '' && dateEnd && dateEnd !== '' ? true : false;
    dispatch(setCustomerValidation(customerValidation));
    dispatch(setNumberValidation(numberValidation));
    dispatch(setDateRangeValidation(dateRangeValidation))

    console.log(dateRangeValidation)
    if (
      customerValidation &&
      numberValidation &&
      dateRangeValidation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreate = () => {
    const dataForSend = {
      company_id: customer?.id,
      partnership_id: customer?.partnership_id,
      date: dayjs(date).format("YYYY-MM-DD"),
      num: Number(numberBill),
      date_start: dayjs(dateStart).format("YYYY-MM-DD"),
      date_end: dayjs(dateEnd).format("YYYY-MM-DD")
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

    const dataForSend = {
      company_id: customer?.id,
      partnership_id: customer?.partnership_id,
      date: dayjs(date).format("YYYY-MM-DD"),
      num: Number(numberBill),
      date_start: dayjs(dateStart).format("YYYY-MM-DD"),
      date_end: dayjs(dateEnd).format("YYYY-MM-DD")
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
