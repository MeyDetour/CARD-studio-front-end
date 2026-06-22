 
import "./style.css"; 

export default function Icon({
 name,  
 callback,
 className="",
}) {
  if (!name) return null;
  return (
    <img onClick={callback}   src={"/./assets/icon/" + name + ".svg"} style={{cursor:callback!=null ? "pointer" : "default"}} className={"icon "+className} alt="" />
  );
}
