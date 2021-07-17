// Get Data

const fetchJson = async () => {
  const res = await fetch('https://github.com/Ahmed99125/SpyFall/blob/master/package.json');
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
  if (numPlayers.value == '' || numSpies.value == '' || numPlayers <= numSpies.value) {
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