import React from 'react';

const FilterForm = ({ brands, models, selectedBrand, selectedModels, onBrandChange, onModelChange, carCountsByBrand }) => {
  const countCarsByBrand = (brand) => {
    return brands.reduce((count, currBrand) => {
      return brand === currBrand ? count + 1 : count;
    }, 0);
  };

  return (
    <form>
      <div>
        <label>Марка:</label>
        <select value={selectedBrand} onChange={onBrandChange}>
          <option value="">Выберите марку</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand} ({countCarsByBrand(brand) || 0})
            </option>
          ))}
        </select>
      </div>
      {selectedBrand && (
        <div>
          <label>Модель:</label>
          <select multiple value={selectedModels} onChange={onModelChange}>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default FilterForm;
