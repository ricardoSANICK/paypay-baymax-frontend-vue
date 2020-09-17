import Vue from "vue";
// VueJS Plugin totally inspired on vue-router-user-roles plugin
export class PermissionProtect {
  constructor (router, store,strict=false, defaultRoute=undefined) {
    this.router = router;
    this.store = store
    this.strict = strict;
    this.defaultRoute = defaultRoute;
    this.vm = new Vue({
      data: {
        user: null
      }
    });
  };
  get () {
    if (!this.vm.user) {
      throw new Error("Attempt to access user before being set");
    }
    return this.vm.user;
  }
  set (user) {
    this.vm.user = user;
    if (this.to) {
      const { access, redirect } = this._hasAccessToRoute(this.to);
      if (!access) {
        this.router.push({ name: redirect });
      }
    }
  }
  hasPermission(permission){
    if(!this.vm.user){
      //throw new Error("Attempt to access user before being set")
    }
    let arrayPermission = permission.split(",")
    // console.log( arrayPermission)
    for(let checkPermission of arrayPermission){
      // console.log('Validando ' + checkPermission)
      if(this.vm.user){
        if(this.vm.user.roles.find(item=>item===checkPermission.trim())){
          // console.log('Validado ' + checkPermission)
          return true;
        }
      }
    }
    return false;
  }
  hasAccess ({ name }) {
    const route = this.router.options.routes.find(r => r.name === name);
    if (!route) {
      throw new Error(`Route ${name} is not defined in the current router`);
    }

    return this._hasAccessToRoute(route).access;
  }
  _hasAccessToRoute (route) {
    //Is Authenticated
    if(this.store.getters.getUserIsAuthenticated){
      if(!route.meta.permissions)
        return {access:true}

      if(!this.vm.user.roles) 
        return {access:false, redirect:this.defaultRoute}
      
      const matched = route.meta.permissions.find(item=>
        this.vm.user.roles.find(subItem=>item.role === subItem)
      );
      //It is not found
      if(!matched)
        return {access:false, redirect:this.defaultRoute}
      //It is found and has the right access
      if((typeof matched.access === "boolean" && matched.access) ||
      (typeof matched.access === "function" && matched.access(this.vm.user, route)))
        return {access:true}
      
      //Default not access
      return {access:false, redirect:this.defaultRoute}
    }else{
      return {access:true}
    }
      

      
  }
  resolve (to, from, next) {
    this.to = to;
    if(this.store.getters.getUserIsAuthenticated && this.vm.user===null ){
      this.set({roles:this.store.getters.getUserPermissions})
    }
    if(this.strict && to.name===this.defaultRoute) {
      next();
      return;
    }
    const { access, redirect } = this._hasAccessToRoute(to);
    access ? next() : next({ name: redirect });
  }
}