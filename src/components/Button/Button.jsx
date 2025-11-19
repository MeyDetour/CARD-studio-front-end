import {useTranslation} from "react-i18next";
import "./style.css"
import {Link} from "react-router";

export default function Button({text,to,type,icon,iconHover}) {
    const {t} = useTranslation();
    return (
        <Link to={to} className={"button "+type}>
            {icon && <img className={"icon"} src={"./src/assets/icon/"+icon} alt=""/> }
            {iconHover && <img className={"iconHover"} src={"./src/assets/icon/"+icon} alt=""/> }
            <span>{t(text)}</span>
        </Link>
    )
}
