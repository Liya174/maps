import usePlacesAutocomplete from "use-places-autocomplete";
import style from "./Map.module.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const Search = ({ center, getAddressData }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => center.lat, lng: () => center.lng },
      radius: 100000,
    },
    // debounce: 300,
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    // запрос координат выбранного элемента -> добавление нового элемента в state
    getAddressData(address);
  };

  return (
    <div className={style.search}>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Найти точку"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
