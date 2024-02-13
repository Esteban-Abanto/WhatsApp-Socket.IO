
export function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomUrlImage() {
    return `https://picsum.photos/id/${generateRandomNumber(1, 999)}/40`
}

export function generateRandomUserName() {
    return `User_${generateRandomNumber(1000, 9999)}`;
}
