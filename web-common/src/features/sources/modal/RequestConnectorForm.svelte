<script lang="ts">
  import { Button } from "@rilldata/web-common/components/button";
  import Input from "@rilldata/web-common/components/forms/Input.svelte";
  import { eventBus } from "@rilldata/web-common/lib/event-bus/event-bus";
  import { defaults, superForm } from "sveltekit-superforms";
  import { yup } from "sveltekit-superforms/adapters";
  import { object, string } from "yup";
  import { m } from "@rilldata/web-common/lib/i18n/gen/messages";

  export let onClose: () => void = () => {};
  export let onBack: () => void = () => {};

  const FORM_ID = "1P9sP1jxjFcMqDzxsweIrZiU7pFUgRY452S3Nk7cEeao";
  const GOOGLE_FORM_ENDPOINT = `https://docs.google.com/forms/d/${FORM_ID}`;
  const REQUEST_FIELD_ID = "entry.849552298";
  const EMAIL_FIELD_ID = "entry.516049603";

  const initialValues = {
    request: "",
    email: "",
  };

  const validationSchema = object({
    request: string().required(m.connector_request_required()),
    email: string().email(m.connector_request_email_invalid()),
  });

  const { form, enhance, submit, errors, submitting } = superForm(
    defaults(initialValues, yup(validationSchema)),
    {
      SPA: true,
      validators: yup(validationSchema),
      async onUpdate({ form }) {
        if (!form.valid) return;
        const values = form.data;

        // Following the approach here: https://stackoverflow.com/questions/51995070/post-data-to-a-google-form-with-ajax
        const submitFormEndpoint = `${GOOGLE_FORM_ENDPOINT}/formResponse?${REQUEST_FIELD_ID}=${values.request}&${EMAIL_FIELD_ID}=${values.email}&submit=Submit`;

        try {
          await fetch(submitFormEndpoint, {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          onClose();
          eventBus.emit("notification", {
            message: m.connector_request_thanks(),
          });
        } catch (e) {
          console.error(e);
        }
      },
    },
  );
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    submit(e);
  }}
  id="request-connector-form"
  use:enhance
>
  <span class="text-fg-secondary text-sm mt-2">
    {m.connector_request_missing()}
  </span>
  <Input
    id="request"
    label={m.connector_request_connector()}
    placeholder={m.connector_request_placeholder()}
    errors={$errors.request}
    bind:value={$form.request}
    alwaysShowError
  />
  <Input
    id="email"
    label={m.connector_request_email()}
    placeholder={m.connector_request_email_placeholder()}
    errors={$errors.email}
    bind:value={$form.email}
  />
  <div class="flex gap-x-2">
    <div class="grow"></div>
    <Button onClick={onBack} type="secondary">{m.common_back()}</Button>
    <Button
      type="primary"
      submitForm
      form="request-connector-form"
      disabled={$submitting}
    >
      {m.connector_request_submit()}
    </Button>
  </div>
</form>

<style lang="postcss">
  form {
    @apply flex flex-col gap-y-4;
  }
</style>
