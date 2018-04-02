const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const appName = document.getElementById('app-name').value;
  const body = {
    email,
    appName
  };
  const response = await fetch('/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const key = await response.json();
  
  document.getElementById('email').value = '';
  document.getElementById('app-name').value = '';
  const newContent = document.createTextNode(key.token); 
  const display = document.querySelector('.display');

  display.innerHTML = key.token;
  return key;
})