import type { MultiStepFormSchema } from "@rilldata/web-common/features/templates/schemas/types.ts";
import { getSchemaButtonLabels } from "@rilldata/web-common/features/templates/schema-utils.ts";
import { ImportDataStep } from "@rilldata/web-common/features/add-data/manager/steps/types.ts";
import { m } from "@rilldata/web-common/lib/i18n/gen/messages";

export type AddDataFormLabels = {
  primaryLoadingCopy: string;
  primaryButtonLabel: string;

  yamlPreviewTitle: string;
};

export const defaultFormLabels: AddDataFormLabels = {
  primaryLoadingCopy: m.add_data_saving(),
  primaryButtonLabel: m.add_data_save(),

  yamlPreviewTitle: m.add_data_yaml_preview(),
};

const connectorFormLabels: AddDataFormLabels = {
  primaryLoadingCopy: m.add_data_testing_connection(),
  primaryButtonLabel: m.add_data_test_and_connect(),

  yamlPreviewTitle: m.add_data_connector_preview(),
};

export function getLabelsForConnector(
  schema: MultiStepFormSchema | null,
  values: Record<string, unknown>,
) {
  const schemaSpecificLabels = getSchemaButtonLabels(schema, values);
  const labels = schemaSpecificLabels
    ? {
        ...connectorFormLabels,
        primaryLoadingCopy: schemaSpecificLabels.loading,
        primaryButtonLabel: schemaSpecificLabels.idle,
      }
    : connectorFormLabels;

  if (values.auth_method === "public") {
    labels.primaryButtonLabel = m.common_continue();
  }
  return labels;
}

const importOnlySourceFormLabels: AddDataFormLabels = {
  primaryLoadingCopy: m.add_data_importing_data(),
  primaryButtonLabel: m.add_data_import_data(),

  yamlPreviewTitle: m.add_data_model_preview(),
};
const generateMetricsViewSourceFormLabels: AddDataFormLabels = {
  primaryLoadingCopy: m.add_data_generating_metrics_view(),
  primaryButtonLabel: m.add_data_generate_metrics_view_ai(),

  yamlPreviewTitle: m.add_data_model_preview(),
};
const importAndGenerateSourceFormLabels: AddDataFormLabels = {
  primaryLoadingCopy: m.add_data_generating_dashboard(),
  primaryButtonLabel: m.add_data_generate_dashboard_ai(),

  yamlPreviewTitle: m.add_data_model_preview(),
};

export function getLabelsForSource(steps: ImportDataStep[]) {
  const hasOnlyCreateStep =
    steps.length === 1 && steps[0] === ImportDataStep.CreateModel;
  if (hasOnlyCreateStep) return importOnlySourceFormLabels;
  const stopsAtMetricsView =
    steps[steps.length - 1] === ImportDataStep.CreateMetricsView;
  if (stopsAtMetricsView) return generateMetricsViewSourceFormLabels;
  return importAndGenerateSourceFormLabels;
}
