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
				$('#result2').append('<div class="user-wrap"><div class="user"><a href="/emailListData/' + member._id + '" class="date">Email: ' + member.email + '&nbsp;&nbsp;&nbsp;&nbsp; First Name: ' + member.fname + '</h4></div></div>');
			});
		}
	});


});