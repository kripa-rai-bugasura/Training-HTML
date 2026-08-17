function max(a,b) {
    if(a > b) {
        return a;
    } else {
        return b;
    }
}

function displayMax() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let result = max(num1, num2);
    document.getElementById("max").innerHTML = "The maximum number is: <span class='res'>" + result + "</span>";
}

function reverse(str) {
    let res = "";
    for(let i = str.length - 1; i >= 0; i--) {
        res += str[i];
    }
    return res;
}

function displayReverse() {
    let inp = document.getElementById("reverse").value;
    let reversed = reverse(inp);
    document.getElementById("rev").innerHTML = "Reversed string is: <span class='res'>" + reversed + "</span>";
}

function FindLongestWord(str) {
    let res = "";
    let words = str.split(",");
    for(let i = 0; i<words.length; i++) {
        let word = words[i].trim();
        if(word.length > res.length) {
            res = word;
        }
    }
    return res;
}

function displayLongestWord() {
    let inp = document.getElementById("words").value;
    document.getElementById("largest").innerHTML = "The longest word is: <span class='res'>" + FindLongestWord(inp) + "</span>";
}

function saveDetails() {
    let name = document.getElementById("username").value;
    let phone = document.getElementById("user-phone").value;
    document.cookie = "name=" + encodeURIComponent(name) + ";max-age=604800; path=/";
    document.cookie = "phone=" + encodeURIComponent(phone)+ "; max-age=604800; path=/";
    document.getElementById("saved").innerText = "Details saved successfully!";
}

function loadDetails() {
    let cookies = document.cookie.split("; ");
    let name = "";
    let phone = "";
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if(cookie[0] === "name") {
            name = decodeURIComponent(cookie[1]);
        } else if(cookie[0] === "phone") {
            phone = decodeURIComponent(cookie[1]);
        }
    }

    if(name!==""){
        document.getElementById("username").value = name;
        document.getElementById("name").innerText = name;
    }
    if(phone!==""){
        document.getElementById("user-phone").value = phone;
        document.getElementById("mypage-phone").innerText = "Phone: " + phone;
        document.getElementById("mypage-phone").href = "tel:" + phone;
    }

}
window.onload = loadDetails;