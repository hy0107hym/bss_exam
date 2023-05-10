// Lấy các phần tử DOM
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const table = document.getElementById("table");
const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");

// Số dòng trên một trang
const ROWS_PER_PAGE = 10;


// Hàm tạo bảng
function createTable(pageNumber = 1, searchText = "") {
  // Tìm kiếm các phần tử theo searchText
  const filteredData = searchText
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  // Tính toán số trang và trang hiện tại
  const pageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(pageNumber, pageCount));

  // Tạo các phần tử trong bảng
  let html = "";
  for (
    let i = (currentPage - 1) * ROWS_PER_PAGE;
    i < currentPage * ROWS_PER_PAGE && i < filteredData.length;
    i++
  ) {
    const item = filteredData[i];
    html += `
    
      <tr>
        <td>${item.id}</td>
        <td style="color:black; ">${item.name}</td>
        <td style="color:black; ">${item.status}</td>
        <td style="color:black; ">${item.date}</td>
      </tr> 
    `;
  }
  tableBody.innerHTML = html;

  // Tạo các phần tử phân trang
  html = "";
  for (let i = 1; i <= pageCount; i++) {
    html += `<button class="pagination-button ${
      i === currentPage ? "active" : ""
    }" data-page="${i}">${i}</button>`;
  }
  pagination.innerHTML = html;

  // Thêm sự kiện click cho các phần tử phân trang
  const paginationButtons = pagination.querySelectorAll(".pagination-button");
  paginationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const pageNumber = parseInt(button.getAttribute("data-page"));
      createTable(pageNumber, searchText);
    });
  });
}

// Hàm tìm kiếm
function searchTable() {
  const searchText = searchInput.value;
  createTable(1, searchText);
  searchInput.value = ""
}

// Gọi hàm tạo bảng lần đầu
createTable();

// Thêm sự kiện input cho ô tìm kiếm
searchButton.addEventListener("click", searchTable);

// searchInput.addEventListener("input", searchTable)  ;
