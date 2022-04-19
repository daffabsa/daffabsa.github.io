<script>
import CrmWidget from "~/components/widgets/Crm-widget";
import draggable from "vuedraggable";

/**
 * CRM component
 */
export default {
  head() {
    return {
      title: `${this.title} Dashboard`,
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
      list1: ["SkorRoe", "EfisiensiPenagihan"],
      list2: ["Maps"],
      list3: ["EfisiensiPenagihanSaatIni"],
      availableWidget: ["EfisiensiPenagihanSaatIni", "SkorRoe"],
      drag: false,
      selectedList: "",
      editLayout: false,
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
    <button @click="editLayout = !editLayout">Atur Layout</button>

    <div class="row">
      <div class="col-lg-3">
        <draggable
          class="list-group"
          :list="list1"
          :disabled="!editLayout"
          group="widgets"
          :empty-insert-threshold="100"
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
                style="position: absolute; right: 0; top: 0; z-index: 1"
                class="btn btn-link"
                v-on:click="removeWidget(index, list1)"
                v-if="editLayout == true"
              >
                x
              </button>
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
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

      <div class="col-lg-6">
        <draggable
          class="list-group"
          :list="list2"
          :disabled="!editLayout"
          group="widgets2"
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
              v-for="element in list2"
              :key="element"
            >
              <!-- <button
                style="position: absolute; right: 0; top: 0; z-index: 1"
                class="btn btn-link"
                v-on:click="removeWidget(index, list2)"
              >
                x
              </button> -->
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
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

      <div class="col-lg-3">
        <draggable
          class="list-group"
          :list="list3"
          :disabled="!editLayout"
          group="widgets"
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
                style="position: absolute; right: 0; top: 0; z-index: 1"
                class="btn btn-link"
                v-on:click="removeWidget(index, list3)"
                v-if="editLayout == true"
              >
                x
              </button>
              <component :is="element" class="card-moveable"></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
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