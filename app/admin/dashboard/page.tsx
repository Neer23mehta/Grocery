'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';

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
    if (type === 'category') {
      setCategories((prev) =>
        prev.map((category) =>
          category.No === categoryId ? { ...category, Category_Name: value } : category
        )
      );
    } else if (type === 'product') {
      setProducts((prev) =>
        prev.map((product) =>
          product.No === productId
            ? { ...product, Product_Name: value }
            : product
        )
      );
    } else if (type === 'brand') {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.No === brandId ? { ...brand, Brand_Name: value } : brand
        )
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = {
          data: { data: { result: [{ No: 1, Category_Name: 'Category 1' }] } },
        };
        const productRes = {
          data: {
            data: {
              result: [{ No: 1, Product_Name: 'Product 1', Category_Name: 'Category 1' }],
            },
          },
        };
        const brandRes = {
          data: { data: { result: [{ No: 1, Brand_Name: 'Brand 1' }] } },
        };

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
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Dashboard
        </Typography>
      </Grid>

      {/* Categories */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.No}>
                      <TableCell>{category.No}</TableCell>
                      <TableCell>
                        <TextField
                          variant="standard"
                          fullWidth
                          value={category.Category_Name}
                          onChange={(e) =>
                            handleEdit(category.No, 0, 0, e.target.value, 'category')
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Products */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.No}>
                      <TableCell>{product.No}</TableCell>
                      <TableCell>
                        <TextField
                          variant="standard"
                          fullWidth
                          value={product.Product_Name}
                          onChange={(e) =>
                            handleEdit(0, product.No, 0, e.target.value, 'product')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="standard"
                          fullWidth
                          value={product.Category_Name}
                          onChange={(e) =>
                            handleEdit(0, product.No, 0, e.target.value, 'product')
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Brands
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brands.map((brand) => (
                    <TableRow key={brand.No}>
                      <TableCell>{brand.No}</TableCell>
                      <TableCell>
                        <TextField
                          variant="standard"
                          fullWidth
                          value={brand.Brand_Name}
                          onChange={(e) =>
                            handleEdit(0, 0, brand.No, e.target.value, 'brand')
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
