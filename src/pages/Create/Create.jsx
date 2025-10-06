import s from "./Create.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
//api
import { useGetParametersQuery } from "../../redux/updsApiActions";
//slice
import { setCustomer, setDateStart, setDateEnd } from "../../redux/mainInfo/slice";
//components
import Upd from "../../components/Act/Act";


const Create = () => {
  const { data: parameters } = useGetParametersQuery();
  const [anim, setAnim] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const companyId = searchParams.get('company_id')
  const dateStart = searchParams.get('dateStart')
  const dateEnd = searchParams.get('dateEnd')



  useEffect(() => {
    document.title = `Создать акт сверки`;
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  useEffect(() => {

    if (companyId && parameters) {
      const { companies } = parameters;
      const company = companies.find(el => el.id == companyId)


      console.log(companyId, parameters, dateStart)
      dateStart !== 'null' && dispatch(setDateStart(dateStart))
      dateEnd !== 'null' && dispatch(setDateEnd(dateEnd))
      company && dispatch(setCustomer(company))

    }

  }, [companyId, parameters])

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <Upd type={"create"} />
    </div>
  );
};

export default Create;
