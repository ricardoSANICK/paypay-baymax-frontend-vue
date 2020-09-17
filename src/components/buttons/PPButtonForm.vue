<template>
  <v-tooltip v-show="visible" top :class="[ smallest ?  'mx-1' : 'ml-2']">
    <template v-show="visible" v-slot:activator="{ on }">
      <v-btn v-on="on" v-show="visible" :color="buttonColor" 
      :class="[{ smallestButton : smallest ? 'smallestButton' : ''}, smallest ? 'mx-0' : 'mx-0']" 
      fab :small="small" :large="large" :x-small="xSmall"  :loading="busy" 
      @click="triggerEmitFunction()" 
      :disabled="disabled" >
        <v-icon v-show="visible" :class="{ smallestButtonIcon : smallest ? 'smallestButtonIcon' : ''}" >{{buttonIcon}}</v-icon>
      </v-btn>
    </template>
    <span>{{tooltipText}}</span>
  </v-tooltip>
</template>
<script>
export default {
  data() {
    return {
      view: {
        elem: {
          buttons: {
            type: {
              add: {
                tooltip: "Add",
                color: "primary",
                icon: "add"
              },
              update: {
                tooltip: "Update",
                color: "primary",
                icon: "edit"
              },
              clear: {
                tooltip: "Clear",
                color: "primary",
                icon: "clear"
              },
              edit: {
                tooltip: "Edit",
                color: "primary",
                icon: "create"
              },
              audit: {
                tooltip: "Audit",
                color: "primary",
                icon: "fas fa-list"
              },
              revisionDetail:{
                tooltip: "Review details",
                color: "primary",
                icon: "fa-search"
              },
              disable: {
                tooltip: "Disable",
                color: "primary",
                icon: "delete",
              },
              delete: {
                tooltip: "Eliminate",
                color: "primary",
                icon: "far fa-trash-alt"
              },
              remove: {
                tooltip: "Remove",
                color: "error",
                icon: "fa-times"
              },
              cancel: {
                tooltip: "Cancel",
                color: "primary",
                icon: "fa-times"
              },
            }
          }
        }
      }
    };
  },
  props: {
    type: {
      default: "",
      type: String
    },
    tooltip: {
      default: "",
      type: String
    },
    tooltipContentText: {
      default: "",
      type: String
    },
    icon: {
      default: "",
      type: String
    },
    smallest:{
      default: false,
      type: Boolean
    },
    small: {
      default: false,
      type: Boolean
    },
    xSmall: {
      default: false,
      type: Boolean
    },
    large: {
      default: false,
      type: Boolean
    },
    busy: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    emitNameMethod: {
      default: ''
      , type: String
    },
    visible: {
      default: true
      , type: Boolean
    }
  },
  methods: {
    buttonTypeValue(type, attribute, prop, defaultValue) {
      const buttonType =
        type && !prop ? this.view.elem.buttons.type[type] : null;
      const value = buttonType
        ? buttonType[attribute]
        : prop
        ? prop
        : defaultValue;
      return value;
    },
    triggerEmitFunction(){
      this.$emit(this.emitNameMethod);
    }
  },
  computed: {
    buttonColor: {
      get() {
        return this.buttonTypeValue(this.type, "color", this.color, "primary");
      }
    },
    buttonIcon: {
      get() {
        return this.buttonTypeValue(this.type, "icon", this.icon, "edit");
      }
    },
    tooltipText: {
      get() {
        if(this.tooltipContentText)
          return this.tooltipContentText
        else 
          return this.buttonTypeValue(this.type,"tooltip",this.tooltip, "Editar" );
      }
    }, 
    buttonClasses: {
      get(){
        return '';
      }
    }
  }
};
</script>
<style>
 .smallestButton{
   width: 28px;
   height: 28px;
  }
 .smallestButtonIcon{
   font-size: 16px;
 }
</style>



