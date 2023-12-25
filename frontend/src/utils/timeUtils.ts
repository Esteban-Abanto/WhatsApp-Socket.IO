
export function formatTime(d: Date): string {
    const hours = d.getHours();
    const minutes = addZero(d.getMinutes());
    const amOrPm = hours >= 12 ? 'p. m.' : 'a. m.';
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    return `${addZero(formattedHours)}:${minutes} ${amOrPm}`;
}

export function addZero(i: number): string {
    return i < 10 ? "0" + i : String(i);
}

export function getCurrentTime(): string {
    const currentDateTime = new Date(); // Obtiene la hora actual
    return formatTime(currentDateTime); // Formatea la hora obtenida
}