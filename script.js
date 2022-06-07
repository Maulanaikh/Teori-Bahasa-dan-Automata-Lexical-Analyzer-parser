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
  /*
    // Parser
    parserTitle.className = "block font-medium text-lg";
    sentence = sentence.replace(/\s+/g, " ").trim();
    let tokens = sentence.toLowerCase().split(" ");
    tokens.push("EOS");

    // Symbol definition
    let nonTerminals = ["S", "NN", "VB"];
    let terminals = [
      "pakdhe",
      "simbok",
      "peken",
      "jaran",
      "gethuk",
      "gedhang",
      "pit",
      "mangan",
      "tindak",
      "numpak",
    ];

    // Parse Table
    let parseTable = {};

    //  kolom S
    parseTable[["S", "pakdhe"]] = ["NN", "VB", "NN"];
    parseTable[["S", "simbok"]] = ["NN", "VB", "NN"];
    parseTable[["S", "peken"]] = ["NN", "VB", "NN"];
    parseTable[["S", "jaran"]] = ["NN", "VB", "NN"];
    parseTable[["S", "gethuk"]] = ["NN", "VB", "NN"];
    parseTable[["S", "gedhang"]] = ["NN", "VB", "NN"];
    parseTable[["S", "pit"]] = ["NN", "VB", "NN"];
    parseTable[["S", "mangan"]] = ["error"];
    parseTable[["S", "tindak"]] = ["error"];
    parseTable[["S", "numpak"]] = ["error"];
    parseTable[["S", "EOS"]] = ["error"];

    // kolom NN
    parseTable[["NN", "pakdhe"]] = ["pakdhe"];
    parseTable[["NN", "simbok"]] = ["simbok"];
    parseTable[["NN", "peken"]] = ["peken"];
    parseTable[["NN", "jaran"]] = ["jaran"];
    parseTable[["NN", "gethuk"]] = ["gethuk"];
    parseTable[["NN", "gedhang"]] = ["gedhang"];
    parseTable[["NN", "pit"]] = ["pit"];
    parseTable[["NN", "mangan"]] = ["error"];
    parseTable[["NN", "tindak"]] = ["error"];
    parseTable[["NN", "numpak"]] = ["error"];
    parseTable[["NN", "EOS"]] = ["error"];

    // kolom VB
    parseTable[["VB", "mangan"]] = ["mangan"];
    parseTable[["VB", "tindak"]] = ["tindak"];
    parseTable[["VB", "numpak"]] = ["numpak"];
    parseTable[["VB", "pakdhe"]] = ["error"];
    parseTable[["VB", "simbok"]] = ["error"];
    parseTable[["VB", "peken"]] = ["error"];
    parseTable[["VB", "jaran"]] = ["error"];
    parseTable[["VB", "gethuk"]] = ["error"];
    parseTable[["VB", "gedhang"]] = ["error"];
    parseTable[["VB", "pit"]] = ["error"];
    parseTable[["VB", "EOS"]] = ["error"];

    // Inisialisasi stack
    let stack = [];
    stack.push("#");
    stack.push("S");

    // Input reading initialization
    let idxToken = 0;
    let symbol = tokens[idxToken];

    // parsing proses
    while (stack.length > 0) {
      let top = stack[stack.length - 1];
      resultParser.innerText = resultParser.innerText + "Top = " + top + "\n";
      resultParser.innerText =
        resultParser.innerText + "Symbol = " + symbol + "\n";
      if (terminals.includes(top)) {
        resultParser.innerText =
          resultParser.innerText + top + " adalah simbol terminal \n";
        if (top == symbol) {
          stack.pop();
          idxToken++;
          symbol = tokens[idxToken];
          if (symbol == "EOS") {
            resultParser.innerText =
              resultParser.innerText +
              "Isi stack = " +
              "[" +
              stack +
              "]" +
              "\n \n";
            stack.pop();
          }
        } else {
          resultParser.innerText = resultParser.innerText + "error \n \n";
          break;
        }
      } else if (nonTerminals.includes(top)) {
        resultParser.innerText =
          resultParser.innerText + top + " adalah simbol non-terminal \n";
        if (parseTable[[top, symbol]][0] != "error") {
          stack.pop();
          let symbolToBePushed = parseTable[[top, symbol]];
          for (let i = symbolToBePushed.length - 1; i > -1; i--) {
            stack.push(symbolToBePushed[i]);
          }
        } else {
          resultParser.innerText = resultParser.innerText + "error \n \n";
          break;
        }
      } else {
        resultParser.innerText = resultParser.innerText + "error \n \n";
        break;
      }
      resultParser.innerText =
        resultParser.innerText + "Isi stack = " + "[" + stack + "]" + "\n \n";
    }

    // Conclusion
    if (symbol == "EOS" && stack.length == 0) {
      resultParser.innerText =
        resultParser.innerText +
        'Input string "' +
        sentence +
        '" diterima, sesuai Grammar \n';
      resultParser.style.color = "green";
    } else {
      resultParser.innerText =
        resultParser.innerText +
        'Error, input string "' +
        sentence +
        '" tidak diterima, tidak sesuai Grammar \n';
      resultParser.style.color = "red";
    }*/
  }
};

let form = document.getElementById("form");

const handleSubmit = (e) => {
  let sentence = document.getElementById("sentence").value;
  checkSentence(sentence);
  e.preventDefault();
};

form.addEventListener("submit", (e) => handleSubmit(e));
