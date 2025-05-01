const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Sunucu hatası";

  // Geliştirme ortamı ise daha fazla detay ver
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 HATA:", err);
    return res.status(statusCode).json({
      status: "error",
      message,
      stack: err.stack,
    });
  }

  // Üretim ortamı: kullanıcıya sade mesaj
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = errorHandler;
