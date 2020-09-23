import { authRequest } from "../../api/requests";

const GROUPINGS_URL = "groupings/";
const CATEGORY_URL = `${GROUPINGS_URL}categories/`;
const TAGS_URL = `${GROUPINGS_URL}tags/`;

const state = {
  tags: [],
  categories: [],
  pending: true,
  error: null,
};

const mutations = {
  setGroupingsSuccess(state, { tags, categories }) {
    state.tags = tags;
    state.categories = categories;
    state.error = null;
    state.pending = false;
  },
  setGroupingsError(state, error) {
    state.error = error;
  },
  addTag(state, tag) {
    state.error = null;
    state.tags.push(tag);
  },
  addCategory(state, category) {
    state.error = null;
    state.categories.push(category);
  },
  deleteTag(state, tag) {
    const indx = state.tags.findIndex((item) => item.pk === tag.pk);
    state.tags.splice(indx, 1);
  },
  deleteCategory(state, category) {
    const indx = state.tags.findIndex((item) => item.pk === category.pk);
    state.categories.splice(indx, 1);
  },
  updateTag(state, tag) {
    const indx = state.tags.findIndex((item) => item.pk === tag.pk);
    state.tags = [
      ...state.tags.slice(0, indx),
      tag,
      ...state.tags.slice(indx + 1),
    ];
  },
  updateCategory(state, category) {
    const indx = state.tags.findIndex((item) => item.pk === category.pk);
    state.categories = [
      ...state.categories.slice(0, indx),
      category,
      ...state.categories.slice(indx + 1),
    ];
  },
};

const getters = {};

const actions = {
  async getGroupings(context) {
    try {
      const tags_r = await authRequest.get(TAGS_URL);
      const cats_r = await authRequest.get(CATEGORY_URL);
      context.commit("setGroupingsSuccess", {
        tags: tags_r.data,
        categories: cats_r.data,
      });
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("getGroupings");
      } else {
        console.warn("Error in getGroupings:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async createTag(context, tag) {
    if (!tag.name || tag.name.length > 10) {
      context.dispatch(
        "setGroupingsError",
        "Name is required and should be shorter then 10 characters"
      );
      return;
    }
    try {
      const r = await authRequest.post(TAGS_URL, tag);
      context.dispatch("addTag", r.data);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("createTag", tag);
      } else {
        console.warn("Error in createTag:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async createCategory(context, category) {
    if (!category.name || category.name.length > 50) {
      context.dispatch(
        "setGroupingsError",
        "Name is required and should be shorter then 50 characters"
      );
      return;
    }
    try {
      const r = await authRequest.post(TAGS_URL, category);
      context.dispatch("addCategory", r.data);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("createCategory", category);
      } else {
        console.warn("Error in createCategory:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async updateTag(context, tag) {
    if (!tag.pk || !tag.name || tag.name.length > 10) {
      context.dispatch(
        "setGroupingsError",
        "Name is required and should be shorter then 10 characters"
      );
      return;
    }
    try {
      const r = await authRequest.patch(`${TAGS_URL}${tag.pk}/`, tag);
      context.dispatch("updateTag", r.data);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("updateTag", tag);
      } else {
        console.warn("Error in updateTag:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async updateCategory(context, category) {
    if (!category.pk || !category.name || category.name.length > 50) {
      context.dispatch(
        "setGroupingsError",
        "Name is required and should be shorter then 50 characters"
      );
      return;
    }
    try {
      const r = await authRequest.patch(
        `${CATEGORY_URL}${category.pk}/`,
        category
      );
      context.dispatch("updateCategory", r.data);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("updateCategory", category);
      } else {
        console.warn("Error in updateCategory:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async deleteTag(context, tag) {
    if (!tag.pk) {
      throw "A pk is required to delete a tag";
    }
    try {
      await authRequest.get(`${TAGS_URL}${tag.pk}/delete/`);
      context.dispatch("deleteTag", tag);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("deleteTag", tag);
      } else {
        console.warn("Error in deleteTag:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
  async deleteCategory(context, category) {
    if (!category.pk) {
      throw "A pk is required to delete a category";
    }
    try {
      await authRequest.get(`${CATEGORY_URL}${category.pk}/delete/`);
      context.dispatch("deleteCategory", category);
    } catch (error) {
      if (error.response.status === 401) {
        await context.dispatch("auth/refreshToken", null, { root: true });
        context.dispatch("deleteCategory", category);
      } else {
        console.warn("Error in deleteCategory:", { error });
        if (error.response.data.detail) {
          context.commit("setGroupingsError", error.response.data.detail);
        } else {
          context.commit("setGroupingsError", error);
        }
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
