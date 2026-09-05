<script lang="ts">
  import ContentContainer from "@rilldata/web-common/components/layout/ContentContainer.svelte";
  import { m } from "@rilldata/web-common/lib/i18n/gen/messages";
  import DashboardList from "../../features/dashboards/DashboardList.svelte";
</script>

<ContentContainer title={m.nav_tab_dashboards()} maxWidth={1100}>
  <DashboardList showSearch />
</ContentContainer>
