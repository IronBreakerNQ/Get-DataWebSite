const fetchData = require('./fetchData');

// Khai báo biến Sello và Buyo ở đây
let Sello = [];
let Buyo = [];

// Gọi hàm fetchData và sử dụng dữ liệu trả về
const promise = fetchData().then(data => {
    let uniqueNames = [];
    data.forEach(SellOrders => {
        SellOrders.forEach(order => {
            if (order.city === 'Black Market (Good)') {
                if (!uniqueNames.includes(order.NameUsr)) {
                    uniqueNames.push(order.NameUsr);
                    Sello.push(order);
                } else {
                    Buyo.push(order);
                }
            }
        });
    });

    return { Sello, Buyo };
});

// Xuất promise để có thể sử dụng trong file khác
module.exports = promise;