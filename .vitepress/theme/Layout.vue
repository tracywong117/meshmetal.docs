<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- Place Logo first, then Title at the top of sidebar -->
    <template #sidebar-nav-before>
      <div class="custom-sidebar-brand">
        <img src="/logo.png" alt="Meshmetal Logo" class="sidebar-logo" />
        <!-- <div class="sidebar-title">Documentation</div> -->
      </div>
    </template>
  </Layout>
</template>

<style>
/* 1. Completely hide the default top navbar title area */

.curtain {
    height: 0 !important;
}

.VPNavBarTitle {
  display: none !important;
}

/* 2. Custom header container at top of sidebar */
.custom-sidebar-brand {
  padding: 16px 12px 16px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 12px;
}

/* 3. Logo styling (Logo First) */
.sidebar-logo {
  max-width: 100%;
  height: auto;
  max-height: 60px; /* Adjust height as needed */
  object-fit: contain;
  margin-bottom: 12px;
}

/* 4. Title styling (Text Second) */
.sidebar-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}
</style>