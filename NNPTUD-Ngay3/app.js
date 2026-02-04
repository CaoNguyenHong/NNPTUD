const API_URL = "https://api.escuelajs.co/api/v1/products";

const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const pageSizeSelect = document.getElementById("pageSize");
const pagination = document.getElementById("pagination");

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);
let titleSortAsc = true;
let priceSortAsc = true;

const modal = new bootstrap.Modal(document.getElementById("productModal"));

// ===== FETCH =====
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        allProducts = data;
        filteredProducts = data;
        render();
    });

// ===== RENDER =====
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

    pageData.forEach(p => {
        const tr = document.createElement("tr");
        tr.onclick = () => openModal(p);

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.title}</td>
            <td>${p.price}</td>
            <td>${p.category?.name || ""}</td>
            <td>
                <img src="${p.images?.[0] || ""}" style="width:50px">
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// ===== MODAL OPEN =====
function openModal(product) {
    document.getElementById("modalId").value = product.id;
    document.getElementById("modalTitle").value = product.title;
    document.getElementById("modalPrice").value = product.price;
    document.getElementById("modalDescription").value = product.description;
    document.getElementById("modalImage").value = product.images?.[0] || "";

    modal.show();
}

// ===== UPDATE PRODUCT =====
function updateProduct() {
    const id = document.getElementById("modalId").value;

    const payload = {
        title: document.getElementById("modalTitle").value,
        price: Number(document.getElementById("modalPrice").value),
        description: document.getElementById("modalDescription").value,
        images: [document.getElementById("modalImage").value]
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(updated => {
            alert("Update thành công (fake API)");
            modal.hide();

            // update local data
            const index = allProducts.findIndex(p => p.id == id);
            allProducts[index] = { ...allProducts[index], ...updated };
            filteredProducts = allProducts;
            render();
        });
}

// ===== SEARCH =====
searchInput.addEventListener("input", () => {
    const key = searchInput.value.toLowerCase();
    filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(key)
    );
    currentPage = 1;
    render();
});

// ===== PAGINATION =====
function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
}

function changePage(p) {
    currentPage = p;
    render();
}

// ===== SORT =====
function sortByTitle() {
    filteredProducts.sort((a, b) =>
        titleSortAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    titleSortAsc = !titleSortAsc;
    render();
}

function sortByPrice() {
    filteredProducts.sort((a, b) =>
        priceSortAsc ? a.price - b.price : b.price - a.price
    );
    priceSortAsc = !priceSortAsc;
    render();
}
