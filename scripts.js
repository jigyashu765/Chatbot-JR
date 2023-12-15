let conversation = document.getElementById('conversation');
let messageInput = document.getElementById('messageInput');
let sendBtn = document.getElementById('sendBtn');

// Keyword store here

const numberRegex = /\b\d+\b/g;

const arithmeticRegex = /(\d+)\s*([+\-*/%^])\s*(\d+)/;
const arithmeticKeywords = ['solve', 'calculate', 'compute', 'add', 'subtract', 'multiply', 'divide', 'modulo', 'power'];

const tableKeywords = ['table', 'table of', 'generate a table for', 'create a table of', 'show a table of', 'display the table for', 'calculate a table of'];

// const maxMinRegex = /\d+/g;
const upToRegex = /up\s*to|Upto/i;
const randomKeywords = ['random number', 'generate a random number'];

const loginKeywords = ['login', 'loggin'];
const signupKeywords = ['signup', 'create account', 'sign up', 'createaccount', 'create my new account', 'create my account'];
const logoutKeywords = ['logout'];

const dateTimeKeywords = ['today', 'today date', 'date', 'day', 'month', 'year'];

// Keyword store here



// Main Function and Work

window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    userMessageInput();
  }
});

sendBtn.addEventListener('click', function () {
  userMessageInput();
});

function userMessageInput() {
  if (messageInput.value) {
    let userMessage = document.createElement('div');
    userMessage.classList.add('User-Message', 'chat');
    let profilePic = document.createElement('img');
    profilePic.src = './image/Chatbot  (Small).png';
    profilePic.alt = 'User';
    profilePic.classList.add('profile-pic', 'pic-right');
    userMessage.innerHTML = `<p>${messageInput.value}</p>`;
    userMessage.appendChild(profilePic);
    conversation.append(userMessage);

    reply(messageInput.value);

    messageInput.value = "";
  } else {

  }
}

// Main Function and Work

// Secondray Function and Work

function reply(userInput) {
  if (isBlank(userInput)) {

    JRMessage("Ohh😜! You forget to enter your message. <br>Kindly enter your message first.");

    messageInput.focus();

  } else if (containsKeyword(userInput, loginKeywords)) {

    loggin();

  } else if (containsKeyword(userInput, signupKeywords)) {

    signingUp();

  } else if (containsKeyword(userInput, logoutKeywords)) {

    logout();

  } else if (containsKeyword(userInput, dateTimeKeywords)) {

    displayCurrentDate(userInput);

  } else if (containsKeyword(userInput, arithmeticKeywords) || userInput.match(arithmeticRegex)) {

    answerArithmeticQuestion(userInput);

  } else if (containsKeyword(userInput, tableKeywords)) {

    generateTable(userInput);

  } else if (containsKeyword(userInput, randomKeywords)) {

    generateRandomNumber(userInput);

  } else {

    fetch('./Component/reply.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `userMessage=${encodeURIComponent(userInput)}`,
    })
      .then(response => response.json())
      .then(data => {

        JRMessage(`${toSentenceCase(data.reply)}`);

        deleteMessage(userInput);

      })
      .catch(error => {

        let JRMessage = document.createElement('div');
        JRMessage.classList.add('JR-Message', 'chat', 'Defult-Message');
        JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    `;

        let JRMessageBtn = document.createElement('div');
        JRMessageBtn.classList.add('buttons');
        JRMessageBtn.innerHTML = `
    <p>Ohh! Sorry, I don't have an appropriate reply for your question. <br> Can you give me the proper reply to "${userInput}"?</p>
    `;

        let replyBtnYes = document.createElement('button');
        replyBtnYes.classList.add('button-70', 'replyBtn');
        replyBtnYes.innerText = 'Yes';
        replyBtnYes.addEventListener('click', () => {

          let userDefineReply = window.prompt(`Reply of "${userInput}" is`);
          if (userDefineReply) {
            saveReply(userInput, userDefineReply);
          }
        });

        let replyBtnNo = document.createElement('button');
        replyBtnNo.classList.add('button-70', 'replyBtn');
        replyBtnNo.innerText = 'No';
        replyBtnNo.addEventListener('click', () => {

          saveUserMessage(userInput);
          alert("It's okay! 😔");

          const defultMessages = document.querySelectorAll(".Defult-Message");
          defultMessages.forEach(message => {
            message.style.display = "none";
          });
        });

        JRMessageBtn.append(replyBtnYes);
        JRMessageBtn.append(replyBtnNo);

        JRMessage.append(JRMessageBtn);

        conversation.append(JRMessage);

      });
  }
}

function saveReply(userInput, userDefineReply) {

  fetch('./Component/save_reply.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `userInput=${encodeURIComponent(userInput)}&userReply=${encodeURIComponent(userDefineReply)}`,
  })
    .then(response => response.json())
    .then(data => {
      alert("Thanks To share your Knowlage with me 😊");

      const defultMessages = document.querySelectorAll(".Defult-Message");
      defultMessages.forEach(message => {
        message.style.display = "none";
      });

      reply(userInput);
      deleteMessage(userInput);
      messageInput.focus();
    })
    .catch(error => {
      messageInput.focus();
    });

  scrollToBottom();
}

// Secondray Function and Work

// Function Call by Other function

function saveUserMessage(userInput) {

  fetch('./Component/save_message.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `userInput=${encodeURIComponent(userInput)}`,
  })
    .then(response => response.json())
    .then(data => {
      messageInput.focus();
    })
    .catch(error => {
      messageInput.focus();
    });

}

function deleteMessage(userInput) {

  fetch('./Component/delete_message.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `userInput=${encodeURIComponent(userInput)}`,

  })
    .then(response => response.json())
    .then(data => {
      messageInput.focus();
    })
    .catch(error => {
      messageInput.focus();
    });

}

// Function Call by Other function

// Some small Function

function isBlank(input) {

  return input.trim() === '';

}

function scrollToBottom() {
  const conversation = document.getElementById('conversation');
  conversation.scrollTop = conversation.scrollHeight;
}



function toSentenceCase(inputString) {

  return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();

}

function containsKeyword(input, keywords) {
  for (const keyword of keywords) {
    if (input.toLowerCase().includes(keyword)) {
      return true;
    }
  }
  return false;
}

function ConvertIntoLowercase(input) {
  return input.toLowerCase();
}

function extractNumbersFromInput(input) {
  const matches = input.match(numberRegex);

  const numbers = matches ? matches.map(match => parseInt(match, 10)) : [];

  return numbers;
}

function extractWordsFromInput(inputPhrase) {
  const words = inputPhrase.split(' ');

  // Initialize variables to store the extracted keywords
  let dayKeyword = '';
  let monthKeyword = '';
  let yearKeyword = '';

  // Iterate through the words to find the keywords
  for (const word of words) {
    const lowerWord = word.toLowerCase();

    // Check for day keyword
    if (['day', 'date', 'today'].includes(lowerWord)) {
      dayKeyword = lowerWord;
    }

    // Check for month keyword
    if (['month'].includes(lowerWord)) {
      monthKeyword = lowerWord;
    }

    // Check for year keyword
    if (['year'].includes(lowerWord)) {
      yearKeyword = lowerWord;
    }
  }

  // Return the extracted keywords as an object
  return {
    day: dayKeyword,
    month: monthKeyword,
    year: yearKeyword,
  };
}

// Example user input
// const userInput = "What is the day today, and which year are we in?";

// Extract keywords from the user input


// Pass the extracted keywords to the displayCurrentDate function
// displayCurrentDate(extractedKeywords);



function JRMessage(message) {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat');
  JRMessage.innerHTML = `
  <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
  <p>${message}</p>
  `;
  conversation.append(JRMessage);
}

function generateRandomNumber(userInput) {
  const matches = userInput.match(numberRegex);

  const uptoMatch = userInput.match(upToRegex);

  let randomNumber = 0;
  
  if (uptoMatch) {
    let number = extractNumbersFromInput(userInput);
    let max = Math.max(...number);
    let min = Math.min(0);

    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  } else {

    if (matches) {
      const numbers = matches.map(match => parseInt(match, 10));

      let max = Math.max(...numbers);
      let min = Math.min(...numbers);

      randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    } else {
      randomNumber = Math.floor(Math.random() * 100);
    }
  }




  JRMessage(randomNumber);
}



function displayCurrentDate(userInput) {

  const extractedKeywords = extractWordsFromInput(userInput);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const currentDay = daysOfWeek[dayIndex];
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  let dateString = '';

  if (ConvertIntoLowercase(extractedKeywords.day).includes("day")) {
    dateString = `Today is ${currentDay} and the date is ${day}<sup>${getDaySuffix(day)}</sup> of ${month}`;
  } else if (ConvertIntoLowercase(extractedKeywords.month).includes("month")) {
    dateString = `We are in ${month} of the year ${year}`;
  } else if (ConvertIntoLowercase(extractedKeywords.year).includes("year")) {
    dateString = `We are in the year ${year}`;
  } else {
    dateString = `${day}<sup>${getDaySuffix(day)}</sup> ${month} - ${year} and Today is ${currentDay}`;
  }

  JRMessage(dateString);
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function answerArithmeticQuestion(question) {
  const match = question.match(arithmeticRegex);
  let answer = ""; // Change const to let

  if (match) {
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);

    switch (operator) {
      case "+":
        answer = `Sum of ${num1} and ${num2} is ${num1 + num2}`;
        break;
      case "-":
        answer = `Subtraction of ${num1} and ${num2} is ${num1 - num2}`;
        break;
      case "*":
        answer = `${num1} multiplied by ${num2} is equal to ${num1 * num2}`;
        break;
      case "/":
        if (num2 !== 0) {
          answer = `Value of ${num1} divided by ${num2} is ${num1 / num2}`;
        } else {
          answer = "Sorry, but dividing by zero is a mathematical no-no! 🚫🧮";
        }
        break;
      case "%": // Modulo
        answer = `${num1} modulo ${num2} is ${num1 % num2}`;
        break;
      case "^": // Exponentiation (power)
        answer = `${num1} raised to the power of ${num2} is ${Math.pow(num1, num2)}`;
        break;
      default:
        answer = "Invalid operator.";
    }
  } else {
    answer =
      "Oops! I'm currently undergoing some fine-tuning by the JR team to serve you even better. 🚀 While I'm leveling up, please ask me questions in a format like this: 'Eg. Solve 10 * 5.' I'll be ready to dazzle you with answers in no time! 💫";
  }

  JRMessage(answer);

  messageInput.focus();
}

function generateTable(userInput) {
  const numbers = extractNumbersFromInput(userInput);

  if (numbers == 0) {
    JRMessage("Zero is not valid input");
  } else {

    let JRMessage = document.createElement('div');
    JRMessage.classList.add('JR-Message', 'chat');

    // Create the profile picture
    let profilePic = document.createElement('img');
    profilePic.src = './image/Chatbot  (Small).png';
    profilePic.alt = 'JR';
    profilePic.classList.add('profile-pic', 'pic-right');

    let JRTableDiv = document.createElement('div');

    let table = document.createElement('table');

    let heading = document.createElement('h3');
    heading.innerHTML = `Table of ${numbers[0]}`;

    for (let i = 1; i <= 10; i++) {
      // Create a table row
      let row = document.createElement('tr');

      // Create a table cell
      let cell = document.createElement('td');
      cell.textContent = `${numbers[0]} x ${i} = ${numbers[0] * i}`;

      // Append the cell to the row
      row.appendChild(cell);

      // Append the row to the table
      table.appendChild(row);
    }

    JRMessage.appendChild(profilePic);
    JRTableDiv.appendChild(heading);
    JRTableDiv.appendChild(table);
    JRMessage.appendChild(JRTableDiv);
    conversation.appendChild(JRMessage);

  }
}

// Some small Function

// Loggin & SigningUp & Logout function

function loggin() {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat');
  JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    <form method="post" action="./Component/login.php" id="login-form">
      <input class="formInput" type="text" id="username" name="username" placeholder="Enter Your Username">
      <input class="formInput" type="password" id="password" name="password" placeholder="Enter Your Password">
      <button id="login-button" class="button-70 replyBtn">Login</button>
    </form>

  `;
  conversation.append(JRMessage);
}

function signingUp() {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat');
  JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    <form method="post" action="./Component/users_registration.php" id="signup-form">
      <input class="formInput" type="text" id="name" name="name" placeholder="Enter Your Name">
      <input class="formInput" type="text" id="username" name="username" placeholder="Enter Your Username">
      <input class="formInput" type="text" id="email" name="email" placeholder="Enter Your Email Id">
      <input class="formInput" type="text" id="phone" name="phone" placeholder="Enter Your Phone Number (Optional)">
      <input class="formInput" type="password" id="password" name="password" placeholder="Create Your Password">
      <button type="submit" class="button-70 replyBtn">Signup</button>
    </form>
  `;
  conversation.append(JRMessage);

  messageInput.focus();
}

function logout() {
  fetch('./Component/logout.php')
    .then(response => response.json())
    .then(data => {
      JRMessage(data.message);
    })
    .catch(error => {
      JRMessage('Error:', error);
    })
}

// Loggin & SigningUp & Logout function
