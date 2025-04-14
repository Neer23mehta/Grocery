'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  No: number;
  Category_Name: string;
}

interface Product {
  No: number;
  Product_Name: string;
  Category_Name: string;
}

interface Brand {
  No: number;
  Brand_Name: string;
}

const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const handleEdit = (
    categoryId: number, 
    productId: number, 
    brandId: number, 
    value: string, 
    type: string
  ) => {
    if (type === "category") {
      setCategories((prev) => 
        prev.map(category => category.No === categoryId ? { ...category, Category_Name: value } : category)
      );
    } else if (type === "product") {
      setProducts((prev) => 
        prev.map(product => product.No === productId ? { ...product, Product_Name: value } : product)
      );
    } else if (type === "brand") {
      setBrands((prev) => 
        prev.map(brand => brand.No === brandId ? { ...brand, Brand_Name: value } : brand)
      );
    }
  };

  // Fetch Data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment below lines and remove mock data when the API is ready
        // const categoryRes = await axios.get('http://192.168.2.181:3000/admin/getcategories?pageNumber=1&pageLimit=10');
        // const productRes = await axios.get('http://192.168.2.181:3000/admin/get_products?pageNumber=1&pageLimit=10');
        // const brandRes = await axios.get('http://192.168.2.181:3000/admin/get_brands?pageNumber=1&pageLimit=10');

        // Mock data for testing
        const categoryRes = { data: { data: { result: [{ No: 1, Category_Name: 'Category 1' }] } } };
        const productRes = { data: { data: { result: [{ No: 1, Product_Name: 'Product 1', Category_Name: 'Category 1' }] } } };
        const brandRes = { data: { data: { result: [{ No: 1, Brand_Name: 'Brand 1' }] } } };

        setCategories(categoryRes.data.data.result);
        setProducts(productRes.data.data.result);
        setBrands(brandRes.data.data.result);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <section>
        <h2>Categories</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.No}>
                <td>{category.No}</td>
                <td>
                  <input
                    type="text"
                    value={category.Category_Name}
                    onChange={(e) => handleEdit(category.No, 0, 0, e.target.value, 'category')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.No}>
                <td>{product.No}</td>
                <td>
                  <input
                    type="text"
                    value={product.Product_Name}
                    onChange={(e) => handleEdit(0, product.No, 0, e.target.value, 'product')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.Category_Name}
                    onChange={(e) => handleEdit(0, product.No, 0, e.target.value, 'product')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Brands</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.No}>
                <td>{brand.No}</td>
                <td>
                  <input
                    type="text"
                    value={brand.Brand_Name}
                    onChange={(e) => handleEdit(0, 0, brand.No, e.target.value, 'brand')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
