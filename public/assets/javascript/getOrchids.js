$.ajax({
	url: '/orchids',
	method: 'GET'
}).then(function(data){
	var p, ob, necc, form, button;
	for (var i=0; i<data.length; i++){
		ob = data[i];
		p = $('<p>');
		p.text(ob.question + ' - ' + ob.category + ' - ' + ob.difficulty);

		form = $('<form>');

		form.attr('action', '/delete/' + ob.id);
		form.attr('method', 'POST');

		button = $('<button>');

		button.text('delete');

		form.append(button);

		p.append(form);

		$('body').append(p);
	}
});