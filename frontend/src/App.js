import React, { useState, useEffect } from 'react';
import CarTable from './components/CarTable';
import { Select, Button, Tag } from 'antd';
import './assets/antd.css';
const { Option } = Select;

const App = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [totalCarsCount, setTotalCarsCount] = useState(0);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3100/api/cars')
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
        setTotalCarsCount(data.cars.length);
        const allBrands = data.cars.map((car) => car.mark);
        const uniqueBrands = [...new Set(allBrands)];
        setBrands(uniqueBrands);
      })
      .catch((error) => console.error('Ошибка при получении данных:', error));
  }, []);

  useEffect(() => {
    const modelsForSelectedBrand = [...new Set(cars.filter((car) => car.mark === selectedBrand).map((car) => car.model))];
    setModels(modelsForSelectedBrand);
  }, [selectedBrand, cars]);

  useEffect(() => {
    const filteredCars = cars.filter((car) => {
      const isBrandMatch = selectedBrand ? car.mark === selectedBrand : true;
      const isModelMatch = selectedModels.length === 0 ? true : selectedModels.includes(car.model);
      return isBrandMatch && isModelMatch;
    });
    setFilteredCars(filteredCars);
  }, [selectedBrand, selectedModels, cars]);

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setSelectedModels([]);
  };

  const handleModelChange = (value) => {
    setSelectedModels(value);
  };

  const handleClearModels = () => {
    setSelectedModels([]);
  };

  const handleAllCarsClick = () => {
    setSelectedBrand('');
    setSelectedModels([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Фильтр по марке:</h3>
        <div>
          {brands.map((brand) => (
            <Button
              key={brand}
              type={brand === selectedBrand ? 'primary' : 'default'}
              style={{ marginRight: 10 }}
              onClick={() => handleBrandChange(brand)}
            >
              {brand} ({cars.filter((car) => car.mark === brand).length})
            </Button>
          ))}
        </div>
        <Button onClick={handleAllCarsClick} type={selectedBrand === '' ? 'primary' : 'default'}>
          Все автомобили
        </Button>
      </div>

      {selectedBrand && (
        <div style={{ marginBottom: 20 }}>
          <h3>Фильтр по модели:</h3>
          <Select
            mode="multiple"
            style={{ width: '300px', marginBottom: 10, marginRight: 10 }}
            placeholder="Выберите модели"
            value={selectedModels}
            onChange={handleModelChange}
          >
            {models.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
          <Button onClick={handleClearModels}>Очистить выбранные модели</Button>
        </div>
      )}

      <CarTable cars={filteredCars} totalCarsCount={totalCarsCount} />
    </div>
  );
};

export default App;
