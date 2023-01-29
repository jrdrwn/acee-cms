"use strict";

const isOwner = require("../../../utils/isOwner");
const utils = require("@strapi/utils");
/**
 * relation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::relation.relation",
  ({ strapi }) => ({
    async delete(ctx) {
      await isOwner(ctx, "api::relation.relation");
      const res = await super.delete(ctx);
      return res;
    },
    async update(ctx) {
      await isOwner(ctx, "api::relation.relation");
      const res = await super.update(ctx);
      return res;
    },
    async create(ctx) {
      const relations = await strapi.entityService.findMany(
        "api::relation.relation",
        {
          populate: "*",
          filters: {
            owner: { id: ctx.state.user.id },
            to: { id: ctx.request.body.data.to },
          },
        }
      );
      if (relations.length) {
        throw new utils.errors.ValidationError();
      }

      ctx.request.body.data.owner = ctx.state.user.id;
      const res = await super.create(ctx);
      return res;
    },
  })
);
