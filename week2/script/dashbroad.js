Orders.forEach((order) => {
  const tr = document.createElement("tr");
  const trContent = `
    <td>${order.name}</td>
    <td>${order.mac}</td>
    <td>${order.ip}</td>
    <td>${order.date}</td>
    <td>${order.dc}</td>
    <td>
        <button class="btn-delete">X</button>
      </td>
    `;
  tr.innerHTML = trContent;
  document.querySelector("table tbody").appendChild(tr);
});

let tableBody = document.getElementById("table-body");
let nameInput = document.getElementById("name-input");
let ipInput = document.getElementById("ip-input");

let priceInput = document.getElementById("price-input");
let addButton = document.getElementById("add-button");
let totalCell = document.getElementById("total");

addButton.addEventListener("click", addRow);

function addRow() {
  let name = nameInput.value;
  let ip = ipInput.value;
  let price = Number(priceInput.value).toFixed(2);
  let date = new Date().toLocaleString().slice(0, -12);

  let action = `<td>
  <button class="btn-delete">X</button>
</td>`;
  // generate MAC address and date added
  let mac = generateMAC();

  let row = tableBody.insertRow();
  let nameCell = row.insertCell();
  let macCell = row.insertCell();
  let ipCell = row.insertCell();
  let dateCell = row.insertCell();
  let priceCell = row.insertCell();
  let actionCell = row.insertCell();
  nameCell.innerHTML = name;
  macCell.innerHTML = mac;
  ipCell.innerHTML = ip;
  dateCell.innerHTML = date;
  priceCell.innerHTML = price;
  actionCell.innerHTML = action;

  let total = Number(totalCell.innerHTML) + Number(price);
  totalCell.innerHTML = total.toFixed(2);

  nameInput.value = "";
  ipInput.value = "";
  priceInput.value = "";
}
function generateMAC() {
  let mac = "";
  for (let i = 0; i < 6; i++) {
    let hex = Math.floor(Math.random() * 256).toString(16);
    if (hex.length == 1) {
      hex = "0" + hex;
    }
    mac += hex.toUpperCase();
    if (i < 5) {
      mac += ":";
    }
  }
  return mac;
}
function calculateTotal() {
  let rows = tableBody.rows;
  let total = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    total += Number(rows[i].cells[4].innerHTML);
  }
  totalCell.innerHTML = total.toFixed(2);
}

// Gọi hàm calculateTotal() khi bảng được tạo
calculateTotal();

// Gọi hàm calculateTotal() mỗi khi có thay đổi trong bảng
tableBody.addEventListener("DOMNodeInserted", calculateTotal);
tableBody.addEventListener("DOMNodeRemoved", calculateTotal);

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("table-body");
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const deleteButton = row.querySelector(".btn-delete");
    deleteButton.addEventListener("click", (event) => {
      // Xác nhận người dùng muốn xóa
      if (confirm("Bạn có chắc muốn xóa khách hàng này không?")) {
        // Xóa hàng khách hàng và hiển thị thông báo
        row.remove();
        alert("Đã xóa khách hàng thành công.");
      }
    });
  });
});
