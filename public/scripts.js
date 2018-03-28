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

  const jsonToken = await response.json();

  return jsonToken;
})