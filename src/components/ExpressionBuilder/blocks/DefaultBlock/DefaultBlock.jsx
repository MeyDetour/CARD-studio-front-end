 
import TitleContainer from "../../../TitleContainer/TitleContainer.jsx";
export default function DefaultBlock({
  description,
  title, 
  type

})  {
 
  return (
    <>
      <div
        className={"elementInExpressionBuilder winBlock "}
        onClick={() => setIsOpen(true)}
      >
        <TitleContainer type="h2" title={title} description={description}></TitleContainer>
        
          {type &&  <span className="littleMention">Type : {type}</span> }
       
      </div>
    </>
  );
}
