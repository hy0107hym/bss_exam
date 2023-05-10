const form = document.querySelector('.login-form');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	
	const username = document.querySelector('input[name="username"]').value;
	const password = document.querySelector('input[name="password"]').value;
	
	if (username === 'admin' && password === '123456') {
    window.location.href = "http://127.0.0.1:5500/page/dashbroad.html";
	} else {
		alert('Incorrect username or password!');
	}
});

