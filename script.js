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


// FIND LONGEST WORD

// function takes a comma-seperated string of words and returns the longest word.
function FindLongestWord(str) {
    let res = "";
    const words = str.split(",");
    for(let i = 0; i<words.length; i++) {
        const word = words[i].trim();
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

	// check whether input is empty
	if(inp === "") {
		const largest = document.getElementById("largest");
		largest.classList.add("error");
		largest.innerHTML = "Please enter words separated by commas.";
		return;
	}	

	// check whether the user entered multiple words
	if(!inp.includes(",")) {
		const largest = document.getElementById("largest");
		largest.classList.add("error");
		largest.innerHTML = "Please enter at least two words separated by commas.";
		return;
	}
    const largest = document.getElementById("largest");
	// Remove previously added error styling
	largest.classList.remove("error");
	if(FindLongestWord(inp))largest.innerHTML = "The longest word is: <span class='res'>" + FindLongestWord(inp) + "</span>";
}


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

// LOAD DETAILS FROM THE COOKIES
function loadDetails() {
    const cookies = document.cookie.split(";");
    let name = "";
    let phone = "";
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split("=");
        if(cookie[0] === "name") {
            name = decodeURIComponent(cookie[1].trim());
        } else if(cookie[0] === "phone") {
            phone = decodeURIComponent(cookie[1].trim());
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


// JQUERY EXERCISE
$(document).ready(function(){

	// PART 1
	// a. Change the background color to #FFFF88 
	$("body").css("background-color","#FFFF88");


	// a. remove the border for all input elements in the page
	$("input").css("border","none");


	// a. Change table border color and text color
	$("table").css({"border":"#FF1A00", "color":"#CC0000"});


	// b. Hide the element with ID mypage-footer
	$("#mypage_footer").hide();



	// c. Create a new div
	const ref_div = $("<div></div>").attr("id","references").css({"width": "98%", "padding":"20px","border": "1px solid #EEEEEE", "margin" : "20px auto"});
	// array of references
	const references =[{ id : "html", name : "HTML Tutorials", url : "http://w3schools.com/html/default.asp"}, 
		{ id : "css", name : "CSS Tutorials", url: "https://www.w3schools.com/css/default.asp"},
		{ id : "js", name : "JavaScript Tutorials", url: "http://w3schools.com/js/default.asp" },
		{ id: "jq", name : "JQUERY Tutorials", url: "http://www.w3schools.com/jquery/default.asp"}
	];

	// create a header for the references div
	const ref_header = $("<h2></h2>").text("References: ");
	ref_div.append(ref_header); // add the header to the div

	const list = $("<ul></ul>").css("list-style", "none"); // create a list element to add the references
	// traverse through the array, create list items and append it to the list
	for(const ref of references){
        const li = $("<li></li>");
		const anchor = $("<a></a>").attr("id",ref.id).attr("href",ref.url).attr("target","_blank").text(ref.name).css("text-decoration","none");
		li.append(anchor);
		list.append(li);
	}
	ref_div.append(list); // append the list to the div

	$("#mypage_footer").before(ref_div); // add the div before footer



	//PART 2
	// a. change the mypage-header height to 10px, expand on mouse move and go back to smaller size when mouse moves away.
    $("#mypage_header").css({"height": "10px ", "overflow": "hidden", "padding": "0px"})
		.hover(
			function(){
				$(this).css({"height":"","padding": "25px"});
			},
			function(){
				$(this).css({"height": "10px", "overflow": "hidden", "padding": "0px"});
			}
		);


	// b. slideDown footer with speed of 10s and pop up an alert message once it is complete
	$("#mypage_footer").slideDown(10000, function(){
		alert("Animation complete.");
	});

	// Load saved cookie details when the page opens
	loadDetails();

	document.getElementById("max_btn").addEventListener('click',displayMax);
    document.getElementById("rev_btn").addEventListener('click',displayReverse);
	document.getElementById("lng_btn").addEventListener('click',displayLongestWord);
	document.getElementById("save_btn").addEventListener('click',saveDetails);
});


