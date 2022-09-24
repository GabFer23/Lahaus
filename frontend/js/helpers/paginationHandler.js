const generatePagination = (paginationContainer, params, totalPages, first, last) => {
  const ul = document.createElement('ul');
  ul.classList.add('pagination');

  for (let i = 0; i <= totalPages + 1; i++) {
    let pageClasses = '';
    let pageNumber = i;

    if (params.page === i) {
      pageClasses = `active`;
    }

    if (i === 0) {
      pageNumber = '<';
      pageClasses = first ? 'd-none' : '';
    }

    if (i === totalPages + 1) {
      pageNumber = '>';
      pageClasses = last ? 'd-none' : '';
    }

    ul.innerHTML += `
      <li class="page-item ${pageClasses}">
        <button class="page-link" id="${pageNumber}">${pageNumber}</button>
      </li>`;
  }

  paginationContainer.appendChild(ul);
};

// !================================================================================================================

const handlePageChange = ({ target }, params) => {
  if (target.id === '<') {
    params.page--;
    return;
  }

  if (target.id === '>') {
    params.page++;
    return;
  }

  params.page = Number(target.id);
};

export { generatePagination, handlePageChange };
