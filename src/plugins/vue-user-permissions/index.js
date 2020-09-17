import { PermissionProtect } from "@/plugins/vue-user-permissions/permission-protect";

function plugin (Vue, opts) {
  if (!opts.router) {
    throw new Error("You must supply a router instance in the options.");
  }
  const rp = new PermissionProtect(opts.router, opts.store, opts.strict||false, opts.defaultRoute || undefined);
  Vue.prototype.$userPermission = rp;
  opts.router.beforeEach((to, from, next) => rp.resolve(to, from, next));
}

plugin.version = "__VERSION__";

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}