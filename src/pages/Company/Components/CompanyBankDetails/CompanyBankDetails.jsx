import InputText from 'components/General/InputText/InputText';
import s from './CompanyBankDetails.module.scss';
import classNames from 'classnames';
//icons
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
//utils
import { handleBankDetails } from 'utils/handleBankDetails';
import { useEffect, useState } from 'react';

const CompanyBankDetails = ({ form, setField }) => {
    const [arrDetails, setArrDetails] = useState([]);

    console.log(arrDetails)

    useEffect(() => {
        setArrDetails(handleBankDetails(form))
    }, [form?.inn]);

    const handleDeleteDetail = (e) => {
        const id = Number(e.currentTarget.id)
         setArrDetails(prevState => [...prevState.filter(el => el.id !== id)])
        setField(`bank${id > 1 ? id : ''}`, '')
        setField(`bik${id > 1 ? id : ''}`, '')
        setField(`ks${id > 1 ? id : ''}`, '')
        setField(`rs${id > 1 ? id : ''}`, '')
    }

    const handleAddDetail = () => {
        setArrDetails(prevState => [...prevState, { id: arrDetails.length + 1, bank: '', bik: '', ks: '', rs: '' }])
    }

    return (
        < div className={s.block} >
            <h3>Банковские реквизиты</h3>
            <div className={s.subs}>
                <span style={{ width: '400px' }}>Банк</span>
                <span style={{ width: '160px' }}>БИК</span>
                <span style={{ width: '240px' }}>К/С</span>
                <span style={{ width: '240px' }}>Р/С</span>
            </div>
            {arrDetails?.map(el => {
                return <div key={el.id} id={el.id} className={s.container}>

                    <InputText
                        width={400}
                        text={form[`bank${el.id > 1 ? el.id : ''}`]}
                        setText={(v) => setField(`bank${el.id > 1 ? el.id : ''}`, v)}
                    />

                    <InputText
                        width={160}
                        text={form[`bik${el.id > 1 ? el.id : ''}`]}
                        setText={(v) => setField(`bik${el.id > 1 ? el.id : ''}`, v)}
                    />

                    <InputText
                        width={240}
                        text={form[`ks${el.id > 1 ? el.id : ''}`]}
                        setText={(v) => setField(`ks${el.id > 1 ? el.id : ''}`, v)}
                    />

                    <InputText
                        width={240}
                        text={form[`rs${el.id > 1 ? el.id : ''}`]}
                        setText={(v) => setField(`rs${el.id > 1 ? el.id : ''}`, v)}
                    />

                    {el.id > 1 && <button onClick={handleDeleteDetail} id={el.id} className={s.button}><IconCloseRed /></button>}

                </div>
            })}

            {arrDetails.length < 3 && <button className={classNames(s.add, s.add_hidden)} onClick={handleAddDetail}><IconPlus />Добавить</button>}


        </div >
    )
};

export default CompanyBankDetails;