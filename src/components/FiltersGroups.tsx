const FILTER_GROUP = [
  {
    name: "Type",
    key: "type",
    options: [
      { label: "Mineral", value: "mineral" },
      { label: "Chemical", value: "chemical" },
    ],
  },
  {
    name: "SPF",
    key: "spf",
    options: [
      { label: "SPF 30", value: "30" },
      { label: "SPF 50", value: "50" },
    ],
  },
  {
    name: "Reef Safe",
    key: "reef",
    options: [{ label: "Reef safe", value: "yes" }],
  },
];

interface FiltersGroupsProps {
  selectedFilters: { [key: string]: string[] };
  onFilterChange: (groupKey: string, value: string, isChecked: boolean) => void;
}

function FiltersGroups({
  selectedFilters,
  onFilterChange,
}: FiltersGroupsProps) {
  return (
    <>
      {FILTER_GROUP.map((group) => (
        <div className="filter-group" key={group.key}>
          <h4>{group.name}</h4>
          {group.options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                name="group.name"
                value={option.value}
                checked={
                  selectedFilters[group.key]?.includes(option.value) || false
                }
                onChange={(e) =>
                  onFilterChange(group.key, option.value, e.target.checked)
                }
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ))}
    </>
  );
}

export default FiltersGroups;
