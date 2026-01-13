1. Tóm tắt ý chính (bullet points – core only)

Cryptography = nghệ thuật & khoa học bảo vệ giao tiếp bí mật

Ba mục tiêu cốt lõi của cryptography:

Confidentiality – giữ bí mật nội dung

Integrity – phát hiện nội dung bị sửa

Authenticity – xác minh đúng người gửi

Mọi hệ mật mã đều xoay quanh key
→ người nhận có thông tin mà attacker không có

Threat model:

Eve: nghe lén (passive attack)

Mallory: sửa / giả mạo / chèn dữ liệu (active attack)

Thuật toán không cần bí mật, key bắt buộc phải bí mật

Cryptography phát triển từ:

ad-hoc (không chuẩn, không phối hợp)

sang formal system (chuẩn hóa, có threat model)

2. Giải thích bằng ví dụ backend hiện đại
   Ví dụ 1: API dùng HTTPS (TLS)

Plaintext: HTTP request/response JSON

Ciphertext: dữ liệu sau TLS encryption

Key:

symmetric session key (đàm phán qua handshake)

Eve:

sniff network → thấy ciphertext

Bob (server):

có key → decrypt được

Mallory:

sửa packet → TLS phát hiện → reject

➡️ Y hệt mô hình Alice – Bob – Eve – Mallory

Ví dụ 2: JWT trong backend

Plaintext: { userId, role, exp }

Ciphertext / Signed token: JWT

Key:

HS256: shared secret

RS256: private key

Confidentiality:

❌ JWT không mã hóa → ai cũng decode được

Integrity + Authenticity:

✔️ signature đảm bảo không bị sửa

✔️ đúng server ký

➡️ JWT chỉ giải quyết 2/3 mục tiêu crypto, không phải full cryptosystem.

Ví dụ 3: Session + Redis

Plaintext: session object

Ciphertext: sessionId

Key:

sessionId + server-side storage

Eve:

ăn cắp sessionId → impersonate

Defender:

HTTPS + HttpOnly + rotation

➡️ Key không phải dữ liệu, mà là quyền truy cập vào dữ liệu.

3. Vấn đề kỹ thuật mà bài học đang giải quyết
   Vấn đề cốt lõi

Làm sao để gửi dữ liệu qua môi trường KHÔNG đáng tin mà vẫn an toàn

Cụ thể:

Network không tin cậy

Client không tin cậy

Proxy / ISP / CDN có thể nghe lén

Attacker có thể:

đọc

sửa

giả mạo

Nếu KHÔNG áp dụng cryptography
Không có	Hệ quả
Confidentiality	Token, password lộ
Integrity	Request bị sửa (amount, role)
Authenticity	Giả user, giả server
Key management	Hệ thống sập toàn bộ khi leak

➡️ Online banking, e-commerce, OAuth, microservice… = impossible

4. Phân tích theo tư duy Attacker vs Defender
   🧨 Attacker (Eve / Mallory)

Sniff network → đọc request

Modify payload:

amount=100 → amount=10000

Replay attack

Impersonation:

giả client

giả server

🛡 Defender (cryptography)
Cơ chế	Ngăn kiểu tấn công
Encryption	Không đọc được
MAC / Signature	Không sửa được
Authenticated encryption	Không giả mạo
Key secrecy	Attacker vô dụng dù có thuật toán

➡️ Không cần giấu thuật toán, chỉ cần giấu key

5. So sánh với hệ thống hiện đại
   Khái niệm trong bài	Tương ứng hiện đại
   Messenger language	Shared secret
   Shaved head (steganography)	Obfuscation
   Plaintext / Ciphertext	JSON / Encrypted bytes
   Eve	Network sniffer
   Mallory	MITM / replay attacker
   Key	Secret / private key
   Ad-hoc crypto	Tự viết auth
   Formal crypto	TLS, OAuth, JWT

⚠️ Bài học ngầm:

“Don’t invent your own crypto”

6. Sai lầm phổ biến của developer
   ❌ Sai lầm 1: Nghĩ rằng “encode” = “encrypt”

Base64 ≠ encryption

JWT decode được ≠ an toàn

❌ Sai lầm 2: Giấu thuật toán thay vì giấu key
if (hash(data + "my_secret_algo")) // ❌


➡️ Security by obscurity = fail

❌ Sai lầm 3: Không threat modeling

Chỉ nghĩ Eve (read)

Quên Mallory (modify, impersonate)

➡️ Dẫn đến:

thiếu integrity

thiếu authenticity

❌ Sai lầm 4: Key management kém

Hardcode secret

Dùng 1 key cho mọi môi trường

Không rotate key

➡️ Leak = toàn hệ thống sập

7. Kết luận – 2 nguyên lý cốt lõi
   🔑 Nguyên lý 1: Security = Algorithm + Key + Threat Model

Thuật toán tốt vô nghĩa nếu key lộ
Key tốt vô nghĩa nếu threat model sai

🔐 Nguyên lý 2: Không tin môi trường, chỉ tin toán học

Network ≠ trusted

Client ≠ trusted

Chỉ:

cryptographic proof

verification

➡️ Nguyên lý này áp dụng cho:

Auth

Distributed system

Consensus

Zero-trust architecture