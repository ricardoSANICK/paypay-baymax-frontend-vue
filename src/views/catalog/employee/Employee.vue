<template>
  <v-container fluid grid-list-md py1>
    <v-layout row wrap>
      <v-flex md4>
        <v-card class="elevation-5">
          <v-card-title primary-title class="py-2">
            <div class="subheading">Data</div>
            <v-spacer />
            <v-btn icon class="ma-0" @click="view.section.form.visible = !view.section.form.visible">
              <v-icon>{{ view.section.form.visible ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-fade-transition>
            <div v-show="view.section.form.visible">
              <v-card-text class="py-1">
                <form>
                  <v-layout row wrap>
                    <!-- id -->
                    <v-flex md12>
                      <v-text-field 
                        v-show="view.elem.input.id.visible"
                        v-if="!view.action.submit.busy" 
                        v-model="$v.employee.id.$model"
                        :disabled="view.elem.input.id.disabled"
                        :label="$t('view.catalog.employee.form.id.label')" />
                    </v-flex>
                    <!-- Name -->
                    <v-flex md12>
                      <v-text-field
                        v-model="$v.employee.name.$model"
                        :error-messages="getFirstErrorDescription($v.employee.name)"
                        :label="$t('view.catalog.employee.form.name.label')" />
                    </v-flex>
                    <!-- Status -->
                    <v-flex md12>
                      <label class="v-label pt-2">{{$t('view.catalog.employee.form.status.label')}}</label>
                      <v-switch
                        class="mt-0 pt-0"
                        input-value="true"
                        color="accent"
                        v-model="$v.employee.status.$model" />
                    </v-flex>
                  </v-layout>
                </form>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-flex shrink>
                  <v-layout row wrap>
                    <v-flex class="mx-0 px-0">
                      <pp-button-form type="clear"
                        :busy="view.action.submit.busy"
                        emitNameMethod="askForClearEmployee"
                        @askForClearEmployee="askForClear"
                        small
                      />
                    </v-flex>
                    <v-flex class="mx-0 px-0">
                      <pp-button-form
                        :type="view.elem.button.submit.type"
                        :busy="view.action.submit.busy"
                        :disabled="form.$state.isDisableButtonSubmit()"
                        emitNameMethod="submitEmployee"
                        @submitEmployee="submit"
                        small
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-card-actions>
            </div>
          </v-fade-transition>
        </v-card>
      </v-flex>
      <v-flex md8>
        <data-table ref="employeeTable" @editRow="loadEmployee" @disableRow="disableEmployee"></data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DataTable from "@/views/catalog/employee/DataTable";
import EmployeeStates from "@/views/catalog/employee/employee-states";
import EmployeeAPI from "@/services/catalog/employee";
import PPButtonForm from "@/components/buttons/PPButtonForm";
import { allValidatorMethods } from "@/helpers/vuelidate";

export default {
  name: "Employee",
  head: {
    title: function() {
      return { inner: this.view.title, separator: "|", complement: "PayPay" };
    }
  },
  data() {
    return {
      employee: undefined,
      form: new Object(),
      view: {
        title: "Employee",
        action: {
          submit: {
            busy: false
          }
        }
        , elem:{
          button: {
            submit: {
              enable: true,
              text: "",
              class: {
                current: "",
                save: "button__icon icon fa fa-plus",
                update: "button__icon icon fa fa-check"
              },
              data: {
                id: 0,
                title: { current: "", save: "Guardar", update: "Actualizar" }
              },
              type: ""
            },
            clear: { visible: false },
            audit: { visible: false }
          },
          input:{
            id:{
              disabled: true, 
              visible: false 
            }
          }
        }
        , section:{
          form: { 
            visible: true 
          }
        }
      }
    };
  },
  methods: {
    ...allValidatorMethods,
    async loadEmployee(id) {
      try {
        const response = await EmployeeAPI.get({ id: id });
        const { data: { employee } } = response;
        this.form.$setState("editing", employee);
      } catch (error) {
        console.log(error);
      }
    }
    , disableEmployee(){

    }
    , askForClear() {
      this.form.$state.askForClear();
    }
    , async submit() {
      const respuesta = await this.form.$state.submit(this.employee);
      this.$refs.employeeTable.getAll();
    }
  },
  computed: {},
  validations: {
    employee:{
      id:{}
      , name: { required }
      , status: {}
    }
  },
  mounted() {},
  updated() {},
  components: {
    DataTable,
    "pp-button-form": PPButtonForm
  },
  created() {
    this.form = new EmployeeStates(this);
    this.form.$setState("initial");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>