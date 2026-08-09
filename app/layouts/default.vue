<template>
  <div class="min-h-screen flex flex-col bg-stone-50">
    <!-- The navbar hides and shows on scroll direction from the very first
         gesture, so it has to be interactive before the visitor touches it. -->
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <!-- Always below the fold: its markup is prerendered, so it can wait for
         the visitor to reach it before costing any hydration. -->
    <LazyAppFooter hydrate-on-visible />
  </div>
</template>
