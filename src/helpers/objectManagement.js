import { t } from "i18next";

export function updateValueArray(path, object, value, type = "multiple") {
  const keys = path.split(".");
  const newObj = { ...object };
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];
  const targetArray = current[lastKey];

  if (type === "delete") {
    if (typeof value === "object" && value.id !== null) {
      const existingElt = targetArray.find((elt) => elt.id === value.id);
      if (existingElt) {
        current[lastKey] = targetArray.filter((elt) => elt.id !== value.id);
      }
    } else {
      if (targetArray.includes(value)) {
        current[lastKey] = targetArray.filter((elt) => elt !== value);
      }
    }
    return newObj;
  }
  if (type === "new") {
    targetArray.push(value);

    return newObj;
  }

  if (!targetArray) {
    current[lastKey] = [value];
  } else {
    if (typeof value === "object" && value.id !== null) {
      const existingElt = targetArray.find((elt) => elt.id === value.id);
      if (
        existingElt &&
        JSON.stringify(existingElt) === JSON.stringify(value)
      ) {
        // do nothing if the object is the same
        return object;
      }
      // replace
      const filteredArray = targetArray.filter((elt) => elt.id !== value.id);
      current[lastKey] = [...filteredArray, value];
    } else {
      // if not object we add it if not present, else we remove it
      if (!targetArray.includes(value)) {
        if (type === "multiple") {
          current[lastKey] = [...targetArray, value];
        } else {
          current[lastKey] = [value];
        }
      } else {
        current[lastKey] = targetArray.filter((elt) => elt !== value);
      }
    }
  }

  return newObj;
}
export function updateElementValue(path, obj, value, type = "replace") {
  const keys = path.split(".");
  const newObj = { ...obj };
  let current = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] ? { ...current[key] } : {};
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];

  switch (type) {
    case "replace":
      current[lastKey] = value;
      break;

    case "new":
      // Only set the value if the key doesn't exist yet
      if (!(lastKey in current)) {
        current[lastKey] = value;
      }
      break;

    case "delete":
      // Remove the property entirely from the object
      delete current[lastKey];
      break;

    default:
      // Fallback to replace or keep as is
      current[lastKey] = value;
      break;
  }

  return newObj;
}
