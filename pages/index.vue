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
      title: "CRM",
      items: [
        {
          text: "SmartHRS",
        },
        {
          text: "Dashboards",
        },
        {
          text: "CRM",
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
      list1: [{ widget: "Campaigns" }, { widget: "Revenue" }],
      list2: [{ widget: "TopPerforming" }, { widget: "Todo" }],
      list3: [{ widget: "RecentLeads" }],
      drag: false,
    };
  },
  methods: {
    removeWidget(index, list) {
      list.splice(index, 1);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-3">
        <draggable
          class="list-group"
          :list="list1"
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
            <div v-for="(element, index) in list1" :key="element.widget">
              <button v-on:click="removeWidget(index, list1)">x</button>
              <component :is="element.widget"></component>
            </div>
          </transition-group>
        </draggable>
      </div>

      <div class="col-6">
        <draggable
          class="list-group"
          :list="list2"
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
            <div v-for="(element, index) in list2" :key="element.widget">
              <button v-on:click="removeWidget(index, list2)">x</button>
              <component :is="element.widget"></component>
            </div>
          </transition-group>
        </draggable>
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
            <div v-for="(element, index) in list3" :key="element.widget">
              <button v-on:click="removeWidget(index, list3)">x</button>
              <component :is="element.widget"></component>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
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
</style>