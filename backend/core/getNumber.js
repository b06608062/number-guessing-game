let number;

const genNumber = (isRestart=false) => {
    if (!number || isRestart) {
        number = Math.floor(Math.random() * 100) + 1;
    }
    return number;
};

export { genNumber };