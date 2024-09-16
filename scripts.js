
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    alert('Your message has been sent!');
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
