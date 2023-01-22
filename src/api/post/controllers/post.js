"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const isMe = require("../../../utils/isMe");
const isOwner = require("../../../utils/isOwner");

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async create(ctx) {
    ctx.request.body.data.owner = ctx.state.user.id;
    const res = await super.create(ctx);
    return res;
  },
  async delete(ctx) {
    await isOwner(ctx, "api::post.post");
    const res = await super.delete(ctx);
    return res;
  },
  async update(ctx) {
    await isOwner(ctx, "api::post.post");
    const res = await super.update(ctx);
    return res;
  },
}));
