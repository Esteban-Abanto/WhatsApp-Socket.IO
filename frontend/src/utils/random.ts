
export function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomUserName() {
    const randomUserName = `User_${generateRandomNumber(1000, 9999)}`;
    return randomUserName;
}
