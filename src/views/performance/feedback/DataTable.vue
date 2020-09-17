<template>
  <v-card class="elevation-5">
    <v-card-title primary-title class="py-2">
      <div class="subheading">{{$t('view.performance.feedback.records')}}</div>
      <v-spacer/>
      <v-btn icon  @click="view.section.datatable.visible = !view.section.datatable.visible" style="margin:0;">
          <v-icon>{{ view.section.datatable.visible ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-fade-transition>
      <v-card-text class="pt-0" v-show="view.section.datatable.visible">
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <br>
        <v-data-table 
          :headers="view.elem.datatable.headers" 
          :items="view.elem.datatable.data" 
          :search="search"
          :loading="view.elem.datatable.loading"
          :items-per-page="5"
          no-data-text="No data" 
          no-results-text="Results not found"
          item-key="id" >
          <template v-slot:item.action="{ item }">
            <pp-button-form 
                dense
                type="edit"
                xSmall
                emitNameMethod="editRowDatatable"
                @editRowDatatable="editRowDatatable(item)"/>
            <pp-button-form 
                v-if="item.status" 
                type="disable"
                xSmall
                emitNameMethod="disableRowDatatable"
                @disableRowDatatable="disableRowDatatable(item)"/>
          </template>
        </v-data-table>
      </v-card-text>
    </v-fade-transition>
  </v-card>
</template>
<script>

import FeedbackAPI from "@/services/performance/feedback";
import { deleteRecordSwal } from "@/constants/sweet-alerts";
import PPButtonForm from "@/components/buttons/PPButtonForm";

export default {
  data() {
    return {
      count: 0,
      search: "",
      totalFeedback: 0,
      pagination: {},
      dataTable: undefined,
      view: {
        section: {
          datatable: { visible: true }
        },
        elem: {
          datatable: {
            headers: [
              { text: "Id", align: "left", sortable: true, value: "id" },
              { text: "Description", align: "left", sortable: true, value: "description" },
              { text: "Acciones", sortable: false, align: "center" ,value: 'action'}
            ],
            data: [],
            loading: false,
            pagination: {rowsPerPage: 10}
          }
        }
      }
    };
  },
  props: {
    pageLength: { default: 10, type: Number },
    responsive: { default: true, type: Boolean }
  },
  methods: {
    async getAll() {
      this.view.elem.datatable.loading = true;
      try {
        this.view.elem.datatable.data = [];
        const response = await FeedbackAPI.getAll();
        this.view.elem.datatable.data = response.data.feedbacks.feedbacks;
      } catch(error){
        console.log(error);
      }
      this.view.elem.datatable.loading = false;
    },
    async editRowDatatable(item) {
      this.view.elem.datatable.loading = true;
      try {
        this.view.elem.datatable.loading = await new Promise(resolve => { this.$emit('editRow', item.id); setTimeout(() => { resolve(false)}, 400) });
      } catch(error){
        this.view.elem.datatable.loading = true;
        console.log(error);
      }
    },
    async disableRowDatatable(item) { 
      if((await this.$swal(deleteRecordSwal)).value){
        const response = await FeedbackAPI.disable(item);
        this.getAll();
      }
    }
  },
  computed: {},
  components: { "pp-button-form": PPButtonForm},
  created() {
    this.getAll();
  },
  mounted() {}
};
</script>

<style scoped></style>