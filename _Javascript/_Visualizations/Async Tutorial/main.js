function setup() {
    noCanvas();
    delayES8(1000)
    .then (()    => createP("Hello"))
    .catch((err) => console.log(err));
}

async function delayES8 (time) {

    await delay(time);

    return;

}

function delay (time) {

    return new Promise((resolve, reject) => {

        if (isNaN(time)) {

            reject(Error("Delay input is not a number"));
            return;

        }

        setTimeout(resolve, time);

    });

}