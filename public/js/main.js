window.onload = function () {
    var oLogin = document.getElementById('login');
    var oRegister = document.getElementById('register');
    var oA1 = oLogin.getElementsByTagName('a')[0];
    var oA2 = oRegister.getElementsByTagName('a')[0];

    oA1.onclick = function () {
        oRegister.style.display = 'block';
        oLogin.style.display = 'none';
    }
    oA2.onclick = function () {
        oRegister.style.display = 'none';
        oLogin.style.display = 'block';
    }
}