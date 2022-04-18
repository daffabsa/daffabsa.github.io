<script>
import CrmWidget from "~/components/widgets/Crm-widget";
import draggable from "vuedraggable";

/**
 * CRM component
 */
export default {
  head() {
    return {
      title: `${this.title} Dashboard | SmartHRIS - Aplikasi HR lengkap dari BSA`,
    };
  },
  components: {
    CrmWidget,
    draggable,
  },
  data() {
    return {
      title: "ICC",
      items: [
        {
          text: "Command Center",
        },
        {
          text: "Dashboards",
        },
        {
          text: "ICC",
          active: true,
        },
      ],
      widgetData: [
        {
          title: "Campaign Sent",
          icon: "ri-stack-line",
          value: "865",
          text: "5.27%",
        },
        {
          title: "New Leads",
          icon: "ri-slideshow-2-line",
          value: "384",
          text: "3.27%",
        },
        {
          title: "Deals",
          icon: "ri-hand-heart-line",
          value: "34,521",
          text: "8.58%",
        },
        {
          title: "Booked Revenue",
          icon: "ri-money-dollar-box-line",
          value: "$89,357",
          text: "34.61%",
        },
      ],
      list1: ["Campaigns", "Revenue"],
      list2: ["TopPerforming", "Todo"],
      list3: ["RecentLeads"],
      availableWidget: ["TopPerforming", "Todo", "RecentLeads"],
      drag: false,
      selectedList: "",
    };
  },
  methods: {
    removeWidget(index, list) {
      list.splice(index, 1);
    },
    addWidget(list, widget) {
      if (list.indexOf(widget) < 0) {
        list.push(widget);
      } else {
        alert("Widget sudah ada");
      }
    },
    showModalAdd(item) {
      this.selectedList = item;
      this.$bvModal.show("bv-modal-add-widget");
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: "widgets",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div
    style="
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -o-user-select: none;
    "
  >
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-3">
        <draggable
          class="list-group"
          :list="list1"
          group="widgets"
          :empty-insert-threshold="100"
          @change="log"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group
            type="transition"
            :name="!drag ? 'flip-list' : null"
          >
            <div
              style="position: relative"
              v-for="(element, index) in list1"
              :key="element"
            >
              <button
                style="position: absolute; right: 0; top: 0; z-index: 5"
                class="btn btn-link"
                v-on:click="removeWidget(index, list1)"
              >
                x
              </button>
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container">
          <div class="row">
            <div @click="showModalAdd(list1)" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 40px"
                  class="fa fa-plus-circle"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <draggable
          class="list-group"
          :list="list2"
          group="widgets2"
          @change="log"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group
            type="transition"
            :name="!drag ? 'flip-list' : null"
          >
            <div
              style="position: relative"
              v-for="(element, index) in list2"
              :key="element"
            >
              <button
                style="position: absolute; right: 0; top: 0; z-index: 1000"
                class="btn btn-link"
                v-on:click="removeWidget(index, list2)"
              >
                x
              </button>
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container">
          <div class="row">
            <div @click="showModalAdd(list2)" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 40px"
                  class="fa fa-plus-circle"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3">
        <draggable
          class="list-group"
          :list="list3"
          group="widgets"
          @change="log"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <transition-group
            type="transition"
            :name="!drag ? 'flip-list' : null"
          >
            <div
              style="position: relative"
              v-for="(element, index) in list3"
              :key="element"
            >
              <button
                style="position: absolute; right: 0; top: 0; z-index: 1000"
                class="btn btn-link"
                v-on:click="removeWidget(index, list3)"
              >
                x
              </button>
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container">
          <div class="row">
            <div @click="showModalAdd(list3)" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 40px"
                  class="fa fa-plus-circle"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="bv-modal-add-widget" hide-footer>
      <template #modal-title> Tambahkan widget </template>
      <div class="d-block text-center">
        <div
          style="position: relative"
          v-for="element in availableWidget"
          :key="element"
        >
          <component :is="element"></component>
          <button
            class="btn btn-info form-control"
            @click="addWidget(selectedList, element)"
          >
            Tambah Widget
          </button>
          <hr />
        </div>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-add-widget')"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.card-moveable {
  cursor: move;
}

.box-add {
  border: 2px;
  border-style: dashed;
  border-color: #dfe3e8;
  padding: 20px 0px 20px 0px;
  margin: 0 auto;
  width: 100%;
  background-color: #f9fafb;
  z-index: 1;
}
</style>