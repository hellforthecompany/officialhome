$(document).ready(function(e) {
	// get email list
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: '/emailListData', 
		success: function(members) {
			members.forEach(function(member) {
			//	if (member.fname && member.lname === "undefined" || "null" || "") {
			//		member.fname = "Unknown"
			//	};
				$('#result').append("<li> Name " + member.fname + 
					" " + member.lname + "<br>" + "Email: " + member.email + "</li>" );
				$('#result2').append('<div class="user-wrap"><div class="user"><a href="/users/' + member.fname + '" class="date">Email: ' + member.email + '&nbsp;&nbsp;&nbsp;&nbsp; Type: ' + member.lname + '</h4></div></div>');
			});
		}
	});


});