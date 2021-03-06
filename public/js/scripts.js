const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#pOne')
const messageTwo = document.querySelector('#pTwo')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    
    messageOne.textContent = 'Loading results'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent  = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})