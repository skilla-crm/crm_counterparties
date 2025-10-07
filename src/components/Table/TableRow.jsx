import classNames from "classnames";

//components
import CompanyLabelBadge from "components/General/CompanyLabelBadge/CompanyLabelBadge";
import AmountFormatted from "components/General/AmountFormatted/AmountFormatted";
import Goal from "components/General/Goal/Goal";

//hooks
import { useNavigate } from "react-router-dom";

// icons
import { ReactComponent as IconChewron } from "assets/icons/iconChewron.svg";
import { ReactComponent as IconAlertOrange } from "assets/icons/iconAlertOrange.svg";

// styles
import s from "./Table.module.scss";

const TableRow = ({ row, type }) => {
  const navigate = useNavigate();

  const { debt, id, name, label, inn, kpp, note } = row;

  const renderApproved = () => {
    return (
      <div className={classNames(s.gridRow, s.approved)} onClick={() => {}}>
        <div className={classNames(s.gridCell, s.labelBadge)}>
          <Goal text={name} /> <CompanyLabelBadge label={label} />
        </div>
        <div className={classNames(s.gridCell, s.gray)}>{inn}</div>
        <div className={classNames(s.gridCell, s.gray)}>{kpp}</div>
        <div className={classNames(s.gridCell, s.right)}>
          <AmountFormatted
            value={parseInt((debt || 0).toString().replace("-", ""))}
          />
        </div>
        <div className={classNames(s.gridCell, s.right)}>
          <div className={classNames(s.updCell)}></div>
        </div>
        <div className={classNames(s.gridCell, s.right)}></div>

        <div className={classNames(s.gridCell)}>
          <Goal text={note} />
        </div>
      </div>
    );
  };

  const renderNotApproved = () => {
    const { id, sum, name, label, note } = row;

    return (
      <div className={classNames(s.gridRow, s.notApproved)} onClick={() => {}}>
        <div className={classNames(s.gridCell, s.labelBadge)}>
          <Goal text={name} /> <CompanyLabelBadge label={label} />
        </div>
        <div className={classNames(s.gridCell, s.gray)}>
          <Goal text={note} />{" "}
        </div>
      </div>
    );
  };

  if (type === "approved") return renderApproved();
  if (type === "notApproved") return renderNotApproved();

  return null;
};

export default TableRow;

const Act = () => {
  return <div className={classNames(s.act, s.showOnHover)}>Акт сверки</div>;
};

const Badge = ({ status }) => {
  switch (status) {
    case 1:
      return <div className={classNames(s.badge, s.badge_red)}>Низкая</div>;
    case 2:
      return <div className={classNames(s.badge, s.badge_yellow)}>Средняя</div>;
    case 3:
      return <div className={classNames(s.badge, s.badge_green)}>Высокая</div>;
    default:
      return null;
  }
};
