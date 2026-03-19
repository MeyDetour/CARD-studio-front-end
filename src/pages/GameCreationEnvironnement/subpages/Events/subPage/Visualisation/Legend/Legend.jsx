export function Legend({colors}) {
  return (
    <div class="visualisationLegend">
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
      </div>
    </div>
  );
}
