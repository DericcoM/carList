import React, { useState } from 'react';
import { Table, Pagination } from 'antd';

const CarTable = ({ cars }) => {
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    if (!Array.isArray(cars)) return []; 

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return cars.slice(startIndex, endIndex);
  };

  const getModification = (car) => {
    const { engine } = car;
    return `${engine.volume} ${engine.transmission} (${engine.power} л.с.) ${car.drive}`;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Марка/Модель',
      dataIndex: 'mark',
      key: 'mark',
      render: (text, record) => `${text} ${record.model}`,
    },
    {
      title: 'Модификация',
      dataIndex: 'modification',
      key: 'modification',
      render: (_, record) => getModification(record),
    },
    {
      title: 'Комплектация',
      dataIndex: 'equipmentName',
      key: 'equipmentName',
    },
    {
      title: 'Стоимость',
      dataIndex: 'price',
      key: 'price',
      render: (text) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(text),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={getPageData()} pagination={false} />
      <Pagination
        style={{ marginTop: 16, textAlign: 'center' }}
        current={currentPage}
        total={Array.isArray(cars) ? cars.length : 0}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </>
  );
};

export default CarTable;
