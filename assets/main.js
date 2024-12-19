$(function () {
	fetch('https://raw.githubusercontent.com/sheppy9/pokemon-go/master/data/json/individual_pokemon.json')
		.then(response => response.json())
		.then((data) => {
			$("#pokemon-search-table").DataTable({
				data: data,
				columns: [
					{
						title: 'Name',
						data: (data) => {
							return `<div class="d-grid"><button class="btn btn-sm btn-outline-primary" onclick="nameClicked(this);" data-phrase="${data.search}">${data.name}</button></div>`;
						}
					},
					{ title: 'Search Phrase', data: 'search' },
					{ title: 'Type', data: 'type' },
				],
				destroy: true,
				pageLength: 50,
				stateSave: false,
				autoWidth: true,
				searching: true,
				processing: true,
				responsive: true,
				deferRender: true,
			});
		});
});

function nameClicked (btn) {
	let phrase = $(btn).data('phrase');
	navigator.clipboard.writeText(phrase);
	$("#toast-text").text(`${$(btn).text()}'s search phrase copied`);
	$("#toast").toast('show');
}