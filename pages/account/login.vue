<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  data() {
    return {
      email: "", //iccdash@bsa.id
      password: "", //BSA2022@icc
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      eye: false,
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  created() {},
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    showPassword(){
      this.eye = !this.eye;
    },

    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.auth === "firebase") {
          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.$store
              .dispatch("auth/logIn", {
                email: this.email,
                password: this.password,
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || {
                    path: "/",
                  }
                );
              })
              .catch((error) => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
              })
          );
        } else if (process.env.auth === "fakebackend") {
          const { email, password } = this;
          if (email && password) {
            this.$store.dispatch("authfack/login", {
              email,
              password,
            });
            this.$store.dispatch("notification/clear");
          }
        }
      }
    },
  },
  layout: "auth",
};
</script>

<style>
.login-button {
  width: 520px;
  height: 64px;
  background-color: #2275ff !important;
  border-radius: 15px;
  border: 0px;
  color: white;
}
</style>

<template>
  <div
    class="row"
    style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"
  >
    <div class="col-md-6">
      <img
        src="~/assets/images/authentication/background.png"
        style="width: 650px"
      />
    </div>
    <div class="col-md-6">
      <div
        style="
          background-color: white;
          padding: 200px 50px;
          position: absolute;
          top: 0;
          bottom: 0;
        "
      >
        <p
          class="textTitle ml-4"
          style="
            font-style: normal;
            font-weight: 700;
            font-size: 28px;
            line-height: 28px;
            letter-spacing: 0.15px;
            color: #1b2559;
          "
        >
          Silakan login ke ICC
        </p>
        <div class="card-body p-4">
          <form action="#" @submit.prevent="tryToLogIn">

            <div class="form-group mb-3" style="width: 520px">
              <label for="emailaddress" style="color: #1B2559; font-weight: 500;">Email</label>
              <div class="inner-addon left-addon">
                  <i class="left fa fa-envelope" style="font-size:18px; margin-top:2px; color: #B6C7D8"></i>
                  <input
                    v-model="email"
                    type="text"
                    id="emailaddress"
                    placeholder="Masukkan Email Anda"
                    class="form-control"
                    style="padding: 25px 45px; border-radius: 6px;"
                    :style="submitted && $v.email.$error ? 'border-color: #E04A4A;' : 'border-color: #9e9e9e;'"
                  />
              </div>

              <div v-if="submitted && $v.email.$error" style="color: #E04A4A; margin-left: 20px; margin-top: 10px;">
                <span>Format email salah, mohon cek kembali email Anda</span>
              </div>
            </div>

            <div class="form-group mb-3" style="width: 520px">
              <label for="password" style="color: #1B2559; font-weight: 500;">Password</label>
              <div class="inner-addon left-addon right-addon">
                  <i class="left fa fa-lock" style="font-size:18px; margin-top:2px; color: #B6C7D8"></i>
                  <input
                  v-model="password"
                  :type="eye == false ? 'password' : 'text'"
                  id="password"
                  class="form-control"
                  placeholder="Masukkan Password Anda"
                  style="padding: 25px 45px; border-color: #9e9e9e; border-radius: 6px;"
                  :style="submitted && $v.password.$error ? 'border-color: #E04A4A;' : 'border-color: #9e9e9e;'"
                />
                <i @click="showPassword" class="right far" :class="eye == false ? 'fa-eye-slash' : 'fa-eye'" style="font-size:18px; margin-top: 2px; color: #B6C7D8; cursor:pointer"></i>
              </div>

              <div v-if="submitted && $v.password.$error" style="color: #E04A4A; margin-left: 20px; margin-top: 10px;">
                <span>Password wajib diisi</span>
              </div>
            </div>

            <div class="form-group mb-0 text-center mt-4 mr-1">
              <button class="login-button" type="submit">Masuk</button>
            </div>

            <div v-if="notification.message" style="color: #E04A4A;" class="text-center mt-4">
              <span>Email atau password yang Anda masukkan <br>salah, mohon cek dan coba kembali</span>
            </div>

            <div class="form-group mb-0 text-center mt-4">
              <p>
                <nuxt-link
                  to="/account/forgot-password"
                  class="ml-1"
                  style="color: #2275ff"
                  >Lupa password?</nuxt-link
                >
              </p>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>
