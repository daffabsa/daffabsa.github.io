<script>
import { EventBus } from "~/plugins/eventBus.js";

export default {
  data() {
    return {
      darkmode: false,
    };
  },
  methods: {},
  mounted() {
    if (localStorage.darkmode) {
      this.darkmode = localStorage.darkmode;
    }
  },
  created() {
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
  },
};
</script>

<template>
  <div
    class="card-side"
    :style="
      darkmode
        ? 'background: #233753; border: 1px solid rgba(223, 227, 232, 0.2);'
        : 'background: #ffffff; border: 1px solid #e6eaf7;'
    "
  >
    <p
      style="
        padding: 20px;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
      "
      :style="
        darkmode
          ? 'border-bottom: 1px solid rgba(223, 227, 232, 0.2); color: white'
          : 'border-bottom: 1px solid #DFE3E8; color: #1b2559;'
      "
    >
      Pengaturan
    </p>
    <span>
      <div
        class="row card-item"
        style="margin-top: -15px"
        :style="
          darkmode
            ? 'border-bottom: 1px solid rgba(223, 227, 232, 0.2);'
            : 'border-bottom: 1px solid #DFE3E8'
        "
      >
        <div style="text-align: right" class="col-md-2">
          <i
            class="fa fa-user-cog"
            style="font-size: 20px; margin-right: -10px; margin-top: 2px"
            :style="darkmode ? 'color: white' : 'color: #1b2559;'"
          ></i>
        </div>
        <div class="col-md-10">
          <p
            class="title"
            :style="darkmode ? 'color: white' : 'color: #1b2559;'"
          >
            Akun Saya
          </p>
          <p
            class="subtitle"
            :style="darkmode ? 'color: #CFD6EC' : 'color: #60677D;'"
          >
            Pengaturan foto profil, nama akun, dan <br />
            password.
          </p>
        </div>
      </div>
    </span>
    <span>
      <div
        class="row card-item"
        :style="
          darkmode
            ? 'border-bottom: 1px solid rgba(223, 227, 232, 0.2);'
            : 'border-bottom: 1px solid #DFE3E8'
        "
      >
        <div style="text-align: right" class="col-md-2">
          <i
            class="fa fa-cogs"
            style="font-size: 20px; margin-right: -10px; margin-top: 2px"
            :style="darkmode ? 'color: white' : 'color: #1b2559;'"
          ></i>
        </div>
        <div class="col-md-10">
          <p
            class="title"
            :style="darkmode ? 'color: white' : 'color: #1b2559;'"
          >
            Isi Data Widget
          </p>
          <p
            class="subtitle"
            :style="darkmode ? 'color: #CFD6EC' : 'color: #60677D;'"
          >
            Pengaturan Data Widget tanpa API
          </p>
        </div>
      </div>
    </span>
  </div>
</template>

<style>
.card-side {
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  border-radius: 15px;
  height: 80vh;
}

.card-side .title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}

.card-side .subtitle {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-top: -10px;
}

.card-item {
  padding-top: 20px;
  margin: 0px 0px;
  cursor: pointer;
}

.card-item:hover {
  background: rgba(209, 227, 255, 0.4);
}
</style>
