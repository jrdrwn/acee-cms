const utils = require("@strapi/utils");

module.exports = async function isMe(ctx, uid) {
  const res = await strapi.entityService.findOne(uid, ctx.params.id, ctx.query);
  if (!res) {
    throw new utils.errors.NotFoundError();
  }

  if (res?.id !== ctx.state.auth.credentials.id) {
    throw new utils.errors.UnauthorizedError();
  }
  return true;
};
