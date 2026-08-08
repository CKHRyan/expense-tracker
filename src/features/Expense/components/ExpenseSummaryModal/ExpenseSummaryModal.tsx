import { useTranslation } from "react-i18next";
import { Modal, Text } from "src/components";
import { useConfigStore } from "src/stores/configStore";
import { CURRENCY_MAP } from "src/features/Currency/constants";
import { useLocale } from "src/hooks/useLocale";
import type { ModalProps } from "src/components/Modal/Modal";
import { twMerge } from "tailwind-merge";

type Props = {
  totalExpense: number;
  totalExpenseByCurrency: Record<string, number>;
  totalBaseExpenseByCurrency: Record<string, number | undefined>;
} & ModalProps;

export const ExpenseSummaryModal = ({
  totalExpense,
  totalExpenseByCurrency,
  totalBaseExpenseByCurrency,
  contentClassname,
  ...modalProps
}: Props) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const { baseCurrency } = useConfigStore();

  const expenseCurrencies = Object.keys(totalExpenseByCurrency).sort((a, b) => {
    // Compare base amount
    if (
      (totalBaseExpenseByCurrency[a] ?? 0) >
      (totalBaseExpenseByCurrency[b] ?? 0)
    )
      return -1;

    // Compare amount
    if ((totalExpenseByCurrency[a] ?? 0) > (totalExpenseByCurrency[b] ?? 0))
      return -1;

    // Compare unit
    return a.localeCompare(b);
  });

  return (
    <Modal
      {...modalProps}
      contentClassname={twMerge(
        "pt-4 pb-6 gap-6 items-center",
        contentClassname,
      )}
    >
      <Text className="text-lg font-semibold">
        {t("analysis.expenseSummary.title")}
      </Text>

      <table className="w-full text-left border-collapse text-sm font-medium">
        <thead>
          <tr className="border-b border-slate-300 text-slate-300 font-semibold uppercase tracking-wider">
            <th scope="col" className="py-3 px-2">
              {t("analysis.expenseSummary.currency")}
            </th>
            <th scope="col" className="py-3 px-2 text-right">
              {t("analysis.expenseSummary.amount")}
            </th>
            <th scope="col" className="py-3 px-2 text-right">
              {t("analysis.expenseSummary.amount")} ({baseCurrency.unit})
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-400/30">
          {expenseCurrencies.map((currencyUnit) => {
            const currency = CURRENCY_MAP.get(currencyUnit);
            return (
              <tr key={`expense-summary-table-row-${currencyUnit}`}>
                <td className="py-3.5 px-2">
                  {currency
                    ? `${currency.name[locale]} (${currency.unit})`
                    : t("analysis.expenseSummary.unknown")}
                </td>
                <td className="py-3.5 px-2 text-right tabular-nums">
                  {totalExpenseByCurrency[currencyUnit].toLocaleString()}
                </td>
                <td className="py-3.5 px-2 text-right tabular-nums">
                  {totalBaseExpenseByCurrency[currencyUnit] ?? "-"}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="border-t border-slate-400/30 text-[var(--brand-red)]">
            <td
              colSpan={2}
              className="py-4 px-2 font-semibold uppercase tracking-wider"
            >
              {t("analysis.expenseSummary.totalExpenses")}
            </td>
            <td className="py-4 px-2 text-right font-bold tabular-nums">
              {totalExpense.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
};
