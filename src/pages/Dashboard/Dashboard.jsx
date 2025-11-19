import {useNavigate} from "react-router";
import {useUserProvider} from "../../context/UserProvider.jsx";
import {useEffect} from "react";

export default function Dashboard() {
    let navigate = useNavigate();
    let {token} = useUserProvider();
    console.log(token);
    useEffect(() => {
        if (!token) {
            console.log("navigate")
            navigate("/login")
        }
    },[token]);


    return (
        <div>Dashboard</div>
    )
}
