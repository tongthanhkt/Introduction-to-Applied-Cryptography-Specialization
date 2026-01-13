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

// Mã hóa tin nhắn, để người khác không đọc trộm được, chứ không đảm bảo không bị chỉnh sửa
// => Encryption chỉ đảm bảo người khác KHÔNG ĐỌC ĐUỌC, Không đảm bảo không bi chinh sua
// Example
function malloryIntercept(ciphertext) {
    console.log("😈 Mallory intercepts...");
    return "attack at noon"; // giả mạo
}
// => Giai thich cho vi sao JWT can signature
/**
 * 📌 Redis lookup = network + blocking I/O
 * 📌 JWT verify = pure CPU + RAM
 *
 * Server + Redis giữ:
 * 1M session × ~1KB = ~1GB RAM
 *
 * Server giữ: 0 session
 * Client giữ token
 *
 * Session và JWT đều có pipeline xác thực, nhưng session phụ thuộc I/O-bound external state (Redis),
 * còn JWT là CPU-bound stateless verification, nên scale tốt hơn trong hệ phân tán
 *
 * Tìm hiểu XSS
 *
 * Session tốt hơn JWT khi bạn cần kiểm soát tập trung, revoke tức thì, bảo mật cao và hệ thống không cần stateless scale
 * */