'use strict';

function handleTableClick(event) {
	if (event.target.classList.contains('prop__name')) {
		// console.log(event.target.classList);
		let sortDirection = 1;
    let sortField = event.target.dataset.propName;
    
    if (event.target.dataset.dir === '1') {
      sortDirection = -1;
    }
    event.target.dataset.dir = sortDirection;

    table.dataset.sortBy = sortField;
    sortTable(sortField, sortDirection);
	}
}