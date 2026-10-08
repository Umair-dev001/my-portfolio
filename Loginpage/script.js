function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "mu943165@gmail.com" && password === "12345") {
        alert("Login Successfully");
    }
    else if (email !== "mu943165@gmail.com") {
        alert("Wrong Email Entered");
    }
    else if (password !== "12345") {
        alert("Wrong Password Entered");
    }
}

document.getElementById("loginBtn").addEventListener("click", function (event) {
    event.preventDefault();
    login();
});