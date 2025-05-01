const AppError = require("../utils/appError");

/**
 * @param {Document} resource - Görev, not, vs.
 * @param {ObjectId} ownerId - resource.user gibi kullanıcı referansı
 * @param {ObjectId} currentUserId - req.user._id gibi
 */
const checkOwnership = (resourceUserId, currentUserId) => {
  return resourceUserId.toString() === currentUserId.toString();
};

/**
 * Factory middleware
 * Belirli bir modeli alır ve id'ye göre belgeyi kontrol eder.
 */
const authorizeOwner = (Model, resourceField = "user") => {
  return async (req, res, next) => {
    const resourceId = req.params.id;

    const resource = await Model.findById(resourceId);

    if (!resource) {
      return next(new AppError(`${Model.modelName} bulunamadı`, 404));
    }

    if (!checkOwnership(resource[resourceField], req.user._id)) {
      return next(new AppError("Bu işlemi yapmaya yetkiniz yok", 403));
    }

    // İstek içinde kaynak nesneyi sakla (opsiyonel)
    req.resource = resource;

    next();
  };
};

module.exports = authorizeOwner;
