$(function() {
	var result = $('#result'),
		form = $('#form');
		
	form.submit(function(e) {
		e.preventDefault();
		result.html(form.serialize());
	});
	
	
	var sections = ['view','html'], section, lastTab,
		tabClick = function(e) {
			e.preventDefault();
			tab = $(this),
			section = tab.attr('href').replace('#','');
			

			if(!$.isEmptyObject(lastTab)) {
				if(lastTab.attr('href').replace('#','') == section) return false;
				lastTab.removeClass('current');
			}
			
			$.each(sections, function(i) {
				$('#'+sections[i]).hide();
			});
			
			tab.addClass('current');
			$('#'+section).show();
			lastTab = tab;
		}
		
	$('#tabs').delegate('li > a', 'click', tabClick);
	
	$('#tabs').find('a:eq(0)').click();
});