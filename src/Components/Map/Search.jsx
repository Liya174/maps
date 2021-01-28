import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import style from "./Map.module.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const Search = ({ center, addNewPoint }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    // clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => center.lat, lng: () => center.lng },
      radius: 100000,
    },
    // debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  //   const handleSelect = (description) => {
  //     setValue(description, false);
  //     // clearSuggestions();

  //     // запрос координат выбранного элемента -> добавление нового элемета в state
  //     getGeocode({ address: description })
  //       .then((results) => getLatLng(results[0]))
  //       .then(({ lat, lng }) => {
  //         addNewPoint(lat, lng);
  //       })
  //       .catch((error) => {
  //         alert("Ошибка:", error);
  //       });
  const handleSelect = async (address) => {
    setValue(address, false);

    // запрос координат выбранного элемента -> добавление нового элемета в state
    let results = await getGeocode({ address });

    if (results) {
      console.log(results);
      let { lat, lng } = await getLatLng(results[0]);
      addNewPoint(lat, lng);
    } else {
      alert("Ошибка");
    }
  };

  return (
    <div className={style.search}>
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          value={value}
          onChange={handleInput}
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

  /*
  // Изменение значения input value
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // Изменение значения input value на значение option
    console.log(description);
    setValue(description, false);
    clearSuggestions();

    // запрос координат выбранного элемента -> добавление нового элемета в state
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        addNewPoint(lat, lng);
      })
      .catch((error) => {
        alert("Ошибка:", error);
      });
  };

  //отображение списка предложенных варинатов
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li
          className={style.option}
          key={place_id}
          onClick={() => handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className={style.search} onBlur={clearSuggestions}>
      <input
        className={style.input}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Найти точку"
      />
      {status === "OK" && <ul className={style.list}>{renderSuggestions()}</ul>}
    </div>
  );
  */
};

export default Search;
