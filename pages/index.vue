<script>
import CrmWidget from "~/components/widgets/Crm-widget";
import draggable from "vuedraggable";
import { EventBus } from "~/plugins/eventBus.js";

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
      availableWidget: [
        "EfisiensiPenagihanSaatIni",
        "SkorRoe",
        "Campaigns",
        "Chat",
        "Inbox",
        "Projections",
        "Revenue",
      ],
      drag: false,
      selectedList: "",
      editLayout: false,
    };
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    // this.$store.dispatch("layout/savePositionList", {
    //   key: "_list1",
    //   list: this.list1,
    // });
    // this.$store.dispatch("layout/savePositionList", {
    //   key: "_list2",
    //   list: this.list2,
    // });
    // this.$store.dispatch("layout/savePositionList", {
    //   key: "_list3",
    //   list: this.list3,
    // });
  },
  watch: {
    editLayout: {
      handler: function (value) {
        console.log("Edit Mode:" + value);
        if (value == true) {
        }
      },
      deep: true,
    },
  },
  methods: {
    removeWidget(index, list) {
      this.$store.dispatch("layout/updateItemList", {
        key: list,
        item: 'DeletingWidget',
        index: index,
      });
      setTimeout(() => {
        this.$store.dispatch("layout/removeItemList", {
          key: list,
          index: index,
        });
      }, 5000);
    },
    addWidget(list, widget) {
      this.$store.dispatch("layout/addItemList", {
        key: list,
        item: widget,
      });
    },
    updateWidget(list, index, widget){
      this.$store.dispatch("layout/updateItemList", {
        key: list,
        item: widget,
        index: index,
      });
    },
    showModalAdd(item) {
      this.selectedList = item;
      this.$bvModal.show("bv-modal-add-widget");
    },

    handleDrop() {
      this.$store.dispatch("layout/savePositionList", {
        key: "list1",
        list: this.list1,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "list2",
        list: this.list2,
      });
      this.$store.dispatch("layout/savePositionList", {
        key: "list3",
        list: this.list3,
      });
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
    list1: {
      get() {
        return this.$store.state.layout.datalist.list1;
      },
      set(value) {
        this.$store.dispatch("layout/savePositionList", {
          key: "list1",
          list: value,
        });
      },
    },
    list2: {
      get() {
        return this.$store.state.layout.datalist.list2;
      },
      set(value) {
        this.$store.dispatch("layout/savePositionList", {
          key: "list2",
          list: value,
        });
      },
    },
    list3: {
      get() {
        return this.$store.state.layout.datalist.list3;
      },
      set(value) {
        this.$store.dispatch("layout/savePositionList", {
          key: "list3",
          list: value,
        });
      },
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
    class="mt-2"
  >
    <div class="row">
      <div class="col-lg-3">
        <draggable
          v-model="list1"
          class="list-group"
          :disabled="!editLayout"
          group="widgets"
          :empty-insert-threshold="100"
          v-bind="dragOptions"
          @start="drag = true"
          @end="handleDrop"
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
              <div
                style="
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 1;
                  margin-top: 5px;
                "
              >
                <i
                  v-on:click="removeWidget(index, 'list1')"
                  v-if="editLayout == true"
                  class="fa fa-cog"
                  style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                ></i>

                <i
                  v-on:click="removeWidget(index, 'list1')"
                  v-if="editLayout == true"
                  class="fa fa-times"
                  style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                ></i>
              </div>
              <component
                :is="element"
                :class="{ 'card-moveable': editLayout === true }"
              ></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
          <div class="row">
            <div @click="showModalAdd('list1')" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 19px"
                  class="fa fa-plus"
                  aria-hidden="true"
                ></i>
                &nbsp; &nbsp;Tambah Card
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <draggable
          v-model="list2"
          class="list-group"
          :disabled="!editLayout"
          group="widgets2"
          v-bind="dragOptions"
          @start="drag = true"
          @end="handleDrop"
        >
          <!-- @end="drag = false" -->
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
              <component
                :is="element"
                :class="{ 'card-moveable': editLayout === true }"
              ></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
          <div class="row">
            <div @click="showModalAdd('list2')" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 19px"
                  class="fa fa-plus"
                  aria-hidden="true"
                ></i>
                &nbsp; &nbsp;Tambah Card
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3">
        <draggable
          v-model="list3"
          class="list-group"
          :disabled="!editLayout"
          group="widgets"
          v-bind="dragOptions"
          @start="drag = true"
          @end="handleDrop"
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
              <div
                style="
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 1;
                  margin-top: 5px;
                "
              >
                <i
                  v-on:click="removeWidget(index, 'list3')"
                  v-if="editLayout == true"
                  class="fa fa-cog"
                  style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                ></i>

                <i
                  v-on:click="removeWidget(index, 'list3')"
                  v-if="editLayout == true"
                  class="fa fa-times"
                  style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                ></i>
              </div>
              <component
                :is="element"
                :class="{ 'card-moveable': editLayout === true }"
              ></component>
            </div>
          </transition-group>
        </draggable>
        <div class="container" v-if="editLayout == true">
          <div class="row">
            <div @click="showModalAdd('list3')" class="box-add">
              <div
                class="d-flex justify-content-center"
                style="z-index: 5; margin: auto"
              >
                <i
                  style="font-size: 19px"
                  class="fa fa-plus"
                  aria-hidden="true"
                ></i>
                &nbsp; &nbsp;Tambah Card
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
          <button
            class="btn btn-info form-control"
            @click="addWidget(selectedList, element)"
          >
            {{ element }}
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
  border-radius: 15px;
  border-color: #dfe3e8;
  padding: 40px 0px 40px 0px;
  margin: 0 auto;
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
}
</style>