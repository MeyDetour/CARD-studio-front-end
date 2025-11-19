import "./style.css"
export default function SubNavigationBar({buttons,page}){
    return (
        <div className="sub-navigation-bar">
            {Object.keys(buttons).map((key, index) => (
                <span style={{width:"calc("+100/Object.keys(buttons).length+"% - 22px)"}} onClick={buttons[key]} className={page===key?"active":""} key={index} >{key}</span>
            ))}

        </div>
    )
}
