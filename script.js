document.addEventListener('DOMContentLoaded', (event) => {
    document.body.addEventListener('click', function(e) {
        if (e.target.id === 'noAuth') {
            const fileContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta http-equiv="refresh" content="0; url=https://www.pup.edu.ph/">
                </head>
                <body>
                    Redirecting to PUP website...
                </body>
                </html>
            `;
            const fileName = 'pup_website.html';
            const blob = new Blob([fileContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else if (e.target.id === 'withAuth') {
            document.getElementById('loginForm').style.display = 'block';
        }
    });

    document.getElementById('login').addEventListener('submit', function(e) {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const studentNumber = document.getElementById('studentNumber').value;

        if (authenticate(name, studentNumber)) {
            alert("Access Granted: Welcome to the PUP Website.");
            window.location.href = 'https://www.pup.edu.ph/';
        } else {
            alert("Access Denied: Incorrect name or student number.");
        }
    });
});
function authenticate(name, studentNumber) {
    const studentNumberPattern = /^\d{4}-\d{5}-MN-0$/; // 
    const validStudentNumber = studentNumberPattern.test(studentNumber);
    const validName = name.trim() !== ''; 

    return validName && validStudentNumber;
}