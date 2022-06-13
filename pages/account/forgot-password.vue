<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Forgot-password component
 */
export default {
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
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
          @click="goToPrev()"
          style="margin: 0px 35px; cursor: pointer; color: #8692a6"
        >
          <i class="fa fa-angle-left" style="margin-right: 10px"></i>
          Kembali
        </p>
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
          Lupa Password Anda?
        </p>
        <p
          style="
            font-family: 'Manrope';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            align-items: center;
            color: #76818c;
            margin: 10px 35px;
          "
        >
          Masukkan email Anda yang telah terdaftar dan Kami akan mengirimkan
          link reset password.
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
            <div class="form-group mb-3">
              <label for="emailaddress">Email</label>
              <input
                v-model="email"
                class="form-control"
                type="email"
                id="emailaddress"
                :class="{ 'is-invalid': submitted && $v.email.$error }"
                placeholder="Write your email"
              />
              <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Email is required.</span>
                <span v-if="!$v.email.email">Please enter valid email.</span>
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
