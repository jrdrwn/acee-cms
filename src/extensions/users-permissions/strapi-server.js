const utils = require("@strapi/utils");
const isMe = require("../../utils/isMe");

const UID = "plugin::users-permissions.user";

module.exports = (plugin) => {
  plugin.controllers.user.destroy = async (ctx) => {
    await isMe(ctx, UID);
    const res = await strapi.entityService.delete(UID, ctx.params, ctx.query);
    return res;
  };
  plugin.controllers.user.update = async (ctx) => {
    await isMe(ctx, UID);
    const res = await strapi.entityService.update(UID, ctx.params.id, {
      data: ctx.request.body,
    });
    return res;
  };
  return plugin;
};
