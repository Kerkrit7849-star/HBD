const img = document.getElementById("image");
const memories = document.querySelectorAll(".memory");
const music = document.getElementById("music");

let stage = 1;
let frame = 1;
const boxFrames = 6;
const letterFrames = 13;
let isPlaying = false;

img.addEventListener("click", () => {
    if (isPlaying) return;
    isPlaying = true;

    if (stage === 1) {
        playBoxAnimation();
    } else if (stage === 2) {
        playLetterAnimation();
    }
});

function playBoxAnimation() {
    frame = 1;
    const interval = setInterval(() => {
        frame++;
        if (frame > boxFrames) {
            clearInterval(interval);
            stage = 2;
            img.src = "images/surprise.png";
            img.classList.add("letter-size");
            isPlaying = false;
            return;
        }
        img.src = `images/box${frame}.png`;
    }, 120);
}

function playLetterAnimation() {
    frame = 1;
    const interval = setInterval(() => {
        frame++;
        if (frame > letterFrames) {
            clearInterval(interval);
            isPlaying = false;

            revealMemories();  // ✅ Show Images
            music.play();     // ✅ Play Music

            return;
        }
        img.src = `images/op${frame}.png`;
    }, 120);
}

// ✅ รูปสุ่มตำแหน่งและเอียง
function revealMemories() {
    memories.forEach((m, i) => {
        const x = Math.random() * 60 + 20; // 20-80vw
        const y = Math.random() * 50 + 20; // 20-70vh
        const rotate = Math.random() * 40 - 20; // -20deg ถึง 20deg

        setTimeout(() => {
            m.style.left = `${x}vw`;
            m.style.top = `${y}vh`;
            m.style.transform = `translateY(0) rotate(${rotate}deg)`;
            m.style.opacity = "1";
        }, i * 700);
    });
}

const qrButton = document.getElementById("qrButton");
const qrCode = document.getElementById("qrCode");

qrButton.addEventListener("click", () => {
    // ซ่อนจดหมาย ถ้ายังอยู่
    img.style.display = "none";

    // ซ่อนรูปที่ลอย (memory images)
    document.querySelectorAll(".memory").forEach(img => {
        img.style.display = "none";
    });

    // แสดง QR
    qrCode.style.display = "block";
});

