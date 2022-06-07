// inisialisai
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabetList = alpha.map((x) => String.fromCharCode(x).toLowerCase());
const stateList = [
  "q0",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
  "q15",
  "q16",
  "q17",
  "q18",
  "q19",
  "q20",
  "q21",
  "q22",
];

let transitionTable = {};

stateList.forEach((state) => {
  alphabetList.forEach((alphabet) => {
    transitionTable[[state, alphabet]] = "ERROR";
  });
  transitionTable[[state, "#"]] = "ERROR";
  transitionTable[[state, " "]] = "ERROR";
});

// starting node space
transitionTable[["q0", " "]] = "q0";

// Finish State
transitionTable[["q10", "#"]] = "ACCEPT";
transitionTable[["q14", "#"]] = "ACCEPT";
transitionTable[["q16", "#"]] = "ACCEPT";


// binoe
transitionTable[["q0", "b"]] = "q1";
transitionTable[["q1", "i"]] = "q2";
transitionTable[["q2", "n"]] = "q3";
transitionTable[["q3", "o"]] = "q9";
transitionTable[["q9", "e"]] = "q10";
transitionTable[["q10", " "]] = "q14";


// adoe
transitionTable[["q0", "a"]] = "q4";
transitionTable[["q4", "d"]] = "q5";
transitionTable[["q5", "o"]] = "q9";
transitionTable[["q9", "e"]] = "q10";

// lakoe
transitionTable[["q0", "l"]] = "q6";
transitionTable[["q6", "a"]] = "q7";
transitionTable[["q7", "k"]] = "q8";
transitionTable[["q8", "o"]] = "q9";
transitionTable[["q9", "e"]] = "q10";

// kamoe
transitionTable[["q0", "k"]] = "q11";
transitionTable[["q11", "a"]] = "q12";
transitionTable[["q12", "m"]] = "q13";
transitionTable[["q13", "o"]] = "q9";
transitionTable[["q9", "e"]] = "q10";

// poh
transitionTable[["q0", "p"]]  = "q19";
transitionTable[["q19", "o"]] = "q15";
transitionTable[["q15", "h"]] = "q16";
transitionTable[["q16", " "]] = "q14";
transitionTable[["q16", "#"]] = "ACCEPT";

// boh
transitionTable[["q0", "b"]] = "q1";
transitionTable[["q1", "o"]] = "q15";
transitionTable[["q15","h"]] = "q16";


// basoh
transitionTable[["q0", "b"]] = "q1";
transitionTable[["q1", "a"]] = "q17";
transitionTable[["q17", "s"]] = "q18";
transitionTable[["q18", "o"]] = "q15";
transitionTable[["q18", "h"]] = "q16";

// bajee
transitionTable[["q0", "b"]] = "q1";
transitionTable[["q1", "a"]] = "q17";
transitionTable[["q17", "j"]] = "q20";
transitionTable[["q20", "e"]] = "q21";
transitionTable[["q21", "e"]] = "q10";

// bate
transitionTable[["q0", "b"]] = "q1";
transitionTable[["q1", "a"]] = "q17";
transitionTable[["q17", "t"]] = "q22";
transitionTable[["q22", "e"]] = "q10";

// asee
transitionTable[["q0", "a"]] = "q4";
transitionTable[["q4", "s"]] = "q20";
transitionTable[["q20", "e"]] = "q21";
transitionTable[["q21", "e"]] = "q10";

//looping
transitionTable[["q14", "k"]] = "q11";
transitionTable[["q14", "l"]] = "q6";
transitionTable[["q14", "a"]] = "q4";
transitionTable[["q14", "b"]] = "q1";
transitionTable[["q14", "p"]] = "q19";


const checkSentence = (sentence) => {
  // lexical analysis
  let resultLa = document.getElementById("resultLa");
  let laTitle = document.getElementById("laTitle");
  let parserTitle = document.getElementById("parserTitle");
  let resultParser = document.getElementById("resultParser");
  let bgResult = document.getElementById("bgResult");
  bgResult.classList.remove("hidden");
  laTitle.className = "block font-medium text-lg";
  parserTitle.className = "hidden";
  resultLa.innerText = "";
  resultParser.innerText = "";

  let inputString = sentence.toLowerCase() + "#";
  let idxChar = 0;
  let state = "q0";
  let currentToken = "";
  let currentChar = "";
  while (state != "ACCEPT") {
    
    currentChar = inputString[idxChar];
    console.log(state,inputString[idxChar],currentChar !="#")
    // Error handling
    if (
      currentChar != " " &&
      currentChar != "#" &&
      !alphabetList.includes(currentChar)
    ) {
      console.log("error");
      resultLa.innerText += "ERROR";
      resultLa.style.color = "red";
      break;
    }

    currentToken += currentChar;
    state = transitionTable[[state, currentChar]];
    console.log(transitionTable[state])
    if (state == "q10" || state == "q16" ) {
      resultLa.innerText =
        resultLa.innerText + "Current Token : " + currentToken + ", valid";
      resultLa.innerText += "\n";
      currentToken = "";
    }
    else if (state == "ERROR") {
      console.log("ERROR adwawd")
      resultLa.innerText += "ERROR";
      resultLa.style.color = "red";
      break;
    }
    idxChar++;
  }
  
  if (state == "ACCEPT") {
    resultLa.innerText += "Semua token pada input : " + sentence + ", valid";
    resultLa.style.color = "green";
  }
};

let form = document.getElementById("form");

const handleSubmit = (e) => {
  let sentence = document.getElementById("sentence").value;
  checkSentence(sentence);
  e.preventDefault();
};

form.addEventListener("submit", (e) => handleSubmit(e));
