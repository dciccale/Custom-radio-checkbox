$(function() {
	var tabContainer = $('#tabs'),
		sections = ['view','html'], section, lastTab,
		tabClick = function(e) {
			e.preventDefault();
			tab = $(this),
			section = tab.attr('href').replace('#','');			

			if(!$.isEmptyObject(lastTab)) {
				if(lastTab.attr('href').replace('#','') == section) return;
				lastTab.removeClass('current');
			}
			
			$.each(sections, function(i) {
				$('#'+sections[i]).hide();
			});
			
			tab.addClass('current');
			$('#'+section).show();
			lastTab = tab;
		}
		
	tabContainer.delegate('li > a', 'click', tabClick);
	
	tabContainer.find('a:eq(0)').click();
	
	var result = $('#result'),
		form = $('#form');
		
	form.submit(function(e) {
		e.preventDefault();
		result.html(form.serialize());
	});
});