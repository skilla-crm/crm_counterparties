import s from './Header.module.scss';
//components 
import ButtonsList from '../ButtonsList/ButtonsList';


const Header = ({ title, type, params, handleAddBill }) => {

  return (
    <div className={s.root}>
      <h2>{title}</h2>
      <ButtonsList
        type={type}
        params={params}
        handleAddBill={handleAddBill}
      />
     
    </div>
  )
};

export default Header;