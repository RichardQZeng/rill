<script lang="ts">
  import { page } from "$app/stores";
  import ContentContainer from "@rilldata/web-common/components/layout/ContentContainer.svelte";
  import { m } from "@rilldata/web-common/lib/i18n/gen/messages";

  const navItems = [
    { label: () => m.status_nav_overview(), route: "/status" },
    { label: () => m.status_nav_resources(), route: "/status/resources" },
    { label: () => m.status_nav_tables(), route: "/status/tables" },
  ];
</script>

<ContentContainer title={m.nav_status()} maxWidth={1100}>
  <div class="container flex-col md:flex-row">
    <nav class="nav-items" style:min-width="180px">
      {#each navItems as { label, route } (route)}
        <a
          href={route}
          class="nav-item"
          class:selected={$page.url.pathname === route ||
            ($page.url.pathname.startsWith(route + "/") &&
              route !== "/status") ||
            (route === "/status" && $page.url.pathname === "/status")}
        >
          <span class="text-fg-primary">{label()}</span>
        </a>
      {/each}
    </nav>
    <div class="flex flex-col gap-y-6 w-full overflow-hidden">
      <slot />
    </div>
  </div>
</ContentContainer>

<style lang="postcss">
  .container {
    @apply flex pt-6 gap-6 max-w-full overflow-hidden;
  }

  .nav-items {
    @apply flex flex-col gap-y-2;
  }

  .nav-item {
    @apply p-2 flex gap-x-1 items-center;
    @apply rounded-sm;
    @apply text-sm font-medium;
  }

  .selected {
    @apply bg-surface-active;
  }

  .nav-item:hover {
    @apply bg-surface-hover;
  }
</style>
