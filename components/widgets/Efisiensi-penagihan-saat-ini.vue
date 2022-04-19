<script>
/**
 * Top-performing component
 */
export default {
  name: "Efisiensi Penagihan Saat ini",
  data() {
    return {
      efficiencyData: {
        efficiency_billing: 85.88,
      },
    };
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
          <h3 class="heading-text">Efisiensi Penagihan Saat Ini</h3>
        </div>
        <div class="row" style="margin-top: 10px">
          <div class="box-card">
            <h2>{{ efficiencyData.efficiency_billing }}%</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card-->
</template>
