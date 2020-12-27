export const timeout = (delay) => {
    return new Promise(res => setTimeout(res, delay));
}

export const shuffleArray = (array) => {
    const newArray = [];
    let number = Math.floor(Math.random() * array.length);
    let count = 1;
    newArray.push(array[number]);

    while (count < array.length) {
        const newNumber = Math.floor(Math.random() * array.length);
        if (!newArray.includes(array[newNumber])) {
            count++;
            number = newNumber;
            newArray.push(array[number]);
        }
    }

    return newArray;
}