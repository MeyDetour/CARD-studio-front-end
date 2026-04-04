export function createHistoryElement(type, action, params = {}) {
    // Si params contient un id, on le met à la racine
    const { id, ...rest } = params;
    return {
        type,
        action,
        date: new Date(),
        ...(id !== undefined ? { id } : {}),
        ...rest
    };
}