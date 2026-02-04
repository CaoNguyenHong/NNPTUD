const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const pageSizeSelect = document.getElementById("pageSize");
const pagination = document.getElementById("pagination");

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);

// Fetch API
fetch(API_URL)
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        filteredProducts = products;
        render();
    });

// Render tổng
function render() {
    renderTable();
    renderPagination();
}

// Render table theo page
function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredProducts.slice(start, end);

    pageData.forEach(product => {
        const tr = document.createElement("tr");

        tr.setAttribute("data-bs-toggle", "tooltip");
        tr.setAttribute("title", product.description || "No description");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name || ""}</td>
            <td>
                <img src="${product.images?.[0] || ""}"
                     style="width:60px;height:60px;object-fit:cover;">
            </td>
        `;
        tableBody.appendChild(tr);
    });

    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach(el => new bootstrap.Tooltip(el));
}

// Render pagination
function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    // Prev
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Prev</a>
        </li>
    `;

    // Pages
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // Next
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderTable();
    renderPagination();
}

// Search
searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    render();
});

// Change page size
pageSizeSelect.addEventListener("change", function () {
    pageSize = Number(this.value);
    currentPage = 1;
    render();
});
