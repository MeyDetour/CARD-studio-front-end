import './style.css';
import TitleContainer from "../TitleContainer/TitleContainer";

export default function SelectCard({ selected, action, children, title, description }) {
  return (
    <div className="basicContainer selectCard" onClick={() => action()}>
       <div
          className={selected ? "selected selectRound" : "selectRound"}
        >
          {selected ? <div className="round"></div> : ""}

        </div>
      <div className="title">
       
        <TitleContainer title={title} description={description} type="h3"></TitleContainer>
      </div>
      {children}
    </div>
  );
}
