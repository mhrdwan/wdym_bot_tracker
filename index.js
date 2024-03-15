const { default: axios } = require("axios");
const moment = require("moment");
const readlineAsync = require("readline-sync");
var cron = require('node-cron');


const iprdp = readlineAsync.question("Masukan IP Kamu :")
const address = readlineAsync.question("Masukan Address WDYM Kamu :")
const idTelegram = readlineAsync.question("Masukan ID Telegram Kamu Buka https://t.me/userinfobot Klik Start dan copy id :")
sendTele(iprdp, address)

async function sendTele(iprdp, address) {
    const hari = new Date();
    const hari_ini = moment(hari).format("DD-MM-YYYY hh:mm:ss");
    const cekWallet = await axios.get(`https://node.wdym.wtf/api/wdym/nodes/${address}/token`);
    const formattedTotalReward = Number(cekWallet.data.totalReward.toFixed(4));

    const message = `🟢Update ${hari_ini}\nIP RDP : ${iprdp}\nSaldo kamu : ${formattedTotalReward} $WDYM`;
    try {
        const response = await axios.get(`https://api.telegram.org/bot6363994922:AAHeVwWrMEEK95brIY4ZYAVh6TOSdYtXn6A/sendMessage?chat_id=${idTelegram}&text=${encodeURIComponent(message)}`);
        console.log(`Update Saldo  ${formattedTotalReward} $WDYM, Mengirim ke telegram 1 jam sekali...`)
    } catch (error) {
        console.log(error);
    }
}

cron.schedule('0 0 */1 * * *', () => {
    sendTele(iprdp, address);
});

