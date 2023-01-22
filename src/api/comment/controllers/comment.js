"use strict";

const utils = require("@strapi/utils");
const isOwner = require("../../../utils/isOwner");

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async create(ctx) {
    ctx.request.body.data.owner = ctx.state.user.id;
    const post = await strapi.entityService.findOne(
      "api::post.post",
      ctx.request.body.data.post
    );
    if (!post) {
      throw new utils.errors.NotFoundError();
    }
    const res = await super.create(ctx);
    return res;
  },
  async delete(ctx) {
    await isOwner(ctx, "api::comment.comment");
    const res = await super.delete(ctx);
    return res;
  },
  async update(ctx) {
    await isOwner(ctx, "api::comment.comment");
    const res = await super.update(ctx);
    return res;
  },
}));
