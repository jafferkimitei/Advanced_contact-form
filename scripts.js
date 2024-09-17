async function handleFormSubmit(event) {
    event.preventDefault();

   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    const minMessageLength = 10;
    const maxMessageLength = 500;
   
    if (!name || !email || !message) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill in all fields.',
        });
        return;
    }

    if (!nameRegex.test(name)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'Please enter a valid name. Only letters, spaces, hyphens, and apostrophes are allowed.',
        });
        return;
    }

    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    if (message.trim().length < minMessageLength) {
        Swal.fire({
            icon: 'error',
            title: 'Message Too Short',
            text: `Please provide a message with at least ${minMessageLength} characters.`,
        });
        return;
    }

    if (message.trim().length > maxMessageLength) {
        Swal.fire({
            icon: 'error',
            title: 'Message Too Long',
            text: `Your message cannot exceed ${maxMessageLength} characters.`,
        });
        return;
    }
    
    const accessKey = 'YOUR_ACCESS_KEY_HERE';
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        Swal.fire({
            icon: 'error',
            title: 'Access Key Missing',
            text: 'Access key is missing or incorrect. Please provide a valid Web3Forms access key.',
        });
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
            Swal.fire({
                icon: 'success',
                title: 'Message Sent',
                text: 'Your message has been sent successfully!',
            });
            document.querySelector('.contact-form').reset();
        } else {
            const errorMessage = await response.json();
            console.error('Error from Web3Forms:', errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'There was an issue sending your message. Please try again later.',
            });
        }
    } catch (error) {
        console.error('Network error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please check your connection and try again.',
        });
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
