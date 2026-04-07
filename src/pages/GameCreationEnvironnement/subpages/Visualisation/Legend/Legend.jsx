export function Legend({colors}) {
  return (
    <div className="visualisationLegend">
      <div>
        <span>Démons</span>
        <div style={{ background: colors.demon.fill }}></div>
      </div>
      <div>
        <span>Événements</span>
        <div style={{ background: colors.event.fill }}></div>
      </div>
      <div>
        <span>Événements avec valeur</span>
        <div style={{ background: colors.withValueEvent.fill }}></div>
      </div> <div>
        <span>Actions</span>
        <div style={{ background: colors.action.fill }}></div>
      </div>
    </div>
  );
}
