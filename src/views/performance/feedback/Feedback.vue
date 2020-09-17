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
                        v-model="$v.feedback.id.$model"
                        :disabled="view.elem.input.id.disabled"
                        :label="$t('view.performance.feedback.form.id.label')" />
                    </v-flex>
                    <!-- Review -->
                    <v-flex md12>
                      <v-autocomplete
                        dense
                        :menu-props="{maxHeight:200}"
                        v-model.trim="$v.feedback.review.$model"
                        :error-messages="getFirstErrorDescription($v.feedback.description)"
                        :items="view.elem.select.reviews.completeList"
                        :disabled="view.action.submit.busy"
                        :label="$t('view.performance.feedback.form.review.label')"
                        @change="getAssignersByReview($event)"
                        item-text="name"
                        item-value="id"
                        hide-details
                        hide-selected
                        hide-no-data
                        deletable-chips
                        clearable
                        return-object
                        no-data-text="No data">
                      </v-autocomplete>
                    </v-flex>
                    <br/><br/><br/>
                    <!-- Assigners -->
                    <v-flex md12>
                      <v-autocomplete
                        dense
                        :menu-props="{maxHeight:200}"
                        v-model.trim="$v.feedback.assigner.$model"
                        :error-messages="getFirstErrorDescription($v.feedback.assigner)"
                        :items="view.elem.select.assigners.completeList"
                        :disabled="view.action.submit.busy"
                        :label="$t('view.performance.feedback.form.assigner.label')"
                        @change="getAssignedByAssigners($event)"
                        item-text="name"
                        item-value="id"
                        hide-details
                        hide-selected
                        hide-no-data
                        deletable-chips
                        clearable
                        return-object
                        no-data-text="No data">
                      </v-autocomplete>
                    </v-flex>
                    <br/><br/><br/>
                    <!-- Assigned -->
                    <v-flex md12>
                      <v-autocomplete
                        dense
                        :menu-props="{maxHeight:200}"
                        v-model.trim="$v.feedback.assigned.$model"
                        :error-messages="getFirstErrorDescription($v.feedback.assigned)"
                        :items="view.elem.select.assigned.completeList"
                        :disabled="view.action.submit.busy"
                        :label="$t('view.performance.feedback.form.assigned.label')"
                        item-text="name"
                        item-value="id"
                        hide-details
                        hide-selected
                        hide-no-data
                        deletable-chips
                        clearable
                        return-object
                        no-data-text="No data">
                      </v-autocomplete>
                    </v-flex>
                    <br/><br/>
                    <!-- Description -->
                    <v-flex md12>
                      <v-text-field
                        v-model="$v.feedback.description.$model"
                        :error-messages="getFirstErrorDescription($v.feedback.description)"
                        :label="$t('view.performance.feedback.form.description.label')" />
                    </v-flex>
                    <!-- Status -->
                    <v-flex md12>
                      <label class="v-label pt-2">{{$t('view.performance.feedback.form.status.label')}}</label>
                      <v-switch
                        class="mt-0 pt-0"
                        input-value="true"
                        color="accent"
                        v-model="$v.feedback.status.$model" />
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
                        emitNameMethod="askForClearFeedback"
                        @askForClearFeedback="askForClear"
                        small
                      />
                    </v-flex>
                    <v-flex class="mx-0 px-0">
                      <pp-button-form
                        :type="view.elem.button.submit.type"
                        :busy="view.action.submit.busy"
                        :disabled="form.$state.isDisableButtonSubmit()"
                        emitNameMethod="submitFeedback"
                        @submitFeedback="submit"
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
        <data-table ref="feedbackTable" @editRow="loadFeedback" @disableRow="disableFeedback"></data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DataTable from "@/views/performance/feedback/DataTable";
import FeedbackStates from "@/views/performance/feedback/feedback-states";
import FeedbackAPI from "@/services/performance/feedback";
import ReviewAPI from "@/services/performance/review";
import ComboAPI from "@/services/combo";
import PPButtonForm from "@/components/buttons/PPButtonForm";
import { allValidatorMethods } from "@/helpers/vuelidate";

export default {
  name: "Feedback",
  head: {
    title: function() {
      return { inner: this.view.title, separator: "|", complement: "PayPay" };
    }
  },
  data() {
    return {
      feedback: undefined,
      form: new Object(),
      view: {
        title: "Feedback",
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
          select:{
            reviews:{
              completeList: []
              , filteredList:[]
            }
            , assigners:{
              completeList: []
              , filteredList:[]
            }
            , assignersByReview: {
              completeList: []
              , filteredList:[]
            }
            , assigned:{
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
    async loadFeedback(id) {
      try {
        const response = await FeedbackAPI.get({ id: id });
        const { data: { feedback } } = response;
        await this.getAssignersByReview(feedback.review);
        this.getAssignedByAssigners(feedback.assigner.id);
        this.form.$setState("editing", feedback);
      } catch (error) {
        console.log(error);
      }
    }
    , async getAssignersByReview(value) {
      this.view.elem.select.assigners.completeList = [];
      this.feedback.assigner = null;
      this.view.elem.select.assigned.completeList = [];
      this.feedback.assigned = null;
      if(value.id){
        let arrAssigners = [];
        try {
          const response = await ReviewAPI.get({ id: value.id });
          const result = response.data.review;
          if(result.assigners){
            this.view.elem.select.assignersByReview.completeList.map(itemCombo => {
              result.assigners.split(",").map(item=>{
                if(item == itemCombo.id){
                  arrAssigners.push(itemCombo);
                }
              });
            });
            this.view.elem.select.assigners.completeList = arrAssigners;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    , async getAssignedByAssigners(id) {
      this.view.elem.select.assigned.completeList = [];
      this.feedback.assigned = null;
      if(id){
        this.view.elem.select.assigned.completeList = this.view.elem.select.assigners.completeList;
        const filterAssigned = this.view.elem.select.assigners.completeList
          .filter(item => item.id !== id);
        this.view.elem.select.assigned.completeList = filterAssigned;
      }

    }
    , disableFeedback(){

    }
    , askForClear() {
      this.form.$state.askForClear();
    }
    , async getCombos(){
      try{
          const responseCombosReview = await ComboAPI.get({option:'review'});
          this.view.elem.select.reviews.completeList = responseCombosReview.data.combo.combo;

          const responseCombosEmployee = await ComboAPI.get({option:'employee'});
          this.view.elem.select.assignersByReview.completeList = responseCombosEmployee.data.combo.combo;
 
      } catch(error){console.error(error)}
    }
    , async submit() {
      const respuesta = await this.form.$state.submit(this.feedback);
      this.$refs.feedbackTable.getAll();
    }
  },
  computed: {},
  validations: {
    feedback:{
      id:{}
      , review: { required }
      , description: { required }
      , assigner: { required }
      , assigned: { required }
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
    this.form = new FeedbackStates(this);
    this.form.$setState("initial");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>