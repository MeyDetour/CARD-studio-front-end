import "./style.css"
import {useTranslation} from "react-i18next";
export default function SubNavigationBar({buttons,page}){
    const {t} = useTranslation();
    return (
        <div className="sub-navigation-bar">
            {Object.keys(buttons).map((key, index) => (
                <span style={{width:"calc("+100/Object.keys(buttons).length+"% - 22px)"}} onClick={buttons[key]} className={page===key?"active":""} key={index} >{t(key)}</span>
            ))}

        </div>
    )
}
