loadContent();

function loadContent() {

	$("body").on("click", ".btn", function(){
		var tab_id = $(this).attr("data-tab-id"); 
		getAjax(tab_id);
	});

	$(".tab").on("click", function(){
		var tab_id = $(this).attr("data-tab-id");
		getAjax(tab_id);
		$(".tab").removeClass("open") 
		$(this).addClass("open");
	});

	getAjax(1);

};

function getAjax(id) {

 	$.ajax({
		url: "js/json_"+id,
		method: "GET",
		dataType: "json"
	}).done(function(response){
		if (id == 1 || id == 4){
			drawFirstTab(response, id);
		} else if (id == 2){
			drawSecondTab(response);
		} else {
			drawThirdTab(response);
		};
	}).fail(function(err_response){
		console.log("error");
	});
};

function drawFirstTab(data, tab_id) {
	var html = "",
		html_p = "",
		max_length = data.payload.list.length;

		$(".content").html("<ul></ul>");

		for(var i = 0; i<max_length; i++){
			var item = data.payload.list[i];
				html += "<li>"+item.text+"</li>";
		}
		
		$("ul").html(html);
		if (tab_id == 1){
			html_p = '<div class="btn" data-tab-id="4">Change List</div>';
		} else if (tab_id == 4) {
			html_p = '<div class="btn" data-tab-id="1">Change List</div>';
		}
		$(".content").append(html_p);
};

function drawSecondTab(data) {
	$(".content").html('<p>'+ data.payload.description +'</p>')
};

function drawThirdTab(data) {
	var html = "",
		max_length = data.payload.gallery.length;

		for( var i = 0; i<max_length; i++ ) {
			html += '<img src="'+data.payload.gallery[i].img_src+'"/>'
		}
	$(".content").html(html);
};































