"use client";

// รูปรีสอร์ท
const RESORT_PHOTOS = [
  "123735_0.jpg",
  "123736_0.jpg",
  "123737_0.jpg",
  "123738_0.jpg",
  "123739_0.jpg",
  "123740_0.jpg",
  "123741_0.jpg",
  "123742_0.jpg",
  "123743_0.jpg",
  "123744_0.jpg",
  "123745_0.jpg",
  "123746_0.jpg",
  "123747_0.jpg",
  "123748_0.jpg",
  "123749_0.jpg",
];

export default function ResortGrid() {
  if (RESORT_PHOTOS.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
          color: "#2e3a52",
          fontSize: "1rem",
        }}
      >
        🏖️ กำลังเพิ่มภาพรีสอร์ท...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {RESORT_PHOTOS.map((filename, i) => (
        <div
          key={filename}
          style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(29,86,232,0.1)",
            aspectRatio: "4/3",
            background: "#e2e8f0",
          }}
        >
          <img
            src={`/m-resort/${filename}`}
            alt={`รีสอร์ท M-Factory รูปที่ ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}
    </div>
  );
}
