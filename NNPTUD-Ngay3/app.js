// ===== CREATE PRODUCT =====
const createModal = new bootstrap.Modal(document.getElementById("createModal"));

function openCreateModal() {
    document.getElementById("createTitle").value = "";
    document.getElementById("createPrice").value = "";
    document.getElementById("createDescription").value = "";
    document.getElementById("createCategory").value = 1;
    document.getElementById("createImage").value = "";

    createModal.show();
}

function createProduct() {
    const payload = {
        title: document.getElementById("createTitle").value,
        price: Number(document.getElementById("createPrice").value),
        description: document.getElementById("createDescription").value,
        categoryId: Number(document.getElementById("createCategory").value),
        images: [document.getElementById("createImage").value]
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(newProduct => {
            alert("Tạo sản phẩm thành công (fake API)");
            createModal.hide();

            // thêm vào danh sách local
            allProducts.unshift(newProduct);
            filteredProducts = allProducts;
            currentPage = 1;
            render();
        });
}
