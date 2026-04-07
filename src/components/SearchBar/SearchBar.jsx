import { useTranslation } from "react-i18next";
import "./style.css"; 
import Icon from "../Icon/Icon.jsx";

export default function SearchBar({
 callback,
 className="",
 placeholder,
 
}) {
  const { t } = useTranslation();
  return (
    <form action="" className={"searchBarForm "+className }>
       <Icon name="search"></Icon>
       <input
       onChange={(e)=>callback(e.target.value)} 
          type="search"
          placeholder={t(placeholder)}
        />
      
    </form>
  );
}
