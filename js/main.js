function table() {
    let sortDitrection = 'ascending';

    let person= [
        {id: 1, name: 'Вася', date: '15.06.2018', count: 11},
        {id: 2, name: 'Петя', date:'23.11.2018', count: 23},
        {id: 3, name: 'Иван', date: '12 марта 2017', count: 3},
        {id: 4, name: 'Александр', date: '20/12/2010', count: 1},
        {id: 5, name: 'Евгений', date: '12.09.2018', count: 112},
        {id: 6, name: 'Мария', date: '1.08.2016', count: 122},
        {id: 7, name: 'Анастасия', date: '20.11.2018', count: 34},
        {id: 8, name: 'Степан', date: '12.11.2019', count: 10},
    ];

    let personData = JSON.parse(JSON.stringify(person));
    
    let columns = document.querySelectorAll('th');

    columns.forEach(column => {
        column.addEventListener('click', () => {
            columns.forEach(column => {
                column.classList.remove('active');
            });

            column.classList.add('active');
        
            search(column.dataset.column);
            sortColumn(column.dataset.column);
        })
    })
  
    /* создаёт таблицу */
    function creationTable(personData) {;
        const tableBody = document.getElementById('tableBody');
        let table = '';
    
        personData.forEach(td => {
            table += `<tr><td data-column="id">${td.id}</td><td data-column="name">${td.name}</td><td data-column="date">${td.date}</td><td data-column="count">${td.count}</td></tr>`;
        });
    
        tableBody.innerHTML = table;
    }

    /* Поиск по столбцу */
    function search(columnName) {
        let search = document.querySelector('.search');

        search.addEventListener('keyup', () => {
            let filter = search.value.toLowerCase(),
                filterElement = tableBody.querySelectorAll('tbody td');
            
            filterElement.forEach(item => {
                if(item.dataset.column === columnName) {
                    item.innerHTML.toLowerCase().indexOf(filter) > -1 ? item.closest('tr').style.display = '' : item.closest('tr').style.display = 'none';
                };
            });
        });
    };
    
    /* запуск сортировки */
    function sortColumn(columnName) {
        if (columnName === 'id' || columnName === 'count') {
            sortNumberColumn(sortDitrection, columnName);
        };
        if (columnName === 'name') {
            sortNameColumn(sortDitrection, columnName);
        };
        if (columnName === 'date') {
            sortDataColumn(sortDitrection, columnName);
        };
        
        creationTable(personData);
    };
    
    /* сортировка для id или счёт */
    function sortNumberColumn(sort, columnName) {
        personData.sort((a, b) => {
            if (sort === 'ascending') {
                sortDitrection = 'descending';
                return a[columnName] - b[columnName]
            };
            if (sort === 'descending') {
                sortDitrection = 'noSort';
                return b[columnName] - a[columnName]
            };
            if (sort === 'noSort') {
                sortDitrection = 'ascending';
                noSort()
            };
        });
    }; 
    
    /* сортировка для имя */
    function sortNameColumn(sort, columnName) {
        personData.sort((a, b) => {
            sortDitrection = 'descending';

            if (sort === 'ascending') {
                if (a[columnName] > b[columnName]) {
                    return 1;
                };
                if (a[columnName] < b[columnName]) {
                    return -1;
                };
            };

            if (sort === 'descending') {
                sortDitrection = 'noSort';

                if (a[columnName] < b[columnName]) {
                    return 1;
                }; 
                if (a[columnName] > b[columnName]) {
                    return -1;
                };
            };

            if (sort === 'noSort') {
                sortDitrection = 'ascending';
                noSort()
            };
        });
    };
    
    /* сортировка для даты */
    function sortDataColumn(sort, columnName) {
        personData.sort((a,b) => {
            let dateA = a[columnName].replace(/марта/g, '03').split(/[\.\/\ ]+/).reverse();
            dateA += new Date(dateA);
            let dateB = b[columnName].replace(/марта/g, '03').split(/[\.\/\ ]+/).reverse();
            dateB += new Date(dateB);

            if (sort === 'ascending') {
                sortDitrection = 'descending';

                if (dateA > dateB) {
                    return 1;
                };
                if (dateA < dateB) {
                    return -1;
                };
            }

            if (sort === 'descending') {
                sortDitrection = 'noSort';

                if (dateA < dateB) {
                    return 1;
                };
                if (dateA > dateB) {
                    return -1;
                };
            }

            if (sort === 'noSort') {
                sortDitrection = 'ascending';
                noSort()
            }
        });
    };

    /* Без сортировки */
    function noSort() {
        personData = JSON.parse(JSON.stringify(person));
    }
    
    creationTable(personData);
};

table()
