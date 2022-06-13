<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Forgot-password component
 */
export default {
  data() {
    return {
      password: "123456",
      confirm_password: "123456",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
    };
  },
  // validations: {
  //   email: {
  //     required,
  //     email,
  //   },
  // },
  methods: {
    goToPrev() {
      this.$router.go(-1);
    },
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.auth === "firebase") {
          this.tryingToReset = true;
          // Reset the authError if it existed.
          this.error = null;
          return (
            this.$store
              .dispatch("auth/resetPassword", {
                email: this.email,
              })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToReset = false;
                this.isResetError = false;
              })
              .catch((error) => {
                this.tryingToReset = false;
                this.error = error ? error : "";
                this.isResetError = true;
              })
          );
        }
      }
    },
  },
  layout: "auth",
};
</script>

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
          position: absolute;
          top: 0;
          bottom: 0;
          padding: 55px 50px;
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
            margin-top: 150px;
          "
        >
          Reset Password
        </p>
        <div class="card-body p-4">
          <form action="#" @submit.prevent="tryToReset">
            <b-alert
              v-model="isResetError"
              class="mb-4"
              variant="danger"
              dismissible
              >{{ error }}</b-alert
            >
            <div class="form-group mb-3" style="width: 520px">
              <label for="password">Password Baru</label>
              <div class="input-group input-group-merge">
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Masukkan Password Anda"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                />

                <div class="input-group-append" data-password="false">
                  <div class="input-group-text">
                    <span class="password-eye"></span>
                  </div>
                </div>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </div>
            </div>

            <div class="form-group mb-3" style="width: 520px">
              <label for="password">Konfirmasi Password Baru</label>
              <div class="input-group input-group-merge">
                <input
                  v-model="confirm_password"
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Masukkan Password Anda"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                />

                <div class="input-group-append" data-password="false">
                  <div class="input-group-text">
                    <span class="password-eye"></span>
                  </div>
                </div>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </div>
            </div>

            <button
              style="margin-top: 50px; width: 100%"
              class="login-button"
              type="submit"
            >
              Reset Password
            </button>
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
