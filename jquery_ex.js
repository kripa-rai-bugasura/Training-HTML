

$(document).ready(function(){

	// JQUERY EXERCISE
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

	const div_header = $("<h2></h2>").text("References");
	$("#footer_header").before(div_header); // add div header so that it becomes a part of accordion

	$("#footer_header").before(ref_div); // add the div before footer



	//PART 2
	// a. change the mypage-header height to 10px, expand on mouse move and go back to smaller size when mouse moves away.
    $("#mypage_header").css({"height":"10px","overflow":"hidden"})
		.hover(
			function(){
				$(this).height("");
			},
			function(){
				$(this).css({"height":"10px","overflow":"hidden"});
			}
		);

	//dialog to open after footer slidedown
	$("#dialog").dialog({
		autoOpen: false,  //autoOpen set to false , so it doesn't open upon initialization
		modal: true,
		buttons: {
			"OK": function() {
			$( this ).dialog( "close" );
			},
			Cancel: function() {
			$( this ).dialog( "close" );
			}
      	}
	})

	//JQUERY UI Exercise
	$("#mypage_footer").slideDown(10000, function(){
		$("#dialog").dialog("open");
	});
    
	//make resume section accordions
	$( "#accordion" ).accordion({
		collapsible: true,  //allow all sections to be collapsible
		heightStyle: "content"
	});

	//change buttons to jquery ui buttons , add icons to buttons
	$("[type='button']")
		.eq(0).button({
			icon: "ui-icon-search"
		})
		.end().eq(1).button({
			icon: "ui-icon-refresh"
		})
		.end().eq(2).button({
			icon: "ui-icon-search"
		})
		.end().eq(3).button({
			icon: "ui-icon-disk"
		});
		
	//add datepicker to datepicker element with date format dd/mm/yyyy
	$( "#datepicker" ).datepicker({
		showAnim: "slideDown",
		dateFormat: "dd/mm/yy"
	})

	//make center content section tabs
	$(" #tabs ").tabs({
		collapsible: true
	})


	let tags = []
	const techstacks = $(".tech");
	// extract technologies from the tech stack and push it to tags
	for(const ts of techstacks) {
		let techs = ts.innerText.split(", ");
		tags.push(...techs);
	}
	function split( val ) {
		return val.split( /,\s*/ );
	}
	function extractLast( term ) {
		return split( term ).pop();
	}
	$( "#words" ).autocomplete({
		minLength: 0,
		source: function( request, response ) {
			// delegate back to autocomplete, but extract the last term
			response( $.ui.autocomplete.filter(
				tags, extractLast( request.term ) 
			) );
		},
		focus: function() {
			// prevent value inserted on focus
			return false;
		},
		select: function( event, ui ) {
			var terms = split( this.value );
			// remove the current input
			terms.pop();
			// add the selected item
			terms.push( ui.item.value );
			// add placeholder to get the comma-and-space at the end
			terms.push( "" );
			this.value = terms.join( ", " );
			return false;
		}
	})
});
