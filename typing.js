// Typing
const box = document.querySelector(".typing");
const text = [
  "Hi there!^I am ROBOTO Filip 1337.^I love speak to people!",
  "Tell me more about You. What's Your name?^How old are You? I hope You like me and we will spend a nice time together.",
  "My current system is ANDROID 16.5.x.v. ^I try to be intelligent, but sometimes it just doesn't happen.",
  "My programmer Filip made me in Greensock Animation Platform and I'm very happy, positive ROBOTO.",
  "Give me more information about You.^ I would love to know You.^Ciaooo Amigo!",
];
let wordIndex = 0;
let textIndex = 0;
let oldTime = 0;
const speed = 80; //czym większa wartość tym wolniejszy typing
const stop = 2000; //zatrzymanie między kolejnymi tekstami
let activeDOMElement = box;

const typing = (newTime) => {
  if (newTime - oldTime > speed) {
    const letter = text[textIndex].substr(wordIndex, 1);
    if (wordIndex === text[textIndex].length - 1) {
      if (textIndex === text.length - 1) {
        return;
      }
      return setTimeout(() => {
        box.textContent = "";
        textIndex++;
        wordIndex = 0;
        requestAnimationFrame(typing);
      }, stop);
    } else if (wordIndex === 0 || letter === "^") {
      const p = document.createElement("p");
      box.appendChild(p);
      activeDOMElement = p;
    }

    if (!(letter === "^")) {
      activeDOMElement.textContent += letter;
    }

    oldTime = newTime;
    wordIndex++;
  }
  requestAnimationFrame(typing);
};

typing();

//Robot

const bars = () => {
  const tl = new TimelineMax({ onComplete: bars });
  const scale = () => {
    return 0.1 + Math.random() * 3;
  };

  const color = () => {
    const colors = ["green", "red", "yellow"];
    return colors[Math.floor(Math.random() * 3)];
  };
  // const voiceBars = document.querySelector('#voice-bars');
  const barsElement = document.querySelectorAll("#voice-bars > *");
  tl.set(barsElement, { y: -30, transformOrigin: "50% 50%" });
  tl.staggerTo(
    barsElement,
    0.7,
    { scaleY: scale, repeat: 1, yoyo: true, fill: color, ease: Bounce.easeIn },
    0.1
  );
  return tl;
};

const blink = () => {
  const tl = new TimelineMax({ repeat: -1, repeatDelay: 3, delay: 2 });
  const eyes = document.querySelectorAll("#eye-left, #eye-right");
  tl.set(eyes, { transformOrigin: "50% 50%" })
    .to(eyes, 0.1, { scaleY: 0, fill: "#231f20" })
    .to(eyes, 0.05, { scaleY: 1, fill: "#48b3e6" })
    .to(eyes, 0.12, { scaleY: 0, fill: "#231f20" }, "+=0.5")
    .to(eyes, 0.03, { scaleY: 1, fill: "#48b3e6" })
    .to(eyes, 0.08, { scaleY: 0, fill: "#231f20" }, "+=1.5")
    .to(eyes, 0.08, { scaleY: 1, fill: "#48b3e6" });

  return tl;
};

const move = (legs) => {
  // console.log(elements);
  const tl = new TimelineMax();
  tl.staggerTo(
    legs,
    0.5,
    { y: -60, repeat: -1, yoyo: true, ease: Power0.easeNone },
    0.5
  );
  return tl;
};

const ears = () => {
  const tl = new TimelineMax({ repeat: -1, yoyo: true });
  const ears = document.querySelectorAll("#ear-left, #ear-right");
  tl.set(ears, { transformOrigin: "50% 50%" });
  tl.staggerTo(
    ears,
    0.6,
    { scaleY: 1.2, fill: "yellow", yoyo: true, ease: Power0.easeNone },
    0
  );
  tl.staggerTo(
    ears,
    1,
    { scaleY: 1.4, fill: "pink", yoyo: true, ease: Power0.easeNone },
    0
  );
  tl.staggerTo(
    ears,
    1.2,
    { scaleY: 1, fill: "blue", yoyo: true, ease: Power0.easeNone },
    0
  );
  return tl;
};

// Master Timeline
const master = new TimelineMax();
master.add("start");
master.add(move(document.querySelectorAll("#leg-right, #leg-left")), "start");
master.add(bars(), "start");
master.add(blink(), "start");
master.add(ears(), "start");
