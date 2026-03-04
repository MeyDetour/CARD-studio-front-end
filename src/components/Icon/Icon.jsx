 
import "./style.css"; 

export default function Icon({
 name, 
 callback,
 className="",
}) {
  if (!name) return null;
  return (
    <img onClick={callback}   src={"/src/assets/icon/" + name + ".svg"} className={"icon "+className} alt="" />
  );
}
