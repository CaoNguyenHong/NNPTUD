const API_URL = "https://api.escuelajs.co/api/v1/products";

const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const pageSizeSelect = document.getElementById("pageSize");
const pagination = document.getElementById("pagination");

// ===== DATA STATE =====
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);

// sort state
let titleSortAsc = true;
let priceSortAsc = true;

// ===== FETCH API =====
fetch(API_URL)
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        filteredProducts = products;
        render();
    });

// ===== MAIN RENDER =====
function render() {
    renderTable();
    renderPagination();
}

// ===== TABLE =====
function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredProducts.slice(start, end);

    pageData.forEach(product => {
        const tr = document.createElement("tr");

        // tooltip description
        tr.setAttribute("data-bs-toggle", "tooltip");
        tr.setAttribute("title", product.description || "No description");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name || ""}</td>
            <td>
                <img
                    src="${product.images?.[0] || ""}"
                    style="width:60px;height:60px;object-fit:cover"
                >
            </td>
        `;

        tableBody.appendChild(tr);
    });

    document
        .querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach(el => new bootstrap.Tooltip(el));
}

// ===== PAGINATION =====
function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Prev</a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
}

function changePage(page) {
    currentPage = page;
    render();
}

// ===== SEARCH =====
searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    render();
});

// ===== PAGE SIZE =====
pageSizeSelect.addEventListener("change", function () {
    pageSize = Number(this.value);
    currentPage = 1;
    render();
});

// ===== SORT =====
function sortByTitle() {
    filteredProducts.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase())
            return titleSortAsc ? -1 : 1;
        if (a.title.toLowerCase() > b.title.toLowerCase())
            return titleSortAsc ? 1 : -1;
        return 0;
    });

    titleSortAsc = !titleSortAsc;
    currentPage = 1;
    render();
}

function sortByPrice() {
    filteredProducts.sort((a, b) =>
        priceSortAsc ? a.price - b.price : b.price - a.price
    );

    priceSortAsc = !priceSortAsc;
    currentPage = 1;
    render();
}

// ===== EXPORT CSV (VIEW HIỆN TẠI) =====
function exportCSV() {
    // chỉ export data của trang hiện tại
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredProducts.slice(start, end);

    if (pageData.length === 0) {
        alert("Không có dữ liệu để export!");
        return;
    }

    const headers = ["ID", "Title", "Price", "Category", "Image"];
    const rows = pageData.map(p => [
        p.id,
        `"${p.title.replace(/"/g, '""')}"`,
        p.price,
        `"${p.category?.name || ""}"`,
        p.images?.[0] || ""
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products_view.csv";
    a.click();

    URL.revokeObjectURL(url);
}
