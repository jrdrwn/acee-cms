const utils = require("@strapi/utils");

module.exports = async function isOwner(ctx, uid) {
  const res = await strapi.entityService.findOne(uid, ctx.params.id, ctx.query);
  if (!res) {
    throw new utils.errors.NotFoundError();
  }

  if (res?.owner?.id !== ctx.state.user.id) {
    throw new utils.errors.UnauthorizedError();
  }
  return true;
};
