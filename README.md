File DataCheck
-Gồm có 3 phần
  -componet
    +fetchData: Dùng để lấy url và phân tích soure code từ url đó
    +promiseFetch : Dùng để gọi hàm fetchData và truyền dữ liệu đi
    +fetchDone : Dùng để test nhanh dữ liệu
  -controller
    +getController :  
      Dùng để tạo API 
      Gọi lại promiseFetch để lấy dữ liệu truyền cho API
  -Model
    là File chưa các Schema mongodb
  -index.js: dùng thư viện exprees để cấu hình router
  -data.js : dùng thư viện exprees để tạo các curd
Index.js
  -Chạy server lên localhost
