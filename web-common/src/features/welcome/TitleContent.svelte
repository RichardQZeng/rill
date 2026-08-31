<script lang="ts">
  import RillLogoSquareNegative from "@rilldata/web-common/components/icons/RillLogoSquareNegative.svelte";
  import RadixH1 from "@rilldata/web-common/components/typography/RadixH1.svelte";
  import Subheading from "@rilldata/web-common/components/typography/Subheading.svelte";
  import { m } from "@rilldata/web-common/lib/i18n/gen/messages";
</script>

<section class="flex flex-col gap-y-4 pb-4 items-center text-center">
  <RillLogoSquareNegative size="84px" gradient />
  <RadixH1>
    <span
      class="bg-gradient-to-r from-primary-900 to-primary-800 text-transparent bg-clip-text opacity-75"
    >
      {m.welcome_get_started_title()}
    </span>
  </RadixH1>
  <div class="flex flex-col gap-y-2">
    <Subheading twColor="text-fg-secondary">
      {m.welcome_get_started_description()}
    </Subheading>
  </div>
</section>
