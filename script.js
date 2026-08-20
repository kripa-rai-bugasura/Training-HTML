// FIND MAXIMUM OF TWO NUMBERS

// function to find maximum of two numbers using if-else.
function max(a,b) {
    if(a > b) {
        return a;
    } else {
        return b;
    }
}

// Reads two numbers from the page input field.
// validates it and displays the reversed string or error if any.
function displayMax() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;

	// Check whether either input is empty
	if(num1 === "" || num2 === "") {
		let res = document.getElementById("max");
		res.innerHTML = "Please enter both numbers.";
		res.classList.add("error");
		return;
	}
	num1 = Number(num1);
	num2 = Number(num2);

	// Check whether both inputs are valid numbers
    if(isNaN(num1) || isNaN(num2)) {
		let res = document.getElementById("max");
        res.innerHTML = "Please enter valid numbers.";
		res.classList.add("error");
		return;
	}
	let res =document.getElementById("max");

	// Remove previously added error styling
	res.classList.remove("error");

	// Find and display the result
    let result = max(num1, num2);
    res.innerHTML = "The maximum number is: <span class='res'>" + result + "</span>";
}
document.getElementById("max_btn").addEventListener('click',displayMax);


// REVERSE A STRING

// function to reverse a string using a loop.
function reverse(str) {
    let res = "";
    for(let i = str.length - 1; i >= 0; i--) {
        res += str[i];
    }
    return res;
}

// Reads a string from the page input field.
// validates them and displays the maximum or error if any.
function displayReverse() {
    const inp = document.getElementById("reverse").value.trim();

	// check for empty input
	if(inp === "") {
		let rev = document.getElementById("rev");
		rev.classList.add("error");
		rev.innerHTML = "Please enter a string.";
		return;
	}

	const rev = document.getElementById("rev");
	// Remove previously added error styling
	rev.classList.remove("error");
    const reversed = reverse(inp);
    rev.innerHTML = "Reversed string is: <span class='res'>" + reversed + "</span>";
}
document.getElementById("rev_btn").addEventListener('click', displayReverse);


// FIND LONGEST WORD

// function takes a comma-seperated string of words and returns the longest word.
function FindLongestWord(str) {
    let res = "";
    const words = str.split(",").map(w => w.trim()).filter((word,index,arr) => !(word === "" && index == arr.length - 1));

	// check whether the user entered multiple words
	if(words.length < 2) {
		const largest = document.getElementById("largest");
		largest.classList.add("error");
		largest.innerHTML = "Please enter at least two words separated by commas.";
		return;
	}

    for(let i = 0; i<words.length; i++) {
        const word = words[i];
		// check for empty words
		if(word==="") {
			const largest = document.getElementById("largest");
			largest.classList.add("error");
			largest.innerHTML = "Please do not leave any word empty.";
			return;
		}
        if(word.length > res.length) {
            res = word;
        }
    }
    return res;
}

// Reads the comma-seperated word from the page input field.
// validates the input and displays the longest word or error if any.
function displayLongestWord() {
    const inp = document.getElementById("words").value;
    const largest = document.getElementById("largest");
	// Remove previously added error styling
	largest.classList.remove("error");
	if(FindLongestWord(inp)) largest.innerHTML = "The longest word is: <span class='res'>" + FindLongestWord(inp) + "</span>";
}
document.getElementById("long_btn").addEventListener('click', displayLongestWord);


// SAVE DETAILS USING COOKIES

// Validates the name and phone number, then saves the, as browser cookies.
function saveDetails() {
    const name = document.getElementById("username").value.trim();
    const phone = document.getElementById("user_phone").value.trim();
	const saved = document.getElementById("saved");

	// Remove previously added success styling
	saved.classList.remove("success");
	// Remove previously added error styling
	saved.classList.remove("error");

	// check that both fields are filled
	if(name === "" || phone === "") {
		saved.classList.add("error");
		saved.innerText = "Please enter both name and phone number.";
		return;
	}

	// check for minimum and maximum name length
	if(name.length<2 || name.length>50) {
		saved.classList.add("error");
		saved.innerText = name.length<2 ? "Name must be atleast 2 characters.": "Name must not exceed 50 characters."
		return;
	}

	// Validate a phone number
	const reg1 = /^[1-9]\d{9}$/;
	const reg2 = /^\+(?:[1-9]\s*\d{6,14}|[1-9]\d\s*\d{5,13}|[1-9]\d{2}\s*\d{4,12})$/;

	if(!(reg1.test(phone)||reg2.test(phone))) {
		saved.classList.add("error");
		saved.innerText = "Please enter valid phone number."
		return;
	}

	
	// save values as cookies for 7 days
    document.cookie = "name=" + encodeURIComponent(name) + ";max-age=604800; path=/";
    document.cookie = "phone=" + encodeURIComponent(phone)+ "; max-age=604800; path=/";
	saved.classList.add("success");
    saved.innerText = "Details saved successfully!";
}
document.getElementById("save_btn").addEventListener('click',saveDetails);

// LOAD DETAILS FROM THE COOKIES
function loadDetails() {
    const cookies = document.cookie.split("; ");
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
        document.getElementById("user_phone").value = phone;
        document.getElementById("mypage_phone").innerText = "Phone: " + phone;
        document.getElementById("mypage_phone").href = "tel:" + phone;
    }

}

// Load saved cookie details when the page opens
window.onload = loadDetails;
