const axios = require('axios');
const cheerio = require('cheerio');

const LymUrl = [
  // leather hood
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_LEATHER_SET1',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_LEATHER_SET3',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_LEATHER_SET2',
  // leather shoes
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_SHOES_LEATHER_SET3',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_SHOES_LEATHER_SET1',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_SHOES_LEATHER_SET2',
  // sword
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_MAIN_SWORD',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_DUALSWORD',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_CLAYMORE',
  // bow
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_BOW',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_WARBOW',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_LONGBOW',
  // arcane staff
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_MAIN_ARCANESTAFF',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_ENIGMATICSTAFF',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_ARCANESTAFF',
];

/*
const FsUrl = [
  // cloth armor
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_ARMOR_CLOTH_SET1',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_ARMOR_CLOTH_SET2',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_ARMOR_CLOTH_SET3',
  // iron helmet
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_PLATE_SET1',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_PLATE_SET2',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_HEAD_PLATE_SET3',
  // spear
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_GLAIVE',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_SPEAR',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_MAIN_SPEAR',
  // holy staff
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_DIVINESTAFF',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_HOLYSTAFF',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_MAIN_HOLYSTAFF',
  // hammer
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_HAMMER',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_2H_POLEHAMMER',
  'https://albiononlinetools.com/prices-east.php?itemPrice=T6_MAIN_HAMMER',
];

*/
const LymUrls = [
  // lym
  { NameUsr: 'Master_Assassin_Hood', url: LymUrl[0] },
  { NameUsr: 'Master_Mercenary_Hood', url: LymUrl[1] },
  { NameUsr: 'Master_Hunter_Hood', url: LymUrl[2] },

  { NameUsr: 'Master_Assassin_shoes', url: LymUrl[3] },
  { NameUsr: 'Master_Mercenary_shoes', url: LymUrl[4] },
  { NameUsr: 'Master_Hunter_shoes', url: LymUrl[5] },

  { NameUsr: 'Master_Broadsword', url: LymUrl[6] },
  { NameUsr: 'Master_Dual_Swords', url: LymUrl[7] },
  { NameUsr: 'Master_Claymore', url: LymUrl[8] },

  { NameUsr: 'Master_Bow', url: LymUrl[9] },
  { NameUsr: 'Master_Warbow', url: LymUrl[10] },
  { NameUsr: 'Master_Longbow', url: LymUrl[11] },

  { NameUsr: 'Master_Arcane_Staff', url: LymUrl[12] },
  { NameUsr: 'Master_Enigmatic_Staff', url: LymUrl[13] },
  { NameUsr: 'Master_Great_Arcane_Staff', url: LymUrl[14] },
];

/*
const FsNameUrls = [
  { NameUsr: 'Master_Scholar_Robe', url: FsUrl[0] },
  { NameUsr: 'Master_Cleric_Robe', url: FsUrl[1] },
  { NameUsr: 'Master_Mage_Robe', url: FsUrl[2] },

  { NameUsr: 'Master_Soldier_Helmet', url: FsUrl[3] },
  { NameUsr: 'Master_Knight_Helmet', url: FsUrl[4] },
  { NameUsr: 'Master_Guardian_Helmet', url: FsUrl[5] },

  { NameUsr: 'Master_Glaive', url: FsUrl[6] },
  { NameUsr: 'Master_Pike', url: FsUrl[7] },
  { NameUsr: 'Master_Spear', url: FsUrl[8] },

  { NameUsr: 'Master_Divine_Staff', url: FsUrl[9] },
  { NameUsr: 'Master_Great_Holy_Staff', url: FsUrl[10] },
  { NameUsr: 'Master_Great_Holy_Staff', url: FsUrl[11] },

  { NameUsr: 'Master_Great_Hammer', url: FsUrl[12] },
  { NameUsr: 'Master_Polehammer', url: FsUrl[13] },
  { NameUsr: 'Master_Hammer', url: FsUrl[14] },
];

*/

//const urls = [...LymUrls.map(item => item.url), ...FsNameUrls.map(item => item.url)];

const fetchData = async () => {
  const allData = [];
  for (const item of [...LymUrls]) {
    try {
      const response = await axios.get(item.url);
      
      const NameUsr = item.NameUsr;

      const html = response.data;
      const $ = cheerio.load(html);
      const sellOrders = [];

      // Find all rows with class "row100 body"
      $('tr.row100.body').each((index, element) => {
        const cells = $(element).find('td');

        // Extract data from cells
        const orderNumber = $(cells[0]).text().trim();
        const city = $(cells[1]).text().trim();
        const price = $(cells[2]).text().trim();
        const lastUpdate = $(cells[3]).text().trim();

        // Push data to sellOrders array
        sellOrders.push({
          NameUsr,
          orderNumber,
          city,
          price,
          lastUpdate,
        });
      });

      allData.push(sellOrders);
    } catch (error) {
      console.log(error);
    }
  }
  return allData;
};

const Sello = [];
const Buyo = [];
fetchData().then(data => {
  const orders = {}; // Định nghĩa đối tượng orders để lưu trữ các đơn hàng

  data.forEach(orderArray => { // Biến data là một mảng các mảng chứa các đơn hàng
    orderArray.forEach(order => { // Lặp qua mỗi mảng đơn hàng
      const { NameUsr } = order;

      if (orders.hasOwnProperty(NameUsr)) {
        orders[NameUsr].push(order); // Thêm đơn hàng vào mảng tương ứng với tên mặt hàng
      } else {
        orders[NameUsr] = [order];
      }
    });
  });

  // In ra kết quả
  Object.keys(orders).forEach(item => {
    const itemOrders = orders[item];
    if (itemOrders.length === 1) {
      console.log("Undetermined Order:");
      console.log(itemOrders[0]);
    } else {
      console.log("Sell Order:");
      console.log(itemOrders[0]);
      console.log("Buy Order:");
      console.log(itemOrders[1]);
    }
  });

});

module.exports={
  async checkData (res,req){
    
  }
}