let conversation = document.getElementById('conversation');
let messageInput = document.getElementById('messageInput');
let sendBtn = document.getElementById('sendBtn');

// Keyword store here
const numberRegex = /\b\d+\b/g;
const arithmeticRegex = /(\d+)\s*([+\-*/%^])\s*(\d+)/;
const arithmeticKeywords = ['solve', 'calculate', 'compute', 'add', 'subtract', 'multiply', 'divide', 'modulo', 'power'];
const tableKeywords = ['table', 'table of', 'generate a table for', 'create a table of', 'show a table of', 'display the table for', 'calculate a table of'];
const upToRegex = /up\s*to|Upto/i;
const randomKeywords = ['random number', 'generate a random number'];
const loginKeywords = ['login', 'loggin'];
const signupKeywords = ['signup', 'create account', 'sign up', 'createaccount', 'create my new account', 'create my account'];
const logoutKeywords = ['logout'];
const dateTimeKeywords = ['today', 'today date', 'date', 'day', 'month', 'year'];

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
    profilePic.src = './image/Chatbot  (Small).png'; // Path to user image
    profilePic.alt = 'User';
    profilePic.classList.add('profile-pic', 'pic-right');
    userMessage.innerHTML = `<p>${messageInput.value}</p>`;
    userMessage.appendChild(profilePic);
    conversation.append(userMessage);

    showTyping();
    let UserMessage = messageInput.value;
    messageInput.value = "";

    setTimeout(() => {
      document.getElementById('showTyping').remove();
      reply(UserMessage);
    }, 2000);
  }
}

function showTyping() {
  let JRTyping = document.createElement('div');
  JRTyping.classList.add('JR-Message', 'chat', 'loader' );
  JRTyping.id = 'showTyping'

  conversation.append(JRTyping);
  scrollToBottom();
}

// Reply Function
function reply(userInput) {
  if (isBlank(userInput)) {
    JRMessage(`Ohh😜! You forget to enter your message. <br> Kindly enter your message first.`);
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
        handleDefaultReply(userInput);
      });
  }
  scrollToBottom();
}

function handleDefaultReply(userInput) {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat', 'Defult-Message');
  JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    <div class="buttons">
      <p>Ohh! Sorry, I don't have an appropriate reply for your question. <br> Can you give me the proper reply to "${userInput}"?</p>
    </div>
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

  JRMessage.querySelector('.buttons').append(replyBtnYes, replyBtnNo);
  conversation.append(JRMessage);
  scrollToBottom();
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
      alert("Thanks to share your knowledge with me 😊");
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
}

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

function isBlank(input) {
  return input.trim() === '';
}

function scrollToBottom() {
  conversation.scrollTo({
    top: conversation.scrollHeight,
    behavior: 'smooth'
  });
}

function toSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Login Function
function loggin() {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat');
  JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    <form method="post" action="./Component/login.php" id="login-form" onsubmit="return validateLoginForm();">
      <input class="formInput" type="text" id="username" name="username" placeholder="Enter Your Username" required>
      <input class="formInput" type="password" id="password" name="password" placeholder="Enter Your Password" required>
      <button id="login-button" class="button-70 replyBtn">Login</button>
    </form>
  `;
  conversation.append(JRMessage);
}

// Signup Function
function signingUp() {
  let JRMessage = document.createElement('div');
  JRMessage.classList.add('JR-Message', 'chat');
  JRMessage.innerHTML = `
    <img src="./image/Chatbot  (Small).png" alt="JR" class="profile-pic pic-right">
    <form method="post" action="./Component/signup.php" id="signup-form">
      <input class="formInput" type="text" id="signup-username" name="signup-username" placeholder="Enter Your Username" required>
      <input class="formInput" type="password" id="signup-password" name="signup-password" placeholder="Enter Your Password" required>
      <button id="signup-button" class="button-70 replyBtn">Sign Up</button>
    </form>
  `;
  conversation.append(JRMessage);
}

// Logout Function
function logout() {
  JRMessage("You are successfully logged out.");
}

// Display Date Function
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

// Arithmetic Function
function answerArithmeticQuestion(question) {
  const match = question.match(arithmeticRegex);
  let answer = "";

  if (match) {
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);
    switch (operator) {
      case '+':
        answer = `${num1} + ${num2} = ${num1 + num2}`;
        break;
      case '-':
        answer = `${num1} - ${num2} = ${num1 - num2}`;
        break;
      case '*':
      case 'x':
        answer = `${num1} * ${num2} = ${num1 * num2}`;
        break;
      case '/':
        answer = `${num1} / ${num2} = ${num2 !== 0 ? (num1 / num2) : 'Division by zero is not allowed.'}`;
        break;
      case '%':
        answer = `${num1} % ${num2} = ${num1 % num2}`;
        break;
      case '^':
        answer = `${num1} ^ ${num2} = ${Math.pow(num1, num2)}`;
        break;
      default:
        answer = "Invalid operator.";
    }
  } else {
    answer = "Could not parse your question. Please use a format like 'Solve 10 * 5.'";
  }
  JRMessage(answer);
}

function generateTable(userInput) {
  const numbers = extractNumbersFromInput(userInput);

  if (numbers.length === 0 || numbers[0] === 0) {
    JRMessage("Zero is not a valid input. Please enter a positive number.");
  } else {
    let JRMessageDiv = document.createElement('div');
    JRMessageDiv.classList.add('JR-Message', 'chat');

    // Create the profile picture
    let profilePic = document.createElement('img');
    profilePic.src = './image/Chatbot  (Small).png';
    profilePic.alt = 'JR';
    profilePic.classList.add('profile-pic', 'pic-right');

    let JRTableDiv = document.createElement('div');

    // Create a heading
    let heading = document.createElement('h3');
    heading.innerHTML = `Table of ${numbers[0]}`;

    // Create a table element
    let table = document.createElement('table');
    table.style.width = '100%'; // Optional: Make the table width 100%
    table.style.borderCollapse = 'collapse'; // Optional: Collapse borders

    // Create table rows for multiplication table
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

    // Append elements to the message
    JRMessageDiv.appendChild(profilePic);
    JRTableDiv.appendChild(heading);
    JRTableDiv.appendChild(table);
    JRMessageDiv.appendChild(JRTableDiv);

    // Append the message to the conversation
    conversation.appendChild(JRMessageDiv);
    scrollToBottom(); // Ensure we scroll to the bottom after appending the message
  }
}

// Generate Random Number Function
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

// Helper Function to check for keywords
function containsKeyword(input, keywords) {
  return keywords.some(keyword => input.toLowerCase().includes(keyword));
}

// Helper Function for Chatbot Response
function JRMessage(message) {
  let JRMessageDiv = document.createElement('div');
  JRMessageDiv.classList.add('JR-Message', 'chat');

  // Create profile picture element
  let profilePic = document.createElement('img');
  profilePic.src = './image/Chatbot  (Small).png';
  profilePic.alt = 'JR';
  profilePic.classList.add('profile-pic', 'pic-right');

  // Create a container for the message content
  let messageElement = document.createElement('div'); // Use a div to allow HTML content
  JRMessageDiv.appendChild(profilePic);
  JRMessageDiv.appendChild(messageElement);
  conversation.append(JRMessageDiv);

  // Split the message by HTML tags while keeping the tags
  let htmlParts = message.split(/(<[^>]+>)/g); // Split by tags

  let index = 0; // To keep track of the current character index

  function typeCharacter() {
    if (index < htmlParts.length) {
      let currentPart = htmlParts[index];

      if (currentPart.startsWith('<') && currentPart.endsWith('>')) {
        // If it's an HTML tag, append it directly
        messageElement.innerHTML += currentPart;
        index++; // Move to the next part
        scrollToBottom();
        setTimeout(typeCharacter, 30); // Continue with the next part
      } else {
        // If it's text, type it out character by character
        let textIndex = 0; // Index for the current text part
        function typeTextCharacter() {
          if (textIndex < currentPart.length) {
            messageElement.innerHTML += currentPart.charAt(textIndex); // Append one character
            textIndex++;
            scrollToBottom();
            setTimeout(typeTextCharacter, 30); // Typing speed
          } else {
            index++; // Move to the next part (text or tag)
            scrollToBottom();
            setTimeout(typeCharacter, 30); // Continue with the next part
          }
        }
        typeTextCharacter(); // Start typing text
        return; // Exit the current function
      }
    } else {
      scrollToBottom(); // Scroll to the bottom after the message is fully displayed
    }
  }

  typeCharacter(); // Start the typing effect
}

// Validate Login Form
function validateLoginForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username.trim() === "" || password.trim() === "") {
    alert("Username and password cannot be empty.");
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}


// Other Important Helping user Function

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

function ConvertIntoLowercase(input) {
  return input.toLowerCase();
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

function extractNumbersFromInput(input) {
  const matches = input.match(numberRegex);

  const numbers = matches ? matches.map(match => parseInt(match, 10)) : [];

  return numbers;
}