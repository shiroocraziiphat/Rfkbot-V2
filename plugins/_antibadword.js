let { GroupSettingChange } = require('@adiwajshing/baileys')
let handler = m => m

let badwordRegex = /bxksoajajbshxjxosoakksjsnxjxkzkzjsj // tambahin sendiri
handler.before = function (m, { isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)

    if (!chat.antiBadword && !chat.isBanned && isBadword) {
        user.warn += 1
        this.send2Button(m.chat, `*Badword terdeteksi!*
Warning: ${user.warn} / 5
Jika warning mencapai 5 kamu akan dibanned

ketik *#on antibadword* untuk menyalakan antibadword
ketik *#astagfirullah* atau *#maaf* untuk mengurangi warning

“Barang siapa yang beriman kepada Allah dan Hari Akhir maka hendaklah dia berkata baik atau diam” (HR. al-Bukhari dan Muslim).`, footer, 'Nyalakan Antibadword', '.on antibadword', 'Astaghfirullah', '#maaf', m)
        if (user.warn >= 5) {
            user.banned = true
            if (m.isGroup) {
                if (isBotAdmin) {
                    this.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
                }
            }
        }
    }
    return !0
}
module.exports = handler
