var a = 0, count = 0, init = 0, num = 0, negative = 0;
let btn = [];
// alert("");

for(let i = 1; i <= 16; ++i) {
    btn[i] = document.querySelector(`.th${i}`);
}
let buttons = document.querySelector("button");
generator = document.querySelector(".initiate");
let dialogue = document.querySelector(".dialogue");
let pr = document.querySelector(".sc");

let interval;

const again = () => {

    generator.classList.remove("fade2");
    generator.innerText = `Starting...`;
    void generator.offsetWidth;
    generator.classList.add("fade");

    clearInterval(interval);
    count = 0;
    init = 0;
    num = 0;
    negative = 0;
    btn = [];

    for (let i = 1; i <= 16; ++i) {
        let button = document.querySelector(`.th${i}`);
        let newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        btn[i] = newButton;
    }

    const boxNumber = () => {
        for(let i = 1; i <= 16; ++i) {
            a = 1 + Math.floor(Math.random() * 16);
            btn[i].innerText = `${a}`;
            btn[i].classList.add("fade");
            btn[i].disabled = false;
        }
    }

    const generateNumber = () => {
        num = 1 + Math.floor(Math.random() * 16);
        generator.classList.remove("fade");
        generator.classList.remove("fade2");
        generator.innerText = `${num}`;
        void generator.offsetWidth;
        generator.classList.add("fade2");
        return num;
    }
    boxNumber();
    // generateNumber();

    const gameLogic = () => {
        generator.style.color = "black";
        init = generateNumber();
    }
    interval = setInterval(() => {
        gameLogic();
    }, 1800);

    for(let i = 1 ; i <= 16 ; ++i) {
        btn[i].addEventListener("click", () => {
            let match = false;
            
            if(init == btn[i].innerText && !btn[i].disabled) {
                ++count;
                btn[i].disabled = true;
                match = true;
                // console.log("matched");
                generator.style.color = "green";
                pr.classList.remove("fade2");
                pr.classList.remove("fade3");
                pr.innerText = ` ${count - negative}`;
                void pr.offsetWidth;
                pr.classList.add("fade2");
            }
            if(count === 16) {
                // console.log("Done");
                clearInterval(interval);
                generator.classList.remove("fade2");
                generator.innerText = `Your Score is ${count - negative}`;
                void generator.offsetWidth;
                generator.classList.add("fade");
                generator.style.color = `black`;
                // pr.innerHTML = "<pr></pr>";
                dialogue.innerText = `Game Over`;
                pr.innerText = ``;
                dialogue.classList.add("fade");

                setTimeout(() => {
                    dialogue.classList.remove("fade");
                    dialogue.innerText = `Click here to start again`;
                    dialogue.style.fontSize = "1.8rem";
                    void dialogue.offsetWidth;
                    dialogue.classList.add("fade");

                    generator.classList.remove("fade2");
                    generator.innerText = `Your Score is ${count - negative}`;
                    void generator.offsetWidth;
                    generator.classList.add("fade");

                    dialogue.addEventListener("click", () => {
                        startAgain();
                    })
                }, 1800)
            }
            if(!match) {
                ++negative;
                pr.classList.remove("fade3");
                pr.classList.remove("fade2");
                pr.innerText = ` ${count - negative}`;
                void pr.offsetWidth;
                pr.classList.add("fade3");
                generator.style.color = "red";
                // console.log("Not matched");
            }
        })
    }
}
again();
const startAgain = () => {
    dialogue.classList.remove("fade");
    dialogue.innerText = `Score =`;
    dialogue.style.fontSize = "2.5rem";
    void dialogue.offsetWidth;
    dialogue.classList.add("fade");
    pr.classList.remove("fade2");
    pr.classList.remove("fade3");
    pr.classList.remove("fade");
    pr.innerText = ` 0`;
    void pr.offsetWidth;
    pr.classList.add("fade");
    again();
}