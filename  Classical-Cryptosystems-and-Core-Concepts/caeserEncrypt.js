function caesarEncrypt(text, shift) {
    return text.toLowerCase().replace(/[a-z]/g, c=>{
        /**
         * Chuyển từ 97 - 122 -> 0 - 25
         * */
        const code = c.charCodeAt(0) - 97;
        /**
         * Mang sang lai code
         */
        return String.fromCharCode((code + shift) % 26 + 97);
    })
}

function caesarDecrypt(cipherText, shift) {
    return caesarEncrypt(cipherText, 26 - shift);
}
const plainText = "Attach at dawn";
const key = 3;
const cipherText = caesarEncrypt(plainText, key);
console.log("CipherText: ", cipherText);
const decrypt = caesarDecrypt(cipherText, key);
console.log("Decrypt: ", decrypt);