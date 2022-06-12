function onClick() {
  const result = document.querySelector("#result");
  result.innerHTML = 'NDEFReader' in window ? 'enabled' : 'disabled';
}

function main() {
  const button = document.querySelector("#button");
  button.addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', main, false);