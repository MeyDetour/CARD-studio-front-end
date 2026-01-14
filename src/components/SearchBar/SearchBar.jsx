import { useTranslation } from "react-i18next";
import "./style.css"; 

export default function SearchBar({
 callback,
 className="",
 placeholder,
 
}) {
  const { t } = useTranslation();
  return (
    <form action="" className={"searchBarForm "+className }>
        <img src="/src/assets/icon/seach.svg"  alt="" />
       <input
       onChange={callback} 
          type="search"
          placeholder={t(placeholder)}
        />
      
    </form>
  );
}
