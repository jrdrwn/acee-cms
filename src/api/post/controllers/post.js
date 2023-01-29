"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const isMe = require("../../../utils/isMe");
const isOwner = require("../../../utils/isOwner");

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async find(ctx) {
    const relations = await strapi.entityService.findMany(
      "api::relation.relation",
      {
        filters: {
          owner: { id: ctx.state.user.id },
        },
        populate: "*",
      }
    );
    const postOwnerIds = relations.map((relation) => relation.to.id);
    postOwnerIds.push(ctx.state.user.id);
    ctx.query.filters = { owner: postOwnerIds };
    const res = await super.find(ctx);
    return res;
  },
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
