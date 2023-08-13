import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { useNavigate, useParams } from 'react-router-dom';
import IProduct from '@/interfaces/product';


type FieldType = {
  name: string,
  price: number,
  image: string
};

const AdminProductEdit = () => {
    const {idProduct} = useParams<{idProduct: string}>();
    const {data: productData} =useGetProductByIdQuery(idProduct || "") 
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate()
    const [from] = Form.useForm()
    useEffect(()=>{
        from.setFieldsValue({
            name: productData?.name,
            price: productData?.price,
            image: productData?.image,
        })
    }, [productData])
const onFinish= (values: IProduct) =>{
    updateProduct({...values, id: idProduct})
    .unwrap()
    .then(()=> navigate('/product/id/edit'))
}
    return (
        <div>
              <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="ten san pham"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="gia san pham"
      name="price"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />

    </Form.Item>
    <Form.Item<FieldType>
      label="anh san pham"
      name="image"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input/>
    </Form.Item>

    

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
       Add
      </Button>
    </Form.Item>
  </Form>
        </div>
    )
}

export default AdminProductEdit;
