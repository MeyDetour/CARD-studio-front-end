export function Legend({colors}) {
  return (
    <div className="visualisationLegend">
      <div>
        <span>Démons</span>
        <div style={{ background: colors.demon.stroke }}></div>
      </div>
      <div>
        <span>Événements</span>
        <div style={{ background: colors.event.stroke }}></div>
      </div>
      <div>
        <span>Événements avec valeur</span>
        <div style={{ background: colors.withValueEvent.stroke }}></div>
      </div> <div>
        <span>Actions</span>
        <div style={{ background: colors.action.stroke }}></div>
      </div>
    </div>
  );
}
