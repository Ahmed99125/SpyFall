const playAgainBtn = document.querySelector('.play-again'),
  inputData = JSON.parse(localStorage.getItem('input')),
  gameData = JSON.parse(localStorage.getItem('data')),
  playersId = [];
  
const createDivs = numPlayers => {
  let html = '';
  for (let i = 0; i < numPlayers; i++) {
    html += `<div class="card card-game" id="${i}">
              <span class="game-info">
              
              </span>
            </div>`;
  }
  html += `<div class="card card-game" id="${numPlayers}">
              <span class="game-info">
                ابدأو اللعب
              </span>
            </div>`;

  document.querySelector('.container').innerHTML += html;

  generatePlayers(randomPlace());
  generateSpies();
}

const randomPlace = () => {
  const randNum = Math.floor(Math.random() * (gameData.place.length - 0) + 0),
    curPlace = gameData.place[randNum];
  return curPlace;
}


const generatePlayers = (curPlace) => {
  const range = parseInt(inputData.players) - parseInt(inputData.spies),
    card = document.querySelectorAll('.card-game'),
    doneArr = [];
  let randId;

  for (let i = 0; i < range; i++) {
    do {
      randId = Math.floor(Math.random() * (parseInt(inputData.players) - 0) + 0);
    } while (doneArr.includes(randId));
    doneArr.push(randId);
    playersId.push(randId);

    card[randId].firstElementChild.textContent = curPlace;
  }
}

const generateSpies = () => {
  const card = document.querySelectorAll('.card-game');

  for (let i = 0; i < parseInt(inputData.players); i++) {
    if (!playersId.includes(i)) {
      card[i].firstElementChild.textContent = gameData.spy;
    }
  }
}


const eventListeners = () => {
  document.addEventListener('DOMContentLoaded', () => {
    createDivs(parseInt(inputData.players));
    document.querySelector('.container').style.overflow = 'hidden';
  });
  
  let id = 0;
  document.querySelector('.container').addEventListener('click', e => {
    const card = document.querySelectorAll('.card-game');

    if (e.target.classList.contains('play-again') != true) {      
        if (card[id] != null) {
          if (card[id].offsetLeft > 1000) {
            card[id].classList.add('active');
            card[id].style.marginRight = `${-card[id].clientWidth / 2}px`
          } else if (card[id].classList.contains('active') && id != parseInt(inputData.players)) {
            card[id].style.marginRight = 0;
            card[id].classList.remove('active');
            card[id].style.right = '2000px';
            card[id].style.transform = 'rotate(-45deg)';
            id++
          }
        } else {  
          id = 0
        } 
      } else {
        window.location.replace('index.html');
        card.forEach(card => {
          card.remove();
        });
      }
    });
}

eventListeners();