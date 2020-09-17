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
                        v-model="$v.review.id.$model"
                        :disabled="view.elem.input.id.disabled"
                        :label="$t('view.performance.review.form.id.label')" />
                    </v-flex>
                    <!-- Description -->
                    <v-flex md12>
                      <v-text-field
                        v-model="$v.review.description.$model"
                        :error-messages="getFirstErrorDescription($v.review.description)"
                        :label="$t('view.performance.review.form.description.label')" />
                    </v-flex>
                    <!-- Assigners -->
                    <v-flex md12>
                      <v-combobox dense
                        v-model="$v.review.assigners.$model"
                        :error-messages="getFirstErrorDescription($v.review.assigners)"
                        :items="view.elem.select.assigners.completeList"
                        :label="$t('view.performance.review.form.assigners.label')"
                        item-text="name"
                        item-value="id"
                        :menu-props="{maxHeight:200}"
                        multiple
                        clearable   
                        deletable-chips         
                        hide-no-data no-data-text="No data"                 
                        small-chips>
                      </v-combobox>
                    </v-flex>
                    <!-- Status -->
                    <v-flex md12>
                      <label class="v-label pt-2">{{$t('view.performance.review.form.status.label')}}</label>
                      <v-switch
                        class="mt-0 pt-0"
                        input-value="true"
                        color="accent"
                        v-model="$v.review.status.$model" />
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
                        emitNameMethod="askForClearReview"
                        @askForClearReview="askForClear"
                        small
                      />
                    </v-flex>
                    <v-flex class="mx-0 px-0">
                      <pp-button-form
                        :type="view.elem.button.submit.type"
                        :busy="view.action.submit.busy"
                        :disabled="form.$state.isDisableButtonSubmit()"
                        emitNameMethod="submitReview"
                        @submitReview="submit"
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
        <data-table ref="reviewTable" @editRow="loadReview" @disableRow="disableReview"></data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DataTable from "@/views/performance/review/DataTable";
import ReviewStates from "@/views/performance/review/review-states";
import ReviewAPI from "@/services/performance/review";
import ComboAPI from "@/services/combo";
import PPButtonForm from "@/components/buttons/PPButtonForm";
import { allValidatorMethods } from "@/helpers/vuelidate";

export default {
  name: "Review",
  head: {
    title: function() {
      return { inner: this.view.title, separator: "|", complement: "PayPay" };
    }
  },
  data() {
    return {
      review: undefined,
      form: new Object(),
      view: {
        title: "Review",
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
          }
          , select:{
            assigners:{
              completeList: []
              , filteredList:[]
            }
          }
          , input:{
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
    async loadReview(id) {
      try {
        const response = await ReviewAPI.get({ id: id });
        const { data: { review } } = response;
        this.form.$setState("editing", review);
      } catch (error) {
        console.log(error);
      }
    }
    , disableReview(){

    }
    , askForClear() {
      this.form.$state.askForClear();
    }
    , async getCombos(){
      try{
          const responseCombosEmployee = await ComboAPI.get({option:'employee'});
          this.view.elem.select.assigners.completeList = responseCombosEmployee.data.combo.combo;

      } catch(error){console.error(error)}
    }
    , async submit() {
      const respuesta = await this.form.$state.submit(this.review);
      this.$refs.reviewTable.getAll();
    }
  },
  computed: {},
  validations: {
    review:{
      id:{}
      , description: { required }
      , assigners: { required }
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
    this.getCombos();
    this.form = new ReviewStates(this);
    this.form.$setState("initial");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>