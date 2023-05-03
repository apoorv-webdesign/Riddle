// Fetches a random riddle from the JokeAPI v2
async function getRiddle() {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
    const data = await response.json();
  
    if (data.type === "twopart") {
      return {
        riddle: data.setup,
        answer: data.delivery
      };
    } else {
      return null;
    }
  }
  
  // Updates the riddle text and clears the result message and answer input
  function displayRiddle(riddle) {
    document.getElementById("riddleText").innerText = riddle;
    document.getElementById("resultMessage").innerText = "";
    document.getElementById("answerInput").value = "";
  }
  
  // Checks if the player's answer is correct and displays a result message
  function checkAnswer(playerAnswer, correctAnswer) {
    if (playerAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      document.getElementById("resultMessage").innerText = "Congratulations! Your answer is correct.";
    } else {
      document.getElementById("resultMessage").innerText = "Sorry, your answer is incorrect. Try again!";
    }
  }
  // Add the following function to display the answer
function displayAnswer(answer) {
    document.getElementById("answerText").innerText = "Answer: " + answer;
    document.getElementById("answerText").style.display = "block";
  }
  
  (async function () {
    const riddleData = await getRiddle();
    if (riddleData) {
      displayRiddle(riddleData.riddle);
  
      document.getElementById("submitAnswer").addEventListener("click", () => {
        const playerAnswer = document.getElementById("answerInput").value;
        checkAnswer(playerAnswer, riddleData.answer);
      });
    } else {
      document.getElementById("riddleText").innerText = "Failed to fetch a riddle. Please refresh the page.";
    }
    document.getElementById("showAnswer").addEventListener("click", () => {
        displayAnswer(riddleData.answer);
      });
  })();
  