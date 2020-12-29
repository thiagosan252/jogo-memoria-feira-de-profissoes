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

export const secondsTohhmmss = (totalSeconds) => {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    var seconds = totalSeconds - hours * 3600 - minutes * 60; // round seconds

    seconds = Math.round(seconds * 100) / 100;
    var result = hours < 10 ? "0" + hours : hours;
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds < 10 ? "0" + Math.trunc(seconds) : Math.trunc(seconds));
    return result;
}