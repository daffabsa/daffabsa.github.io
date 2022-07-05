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
      darkmode: false,
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
        "EfisiensiPenagihan",
        "EfektivitasPembacaan",
        "SkorRoe",
        "SkorSolvabilitas",
        "TarifRata",
        "VolumeAir",
        "SkorRasioKas",
      ],
      list1: ["EfisiensiPenagihan", "TarifRata", "VolumeAir", "EfektivitasPembacaan"],
      list2: ["Maps"],
      list3: ["SkorRoe", "SkorSolvabilitas", "SkorRasioKas"],
      drag: false,
      selectedList: "",
      editLayout: false,
      perbesar: false,
    };
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
  methods: {
    removeWidget(index, list) {
      list[index] = 'DeletingWidget';
      this.$forceUpdate();
      setTimeout(() => {
        list.splice(index, 1);
      }, 4000);
    },
    addWidget(list, widget) {
      if (list.indexOf(widget) < 0) {
        list.push('AddingWidget');
        var index = list.indexOf('AddingWidget');
        this.$forceUpdate();
        setTimeout(() => {
          list.splice(index, 1);
          list.push(widget);
      }, 4000);
      } else {
        alert("Widget sudah ada");
      }
    },
    cancelEdit() {
      localStorage.list1 = localStorage._list1;
      localStorage.list2 = localStorage._list2;
      localStorage.list3 = localStorage._list3;
      this.list1 = localStorage._list1.split(',');
      this.list2 = localStorage._list2.split(',');
      this.list3 = localStorage._list3.split(',');
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
      this.$forceUpdate();
    },
    savePosition() {
      localStorage._list1 = this.list1;
      localStorage._list2 = this.list2;
      localStorage._list3 = this.list3;
      this.editLayout = !this.editLayout;
      EventBus.$emit("editLayout", this.editLayout);
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

    fullscreenGis(){
      this.perbesar = !this.perbesar;
    },

    handleDrop() {
      
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
  watch:{
    list1(newList) {
      localStorage.list1 = newList;
    },
    list2(newList) {
      localStorage.list2 = newList;
    },
    list3(newList) {
      localStorage.list3 = newList;
    },
  },
  mounted() {
    if(localStorage.list1) this.list1 = localStorage.list1.split(',');
    if(localStorage.list2) this.list2 = localStorage.list2.split(',');
    if(localStorage.list3) this.list3 = localStorage.list3.split(',');
    if(localStorage.list1) {
      localStorage._list1 = localStorage.list1;
    } else {
      localStorage._list1 = this.list1;
    }
    if(localStorage.list2) {
      localStorage._list2 = localStorage.list2;
    } else {
      localStorage._list2 = this.list2;
    }
    if(localStorage.list3) {
      localStorage._list3 = localStorage.list3;
    } else {
      localStorage._list3 = this.list3;
    }
  },
  middleware: "router-auth",
};
</script>

<template>
  <div>
      <div :style="editLayout == true ? 'display:block' : 'display:none'">
        <div class="navbar-custom-layout">
          <div
            style="padding-top: 15px; padding-bottom: 15px"
          >
            <p
              style="
                color: white;
                font-size: 20px;
                text-align: center;
                font-weight: bold;
              "
            >
              Mode Atur Layout&nbsp;
              <button
                style="
                  border-radius: 6px;
                  border: 1px solid white;
                  color: white;
                  padding: 5px 10px;
                  background-color: #4bca81;
                  font-size: 14px;
                "
                @click="cancelEdit"
              >
                Batal
              </button>
              <button
                style="
                  border-radius: 6px;
                  border: 1px solid white;
                  color: #4bca81;
                  padding: 5px 10px;
                  background-color: white;
                  font-size: 14px;
                "
                @click="savePosition"
              >
                Simpan
              </button>
            </p>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
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
        <div class="col-lg-3" :style="perbesar == false ? 'display:block' : 'display:none'">
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
                    v-if="editLayout == true"
                    class="fa fa-cog"
                    style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                  ></i>

                  <i
                    v-on:click="removeWidget(index, list1)"
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
              <div @click="showModalAdd(list1)" class="box-add">
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

      <Transition name="fade" :duration="550"> 
        <div :class="perbesar == false ? 'col-lg-6' : 'col-lg-12'">
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
                <a
                  @click=fullscreenGis
                  :style="darkmode ? 'background: #233753; color: white' : 'background: #FFFFFF;color: #2275FF'"
                  style="
                  z-index: 1; 
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  padding: 12px;
                  gap: 10px;
                  position: absolute;
                  height: 44px;
                  right: 30px;
                  top: 30px;
                  background: #FFFFFF;
                  box-shadow: 0px 4px 24px rgba(69, 68, 68, 0.25);
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 20px;
                  cursor: pointer;
                  "
                >
                <i class="fas fa-expand" style="margin-top:3px;" v-if="perbesar==false"></i>
                <i class="fas fa-compress" style="margin-top:3px;" v-else></i>
                  {{ perbesar == false ? 'Perbesar' : 'Perkecil' }}
                </a>
                <component
                  :is="element"
                  :class="{ 'card-moveable': editLayout === true }"
                ></component>
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
        
      </Transition> 

        <div class="col-lg-3" :style="perbesar == false ?'display:block' : 'display:none'">
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
                    v-on:click="removeWidget(index, list3)"
                    v-if="editLayout == true"
                    class="fa fa-cog"
                    style="color: #dfe3e8; margin-right: 20px; cursor: pointer"
                  ></i>

                  <i
                    v-on:click="removeWidget(index, list3)"
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
              <div @click="showModalAdd(list3)" class="box-add">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>