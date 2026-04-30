import { bankOptions } from "../storage/constants";

export function renderBankFilter(
  containerId: string,
): HTMLSelectElement | null {
  const container = document.getElementById(containerId);
  if (!container) return;

  const select = document.createElement("select");
  select.className = "filter__right__select";
  select.name = "filter__right";
  select.id = "filter__right";

  bankOptions.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });

  container.appendChild(select);
  return select;
}
