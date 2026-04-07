import { findTextInElt } from "./text.js";
export function getDynamicValueForEvent(withValueEvent) {
  let keyInputInwithValueEvent = [];
  if (withValueEvent) {
    const keysInput = [
      "inputBool",
      "inputNumber",
      "inputPlayer",
      "inputString",
    ];

    keyInputInwithValueEvent = keysInput.filter(
      (key) =>
        findTextInElt(
          {
            condition: withValueEvent.condition,
            for: withValueEvent.event.for,
            from: withValueEvent.event.from,
            value: withValueEvent.event.value,
          },
          key,
        ),
    );
    return keyInputInwithValueEvent;
  }
  return [];
}
