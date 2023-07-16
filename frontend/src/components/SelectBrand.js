import React from 'react';

const SelectBrand = ({ brands, onBrandSelect }) => {
  return (
    <div>
      {brands.map((brand) => (
        <button key={brand} onClick={() => onBrandSelect(brand)}>
          {brand}
        </button>
      ))}
    </div>
  );
};

export default SelectBrand;
