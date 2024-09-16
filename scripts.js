async function handleFormSubmit(event) {
    event.preventDefault();

   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const accessKey = 'YOUR_ACCESS_KEY_HERE';
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        alert('Access key is missing or incorrect. Please provide a valid Web3Forms access key.');
        return;
    }


    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('access_key', accessKey);

 
    document.getElementById('loading').style.display = 'block';

    try {
  
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

      
        if (response.ok) {
            alert('Your message has been sent successfully!');
            document.querySelector('.contact-form').reset();
        } else {
            const errorMessage = await response.json();
            console.error('Error from Web3Forms:', errorMessage);
            alert('There was an issue sending your message. Please try again later.');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('An error occurred. Please check your internet connection and try again.');
    } finally {
      
        document.getElementById('loading').style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
