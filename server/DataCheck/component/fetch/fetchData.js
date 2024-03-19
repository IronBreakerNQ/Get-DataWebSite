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


const LymUrls =[
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

const fetchData = async () => {
  const allData = [];
  for (const item of LymUrls) {
    try {
      const response = await axios.get(item.url);
      const NameUsr = item.NameUsr;
      const html = response.data;
      const $ = cheerio.load(html);
      const sellOrders = [];

      $('tr.row100.body').each((index, element) => {
        const cells = $(element).find('td');
        const orderNumber = $(cells[0]).text().trim();
        const city = $(cells[1]).text().trim();
        const price = $(cells[2]).text().trim();
        const lastUpdate = $(cells[3]).text().trim();

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

module.exports = fetchData;