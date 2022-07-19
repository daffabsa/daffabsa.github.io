<script>
import { EventBus } from "~/plugins/eventBus.js";

export default {
  data() {
    return {};
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
  <div class="card-side">
    <p
      style="
        padding: 20px;
        color: #1b2559;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        border-bottom: 1px solid #e6eaf7;
      "
    >
      Pengaturan
    </p>
    <span>
      <div class="row card-item" style="margin-top: -20px">
        <div style="text-align: right" class="col-md-2">
          <i
            class="fa fa-user-cog"
            style="
              color: #1b2559;
              font-size: 20px;
              margin-right: -10px;
              margin-top: 2px;
            "
          ></i>
        </div>
        <div class="col-md-10">
          <p class="title">Akun Saya</p>
          <p class="subtitle">
            Pengaturan foto profil, nama akun, dan <br />
            password.
          </p>
        </div>
      </div>
    </span>
    <span>
      <div class="row card-item">
        <div style="text-align: right" class="col-md-2">
          <i
            class="fa fa-cogs"
            style="
              color: #1b2559;
              font-size: 20px;
              margin-right: -10px;
              margin-top: 2px;
            "
          ></i>
        </div>
        <div class="col-md-10">
          <p class="title">Isi Data Widget</p>
          <p class="subtitle">Pengaturan Data Widget tanpa API</p>
        </div>
      </div>
    </span>
  </div>
</template>

<style>
.card-side {
  background: #ffffff;
  border: 1px solid #e6eaf7;
  box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
  border-radius: 15px;
  height: 85vh;
}

.card-side .title {
  color: #1b2559;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}

.card-side .subtitle {
  color: #60677d;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin-top: -10px;
}

.card-item {
  border-bottom: 1px solid #e6eaf7;
  padding-top: 20px;
  margin: 0px 0px;
  cursor: pointer;
}

.card-item:hover {
  background: #f0f6ff;
}
</style>
