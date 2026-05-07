import TitleContainer from "../../../../../components/TitleContainer/TitleContainer";

export default function SelectCard({ selected, action, children, title, description }) {
  return (
    <div className="basicContainer selectCard" onClick={() => action()}>
      <div className="title">
        <div
          className={selected ? "selected selectRound" : "selectRound"}
        ></div>
        <TitleContainer title={title} description={description} type="h3"></TitleContainer>
      </div>
      {children}
    </div>
  );
}
