"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@workspace/ui/components/combobox";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
];

const groupedFruits = [
  {
    label: "Citrus",
    items: [
      { label: "Orange", value: "orange" },
      { label: "Lemon", value: "lemon" },
    ],
  },
  {
    label: "Berries",
    items: [
      { label: "Strawberry", value: "strawberry" },
      { label: "Blueberry", value: "blueberry" },
    ],
  },
];

type FruitGroup = (typeof groupedFruits)[number];

export function ComboboxDemo() {
  return (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Search a fruit..." className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>No results.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxGroupDemo() {
  return (
    <Combobox items={groupedFruits}>
      <ComboboxInput placeholder="Search a fruit..." className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>No results.</ComboboxEmpty>
        <ComboboxList>
          {(group: FruitGroup) => (
            <ComboboxGroup key={group.label}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              {group.items.map((item) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
