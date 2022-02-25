import { useMemo } from 'react';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductList, deleteProduct } from '../../../api';

import { Table, Popconfirm } from 'antd';
import { Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Products() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductList);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
  });

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>
              <Button colorScheme="teal" size="xs">Edit</Button>
            </Link>
            
            <Popconfirm 
              title="Are you sure?" 
              onConfirm={() => {
                deleteMutation.mutate(record._id);
              }} 
              onCancel={() => {console.log('iptal edildi')}} 
              okText="Yes"
              cancelText="No"
              placement='left'
            >
              <Button colorScheme="red" marginLeft="5" size="xs">Delete</Button>
            </Popconfirm>
          </>
        ),
      }
    ]
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" p="5">Products</Text>

        <Link to={`new`}>
          <Button colorScheme="blue">New</Button>
        </Link>
      </Flex>

      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  )
}

export default Products