<script>
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
      editLayout: false,
    };
  },
  created() {
    EventBus.$on("editLayout", (editLayoutBool) => {
      this.editLayout = editLayoutBool;
    });
    EventBus.$on("darkmode", (darkmodeBool) => {
      this.darkmode = darkmodeBool;
    });
    EventBus.$emit("settings", true);
  },
  methods: {},
  computed: {},
  watch: {
    editLayout(newValue) {
      if (newValue == false) {
        localStorage.removeItem("editLayout");
      } else {
        localStorage.editLayout = true;
      }
    },
    darkmode(newValue) {
      if (newValue == false) {
        localStorage.removeItem("darkmode");
      } else {
        localStorage.darkmode = true;
      }
    },
  },
  mounted() {
    if (localStorage.editLayout) this.editLayout = localStorage.editLayout;
    if (localStorage.darkmode) this.darkmode = localStorage.darkmode;
  },
  middleware: "router-auth",
};
</script>

<template>
  <div style="margin-top: -40px; margin-left: 20px; margin-right: 20px">
    <div class="row">
      <div class="col-md-3">
        <SidebarSettings />
      </div>
      <div class="col-md-9">
        <div
          style="
            box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
            border-radius: 15px;
            height: 80vh;
          "
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
            Akun Saya
          </p>
          <div style="margin: 32px">
            <div class="row">
              <div class="col-md-2" style="margin-right: -40px">
                <img
                  src="https://www.portotheme.com/wordpress/porto/business-consulting2/wp-content/uploads/sites/147/2020/06/avatar-4.jpg"
                  style="border-radius: 50%; height: 100px; width: 100px"
                />
              </div>
              <div class="col-md-8" style="margin: auto">
                <p style="font-weight: 600; font-size: 20px; color: #1b2559">
                  Moch Anji Sumarno
                </p>
                <p
                  style="
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: #60677d;
                    margin-top: -15px;
                  "
                >
                  Direktur
                </p>
              </div>
              <div class="col-md-2" style="margin: auto">
                <a
                  style="
                    margin-left: 30px;
                    width: 520px;
                    height: 64px;
                    background-color: #2275ff !important;
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    padding: 8px 20px;
                  "
                  >Ubah Data</a
                >
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div
            style="margin: 32px 0px"
            :style="
              darkmode
                ? 'border-bottom: 1px solid rgba(223, 227, 232, 0.2); color: white'
                : 'border-bottom: 1px solid #DFE3E8; color: #1b2559;'
            "
          ></div>

          <div style="margin: 0px 32px">
            <div class="row">
              <div class="col-md-3" style="margin: auto">
                <p>Username</p>
                <p
                  style="
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    letter-spacing: -0.02em;
                    color: #a3aed0;
                    margin-top: -10px;
                  "
                >
                  Digunakan untuk login ke ICC
                </p>
              </div>
              <div class="col-md-9" style="margin-top: 5px">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value="anjisumarno"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-3" style="margin: auto">
                <p style="margin: auto">Nama Lengkap</p>
              </div>
              <div class="col-md-9" style="margin-top: 5px">
                <input
                  type="text"
                  class="form-control"
                  value="Moch Anji Sumarno"
                />
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-3" style="margin: auto">
                <p style="margin: auto">Email</p>
              </div>
              <div class="col-md-9" style="margin-top: 5px">
                <input
                  type="email"
                  class="form-control"
                  value="abdulsukirman99@gmail.com"
                />
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-3" style="margin: auto">
                <p style="margin: auto">No. Handphone</p>
              </div>
              <div class="col-md-9" style="margin-top: 5px">
                <input type="text" class="form-control" value="081234567891" />
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-3" style="margin: auto">
                <p style="margin: auto">Password</p>
              </div>
              <div class="col-md-9" style="margin-top: 5px">
                <input type="password" class="form-control" value="*****" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
