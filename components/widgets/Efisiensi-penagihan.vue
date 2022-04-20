<script>
import axios from "~/plugins/axios";
/**
 * Top-performing component
 */
export default {
  name: "EfisiensiPenagihan",
  data() {
    return {
      billing_efficiency: {},
    };
  },
  beforeMount() {
    axios.get("/billing_efficiency").then((res) => {
      this.billing_efficiency = res.data;
    });
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="badges">
        <span>BPPSPAM</span>
      </div>

      <div class="mt-2">
        <div class="row">
          <h3 class="heading-text">Efisiensi Penagihan</h3>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="box-card">
            <h2>{{ billing_efficiency.percentage }}%</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card-->
</template>
