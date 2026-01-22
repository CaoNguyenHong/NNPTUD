// Câu 1
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isVailable = isAvailable;
}
// Câu 2 viet ra 1 mang Product gom 6 san pham cong nghe bao gom 3 chuot logitech cac ma g304, g703, supper light 2, ghe gaming, ban phim
let products = [
    new Product(1, "Logitech G304", 30000000, 0, "Chuột", false),
    new Product(4, "Ghế Gaming DXRacer", 35000000, 50, "Ghế", true),
    new Product(2, "Logitech G703", 50000000, 150, "Chuột", true),
    new Product(3, "Logitech Super Light 2", 20000000, 200, "Accessories", true),
    new Product(5, "Bàn Phím Corsair K95", 15000000, 0, "Accessories", false),
    new Product(6, "Tai Nghe HyperX Cloud II", 10000000, 120, "Tai Nghe", true)
];
//Câu 3 Tạo mảng mới chỉ chứa : name, price của mỗi sản phẩm
console.log("Cau 3");
let namePriceArray = products.map(product =>
    ({ name: product.name, price: product.price })
);
console.log(namePriceArray);
//Câu 4 Lọc ra các sản phẩm còn hàng trong kho (quantity > 0).
console.log("Cau 4");
let availableProducts = products.filter(product => product.quantity > 0);
console.log(availableProducts);

// Câu 5 Kiểm tra xem có ít nhất một sản phẩm có giá trên 30.000.000 hay không.
console.log("Cau 5");
let hasExpensiveProduct = products.some(product => product.price > 30000000);
console.log(hasExpensiveProduct);

// Câu 6 Kiểm tra xem tất cả sản phẩm thuộc danh mục "Accessories" có đang được bán (isAvailable = true) hay không.
console.log("Cau 6");
let allAccessoriesAvailable = products
    .filter(product => product.category === "Accessories")
    .every(product => product.isVailable === true);
console.log(allAccessoriesAvailable);
// Câu 7 Tính tổng giá trị kho hàng.
// Giá trị kho = price × quantity
console.log("Cau 7");
let totalInventoryValue = products.reduce((total, product) => {
    return total + product.price * product.quantity;
}, 0);
console.log(totalInventoryValue);

// Câu 8 Dùng for...of duyệt mảng products và in ra:
// Tên sản phẩm – Danh mục – Trạng thái
console.log("Cau 8");
for (let product of products) {
    let status = product.isVailable ? "Đang bán" : "Ngừng bán";
    console.log(`${product.name} – ${product.category} – ${status}`);
}
console.log("-----");

// Câu 9 Dùng for...in để:

// In ra tên thuộc tính

// In ra giá trị tương ứng
console.log("Cau 9");
for (let index in products) {
    let product = products[index];
    console.log(`Sản phẩm ${index + 1}:`);
    for (let key in product) {
        console.log(`  Thuộc tính: ${key}, Giá trị: ${product[key]}`);
    }
}
console.log("-----");

// Câu 10 Lấy danh sách tên các sản phẩm đang bán và còn hàng
console.log("Cau 10");
let sellingInStockProducts = products
    .filter(product => product.isVailable && product.quantity > 0)
    .map(product => product.name);
    console.log(sellingInStockProducts);