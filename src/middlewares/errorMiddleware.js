const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Sunucu hatası";
  let stack = err.stack || "Hata yığını bulunamadı";

  // Geliştirme ortamı ise daha fazla detay ver
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 HATA:", err);
    return res.status(statusCode).json({
      status: "error",
      message: message,
      stack: stack,
    });
  }

  // Üretim ortamı: kullanıcıya sade mesaj
  return res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

module.exports = errorHandler;
