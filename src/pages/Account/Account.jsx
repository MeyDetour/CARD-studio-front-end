import Button from "../../components/Button/Button";
import SubNavigationBar from "../../components/SubNavigationBar/SubNavigationBar";
import './style.css';
export default function Account() {
    const [subPage, setSubPage] = useState("account");
    return (
        <div className="accountPage">
            <Button
                text={"backToSelectGame"}
                to={"/"}
                type={"withoutBorder"}
                icon={"left_arrow"}
            ></Button> 
            <SubNavigationBar
            buttons={{              
                account: () => setSubPage("account")
            }} 
            page={"account"}
            ></SubNavigationBar>
            {subPage == "account" && <div className="accountSection">
                <h2>Account</h2>
                <p>Here you can manage your account settings, such as changing your password, updating your email address, and managing your connected accounts. You can also view your account activity and manage your notifications.</p>
            </div>}
        </div>
    );
}