import classes from "@/app/style/components/selectSpecializationModal.module.css";
import SpecializationTypeAccordion from "./specializationTypeAccordion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SelectSpecializationModal({
  closeModal,
  onChange,
  value,
}) {
  const [search, setSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(value);
  const [filteredSpecializationsTypes, setFilteredSpecializationsTypes] =
    useState([]);

  const specializationsTypes = useSelector(
    (state) => state.vacancy.specializations
  );

  const onSearch = (e) => {
    setSearch(e.target.value);

    let types = [...specializationsTypes];
    types = types.filter((item) => {
      for (let i = 0; i < item.specializations.length; i++) {
        if (item.specializations[i].name.includes(e.target.value)) {
          return item;
        }
      }
    });

    setFilteredSpecializationsTypes(types);
  };

  const onChangeSelectedSpecialization = (e) => {
    setSelectedSpecialization(e.target.value);
  };

  const handleSaveButton = () => {
    onChange(selectedSpecialization);
    closeModal();
  };

  useEffect(() => {
    setFilteredSpecializationsTypes(specializationsTypes);
  }, [specializationsTypes]);

  return (
    <div className={classes.modal}>
      <div className={classes.modal__backdrop}></div>
      <div className={classes.modal__inner}>
        <h3>Кого вы хотите найти?</h3>
        <p>
          Это новый каталог, если вы не нашли нужную специализацию, выберите
          пункт &#171;Другое&#187;
        </p>

        <input
          className="input"
          value={search}
          type="text"
          placeholder="Быстрый поиск"
          onChange={onSearch}
        ></input>

        <span className={classes.search_example}>Например: водитель</span>

        <div className={classes.accordions_container}>
          {filteredSpecializationsTypes.map((specType, index) => (
            <SpecializationTypeAccordion
              onChange={onChangeSelectedSpecialization}
              key={specType.id}
              specType={specType}
              value={selectedSpecialization}
            />
          ))}
        </div>

        <div className={classes.modal__actions}>
          <button
            className="button button-primary-bordered"
            onClick={() => closeModal()}
          >
            Отменить
          </button>
          <button className="button button-primary" onClick={handleSaveButton}>
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );
}
