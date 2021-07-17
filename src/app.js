// Get Data

const fetchJson = async () => {
  const res = await fetch('src/package.json', {
    headers: {
      feature: 'interest-cohort'
    }
  });
  const data = await res.json()

  return data;
}

// Storage

const addToStorage = (data, name) => {
  localStorage.setItem(name, JSON.stringify(data))
}

fetchJson().then(data => {
  addToStorage(data, 'data');
});

const startBtn = document.querySelector('.start-game');
let numPlayers = document.getElementById('players'),
numSpies = document.getElementById('spies');

const redirect = () => {
  if (numPlayers.value == '' || numSpies.value == '' || numPlayers.value <= numSpies.value || numPlayers.value <= 1  || numSpies.value == 0) {
    alert('Enter Valin Input');
  } else {
    window.location.replace('game.html');
  }
}

const saveInput = (players, spies) => {
  const input = {
    players,
    spies
  }
  addToStorage(input, 'input');
}

if (startBtn != null) {
  startBtn.addEventListener('click', () => {

    saveInput(numPlayers.value, numSpies.value);
    redirect();
  });
}